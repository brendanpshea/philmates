# Accessibility audit — WCAG 2.1 AA

Audit date: 2026-08-21 · Target: **WCAG 2.1 Level AA** (the bar Section 508 and
most university procurement rules point at).

Scope: `index.html` (homepage), all 12 lesson pages, the shared engine
(`shared/phil-core.js`, `shared/phil-core.css`), and the 10 per-lesson widget
scripts.

## Method

Pages were served over HTTP (ES modules don't load from `file://`, so the engine
never boots there — a `file://` scan reports nothing useful) and driven with
headless Chromium:

- **axe-core 4.x** run on *every slide of every lesson* — the engine keeps one
  slide in the DOM at a time, so a single scan of the landing slide misses
  almost everything. 1,020 slide-states were scanned in total.
- Contrast was re-measured a second time with animations and the step-reveal
  forced off. This matters: a naive walk reports ~1000 contrast failures, but
  almost all are axe sampling text mid-fade. **The real count is 7 distinct
  failing colour pairs.** Numbers below are from the animations-off run.
- Every `:root` colour-token pair in `phil-core.css` (43 combinations) was
  computed directly against the WCAG contrast formula.
- Manual probes for things axe cannot see: focus movement on slide change,
  focus trapping in the reset dialog, whether unrevealed bullets reach the
  accessibility tree, keyboard access to locked answers, reflow at 320px, text
  scaling at 200%, and `prefers-reduced-motion` coverage.

## Summary

| Severity | Found | Fixed | Open |
|---|---|---|---|
| Critical (WCAG A) | 7 | 6 + 1 partial | C-7 (conformance half) |
| Serious (WCAG AA) | 9 | 9 | — |
| Moderate | 6 | 4 | M-2, M-6 |

**All 22 findings below have been addressed except three**, noted inline and
summarised under *What's left*. A full `tools/a11y-audit.mjs` run — 13 pages,
1,020 slide-states — now reports **zero axe violations**, down from four rules
firing on every lesson.

The design system itself is in good shape — **42 of 43 colour-token pairs pass
AA**, and the three contrast failures are all local mistakes rather than palette
problems. The gap is almost entirely *semantics*: the engine builds its whole UI
in JavaScript and emits one `aria-label` in 758 lines. There is no `<main>`, no
live region, and no dialog role anywhere in the project.

Because 12 lessons share one engine, **fixing `phil-core.js` and
`phil-core.css` resolves most of this list across every lesson at once.**

## What already passes

Worth stating, because these are the parts teams usually get wrong:

- **All 138 images have descriptive `alt` text.** None empty, none filename-ish.
  This is genuinely good — e.g. *"The Thrum: a soft pink creature curled on the
  floor of a containment cell, red pain-waves radiating outward, a spiking
  monitor on the wall."*
- **Reflow (1.4.10, AA) passes.** At 320×256 CSS px — the 400 % zoom
  equivalent — no page produces horizontal overflow. Checked on the homepage and
  two lessons.
- `lang="en"` and a unique, descriptive `<title>` on all 13 pages.
- Inactive slides use `display: none`, so they're correctly out of the
  accessibility tree and tab order.
- MCQ and checkset options wrap their `<input>` in a `<label>`, so individual
  choices are named correctly.
- The `<select>` menus in `golden-mean.js` are properly label-wrapped.
- Likert buttons carry `aria-label` ("Strongly disagree" … ), so the numbers
  1–5 aren't announced bare.
- Chromium's default focus ring is visible on this dark theme (verified by
  screenshot). The project never defines its own focus style — see M-4.

---

## Critical

### C-1 · Fill-in-the-blank fields have no accessible name

> **Fixed** — `PhilCloze.build()` now sets `aria-label="Blank N of M"` on every field.
**WCAG 4.1.2 Name, Role, Value (A); 3.3.2 Labels or Instructions (A)** ·
`shared/phil-core.js` `PhilCloze.build()` · **11 of 12 lessons**
(`patient-autonomy` is the one lesson with no cloze widget)

`<phil-blank>` is replaced with a bare `<input class="phil-blank" type="text">`
or `<select class="phil-blank">`. No `aria-label`, no `<label>`, no `title`, no
`id`. axe flags this on every lesson that uses the widget — 11 text inputs and 24
selects with no name.

A screen-reader user hears "edit, blank" or "combo box" with no indication of
which blank they're in or what the sentence around it says. The cloze widget is
unusable non-visually — and it counts toward lesson completion and the SCORM
score sent to the gradebook.

