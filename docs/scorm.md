# Packaging lessons as SCORM (for LMS upload)

Instructors can load PhilMates lessons into any SCORM-capable LMS (Canvas,
Blackboard, Moodle, D2L/Brightspace, SCORM Cloud) as self-contained packages.

## Build

```bash
node tools/build-scorm.mjs --all                 # every lesson
node tools/build-scorm.mjs bioethics/four-principles   # one lesson
```

Output lands in `dist/scorm/<topic>-<lesson>-scorm12.zip`. Upload that `.zip`
to the LMS as a SCORM package — don't unzip it first.

## What the build does

For each lesson it produces a **single-SCO SCORM 1.2** package containing:

- the lesson's `index.html` (with `../../../shared/` paths collapsed to
  `shared/`, and the SCORM adapter injected before the engine),
- the lesson's `assets/`,
- a copy of `/shared` (engine, styles, fonts, and `scorm-api.js`),
- a generated `imsmanifest.xml`.

Authoring files (`prompts.md`, etc.) are excluded. The zip is written with a
small dependency-free writer, so no `npm install` is needed.

## How tracking works

Persistence is swappable by design. The live site uses a `localStorage`
`ProgressStore` ([shared/phil-core.js](../shared/phil-core.js)); the packaged
build installs `globalThis.PhilProgressStore` from
[shared/scorm-api.js](../shared/scorm-api.js) instead — same `visited` /
`correct` / `completed` / `beliefs` surface, but backed by the LMS.

| PhilMates state                       | SCORM 1.2 element            |
| ------------------------------------- | --------------------------- |
| `phil:complete` (all questions right) | `cmi.core.lesson_status` = `passed` |
| correct / total questions             | `cmi.core.score.raw` (0–100, also reported mid-lesson) |
| visited slides, correct, beliefs      | `cmi.suspend_data` (resume) |

Notes:

- Completion already requires every question correct, so a *finished* lesson
  always scores 100. The useful gradebook signal is the **partial** score the
  adapter reports when a learner leaves early.
- SCORM 1.2 caps `suspend_data` at 4096 chars; the adapter stores question IDs
  (not labels) and warns in the console if a lesson approaches the limit.
- The `.xsd` schema files are intentionally omitted — every major LMS validates
  against its own built-in copies. Add them to the package root if a stricter
  importer ever requires them.

## To target SCORM 2004 or xAPI later

The seam is `scorm-api.js`. A 2004 or cmi5/xAPI adapter implements the same
store surface and reports to its own data model; the build would inject that
file instead. No lesson HTML changes required.
