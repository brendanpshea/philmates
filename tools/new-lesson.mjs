#!/usr/bin/env node
/* Scaffold a new lesson folder.
   Usage:  node tools/new-lesson.mjs <topic> <lesson-slug> "Lesson Title"      */

import { mkdir, writeFile } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [topic, slug, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(' ');

if (!topic || !slug || !title) {
  console.error('Usage: node tools/new-lesson.mjs <topic> <lesson-slug> "Lesson Title"');
  process.exit(1);
}

const dir = path.join(ROOT, 'lessons', topic, slug);
await mkdir(path.join(dir, 'assets'), { recursive: true });

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} · PhilMates</title>
  <meta name="description" content="TODO: one-line description for the catalog.">
  <link rel="icon" type="image/svg+xml" href="../../../shared/assets/favicon.svg">
  <link rel="stylesheet" href="../../../shared/phil-core.css?v=14">
  <script type="module" src="../../../shared/phil-core.js?v=14"></script>
</head>
<body>

<phil-lesson id="${slug}" title="${title}" subject="TODO: topic (e.g. Utilitarianism)">

  <phil-slide>
    <h1>${title}</h1>
    <p class="lead">Opening hook goes here. Use ← → to navigate, F for fullscreen.</p>
  </phil-slide>

  <phil-slide>
    <h1>A Question</h1>
    <phil-mcq data-qid="${slug}:q1" prompt="Sample question?" explain="Why the right answer is right.">
      <phil-choice correct>The right answer</phil-choice>
      <phil-choice feedback="Hint shown when chosen.">A distractor</phil-choice>
    </phil-mcq>
  </phil-slide>

  <!-- Further reading and AI acknowledgment: always the last slide -->
  <phil-slide id="further-reading">
    <h1>For Further Reading</h1>
    <ul class="phil-reading">
      <li>TODO: 4 or 5 verified readings, each a citation plus why to read it.</li>
    </ul>
    <p class="phil-ai-note"><strong>About this lesson.</strong> Brendan Shea, PhD, wrote this lesson with help from AI tools. Claude (Anthropic) helped draft the text and code and check facts, and the illustrations were made with AI image generators. The author reviewed everything and is responsible for any errors.</p>
  </phil-slide>

</phil-lesson>

</body>
</html>
`;

const prompts = `# Image prompts — ${title}

House style: 16-bit SNES-era pixel art, limited palette, hard edges,
dark slate-blue background (#1d2235), no text.

People: vary age, gender, and skin color in every panel that shows people.
Name each figure's age, gender, and skin color; describe crowds as mixed.
Give recurring characters one fixed description and reuse it word for word.

| File | Subject | Prompt |
|------|---------|--------|
| example.png | … | … |
`;

await writeFile(path.join(dir, 'index.html'), html);
await writeFile(path.join(dir, 'prompts.md'), prompts);
console.log(`✔ Created lessons/${topic}/${slug}/`);
console.log('  Next: edit index.html, then run  node tools/build-index.mjs');