```js
// in PhilCloze.build(), after creating `field`:
field.setAttribute('aria-label', `Blank ${this._blanks.length + 1}`);
```

Better still, give the widget a prompt (`<phil-cloze prompt="…">`) rendered as
`.phil-widget__prompt`, and point each field at it with `aria-describedby` so
the surrounding sentence is available on demand.

### C-2 · Checklist checkboxes have no accessible name

> **Fixed** — both widgets build a real `<label>`; the mouse-only `li.onclick` shim is gone.
**WCAG 4.1.2 (A); 1.3.1 Info and Relationships (A)** ·
`lessons/bioethics/four-principles/assets/balance.js:104`,
`lessons/bioethics/patient-autonomy/assets/consent.js:81`

Both build rows as `<li><input type="checkbox"><span>text</span></li>`. The text
is a sibling `<span>`, not a `<label>`, so the checkbox has no name. The
`li.onclick` handler makes the row clickable *with a mouse only* — it doesn't
create a programmatic association.

```js
const li = el('li');
const box = el('input'); box.type = 'checkbox';
const lab = el('label');                 // was: el('li') + el('span')
lab.append(box, el('span', null, text));
li.append(lab);                          // drop the li.onclick shim entirely
```

A real `<label>` also gives you the click-anywhere behaviour for free.

### C-3 · Unrevealed bullets are exposed to assistive tech

> **Fixed** — `.phil-step` now uses `visibility: hidden` alongside `opacity`.
**WCAG 1.3.2 Meaningful Sequence (A)** · `shared/phil-core.css` `.phil-step`

`.phil-step` hides pending steps with `opacity: 0` alone —
`visibility: visible; display: list-item`. Confirmed against the Chromium
accessibility tree: **the text of not-yet-revealed bullets is present and
announced.** On the utilitarianism lesson's slide 2, all four "hidden" bullets
read out immediately, including the punchline.

So the progressive reveal — the pedagogical point of the feature — doesn't exist
for a screen-reader user, and what they hear doesn't match what a sighted
classmate sees on the projector. Any link or control inside a pending step is
also focusable while invisible.

```css
.phil-step { opacity: 0; visibility: hidden; transform: translateY(10px);
             transition: opacity .25s ease-out, transform .25s ease-out,
                         visibility 0s linear .25s; }
.phil-step.phil-show { opacity: 1; visibility: visible; transform: none;
                       transition-delay: 0s; }
```

`visibility` still reserves layout space, so nothing shifts.

### C-4 · Tall slides scroll but can't be scrolled by keyboard

> **Fixed** — `_fitSlide()` sets `tabindex="0"` on overflowing slides, with a focus ring.
**WCAG 2.1.1 Keyboard (A)** · `shared/phil-core.css` `phil-slide` ·
**110 slide-states across all 12 lessons**

`phil-slide` is the scroll container (`overflow: auto`) and gets `.is-tall`
whenever content exceeds the stage. It has no `tabindex`, so it can never
receive focus, so arrow keys never scroll it — and the engine binds ArrowUp /
ArrowDown's neighbours (`ArrowLeft`/`ArrowRight`) to slide navigation. A
keyboard-only or switch user cannot read the bottom of a long slide at all.

Set `tabindex` alongside the existing class toggle in `_fitSlide()`:

```js
_fitSlide(slide) {
  if (!slide) return;
  const tall = slide.scrollHeight > slide.clientHeight + 1;
  slide.classList.toggle('is-tall', tall);
  if (tall) slide.setAttribute('tabindex', '0');
  else slide.removeAttribute('tabindex');
}
```

### C-5 · Slide changes are silent, and focus never moves

> **Fixed** — the heading takes `tabindex="-1"` and real focus; a `role="status"` region announces "Slide N of M: <title>".
**WCAG 2.4.3 Focus Order (A); 4.1.3 Status Messages (AA)** ·
`shared/phil-core.js:254`

```js
const focusable = slide.querySelector('h1, [tabindex], button, input, select');
focusable?.focus?.({ preventScroll: true });
```

The intent is right but it silently does nothing: an `<h1>` has no `tabindex`,
so it isn't focusable and `.focus()` is a no-op. Measured across four
navigations, `document.activeElement` stayed on `BODY` the whole time.

