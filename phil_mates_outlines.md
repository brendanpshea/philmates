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

---

## Bioethics: Patient Autonomy — "House Calls in the Hedgerow"  *(built)*

- **Path:** `lessons/bioethics/patient-autonomy/`
- **Lesson id:** `bioethics-autonomy` (proposed)
- **Subject (catalog):** `Patient Autonomy`
- **Topic:** Bioethics (second lesson in the strand).
- **Approach:** Two practical skills — (1) what makes consent genuinely *informed*,
  and (2) Emanuel & Emanuel's four models of the clinical relationship — taught
  through a country doctor's caseload. Same devices: story frame, `reveal`,
  `<phil-compare>`, an interactive viz, the belief probe, graded checks.
- **Narrative frame — the world of Peter Rabbit (wry, slightly grown-up):** You are
  the new village doctor among talking animals. Your patients make their own
  (often questionable) choices, and your job is to support those choices well —
  not just to be right.
- **Recurring patients:** **Peter Rabbit** (reckless garden-raider — the running
  case for the four models), **Jemima Puddle-Duck** (naive, manipulated by the
  "gentleman with sandy whiskers" — voluntariness), **Squirrel Nutkin** (impulsive,
  can't appreciate consequences — capacity), **Mrs. Tiggy-Winkle** (sensible, just
  wants the facts — the informative-model patient).

### Accuracy note (real, not invented)
- Informed-consent elements follow **Faden & Beauchamp** / **Beauchamp & Childress**:
  capacity, disclosure, understanding, voluntariness, authorization.
- Capacity abilities (understand, appreciate, reason, communicate) per
  **Appelbaum & Grisso**.
- Disclosure standards (reasonable-physician vs reasonable-patient) — *Canterbury
  v. Spence* (1972).
- The four models are **Emanuel & Emanuel, "Four Models of the Physician-Patient
  Relationship," JAMA 1992.** They argue the **deliberative** model is the
  preferable ideal (paternalism justified mainly in emergencies; the informative
  model too thin) — present that faithfully, with their caveats. Animals are the
  examples; the frameworks are real.

### Learning goals
- List the **requirements of informed consent** and explain why each matters.
- Distinguish **persuasion** (legitimate) from **manipulation/coercion** (which
  void voluntariness); name the **disclosure standards**.
- Assess **decision-making capacity** as decision-specific (the four abilities).
- Describe **Emanuel's four models** (paternalistic, informative, interpretive,
  deliberative), the physician role and conception of **autonomy** in each, and
  why the Emanuels defend the deliberative model.

### Slide-by-slide

