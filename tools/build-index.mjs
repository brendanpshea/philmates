#!/usr/bin/env node
/* Regenerate the two site pages by scanning lessons/<topic>/<lesson>/index.html.

     /index.html         the catalog: topic filter, one compact card per lesson
     /instructors.html   what PhilMates is, how to run it, SCORM downloads, about

   Title comes from the <phil-lesson title="..."> attribute; description from
   <meta name="description">. Lesson order within a topic comes from
   lessons/order.json; anything not listed there follows in folder order.
   Card images come from shared/thumbs/ (python tools/build-thumbs.py) and fall
   back to the lesson's first slide illustration.

   Run:  node tools/build-index.mjs                                            */

import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getScormFilename } from './build-scorm.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = path.join(ROOT, 'lessons');

const grab = (html, re) => (html.match(re)?.[1] || '').trim();
const count = (html, re) => (html.match(re) || []).length;

async function collect() {
  let order = {};
  try { order = JSON.parse(await readFile(path.join(LESSONS, 'order.json'), 'utf8')); } catch { /* optional */ }

  const topics = {};
  for (const topic of await ls(LESSONS)) {
    const tdir = path.join(LESSONS, topic);
    if (!(await isDir(tdir))) continue;
    for (const lesson of await ls(tdir)) {
      const file = path.join(tdir, lesson, 'index.html');
      let html;
      try { html = await readFile(file, 'utf8'); } catch { continue; }
      const slides = count(html, /<phil-slide[\s>]/gi);
      const optional = count(html, /<phil-slide[^>]*\boptional\b/gi);
      const questions = count(html, /<phil-(?:mcq|checkset|cloze)[\s>]/gi);
      const scorm = `dist/scorm/${getScormFilename(topic, lesson)}`;
      const thumb = `shared/thumbs/${topic}--${lesson}.webp`;
      const art = grab(html, /<img[^>]*\bslot="art"[^>]*\bsrc="\.\/([^"]+)"/i);
      (topics[topic] ||= []).push({
        slug: lesson,
        id: grab(html, /<phil-lesson[^>]*\bid="([^"]+)"/i),
        href: `lessons/${topic}/${lesson}/index.html`,
        scorm,
        scormReady: await exists(path.join(ROOT, scorm)),
        image: (await exists(path.join(ROOT, thumb))) ? thumb : art ? `lessons/${topic}/${lesson}/${art}` : '',
        title: grab(html, /<phil-lesson[^>]*\btitle="([^"]+)"/i) || lesson,
        subject: grab(html, /<phil-lesson[^>]*\bsubject="([^"]+)"/i),
        desc:  grab(html, /<meta\s+name="description"\s+content="([^"]+)"/i),
        slides, questions,
        required: slides - optional,                                  // what the progress bar counts
        minutes: Math.max(5, Math.round((slides * 0.6) / 5) * 5),  // ~0.6 min/slide, to nearest 5
      });
    }
    const want = order[topic] || [];
    const rank = l => { const i = want.indexOf(l.slug); return i === -1 ? want.length : i; };
    topics[topic]?.sort((a, b) => rank(a) - rank(b));               // stable: unlisted keep folder order
  }
  return topics;
}

const ls = async d => { try { return await readdir(d); } catch { return []; } };
const isDir = async p => { try { return (await stat(p)).isDirectory(); } catch { return false; } };
const exists = async p => { try { await stat(p); return true; } catch { return false; } };
const pretty = s => s.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace(/\bAi\b/g, 'AI');

/* ---- shared chrome ----------------------------------------------------- */

