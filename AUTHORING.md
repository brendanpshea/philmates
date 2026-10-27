# Authoring a PhilMates lesson

A lesson is **one `index.html` file** plus an `assets/` folder, living at
`lessons/<topic>/<lesson-slug>/`. It loads two shared files and declares its
content with custom elements — the engine handles navigation, progress,
feedback, and completion. **No build step**; it serves straight from GitHub Pages.

## Quick start

```bash
node tools/new-lesson.mjs ethical-theory deontology "Kant's Categorical Imperative"
# edit the generated lessons/ethical-theory/deontology/index.html
python tools/build-thumbs.py     # small card image for the catalog (optional; needs Pillow)
node tools/build-index.mjs       # refresh index.html and instructors.html
```

To preview locally, serve the repo root (paths are absolute, e.g. `/shared/...`):

```bash
npx serve .        # or: python -m http.server
```

## Where a new lesson shows up

`build-index.mjs` writes two pages. `index.html` is the catalog: one compact card
per lesson, grouped by topic, with a topic filter. `instructors.html` holds the
how-to-use notes, the SCORM downloads, and the about text. Never edit either by
hand.

- **Card picture.** The card uses the lesson's first `slot="art"` image.
  `build-thumbs.py` makes a 192px copy in `shared/thumbs/` so the catalog stays
  light. Skip it and the card loads the full-size image instead.
- **Card text.** The title and `subject` come from `<phil-lesson>`. The
  description is the page's `<meta name="description">`, cut off after two
  lines, so put the hook in its first dozen words.
- **Order.** Lessons appear in the order listed in `lessons/order.json`. A
  lesson that is not listed goes at the end of its topic.

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
clean slide 1. Handy for re-running a lesson live in class. In a SCORM build,
Reset keeps the score: it clears slides and answers, but never the wrong-try
counts or earned credit.

## Scoring: each wrong try is worth 80% of the last

Completion still needs every question right eventually, but the **score** (shown
as `★ Score` in the top bar and sent to the LMS) rewards getting it right early.
Students were clicking through whole lessons in five minutes and guessing until
each answer turned green, which earned full marks and taught nothing.

- **Each wrong try lowers what a question can still earn by a factor of 0.8**
  (`RETRY_FACTOR` in `phil-core.js`): 100% on the first try, then 80%, 64%,
  51% … A question keeps the best credit it ever earned. Wrong tries are
  saved, so reloading the page doesn't reset them.
- **Checksets, cloze, and classify also earn partial credit on every check.**
  Each check is scored part by part, then scaled by the tries already spent,
  and the best result is kept. A first check with 5 of 6 right banks 67%; a
  correct second check raises it to 80%. The part-by-part scores:
  - *Checkset:* (statements right − statements wrong) ÷ total, never below 0.
    6 of 6 right is 100%, 5 of 6 is 67%, 4 of 6 is 33%, and random ticking or
    a blank check averages 0.
  - *Cloze:* each right blank counts 1; a wrong dropdown pick costs
    1 ÷ (options − 1), so random picking averages 0. A wrong typed answer or an
    empty blank costs nothing.
  - *Classify:* each right row counts 1; a wrong row costs 1 ÷ (columns − 1);
    a blank or "Not sure" row costs nothing.
- **A multi-part miss says how many parts are wrong, never which.** "2 of
  your 6 rows are wrong" leaves the student to find them. If the red marks
  showed which ones, a random first check followed by flipping the red rows
  would earn 80% with no knowledge at all. Unanswered and "Not sure" rows are
  marked ?, which gives nothing away. Everything is marked once it's solved.
- **A wrong MCQ option is struck through** and can't be picked again. The
  options reshuffle before the next try.
- **Re-checking a checkset or cloze without changing anything is free.** It
  says "Same answers as before" instead of costing a try.
- **After a miss, the question locks until the student reviews.** Give the
  question `review="slide-id"` and the feedback offers a button to that slide;
  the question unlocks once they've visited it, and a "↩ Back to the question"
  button brings them back. With no `review`, the question unlocks after a
  10-second pause instead.

**Give every graded question a `review` target.** Point it at the slide that
teaches the answer, and give that slide an explicit `id` (`<phil-slide
id="imitation-game">`). Auto ids like `s7` shift whenever a slide is added.

```html
<phil-slide id="imitation-game"> … teaches it … </phil-slide>
…
<phil-mcq review="imitation-game" prompt="…" explain="…"> … </phil-mcq>
```

Adding an `id` to a slide that already has saved progress makes students
revisit that one slide before the lesson counts as complete. That's harmless,
but do it before a term rather than during one.

