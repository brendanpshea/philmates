# Build plan — "Marley's Chain" (AI and Climate Change)

Status on 2026-11-09: designed, nothing built. This folder holds this plan
and `prompts.md`. The design itself (frame, cast, slide-by-slide outline,
guardrails, accuracy note) is the "Marley's Chain" section at the end of
`phil_mates_outlines.md`. Read that first. Follow `AUTHORING.md` for
everything this plan does not repeat. Delete this file when the lesson
ships.

## Fixed decisions

- Path `lessons/ai-ethics/ai-climate/`, lesson id `ai-climate`, top-bar
  title `Marley's Chain`, subject `AI and Climate Change`.
- Frame: *A Christmas Carol*. Scope: AI and climate change only.
- Every perishable number lives on one of four "ledger page" slides, each
  stamped "Our world, November 2026". No graded item depends on a number, a
  company, a model, or a news story.
- Six graded items (five classify, one checkset), no MCQ. Verdicts are polls.

## Step 1 — Verify the sources (do this before writing a slide)

The research session could not open any source page. Every quotation in the
accuracy note came from search extracts or secondary quotation. Check each
one against the primary text, fix the accuracy note, and change its heading
from "not yet checked" to "checked <date>".

| Check | Where |
|---|---|
| Dickens, three passages, punctuation | Project Gutenberg eBook #46 |
| Jevons, ch. VII, "confusion of ideas" ("economical", not "economic") | econlib.org or oll.libertyfund.org |
| Sinnott-Armstrong, two quotations and the page range | *Climate Ethics: Essential Readings* (OUP 2010) reprint; say which edition is cited |
| Parfit, Fifth Mistake wording and page; Harmless Torturers page | *Reasons and Persons* ch. 3 |
| Shue (1993) "surrender necessities" line and its page | *Law & Policy* 15(1) |
| Shue (1999) citation | *International Affairs* 75(3): 531–545 |
| Gardiner (2006) abstract lines; names of the three storms | *Environmental Values* 15(3) |
| Kaack et al. (2022), exact names of the three categories | *Nature Climate Change* abstract |
| van Wynsberghe (2021) "two branches" line | *AI and Ethics* 1, open access |
| Jonas, imperative wording and page | *The Imperative of Responsibility* (1984) |
| IEA 2026: 485 TWh, 17%, share of world electricity, 950 TWh by 2030 | *Key Questions on Energy and AI* PDF |
| IEA 2025: 180 Mt, 0.5%; the "5% by 2035" claim and its "no momentum" caveat | *Energy and AI*, "AI and climate change" chapter |
| Google per-prompt figure and what it excludes | arXiv 2508.15734 |
| Long answers cost about 13 times short ones | Oviedo et al., *Joule* (2026) |
| Nadella's "Jevons paradox strikes again" wording and date | the original post |
| Contrail trial: 62%, 12%, 15% | the published study, not a summary |
| ECMWF AIFS operational dates | ecmwf.int |

Paraphrase only, never quote: Kagan (2011), Broome (2012), Gardiner (2010).
Do not use Broome's "six months of healthy human life" line or Nolt's "one or
two future people" unless found in the primary text. If a quotation cannot be
confirmed, cut it and paraphrase.

## Step 2 — Scaffold

```bash
node tools/new-lesson.mjs ai-ethics ai-climate "Marley's Chain"
```

The folder already exists; the script adds `index.html` and `assets/` and
leaves `prompts.md` and this file alone. Then set `id="ai-climate"` and
`subject="AI and Climate Change"` on `<phil-lesson>`, write the
`<meta name="description">` with the hook in its first dozen words, and add
`"ai-climate"` to `lessons/order.json` under `ai-ethics`, after
`meaningful-work`.

## Step 3 — Art

Generate the seven sheets in `prompts.md`, split them into the 28 files
named there, and inspect each panel full-size. Update the Status section of
`prompts.md` when done.

## Step 4 — Write the slides

Follow the slide-by-slide list in the outline. Notes that the outline does
not spell out:

- **Trim to about 33 slides.** Merge ledger page 2 with its checkset, and the
  "what the Engine Room showed" slide with ledger page 3, if both still fit a
  frame.
- **Slide ids for `review=` targets:** `three-kinds`, `per-prompt`,
  `three-outcomes`, `one-link` (Sinnott-Armstrong) and `torturers` (Parfit),
  `who-pays`, `three-storms`. The last slide is `further-reading`.
