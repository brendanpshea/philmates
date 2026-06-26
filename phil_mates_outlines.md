# PhilMates — Lesson Outlines

A running reference of every lesson we've built: its topic, learning goals,
narrative frame, and slide-by-slide structure (including which slides are
interactive). Use it to avoid duplication, reuse framing devices, and see how
content/quiz pacing has worked. Add a new section per lesson.

Legend: **[T]** teaching slide · **[Q]** graded interactive · **[V]** ungraded
interactive visualization · **[C]** `<phil-compare>` side-by-side comparison ·
**[P]** belief probe (`<phil-beliefs>` Likert, revisited at the end) · **[B]** branch ·
**[opt]** optional/branch-only slide · `reveal` = bullets shown one at a time.

**Engagement device (use in new lessons):** open with a 5-statement **belief probe**
(`<phil-beliefs>`, ungraded value statements) and revisit it at the end
(`<phil-beliefs-review>`). It earns attention by getting students on record up
front, then confronting them with their past selves — and doubles as an advance
organizer. First used in the bioethics lesson.

---

## Utilitarianism — "The Midnight Tribunal"

- **Path:** `lessons/ethical-theory/utilitarianism/`
- **Lesson id:** `util-history`
- **Topic:** Ethical theory (intro / normative ethics)
- **Approach:** Historical evolution of one idea (hedonism → classical
  utilitarianism → modern variants), wrapped in a story frame.
- **Narrative frame:** You impulsively bought a **$40 gold-leaf cake**, ate it all
  alone, shared none with three present friends, felt sick + guilty, and now
  dream of a **courtroom tribunal** where three philosophers judge one question:
  *did that cake actually make your life better?* Each judge = one stage in the
  idea's evolution. The cake/sharing scenario is the running example every
  thinker re-analyzes.
- **Thinkers covered:** Epicurus, Jeremy Bentham, John Stuart Mill (optional),
  Peter Singer.
- **Art (16-bit SVGs in `/assets`):** `cake`, `scales`, `epicurus`, `bentham`,
  `mill`, `singer`. Image-gen prompts for richer raster versions in `prompts.md`.

### Learning goals
- Define **hedonism** and distinguish Epicurus' tranquility (*ataraxia*) and his
  three kinds of desire from crude indulgence.
- State Bentham's **Principle of Utility** ("greatest happiness for the greatest
  number"), the **hedonic calculus** dimensions, and how *extent* + diminishing
  marginal utility favor sharing.
- (Optional) Explain Mill's **higher vs. lower pleasures** quality distinction.
- Summarize Singer's **preference utilitarianism**, the critique of
  **speciesism**, the drowning-child argument, and **effective altruism** as
  guidance on what to eat and how to spend.
- Track how the *measure of the good* shifts (pleasure → aggregate happiness →
  satisfied preferences) while the core commitment (maximize well-being, count
  everyone equally) stays constant.

### Slide-by-slide

**Act 0 — Setup**
1. **[T]** Title / hook — "The Midnight Tribunal" (cake art).
2. **[T]** "What You Did" — the crime, `reveal` bullets establishing the scenario.
3. **[T]** "The Dream" — courtroom + scales; frames utilitarianism's core question.