**Every graded item carries a permanent `data-qid`.** Saved progress, in the
browser and in the LMS, is keyed by it, so it must never change.

- `new-lesson.mjs` stamps the first one. Give each new item the next unused
  number (`<lesson-id>:q9`).
- Never renumber, and never reuse a retired number.
- When a conversion replaces an item with one that tests the same idea, keep
  the old id, so students who solved it keep their credit. A genuinely new item
  gets a new number.
- The validator rejects missing, duplicate, or misprefixed ids.

In older lessons the ids look out of order. The engine used to number items by
type (all MCQs first, then checksets, cloze, and classify), so the stamped values
are the ones saved progress already uses.

## `reveal` is a reserved attribute name

The engine builds a slide's step-by-step reveal from `[reveal] > *` — every
direct child of any element carrying a `reveal` attribute becomes a hidden step.
That is what `<ul reveal>` is doing.

So **never name a widget attribute `reveal`.** `<phil-trial reveal="…">` turns
every child the widget renders into a reveal step, and `.phil-step` uses
`visibility: hidden`, which still reserves layout. The result is an empty box of
exactly the right size that fills in only once the presenter has clicked to the
end of the slide, with no error anywhere to explain it. Use `action2`,
`verdict2`, or anything else.

## Widgets

### Multiple choice — `<phil-mcq>`
```html
<phil-mcq prompt="Who wrote the Principle of Utility?" explain="Shown after a correct pick.">
  <phil-choice correct>Bentham</phil-choice>
  <phil-choice feedback="Hint shown if this wrong choice is picked.">Kant</phil-choice>
</phil-mcq>
```
Mark the right option with `correct`. Students can retry until right. **Write four
options**, not three — a three-option question hands a pure guesser 33%, and a
guesser who can eliminate one throwaway is down to a coin flip.

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

### Option order is shuffled for you

The engine reshuffles the options of every `<phil-mcq>` and `<phil-checkset>` each
time the page loads, so **the order you author in never reaches a student.** This
matters most for checksets: writing one, you naturally list the true statements
first and the distractors after, and a student who notices that can pass the whole
lesson without reading a word. Shuffling kills that tell everywhere at once.

Nothing is stored by index, so a reshuffle is safe — a restored answer is found by
its `correct` flag, not its slot. `<phil-poll>` is the one exception: it saves the
picked index, so polls are never shuffled and their options stay in authored order.

Add `keep-order` to opt out for a question whose options are genuinely sequenced —
a timeline, escalating degrees, an "all of the above":

```html
<phil-mcq keep-order prompt="Put the steps in order…">
```

### Sort into columns — `<phil-classify>` (the default graded item)
```html
<phil-classify review="systems-reply" prompt="Each critic is answering Searle. Which reply is it?"
               explain="Shown once every row is right.">
  <phil-col key="sys">Systems reply</phil-col>
  <phil-col key="rob">Robot reply</phil-col>
  <phil-item answer="rob" why="Connecting symbols to what a body sees and does is the robot reply.">"Put the program in a body with cameras…"</phil-item>
  …
</phil-classify>
```
A grid: one row per item, one column per category, plus a **Not sure** column
(turn it off with `no-unsure`). It asks five to eight judgments in the space an
MCQ spends on one, and it is the best format we have for asking students to
*apply* an idea to cases. Two columns make it a true/false grid; three or four
make it matching.

- Every `phil-item` needs an `answer` (a column `key`) and a `why`: one
  sentence saying why that column is right, from what the lesson teaches. The
  validator rejects an item without one. Students can open the reasons after
  solving.
- 4–8 rows, 2–4 columns. Every column must be the answer for at least one row.
- A column that names a category ("Systems reply", "Fair chances") must be
  named on a slide before the item; the validator checks this. Mark a column
  that describes rather than names `descriptive`
  (`<phil-col key="in" descriptive>The interrogator can see this</phil-col>`).
  Labels with a colon ("Disguise: hides …") define themselves and are exempt.
- Scoring: every check is scored row by row (right +1, wrong
  −1/(columns−1), not sure 0), so guessing averages zero, then scaled by the
  tries already spent. A miss says how many rows are wrong, not which.
- Rows shuffle on every load; columns keep their order.

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

### Thinker card — `<phil-thinker>` (teaching, not graded)
Stands in for a portrait of a real thinker. Put it in the art column with
`slot="art"`. The face is HTML, so it stays crisp on a projector.
```html
<phil-thinker slot="art" name="John Searle" work="“Minds, Brains, and Programs” (1980)"
              img="./assets/idea-searle.png"
              alt="A closed door with slips of wavy shapes sliding out under it" accent="#4cc2ff">
  <p>Running a program is not the same as understanding.</p>
  <blockquote>A short quotation, checked against the source.</blockquote>
</phil-thinker>
```
- The `<p>` is the core claim in about twelve words. The `<blockquote>` is
  optional, and it must be verified wording.
