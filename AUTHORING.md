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

### Where do you stand? — `<phil-poll>` (ungraded)
For "what would you do?" moments where reasonable people genuinely divide.
Nothing is marked `correct`; picking any option satisfies completion (like
`<phil-beliefs>`) and the ★ tally is untouched.
```html
<phil-poll prompt="You stand beside the switch lever. What do you do?"
           explain="Shown after any pick — the discussion.">
  <phil-choice note="Where this position leads.">Pull the switch</phil-choice>
  <phil-choice note="...">Do nothing</phil-choice>
</phil-poll>
```
**Only the picked option's `note` is ever shown.** A student who chooses "Pull the
switch" never sees the note under "Do nothing". So a `note` can say where *that*
position leads, but anything every student must learn belongs in `explain=`, which
is shown to everyone regardless of what they picked. Teaching buried in per-option
notes reaches a fraction of the class.

**Use this, not `<phil-mcq>`, for moral choices.** An MCQ blocks completion until
the student picks the answer you marked `correct` — so grading a genuine dilemma
forces students who hold a defensible minority view to click something they don't
believe in order to finish. Reserve `<phil-mcq>` for questions that really do have
a right answer (what a theory claims, why two cases differ, what a protocol says).

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
concrete example. `<p class="case">` is the same thing with a 🩺 marker and a blue
border, for clinical/case examples. Two sides stack on narrow screens. (For three
positions, add a third `<phil-side>`; the VS badge only appears with exactly two.)

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

## When you add a widget to the engine: bump `?v=`

Lessons load the engine as `../../../shared/phil-core.js?v=2`. That query string
is a cache-buster, and it matters: a browser holding an older `phil-core.js` has
never heard of your new element, so it never upgrades — the widget's authored
children spill onto the slide as run-on text and the `prompt` attribute vanishes
entirely. Students see a broken slide and have no idea why.

So whenever you add or rename a `<phil-*>` element in `shared/phil-core.js`,
bump the number everywhere in one go:

```bash
# 2 -> 3, across all lessons and the homepage
grep -rl 'phil-core\.\(js\|css\)?v=' lessons/*/*/index.html index.html \
  | xargs sed -i 's/phil-core\.\(js\|css\)?v=[0-9]\+/phil-core.\1?v=3/g'
```

As a backstop, `phil-core.css` hides the children of any `<phil-*>` element that
never registered and — after a 3-second delay, so it never flashes during a
normal deferred-module load — shows a "hard-refresh this page" message in its
place. That turns a silent mess into a legible failure, but it is a safety net,
not a substitute for bumping the version.

## Quiz quality (auto-checked)

Multiple-choice questions leak answers if you're not careful. Two tells matter most:

1. **Similar lengths.** The correct answer should be about the same length as the
   distractors. A conspicuously longer (usually more qualified/detailed) or much
   shorter answer is a giveaway — students learn to pick the odd one out.
2. **Varied position.** Across a lesson's MCQs, move the `correct` choice around
   (A / B / C…). Don't park it in the same slot every time.

It also checks the whole repo at once, because the worst tell is invisible one
lesson at a time. If the correct answer is the longest option in most questions,
"pick the longest" beats the quiz even though every individual question looks
fine — and a two-question lesson cannot show that pattern at all.

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

## Register: how the prose should sound

The recurring failure in this repo has never been wrong content. It is prose that
sounds like an essay *about* a lesson instead of a person teaching one. Six rules,
roughly in the order they get broken.

**1. Write to the student, never about the lesson.** The lesson is not a character
in its own sentences.

> ✗ Here is everything the lesson assumes you know.
> ✓ If you haven't read the story, here are the basics.

**2. One idea per sentence.** If a sentence ends with an em dash and a trailing
clause, that clause is either a separate sentence or it is decoration. Split it or
cut it. Same for any bullet running past three lines.

> ✗ Infection is other-regarding. The Harm Principle doesn't merely tolerate
>   public-health powers here — it's the very ground for them.
> ✓ Infection is other-regarding. The Harm Principle does not merely tolerate
>   public-health powers here. It is the ground for them.

This is about the *trailing* dash specifically, because that is what produces the
skimmable setup/punchline rhythm. Three uses are fine and shouldn't be hunted:

- **Paired dashes** are a parenthetical, functionally a pair of commas:
  `Blinding — hiding who gets the real drug — protects against bias.`
- **A single semicolon joining parallel clauses** is doing its actual job:
  `He dies instantly; the five survive.` Splitting that makes it choppier, not
  simpler. What to avoid is the *chain* — two or more in one sentence, which is a
  list in disguise — and the semicolon that tows a trailing qualifier, which is
  rule 2 again in different punctuation.
- **A dash separating a term from its gloss** is standing in for a colon, so just
  use the colon: `**The mean**: a disposition between excess and deficiency.`
  In a checklist of bare labels either reads fine; be consistent within the list.

**3. No setup and punchline.** Sentence pairs where the first line sets up and the
second lands read as performance, and students skim them the way they skim ads.
Explain in one sentence instead.

**4. Cut the ratings.** "It is the most reasonable thing anybody says in the whole
book" is a rating, not teaching — and it is probably false. If a claim is worth
making, make it and show why. Otherwise cut it. This covers cleverness generally:
the fictional frame exists to make the material *fun*, not to replace it.

**5. Explain it like the student is twelve.** This means simpler sentences, not
thinner content. Technical vocabulary is fine and necessary; it just has to be
defined the first time it appears and then actually used. One lesson shipped with
"arm" used sixteen times before anything said what an arm was.

