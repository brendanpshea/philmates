#!/usr/bin/env node
/* Auto-validate multiple-choice questions across all lessons for the classic
   "test-taking tells" that let students guess without knowing the material:

     1. LENGTH  — the correct answer should be a similar length to the
                  distractors (a conspicuously longer/shorter answer gives it away).
     2. COUNT   — four options, not three. A three-option question hands a pure
                  guesser 33%, and a guesser who can eliminate one obvious
                  throwaway is down to a coin flip.
     3. POSITION — across a lesson's MCQs, the correct answer's position should
                  vary (don't park the answer at "A" every time).

   Position is now also handled at runtime: the engine shuffles the options of
   every <phil-mcq> and <phil-checkset> on load, so authored order no longer
   reaches students. The position check stays because it still applies to any
   question marked `keep-order`, and because the printed answer order is a
   useful thing to eyeball while writing.

   Scans lessons/<topic>/<lesson>/index.html. Run:
     node tools/validate-quizzes.mjs            # report
     node tools/validate-quizzes.mjs --strict   # exit 1 if any issues (for CI)
*/

import { readFile, readdir, stat } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = path.join(ROOT, 'lessons');
const STRICT = process.argv.includes('--strict');

/* ---- tunable thresholds ---- */
const LEN_SPREAD_RATIO = 1.7;   // max/min choice length before "uneven"
const LEN_SPREAD_MIN   = 15;    // ...but ignore tiny absolute gaps (chars)
const CORRECT_LONG_RATIO = 1.3; // correct vs avg-wrong length before "too long"
const CORRECT_LONG_MIN   = 12;  // ...minimum absolute gap (chars)
const POSITION_SHARE   = 0.6;   // share of answers allowed at one position
const MIN_OPTIONS      = 4;     // options per MCQ; three is a 33% free guess

/* Repo-wide thresholds. A tell can sit under every per-item threshold and
   still be plain across the whole set: if the correct answer is the longest
   option in most questions, "pick the longest" beats the quiz even though no
   single question looks wrong. Only visible in aggregate — a two-question
   lesson cannot show it at all. */
const GLOBAL_LONGEST_MAX = 0.45; // share of items where correct is longest
const GLOBAL_POS_MAX     = 0.45; // share of all correct answers at one slot
const GLOBAL_LEN_GAP_MAX = 4.0;  // mean correct-minus-wrong length, chars

const ls = async d => { try { return await readdir(d); } catch { return []; } };
const isDir = async p => { try { return (await stat(p)).isDirectory(); } catch { return false; } };
const stripTags = s => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, 'x').replace(/\s+/g, ' ').trim();
const letter = i => String.fromCharCode(65 + i);
const mean = a => a.reduce((s, x) => s + x, 0) / a.length;

