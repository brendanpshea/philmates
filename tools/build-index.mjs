#!/usr/bin/env node
/* Regenerate /index.html by scanning lessons/<topic>/<lesson>/index.html.
   Title comes from the <phil-lesson title="..."> attribute; description from
   <meta name="description">. Run:  node tools/build-index.mjs                 */

import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = path.join(ROOT, 'lessons');

const grab = (html, re) => (html.match(re)?.[1] || '').trim();
const count = (html, re) => (html.match(re) || []).length;
const slug = s => s.replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');

async function collect() {
  const topics = {};
  for (const topic of await ls(LESSONS)) {
    const tdir = path.join(LESSONS, topic);
    if (!(await isDir(tdir))) continue;
    for (const lesson of await ls(tdir)) {
      const file = path.join(tdir, lesson, 'index.html');
      let html;
      try { html = await readFile(file, 'utf8'); } catch { continue; }
      const slides = count(html, /<phil-slide[\s>]/gi);
      const questions = count(html, /<phil-(?:mcq|checkset|cloze)[\s>]/gi);
      const scorm = `dist/scorm/${slug(topic)}-${slug(lesson)}-scorm12.zip`;
      (topics[topic] ||= []).push({
        href: `lessons/${topic}/${lesson}/index.html`,
        scorm,
        scormReady: await exists(path.join(ROOT, scorm)),
        title: grab(html, /<phil-lesson[^>]*\btitle="([^"]+)"/i) || lesson,
        subject: grab(html, /<phil-lesson[^>]*\bsubject="([^"]+)"/i),
        desc:  grab(html, /<meta\s+name="description"\s+content="([^"]+)"/i),
        slides, questions,
        minutes: Math.max(5, Math.round((slides * 0.6) / 5) * 5),  // ~0.6 min/slide, to nearest 5
      });
    }
  }
  return topics;
}

const ls = async d => { try { return await readdir(d); } catch { return []; } };
const isDir = async p => { try { return (await stat(p)).isDirectory(); } catch { return false; } };
const exists = async p => { try { await stat(p); return true; } catch { return false; } };
const pretty = s => s.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