const BASE_CSS = `
    body { padding: 0; }
    .wrap { max-width: 1000px; margin: 0 auto; padding: 0 16px 72px; }
    a { color: var(--accent-3); }

    /* skip link — visible only once focused */
    .skip { position: absolute; left: -9999px; top: 0; z-index: 20;
            font-family: var(--pixel); font-size: 11px; color: var(--bg);
            background: var(--accent-3); padding: 12px 16px; text-decoration: none; }
    .skip:focus { left: 8px; top: 8px; }

    /* focus indicator — the UA default is not guaranteed on this dark theme */
    :where(a, button, input, select, textarea):focus-visible {
      outline: 3px solid var(--accent-3); outline-offset: 2px;
    }

    /* sticky mini-nav */
    .nav { position: sticky; top: 0; z-index: 10; background: var(--panel);
           border-bottom: 3px solid var(--border); box-shadow: 0 3px 0 var(--shadow); }
    .nav__in { max-width: 1000px; margin: 0 auto; padding: 10px 16px; display: flex;
               flex-wrap: wrap; align-items: center; gap: 8px 18px; }
    .nav__brand { font-family: var(--pixel); color: var(--accent-2); font-size: 13px; margin-right: auto; text-decoration: none; }
    .nav a:not(.nav__brand) { font-family: var(--pixel); font-size: 9px; color: var(--muted); text-decoration: none; }
    .nav a:not(.nav__brand):hover, .nav a[aria-current="page"] { color: var(--accent); }

    .h-pixel { font-family: var(--pixel); color: var(--accent-3); font-size: 16px; }
    .lead { color: var(--muted); max-width: 64ch; }
    code, .mono { font-family: ui-monospace, Menlo, Consolas, monospace; background: var(--panel); padding: 2px 6px; border: 2px solid var(--border); }

    /* buttons */
    /* dark ink on the green, not --ink: near-white on #46e07a is 1.52:1. */
    .btn { display: inline-block; font-family: var(--pixel); font-size: 11px; text-decoration: none;
           color: var(--bg); background: var(--accent); border: 3px solid var(--border);
           box-shadow: 0 5px 0 var(--shadow); padding: 14px 18px; transition: transform .05s; }
    .btn:hover { transform: translateY(-2px); }
    .btn:active { transform: translateY(3px); box-shadow: 0 2px 0 var(--shadow); }
    .btn--sm { font-size: 9px; padding: 8px 10px; box-shadow: 0 3px 0 var(--shadow); }

    /* a page-level landmark, so it sits outside <main> and carries .wrap itself */
    footer.wrap { margin-top: 56px; padding-top: 22px; border-top: 3px solid var(--border); color: var(--muted); font-size: .85em; }`;

const head = (title, desc, css) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="icon" type="image/svg+xml" href="shared/assets/favicon.svg">
  <link rel="stylesheet" href="shared/phil-core.css">
  <style>${BASE_CSS}
${css}
  </style>
</head>
<body>

  <a class="skip" href="#main">Skip to content</a>
`;

const nav = (here) => `
  <nav class="nav" aria-label="Site"><div class="nav__in">
    <a class="nav__brand" href="index.html">★ PhilMates</a>
    <a href="index.html"${here === 'lessons' ? ' aria-current="page"' : ''}>Lessons</a>
    <a href="instructors.html"${here === 'instructors' ? ' aria-current="page"' : ''}>For Instructors</a>
    <a href="instructors.html#about">About</a>
  </div></nav>
`;

const FOOTER = `
  <footer class="wrap">
    <p>★ PhilMates — open educational resources for philosophy. Licensed under <a href="LICENSE">CC BY-NC 4.0</a>. Authoring guide: <a href="AUTHORING.md">AUTHORING.md</a>.</p>
  </footer>