- `img` is an idea scene with no face. `alt` is required whenever `img` is set.
- `accent` colors the frame and the name. Give each thinker in a lesson a
  different one.
- Put dates and quotes on the card only once they are verified. Leave
  `dates` off rather than guess.

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

### The mean spectrum — `<phil-mean>` (ungraded, opt-in)
A Deficiency → Mean → Excess bar with a movable character marker, for any
virtue-ethics lesson. It is not part of the engine; load it per lesson and give it
its data as an inline JSON block:
```html
<script type="module" src="../../../shared/phil-mean.js"></script>
...
<phil-mean prompt="Pick a person and a facet:" domain-label="Facet of care" character-label="Person">
  <script type="application/json">
  { "domains":    [{ "id": "honesty", "virtue": "Honesty", "deficiency": "Evasion", "excess": "Bluntness" }],
    "characters": [{ "id": "jo", "name": "Jo", "positions": { "honesty": { "pos": 0.65, "note": "…" } } }] }
  </script>
</phil-mean>
```
`pos` runs 0 (deficiency) to 1 (excess); 0.5 is the mean. Used by the virtue-ethics
and care lessons.

## When you add a widget to the engine: bump `?v=`

Lessons load the engine as `../../../shared/phil-core.js?v=5`. That query string
is a cache-buster, and it matters: a browser holding an older `phil-core.js` has
never heard of your new element, so it never upgrades — the widget's authored
children spill onto the slide as run-on text and the `prompt` attribute vanishes
entirely. Students see a broken slide and have no idea why.

So whenever you add or rename a `<phil-*>` element in `shared/phil-core.js` — or
change how an existing one behaves, the way option shuffling did — bump the number
everywhere in one go:

```bash
# 5 -> 6, across all lessons and the homepage
grep -rl 'phil-core\.\(js\|css\)?v=' lessons/*/*/index.html index.html \
  | xargs sed -i 's/phil-core\.\(js\|css\)?v=[0-9]\+/phil-core.\1?v=6/g'
```

As a backstop, `phil-core.css` hides the children of any `<phil-*>` element that
never registered and — after a 3-second delay, so it never flashes during a
normal deferred-module load — shows a "hard-refresh this page" message in its
place. That turns a silent mess into a legible failure, but it is a safety net,
not a substitute for bumping the version.

## Answer keys: unambiguous, or they don't ship

A student must never be marked wrong for a defensible answer, or right for a
wrong one. A key that a careful student could argue with is a defect, however
right the author thinks it is.

**Writing rules**

- **Grade only what a slide teaches.** Every graded answer must follow from
  visible slide text. Content that appears only inside an interactive widget,
  or only in another question's feedback, is not taught: a student may never
  see it. Put it on a slide first.
- **Use the lesson's words for the categories.** If a column is called
  "Consciousness," some slide must call it that.
- **Columns must not overlap.** If a row could sit in two columns, rewrite the
  row or the columns. Say how two similar categories differ, on a slide, before
  grading the difference.
- **No hidden assumptions.** "Owed for a different reason than hats are"
  assumes hats are owed. Read each row for what it takes for granted.
- **No conditions left implicit.** If a law applies only in an emergency, the
  stem says there is an emergency.
- **True to the source, not just to the slide.** A key that is defensible from
  the lesson but misstates the philosopher is still wrong. Fix the slide too.
- **Prefer cases and paraphrase** to sentences copied from the slides, and
  **don't grade contested verdicts.** "Should Silver pay?" is a poll.
- **No named character in a row unless the name is the point.** A row naming a
  sailor in danger pulls toward the rule of rescue whatever else it says.

**Verification, before any lesson ships**

Review costs scale with the number of reviewers and rounds, not with lesson
length, so batch lessons and let the scripts catch what they can.

1. Run `node tools/validate-quizzes.mjs`. It catches missing `why` lines, bad
   keys, unused columns, and categories graded before any slide names them.
   That last one was the biggest source of round-one failures in the pilot.
   It also checks that every `review=` names a slide id before the question.
2. Run `node tools/student-view.mjs <topic/lesson> …` for a batch of about four
   lessons. It writes `temp/review/<lesson>.view.txt` (key-free, as a student
   sees it) and `<lesson>.keys.txt` (keys, `why` lines, review slides).
