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

   The estimate is a fast approximation for the authoring loop. `--measure`
   opens the real page in Chromium and reads the real scrollHeight of every
   slide, which is the only way to catch a slide whose height lives in a
   widget's rendered CSS rather than in its markup. Prefer it before shipping.
   The four-principles balance slide sat at 1394px against a 910px frame for
   months while the estimate reported 805px and a clean bill of health.

   Two things the estimate gets right that a naive count doesn't:
     - Nested lists. The engine reveals `[reveal] > *`, i.e. direct children
       only, so sub-items appear with their parent. They add height but are not
       separate bullets.
     - Widgets. Each is measured from its own markup (a 2-option poll and a
       5-statement checkset are very different heights), and its inner text is
       excluded from the prose pass so nothing is counted twice.

   Scans lessons/<topic>/<lesson>/index.html. Run:
     node tools/check-density.mjs            # fast estimate
     node tools/check-density.mjs --measure  # real heights, in a browser
     node tools/check-density.mjs --strict   # exit 1 if any issues (for CI)
*/

import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createServer } from 'node:http';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = path.join(ROOT, 'lessons');
const STRICT = process.argv.includes('--strict');
const MEASURE = process.argv.includes('--measure');

/* ---- tunable thresholds ---- */
const BULLET_MAX_CHARS = 170;   // one bullet past this wraps to 4-5 lines
/* Measured in Chrome: the slide body is ~598px tall at 1366x768, ~730px at
   1600x900, and ~910px at 1920x1080. So "cramped" is roughly "scrolls on a
   laptop" and "overflow" is roughly "scrolls even on a 1080p projector". */
const TIGHT_PX = 640;           // body column taller than this is cramped
const OVERFLOW_PX = 820;        // ...and past this it definitely scrolls
/* --measure only. A Likert probe is a grid of five statements with a 1-5 scale
   on each; it cannot fit a frame and was never meant to. Students work down it
   like a form, so it is exempt from the measured height rule.
   
   Nothing else is. An interactive widget that ends in an answer, a verdict or a
   button is a slide the room reads together, and if the student has to scroll to
   find the button then the slide failed -- which is exactly how the four-
   principles balance widget sat at 1394px for months. */
const LIKERT_TAGS = new Set(['phil-beliefs', 'phil-beliefs-review']);
const MEASURED_SLACK_PX = 40;   // scrollbar and sub-pixel rounding

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
    const tags = [];
    const wre = new RegExp(WIDGET_RE.source, 'gi');
    while ((w = wre.exec(body))) { tags.push(w[1].toLowerCase()); widgetOnly += widgetPx(w[1].toLowerCase(), w[0], cpl); }
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
    // an interactive form, not projected prose. Students work down it at their
    // own pace, so the *estimate* does not police its height — the estimate of a
    // widget is a guess at its markup and cannot see what its CSS does.
    //
    // `--measure` does police it, against a looser limit. Scrolling a Likert
    // probe is genuinely fine; scrolling past the answer button is not, and only
    // a real measurement can tell those apart.
    const interactive = widgetOnly > px / 2;
    // A slide is a Likert form only if that is ALL it is; a probe next to a
    // checkset still has to fit.
    const likert = tags.length > 0 && tags.every(t => LIKERT_TAGS.has(t));
    slides.push({ title: h1 ? strip(h1[1]) : '(untitled)', hasArt, bullets, interactive, likert, px: Math.round(px) });
  }
  return slides;
}

/* =====================================================================
   --measure: real heights from a real browser
   ===================================================================== */
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
               '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
               '.woff2': 'font/woff2', '.json': 'application/json', '.mp3': 'audio/mpeg' };