`;

/* ---- the catalog (index.html) ------------------------------------------ */

function renderCatalog(topics) {
  const total = Object.values(topics).reduce((n, a) => n + a.length, 0);

  const chips = [`<button type="button" class="chip" data-topic="all" aria-pressed="true">All <span class="chip__n">${total}</span></button>`]
    .concat(Object.entries(topics).map(([topic, lessons]) =>
      `<button type="button" class="chip" data-topic="${topic}" aria-pressed="false">${pretty(topic)} <span class="chip__n">${lessons.length}</span></button>`))
    .join('\n        ');

  const sections = Object.entries(topics).map(([topic, lessons]) => `
      <section class="topic" id="${topic}" data-topic="${topic}">
        <h3>${pretty(topic)}</h3>
        <div class="cards">
          ${lessons.map(l => `
          <a class="card" href="${l.href}" data-lesson="${l.id}" data-slides="${l.required}">
            ${l.image ? `<img class="card__img" src="${l.image}" alt="" width="96" height="96" loading="lazy" decoding="async">` : '<span class="card__img card__img--none" aria-hidden="true">★</span>'}
            <div class="card__body">
              <h4>${l.title}</h4>
              ${l.subject ? `<p class="card__subject">${l.subject}</p>` : ''}
              <p class="card__desc">${l.desc || ''}</p>
            </div>
            <div class="meta">
              <span class="badge">~${l.minutes} min</span>
              <span class="badge">${l.questions} question${l.questions === 1 ? '' : 's'}</span>
              <span class="badge badge--progress" hidden></span>
            </div>
          </a>`).join('')}
        </div>
      </section>`).join('\n');

  return head('PhilMates — Story-driven Philosophy Lessons',
    'Free, story-driven philosophy lessons you can finish in one sitting — on a projector, a phone, or inside your LMS via SCORM. Built for classrooms and self-learners.', `
    /* hero: short, so the lessons start on the first screen */
    .hero { padding: 30px 0 0; }
    .hero h1 { font-family: var(--pixel); color: var(--accent-2); font-size: 22px; line-height: 1.5;
               text-shadow: 3px 3px 0 var(--border); margin: 0 0 10px; }
    .hero p { color: var(--muted); max-width: 70ch; margin: 0; }

    /* topic filter */
    .filter { display: flex; flex-wrap: wrap; gap: 10px; margin: 22px 0 0; }
    .chip { font-family: var(--pixel); font-size: 10px; line-height: 1.4; color: var(--muted); background: var(--panel-2);
            border: 3px solid var(--border); box-shadow: 0 4px 0 var(--shadow); padding: 10px 12px; cursor: pointer; }
    .chip:hover { color: var(--ink); }
    .chip[aria-pressed="true"] { color: var(--bg); background: var(--accent); }
    .chip__n { font-family: var(--body); font-size: 14px; font-weight: 600; margin-left: 4px; }   /* the pixel font's 6 and 8 read as G and & */
    .filter-status { position: absolute; left: -9999px; }

    /* lesson cards: picture left, text right */
    .topic { scroll-margin-top: 64px; }
    .topic h3 { font-family: var(--pixel); color: var(--accent-3); font-size: 14px; margin: 30px 0 12px; }
    .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }
    .card { display: grid; grid-template-columns: auto 1fr; grid-template-rows: 1fr auto; gap: 10px 12px; align-items: start; text-decoration: none; color: var(--ink); background: var(--panel-2);
            border: 3px solid var(--border); box-shadow: 0 5px 0 var(--shadow); padding: 12px; transition: transform .05s; }
    .card:hover { transform: translateY(-3px); background: #2b3252; }   /* #313a5e put the muted text at 4.45:1 */
    .card:active { transform: translateY(2px); box-shadow: 0 2px 0 var(--shadow); }
    .card__img { flex: none; width: 96px; height: 96px; object-fit: cover; image-rendering: pixelated;
                 border: 3px solid var(--border); background: var(--panel); }
    .card__img--none { display: grid; place-items: center; font-size: 28px; color: var(--accent-2); }
    .card__body { min-width: 0; }
    .card h4 { font-family: var(--pixel); font-size: 11px; color: var(--accent); margin: 0 0 4px; line-height: 1.5; }
    .card__subject { color: var(--accent-3); font-size: .9em; line-height: 1.35; margin: 0 0 4px;
                     display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden; }
    .card__desc { color: var(--muted); font-size: .85em; line-height: 1.4; margin: 0;
                  display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden; }
    .card .meta { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 6px; }
    .badge { font-family: var(--pixel); font-size: 8px; color: var(--muted); background: var(--panel);
             border: 2px solid var(--border); padding: 4px 6px; }
    .badge--progress { color: var(--accent); }
    .badge--progress.is-done { color: var(--bg); background: var(--accent); }

    .more { margin-top: 40px; color: var(--muted); }
    @media (max-width: 420px) { .card__img { width: 72px; height: 72px; } .hero h1 { font-size: 17px; } }`)
  + nav('lessons') + `
  <main class="wrap" id="main">

    <header class="hero">
      <h1>Philosophy you can actually finish.</h1>
      <p>Each lesson is one big idea told as a short, playable story. Pick one and start: no sign-up, and your progress is saved on this device.</p>
    </header>

    <section id="lessons" aria-labelledby="lessons-h">
      <h2 class="h-pixel" id="lessons-h" style="position:absolute;left:-9999px">Lessons</h2>
      <div class="filter" role="group" aria-label="Show lessons from">
        ${chips}
      </div>
      <p class="filter-status" role="status" aria-live="polite"></p>
${sections}
    </section>

    <p class="more">Teaching with these? <a href="instructors.html">For instructors</a> covers how to run a lesson in class and has the SCORM packages for your LMS.</p>

  </main>
${FOOTER}
  <script>
    /* Topic filter. Without this script every topic simply stays visible. */
    (() => {
      const chips = [...document.querySelectorAll('.chip')];
      const sections = [...document.querySelectorAll('.topic')];
      const status = document.querySelector('.filter-status');
      const known = t => t === 'all' || sections.some(s => s.dataset.topic === t);
      const show = (topic, announce) => {
        if (!known(topic)) topic = 'all';
        sections.forEach(s => { s.hidden = topic !== 'all' && s.dataset.topic !== topic; });
        chips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.topic === topic)));
        try { localStorage.setItem('philmates:home-topic', topic); } catch {}
        if (announce) {
          const n = sections.filter(s => !s.hidden).reduce((k, s) => k + s.querySelectorAll('.card').length, 0);
          status.textContent = 'Showing ' + n + ' lesson' + (n === 1 ? '' : 's') + '.';
        }
      };
      chips.forEach(c => c.addEventListener('click', () => {
        show(c.dataset.topic, true);
        history.replaceState(null, '', c.dataset.topic === 'all' ? location.pathname : '#' + c.dataset.topic);
      }));
      let saved = null;
      try { saved = localStorage.getItem('philmates:home-topic'); } catch {}
      show(location.hash.slice(1) || saved || 'all', false);

      /* Progress badges, read from what each lesson saved on this device. */
      document.querySelectorAll('.card[data-lesson]').forEach(card => {
        let data;
        try { data = JSON.parse(localStorage.getItem('philmates:' + card.dataset.lesson) || 'null'); } catch {}
        if (!data) return;
        const badge = card.querySelector('.badge--progress');
        const total = Number(card.dataset.slides), seen = Math.min((data.visited || []).length, total);
        if (data.completed) { badge.textContent = '✔ Completed'; badge.classList.add('is-done'); }
        else if (seen > 0) badge.textContent = seen + ' of ' + total + ' slides';
        else return;
        badge.hidden = false;
      });
    })();
  </script>