Net effect: pressing **→** or **Next** replaces the entire visible content of the
page while focus stays put and nothing is announced. A screen-reader user gets no
signal that the slide advanced. When the selector *does* match — a slide whose
first control is a radio or text input — focus lands inside a form control and
skips the heading, which is its own problem.

Focus the heading explicitly, and add a polite announcement:

```js
const h = slide.querySelector('h1');
if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
// plus a role="status" node in the shell:
this._live.textContent = `Slide ${idx + 1} of ${this.linear.length}: ${h?.textContent || ''}`;
```

### C-6 · Reset dialog isn't a dialog, and focus escapes it

> **Fixed** — `role="dialog"`, `aria-modal`, `aria-labelledby`, a Tab trap, `inert` on the page behind, and focus restored to the opener.
**WCAG 4.1.2 (A); 2.4.3 Focus Order (A)** · `shared/phil-core.js`
`_confirmReset()`

The overlay is a plain `<div class="phil-modal">`. No `role="dialog"`, no
`aria-modal="true"`, no accessible name. Measured tab order from the dialog:

```
Tab → BUTTON: Yes, reset          [in modal]
Tab → BODY                        [OUTSIDE MODAL]
Tab → BUTTON: 🔕                  [OUTSIDE MODAL]
Tab → BUTTON: ↺ Reset             [OUTSIDE MODAL]
```

Two tabs and you're behind the dialog, operating a page that is visually covered
by a 67 %-opaque scrim. Focus is also not restored to the Reset button on
cancel.

It does two things right: `Escape` closes it, and initial focus goes to Cancel
(the safe choice). Add the semantics, a wrap-around tab trap between Cancel and
Confirm, `inert` on the rest of the page, and focus restore on close.

### C-7 · `F` shortcut has no modifier guard — it hijacks Ctrl/⌘+F

> **Partly fixed** — the modifier guard is in (Ctrl/⌘/Alt/Shift+F no longer hijacked; verified). The 2.1.4 conformance route still needs a product decision — see below.
**WCAG 2.1.4 Character Key Shortcuts (A)** · `shared/phil-core.js:167`

```js
else if (e.key.toLowerCase() === 'f') this.toggleFullscreen();
```

No check of `e.ctrlKey` / `e.metaKey` / `e.altKey`. Verified: **Shift+F fires
it, and so does Ctrl+F / ⌘+F** — so browser *Find in page*, a primary navigation
tool for low-vision and cognitively disabled users, instead throws the lesson
into fullscreen. Screen-reader users who type a letter to jump by first
character hit the same wall.

Two separate fixes:

1. *Bug, fix immediately:* `if (e.ctrlKey || e.metaKey || e.altKey) return;`
   (ArrowLeft/ArrowRight are exempt from 2.1.4 — it covers letter, number,
   punctuation and symbol keys only — so only `f` is in scope here.)
2. *Conformance:* 2.1.4 requires that a single-character shortcut can be turned
   off, remapped, or limited to when a component has focus. The existing
   "ignore while typing" check is a good instinct but isn't one of the three.
   This needs a product decision — a hotkeys toggle next to the sound toggle is
   the cheapest route. **Left unresolved deliberately; flagging, not guessing.**

---

## Serious

### S-1 · Homepage buttons: 1.52:1 contrast

> **Fixed** — `color: var(--bg)` in `tools/build-index.mjs`; 1.52:1 → 10.74:1.
**WCAG 1.4.3 Contrast (Minimum) (AA)** · `tools/build-index.mjs` `.btn` rule ·
13 elements

`.btn { color: var(--ink) /* #eef1ff */; background: var(--accent) /* #46e07a */ }`
— near-white on bright green, **1.52:1 against a required 4.5:1**. This is the
single worst defect on the site by prominence: it's the hero *"▶ Browse
lessons"* call-to-action plus all 12 *"SCORM 1.2 ↓"* download links.

One-character fix, and it lands at 10.74:1:

```css
.btn { color: var(--bg); background: var(--accent); }
```

Note `index.html` is **generated** — edit `tools/build-index.mjs`, then re-run
`node tools/build-index.mjs`. Editing `index.html` directly will be overwritten.

### S-2 · `--accent` token collision in breadcrumb-network: 1.72:1

> **Fixed** — here and in `philosophers-blueprint`, which had the same collision.
**WCAG 1.4.3 (AA)** · `lessons/ai-ethics/breadcrumb-network/index.html:39`

```css
.cascade-btn.active { background: var(--accent, #6366f1); color: #fff; }
```