function serve() {
  return new Promise(resolve => {
    const server = createServer(async (req, res) => {
      let rel = decodeURIComponent(req.url.split('?')[0]);
      if (rel.endsWith('/')) rel += 'index.html';
      const file = path.join(ROOT, rel);
      if (!file.startsWith(ROOT) || !existsSync(file)) { res.writeHead(404); return res.end('not found'); }
      try {
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
        res.end(await readFile(file));
      } catch { res.writeHead(500); res.end('error'); }
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

/* 1920x1080 is the projector this rule is written for. A slide that fits here
   and scrolls on a laptop is acceptable; one that scrolls here is not. */
const VIEWPORT = { width: 1920, height: 1080 };

async function measureAll() {
  const require = createRequire(import.meta.url);
  let chromium;
  try { ({ chromium } = require('playwright')); }
  catch {
    console.error(`
--measure needs Chromium. From the repo root:

  npm install --no-save playwright
  npx playwright install chromium

The default estimate needs nothing.
`);
    process.exit(2);
  }

  const { server, port } = await serve();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: VIEWPORT });
  const out = new Map();

  for (const topic of (await ls(LESSONS)).sort()) {
    if (!(await isDir(path.join(LESSONS, topic)))) continue;
    for (const lesson of (await ls(path.join(LESSONS, topic))).sort()) {
      const rel = `lessons/${topic}/${lesson}/index.html`;
      if (!existsSync(path.join(ROOT, rel))) continue;
      await page.goto(`http://127.0.0.1:${port}/${rel}`, { waitUntil: 'networkidle' });
      /* `lesson.slides`, not a DOM query: the engine moves every slide into its
         shell on build, so they are no longer children of <phil-lesson> and a
         `:scope >` query finds nothing.

         Un-revealed steps need no special handling. .phil-step uses
         visibility:hidden, which still reserves its layout box precisely so the
         slide doesn't jump as steps appear — so a slide measures the same
         before and after the presenter clicks through it. */
      const rows = await page.evaluate(async () => {
        const lesson = document.querySelector('phil-lesson');
        const slides = lesson.slides || [];
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        const out = [];
        for (const s of slides) {
          lesson.show(s);
          await sleep(30);
          out.push({
            title: (s.querySelector('h1')?.textContent || '(untitled)').trim(),
            art: !!s.querySelector('[slot="art"]'),
            scroll: s.scrollHeight,
            frame: s.clientHeight,
          });
        }
        return out;
      });
      out.set(`${topic}/${lesson}`, rows);
    }
  }

  await browser.close();
  server.close();
  return out;
}

async function run() {
  let lessonCount = 0, slideCount = 0, problemCount = 0;
  const measured = MEASURE ? await measureAll() : null;

  for (const topic of (await ls(LESSONS)).sort()) {
    if (!(await isDir(path.join(LESSONS, topic)))) continue;
    for (const lesson of (await ls(path.join(LESSONS, topic))).sort()) {
      const file = path.join(LESSONS, topic, lesson, 'index.html');
      let html;
      try { html = await readFile(file, 'utf8'); } catch { continue; }

      const slides = parseSlides(html);
      if (!slides.length) continue;
      lessonCount++; slideCount += slides.length;

      const real = measured?.get(`${topic}/${lesson}`);
      const lines = [];
      slides.forEach((s, i) => {
        const where = `slide ${i + 1} "${s.title.slice(0, 44)}"${s.hasArt ? ' [art]' : ''}`;
        const r = real?.[i];
        if (r) {
          /* A real number beats the estimate, so the estimate's thresholds and
             its widget exemption both step aside here. Only a pure Likert probe
             is excused. */
          const over = r.scroll - r.frame;
          if (!s.likert && over > MEASURED_SLACK_PX) {
            problemCount++;
            lines.push(`  ⚠ ${where} — ${r.scroll}px in a ${r.frame}px frame, scrolls by ${over}px`);
          }
        } else if (s.interactive) { /* form slide — the estimate can't judge it */ }
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
      const tallest = real ? Math.max(...real.map(r => r.scroll)) : Math.max(...slides.map(s => s.px));
      const how = real ? `tallest ${tallest}px measured` : `tallest ~${tallest}px est`;
      console.log(`${lines.length ? '⚠' : '✓'} ${topic}/${lesson}  (${slides.length} slides, ${all.length} bullets, avg ${avg} chars, ${how})`);
      lines.forEach(l => console.log(l));
    }
  }

  console.log(`\nScanned ${slideCount} slides across ${lessonCount} lesson(s) — ${problemCount} issue(s).`);
  if (problemCount && STRICT) process.exit(1);
}

run();