**Act 0 — The new doctor**
1. **[T]** Title — "House Calls in the Hedgerow" (art: doctor's bag / village clinic).
2. **[T]** Setup — talking-animal patients who make their own choices; tonight's two
   skills: real consent, and how to relate to patients, `reveal`.
3. **[P]** Belief probe (start) — 5 autonomy statements (see below).

**Act 1 — Informed consent**
4. **[T]** Why consent matters — it's what makes treatment *the patient's*, not done
   *to* them, `reveal`.
5. **[T]** Requirement — **Capacity** (decision-specific: understand, appreciate,
   reason, communicate). Ex: Squirrel Nutkin can't appreciate consequences, `reveal`.
6. **[T]** Requirement — **Disclosure** (diagnosis, proposed treatment, risks,
   benefits, alternatives, and doing nothing). Ex: Peter's tummy-ache, `reveal`.
7. **[C]** Disclosure standards — **Reasonable-physician** vs **Reasonable-patient**
   (*Canterbury v. Spence*).
8. **[T]** Requirement — **Understanding** (told ≠ grasped; use teach-back), `reveal`.
9. **[T]** Requirement — **Voluntariness** (free of coercion/manipulation/undue
   influence). Ex: the sandy-whiskered fox "consenting" Jemima into his oven, `reveal`.
10. **[C]** **Persuasion vs Manipulation/Coercion** (legitimate vs illegitimate influence).
11. **[T]** Requirement — **Authorization** (consent is an *act*: the patient actually
   agrees to the plan), `reveal`.
12. **[V]** **"The Consent-o-Meter"** — toggle the five requirements for a case;
   consent reads *valid* only when all are present, and each missing one names the
   defect ("understanding off → not *informed*"; "voluntariness off → not *free*").
   (New viz; generalizes the all-elements-required pattern.)
13. **[Q · Checkset]** Which are required elements of informed consent (distractors:
   "the doctor approves the choice," "the family agrees").
14. **[Q · MCQ]** Capacity case (Nutkin) — what element is missing.
15. **[Q · MCQ]** Voluntariness case (Jemima) — manipulation voids consent.
16. **[T]** When consent rules bend — emergencies, waiver, incapacity → surrogate, `reveal`.

**Act 2 — Emanuel's four models**
17. **[T]** Beyond consent: *how* should doctor and patient relate? Intro the four
   models (Emanuel & Emanuel, 1992), `reveal`.
18. **[T]** **Paternalistic** — physician as guardian; decides what's best, patient
   assents. Autonomy = assent to objective goods, `reveal`.
19. **[T]** **Informative** — physician as technician; gives facts, patient chooses.
   Autonomy = control/choice. Ex: Mrs. Tiggy-Winkle wants just the facts, `reveal`.
20. **[C]** **Paternalistic vs Informative** (the two extremes).
21. **[T]** **Interpretive** — physician as counselor; helps the patient clarify and
   articulate values, then choose accordingly. Autonomy = self-understanding, `reveal`.
22. **[T]** **Deliberative** — physician as teacher/friend; engages the patient about
   which health values are worth pursuing; persuades (never coerces). Autonomy =
   moral self-development, `reveal`.
23. **[C]** **Interpretive vs Deliberative** (clarify values you have vs develop the
   values worth having).
24. **[T]** One case, four doctors — Peter's reckless garden-raiding seen through each
   model (a single running case), `reveal`.
25. **[Q · MCQ]** Match a doctor's line to its model.
26. **[Q · Checkset]** True claims about how the models conceive the physician's role
   / patient autonomy (distractors mix the models up).
27. **[T]** The Emanuels' verdict — they defend the **deliberative** model as the
   ideal (teacher/friend), with paternalism reserved for emergencies and the
   informative model judged too thin, `reveal`.
28. **[Q · MCQ]** Which model do the Emanuels defend as the ideal, and why.

**Act 3 — Rounds end**
29. **[P]** Belief probe (revisit) — has the day changed your view?
30. **[T]** Recap — consent requirements + four models + autonomy as *more than
   non-interference*, `reveal`.

### Belief-probe statements (start; revisited at end)
1. A doctor should give the facts and then step back and let the patient choose.
2. If a patient is making a clearly bad choice, a good doctor should talk them out of it.
3. A patient can give valid consent even without really understanding the risks.
4. Pressuring a patient "for their own good" is sometimes acceptable.
5. Part of a doctor's job is helping patients work out what they truly value.

### Comparisons (where each `<phil-compare>` lives)
Reasonable-physician vs reasonable-patient (7) · Persuasion vs manipulation (10) ·
Paternalistic vs informative (20) · Interpretive vs deliberative (23).

### New interactive viz to build
**`<phil-consent>` ("The Consent-o-Meter")** — five toggles (capacity, disclosure,
understanding, voluntariness, authorization); a validity verdict that's positive
only when all are on; each off-toggle names the specific defect. Ungraded; a clean
generalization of the "all elements required" idea (sibling to `<phil-balance>`).

### Art assets (16-bit SVGs)
`doctor-bag` (or village clinic), `peter-rabbit`, `jemima-duck`, `squirrel`,
`hedgehog` (Tiggy-Winkle), `fox` (the sandy-whiskered gentleman); plus `prompts.md`.

### Sources to cite (so nothing is invented)
- Faden & Beauchamp, *A History and Theory of Informed Consent* (1986); Beauchamp
  & Childress, *Principles of Biomedical Ethics* (consent elements).
- Appelbaum & Grisso, "Assessing Patients' Capacities to Consent to Treatment"
  (NEJM, 1988).
- *Canterbury v. Spence* (1972) — reasonable-patient disclosure standard.
- Emanuel & Emanuel, "Four Models of the Physician-Patient Relationship" (JAMA, 1992).

### Counts (target)
~30 slides. Belief probe (start+revisit) + ~7 graded (3 MCQ, 2 checkset, +case MCQ,
+ a capacity/voluntariness MCQ) + 1 viz + 4 comparisons ≈ 45% interactive.

### Open decisions before building
- **`<phil-consent>` viz** in v1, or reuse/generalize `<phil-balance>` instead?
- **Peter-across-four-models (slide 24):** keep as one teaching slide, or make it an
  interactive "pick the model" selector viz?
- Tone calibration: "slightly grown-up Peter Rabbit" — confirm how wry you want it
  (e.g., the fox slide plays the manipulation for dark comedy).

---

## Aristotelian Virtue Ethics — "The Labors of Arête"

- **Path:** `lessons/ethical-theory/virtue-ethics/`
- **Lesson id:** `aristotle-virtue` (proposed)
- **Subject (catalog):** `Virtue Ethics`
- **Topic:** Ethical theory (normative ethics) — companion to the utilitarianism
  and deontology lessons; completes the "big three" frameworks.
- **Approach:** Build Aristotle's virtue-ethical framework through his key concepts
  (eudaimonia, the doctrine of the mean, habituation, the polis) and show modern
  variants. Same devices: story frame, `reveal` bullets, `<phil-compare>` cards,
  an interactive viz, the belief probe, graded checks.
- **Narrative frame — a training camp on Mount Olympus, Percy Jackson style:**
  You've been summoned by **Athena, goddess of wisdom**, to a mythic training ground
  where Greek heroes and anti-heroes serve as living case studies. She's not teaching
  you to fight — she's teaching you to *live well*. Each hero's story illustrates a
  virtue, a vice, or the precarious balance between them. The tone is witty, direct,
  and slightly irreverent — Athena is an impatient mentor who expects you to *think*,
  not just listen. Think "divine philosophy professor who has seen every mortal
  mistake twice."
- **Recurring characters (from Greek myth):**
  - **Athena** — the instructor / guide. Wise, dry, occasionally exasperated.
  - **Odysseus** — the exemplar of *phronesis* (practical wisdom); cunning but also
    capable of excess (pride, deception).
  - **Achilles** — courage taken to reckless extremes; honors *thumos* (spiritedness)
    but struggles with wrath.
  - **Medea** — passion unchecked by reason; brilliant but consumed by revenge.
  - **Penelope** — steadfast temperance, loyalty, practical intelligence.
  - **Icarus** — the iconic failure of the mean: recklessness vs cowardice, and the
    price of not listening to wise counsel.
  - **Prometheus** — justice and beneficence toward humanity, at enormous personal
    cost; raises the question of virtue vs. self-sacrifice.

### Accuracy note (real, not invented)
Core concepts follow Aristotle's **Nicomachean Ethics** (NE): eudaimonia (NE I),
the doctrine of the mean (NE II), habituation and moral education (NE II–III),
phronesis / practical wisdom (NE VI), friendship (NE VIII–IX), and the connection
between personal virtue and the polis (NE X + *Politics* I, III). Modern variants:
**Alasdair MacIntyre** (*After Virtue*, 1981 — virtue within practices/traditions),
**Philippa Foot** (*Natural Goodness*, 2001 — neo-naturalism),
**Rosalind Hursthouse** (*On Virtue Ethics*, 1999 — action guidance via the
virtuous agent). Greek myths are illustrative framing, not Aristotle's own examples
(he uses Homer, but sparingly). Don't attribute specific claims to Aristotle unless
they track the NE.

### Learning goals
- Situate Aristotle in context: student of Plato, tutor of Alexander, empiricist
  temperament, and why his ethics starts from *how people actually live*.
- Define **eudaimonia** (flourishing / living well and doing well) as the highest
  good, and distinguish it from mere pleasure or wealth.
- State the **doctrine of the mean** — virtue as a disposition (*hexis*) lying
  between two vices (excess and deficiency), determined relative to the individual
  and situation by practical wisdom (*phronesis*).
- Explain how virtue is **acquired through habituation** (*ethismos*), not just
  taught as theory; and the role of **phronesis** (practical wisdom) in perceiving
  the right action in particular circumstances.
- Describe the link between **individual virtue and a well-governed polis** —
  Aristotle's claim that human beings are *political animals* (*zoon politikon*)
  and that virtue requires a community context.
- Outline three **modern variants** of virtue ethics (MacIntyre, Foot, Hursthouse)
  and how each updates or defends Aristotle's core project.

### Slide-by-slide

**Act 0 — The summons**
1. **[T]** Title — "The Labors of Arête" (art: Athena / Olympian training
   ground). "Arête" = excellence/virtue in Greek; the title puns on the mythic
   "labors" tradition.
2. **[T]** Setup — Athena appears: "Forget the monsters. Today's labor is harder:
   learning to live well." She'll use the heroes you already know — but not the
   way you expect, `reveal`.
3. **[P]** Belief probe (start) — 5 virtue-ethics statements (see below).

**Act 1 — Who is this Aristotle? (background & context)**
4. **[T]** Aristotle the person — student of Plato at the Academy, but broke with
   Plato's Forms; tutor of Alexander the Great; founder of the Lyceum; an
   empiricist who studied everything from biology to constitutions, `reveal`.
5. **[C]** **Plato vs Aristotle** — the Good is a transcendent Form (Plato) vs
   the good is *how you actually live* (Aristotle). "He was my father's student,"
   Athena notes. "But he thought Dad was too abstract."
6. **[Q · MCQ]** What distinguishes Aristotle's ethical approach from Plato's?
   (answer: starts from how people actually live; distractors: rejects virtue
   entirely / argues morality is relative / says knowledge alone makes you good).

**Act 2 — Eudaimonia (the point of it all)**
7. **[T]** **Eudaimonia** — everything we do aims at some good, but what's the
   *final* good? Not "happiness" in our smiley-face sense: *flourishing* — living
   well and doing well across a whole life. An **activity of the soul in
   accordance with virtue** (NE I.7). Not pleasure alone (Achilles feasting),
   wealth (Midas), or fame (heroes chasing *kleos*), `reveal`.
8. **[C]** **Eudaimonia vs Hedonism** — flourishing across a whole life (Aristotle)
   vs pleasure as the only intrinsic good (Epicurus/Bentham). Callback to
   Lesson 1.
9. **[Q · MCQ]** Which best captures Aristotle's eudaimonia? (answer: a life of
   virtuous activity and flourishing; distractors: feeling happy right now /
   having lots of money / being famous for heroic deeds).
