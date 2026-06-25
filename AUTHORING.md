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
<link rel="stylesheet" href="/shared/phil-core.css">
<script type="module" src="/shared/phil-core.js"></script>

<phil-lesson id="unique-slug" title="Short Title">
  <phil-slide> ...one screen... </phil-slide>
  <phil-slide> ...next screen... </phil-slide>
</phil-lesson>
```

- `id` must be unique — it's the localStorage progress key.
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

## Art & style

- Reference aesthetic: **16-bit console era**. Hand-authored SVGs preferred;
  PNGs from an image generator are fine for richer scenes.
- Keep art in the lesson's own `assets/`, never inline-embedded in the HTML body
  (a `slot="art"` `<svg>` is fine; large data-URIs are not).
- Record image-generator prompts in the lesson's `prompts.md`.
- Unicode icons/emoji are fine inline where they're enough (★ ✔ 🎉).

## Topics

`lessons/<topic>/` groups lessons (e.g. `ethical-theory`, `logic`, `ai-ethics`,
`bioethics`). The catalog page groups cards by topic folder automatically.
