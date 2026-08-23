#!/usr/bin/env node
/* Flag slides that will overflow the projector frame.

   Slides scroll when they overflow (phil-slide has overflow:auto), so nothing
   breaks — but a slide that scrolls in class is a slide that failed. We check:

     1. SLIDE HEIGHT  — estimated rendered height of the body column. This is
                        the metric that actually answers "does it fit." A
                        slot="art" slide narrows the text column to ~46 chars,
                        so the same words wrap much harder.
     2. BULLET LENGTH — past ~170 characters a single bullet wraps to four or
                        five lines and stops reading as a bullet.

   Two things the estimate gets right that a naive count doesn't:
     - Nested lists. The engine reveals `[reveal] > *`, i.e. direct children
       only, so sub-items appear with their parent. They add height but are not
       separate bullets.
     - Widgets. Each is measured from its own markup (a 2-option poll and a
       5-statement checkset are very different heights), and its inner text is
       excluded from the prose pass so nothing is counted twice.

   Scans lessons/<topic>/<lesson>/index.html. Run:
     node tools/check-density.mjs            # report
     node tools/check-density.mjs --strict   # exit 1 if any issues (for CI)
*/

import { readFile, readdir, stat } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = path.join(ROOT, 'lessons');
const STRICT = process.argv.includes('--strict');

/* ---- tunable thresholds ---- */
const BULLET_MAX_CHARS = 170;   // one bullet past this wraps to 4-5 lines
/* Measured in Chrome: the slide body is ~598px tall at 1366x768, ~730px at
   1600x900, and ~910px at 1920x1080. So "cramped" is roughly "scrolls on a
   laptop" and "overflow" is roughly "scrolls even on a 1080p projector". */
const TIGHT_PX = 640;           // body column taller than this is cramped
const OVERFLOW_PX = 820;        // ...and past this it definitely scrolls

/* ---- rendering model (from phil-core.css) ---- */
const CPL_ART = 46;             // chars per line when art takes the right column
const CPL_PLAIN = 60;
const LINE_PX = 35;             // ~21px text at 1.65 line-height
const H1_PX = 70;
const BULLET_GAP_PX = 10;

const ls = async d => { try { return await readdir(d); } catch { return []; } };
const isDir = async p => { try { return (await stat(p)).isDirectory(); } catch { return false; } };
const strip = s => s.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/gi, 'x').replace(/\s+/g, ' ').trim();
const mean = a => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);

/* Any <phil-*> block that isn't the slide or lesson wrapper is a widget. The
   shared ones get a precise estimate below; a lesson's own custom element
   (phil-dossier, the maxim tester, the switchboard...) falls through to a flat
   one. Either way its inner markup is excluded from the prose pass, so a
   widget's guts are never counted as bullets and paragraphs on the slide. */
const WIDGET_RE = /<(phil-(?!slide\b|lesson\b)[a-z-]+)\b[^>]*>([\s\S]*?)<\/\1>/gi;
const CUSTOM_PX = 320;          // a lesson-specific interactive widget

function widgetPx(tag, markup, cpl) {
  const lines = t => Math.max(1, Math.ceil(t.length / cpl));
  const texts = re => [...markup.matchAll(re)].map(m => strip(m[1]));
  const pm = /prompt="([^"]*)"/.exec(markup);
  const promptPx = pm ? lines(strip(pm[1])) * 30 : 0;
  const chrome = 60;                       // widget padding + border

  switch (tag) {
    case 'phil-mcq':
    case 'phil-poll': {
      const opts = texts(/<phil-choice\b[^>]*>([\s\S]*?)<\/phil-choice>/gi);
      return chrome + promptPx + opts.reduce((s, t) => s + lines(t) * 28 + 26, 0);
    }
    case 'phil-checkset': {
      const opts = texts(/<phil-statement\b[^>]*>([\s\S]*?)<\/phil-statement>/gi);
      return chrome + promptPx + opts.reduce((s, t) => s + lines(t) * 28 + 26, 0) + 46;
    }
    case 'phil-cloze':
      return chrome + lines(strip(markup)) * 46;   // line-height 2.9 around blanks
    case 'phil-compare': {
      const sides = texts(/<phil-side\b[^>]*>([\s\S]*?)<\/phil-side>/gi);
      return 100 + Math.max(0, ...sides.map(t => Math.ceil(t.length / 38))) * 28;
    }
    case 'phil-beliefs':
    case 'phil-beliefs-review': {
      const n = texts(/<phil-statement\b[^>]*>([\s\S]*?)<\/phil-statement>/gi).length || 5;
      return chrome + promptPx + 40 + n * (tag === 'phil-beliefs' ? 74 : 96) + 50;
    }
    case 'phil-branch':
      return chrome + promptPx + 60;
    default:
      return CUSTOM_PX;         // a lesson's own widget — treat as interactive
  }
}