10. **[Q · Cloze]** Eudaimonia is "activity of the _soul_ in accordance with
    _virtue_" (NE I.7). It is not just a _feeling_ but a way of _living_.

**Act 3 — The doctrine of the mean (virtue as balance)**
11. **[T]** **Virtue as a disposition at the mean** — a virtue is a stable
    **disposition** (*hexis*), not a one-off act. Each virtue sits between two
    vices: courage between rashness (excess) and cowardice (deficiency); generosity
    between prodigality and stinginess. The mean is **not** an arithmetic midpoint
    — it's relative to the person and situation, perceived by **phronesis**
    (practical wisdom), `reveal`.
12. **[T]** Athena's case study: **Achilles & Icarus** — Achilles' courage in
    battle is legendary, but his *wrath* (the entire Iliad) is courage's excess:
    fight fiercely, yes, but desecrating Hector's body overshoots the mean.
    Icarus, meanwhile, is the mean made literal: Daedalus says *not too high, not
    too low* — and Icarus overshoots. Two myths, one lesson, `reveal`.
13. **[V]** **"The Golden Mean"** (`<phil-mean>`) — pick a character and a virtue
    domain (e.g., courage, generosity, temperance); a slider runs from Deficiency
    through the Mean to Excess, with the two vices labeled at each end and the
    virtue in the middle. For each character, a marker shows where their mythic
    story places them (Achilles: courage slider pegged toward excess; Penelope:
    temperance near the mean). Ungraded; demonstrates that the mean is
    character-relative.
