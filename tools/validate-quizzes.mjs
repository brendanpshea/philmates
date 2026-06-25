#!/usr/bin/env node
/* Auto-validate multiple-choice questions across all lessons for two classic
   "test-taking tells" that let students guess without knowing the material:

     1. LENGTH  — the correct answer should be a similar length to the
                  distractors (a conspicuously longer/shorter answer gives it away).
     2. POSITION — across a lesson's MCQs, the correct answer's position should
                  vary (don't park the answer at "A" every time).

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
    mcqs.push({ prompt, choices });
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
  let lessonCount = 0, mcqCount = 0, problemCount = 0;

  for (const topic of await ls(LESSONS)) {
    const tdir = path.join(LESSONS, topic);
    if (!(await isDir(tdir))) continue;
    for (const lesson of await ls(tdir)) {
      const file = path.join(tdir, lesson, 'index.html');
      let html; try { html = await readFile(file, 'utf8'); } catch { continue; }
      const mcqs = parseMcqs(html);
      if (!mcqs.length) continue;
      lessonCount++; mcqCount += mcqs.length;

      const lines = [];
      mcqs.forEach((q, i) => {
        const issues = checkLengths(q);
        if (issues.length) {
          problemCount += issues.length;
          lines.push(`  ⚠ Q${i + 1} "${q.prompt.slice(0, 60)}${q.prompt.length > 60 ? '…' : ''}"`);
          issues.forEach(x => lines.push(`      - ${x}`));
        }
      });
      const pos = checkPositions(mcqs);
      if (pos.issues.length) { problemCount += pos.issues.length; pos.issues.forEach(x => lines.push(`  ⚠ positions: ${x}`)); }

      const header = `${lines.length ? '⚠' : '✓'} ${topic}/${lesson}  (${mcqs.length} MCQ, answer order: ${pos.summary})`;
      console.log(header);
      lines.forEach(l => console.log(l));
    }
  }

  console.log(`\nScanned ${mcqCount} MCQ across ${lessonCount} lesson(s) — ${problemCount} issue(s).`);
  if (problemCount && STRICT) process.exit(1);
}

run();