The fallback `#6366f1` (indigo) would have been fine with white text. But
`--accent` *is* defined by the shared palette — as green `#46e07a` — so the
variable wins and you get white on green: **1.72:1**. A local style was written
against a token name that means something else globally.

Use `color: var(--bg)`, or scope to the real token (`--accent-3`) with intent.
Worth grepping the other lessons for `var(--accent`, `var(--info`, `var(--go`,
`var(--mag`, `var(--text` — several are invented names that only work by
fallback, and will silently change meaning if those tokens are ever added to
`:root`.

### S-3 · Ancestor `opacity` drops the golden-mean labels below AA

> **Fixed** — the `opacity` moved onto a `::after` gradient layer; labels now 6.2–9.2:1, marker 6.87:1.
**WCAG 1.4.3 (AA)** · `lessons/ethical-theory/virtue-ethics/assets/golden-mean.js`

`.mean-bar` carries `opacity: .6`, which composites its child labels toward the
panel background. The colours are fine on their own; the group opacity is what
breaks them:

| Element | Declared | Rendered | Ratio | Need |
|---|---|---|---|---|
| `.mean-def-label` ("Cowardice") | `#4cc2ff` | `#3982ae` | 3.73:1 | 4.5:1 |
| `.mean-virtue-label` ("Courage") | `#46e07a` | `#36945e` | 4.16:1 | 4.5:1 |
| `.mean-exc-label` ("Rashness") | `#ff6ad5` | `#a54d95` | 3.07:1 | 4.5:1 |
| `.mean-marker` label | on `#a54d95` | — | 3.40:1 | 4.5:1 |

Move the `opacity` onto the decorative gradient bar itself rather than the
element that contains the text, or drop the labels out of the faded subtree.
This is the general trap: **`opacity` for de-emphasis silently costs contrast**,
and it's invisible to any check that reads declared colours instead of rendered
ones.

### S-4 · Nothing is a status message

> **Fixed** — `role="status"` on answer feedback, the belief-probe status line, and the completion toast.
**WCAG 4.1.3 Status Messages (AA)** · `shared/phil-core.js`

`document.querySelectorAll('[aria-live], [role=status], [role=alert]').length === 0`
across the whole project. Four separate things change without announcement:

- **Answer feedback** (`.phil-feedback`) — "✔ Correct" / "✘ Try again" plus the
  explanation. This is the core teaching loop, and it is silent.
- **Score tally** (`.phil-tally`) — "★ 3/6 correct".
- **Completion toast** — "✔ LESSON COMPLETE!", which also auto-dismisses after
  3.5 s.
- **Belief-probe status** — "3/5 rated. Rate all 5, then Submit."

Give `.phil-feedback` and `.phil-belief__status` `role="status"` when created
(the element must exist in the DOM *before* the text is written for the
announcement to fire), and `role="status"` on the toast.

### S-5 · Likert selection is conveyed by colour alone

> **Fixed** — `aria-pressed` on every rating button, and the row is a `group` named by its statement.
**WCAG 1.4.1 Use of Colour (A); 4.1.2 (A)** · `shared/phil-core.js`
`likertScale()`

The selected rating is marked only by `.sel` (a blue background). No
`aria-pressed`, no `aria-checked`, no `role`. A screen-reader user can set a
rating but cannot read back which one they chose — and the belief probe's whole
design depends on returning to those answers later and comparing. The
`beliefDelta()` review text ("Shifted from *Disagree* to *Agree*") is the one
place this leaks through, and only after re-rating.

```js
b.setAttribute('aria-pressed', String(v === selected));
// and on click, update aria-pressed across all five
```

Also give the five-button row a group name tied to the statement it rates, so
the buttons aren't orphaned.

### S-6 · MCQ and checkset have no group semantics

> **Fixed** — `role="radiogroup"` / `role="group"` with `aria-labelledby` pointing at the prompt.
**WCAG 1.3.1 (A)** · `PhilMcq.build()`, `PhilCheckset.build()`

The question prompt is a plain `<p class="phil-widget__prompt">`. It is not
associated with the options, so the radio group has no accessible name. Someone
tabbing into the options hears the choices with no question attached.

```js
this.setAttribute('role', 'radiogroup');          // 'group' for checkset
const p = el('p', 'phil-widget__prompt', …);
p.id = `${this.qid}-prompt`;
this.setAttribute('aria-labelledby', p.id);
```

### S-7 · No `<main>`, no skip link