14. **[Q · Checkset]** Which are true of the doctrine of the mean (distractors:
    always choose the mathematical average / virtue is innate, not a disposition /
    the mean is the same for everyone).

**Act 4 — Practicing virtue (habituation & phronesis)**
15. **[T]** **Habituation & Odysseus** (*ethismos*) — "we become just by doing just
    acts" (NE II.1). Virtue is trained like a craft. Athena's proof:
    **Odysseus**, the exemplar of **phronesis** (practical wisdom, NE VI) — not
    just clever but *situationally perceptive*. The Cyclops cave, the Sirens, the
    return to Ithaca: each shows a man who reads the situation and chooses *well*.
    Phronesis is the master virtue — without it, courage becomes rashness,
    generosity becomes prodigality, `reveal`.
16. **[C]** **Phronesis vs mere cleverness** — practical wisdom aims at the
    genuinely good (Odysseus getting everyone home) vs cleverness that can serve
    any end (a con artist's skill). Aristotle insists: phronesis requires good
    character.
17. **[T]** Athena's counter-example: **Medea** — brilliant, resourceful (she's
    arguably *clever*), but her passions overwhelm reason. She knows what she's
    about to do is wrong (Euripides gives her a devastating soliloquy) and does it
    anyway. Passion without phronesis is catastrophic, `reveal`.
18. **[Q · MCQ]** Why does Aristotle say virtue must be *practiced*, not just
    taught? (answer: virtues are dispositions formed by habit, like skills;
    distractors: he didn't believe in education / knowledge automatically makes you
    virtuous / virtues are genetic).

**Act 5 — Virtue and the polis (the political animal)**
19. **[T]** **Zoon politikon & Prometheus** — "man is by nature a political
    animal" (Politics I.2). You can't flourish alone; virtue requires a
    *community* — laws, institutions, friends. Athena's case: **Prometheus** stole
    fire for humanity and gave them the arts of civilization. Noble? But Zeus
    punished him. Aristotle would ask: does self-sacrifice without a supportive
    community constitute flourishing? `reveal`.
20. **[T]** **Penelope & friendship** — **philia** (NE VIII–IX): the highest form
    is **virtue-friendship**, where each person loves the other *for their
    character*. Athena's example: **Penelope** — steadfast, temperate, practically
    wise in managing Ithaca for twenty years. Her virtue sustains and is sustained
    by a household, a community, and a web of obligations. "Even heroes need
    companions. Ask Achilles about Patroclus," `reveal`.
21. **[C]** **Individual virtue vs communal virtue** — modern ethics asks "what
    should *I* do?" Aristotle asks "what kind of *polis* produces virtuous
    people?" Personal character and political structure are inseparable.
22. **[Q · Checkset]** Which claims would Aristotle endorse? (correct: humans
    flourish in community / laws shape moral character / virtue-friendship is the
    highest kind; distractors: hermits can be fully virtuous / the state should
    stay out of ethics / justice is irrelevant to individual virtue).

**Act 6 — Modern virtue ethics (the tradition lives)**
23. **[T]** The return of virtue ethics — after centuries dominated by
    utilitarianism and deontology, virtue ethics came roaring back in the 20th
    century. Why? Because rules and calculations feel incomplete without asking
    *what kind of person should I be?* `reveal`.
24. **[T]** Three modern Aristotelians — **MacIntyre** (*After Virtue*, 1981):
    virtues make sense within **practices** and **traditions**; modern
    individualism has fragmented the moral vocabulary. **Foot** (*Natural Goodness*,
    2001): **neo-naturalism** — virtues are natural excellences of the human
    species, like deep roots for an oak. **Hursthouse** (*On Virtue Ethics*, 1999):
    "an action is right iff it's what a *virtuous agent* would characteristically
    do" — virtue ethics can guide action, not just assess character, `reveal`.