3. Give the views for the whole batch to **two blind reviewers**. They answer
   every row and flag any row where another answer is defensible.
4. Give the views, keys, and the lessons' accuracy notes from
   `phil_mates_outlines.md` to **one adversarial reviewer**. It tries to break
   each key against the lesson and the real sources, and searches the web only
   for claims the notes don't cover.
5. **Stop rule.** Fix every row where another answer is at least as good, and
   every key the adversary calls arguable or wrong. Then re-check **only the
   changed rows** with one fresh reviewer. Don't polish rows that came back
   "likely, weak alternative": in the pilot, a polish of that kind created a
   new defect.

The two pilot lessons ("The Ship's Chest" and "The Masquerade of Silverport")
went through this. The first round caught untaught categories, a key that
misstated Daniels, a missing emergency condition, and a statement that assumed
hats are owed. All of those looked fine to the author.

The first batch run (double effect, germline editing, Nell, the villain's
ledger) cost about 350k subagent tokens for four lessons, or about 90k each:
two blind reviewers (about 75k each), the adversary (130k), and one re-check
(65k). Every flag was a real one. The worst was a cloze whose category names
no slide had taught. When three reviewers independently rate the same row
"likely," treat it as a flag, not polish.

Batch 2 (four principles, patient autonomy, equipoise, the virtue of care) cost
about 405k, or about 100k a lesson. The adversary cost more here (165k)
because it also checked the new attributions on slides. Its one outright
factual failure was an outdated Declaration of Helsinki exception, on a slide
and in a checkset row. The same error sat in an explain line that no reviewer
saw, and it was found only by chance. The keys file now includes every
`explain=` and MCQ `feedback=`, so the adversary checks what students read
after they answer.

Batch 3 (trolley and triage, moral status, Kantian deontology, the harm
principle) cost about 400k, again about 100k a lesson. With explain text in
the keys, the adversary caught overstated claims in explain lines and in poll
feedback. Some came from misreading the lesson's own cited study, which is
worth checking whenever a lesson quotes percentages.

Batch 4 (virtue ethics, technomoral virtues, the internet's design,
utilitarianism) cost about 420k, about 105k a lesson. Typed blanks were the
most common failure: two blanks whose answers can swap order, a missing
British spelling, and the slide's own word left off the accept list. When a
cloze has typed blanks, list every form a careful student could write.