function render(topics) {
  const all = Object.values(topics).flat();
  const anyScorm = all.some(l => l.scormReady);

  const sections = Object.entries(topics).map(([topic, lessons]) => `
      <section class="topic">
        <h2>${pretty(topic)}</h2>
        <div class="cards">
          ${lessons.map(l => `
          <a class="card" href="${l.href}">
            <h3>${l.title}${l.subject ? ` <span class="card-topic">(${l.subject})</span>` : ''}</h3>
            <p>${l.desc || ''}</p>
            <div class="meta">
              <span class="badge">⏱ ~${l.minutes} min</span>
              <span class="badge">❓ ${l.questions} question${l.questions === 1 ? '' : 's'}</span>
            </div>
          </a>`).join('')}
        </div>
      </section>`).join('\n');

  // Per-lesson SCORM downloads (instructor lane). Only links files that exist.
  const downloads = all.map(l => `
          <li>
            <span class="dl-title">${l.title} <span class="dl-sub">— ${l.subject || ''}</span></span>
            ${l.scormReady
              ? `<a class="btn btn--sm" href="${l.scorm}" download>SCORM 1.2 ↓</a>`
              : `<span class="dl-pending">not built yet</span>`}
          </li>`).join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PhilMates — Story-driven Philosophy Lessons</title>
  <meta name="description" content="Free, story-driven philosophy lessons you can finish in one sitting — on a projector, a phone, or inside your LMS via SCORM. Built for classrooms and self-learners.">
  <link rel="icon" type="image/svg+xml" href="shared/assets/favicon.svg">
  <link rel="stylesheet" href="shared/phil-core.css">
  <style>
    body { padding: 0; }
    .wrap { max-width: 1000px; margin: 0 auto; padding: 0 16px 72px; }
    a { color: var(--accent-3); }

    /* sticky mini-nav */
    .nav { position: sticky; top: 0; z-index: 10; background: var(--panel);
           border-bottom: 3px solid var(--border); box-shadow: 0 3px 0 var(--shadow); }
    .nav__in { max-width: 1000px; margin: 0 auto; padding: 10px 16px; display: flex;
               flex-wrap: wrap; align-items: center; gap: 8px 18px; }
    .nav__brand { font-family: var(--pixel); color: var(--accent-2); font-size: 13px; margin-right: auto; }
    .nav a { font-family: var(--pixel); font-size: 9px; color: var(--muted); text-decoration: none; }
    .nav a:hover { color: var(--accent); }

    /* hero */
    .hero { padding: 56px 0 8px; }
    .hero h1 { font-family: var(--pixel); color: var(--accent-2); font-size: 30px; line-height: 1.4;
               text-shadow: 3px 3px 0 var(--border); margin: 0 0 16px; }
    .hero .tag { color: var(--ink); max-width: 60ch; font-size: 1.15em; }
    .hero .ctas { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 26px; }

    /* buttons */
    .btn { display: inline-block; font-family: var(--pixel); font-size: 11px; text-decoration: none;
           color: var(--ink); background: var(--accent); border: 3px solid var(--border);
           box-shadow: 0 5px 0 var(--shadow); padding: 14px 18px; transition: transform .05s; }
    .btn:hover { transform: translateY(-2px); }
    .btn:active { transform: translateY(3px); box-shadow: 0 2px 0 var(--shadow); }
    .btn--ghost { background: var(--panel-2); color: var(--accent-3); }
    .btn--sm { font-size: 9px; padding: 8px 10px; box-shadow: 0 3px 0 var(--shadow); }

    /* generic section */
    section { margin-top: 56px; scroll-margin-top: 64px; }
    .h-pixel { font-family: var(--pixel); color: var(--accent-3); font-size: 16px; }
    .lead { color: var(--muted); max-width: 64ch; }

    /* "what is" feature row */
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 20px; }
    .feature { background: var(--panel-2); border: 3px solid var(--border); box-shadow: 0 5px 0 var(--shadow); padding: 18px; }
    .feature h3 { font-family: var(--pixel); font-size: 11px; color: var(--accent); margin: 0 0 8px; line-height: 1.5; }
    .feature p { color: var(--muted); font-size: .92em; margin: 0; }

    /* lesson cards */
    .topic h2 { font-family: var(--pixel); color: var(--accent-3); font-size: 15px; margin-top: 36px; }
    .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
    .card { display: flex; flex-direction: column; text-decoration: none; color: var(--ink); background: var(--panel-2);
            border: 3px solid var(--border); box-shadow: 0 5px 0 var(--shadow); padding: 18px; transition: transform .05s; }
    .card:hover { transform: translateY(-3px); background: #313a5e; }
    .card:active { transform: translateY(2px); box-shadow: 0 2px 0 var(--shadow); }
    .card h3 { font-family: var(--pixel); font-size: 12px; color: var(--accent); margin: 0 0 8px; line-height: 1.5; }
    .card-topic { font-family: var(--body); font-weight: 400; font-size: 15px; color: var(--accent-3); }
    .card p { color: var(--muted); font-size: .9em; margin: 0 0 14px; }
    .card .meta { margin-top: auto; display: flex; flex-wrap: wrap; gap: 8px; }
    .badge { font-family: var(--pixel); font-size: 8px; color: var(--muted); background: var(--panel);
             border: 2px solid var(--border); padding: 5px 7px; }

    /* instructor lane */
    .ways { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 20px; }
    .way { background: var(--panel-2); border: 3px solid var(--border); box-shadow: 0 5px 0 var(--shadow); padding: 18px; }
    .way .n { font-family: var(--pixel); font-size: 18px; color: var(--accent-2); }
    .way h3 { font-family: var(--pixel); font-size: 11px; color: var(--accent); margin: 8px 0; line-height: 1.5; }
    .way p { color: var(--muted); font-size: .9em; margin: 0; }
    .panel { background: var(--panel-2); border: 3px solid var(--border); box-shadow: 0 5px 0 var(--shadow); padding: 22px; margin-top: 22px; }
    .panel h3 { font-family: var(--pixel); font-size: 12px; color: var(--accent-2); margin: 0 0 6px; }
    .dl-list { list-style: none; padding: 0; margin: 14px 0 0; }
    .dl-list li { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-top: 2px solid var(--border); }
    .dl-title { flex: 1; }
    .dl-sub { color: var(--muted); font-size: .85em; }
    .dl-pending { color: var(--muted); font-size: .8em; font-style: italic; }
    code, .mono { font-family: ui-monospace, Menlo, Consolas, monospace; background: var(--panel); padding: 2px 6px; border: 2px solid var(--border); }
    .note { color: var(--muted); font-size: .85em; margin-top: 14px; }

    /* about */
    .about p { max-width: 68ch; }

    footer { margin-top: 64px; padding-top: 22px; border-top: 3px solid var(--border); color: var(--muted); font-size: .85em; }
  </style>
</head>
<body>

  <nav class="nav"><div class="nav__in">
    <span class="nav__brand">★ PhilMates</span>
    <a href="#what">What</a>
    <a href="#lessons">Lessons</a>
    <a href="#instructors">For Instructors</a>
    <a href="#about">About</a>
  </div></nav>

  <div class="wrap">

    <header class="hero">
      <h1>Philosophy you can<br>actually finish.</h1>
      <p class="tag">PhilMates turns one big idea into a short, playable story — answer questions, make choices, and watch your own beliefs shift. Free to use, runs in any browser, no install or sign-up. Project it in class, send the link, or drop it into your LMS.</p>
      <div class="ctas">
        <a class="btn" href="#lessons">▶ Browse lessons</a>
        <a class="btn btn--ghost" href="#instructors">For instructors →</a>
      </div>
    </header>

    <section id="what">
      <h2 class="h-pixel">What is PhilMates?</h2>
      <p class="lead">Most intros to philosophy ask students to read first and care later. PhilMates flips that: every lesson is a small narrative — Van Helsing's clinic, a courtroom of philosophers — that earns attention first, then teaches the concept underneath. They're built for a single class period or a solo study session.</p>
      <div class="features">
        <div class="feature"><h3>Story first</h3><p>Each topic is wrapped in a memorable scenario with characters and stakes, not a wall of definitions. Concepts arrive when you already want the answer.</p></div>
        <div class="feature"><h3>Actually interactive</h3><p>Multiple choice, fill-in-the-blank, and "where do you stand?" belief probes that revisit your earlier answers — so students see their own thinking change.</p></div>
        <div class="feature"><h3>Works anywhere</h3><p>Pure HTML, CSS, and JavaScript. No accounts, no tracking, no install. Progress saves locally, and completion reports cleanly to an LMS via SCORM.</p></div>
      </div>
    </section>

    <section id="lessons">
      <h2 class="h-pixel">Lessons</h2>
      <p class="lead">Pick any lesson and start — no setup. Use <span class="mono">→</span> / <strong>Next</strong> to advance, <strong>F</strong> for fullscreen. Your progress is saved on this device.</p>
${sections}
    </section>

    <section id="instructors">
      <h2 class="h-pixel">For Instructors</h2>
      <p class="lead">PhilMates is free and openly licensed (CC BY-NC 4.0) — use and adapt it for your classes. Three ways to run it — pick whatever fits your room and tools.</p>
      <div class="ways">
        <div class="way"><div class="n">1</div><h3>Project it</h3><p>Open a lesson on the classroom display and click through together. The <span class="mono">↺ Reset</span> button clears progress so you can re-run it live each period.</p></div>
        <div class="way"><div class="n">2</div><h3>Share the link</h3><p>Send students straight to a lesson URL for homework or flipped prep. Works on phones; progress saves on their device. Nothing to install.</p></div>
        <div class="way"><div class="n">3</div><h3>Load into your LMS</h3><p>Download the SCORM package below and upload it to Canvas, Blackboard, Moodle, or D2L. Completion <em>and</em> a score report to your gradebook automatically.</p></div>
      </div>

      <div class="panel">
        <h3>SCORM packages (SCORM 1.2)</h3>
        <p class="lead">Each lesson is a self-contained, single-SCO package. On finishing, the LMS records <strong>completed/passed</strong> plus a <strong>score</strong>; learners can leave and resume where they left off. Upload the <span class="mono">.zip</span> as-is — don't unzip it.</p>
        <ul class="dl-list">${downloads}</ul>
        ${anyScorm ? '' : '<p class="note">No packages built yet. Run <span class="mono">node tools/build-scorm.mjs --all</span>, commit <span class="mono">dist/scorm/</span>, then rebuild this page.</p>'}
        <p class="note">Technical details, version notes, and how scoring maps to the gradebook are in <a href="docs/scorm.md">docs/scorm.md</a>.</p>
      </div>
    </section>

    <section id="about" class="about">
      <h2 class="h-pixel">About</h2>
      <p><strong>PhilMates</strong> grew out of a simple classroom observation: students engage with philosophy far more readily when an idea is a <em>story</em> they're inside than when it's a chapter they're assigned. Each lesson is designed as a short, self-contained activity that hooks first and explains second — and that a busy instructor can adopt without changing how they already run their course.</p>
      <p>PhilMates is built and maintained by <strong>Brendan Shea</strong>, Professor of Philosophy and Computer Science at Rochester Community and Technical College and a Resident Fellow at the Minnesota Center for Philosophy of Science (University of Minnesota–Twin Cities). His teaching and research center on philosophy of science and applied ethics — especially bioethics and the ethics of AI — alongside logic and philosophical pedagogy. He teaches everything from Bioethics and Logic to Intro to Computer Science, and does a fair amount of public philosophy through popular writing, community courses, and service on scientific review boards.</p>
      <p>Get in touch: <a href="mailto:brendanpshea@gmail.com">brendanpshea@gmail.com</a>. Contributions and classroom feedback are welcome.</p>
    </section>

    <footer>
      <p>★ PhilMates — open educational resources for philosophy. Licensed under <a href="LICENSE">CC BY-NC 4.0</a>. Authoring guide: <a href="AUTHORING.md">AUTHORING.md</a>.</p>
    </footer>

  </div>
</body>
</html>
`;
}

const topics = await collect();
await writeFile(path.join(ROOT, 'index.html'), render(topics));
const total = Object.values(topics).reduce((n, a) => n + a.length, 0);
console.log(`✔ index.html rebuilt — ${total} lesson(s) across ${Object.keys(topics).length} topic(s).`);