25. **[C]** **MacIntyre vs Foot vs Hursthouse** (three-way `<phil-side>`):
    virtues-in-practices (MacIntyre) vs natural human excellences (Foot) vs
    action via the virtuous agent (Hursthouse). Three modern paths from the same
    Aristotelian root.
26. **[Q · MCQ]** Which modern philosopher argues virtues are natural excellences
    of the human species? (answer: Foot; distractors: MacIntyre / Hursthouse /
    Singer).
27. **[Q · Cloze]** MacIntyre argues virtues make sense within _practices_ and
    _traditions_. Hursthouse says an action is right if it's what a _virtuous_
    agent would do. Foot calls virtues natural _excellences_ of the human species.

**Descent — Athena's parting challenge**
28. **[P]** Belief probe (revisit) — has the training changed your view?
29. **[T]** Athena's farewell — "Knowing the mean isn't enough. You have to *live*
    it. Go practice." Recap: eudaimonia → the mean → habituation & phronesis →
    polis & friendship → the tradition continues, `reveal`.

### Belief-probe statements (start; revisited at end)
1. Being a good person is more about who you *are* than what you *do*.
2. You can learn to be virtuous the same way you learn a skill — by practice.
3. A truly good life requires good friends, not just good choices.
4. There's a "right amount" of every emotion — even anger can be a virtue if felt
   at the right time and in the right way.
5. A society's laws and institutions are partly responsible for whether its citizens
   are virtuous.

### Comparisons (where each `<phil-compare>` lives)
Plato vs Aristotle (5) · Eudaimonia vs Hedonism (8) · Phronesis vs mere
cleverness (16) · Individual vs communal virtue (21) · MacIntyre vs Foot vs
Hursthouse (25, three-way).

### New interactive viz to build
**`<phil-mean>` ("The Golden Mean")** — author supplies virtue domains (courage,
generosity, temperance, etc.), each with named vices at excess and deficiency
ends. A slider or spectrum runs from Deficiency → Mean → Excess, with the virtue
labeled at center. For each mythic character, a marker is pre-placed on the
spectrum showing where their story lands (e.g., Achilles on courage: pegged toward
Excess/Rashness). Students can explore different characters × different virtues.
Ungraded; reusable for any virtue-ethics teaching.

### Art assets (16-bit SVGs / PNGs)
All Greek mythic characters get **portraits** (they're fictional, so portraits
work). Each portrait should include a **visual cue** that reinforces the concept
the character teaches — the art should make the lesson sticky at a glance:

- `athena` — portrait: wise, armored, owl on shoulder (the guide/instructor).
- `achilles` — portrait: warrior mid-rage, **cracked shield** (courage taken to
  excess; the crack = the flaw in his virtue).
- `icarus` — portrait: falling, **one intact wing, one melting** (the failure of
  the mean — too high).
- `odysseus` — portrait: thoughtful pose, **compass or labyrinth motif** in
  background (phronesis = navigating the situation wisely).
- `medea` — portrait: holding a vial, **flames reflected in her eyes** (passion
  overwhelming reason; cleverness without good character).
- `penelope` — portrait: at her loom, **threads radiating outward to small
  figures** (virtue sustained by and sustaining community/friendship).
- `prometheus` — portrait: chained, **fire in his outstretched hand** (justice
  toward humanity at personal cost; virtue and the polis).
- `olympus-training-ground` — scene: the mythic training camp setting.

Real historical thinkers (Aristotle, MacIntyre, Foot, Hursthouse) get
**idea-emblem relic cards** per the art guidelines — no portraits of real people.
Plus `prompts.md`.

### Sources to cite (so nothing is invented)
- Aristotle, *Nicomachean Ethics* (NE): eudaimonia (I.7), the mean (II.6–7),
  habituation (II.1), phronesis (VI), friendship (VIII–IX), relation to the polis
  (I.2, X.9).
- Aristotle, *Politics* I.2 (zoon politikon), III (virtue and citizenship).
- Alasdair MacIntyre, *After Virtue* (1981) — practices, traditions, narrative
  unity of a life.
- Philippa Foot, *Natural Goodness* (2001) — neo-naturalism, natural human
  excellences.
- Rosalind Hursthouse, *On Virtue Ethics* (1999) — v-rules, action guidance via
  the virtuous agent.
- Greek myths sourced from standard retellings (Homer's *Iliad* and *Odyssey*,
  Euripides' *Medea*, Hesiod's *Theogony* / *Works and Days*, Ovid's
  *Metamorphoses* for Icarus/Daedalus).

### Counts (target)
~29 slides. Belief probe (start + revisit) + ~7 graded (4 MCQ, 1 checkset,
2 cloze) + 1 viz + 5 comparisons (one three-way) ≈ 45% interactive. No optional
branch planned yet (candidate: a deep dive on friendship / philia types).

### Open decisions before building
- **`<phil-mean>` viz** in v1, or stub the slide and build the viz second? The
  slider-with-character-markers concept is straightforward but needs good data for
  each character × virtue pairing.
