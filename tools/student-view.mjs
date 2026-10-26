#!/usr/bin/env node
/* Key-free "student view" of lessons, for answer-key review.

   Usage:
     node tools/student-view.mjs <topic/lesson> [<topic/lesson> …] [--out temp/review]

   For each lesson it writes two files to the output folder:
     <lesson>.view.txt  every slide's visible text, with each graded item shown
                        as a student sees it and NO keys, explanations, or
                        feedback. Give this to blind reviewers.
     <lesson>.keys.txt  the keys, with each classify row's why= justification
                        and the slide each item reviews. Give this, with the
                        view, to the adversarial reviewer only.

   Widget data inside <script> tags is left out on purpose: a student may never
   open an interactive widget, so nothing graded may depend on it. See
   "Answer keys" in AUTHORING.md for the review process. */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const OUT = path.resolve(ROOT, outIdx >= 0 ? args[outIdx + 1] : 'temp/review');
const lessons = args.filter((a, i) => outIdx < 0 || (i !== outIdx && i !== outIdx + 1))
  .map(a => a.replace(/^lessons\//, '').replace(/\/(index\.html)?$/, ''));
if (!lessons.length) {
  console.error('Usage: node tools/student-view.mjs <topic/lesson> [...] [--out temp/review]');
  process.exit(1);
}

/* Elements the engine itself defines; any other phil-* tag is a lesson-local widget. */
const ENGINE = new Set(['phil-lesson', 'phil-slide', 'phil-mcq', 'phil-choice', 'phil-poll', 'phil-checkset',
  'phil-statement', 'phil-cloze', 'phil-blank', 'phil-classify', 'phil-col', 'phil-item', 'phil-branch',
  'phil-option', 'phil-compare', 'phil-side', 'phil-beliefs', 'phil-beliefs-review', 'phil-thinker', 'phil-narration']);

const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&mdash;': '—', '&ndash;': '–', '&apos;': "'" };
const unescape = s => s.replace(/&[a-z#0-9]+;/gi, m => ENT[m] ?? m);
const text = s => unescape(s.replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (tag, name) => { const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`)); return m ? unescape(m[1]) : ''; };
const flag = (tag, name) => new RegExp(`\\b${name}\\b`).test(tag.replace(/"[^"]*"/g, ''));

function render(html) {
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  const ids = [...html.matchAll(/<phil-slide\b([^>]*)>/g)].map((m, i) => attr(m[1], 'id') || `s${i + 1}`);
  const slideNo = id => ids.indexOf(id) + 1;
  const view = [], keys = [];
  let q = 0;
  const reviewNote = tag => { const r = attr(tag, 'review'); return r ? `  (review: slide ${slideNo(r)} "${r}")` : '  (no review slide)'; };

  const items = {
    classify(open, body) {
      const cols = [...body.matchAll(/<phil-col\b([^>]*)>([\s\S]*?)<\/phil-col>/g)].map(c => ({ key: attr(c[1], 'key'), label: text(c[2]) }));
      const rows = [...body.matchAll(/<phil-item\b([^>]*)>([\s\S]*?)<\/phil-item>/g)];
      const label = k => cols.find(c => c.key === k)?.label || `?${k}`;
      const out = [`[GRADED Q${q} — CLASSIFY] ${attr(open, 'prompt')}`,
        `  Columns: ${cols.map(c => c.label).join(' | ')}${flag(open, 'no-unsure') ? '' : ' | Not sure'}`];
      keys.push(`Q${q} CLASSIFY: ${attr(open, 'prompt')}${reviewNote(open)}`);
      rows.forEach((r, i) => {
        out.push(`  Row ${i + 1}: ${text(r[2])}`);
        keys.push(`  Row ${i + 1}: ${text(r[2])}\n      KEY: ${label(attr(r[1], 'answer'))}   WHY: ${attr(r[1], 'why')}`);
      });
      return out.join('\n');
    },
    checkset(open, body) {
      const st = [...body.matchAll(/<phil-statement\b([^>]*)>([\s\S]*?)<\/phil-statement>/g)];
      const out = [`[GRADED Q${q} — CHECK EVERY TRUE STATEMENT] ${attr(open, 'prompt')}`];
      keys.push(`Q${q} CHECKSET: ${attr(open, 'prompt')}${reviewNote(open)}`);
      st.forEach((s, i) => {
        out.push(`  ${i + 1}. ${text(s[2])}`);
        keys.push(`  ${i + 1}. ${text(s[2])}\n      KEY: ${flag(s[1], 'correct') ? 'TRUE' : 'FALSE'}`);
      });
      return out.join('\n');
    },
    mcq(open, body) {
      const ch = [...body.matchAll(/<phil-choice\b([^>]*)>([\s\S]*?)<\/phil-choice>/g)];
      const out = [`[GRADED Q${q} — MULTIPLE CHOICE] ${attr(open, 'prompt')}`];
      keys.push(`Q${q} MCQ: ${attr(open, 'prompt')}${reviewNote(open)}`);
      ch.forEach((c, i) => {
        out.push(`  ${String.fromCharCode(65 + i)}. ${text(c[2])}`);
        if (flag(c[1], 'correct')) keys.push(`  KEY: ${String.fromCharCode(65 + i)}. ${text(c[2])}`);
        else if (attr(c[1], 'feedback')) keys.push(`  ${String.fromCharCode(65 + i)} feedback: ${attr(c[1], 'feedback')}`);
      });
      return out.join('\n');
    },
    cloze(open, body) {
      keys.push(`Q${q} CLOZE${reviewNote(open)}`);
      let n = 0;
      body = body.replace(/<phil-blank\b([^>]*)>([\s\S]*?)<\/phil-blank>/g, (_, a, inner) => {
        n++;
        // Like the engine: a dropdown blank's answer is its text when it has no answer=.
        keys.push(`  Blank ${n} KEY: ${attr(a, 'answer') || text(inner)}`);
        const opts = attr(a, 'options');
        return opts ? ` [BLANK ${n}: choose from ${opts.split(',').join(' / ')}] ` : ` [BLANK ${n}: type a word] `;
      });
      return `[GRADED Q${q} — FILL THE BLANKS]\n  ${text(body)}`;
    },
  };

  const slides = [...html.matchAll(/<phil-slide\b([^>]*)>([\s\S]*?)<\/phil-slide>/g)];
  slides.forEach((m, i) => {
    let body = m[2];
    const blocks = [];
    const stash = s => { blocks.push(s); return `\u0000${blocks.length - 1}\u0000`; };
    for (const kind of Object.keys(items)) {
      body = body.replace(new RegExp(`<phil-${kind}\\b([^>]*)>([\\s\\S]*?)</phil-${kind}>`, 'g'),
        (_, open, inner) => {
          q++;
          const block = stash(items[kind](open, inner));
          // Feedback text students read after answering gets fact-checked too.
          if (attr(open, 'explain')) keys.push(`  EXPLAIN: ${attr(open, 'explain')}`);
          return block;
        });
    }
    body = body.replace(/<phil-poll\b([^>]*)>([\s\S]*?)<\/phil-poll>/g, (_, open, inner) => {
      const ch = [...inner.matchAll(/<phil-choice\b[^>]*>([\s\S]*?)<\/phil-choice>/g)].map(c => text(c[1]));
      return stash(`[UNGRADED POLL] ${attr(open, 'prompt')} Options: ${ch.join(' / ')}\n  (Shown after any pick:) ${attr(open, 'explain')}`);
    });
    body = body.replace(/<phil-thinker\b([^>]*)>/g, (_, a) => ` [Card: ${attr(a, 'name')}${attr(a, 'dates') ? ', ' + attr(a, 'dates') : ''}, ${attr(a, 'work')}] `);
    body = body.replace(/<phil-side\b([^>]*)>/g, (_, a) => ` [Side: ${attr(a, 'label')}${attr(a, 'tag') ? ' (' + attr(a, 'tag') + ')' : ''}] `);
    if (/<phil-(?!slide|thinker|side|compare|statement|choice)[a-z-]+\b/.test(body.replace(/\u0000\d+\u0000/g, '')))
      body = body.replace(/<(phil-[a-z-]+)\b[^>]*>/g, (t, n) => (/^phil-(beliefs|beliefs-review)$/.test(n) ? ' [Belief probe] ' : t));
    const parts = body.split(/(\u0000\d+\u0000)/);
    const rendered = parts.map(p => /^\u0000\d+\u0000$/.test(p) ? `\n${blocks[+p.slice(1, -1)]}\n` : text(p)).join(' ').trim();
    const local = [...m[2].matchAll(/<(phil-[a-z-]+)\b/g)].map(x => x[1]).filter(n => !ENGINE.has(n));
    const interactive = local.length
      ? ` [interactive widget here (${[...new Set(local)].join(', ')}): its contents are not shown, and a student may never open it]` : '';
    view.push(`--- Slide ${i + 1} ---\n${rendered}${interactive}`);
  });
  return { view: view.join('\n\n'), keys: keys.join('\n'), count: q };
}

await mkdir(OUT, { recursive: true });
for (const l of lessons) {
  const html = await readFile(path.join(ROOT, 'lessons', l, 'index.html'), 'utf8');
  const { view, keys, count } = render(html);
  const base = path.join(OUT, l.split('/').pop());
  await writeFile(`${base}.view.txt`, view + '\n');
  await writeFile(`${base}.keys.txt`, keys + '\n');
  console.log(`✔ ${l}: ${count} graded item(s) → ${path.relative(ROOT, base)}.view.txt / .keys.txt`);
}
