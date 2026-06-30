#!/usr/bin/env node
/* Package PhilMates lessons as SCORM 1.2 zips for upload to an LMS.

   Each lesson becomes one self-contained, single-SCO package:
     - the lesson's index.html (with shared/ paths rewritten and the SCORM
       adapter injected) + its assets/
     - a copy of /shared (engine, styles, scorm-api.js, fonts/icons)
     - a generated imsmanifest.xml

   Tracking: completion + score. cmi.core.lesson_status becomes "passed" when
   the learner finishes (completion already requires every question correct);
   cmi.core.score.raw carries correct/total*100, reported even mid-lesson.

   Usage:
     node tools/build-scorm.mjs --all                 # every lesson
     node tools/build-scorm.mjs bioethics/four-principles
     node tools/build-scorm.mjs lessons/bioethics/four-principles
   Output: dist/scorm/<topic>-<lesson>-scorm12.zip
*/

import { readFile, readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import { deflateRawSync } from 'node:zlib';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = path.join(ROOT, 'lessons');
const SHARED = path.join(ROOT, 'shared');
const OUT = path.join(ROOT, 'dist', 'scorm');

const ls = async d => { try { return await readdir(d); } catch { return []; } };
const isDir = async p => { try { return (await stat(p)).isDirectory(); } catch { return false; } };
const grab = (html, re) => (html.match(re)?.[1] || '').trim();
const xml = s => s.replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c]));
const slug = s => s.replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');

/* ---- discover lessons (topic/lesson pairs that have an index.html) ---- */
async function allLessons() {
  const out = [];
  for (const topic of await ls(LESSONS)) {
    if (!(await isDir(path.join(LESSONS, topic)))) continue;
    for (const lesson of await ls(path.join(LESSONS, topic))) {
      const file = path.join(LESSONS, topic, lesson, 'index.html');
      try { await stat(file); out.push({ topic, lesson }); } catch { /* not a lesson */ }
    }
  }
  return out;
}

/* ---- gather files under a dir as { zipPath, abs } (skips authoring .md) ---- */
async function walk(dir, prefix) {
  const out = [];
  for (const name of await ls(dir)) {
    const abs = path.join(dir, name);
    if (await isDir(abs)) {
      out.push(...await walk(abs, `${prefix}${name}/`));
    } else if (!/\.(md|markdown)$/i.test(name)) {
      out.push({ zipPath: prefix + name, abs });
    }
  }
  return out;
}