function parseMcqs(html) {
  const mcqs = [];
  const reMcq = /<phil-mcq\b([^>]*)>([\s\S]*?)<\/phil-mcq>/gi;
  let m;
  while ((m = reMcq.exec(html))) {
    const promptMatch = m[1].match(/\bprompt="([^"]*)"/i);
    const prompt = promptMatch ? promptMatch[1] : '(no prompt)';
    const choices = [];
    const reChoice = /<phil-choice\b([^>]*)>([\s\S]*?)<\/phil-choice>/gi;
    let c;
    while ((c = reChoice.exec(m[2]))) {
      const attrs = c[1].replace(/"[^"]*"/g, '');          // drop attr values (avoid matching "correct" inside feedback)
      choices.push({ correct: /\bcorrect\b/.test(attrs), len: stripTags(c[2]).length });
    }
    mcqs.push({ prompt, choices, keepOrder: /keep-order/.test(m[1].replace(/"[^"]*"/g, '')) });
  }
  return mcqs;
}

function checkLengths(mcq) {
  const issues = [];
  const lens = mcq.choices.map(c => c.len);
  if (lens.length < 2) return issues;
  const max = Math.max(...lens), min = Math.min(...lens);
  if (max / min > LEN_SPREAD_RATIO && max - min >= LEN_SPREAD_MIN)
    issues.push(`uneven option lengths (min ${min}, max ${max} chars)`);

  const ci = mcq.choices.findIndex(c => c.correct);
  if (ci >= 0) {
    const wrong = mcq.choices.filter((_, i) => i !== ci).map(c => c.len);
    const avgWrong = wrong.length ? mean(wrong) : 0;
    const cl = mcq.choices[ci].len;
    if (cl === max && cl > avgWrong * CORRECT_LONG_RATIO && cl - avgWrong >= CORRECT_LONG_MIN)
      issues.push(`correct answer is the longest (${cl} chars vs avg wrong ${avgWrong.toFixed(0)}) — a giveaway`);
    if (cl === min && avgWrong && cl < avgWrong * 0.7)
      issues.push(`correct answer is conspicuously the shortest (${cl} chars vs avg wrong ${avgWrong.toFixed(0)})`);
  }
  return issues;
}

function checkPositions(mcqs) {
  const issues = [];
  const positions = mcqs.map(q => q.choices.findIndex(c => c.correct)).filter(i => i >= 0);
  if (positions.length < 2) return { issues, summary: '' };

  const counts = {};
  positions.forEach(p => (counts[p] = (counts[p] || 0) + 1));
  const summary = positions.map(letter).join(' ');

  if (new Set(positions).size === 1)
    issues.push(`correct answer is ALWAYS in position ${letter(positions[0])} — vary it`);
  else if (positions.length >= 3) {
    const [topPos, topCount] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (topCount / positions.length > POSITION_SHARE)
      issues.push(`correct answer sits in position ${letter(+topPos)} in ${topCount}/${positions.length} questions — spread it out`);
  }
  return { issues, summary };
}

async function run() {
  let lessonCount = 0, mcqCount = 0, problemCount = 0, thinTotal = 0;
  const allMcqs = [];

  for (const topic of await ls(LESSONS)) {
    const tdir = path.join(LESSONS, topic);
    if (!(await isDir(tdir))) continue;
    for (const lesson of await ls(tdir)) {
      const file = path.join(tdir, lesson, 'index.html');
      let html; try { html = await readFile(file, 'utf8'); } catch { continue; }
      const mcqs = parseMcqs(html);
      if (!mcqs.length) continue;
      lessonCount++; mcqCount += mcqs.length;
      allMcqs.push(...mcqs);

      const lines = [];
      mcqs.forEach((q, i) => {
        const issues = checkLengths(q);
        if (issues.length) {
          problemCount += issues.length;
          lines.push(`  ⚠ Q${i + 1} "${q.prompt.slice(0, 60)}${q.prompt.length > 60 ? '…' : ''}"`);
          issues.forEach(x => lines.push(`      - ${x}`));
        }
      });
      /* One line per lesson rather than one per question: a lesson written
         before the four-option rule has this on every question, and twelve
         identical warnings bury the tells that need actual judgment. */
      const thin = mcqs.filter(q => q.choices.length < MIN_OPTIONS);
      if (thin.length) {
        problemCount++;
        thinTotal += thin.length;
        lines.push(`  ⚠ ${thin.length}/${mcqs.length} MCQ have fewer than ${MIN_OPTIONS} options `
          + `(${thin.map((q, i) => `Q${mcqs.indexOf(q) + 1}:${q.choices.length}`).join(' ')}) — add a distractor`);
      }

      const pos = checkPositions(mcqs);
      if (pos.issues.length) { problemCount += pos.issues.length; pos.issues.forEach(x => lines.push(`  ⚠ positions: ${x}`)); }

      const header = `${lines.length ? '⚠' : '✓'} ${topic}/${lesson}  (${mcqs.length} MCQ, answer order: ${pos.summary})`;
      console.log(header);
      lines.forEach(l => console.log(l));
    }
  }

  /* ---- repo-wide tells, invisible one lesson at a time ---- */
  const globals = [];
  const usable = allMcqs.filter(q => q.choices.some(c => c.correct) && q.choices.length > 1);
  if (usable.length >= 10) {
    const right = q => q.choices.find(c => c.correct).len;
    const wrong = q => q.choices.filter(c => !c.correct).map(c => c.len);

    const longest = usable.filter(q => right(q) > Math.max(...wrong(q))).length;
    if (longest / usable.length > GLOBAL_LONGEST_MAX)
      globals.push(`correct answer is the longest option in ${longest}/${usable.length} items `
        + `(${Math.round(longest / usable.length * 100)}%, chance is about 33%) `
        + `\u2014 "pick the longest" beats the quiz`);

    const gap = mean(usable.map(q => right(q) - mean(wrong(q))));
    if (Math.abs(gap) > GLOBAL_LEN_GAP_MAX)
      globals.push(`correct answers run ${gap > 0 ? '+' : ''}${gap.toFixed(1)} chars `
        + `against the wrong ones on average`);

    const slots = {};
    usable.forEach(q => { const i = q.choices.findIndex(c => c.correct); slots[i] = (slots[i] || 0) + 1; });
    const [slot, n] = Object.entries(slots).sort((a, b) => b[1] - a[1])[0];
    if (n / usable.length > GLOBAL_POS_MAX)
      globals.push(`${n}/${usable.length} correct answers sit in slot ${letter(+slot)} `
        + `(${Math.round(n / usable.length * 100)}%) across every lesson`);
  }
  if (globals.length) {
    problemCount += globals.length;
    console.log('\n\u26a0 across all lessons:');
    globals.forEach(g => console.log(`  - ${g}`));
  }

  if (thinTotal)
    console.log(`\n${thinTotal}/${mcqCount} MCQ still have fewer than ${MIN_OPTIONS} options. Each needs one more `
      + `plausible distractor — a real misconception, with feedback that names it.`);

  console.log(`\nScanned ${mcqCount} MCQ across ${lessonCount} lesson(s) — ${problemCount} issue(s).`);
  if (problemCount && STRICT) process.exit(1);
}

run();
