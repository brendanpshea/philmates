#!/usr/bin/env node
/* Accessibility audit — runs axe-core over every slide of every lesson.
   Findings and method are written up in docs/accessibility.md.

   Two things make a naive axe run useless on this project, and this script
   handles both:

     1. SERVE IT.  Lessons load phil-core.js as an ES module, which the browser
        refuses over file:// (CORS). The engine never boots, every slide stays
        display:none, and axe cheerfully reports almost nothing. So we serve
        over http://127.0.0.1 first.

     2. WALK IT.   The engine keeps exactly one slide in the DOM at a time.
        Scanning the landing slide misses ~97% of the lesson, so we drive the
        engine forward and re-scan at every step (~1000 slide-states total).

   It also freezes animations before each scan. Without that, axe samples text
   mid-fade (the step-reveal and the phil-compare entrances) and reports ~1000
   bogus contrast failures on top of the handful of real ones.

   Usage:
     node tools/a11y-audit.mjs                     # audit everything
     node tools/a11y-audit.mjs --strict            # exit 1 on any violation (CI)
     node tools/a11y-audit.mjs --page lessons/bioethics/four-principles/index.html
     node tools/a11y-audit.mjs --json report.json  # full machine-readable dump
     node tools/a11y-audit.mjs --no-walk           # first slide only (fast)

   Dev-only, and the one thing in tools/ that needs npm — authoring and running
   lessons still requires no install at all. From the repo root:

     npm install --no-save playwright axe-core && npx playwright install chromium

   Set CHROMIUM_PATH to reuse a Chromium that's already on the machine.
*/

import { createServer } from 'node:http';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

const args = process.argv.slice(2);
const flag = n => args.includes(n);
const opt = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };

const STRICT = flag('--strict');
const WALK = !flag('--no-walk');
const ONLY = opt('--page');
const JSON_OUT = opt('--json');

/* ---------- dependencies (dev-only, not vendored) ---------- */
let chromium, AXE_SOURCE;
try {
  ({ chromium } = require('playwright'));
  AXE_SOURCE = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
} catch {
  console.error(`
This is the one tool in tools/ that needs npm. From the repo root:

  npm install --no-save playwright axe-core
  npx playwright install chromium

Nothing else in PhilMates requires an install — authoring and running
lessons stays dependency-free.
`);
  process.exit(2);
}

/* ---------- static server ---------- */
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json',
  '.mp3': 'audio/mpeg',
};

function serve() {
  return new Promise(resolve => {
    const server = createServer(async (req, res) => {
      let rel = decodeURIComponent(req.url.split('?')[0]);
      if (rel.endsWith('/')) rel += 'index.html';
      const file = path.join(ROOT, rel);
      if (!file.startsWith(ROOT) || !existsSync(file)) { res.writeHead(404); return res.end('not found'); }
      try {
        const body = await readFile(file);
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
        res.end(body);
      } catch { res.writeHead(500); res.end('error'); }
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

/* ---------- page discovery ---------- */
async function findPages() {
  if (ONLY) return [ONLY.replace(/^\.?\//, '')];
  const pages = ['index.html'];
  const lessons = path.join(ROOT, 'lessons');
  for (const topic of await readdir(lessons, { withFileTypes: true })) {
    if (!topic.isDirectory()) continue;
    for (const lesson of await readdir(path.join(lessons, topic.name), { withFileTypes: true })) {
      if (!lesson.isDirectory()) continue;
      const rel = `lessons/${topic.name}/${lesson.name}/index.html`;
      if (existsSync(path.join(ROOT, rel))) pages.push(rel);
    }
  }
  return pages;
}

/* Freeze every animation and force all reveal-steps visible. Re-applied after
   each navigation because the engine rebuilds slide state as you advance. */
const FREEZE = `*,*::before,*::after{animation:none!important;transition:none!important}
.phil-step{opacity:1!important;transform:none!important}`;

const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];

async function auditPage(browser, base, rel) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const consoleErrors = [];
  page.on('pageerror', e => consoleErrors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200)); });

  await page.goto(base + rel, { waitUntil: 'load' });
  await page.waitForTimeout(600);                       // custom elements upgrade + fonts
  await page.addScriptTag({ content: AXE_SOURCE });

  const found = new Map();                              // rule id -> { …, nodes:Set }
  const isLesson = rel !== 'index.html';
  let states = 0;

  for (let guard = 0; guard < 500; guard++) {
    await page.addStyleTag({ content: FREEZE });
    const result = await page.evaluate(
      async tags => await axe.run(document, { runOnly: { type: 'tag', values: tags } }),
      AXE_TAGS,
    );
    states++;
    for (const v of result.violations) {
      if (!found.has(v.id)) {
        found.set(v.id, {
          id: v.id, impact: v.impact, help: v.help,
          wcag: v.tags.filter(t => /^wcag\d/.test(t)), nodes: new Map(),
        });
      }
      const entry = found.get(v.id);
      for (const n of v.nodes) {
        const html = n.html.replace(/\s+/g, ' ').slice(0, 160);
        if (!entry.nodes.has(html)) entry.nodes.set(html, n.any?.[0]?.data ?? null);
      }
    }
    if (!isLesson || !WALK) break;

    const advanced = await page.evaluate(() => {
      const lesson = document.querySelector('phil-lesson');
      if (!lesson || lesson._nextBtn?.disabled) return false;
      lesson.next();
      return true;
    });
    if (!advanced) break;
    await page.waitForTimeout(60);
  }

  await page.close();
  return {
    page: rel, states, consoleErrors: [...new Set(consoleErrors)],
    violations: [...found.values()].map(v => ({
      ...v, nodes: [...v.nodes.keys()], data: [...v.nodes.values()].filter(Boolean),
    })),
  };
}

/* ---------- run ---------- */
const { server, port } = await serve();
const base = `http://127.0.0.1:${port}/`;
const pages = await findPages();
// CHROMIUM_PATH lets CI images point at a system Chromium instead of
// downloading Playwright's own build.
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});

