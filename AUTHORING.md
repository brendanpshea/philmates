# Authoring a PhilMates lesson

A lesson is **one `index.html` file** plus an `assets/` folder, living at
`lessons/<topic>/<lesson-slug>/`. It loads two shared files and declares its
content with custom elements — the engine handles navigation, progress,
feedback, and completion. **No build step**; it serves straight from GitHub Pages.

## Quick start

```bash
node tools/new-lesson.mjs ethical-theory deontology "Kant's Categorical Imperative"
# edit the generated lessons/ethical-theory/deontology/index.html
node tools/build-index.mjs       # refresh the homepage catalog
```

To preview locally, serve the repo root (paths are absolute, e.g. `/shared/...`):

```bash
npx serve .        # or: python -m http.server
```

## Skeleton

```html
<!-- paths are relative to the lesson at lessons/<topic>/<slug>/index.html -->
<link rel="stylesheet" href="../../../shared/phil-core.css">
<script type="module" src="../../../shared/phil-core.js"></script>

<phil-lesson id="unique-slug" title="Short Title">
  <phil-slide> ...one screen... </phil-slide>
  <phil-slide> ...next screen... </phil-slide>
</phil-lesson>
```

- `id` must be unique — it's the localStorage progress key.
- `title` is the story title shown in the lesson's top bar (keep it short).
- `subject` names the philosophical topic (e.g. `subject="Utilitarianism"`). The
  homepage catalog shows it next to the title — `Story Title (Subject)` — so
  instructors can see at a glance what a lesson covers. Always set it.
- Each `<phil-slide>` is one projector screen.
- Add an illustration with `slot="art"` on an `<img>` or inline `<svg>`:
  `<img slot="art" src="./assets/foo.svg" alt="describe it">` (alt text required).
- Anything without `slot="art"` becomes the slide body. Drop in any HTML you like
  for one-off visualizations (canvas, inline SVG, a `<script>` for custom charts).

## Completion rule

The bar at the top fills as the student **visits every (non-optional) slide** and
**answers every question correctly**. Navigation is always free (so a presenter can
click through), but 100% requires both. Progress is saved per-lesson in
`localStorage`; the same `ProgressStore` interface is where a SCORM adapter will
later hook in.

