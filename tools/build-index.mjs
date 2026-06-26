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

async function collect() {
  const topics = {};
  for (const topic of await ls(LESSONS)) {
    const tdir = path.join(LESSONS, topic);
    if (!(await isDir(tdir))) continue;
    for (const lesson of await ls(tdir)) {
      const file = path.join(tdir, lesson, 'index.html');
      let html;
      try { html = await readFile(file, 'utf8'); } catch { continue; }
      (topics[topic] ||= []).push({
        href: `lessons/${topic}/${lesson}/index.html`,
        title: grab(html, /<phil-lesson[^>]*\btitle="([^"]+)"/i) || lesson,
        subject: grab(html, /<phil-lesson[^>]*\bsubject="([^"]+)"/i),
        desc:  grab(html, /<meta\s+name="description"\s+content="([^"]+)"/i),
      });
    }
  }
  return topics;
}

const ls = async d => { try { return await readdir(d); } catch { return []; } };
const isDir = async p => { try { return (await stat(p)).isDirectory(); } catch { return false; } };
const pretty = s => s.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

function render(topics) {
  const sections = Object.entries(topics).map(([topic, lessons]) => `
    <section class="topic">
      <h2>${pretty(topic)}</h2>
      <div class="cards">
        ${lessons.map(l => `
        <a class="card" href="${l.href}">
          <h3>${l.title}${l.subject ? ` <span class="card-topic">(${l.subject})</span>` : ''}</h3>
          <p>${l.desc || ''}</p>
        </a>`).join('')}
      </div>
    </section>`).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PhilMates — Bite-sized Philosophy Activities</title>
  <link rel="icon" type="image/svg+xml" href="/shared/assets/favicon.svg">
  <link rel="stylesheet" href="/shared/phil-core.css">
  <style>
    body { padding: 0; }
    .wrap { max-width: 1000px; margin: 0 auto; padding: 32px 16px 64px; }
    .home-title { font-family: var(--pixel); color: var(--accent-2); font-size: 26px; text-shadow: 3px 3px 0 var(--border); }
    .home-sub { color: var(--muted); max-width: 60ch; }
    .topic h2 { font-family: var(--pixel); color: var(--accent-3); font-size: 15px; margin-top: 40px; }
    .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
    .card { display: block; text-decoration: none; color: var(--ink); background: var(--panel-2);
            border: 3px solid var(--border); box-shadow: 0 5px 0 var(--shadow); padding: 18px; transition: transform .05s; }
    .card:hover { transform: translateY(-3px); background: #313a5e; }
    .card:active { transform: translateY(2px); box-shadow: 0 2px 0 var(--shadow); }
    .card h3 { font-family: var(--pixel); font-size: 12px; color: var(--accent); margin: 0 0 8px; line-height: 1.5; }
    .card-topic { font-family: var(--body); font-weight: 400; font-size: 15px; color: var(--accent-3); }
    .card p { color: var(--muted); font-size: .9em; margin: 0; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1 class="home-title">★ PhilMates</h1>
    <p class="home-sub">Bite-sized, gamified philosophy activities — for the classroom projector or solo study.</p>
    ${sections}
  </div>
</body>
</html>
`;
}

const topics = await collect();
await writeFile(path.join(ROOT, 'index.html'), render(topics));
const count = Object.values(topics).reduce((n, a) => n + a.length, 0);
console.log(`✔ index.html rebuilt — ${count} lesson(s) across ${Object.keys(topics).length} topic(s).`);
