#!/usr/bin/env node
/* Report register tells in every string a student reads.
   The rules live in AUTHORING.md § "Register: how the prose should sound".

   What counts as a tell, and what deliberately doesn't:

     ✗ TRAILING EM DASH — one dash, and the clause after it runs to the end of
       the sentence. That is the setup/punchline rhythm students skim past.
     ✗ SEMICOLON CHAIN  — two or more in one string; the sentence is a list
       wearing a disguise.

     ✓ Paired dashes are a parenthetical, functionally a pair of commas.
     ✓ A single semicolon joining parallel clauses is doing its actual job
       ("He dies instantly; the five survive"). Splitting those makes the prose
       choppier, not simpler.
     ✓ "Term — gloss" with no sentence punctuation is a definition-list entry,
       and label-style headings, alt-text attributions and widget status strings
       are all separators rather than asides.

   The skipped categories are still tallied, so the report can show its work
   and you can second-guess the classifier.

   check-density.mjs covers slide bodies. This one also reads the places prose
   hides where nothing else looks: explain=, note= and feedback= attributes,
   <phil-statement> items, img alt text, and strings inside the widget JS.
   Quoted source material keeps its own punctuation and is skipped.

   Reports only. It never exits non-zero: a gate would teach writing around the
   checker rather than writing better.

     node tools/check-register.mjs           # counts per lesson
     node tools/check-register.mjs --list    # every tell, with its text
     node tools/check-register.mjs --all     # also list the skipped categories
*/

import { readFile, readdir, stat } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = path.join(ROOT, 'lessons');
const LIST = process.argv.includes('--list');
const ALL = process.argv.includes('--all');

const EM = '—';
const strip = h => h.replace(/<[^>]+>/g, '').replace(/&#39;/g, "'").replace(/&[a-z]+;/g, ' ').trim();

function dropQuotes(s) {
  return s
    .replace(/<blockquote[\s\S]*?<\/blockquote>/gi, ' ')
    .replace(/["“][^"“”]{40,}["”]/g, ' ');
}

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
  for (const m of body.matchAll(/\b(?:explain|note|prompt|fail|tag|feedback)="([^"]+)"/g)) add('quiz/poll text', m[1]);
  for (const m of body.matchAll(/\balt="([^"]+)"/g)) add('alt text', m[1]);
  return out;
}

/* Widget JS: string literals only, and only ones holding a real sentence, so we
   skip selectors, ids and the fragments left behind when a literal contains an
   escaped quote. */
function harvestJS(src) {
  const out = [];
  for (const m of src.matchAll(/(['"`])((?:[^\\\n]|\\.){12,}?)\1/g)) {
    const t = strip(dropQuotes(m[2]));
    if (/\s/.test(t) && /[a-z]{3}/i.test(t) && !/^[.#][\w-]+$/.test(t))
      out.push({ kind: 'widget JS', text: t });
  }
  return out;
}

/* One string in, one verdict out. `tell` is the only thing that gets counted. */
function classify({ kind, text }) {
  const dashes = (text.match(new RegExp(EM, 'g')) || []).length;
  const semis = (text.match(/;/g) || []).length;

  if (semis >= 2) return { tell: true, why: 'semicolon chain' };

  if (dashes === 0) return semis ? { tell: false, why: 'single semicolon (parallel clauses)' } : null;
  if (kind === 'alt text') return { tell: false, why: 'alt-text attribution' };
  if (kind === 'heading') return { tell: false, why: 'label-style heading' };
  if (kind === 'widget JS' && /\$\{/.test(text)) return { tell: false, why: 'widget status string' };
  if (dashes >= 2) return { tell: false, why: 'paired dashes (parenthetical)' };
  // "Nonmaleficence — do no harm": a definition-list entry, not a sentence.
  if (text.length < 90 && !/[.!?]/.test(text.replace(/\.\.\./g, '')))
    return { tell: false, why: 'term-then-gloss label' };

  return { tell: true, why: 'trailing em dash' };
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
  let total = 0, hidden = 0;
  const rows = [], skipped = {};

  for (const { name, dir } of await lessonDirs()) {
    const items = harvest(await readFile(path.join(dir, 'index.html'), 'utf8'));
    try {
      for (const f of await readdir(path.join(dir, 'assets'))) {
        if (f.endsWith('.js')) items.push(...harvestJS(await readFile(path.join(dir, 'assets', f), 'utf8')));
      }
    } catch { /* no assets dir */ }

    const tells = [];
    for (const it of items) {
      const v = classify(it);
      if (!v) continue;
      if (v.tell) tells.push({ ...it, why: v.why });
      else (skipped[v.why] = skipped[v.why] || []).push({ ...it, lesson: name });
    }
    const off = tells.filter(t => t.kind !== 'slide body' && t.kind !== 'heading').length;
    total += tells.length; hidden += off;
    rows.push({ name, tells, off });
  }

  rows.sort((a, b) => b.tells.length - a.tells.length);
  for (const r of rows) {
    const n = r.tells.length;
    console.log(`${n === 0 ? '✓' : '⚠'} ${r.name}  (${n} tell${n === 1 ? '' : 's'}`
      + (r.off ? `, ${r.off} outside the slide body` : '') + ')');
    if (LIST) for (const t of r.tells) console.log(`    [${t.kind}] ${t.text.slice(0, 120)}`);
  }

  console.log(`\n${total} tell(s) across ${rows.length} lesson(s); `
    + `${hidden} sit in text no other tool reads.`);

  const skipTotal = Object.values(skipped).reduce((a, v) => a + v.length, 0);
  console.log(`${skipTotal} more use a dash or semicolon legitimately:`);
  for (const [why, hits] of Object.entries(skipped).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${String(hits.length).padStart(4)}  ${why}`);
    if (ALL) for (const h of hits) console.log(`          ${h.lesson} [${h.kind}] ${h.text.slice(0, 90)}`);
  }
  if (!LIST && total) console.log('\nRe-run with --list to see the tells (--all to audit the skips).');
}

run();