The top bar also has a **↺ Reset** button (built in — you don't author it). It
pops a confirmation, then clears this lesson's saved progress and reloads to a
clean slide 1. Handy for re-running a lesson live in class.

## Widgets

### Multiple choice — `<phil-mcq>`
```html
<phil-mcq prompt="Who wrote the Principle of Utility?" explain="Shown after a correct pick.">
  <phil-choice correct>Bentham</phil-choice>
  <phil-choice feedback="Hint shown if this wrong choice is picked.">Kant</phil-choice>
</phil-mcq>
```
Mark the right option with `correct`. Students can retry until right.

### Check the true ones — `<phil-checkset>`
```html
<phil-checkset prompt="Check every TRUE statement." explain="...">
  <phil-statement correct>A true statement</phil-statement>
  <phil-statement>A false statement</phil-statement>
</phil-checkset>
```
Correct = the checked set exactly matches the `correct` statements.

### Fill the blanks — `<phil-cloze>`
```html
<phil-cloze explain="...">
  Bentham sought the greatest <phil-blank answer="happiness|pleasure">happiness</phil-blank>
  for the greatest <phil-blank answer="number">number</phil-blank>, counting each person as
  <phil-blank options="one,two,many">one</phil-blank>.
</phil-cloze>
```
- `answer="a|b|c"` → free-text blank; any listed value (case-insensitive) is accepted.
- `options="x,y,z"` → dropdown blank. First accepted/option value is the answer.

### Side-by-side comparison — `<phil-compare>` (teaching, not graded)
For contrasting two positions (e.g. Act vs. Rule). Each `<phil-side>` takes a
`label` and optional short `tag`; a "VS" badge is drawn between two sides.
```html
<phil-compare>
  <phil-side label="Act Utilitarianism" tag="This act">
    <p>Judge each action by its own consequences.</p>
    <p class="cake">Cake example — text after a 🍰 marker.</p>
  </phil-side>
  <phil-side label="Rule Utilitarianism" tag="The rule">
    <p>Follow the rules that generally maximize happiness.</p>
    <p class="cake">Keep the rule "share treats with friends."</p>
  </phil-side>
</phil-compare>
```
A `<p class="cake">` gets a dessert marker and accent border — use it for the
concrete example. Two sides stack on narrow screens. (For three positions, add a
third `<phil-side>`; the VS badge only appears with exactly two.)

### Belief probe — `<phil-beliefs>` + `<phil-beliefs-review>` (ungraded)
A before/after attitude check ("anticipation guide"). Place `<phil-beliefs>` near
the start with value statements; place `<phil-beliefs-review>` near the end to show
the saved ratings and let students re-rate and see what shifted.
```html
<!-- near the start -->
<phil-beliefs prompt="How much do you agree, right now?">
  <phil-statement>A competent adult should be free to refuse treatment.</phil-statement>
  <phil-statement>It can be right to override someone's wishes for their own good.</phil-statement>
</phil-beliefs>

<!-- near the end -->
<phil-beliefs-review for="beliefs"></phil-beliefs-review>
```
- Use **value/belief statements, not facts** (no right answer) — that's the point.
- Ratings are a 1–5 Likert scale, saved per-lesson; **ungraded** (never affect the
  ★ tally or completion). Reset clears them with the rest of progress.
- `<phil-beliefs>` defaults to key `beliefs`; set `id="x"` and match it with
  `<phil-beliefs-review for="x">` if you want more than one probe per lesson.

### Optional detour — `<phil-branch>`
```html
<phil-branch prompt="Want the deep dive?">
  <phil-option goto="detail-slide">Yes</phil-option>
  <phil-option goto="next">Skip</phil-option>
</phil-branch>
...
<phil-slide id="detail-slide" optional>
  <h1>Optional content</h1>
</phil-slide>
```
Give the target `<phil-slide>` an `id` and the `optional` attribute. It's excluded
from the linear sequence and the completion count, and automatically gets a
"◀ Back to lesson" button. Keep most lessons linear; use branches only for
genuinely optional side content.

## Quiz quality (auto-checked)

Multiple-choice questions leak answers if you're not careful. Two tells matter most:

1. **Similar lengths.** The correct answer should be about the same length as the
   distractors. A conspicuously longer (usually more qualified/detailed) or much
   shorter answer is a giveaway — students learn to pick the odd one out.
2. **Varied position.** Across a lesson's MCQs, move the `correct` choice around
   (A / B / C…). Don't park it in the same slot every time.

Run the validator any time you add or edit questions:

```bash
node tools/validate-quizzes.mjs            # report tells across all lessons
node tools/validate-quizzes.mjs --strict   # exit 1 if any issues (for CI/hooks)
```

It scans every `<phil-mcq>`, prints each lesson's answer order (e.g. `B C A C`),
and flags uneven option lengths, a correct answer that's the longest/shortest, and
correct-answer positions that cluster. Aim for an all-`✓` report.

Writing tips that keep you passing it:
- Give every option a full sentence of comparable length; don't let the right one
  be the only "complete" answer.
- Make distractors *plausible* (a common misconception, or another theory's
  answer) rather than obviously wrong throwaways.
- Deliberately alternate which slot holds the correct choice as you write.

## Art & style

- Reference aesthetic: **16-bit console era**. Hand-authored SVGs preferred;
  PNGs from an image generator are fine for richer scenes.
- Keep art in the lesson's own `assets/`, never inline-embedded in the HTML body
  (a `slot="art"` `<svg>` is fine; large data-URIs are not).
- Record image-generator prompts in the lesson's `prompts.md`.
- Unicode icons/emoji are fine inline where they're enough (★ ✔ 🎉).

## Narration (optional, currently shelved)

Per-slide audio narration is supported but not used in any lesson right now. The
audio toggle only appears if a lesson contains a `<phil-narration>`. To add it, see
[docs/audio-narration.md](docs/audio-narration.md).

## Topics

`lessons/<topic>/` groups lessons (e.g. `ethical-theory`, `logic`, `ai-ethics`,
`bioethics`). The catalog page groups cards by topic folder automatically.