console.log(`Auditing ${pages.length} page(s) against WCAG 2.1 A/AA${WALK ? ', walking every slide' : ''}…\n`);

const reports = [];
for (const rel of pages) {
  const r = await auditPage(browser, base, rel);
  reports.push(r);
  const label = rel === 'index.html' ? 'index.html' : rel.split('/').slice(1, 3).join('/');
  const total = r.violations.reduce((a, v) => a + v.nodes.length, 0);
  console.log(`${total ? '✘' : '✔'} ${label.padEnd(38)} ${String(r.states).padStart(4)} state(s)  ${total} finding(s)`);
  for (const v of r.violations.sort((a, b) => b.nodes.length - a.nodes.length)) {
    console.log(`    ${(v.impact || '?').padEnd(9)} ${v.id.padEnd(30)} ×${String(v.nodes.length).padEnd(4)} ${v.wcag.join(' ')}`);
    console.log(`      ${v.nodes[0]}`);
  }
  if (r.consoleErrors.length) {
    console.log(`    ⚠ ${r.consoleErrors.length} console error(s) — the page may not have booted:`);
    r.consoleErrors.slice(0, 2).forEach(e => console.log(`      ${e.slice(0, 120)}`));
  }
}

await browser.close();
server.close();

/* ---------- summary ---------- */
const agg = new Map();
for (const r of reports) {
  for (const v of r.violations) {
    if (!agg.has(v.id)) agg.set(v.id, { impact: v.impact, nodes: 0, pages: 0, wcag: v.wcag });
    const a = agg.get(v.id);
    a.nodes += v.nodes.length;
    a.pages++;
  }
}

const grand = [...agg.values()].reduce((a, v) => a + v.nodes, 0);
console.log(`\n${'─'.repeat(72)}`);
if (!grand) {
  console.log('No axe violations across any scanned state.');
} else {
  console.log(`${grand} finding(s) across ${reports.length} page(s):\n`);
  const rank = { critical: 0, serious: 1, moderate: 2, minor: 3 };
  [...agg.entries()]
    .sort((a, b) => (rank[a[1].impact] ?? 9) - (rank[b[1].impact] ?? 9) || b[1].nodes - a[1].nodes)
    .forEach(([id, v]) => console.log(
      `  ${(v.impact || '?').padEnd(9)} ${id.padEnd(30)} ${String(v.nodes).padStart(4)} node(s) on ${v.pages} page(s)  ${v.wcag.join(' ')}`));
}
console.log(`\nAutomated checks catch roughly a third of WCAG issues. See docs/accessibility.md
for the manual findings — focus handling, dialog semantics, keyboard reachability
and reduced-motion coverage are not visible to axe.`);

if (JSON_OUT) {
  await writeFile(JSON_OUT, JSON.stringify(reports, null, 2));
  console.log(`\nFull report → ${JSON_OUT}`);
}

if (STRICT && grand) process.exit(1);