**Act 1 — Epicurus (why indulgence isn't happiness)**
4. **[T]** First judge enters — hedonism: pleasure as the only intrinsic good.
5. **[T]** Three kinds of desire (natural+necessary / natural+unnecessary /
   vain+empty), `reveal`.
6. **[T]** *Ataraxia* + friendship; cake = net pain, eaten alone, `reveal`.
7. **[Q · MCQ]** Deepest problem with the cake (chased vain pleasure, skipped
   friendship).
8. **[Q · Cloze]** hedonist / pleasure / *ataraxia* (dropdown).

**Bridge → Act 2 — Bentham (why sharing was better)**
9. **[C]** *Whose Pleasure Counts?* — **Egoistic Hedonism** (only my pleasure) vs
   **Hedonistic Utilitarianism** (everyone's pleasure counts). Pivots the story
   from Epicurus' individual focus to "everyone counts."
10. **[T]** Second judge — Principle of Utility, everyone counts equally.
11. **[T]** Hedonic calculus dimensions, `reveal`.
12. **[T]** Extent + diminishing returns → sharing maximizes total utility, `reveal`.
13. **[V]** "See It Yourself" — `<phil-cake-utility>` interactive viz: divide 12
    bites among 4 people via –/+ steppers; live happiness bars per person + total
    bar, a shrinking "next bite: +x" marginal readout, and "All to You" /
    "Spread evenly" presets. Demonstrates diminishing marginal utility and why the
    optimum total comes from spreading the cake. (Defined in
    `diminishing-utility.js`; concave utility = base·(1−rate^b)/(1−rate).)
14. **[Q · Checkset]** Which factors belong to the hedonic calculus (distractors:
    virtue of the person, priest's approval).
15. **[Q · MCQ]** Why sharing maximizes total happiness.
16. **[C]** *Judge the Act, or the Rule?* — **Act** (judge each action's own
    consequences) vs **Rule** (follow rules that generally maximize happiness).

**Optional detour — Mill**
17. **[B]** "A Voice From the Gallery" — branch: hear Mill or skip.
17b. **[opt][T]** Mill: higher vs. lower pleasures; cake as a "lower" pleasure;
    "Socrates dissatisfied," `reveal`.

**Act 3 — Singer (what to eat, how to spend)**
18. **[T]** Third judge — preference utilitarianism + equal consideration.
19. **[C]** *Pleasure, or What's Wanted?* — **Hedonistic** (good = pleasure) vs
    **Preference** (good = satisfied preferences) utilitarianism.
20. **[T]** Lesson One: what you eat — speciesism, animal suffering, plant-based, `reveal`.
21. **[T]** Lesson Two: the $40 — drowning child, effective charity, effective
    altruism, `reveal`.
22. **[C]** *The Most Good, or Enough?* — **Maximizing** (always produce the most
    good; very demanding) vs **Satisficing** (produce enough; answers the
    demandingness worry raised by the $40).
23. **[Q · Checkset]** Claims Singer endorses (distractors: only humans count;
    effectiveness doesn't matter).
24. **[Q · Cloze]** Synthesis across all three judges (pleasure / happiness /
    number / animals).

**Wake up**
25. **[T]** "You Wake Up" — recap of the three lessons, `reveal`.

### Counts
~25 main slides (+1 optional). **6 graded interactions** (2 MCQ, 2 checkset,
2 cloze) + **1 interactive visualization** + **4 comparison slides** ≈ 30%
interactive/graded, ~44% interactive overall. Branch used once for genuinely
optional Mill content.

### Varieties-of-utilitarianism comparisons (where each lives)
- **Egoistic Hedonism vs Hedonistic Utilitarianism** — slide 9 (bridge into Bentham).
- **Act vs Rule** — slide 16 (after the sharing argument).
- **Preference vs Hedonistic** — slide 19 (Singer's act).
- **Maximizing vs Satisficing** — slide 22 (after the $40 demandingness).

### Reusable devices worth repeating
- **Single running example** ("the cake") that each thinker re-interprets — keeps a
  historical survey concrete and connected.
- **"Judge/tribunal" frame** generalizes well to any "compare several positions on
  one case" lesson (e.g., a trolley case judged by Kant / Mill / Aristotle).
- **2–3 teaching slides per quiz**, building vocabulary before testing it.
- **Lesson-local interactive viz** as its own ES-module custom element
  (`<phil-cake-utility>`): "manipulate inputs → watch individual + aggregate
  outcomes" is a reusable pattern for any consequentialist/economics idea
  (marginal utility, the repugnant conclusion, fairness vs. total welfare).
- **`<phil-compare>` comparison cards** (shared component) for any "X vs Y"
  distinction, each grounded in the same running example (the cake). Reuse for
  taxonomies of a view; a third `<phil-side>` handles three-way contrasts.

---

## Kantian Deontology — "The Cat at the Door"  *(built)*

- **Path:** `lessons/ethical-theory/kantian-deontology/`
- **Lesson id:** `kant-cat-door` (proposed)
- **Topic:** Ethical theory (normative ethics) — companion to the utilitarianism lesson.
- **Approach:** Build Kant's machinery on one running case, then watch modern
  Kantians re-litigate it. Same devices: story frame, `reveal` bullets,
  `<phil-compare>` cards, an interactive viz, graded checks.
- **Narrative frame — Tom & Jerry's "murderer at the door":** *You are a mouse.*
  A cat raps on your door and asks, sweetly, **"Where are the other mice hiding?"**
  Tell the truth and your friends get eaten. Do you lie? In this cartoon world the
  mouse and cat both talk and reason, so we treat them as rational agents — which
  lets us run Kant's argument on you directly, and sets up the real-world twist
  about *who counts* later.
- **Thinkers:** Immanuel Kant; then Christine Korsgaard and Onora O'Neill.

### Accuracy note (real, not invented)
This is Kant's actual signature case. In **"On a Supposed Right to Lie from
Philanthropy" (1797)**, replying to **Benjamin Constant**, Kant argues you may
*not* lie even to a would-be murderer — truthfulness is an unconditional duty. The
lecture honors this genuine (and genuinely controversial) result, then shows the
modern responses. Use canonical *Groundwork* formulations as Kant's own wording;
attribute modern positions only to works that really hold them (see Sources).

### Learning goals
- Distinguish a **categorical** from a **hypothetical** imperative, and acting
  **from duty** from merely acting in accordance with it.
- State and apply the three main **formulations** (Universal Law, Humanity,
  Kingdom of Ends).
- Run a **universalizability test**; tell a *contradiction in conception* (perfect
  duty) from a *contradiction in the will* (imperfect duty).
- Explain Kant's restriction of standing to **rational beings/persons** and his
  **indirect-duty** view of animals — and why it's contested.
- Reconstruct Kant's hard line on lying to the murderer, and contrast
  **Korsgaard's** and **O'Neill's** modern reinterpretations.

### Slide-by-slide

**Act 0 — The knock**
1. **[T]** Title — "The Cat at the Door" (cat looming at a mouse-hole door).
2. **[T]** Setup — the cat's question, friends' lives at stake, `reveal`. "A
   utilitarian mouse would just calculate; tonight you meet a philosopher who says
   the math is beside the point."

**Act 1 — Foundations**
3. **[T]** The **good will**; morality is acting from **duty**, not results/inclination.
4. **[C]** Acting **from duty** vs **from inclination**.
5. **[T]** **Maxims** — the principle behind the act, `reveal`.
6. **[C]** **Hypothetical vs Categorical** imperative.
7. **[Q · MCQ]** Which statement is a categorical imperative? (distractors: prudential/hypothetical).

**Act 2 — The three formulations**
8. **[T]** F1 **Formula of Universal Law** (Kant's wording, Groundwork).
9. **[V]** **"The Universalizer"** (`<phil-maxim-tester>`) — pick a maxim; the
   machine imagines everyone doing it and shows whether it self-destructs
   (contradiction in conception). Manipulate input → see result.
10. **[T]** Apply to the cat: universalized "lie when convenient" undermines
    truth-telling → impermissible on Kant's test, `reveal`.
11. **[C]** Contradiction in **conception** vs in the **will** → **perfect** vs
    **imperfect** duties.
12. **[Q · Cloze]** Formula of Universal Law + perfect/imperfect.
13. **[T]** F2 **Formula of Humanity** — never treat rational agency as a *mere
    means*; deception bypasses it, `reveal`.
14. **[Q · MCQ]** Why lying violates the Formula of Humanity.
15. **[T]** F3 **Kingdom of Ends / Autonomy** — co-legislator of universal law, `reveal`.
16. **[Q · Checkset]** Match each formulation to its core idea (distractor:
    "maximize total happiness," contrasting the prior lesson).

**Act 3 — Who counts?**
17. **[T]** Ends in themselves = **rational beings (persons)**; dignity vs price, `reveal`.
18. **[T]** **Animals** — only **indirect** duties (Lectures on Ethics): cruelty
    corrodes our humanity. Twist: by Kant's real standard a literal mouse wouldn't
    count — only our reasoning cartoon mouse does.
19. **[Q · MCQ]** On Kant's view, why is harming a (real) animal wrong? (answer:
    indirect duty; distractors: it's an end in itself / lowers total happiness).

**Act 4 — Kant's hard line**
20. **[T]** **"On a Supposed Right to Lie" (1797)** — Constant's challenge; Kant's
    reply; you answer for your *lie*, not another's wrongdoing, `reveal`.
21. **[Q · MCQ]** What does Kant himself conclude about lying to the cat? (answer:
    still impermissible — surface the controversial result honestly).

**Act 5 — Modern Kantians answer back**
22. **[T]** Keep the framework, reach a more humane verdict, `reveal`.
23. **[C]** Orthodox Kant vs **Korsgaard** — "The Right to Lie: Kant on Dealing
    with Evil" (1986): ideal vs **dealing with evil/coercion**; the Universal Law
    test, applied to the coercive situation, can *permit* lying to the murderer.
24. **[T]** **O'Neill** — constructivist reading on the Formula of Humanity: the
    core wrongs are **deception and coercion** (they make shared/consented
    principles impossible); genuine principles are ones all could adopt. Students
    apply "could they consent?" to cat and hidden mice, `reveal`. *(Present her
    framework, not a sourced verdict on the murderer case.)*
25. **[C]** Kant on animals vs **Korsgaard's** *Fellow Creatures* (2018): animals
    **are** ends in themselves; **direct** duties. Reopens "who counts," ties the
    cartoon back to reality.
26. **[Q · Checkset]** Which moves are genuinely Kantian reinterpretations vs which
    smuggle in utilitarian reasoning (reinforces the contrast with Lesson 1).

**Wake up / decide**
27. **[T]** The mouse decides — recap + the live modern debate; no tidy bow, `reveal`.

### Comparisons (where each `<phil-compare>` lives)
From duty vs from inclination (4) · Hypothetical vs Categorical (6) · Contradiction
in conception vs in will → perfect vs imperfect (11) · Orthodox Kant vs Korsgaard
on lying (23) · Kant vs Korsgaard on animals (25).

### New interactive viz to build
**`<phil-maxim-tester>` ("The Universalizer")** — author supplies maxims tagged by
failure mode (contradiction in conception / in will / passes). Student selects one;
widget "universalizes" it and animates the breakdown. Ungraded, like the cake viz;
reusable for any FUL teaching.

### Art assets (16-bit SVGs)
`cat-at-door`, `mouse`, `kant`, `korsgaard`, `oneill` (latter two stylized +
labeled), `crown`/`gavel` (Kingdom of Ends), `gear-machine` (Universalizer); plus
`prompts.md`.

### Sources to cite (so nothing is invented)
- Kant, *Groundwork of the Metaphysics of Morals* (the three formulations).
- Kant, *On a Supposed Right to Lie from Philanthropy* (1797); Constant's challenge.
- Kant, *Lectures on Ethics* (indirect duties to animals).
- Korsgaard, "The Right to Lie: Kant on Dealing with Evil" (1986); *Fellow
  Creatures* (2018).
- O'Neill, *Acting on Principle* (1975); *Constructions of Reason* (1989);
  *Towards Justice and Virtue* (1996).

### Counts (target)
~27 slides. ~9 interactive (3 MCQ, 1 cloze, 2 checkset, 1 viz, plus comparisons),
≈ our 40% interactivity. Optional branch not yet planned (candidate: a perfect-vs-
imperfect-duty deep dive).

### Open decisions before building
- **O'Neill's verdict on the murderer case:** present framework only unless we find
  a citable stance.
- **Korsgaard does double duty** (lying *and* animals), deliberately reuniting the
  two lessons' "who counts" thread.
- Build the `<phil-maxim-tester>` viz in v1, or stub the slide first?

---

## Bioethics: The Four Principles — "Rounds with Van Helsing"  *(built)*

- **Path:** `lessons/bioethics/four-principles/`  (new topic folder → new catalog section)
- **Lesson id:** `bioethics-four-principles` (proposed)
- **Topic:** Bioethics (intro / principlism). First lesson in a new course strand.
- **Approach:** Teach Beauchamp & Childress's principlism as a *method of reasoning*
  (not a rulebook), using monstrous patients as vivid, low-stakes stand-ins for
  real clinical dilemmas. Same devices: story frame, `reveal` bullets,
  `<phil-compare>` cards, an interactive viz, graded checks.
- **Narrative frame — Transylvania:** You are a young doctor apprenticed to
  **Doctor Van Helsing**, who runs a clinic for the region's monstrous residents.
  Across one night of "rounds," he teaches you to reason through cases involving a
  vampire Count, a werewolf, a newly-risen revenant, and Frankenstein's Creature.
- **Recurring "patients":** the Count (vampire), the werewolf, the revenant
  (newly-risen, capacity questions), Frankenstein's Creature, and the villagers —
  plus a scarce supply of **synthetic blood** as the running resource.

### Accuracy note (real, not invented)
Principlism is **Beauchamp & Childress, *Principles of Biomedical Ethics***. Keep
faithful: four co-equal, **prima facie** principles (prima facie = W. D. Ross);
**specification** = Henry Richardson; **balancing** + the **conditions for
justified infringement** are B&C's; **moral residue/remainder** traces to Bernard
Williams, and clinician **moral distress** to Andrew Jameton. Don't invent
conditions or quotations. Monsters are the *examples*; the framework is real.

### Learning goals
- Say what the **common morality** is and why bioethics must **specify/extend** it.
- Name and apply the **four principles** — respect for **autonomy**,
  **nonmaleficence**, **beneficence**, **justice** — and explain that they are
  **co-equal and prima facie** (no fixed hierarchy).
- Explain and perform **specification** (make an abstract principle concrete).
- Explain **weighing/balancing** and the **conditions for justified infringement**.
- Work paradigmatic **conflicts** (paternalism; confidentiality vs duty to warn;
  capacity & surrogate consent; triage/justice; end-of-life autonomy).
- Define **moral residue** and the residual duties a justified override leaves.

### Slide-by-slide

**Act 0 — Arrival**
1. **[T]** Title — "Rounds with Van Helsing" (art: Van Helsing / castle clinic).
2. **[T]** The apprenticeship — the clinic treats Transylvania's monsters; tonight
   you learn to *reason*, not memorize, `reveal`.

**Act 1 — Common morality**
3. **[T]** What common morality is — norms all morally serious people share (don't
   kill, don't cause suffering, keep promises, be fair), `reveal`.
4. **[T]** Why medicine needs more — power asymmetry, vulnerability, special
   professional roles; bioethics **specifies and extends** common morality, `reveal`.
5. **[C]** Common morality (shared, universal, general) vs Bioethical principles
   (specified for the clinic).
6. **[Q · MCQ]** What "common morality" is / why it must be extended.

**Act 2 — The four principles**
7. **[T]** Meet the four — autonomy, nonmaleficence, beneficence, justice; **all
   equal, none ranked**, `reveal`.
8. **[T]** Respect for **autonomy** — informed, competent choices. Ex: the Count
   refuses a proposed therapy, `reveal`.
9. **[T]** **Nonmaleficence** — *primum non nocere*; do no harm. Ex: never dose a
   werewolf with silver, `reveal`.
10. **[T]** **Beneficence** — actively benefit; balance benefits against risks. Ex:
    synthetic blood both helps the Count and protects others, `reveal`.
11. **[T]** **Justice** — fair distribution of benefits and burdens. Ex: scarce
    synthetic blood among monsters and villagers, `reveal`.
12. **[T]** **Prima facie** (Ross) — each binds *unless* outweighed by another in a
    conflict; no standing hierarchy, `reveal`.
13. **[Q · Checkset]** Pick the four principles (distractors: maximize utility, the
    categorical imperative, the golden mean — callbacks to Lessons 1–2).
14. **[Q · MCQ]** What "prima facie" means.

**Act 3 — Specification**
15. **[T]** Principles are abstract — "respect autonomy" doesn't tell you what to do
    at 2 a.m. with a thrashing werewolf, `reveal`.
16. **[T]** **Specification** (Richardson) — narrow a principle to the context to
    guide action and pre-empt conflicts; worked example specifying consent for
    wolfsbane, `reveal`.
17. **[C]** Specification (make a principle concrete) vs Balancing (weigh competing
    principles) — two different operations.
18. **[Q · Cloze]** Specification turns an *abstract* norm into a *specified* one
    (Richardson).

**Act 4 — Weighing & balancing**
19. **[T]** When specified principles still collide, you must **weigh and balance** —
    judgment, not a formula, `reveal`.
20. **[T]** **Conditions for justified infringement** (B&C): good reason; realistic
    prospect; necessity (no preferable alternative); least infringement; minimize
    negative effects; act impartially, `reveal`.
21. **[V]** **"The Scales of Van Helsing"** (`<phil-balance>`) — pick a case, see
    the two principles in tension, toggle the justification conditions as met/unmet,
    and watch whether overriding is justified — plus the **residue** it leaves.
    Ungraded; ties Acts 4–6 together.
22. **[Q · Checkset]** Which are genuine B&C conditions for justified infringement
    (distractors: "the majority approves," "it maximizes total happiness").

**Act 5 — Paradigmatic conflicts (core debates, monstrous examples)**
23. **[C]** **Paternalism** — Autonomy vs Beneficence/Nonmaleficence: the werewolf
    refuses to be chained at the full moon.
24. **[C]** **Confidentiality vs Duty to Warn** — the Count confides he means to
    feed on a named villager (the *Tarasoff* problem).
25. **[T]** More fault lines — **capacity & surrogate consent** (the newly-risen
    revenant), **triage/justice** (scarce synthetic blood), **end-of-life autonomy**
    (a 400-year-old's request for "final death"), `reveal`.
26. **[Q · MCQ]** A case: which two principles conflict, and the soundest first move
    (specify; seek the least-infringing option).

**Act 6 — Moral residue**
27. **[T]** **Moral residue** — even a *justified* override leaves a remainder:
    regret, and residual duties (disclose, apologize, follow up, make amends); link
    to clinician **moral distress**, `reveal`.
28. **[C]** Justified infringement (you acted rightly) vs Moral residue (something is
    still owed) — the two coexist.
29. **[Q · MCQ]** What moral residue is and what it asks of you.

**Graduation**
30. **[T]** Van Helsing's parting lesson — principlism is a disciplined way to
    *reason*, not a rulebook; recap of the night, `reveal`.

### Comparisons (where each `<phil-compare>` lives)
Common morality vs bioethical principles (5) · Specification vs Balancing (17) ·
Paternalism: Autonomy vs Beneficence (23) · Confidentiality vs Duty to Warn (24) ·
Justified infringement vs Moral residue (28).

### New interactive viz to build
**`<phil-balance>` ("The Scales of Van Helsing")** — author supplies a case naming
two conflicting principles plus the B&C justification conditions; the student
toggles each condition met/unmet; when the bar of conditions is satisfied the
override reads as **justified**, and the overridden principle's **residue** (the
duty still owed) is surfaced. Reusable for any conflict-of-duties case. Ungraded.

### Art assets (16-bit SVGs)
`van-helsing`, `vampire` (the Count), `werewolf`, `creature` (Frankenstein's),
`scales` (medical balance), `blood-vial` (synthetic blood); optional
`castle-clinic`; plus `prompts.md`.

### Sources to cite (so nothing is invented)
- Beauchamp & Childress, *Principles of Biomedical Ethics* (the four principles,
  common morality, specification, balancing, conditions for justified infringement,
  moral residue).
- W. D. Ross, *The Right and the Good* (prima facie duties).
- Henry Richardson, "Specifying Norms as a Way to Resolve Concrete Ethical
  Problems" (1990).
- *Tarasoff v. Regents of the University of California* (1976) — duty to warn.
- Andrew Jameton, *Nursing Practice: The Ethical Issues* (1984) — "moral distress";
  Bernard Williams on moral remainder/regret.

### Counts (target)
~30 slides. ~7 graded (3 MCQ, 2 checkset, 1 cloze, +1 case MCQ) + 1 viz + 5
comparisons ≈ 40% interactive. Remember to **vary correct-answer positions and
balance option lengths** — run `node tools/validate-quizzes.mjs` before commit.

### Open decisions before building
- **Scope of debates in Act 5:** four fault lines are a lot — keep two as full
  `<phil-compare>` slides (paternalism, duty-to-warn) and the rest as one survey
  slide (as outlined), or expand one into an optional `<phil-branch>` deep dive?
- **`<phil-balance>` viz** in v1, or stub the slide and add the viz second?
- New **`bioethics`** topic folder means the homepage will show a second topic
  section (the catalog already groups by folder — no code needed).