- **Ledger pages:** give each `class="ledger-page"` and a visible stamp, "Our
  world, November 2026", plus an HTML comment `<!-- LEDGER PAGE: refresh
  yearly -->` so next year's update is a search away. Each number names the
  year it describes and its source.
- **Thinker cards** (one accent color each): Kaack and colleagues, Jevons,
  Sinnott-Armstrong, Parfit, Shue, Gardiner, Jonas, Rolnick and colleagues.
  Leave `dates` off any card whose dates are not verified.
- **Applications that are ours:** Shue wrote about nations and the world's
  poor, and Gardiner about geoengineering. The slide that applies each to AI
  says so in one plain sentence.
- **Casting:** the student is the junior partner and is never drawn.
  Characters ask questions and face the polls. No argument is credited to a
  character.

### Graded items

| qid | Type | Review slide | Columns | Row seeds |
|---|---|---|---|---|
| `ai-climate:q1` | classify | `three-kinds` | Running the engine · What the answers are used for · How the town changes | coal for a long calculation; iron smelted for a new boiler; answers that cut a baker's fuel use; answers that help find a new coal seam; cheap answers lead shops to stay open all night; families move away from the canal because forecasts made carting cheaper |
| `ai-climate:q2` | checkset | `per-prompt` | true / false | includes the coal burned while answering (true); includes building the engine (false); tells you the firm's total for the year (false); depends on which accounting method was used (true); is the same for a short answer and a long one (false); can be honest and still leave things out (true) |
| `ai-climate:q3` | classify | `three-outcomes` | Saving · Rebound · Backfire | six cases with small whole numbers, two per column, e.g. coal per answer halves and answers rise by half (rebound); halves and answers triple (backfire); halves and answers stay level (saving) |
| `ai-climate:q4` | classify | `one-link` | Sinnott-Armstrong's reasoning · Parfit's reasoning · Neither | two rows each; the "neither" rows are common misreadings (climate change is not an individual's concern at all; an act is wrong only if someone can feel its effect) |
| `ai-climate:q5` | classify | `who-pays` | Polluter pays · Beneficiary pays · Ability to pay | two proposals each, with no named character in any row |
| `ai-climate:q6` | classify | `three-storms` | Global · Intergenerational · Theoretical | two features of the engine decision each |

Stamp each `data-qid` once and never renumber. Every classify row needs a
`why`. Column names must appear on a slide before the item, in the same
words. In q3 show the arithmetic on the `three-outcomes` slide first, so the
item tests the idea and not the sums. In q4 the "neither" column must be the
answer for at least one row and must not be a strawman of either philosopher.

### Polls

1. The thriftier engine and three times the answers: what should the town ask
   of Scrooge? `explain`: efficiency is not a climate policy by itself; a cap
   or a price on the coal is what turns it into one.
2. Is your prompt a link in the chain?
3. Who should pay for Scrooge's coal?
4. Christmas morning: sign, sign with conditions, or refuse.

Anything every student must learn goes in `explain`, never in a per-option
`note`.

## Step 5 — The widget

`assets/rebound.js`, element `<phil-rebound>`, titled "The Engine Room". Not
graded; the slide has `hold`.

- Two controls. **Thrift:** coal per answer for the new engine, as a share of
  the old (100%, 75%, 50%, 25%). **Appetite:** how many answers the town buys
  once answers are cheaper (the same, 1.5×, 2×, 4×).
- Output: two bars, total coal before and after, and one word in text
  (Saving, Rebound, or Backfire) with a one-sentence reason. The word carries
  the result; color only decorates it.
- Total after = thrift × appetite × total before. Saving when appetite is
  unchanged; rebound when the product is below 1; backfire when it is above
  1; say "no change" when it is exactly 1.
- A visible line: "Invented numbers. A toy, not a forecast."
- Put `phil-dense` on the host element. Don't name any attribute `reveal`.
  Controls are real `<button>` or `<input>` elements with labels. Don't reuse
  shared CSS token names for other colors.
- The next slide states what the widget shows, so a student who skipped it
  loses nothing.

## Step 6 — Checks

```bash
node tools/validate-quizzes.mjs
node tools/check-register.mjs --list
node tools/check-density.mjs --measure
node tools/a11y-audit.mjs --page lessons/ai-ethics/ai-climate/index.html
```

Then the answer-key review from `AUTHORING.md`: `node tools/student-view.mjs
ai-ethics/ai-climate`, two blind reviewers, one adversarial reviewer with the
accuracy note, and a re-check of changed rows only.

## Step 7 — Narration, then ship

- Write `<phil-narration>` lines and `say=` attributes per
  `docs/audio-narration.md`. The script adds no fact the slides lack.
- `python tools/generate-audio.py lessons/ai-ethics/ai-climate`, with a
  Gemini voice chosen for this lesson. Name the voice in the AI
  acknowledgment on the last slide.
- `python tools/build-thumbs.py`, `node tools/build-index.mjs`,
  `node tools/build-scorm.mjs --all`.
- In `phil_mates_outlines.md`, change the heading tag to *(built)*, replace
  "planned" paths, and add an "As drafted" note with the final slide count.
  In `docs/ai-ethics-semester-plan.md`, change "designed" to "built".
- Delete this file.

## Yearly refresh (after shipping)

Search `index.html` for `LEDGER PAGE`. Update the four slides and their date
stamp, and the "Ledger pages" list in the accuracy note. Nothing else should
need to change. If a graded item has to change because a number moved, that
item broke the design rule and should be rewritten.
