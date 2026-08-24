#!/usr/bin/env node
/* Report register tells in every string a student reads.
   The rules live in AUTHORING.md § "Register: how the prose should sound";
   this only finds the two mechanical tells that survive a human read-through:

     1. EM DASH   — the clause after it is a separate sentence or it is
                    decoration. Split it or cut it.
     2. SEMICOLON — same failure, different punctuation.

   check-density.mjs covers slide bodies. This one deliberately also reads the
   places prose hides where nothing else looks: explain= and note= attributes,
   <phil-statement> items, img alt text, and strings inside the widget JS. Those
   hold about as much text as the slides do.

   Quoted source material keeps its own punctuation, so anything inside a
   <blockquote> or a "..." span of 40+ chars is skipped.

   Reports only. It never exits non-zero, because the number that would gate a
   build is a judgment call, not a lint rule.

     node tools/check-register.mjs           # summary per lesson
     node tools/check-register.mjs --list    # every hit, with its text
*/

import { readFile, readdir, stat } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = path.join(ROOT, 'lessons');
const LIST = process.argv.includes('--list');

const EM = '—';
const strip = h => h.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').trim();

/* Quotations keep the source's punctuation. Drop <blockquote> bodies outright,
   and any run inside double quotes long enough to be a real citation rather
   than a scare-quoted term. */
function dropQuotes(s) {
  return s
    .replace(/<blockquote[\s\S]*?<\/blockquote>/gi, ' ')
    .replace(/["“][^"“”]{40,}["”]/g, ' ');
}

/* Every student-visible string in a lesson's index.html, tagged by where it
   came from so the report can say which ones nothing else checks. */
function harvest(html) {
  const out = [];
  const add = (kind, text) => {
    const t = strip(dropQuotes(text));
    if (t) out.push({ kind, text: t });
  };

  const body = html.replace(/<!--[\s\S]*?-->/g, ' ');           // comments are invisible
  for (const m of body.matchAll(/<(li|p)\b[^>]*>([\s\S]*?)<\/\1>/g)) add('slide body', m[2]);
  for (const m of body.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/g)) add('heading', m[1]);
  for (const m of body.matchAll(/<phil-statement\b[^>]*>([\s\S]*?)<\/phil-statement>/g)) add('checkset item', m[1]);
  for (const m of body.matchAll(/<phil-(choice|side|option|cond|req)\b[^>]*>([\s\S]*?)<\/phil-\1>/g)) add('widget body', m[2]);
  for (const m of body.matchAll(/\b(?:explain|note|prompt|fail|tag)="([^"]+)"/g)) add('quiz/poll text', m[1]);
  for (const m of body.matchAll(/\balt="([^"]+)"/g)) add('alt text', m[1]);
  return out;
}

/* Widget JS: only string literals, and only ones with a space in them, so we
   skip selectors, class names and ids. */
function harvestJS(src) {
  const out = [];
  for (const m of src.matchAll(/(['"`])((?:[^\\\n]|\\.){12,}?)\1/g)) {
    const t = m[2];
    if (/\s/.test(t) && !/^[.#][\w-]+$/.test(t)) out.push({ kind: 'widget JS', text: strip(dropQuotes(t)) });
  }
  return out;
}

async function lessonDirs() {
  const found = [];
  for (const topic of await readdir(LESSONS)) {
    const td = path.join(LESSONS, topic);
    if (!(await stat(td)).isDirectory()) continue;
    for (const slug of await readdir(td)) {
      const d = path.join(td, slug);
      try {
        await stat(path.join(d, 'index.html'));
        found.push({ name: `${topic}/${slug}`, dir: d });
      } catch { /* not a lesson */ }
    }
  }
  return found;
}

async function run() {
  let total = 0, unchecked = 0;
  const rows = [];

  for (const { name, dir } of await lessonDirs()) {
    let items = harvest(await readFile(path.join(dir, 'index.html'), 'utf8'));
    try {
      for (const f of await readdir(path.join(dir, 'assets'))) {
        if (f.endsWith('.js')) items.push(...harvestJS(await readFile(path.join(dir, 'assets', f), 'utf8')));
      }
    } catch { /* no assets dir */ }

    const hits = [];
    for (const it of items) {
      /* A heading like "Dossier 3 — The Ninth Sun" uses the dash to separate a
         label from a title. That is not the setup/punchline tell, so headings
         are judged on semicolons only. */
      const dashes = it.kind === 'heading'
        ? 0 : (it.text.match(new RegExp(EM, 'g')) || []).length;
      const semis = (it.text.match(/;/g) || []).length;
      if (dashes + semis) hits.push({ ...it, dashes, semis });
    }
    const n = hits.reduce((a, h) => a + h.dashes + h.semis, 0);
    const hidden = hits.filter(h => h.kind !== 'slide body' && h.kind !== 'heading')
                       .reduce((a, h) => a + h.dashes + h.semis, 0);
    total += n; unchecked += hidden;
    rows.push({ name, n, hidden, hits });
  }

  rows.sort((a, b) => b.n - a.n);
  for (const r of rows) {
    const mark = r.n === 0 ? '✓' : '⚠';
    console.log(`${mark} ${r.name}  (${r.n} tell${r.n === 1 ? '' : 's'}`
      + (r.hidden ? `, ${r.hidden} outside the slide body` : '') + ')');
    if (LIST) for (const h of r.hits) console.log(`    [${h.kind}] ${h.text.slice(0, 120)}`);
  }

  console.log(`\n${total} register tell(s) across ${rows.length} lesson(s); `
    + `${unchecked} sit in text no other tool reads.`);
  if (!LIST && total) console.log('Re-run with --list to see them.');
}

run();