- **Percy Jackson tone calibration:** How irreverent should Athena be? The outline
  leans "impatient divine professor" — confirm the vibe isn't too snarky for the
  audience.
- **Prometheus and self-sacrifice:** Does Aristotle's framework handle
  self-sacrifice well? Worth flagging as a limit/tension, or save that critique
  for a future lesson?

---

## Bioethics: Equipoise — "The Jekyll Protocol"

- **Path:** `lessons/bioethics/clinical-equipoise/` (proposed)
- **Lesson id:** `bioethics-equipoise` (proposed)
- **Subject (catalog):** `Clinical Equipoise`
- **Topic:** Bioethics (third lesson in the strand, after Four Principles and
  Patient Autonomy).
- **Approach:** Teach the *machinery* of a clinical trial from scratch (phases,
  control groups, randomization, blinding, research consent, DSMBs, placebo
  ethics), then use that machinery to explain why **equipoise** is the principle
  that makes randomizing human beings defensible at all. Same devices: story
  frame, `reveal` bullets, `<phil-compare>` cards, an interactive viz, the belief
  probe, graded checks.
- **Narrative frame — the Jekyll family, one generation removed:** You're
  shadowing **Dr. Helen Jekyll**, a physician-scientist and great-granddaughter of
  the Henry Jekyll of *The Strange Case of Dr. Jekyll and Mr. Hyde*. Family
  history has made her obsessive about doing research *right*. She's running a
  real, modern clinical trial of an experimental drug for a severe impulse-control
  disorder — the same territory her great-grandfather blundered into with his
  serum — and every safeguard she insists on is one he skipped. Her ancestor's
  journal (quoted/paraphrased from the public-domain novella) supplies the
  running cautionary counter-example: an "experiment" with no control group, no
  randomization, no blinding, no consent, and no one watching for the moment it
  went wrong.
- **Recurring device — "N of 1, no one watching":** every new safeguard Helen
  explains is immediately checked against what Henry didn't have, e.g. "Henry was
  subject, investigator, and sole judge of his own results — a trial with a
  control group of exactly zero."

### Accuracy note (real, not invented)
- **Theoretical equipoise** is Charles Fried's standard (*Medical Experimentation:
  Personal Integrity and Social Policy*, 1974): the individual physician's own
  subjective probability must be genuinely 50/50.
- **Clinical equipoise** is Benjamin Freedman's revision ("Equipoise and the
  Ethics of Clinical Research," *NEJM*, 1987): not each doctor's internal balance,
  but genuine, honest disagreement within the expert clinical community about
  which treatment is better — the standard actually used to justify randomization
  in practice.
- Trial phases (I–IV), control groups, randomization, and blinding follow standard
  clinical-research methodology (FDA/NIH definitions).
- **DSMBs** (Data and Safety Monitoring Boards) and interim stopping rules are
  standard practice in RCTs (ICH E6 Good Clinical Practice guidance).
- The **placebo-control controversy** (placebo vs. active/standard-of-care
  control) follows the real debate around the **Declaration of Helsinki**
  (WMA, most relevant to its 2000 revision and para. 33 of the 2013 revision),
  which restricts placebo use when proven effective treatment exists.
- **Therapeutic misconception** is a real term (Appelbaum, Roth & Lidz, 1982) for
  research subjects mistakenly believing a trial is designed for their personal
  benefit rather than to generate knowledge.
- Henry Jekyll and his serum are fiction (Robert Louis Stevenson, 1886, public
  domain) — used only as the illustrative anti-example; the research-ethics
  framework is real. Helen Jekyll and her drug trial are invented for this lesson.

### Learning goals
- Explain the basic **apparatus of a clinical trial**: trial phases (I–IV), why a
  **control group** is needed, what **randomization** accomplishes, and the
  difference between **single-** and **double-blind** design.
- Explain how **research consent** differs from ordinary clinical consent
  (disclosure that the goal is generalizable knowledge, not necessarily personal
  benefit; the right to withdraw), and define the **therapeutic misconception**.
- State and distinguish **theoretical equipoise** (Fried) from **clinical
  equipoise** (Freedman), and explain why clinical equipoise is the more workable
  standard for justifying randomization.
- Explain how **interim monitoring**, **stopping rules**, and an independent
  **DSMB** respond when a trial's data disturb equipoise mid-course.
- Explain the **placebo-control controversy** — when a placebo arm is ethically
  defensible versus when comparison to standard-of-care is ethically required.
- Apply all of the above to diagnose everything wrong, ethically, with Henry
  Jekyll's original self-experiment.

### Slide-by-slide

**Act 0 — Shadowing Dr. Jekyll**
1. **[T]** Title — "The Jekyll Protocol" (art: Helen Jekyll in a modern lab, vial
   with a double-helix subtly forming an "H").
2. **[T]** Setup — Helen Jekyll, great-granddaughter of *that* Jekyll, is running a
   trial of an experimental drug for a severe impulse-control disorder — the same
   territory her ancestor stumbled into with a serum and no plan at all, `reveal`.