function parseSlides(html) {
  const slides = [];
  const re = /<phil-slide\b([^>]*)>([\s\S]*?)<\/phil-slide>/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[2];
    const hasArt = /slot="art"/.test(raw);
    const body = raw
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<img[^>]*slot="art"[^>]*>/gi, '');
    const h1 = /<h1>([\s\S]*?)<\/h1>/i.exec(body);

    const cpl = hasArt ? CPL_ART : CPL_PLAIN;
    const lines = t => Math.max(1, Math.ceil(t.length / cpl));

    let px = H1_PX, widgetOnly = 0, w;
    const wre = new RegExp(WIDGET_RE.source, 'gi');
    while ((w = wre.exec(body))) widgetOnly += widgetPx(w[1].toLowerCase(), w[0], cpl);
    px += widgetOnly;
    const prose = body.replace(new RegExp(WIDGET_RE.source, 'gi'), '');

    // every <li>, measured on its own text (nested sub-lists excluded)
    const bullets = [...prose.matchAll(/<li>([\s\S]*?)<\/li>/gi)]
      .map(x => strip(x[1].replace(/<(ul|ol)\b[\s\S]*?<\/\1>/gi, '')));
    // Everything else that renders: paragraphs, blockquotes, loose divs, captions.
    // Measured as one blob rather than tag by tag, so a <blockquote> or a lesson's
    // own styled <div> can't slip through uncounted.
    const rest = strip(prose
      .replace(/<li>[\s\S]*?<\/li>/gi, '')
      .replace(/<h1>[\s\S]*?<\/h1>/gi, ''));

    px += lines(rest) * LINE_PX
        + bullets.reduce((s, t) => s + lines(t) * LINE_PX + BULLET_GAP_PX, 0);

    // A slide that is mostly widget (a Likert probe, a 5-statement checkset) is
    // an interactive form, not projected prose. Students work down it at their own
    // pace and scrolling is fine, so the height rule doesn't apply to it.
    const interactive = widgetOnly > px / 2;
    slides.push({ title: h1 ? strip(h1[1]) : '(untitled)', hasArt, bullets, interactive, px: Math.round(px) });
  }
  return slides;
}

async function run() {
  let lessonCount = 0, slideCount = 0, problemCount = 0;

  for (const topic of (await ls(LESSONS)).sort()) {
    if (!(await isDir(path.join(LESSONS, topic)))) continue;
    for (const lesson of (await ls(path.join(LESSONS, topic))).sort()) {
      const file = path.join(LESSONS, topic, lesson, 'index.html');
      let html;
      try { html = await readFile(file, 'utf8'); } catch { continue; }

      const slides = parseSlides(html);
      if (!slides.length) continue;
      lessonCount++; slideCount += slides.length;

      const lines = [];
      slides.forEach((s, i) => {
        const where = `slide ${i + 1} "${s.title.slice(0, 44)}"${s.hasArt ? ' [art]' : ''}`;
        if (s.interactive) { /* form slide — height is the student's to scroll */ }
        else if (s.px > OVERFLOW_PX) {
          problemCount++;
          lines.push(`  ⚠ ${where} — ~${s.px}px, will scroll (limit ${OVERFLOW_PX})`);
        } else if (s.px > TIGHT_PX) {
          problemCount++;
          lines.push(`  ⚠ ${where} — ~${s.px}px, cramped (limit ${TIGHT_PX})`);
        }
        s.bullets.filter(b => b.length > BULLET_MAX_CHARS).forEach(b => {
          problemCount++;
          lines.push(`  ⚠ ${where} — ${b.length}-char bullet: "${b.slice(0, 58)}…"`);
        });
      });

      const all = slides.flatMap(s => s.bullets);
      const avg = Math.round(mean(all.map(b => b.length)));
      const tallest = Math.max(...slides.map(s => s.px));
      console.log(`${lines.length ? '⚠' : '✓'} ${topic}/${lesson}  (${slides.length} slides, ${all.length} bullets, avg ${avg} chars, tallest ~${tallest}px)`);
      lines.forEach(l => console.log(l));
    }
  }

  console.log(`\nScanned ${slideCount} slides across ${lessonCount} lesson(s) — ${problemCount} issue(s).`);
  if (problemCount && STRICT) process.exit(1);
}

run();