/* ---- transform a lesson's index.html for the package ---- */
function rewriteIndex(html) {
  return html
    // shared/ is copied to the package root, so collapse the climb-out paths
    .replace(/\.\.\/\.\.\/\.\.\/shared\//g, 'shared/')
    // load the SCORM adapter before the engine so it can install the store
    .replace(
      /(<script[^>]*\bsrc="shared\/phil-core\.js"[^>]*><\/script>)/,
      '<script type="module" src="shared/scorm-api.js"></script>\n  $1'
    );
}

/* ---- imsmanifest.xml (SCORM 1.2, single SCO) ---- */
function manifest({ id, title, files }) {
  const fileTags = files.map(f => `        <file href="${xml(f)}"/>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${xml(id)}" version="1.2"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                      http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG-${xml(id)}">
    <organization identifier="ORG-${xml(id)}">
      <title>${xml(title)}</title>
      <item identifier="ITEM-${xml(id)}" identifierref="RES-${xml(id)}" isvisible="true">
        <title>${xml(title)}</title>
        <adlcp:masteryscore>100</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES-${xml(id)}" type="webcontent" adlcp:scormtype="sco" href="index.html">
${fileTags}
    </resource>
  </resources>
</manifest>
`;
}

/* =====================================================================
   Minimal, dependency-free ZIP writer (deflate). Keeps tooling npm-free.
   ===================================================================== */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function dosDateTime(d = new Date()) {
  const time = ((d.getHours() & 31) << 11) | ((d.getMinutes() & 63) << 5) | ((d.getSeconds() / 2) & 31);
  const date = (((d.getFullYear() - 1980) & 127) << 9) | (((d.getMonth() + 1) & 15) << 5) | (d.getDate() & 31);
  return { time: time & 0xFFFF, date: date & 0xFFFF };
}
function zip(entries) {
  const { time, date } = dosDateTime();
  const chunks = [];
  const central = [];
  let offset = 0;

  for (const { name, data } of entries) {
    const nameBuf = Buffer.from(name, 'utf8');
    const crc = crc32(data);
    const deflated = deflateRawSync(data);
    const store = deflated.length >= data.length;          // never grow tiny files
    const method = store ? 0 : 8;
    const body = store ? data : deflated;

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(date, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    chunks.push(local, nameBuf, body);

    const cen = Buffer.alloc(46);
    cen.writeUInt32LE(0x02014b50, 0);
    cen.writeUInt16LE(20, 4);
    cen.writeUInt16LE(20, 6);
    cen.writeUInt16LE(0, 8);
    cen.writeUInt16LE(method, 10);
    cen.writeUInt16LE(time, 12);
    cen.writeUInt16LE(date, 14);
    cen.writeUInt32LE(crc, 16);
    cen.writeUInt32LE(body.length, 20);
    cen.writeUInt32LE(data.length, 24);
    cen.writeUInt16LE(nameBuf.length, 28);
    cen.writeUInt32LE(offset, 42);
    central.push(Buffer.concat([cen, nameBuf]));

    offset += local.length + nameBuf.length + body.length;
  }

  const cd = Buffer.concat(central);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(cd.length, 12);
  eocd.writeUInt32LE(offset, 16);
  return Buffer.concat([...chunks, cd, eocd]);
}

/* ---- build one lesson into a zip buffer ---- */
async function buildLesson({ topic, lesson }) {
  const lessonDir = path.join(LESSONS, topic, lesson);
  const indexHtml = await readFile(path.join(lessonDir, 'index.html'), 'utf8');
  const id = `PHILMATES-${slug(topic)}-${slug(lesson)}`;
  const title = grab(indexHtml, /<phil-lesson[^>]*\btitle="([^"]+)"/i) || lesson;

  // collect package files: rewritten index, lesson assets, the shared engine
  const entries = [{ name: 'index.html', data: Buffer.from(rewriteIndex(indexHtml), 'utf8') }];
  for (const f of await walk(lessonDir, '')) {
    if (f.zipPath === 'index.html') continue;            // already added (transformed)
    entries.push({ name: f.zipPath, data: await readFile(f.abs) });
  }
  for (const f of await walk(SHARED, 'shared/')) {
    entries.push({ name: f.zipPath, data: await readFile(f.abs) });
  }

  const files = entries.map(e => e.name);
  entries.unshift({ name: 'imsmanifest.xml', data: Buffer.from(manifest({ id, title, files }), 'utf8') });

  return { id, title, buffer: zip(entries), count: entries.length };
}

/* ---- resolve CLI args to a list of lessons ---- */
async function resolveTargets(args) {
  if (args.includes('--all') || args.length === 0) return allLessons();
  return args.filter(a => !a.startsWith('--')).map(a => {
    const parts = a.replace(/^lessons[\\/]/, '').replace(/[\\/]index\.html$/, '').split(/[\\/]/);
    if (parts.length < 2) throw new Error(`Cannot parse lesson "${a}" — expected <topic>/<lesson>`);
    return { topic: parts[0], lesson: parts[1] };
  });
}

const targets = await resolveTargets(process.argv.slice(2));
if (!targets.length) { console.error('No lessons found.'); process.exit(1); }
await mkdir(OUT, { recursive: true });

for (const t of targets) {
  const { title, buffer, count } = await buildLesson(t);
  const file = path.join(OUT, `${slug(t.topic)}-${slug(t.lesson)}-scorm12.zip`);
  await writeFile(file, buffer);
  console.log(`✔ ${title}  →  ${path.relative(ROOT, file)}  (${count} files, ${(buffer.length / 1024).toFixed(0)} KB)`);
}
console.log(`\nDone — ${targets.length} SCORM 1.2 package(s) in ${path.relative(ROOT, OUT)}/`);