> **Fixed** — the stage is now `<main>`; the homepage gained a skip link and its own `<main>`, with the footer moved out to stay a page landmark.
**WCAG 2.4.1 Bypass Blocks (A); 1.3.1 (A)** · engine + homepage

Zero `<main>` elements project-wide; axe reports `landmark-one-main` on all 13
pages and 657 `region` hits. The engine already emits `<header>` and `<footer>`,
so this is a one-word change:

```js
this._stage = el('main', 'phil-stage');   // was el('div', …)
```

The homepage additionally has no skip link past its sticky nav.

### S-8 · Icon-only toggles expose no state

> **Fixed** — `aria-label` on all three, plus `aria-pressed` on the sound toggle.
**WCAG 4.1.2 (A)** · `_buildShell()`

The sound (🔕/🔔), narration (🔇/🔊) and fullscreen (⛶) buttons are named only by
`title`. `title` does produce an accessible name, but it's the weakest source,
unreliable on touch, and — more importantly — **none of the toggles expose
on/off state**. The emoji swap is the only indicator.

Use `aria-label` plus `aria-pressed`, updating both when toggled.

### S-9 · Progress bar has no role or value

> **Fixed** — `role="progressbar"` with `aria-valuenow` / `valuemax` / `valuetext`, kept in sync by `_refresh()`.
**WCAG 1.3.1 (A)** · `.phil-progress`

A `<div>` whose child's width is set in percent. Add
`role="progressbar"` with `aria-valuenow` / `aria-valuemin` / `aria-valuemax`,
or `aria-valuetext="Slide 4 of 27"`. (The `.phil-counter` text does carry the
same information, so this is structural rather than an information loss.)

---

## Moderate

### M-1 · Locked answers are still changeable by keyboard

> **Fixed**, but not as suggested above. `disabled` turned out to be the wrong lever: it greys the radio out, so the answer the student picked stops being visible, and it drops the control from the tab order so a screen-reader user can no longer review their own answer. Instead the widget carries a `_locked` flag that cancels the click a Space/arrow press generates, and the input gets `aria-disabled="true"`. Verified with real key presses: arrows and Space cannot change a settled answer, and the control stays reachable.
`.phil-choice.locked { pointer-events: none }` blocks the mouse, but the radio
stays `enabled` and focusable. Verified: after solving an MCQ, focusing a
distractor and selecting it with the keyboard flips it to checked and adds the
`wrong` class to a locked row. Mouse and keyboard users get different rules,
which is both an accessibility inconsistency and a grading-integrity gap.
Set `input.disabled = true` in `lock()` (as `PhilCloze.lock()` already does).

### M-2 · Text ignores the browser's font-size preference

> **Open.** Needs a pass over the `clamp()` bounds and the pixel-font UI sizes; a judgement call about the projector-first design, not a bug fix.
**WCAG 1.4.4 Resize Text (AA) — at risk.** Setting the root font size to 200 %
changes slide body text by **0 px** (`28px` → `28px`): every size is `px` or a
`clamp()` with a `px` cap, and `.phil-btn` is pinned at `10px`. Page zoom does
work, and zoom is an accepted way to satisfy 1.4.4 — so this is defensible
rather than a clear failure. But low-vision users who set a large default font
size (a very common configuration) get nothing from it, and `9–10px` pixel-font
UI chrome is small to begin with. Consider `rem`-based `clamp()` bounds.

### M-3 · `prefers-reduced-motion` covers 2 animations of ~8

> **Fixed** — the reduced-motion block now covers the slide transition, step fades and toast, and `scrollIntoView` switches to `behavior: "auto"`.
Only `phil-compare`'s side entrances and the VS badge are guarded. Verified
still running under `reducedMotion: reduce`: the `phil-in` slide transition
(`0.18s`, fires on every navigation), `.phil-step` fade-ups, the toast slide-in,
and `scrollIntoView({ behavior: 'smooth' })` in `next()`. Extend the existing
`@media (prefers-reduced-motion: reduce)` block, and branch the scroll behaviour
in JS.

### M-4 · No focus styles of the project's own

> **Fixed** — an explicit `:focus-visible` ring in the shared stylesheet and on the homepage. Scoped away from the `tabindex="-1"` slide headings, which take focus programmatically and would otherwise wear a blue box on every slide.
There is no `:focus`/`:focus-visible` rule anywhere; the project inherits the UA
ring. On current Chromium this renders as a visible white outline on the dark
theme (confirmed by screenshot), so **this is not a current AA failure** — but it
is unhedged, varies by browser, and sits tight against the 3px black borders.
A deliberate `:focus-visible { outline: 3px solid var(--accent-3); outline-offset: 2px }`
costs one rule and removes the risk. Pairs naturally with the new tab stop from
C-4.