**6. Teach enough to earn the interactivity.** A cloze or checkset a student can
pass by matching a bolded phrase from the previous slide tests reading, not
learning. Build distractors out of real misconceptions.

Two mechanical ones:

- **Never refer to another slide by number.** "As we saw in question 2" is
  meaningless nine slides later. Name the thing instead — a slide titled "Back to
  the Coin" calls its own callback.
- **US spelling.** behavior, color, randomize, honor. The content cites US law.

**These rules cover every string a student reads**, not just `<li>` and `<p>`:
`explain=` and `note=` attributes, `<phil-statement>` items, `img alt` text, and
strings inside widget JS. Those hold roughly as much prose as the slide bodies do,
and they are where register drifts back first, because that is the text you reread
least.

Two of these tells are mechanical enough to find automatically:

```bash
node tools/check-register.mjs          # counts per lesson
node tools/check-register.mjs --list   # every tell, with the text
node tools/check-register.mjs --all    # also list what it chose to skip
```

It counts only the two patterns above — a trailing em dash, and a semicolon chain
— and tallies the legitimate uses separately so you can check its judgment with
`--all`. Quoted source material keeps its own punctuation and is skipped.

**It never fails a build.** A gate would teach you to write around the checker
instead of writing better. Treat a rising number as a sign to reread.

## Writing for the projector

Slides scroll if they overflow, but a slide that scrolls in class is a slide that
failed. Two habits keep you inside the frame:

- **Bullets around 70–120 characters.** Past ~170 a bullet wraps to four or five
  lines, and on a `slot="art"` slide the text column is only ~46 characters wide,
  so it wraps even harder. Check with:
  `node tools/check-density.mjs` (add `--strict` for CI).
- **Four bullets per slide, maximum.** If you have six, you have two slides.

Same rule for any custom widget you write: nothing below 15px. The reference
sizes are in `lessons/bioethics/trolley-and-triage/assets/switchboard.js`.

## Accessibility (auto-checked)

The engine handles most of this for you — landmarks, focus movement between
slides, announcements, names for widget controls, keyboard reachability. Four
things are yours to get right, because only you know the content:

1. **Alt text on every image.** Describe what's *in* the scene, not the filename:
   `alt="The Thrum: a soft pink creature curled on the floor of a containment
   cell, red pain-waves radiating outward"`. Every image in the repo has real alt
   text — keep that streak.
2. **Don't skip heading levels.** A slide's `<h1>` is its title; sub-headings
   inside it are `<h2>`. Jumping straight to `<h3>`/`<h4>` because it looks right
   breaks the outline screen-reader users navigate by. Style it, don't renumber it.
3. **Never say it with colour alone.** "The green ones are correct" leaves out
   anyone who can't tell them apart — pair colour with a word, icon, or shape.
4. **Watch `opacity` for de-emphasis.** Fading text toward the background quietly
   costs contrast; it's how three labels in the virtue-ethics widget ended up
   below the minimum. Dim a decorative layer, not the text on top of it.

If you write custom CSS in a lesson, don't reuse the shared token names
(`--accent`, `--ink`, `--bg`…) for different colours. `var(--accent, #6366f1)`
looks safe but the fallback never fires — `--accent` is defined globally as
green, which is how one lesson's active tab ended up white-on-green at 1.7:1.

Run the audit after any of that:

```bash
node tools/a11y-audit.mjs                  # walks every slide of every lesson
node tools/a11y-audit.mjs --strict         # exit 1 if any issues (for CI/hooks)
```

Full findings, method and limits: [docs/accessibility.md](docs/accessibility.md).

## Art & style

- Reference aesthetic: **16-bit console era**. Hand-authored SVGs preferred;
  PNGs from an image generator are fine for richer scenes.
- **Don't draw portraits of real (contemporary or historical) thinkers.** At
  pixel resolution a face can't carry a likeness — it just reads as "generic
  person," so the payoff of recognizing Mill or Kant never lands. Instead give
  each real thinker an **idea-emblem on a relic card**: a framed 80×108 SVG whose
  central icon encodes their core move (Bentham → a felicific-calculus tablet,
  Singer → an expanding circle, Kant → a starry sky over a compass). The emblem
  doubles as a mnemonic and gives the "collect the thinkers" game feel. Keep the
  card frame consistent (dark border, accent inner frame, a rank gem in the top
  bar, rarity pips at the bottom) and give each thinker a distinct accent color.
  See `lessons/ethical-theory/*/assets/` for the seven reference cards.
- Portraits are still fine for **invented characters** (e.g. Van Helsing) — there's
  no real likeness to fail at, and you own the canon. Objects, creatures, tools,
  and scenes all pixel well; faces of real people don't.
- Keep art in the lesson's own `assets/`, never inline-embedded in the HTML body
  (a `slot="art"` `<svg>` is fine; large data-URIs are not).
- Record image-generator prompts in the lesson's `prompts.md`.
- To generate the PNGs from those prompts, see
  [docs/image-generation.md](docs/image-generation.md) — Cloudflare Workers AI
  via `node tools/cf-image.mjs --batch …`. Needs an untracked `.env.local`.
  Always inspect generated panels full-size: they often carry baked-in text,
  which breaks the no-text rule.
- Unicode icons/emoji are fine inline where they're enough (★ ✔ 🎉).

## Narration (optional, currently shelved)

Per-slide audio narration is supported but not used in any lesson right now. The
audio toggle only appears if a lesson contains a `<phil-narration>`. To add it, see
[docs/audio-narration.md](docs/audio-narration.md).

## Topics

`lessons/<topic>/` groups lessons (e.g. `ethical-theory`, `logic`, `ai-ethics`,
`bioethics`). The catalog page groups cards by topic folder automatically.