Batch 5 (Locke's proviso, Amberville, Frankenstein) cost about 415k for three
lessons. The adversary's web checks (about 170k) cost about the same as in a
four-lesson batch, so small batches cost more per lesson. That finished the
conversion: every lesson now has at most one MCQ, and every graded item has a
review slide and a permanent `data-qid`. Across the five batches, review cost
about 2.0M tokens for 19 lessons, roughly 105k each. Student views now mark
optional slides, so reviewers can tell which teaching some students skip.

## Quiz quality (auto-checked)

**Format mix.** Aim for 4–6 graded items per lesson, mostly classify, cloze,
and checkset items with 5–8 parts each. Keep at most one MCQ, for the single
distinction the lesson can't do without. An MCQ spends a slide on one judgment,
a guesser gets it a quarter of the time, and it is the format a chatbot answers
best. `validate-quizzes.mjs` lists lessons that still use more than one.

Multiple-choice questions leak answers if you're not careful. Three tells matter most:

1. **Similar lengths.** The correct answer should be about the same length as the
   distractors. A conspicuously longer (usually more qualified/detailed) or much
   shorter answer is a giveaway — students learn to pick the odd one out.
2. **Four options.** Three options is a 33% free guess. Every MCQ should offer four,
   and the fourth has to be a real misconception with feedback that names it, not
   filler.
3. **Varied position.** Across a lesson's MCQs, move the `correct` choice around
   (A / B / C…). Don't park it in the same slot every time. The engine now shuffles
   options at runtime, so this one no longer reaches students on its own — it still
   applies to any `keep-order` question, and the printed answer order is worth
   eyeballing while you write.

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
and flags uneven option lengths, a correct answer that's the longest/shortest,
questions with fewer than four options, and correct-answer positions that cluster.
Aim for an all-`✓` report.

The four-option rule arrived after most lessons were written, so the report
currently lists eleven lessons with three-option questions. That is a real backlog
rather than noise — work through it a lesson at a time.

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

### Measure before you ship

`check-density.mjs` estimates height from markup, which is fast and wrong about
widgets — it cannot see what a widget's CSS does. Add `--measure` to open the
real page in Chromium and read the real `scrollHeight` of every slide against a
1080p frame:

```bash
node tools/check-density.mjs              # fast estimate, for the writing loop
node tools/check-density.mjs --measure    # real heights, ~40s (needs playwright)
```

Run `--measure` after touching a widget or adding options to a question. The
four-principles balance slide sat at 1394px against a 910px frame for months
while the estimate reported a comfortable 805px.

A slide whose only widget is a `<phil-beliefs>` probe is exempt: a Likert grid
of five statements cannot fit a frame and was never meant to. Everything else
has to fit, including custom widgets — if a student has to scroll to find the
button that finishes the question, the slide failed.

### Widget text: use `phil-dense`

Setting `font-size` on your widget's own root **does not work**. `phil-slide p,
phil-slide li` in `phil-core.css` is more specific than inheritance, so every
paragraph and list item inside snaps back to the 23px slide-body size. Three
widgets shipped oversized this way before anyone noticed.

Put `phil-dense` on the host element instead:

```js
this.classList.add('cm', 'phil-dense');   // → clamp(16px, 1.5vw, 19px)
```

That is the same size as the belief probe, so it is already proven at projector
distance, and it stays above the 15px floor. Never go below that floor; the
reference sizes are in `lessons/bioethics/trolley-and-triage/assets/switchboard.js`.

Two columns help too: a list of five or six short switches fits a frame as
`grid-template-columns: repeat(auto-fit, minmax(400px, 1fr))` and does not as a
single stack.

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
node tools/a11y-audit.mjs                  # walks every slide of every lesson (minutes)
node tools/a11y-audit.mjs --strict         # exit 1 if any issues (for CI/hooks)
node tools/a11y-audit.mjs --quick          # index + one widget-rich lesson, walked (~30s)
node tools/a11y-audit.mjs --page lessons/<topic>/<lesson>/index.html   # just the one you're writing
```

`--quick` is the right loop for shell changes (`shared/phil-core.*`): every
lesson wears the same chrome, so one walked lesson catches a regression there.
Use `--page` while writing a lesson, and the full run before shipping it.

Full findings, method and limits: [docs/accessibility.md](docs/accessibility.md).

## Casting

A lesson with an all-male cast is not acceptable, and neither is art where
everyone is the same age and color. The rule covers the writing as much as the
pictures.

- **Named characters** vary in gender, age, and background. When a borrowed
  story has an all-male cast, recast it: Lestrade, Captain Smollett, and
  several of the sailors in "The Ship's Chest" are women.
- **Unnamed people** in examples and questions vary too. Don't default every
  patient, doctor, and bystander to "he."
- **Real people and quotations stay as they were.** Recast the story, never
  the historical record.
- **Art** follows the same rule. See "Vary the people in every prompt" below.

**Arguments belong to philosophers, not characters.** The cast is the setting,
and it supplies the cases: a lost leg, a fever, a vote. Credit every argument
by name to its philosopher or theory ("Daniels argues," "a utilitarian
counts"), never to a character ("Livesey's argument," "Smollett's ledger").
Don't put a character's portrait on a slide that teaches a theory; use the
thinker's card. Characters can still ask the question, live through the
case, and face the choice in a poll.

## Art & style

- Reference aesthetic: **16-bit console era**. Hand-authored SVGs preferred;
  PNGs from an image generator are fine for richer scenes.
- **Vary the people in every prompt.** Image models default to young, white,
  male figures unless told otherwise. So every panel that shows people names
  each figure's age, gender, and skin color, and every crowd is described as
  mixed: men and women, young and old, a range of skin tones. Invented and
  borrowed characters can be recast from their source; Watson, Lestrade, and
  Captain Smollett all were. Give each recurring character one fixed
  description and paste it word for word, or the model redraws them as
  someone else. Check the finished panels for this too, and re-roll any that
  came out all one kind.
- **Don't draw portraits of real (contemporary or historical) thinkers.** At
  pixel resolution a face can't carry a likeness — it just reads as "generic
  person," so the payoff of recognizing Mill or Kant never lands. Instead give
  each real thinker a **thinker card** (`<phil-thinker>`, below): name, dates,
  key work, and core claim in real text, with a generated **idea scene** on top
  that pictures their central move without a face (Searle: a locked door with
  slips coming under it). Generate the idea scenes in the lesson's sheets like
  any other panel.
- **Relic cards are retired everywhere.** Their emblems weren't explained on
  the slides and carried no name, so students couldn't read them. Every lesson
  now uses thinker cards with idea scenes. When a thinker returns later in a
  lesson, repeat the card with a claim that fits that slide.
- **Thinker cards go compact on phones:** a small image beside the name, so the
  card never crowds the slide's heading.
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