### M-5 · Heading-order breaks

> **Fixed** — `breadcrumb-network`, `philosophers-blueprint`, `switchboard.js` and the homepage generator, each with its CSS selector updated so nothing changes visually.
`heading-order` fires on 3 lessons. `breadcrumb-network` uses `<h4>` where the
slide's outline reaches `h2` (lines 353, 357, 361, 399…); `philosophers-blueprint`
jumps `h1 → h3` (lines 334, 346, 354, 364, 372). On the homepage,
`<section class="topic"><h2>` is nested inside the `#lessons` section whose
heading is also `h2` — those should be `h3` (in `tools/build-index.mjs:56`).

### M-6 · Two visible `<h1>`s per lesson

> **Open, deliberately.** Slide headings are authored as `<h1>` across all 12 lessons; renumbering them is a content migration, and it is not a failure today.
The shell title (`.phil-title`) and the current slide's heading are both `h1`
and both visible. 29 `h1` elements exist per lesson; 2 are visible at any time.
Not a failure — but making `.phil-title` a `<p>` or `<h1>` with slide headings
demoted to `h2` would give screen-reader users a usable document outline.

**Also worth a look:** `.card:hover` puts `--muted` on `#313a5e` at 4.45:1,
just under the 4.5 line — `#2b3252` clears it. And `.mean-marker` carries an
`aria-label` on a `<div>` with no role, where it is ignored by most screen
readers; use a real element or add `role="img"`.

---

## What's left

Three things, all deliberate:

**C-7, the conformance half.** The bug is fixed — `f` no longer fires with a
modifier, so Ctrl+F / ⌘+F is Find in page again. But WCAG 2.1.4 wants a
single-character shortcut to be *turned off, remapped, or limited to when a
component has focus*, and "ignore it while typing" is none of those. The cheapest
route is a hotkeys toggle sitting next to the sound toggle, persisted the same
way. That's a product decision about the projector workflow, so it's flagged
rather than guessed at.

**M-2, text scaling.** Every size is `px` or a `clamp()` with a `px` cap, so a
browser font-size preference moves nothing. Page zoom works and is an accepted
way to satisfy 1.4.4, so this is defensible — but it needs a considered pass over
the `clamp()` bounds and the 9–10px pixel-font chrome, weighed against a design
that's built to be legible from the back of a room.

**M-6, one `<h1>` per page.** Slide headings are authored as `<h1>` in all 12
lessons. Demoting them is a content migration across every lesson file, and the
current structure isn't a failure — just a worse document outline than it could be.

## Keeping it fixed

```bash
node tools/a11y-audit.mjs            # walks every slide of every lesson
node tools/a11y-audit.mjs --strict   # exit 1 on any finding (CI/hooks)
```

Rebuild the derived artefacts after engine or lesson changes, or the fixes won't
reach the homepage and the LMS packages:

```bash
node tools/build-index.mjs           # homepage (index.html is generated)
node tools/build-scorm.mjs --all     # dist/scorm/*.zip
```

Authoring rules that keep new lessons clean are in
[AUTHORING.md](../AUTHORING.md#accessibility-auto-checked).

## Caveats

- Automated tooling catches roughly a third of WCAG issues. Every finding above
  was machine-verified or manually reproduced, and every fix was re-verified the
  same way — but none of this has been validated with **real assistive
  technology**. A clean axe run is a floor, not a conformance claim. Before
  claiming conformance, run one full lesson end-to-end with NVDA/Windows and
  VoiceOver/macOS, and once with keyboard only.
- The fixes were verified three ways: axe across all 1,020 slide-states, scripted
  behavioural probes (focus movement, dialog tab-trapping, the accessibility
  tree, real key presses against a locked answer), and before/after screenshots
  to catch visual regressions. Two regressions were caught and corrected that
  way — a focus ring framing every slide title, and `disabled` radios hiding the
  student's chosen answer.
- Testing was Chromium-only. Focus-appearance findings in particular (M-4)
  differ in Firefox and Safari.
- Cognitive-accessibility and plain-language review are out of scope here, and
  matter for this audience.
- No VPAT/ACR is produced by this document.
