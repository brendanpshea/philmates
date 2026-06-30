# PhilMates

Story-driven philosophy lessons you can finish in one sitting — on a projector,
a phone, or inside an LMS. Pure HTML5, CSS, and JavaScript: no install, no
accounts, no build step to author. Each lesson is a short, playable narrative
with interactive questions and belief probes that revisit a student's own
earlier answers.

## For students / self-learners

Open the homepage (`index.html`) and pick a lesson. Use **→** / **Next** to
advance, **F** for fullscreen. Progress saves on your device.

## For instructors

Three ways to use a lesson (see the **For Instructors** section on the homepage):

1. **Project it** in class and click through together.
2. **Share the link** for homework or flipped prep.
3. **Load it into your LMS** as a SCORM 1.2 package — completion *and* score
   report to the gradebook. See [docs/scorm.md](docs/scorm.md).

## Repo layout

- `lessons/<topic>/<slug>/` — one `index.html` + `assets/` per lesson.
- `shared/` — the engine (`phil-core.js`), styles, and the SCORM adapter.
- `tools/` — `new-lesson`, `build-index` (homepage catalog), `build-scorm`
  (LMS packages), `validate-quizzes`.
- `docs/` — SCORM packaging and audio narration notes.

## Common commands

```bash
node tools/new-lesson.mjs <topic> <slug> "Title"   # scaffold a lesson
node tools/build-index.mjs                          # rebuild the homepage
node tools/build-scorm.mjs --all                    # build SCORM packages
```

Authoring guide: [AUTHORING.md](AUTHORING.md). Licensed under
[CC BY-NC 4.0](LICENSE).