3. **[P]** Belief probe (start) — 5 statements (see below).

**Act 1 — The apparatus of a clinical trial**
4. **[T]** What a clinical trial actually *is* — testing whether an intervention
   beats an alternative, under a controlled comparison, not just "trying something
   and seeing what happens," `reveal`.
5. **[T]** **Phases I–IV** — I: safety/dosing, small numbers; II: early efficacy
   and side-effect signal; III: large comparative trial, the one that decides
   approval; IV: post-approval surveillance, `reveal`.
6. **[T]** The **control group** — a comparison arm (placebo or standard of care).
   Without one you can't tell the drug's effect apart from natural recovery,
   regression to the mean, or the placebo effect, `reveal`.
7. **[T]** **Randomization** — chance assignment spreads both known and unknown
   confounders evenly across arms. Henry's "trial": he was investigator, subject,
   and control group, all in one body, `reveal`.
8. **[C]** **Randomized** vs **historically/self-selected** comparison (Henry's
   approach vs a modern RCT).
9. **[T]** **Blinding** — single-blind (patient doesn't know their arm) vs
   double-blind (patient *and* clinician don't know) — guards against the placebo
   effect and against biased assessment, `reveal`.
10. **[Q · Checkset]** Genuine purposes of randomization/blinding (distractors:
    "to trick patients into complying," "to punish the control group").
11. **[Q · MCQ]** Why does a trial need a control group at all?

**Act 2 — Consenting to research, not just treatment**
12. **[T]** **Research consent** adds two things beyond ordinary clinical consent:
    disclosure that the goal is *generalizable knowledge* (you might get placebo,
    it might not help you personally) and an unconditional **right to withdraw**,
    `reveal`.
13. **[C]** **Clinical consent** (this treatment, chosen for you) vs **Research
    consent** (this protocol, which may or may not benefit you, in service of
    what we learn).
14. **[Q · MCQ]** A participant scenario testing the **therapeutic misconception**
    (believing the trial exists to treat *them*, specifically).

**Act 3 — Equipoise: the ethical linchpin**
15. **[T]** The randomization problem — if a doctor already believes drug X is
    better, isn't it wrong to randomly deny some patients the better option?
    `reveal`.
16. **[T]** Fried's answer — **theoretical equipoise**: the individual physician's
    own subjective odds must be exactly balanced, 50/50. Turns out almost
    impossibly fragile — a single hunch breaks it, `reveal`.
17. **[T]** Freedman's fix — **clinical equipoise**: not each doctor internally
    50/50, but genuine, honest disagreement *within the expert clinical
    community* about which treatment is better. Far more realistic, and the
    standard actually used to launch trials, `reveal`.
18. **[C]** **Theoretical equipoise** (Fried, individual) vs **Clinical equipoise**
    (Freedman, community).
19. **[Q · Cloze]** Clinical equipoise = genuine disagreement in the expert
    _community_; theoretical equipoise = the _individual_ physician's own
    uncertainty.
20. **[V]** **"The Panel of Experts"** (`<phil-equipoise>`) — a panel of expert
    avatars, each holding an opinion for or against Helen's drug. As the student
    feeds in emerging (hypothetical) trial results, the panel's opinions shift;
    the widget reads out whether **clinical equipoise still holds** (a genuine
    split) or has **collapsed** (consensus one way), and flags what that implies
    for the trial. Ungraded.
21. **[Q · MCQ]** Given a described split among experts, does clinical equipoise
    hold or not?

**Act 4 — When equipoise breaks: monitoring and stopping**
22. **[T]** Trials don't run blind to their own data forever — **interim
    analyses** and pre-set **stopping rules**, reviewed by an independent **Data
    and Safety Monitoring Board (DSMB)**, `reveal`.
23. **[T]** If results become clearly one-sided — or harm shows up — equipoise has
    collapsed. The ethical duty is to stop early, unblind, and offer the better
    treatment to everyone, `reveal`.
24. **[T]** Henry had no DSMB. Nothing was watching for the moment his private
    trial turned from promising to catastrophic — no one to call a stop but
    himself, and he never did, `reveal`.
25. **[Q · MCQ]** What is the purpose of a DSMB and pre-set stopping rules?

**Act 5 — The placebo controversy**
26. **[T]** Is a placebo arm always required, or always permissible? When an
    effective standard treatment already exists, many argue new drugs must be
    compared *to that*, not to nothing — an unnecessary placebo arm can itself
    violate equipoise, `reveal`.
27. **[C]** **Placebo-controlled** vs **active-controlled** (standard-of-care)
    trial design.
28. **[Q · Checkset]** When is a placebo control ethically defensible? (correct:
    no proven effective treatment exists; condition is minor/short-term and
    closely monitored; distractors: "whenever it's cheaper," "whenever the
    condition is serious enough to justify anything").

**Act 6 — Verdict: Helen vs. Henry**
29. **[T]** Helen's protocol, checked against everything her great-grandfather's
    lacked — a control group, randomization, blinding, real research consent,
    clinical equipoise established across a genuine panel of experts, a DSMB
    watching for the moment to stop. The machinery exists *because* one Jekyll
    skipped every step of it, `reveal`.
30. **[P]** Belief probe (revisit) — has the shadowing changed your view?
31. **[T]** Recap — apparatus (phases, control, randomization, blinding) →
    research consent → equipoise (theoretical vs. clinical) → monitoring
    (DSMB/stopping rules) → placebo ethics, `reveal`.

### Belief-probe statements (start; revisited at end)
1. If a doctor is even slightly confident one treatment is better, it's wrong to
   randomly assign patients to either arm.
2. A drug trial without a placebo group can't really prove anything.
3. Once a trial starts producing promising results, it should be stopped early so
   everyone can get the better treatment.
4. It's fine to test an experimental treatment on yourself without any oversight,
   since you're only risking your own body.
5. Blinding — hiding who's getting the real drug — is mostly a way of tricking
   patients.

### Comparisons (where each `<phil-compare>` lives)
Randomized vs historically/self-selected comparison (8) · Clinical consent vs
research consent (13) · Theoretical vs clinical equipoise (18) · Placebo-
controlled vs active-controlled design (27).

### New interactive viz to build
**`<phil-equipoise>` ("The Panel of Experts")** — author supplies a panel of
expert opinions (for/against) on a trial drug and a sequence of hypothetical
interim results. As the student steps through results, the panel's balance of
opinion shifts; the widget reports whether clinical equipoise holds (genuine
split) or has collapsed (consensus), and what that implies (continue / stop /
unblind). Reusable for any research-ethics or expert-disagreement teaching;
conceptually a sibling to `<phil-balance>` (Four Principles) and `<phil-consent>`
(Patient Autonomy) — "toggle inputs, read a threshold verdict."

### Art assets (16-bit SVGs)
**New:**
- `helen-jekyll` — portrait, modern lab coat, vial with a subtle double-helix "H."
- `henry-jekyll` — period portrait/locket photo, for the callback slides.
- `hyde-shadow` — a Hyde silhouette looming just behind Henry's portrait; used on
  the theoretical-equipoise slide (16) to visualize the individual physician's own
  hidden hunch tipping a private balance — distinct from the expert panel.
- `expert-panel` — a row of diverse clinician silhouettes, leaning "for" or
  "against" (lean-angle or speech-bubble), for the clinical-equipoise slide (17)
  and the `<phil-equipoise>` viz (20).
- `blindfold` — simple eye-mask icon, doubled for double-blind vs. single for
  single-blind, next to the blinding slide (9).
- `placebo-pill` — a plain sugar pill beside a real capsule, for the placebo-
  controversy slides (26–28).
- `dsmb-eye` — a watchful-eye motif for the monitoring-board slides (22–24).

**Reused (recolor/relabel only, no new illustration):**
- `scales.svg` (from `four-principles`) — the theoretical-vs-clinical equipoise
  comparison card (18); "equipoise" is literally balance, so this rhymes visually
  with the Van Helsing lesson's "weighing principles" idea.
- `blood-vial.svg` (from `four-principles`) — two color variants of the same
  silhouette: a murky serum for Henry, a clean trial-drug vial for Helen. Same
  apparatus, different rigor, reused across generations.

Plus `prompts.md`.

### Sources to cite (so nothing is invented)
- Charles Fried, *Medical Experimentation: Personal Integrity and Social Policy*
  (1974) — theoretical equipoise.
- Benjamin Freedman, "Equipoise and the Ethics of Clinical Research," *NEJM*
  (1987) — clinical equipoise.
- Appelbaum, Roth & Lidz, "The Therapeutic Misconception: Informed Consent in
  Psychiatric Research" (1982).
- World Medical Association, *Declaration of Helsinki* (placebo-control
  provisions, esp. the 2000 revision and para. 33 of the 2013 revision).
- ICH E6 Good Clinical Practice guidance — DSMBs, interim analysis, stopping
  rules.
- FDA/NIH clinical trial phase definitions (I–IV).
- Robert Louis Stevenson, *The Strange Case of Dr. Jekyll and Mr. Hyde* (1886,
  public domain) — source of the framing anti-example; a fictional device, not a
  research-ethics source.

### Counts (target)
~31 slides. Belief probe (start + revisit) + ~7 graded (3 MCQ, 2 checkset,
1 cloze) + 1 viz + 4 comparisons ≈ 40% interactive.

### Open decisions before building
- **`<phil-equipoise>` viz** in v1, or stub the slide first? Needs authored
  interim-result data that plausibly shifts a panel from split to consensus.
- **How much Stevenson to quote directly** (public domain, so verbatim lines are
  fine) vs. paraphrase — verbatim gives authenticity but needs careful excerpt
  choice to keep the tone consistent with the rest of the lesson.
- **Fictional drug/condition naming:** keep the impulse-control disorder and drug
  name deliberately generic/fictional to avoid implying any real diagnosis or
  compound, given the sensitive subject matter (loss of behavioral control).