</body>
</html>
`;
}

/* ---- the instructor page (instructors.html) ----------------------------- */

function renderInstructors(topics) {
  const anyScorm = Object.values(topics).flat().some(l => l.scormReady);

  // SCORM downloads, grouped by topic in catalog order. Only links files that exist.
  const downloads = Object.entries(topics).map(([topic, lessons]) => `
        <h4>${pretty(topic)}</h4>
        <ul class="dl-list">${lessons.map(l => `
          <li>
            <span class="dl-title">${l.title} <span class="dl-sub">— ${l.subject || ''}</span></span>
            ${l.scormReady
              ? `<a class="btn btn--sm" href="${l.scorm}" download aria-label="Download the SCORM package for ${l.title}">SCORM ↓</a>`
              : `<span class="dl-pending">not built yet</span>`}
          </li>`).join('')}
        </ul>`).join('');

  return head('For Instructors — PhilMates',
    'How to use PhilMates lessons in a class: project one, share a link, or load a SCORM 1.2 package into your LMS. Free and openly licensed.', `
    .hero { padding: 30px 0 0; }
    .hero h1 { font-family: var(--pixel); color: var(--accent-2); font-size: 22px; line-height: 1.5;
               text-shadow: 3px 3px 0 var(--border); margin: 0 0 10px; }
    section { margin-top: 44px; scroll-margin-top: 64px; }

    .features, .ways { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 20px; }
    .feature, .way { background: var(--panel-2); border: 3px solid var(--border); box-shadow: 0 5px 0 var(--shadow); padding: 18px; }
    .feature h3, .way h3 { font-family: var(--pixel); font-size: 11px; color: var(--accent); margin: 0 0 8px; line-height: 1.5; }
    .feature p, .way p { color: var(--muted); font-size: .92em; margin: 0; }
    .way .n { font-family: var(--pixel); font-size: 18px; color: var(--accent-2); margin-bottom: 8px; }

    .panel { background: var(--panel-2); border: 3px solid var(--border); box-shadow: 0 5px 0 var(--shadow); padding: 22px; margin-top: 22px; }
    .panel h3 { font-family: var(--pixel); font-size: 12px; color: var(--accent-2); margin: 0 0 6px; }
    .panel h4 { font-family: var(--pixel); font-size: 10px; color: var(--accent-3); margin: 22px 0 0; }
    .dl-list { list-style: none; padding: 0; margin: 8px 0 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); column-gap: 28px; }
    .dl-list li { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-top: 2px solid var(--border); }
    .dl-title { flex: 1; }
    .dl-sub { color: var(--muted); font-size: .85em; }
    .dl-pending { color: var(--muted); font-size: .8em; font-style: italic; }
    .note { color: var(--muted); font-size: .85em; margin-top: 14px; }
    .about p { max-width: 68ch; }
    @media (max-width: 460px) { .dl-list { grid-template-columns: 1fr; } }`)
  + nav('instructors') + `
  <main class="wrap" id="main">

    <header class="hero">
      <h1>For Instructors</h1>
      <p class="lead">PhilMates is free and openly licensed (CC BY-NC 4.0). Use it and adapt it for your classes.</p>
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

    <section id="use">
      <h2 class="h-pixel">Three ways to run a lesson</h2>
      <div class="ways">
        <div class="way"><div class="n">1</div><h3>Project it</h3><p>Open a lesson on the classroom display and click through together. The <span class="mono">↺ Reset</span> button clears progress so you can re-run it live each period.</p></div>
        <div class="way"><div class="n">2</div><h3>Share the link</h3><p>Send students straight to a lesson URL for homework or flipped prep. Works on phones; progress saves on their device. Nothing to install.</p></div>
        <div class="way"><div class="n">3</div><h3>Load into your LMS</h3><p>Download the SCORM package below and upload it to Canvas, Blackboard, Moodle, or D2L. Completion <em>and</em> a score report to your gradebook automatically.</p></div>
      </div>
      <p class="note">To send students to one subject, link to the catalog with the topic on the end, such as <span class="mono">index.html#bioethics</span>.</p>
    </section>

    <section id="scorm">
      <h2 class="h-pixel">SCORM packages</h2>
      <div class="panel">
        <h3>SCORM 1.2, one package per lesson</h3>
        <p class="lead">Each lesson is a self-contained, single-SCO package. On finishing, the LMS records <strong>completed/passed</strong> plus a <strong>score</strong>; learners can leave and resume where they left off. Upload the <span class="mono">.zip</span> as-is — don't unzip it.</p>
        ${downloads}
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

  </main>
${FOOTER}
</body>
</html>
`;
}

const topics = await collect();
await writeFile(path.join(ROOT, 'index.html'), renderCatalog(topics));
await writeFile(path.join(ROOT, 'instructors.html'), renderInstructors(topics));
const total = Object.values(topics).reduce((n, a) => n + a.length, 0);
console.log(`✔ index.html and instructors.html rebuilt — ${total} lesson(s) across ${Object.keys(topics).length} topic(s).`);
