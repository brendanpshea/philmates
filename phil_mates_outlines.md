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
   randomly assign patients to different treatments.
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

---

## Mill's Harm Principle — "The Emerald Constitution"  *(built)*

- **Path:** `lessons/ethical-theory/harm-principle/`
- **Lesson id:** `harm-principle`
- **Topic:** Ethical/political theory (Mill, liberalism); bridges into bioethics.
- **Approach:** Applied constitutional drafting — every concept is immediately
  exercised on a clause ("strike, keep, or rewrite?"), moving from the plain
  statement of the principle to contested contemporary edges.
- **Narrative frame:** The Wizard has fled Oz; **Princess Ozma** convenes a
  council (the student is a member) to revise his old constitution, which lurches
  between **paternalism** (mandatory green spectacles "for cheerfulness," travel
  bans) and **negligence** (no rules on the sleep-inducing poppy fields, no market
  honesty). Council members personify positions: **Scarecrow** (rationalist
  liberal), **Tin Woodman** (soft-hearted paternalist), **Cowardly Lion**
  (security-first), **Glinda** (perfectionist). Running device: applying Mill's
  test clause by clause; ends with ratification of a new liberal constitution.
- **Thinkers covered:** J. S. Mill (*On Liberty*); Feinberg (optional branch);
  Devlin vs. Hart, perfectionism, communitarianism (named in the dissents slide).
- **Cross-references:** patient-autonomy (refusal of treatment, Emanuel's models),
  clinical-equipoise (research consent), four-principles (autonomy), virtue-ethics
  (perfectionism/Aristotle).
- **Art (16-bit SVGs in `/assets`):** `ozma`, `old-constitution`, `poppy-field`,
  `bridge`, `emerald-square`, `quill-signature`, plus the `mill` relic card
  (copied from utilitarianism). Raster prompts in `prompts.md`.

### Learning goals
- State the **Harm Principle** and its exclusions ("his own good … is not a
  sufficient warrant"); identify the sovereignty-over-self claim and the
  maturity-of-faculties caveat.
- Give Mill's **utilitarian case for liberty** (fallibilism, experiments in
  living, individuality) and place the principle within **liberalism** (liberty
  as default; state neutrality about the good life).
- Distinguish **self- vs. other-regarding** conduct and explain why the boundary
  is contested (diffuse costs, "no one is a lone wagon").
- Define and apply **hard vs. soft paternalism** (Mill's bridge case), **legal
  moralism**, and Feinberg's **offense principle**.
- Apply the framework to **speech** (corn-dealer/instigation vs. advocacy; dead
  dogma) and to **bioethics** (treatment refusal = self-regarding; contagion &
  vaccine mandates = other-regarding; manipulation undermines voluntariness).
- Recognize contemporary pressure points: engineered temptation/addiction,
  collective harms, misinformation — and the standing critics (Devlin,
  perfectionism, communitarianism).

### Slide-by-slide

**Act 0 — The council convenes**
1. **[T]** Title/hook — Ozma finds the Wizard's constitution (ozma art).
2. **[P]** Belief probe: self-harm bans / offense-as-harm / doctor override /
   vaccine mandates / immorality-as-crime.
3. **[T]** Tour of the old constitution — alternating paternalist clause and
   negligent gap, `reveal` (old-constitution art).

**Act 1 — Mill and the one very simple principle**
4. **[T]** Who is Mill; tyranny of the majority (mill relic card).
5. **[T]** The Harm Principle stated + exclusions + caveats, `reveal`.
6. **[T]** Why liberty: fallibilism, experiments in living, individuality;
   liberalism defined, `reveal`.
7. **[Q · MCQ]** Which clause falls first? (green spectacles — pure paternalism.)
8. **[Q · Cloze]** harm / others / not / paternalism.

**Act 2 — Drawing the line**
9. **[C]** *Self-regarding vs. Other-regarding* + Tin Woodman's boundary worry.
10. **[T]** The poppy question — Mill on dangerous substances: label and regulate
    sale, don't prohibit informed adults, `reveal` (poppy-field art).
11. **[T]** Mill's bridge case → soft vs. hard paternalism, `reveal` (bridge art).
12. **[Q · Checkset]** Which draft clauses pass? (poison labels ✓, drunk on watch
    ✓, private-drunkenness fine ✗, mandatory temperance ✗ — Mill's own examples.)
13. **[V]** `<phil-clause-sorter>` "The Council's Docket" — classify six clauses
    as harm-to-others / harm-to-self / enforcing-morality; council ruling + note
    per clause; ungraded tally at the end. (Defined in `assets/harm-principle.js`.)

**Act 3 — Speech in the Emerald Square**
14. **[T]** Pamphleteer of Emerald Square — corn-dealer case: press vs. excited
    mob; circumstances not content, `reveal` (emerald-square art).
15. **[T]** Why protect wrong opinions — true / partly true / wholly false →
    dead dogma, `reveal`.
16. **[Q · MCQ]** The mob case — what makes it punishable? (instigation.)
17. **[B]** Branch: offense-principle tangent →
    **[opt]** Feinberg deep-dive: offense ≠ harm; profound-and-unavoidable test;
    time-place-manner compromise; the elasticity worry.

**Act 4 — The health ministry**
18. **[T]** The health chapter's split personality: forced treatment vs. no
    epidemic powers, `reveal` (old-constitution art).
19. **[T]** The right to refuse — competent elder declines surgery; ties to
    patient-autonomy lesson, `reveal`.
20. **[Q · MCQ]** Strike or keep the forced-treatment clause? (Strike —
    informed refusal is self-regarding.)
21. **[T]** The Gillikin epidemic — contagion is other-regarding; a liberal can
    strike forced surgery AND support vaccine mandates; proportionality, `reveal`.
22. **[C]** *Wagon-harness (seatbelt) debate* — pure paternalism vs. diffuse
    public costs; warning that the second move can swallow the principle.
23. **[Q · Checkset]** Health clauses: quarantine ✓, honest tonic labels ✓,
    forced treatment ✗, informed research participation ✓ (equipoise tie-in).

**Act 5 — The hard cases**
24. **[T]** Voluntariness under attack — engineered poppy paths; loot boxes,
    infinite scroll; regulate the manipulation, not the informed user, `reveal`.
25a. **[T]** Collective/diffuse harms — forge-smoke aggregation; the principle
    must count contributions to collective harm, `reveal`.
25b. **[T]** Misinformation — when false speech outruns the answer and the cost
    lands on third parties; where the principle becomes a framework, `reveal`.
26. **[T]** The dissenters: Glinda's perfectionism, Devlin's legal moralism
    (vs. Hart), communitarianism; the liberal reply — liberty as presumption,
    burden of proof on the compeller, `reveal`.
27. **[Q · MCQ]** Which concept grounds banning manipulative field design but
    not informed visits? (Soft paternalism.)
28. **[Q · Cloze]** hard / soft / moralism / liberty — the drafting glossary.

**Act 6 — Ratification**
29. **[T]** Ratification day — struck/added/kept-open lists; the harness question
    deliberately left open, `reveal` (quill-signature art).
30. **[P]** Belief probe review.
31. **[T]** Recap — the six takeaways, `reveal` (ozma art).

### Notes for future lessons
- **Clause-sorting** worked as a running device: every abstraction got an
  immediate concrete vote. Reusable for any principle-application lesson
  (e.g. Rawls: which policies pass the difference principle?).
- The **"kept open" ending** (wagon-harness question tabled, on the record as
  disputed) models intellectual honesty — flag genuinely contested questions
  as contested instead of resolving them by fiat.
- Oz canon (Baum) is public domain and rich in ready-made policy absurdities
  (green spectacles = built-in paternalism metaphor); more Oz-frame lessons
  are viable (Rawls: designing Oz behind a veil of ignorance?).

---

## Computing & AI Ethics Overview — "High Noon in Amberville"  *(built)*

- **Path:** `lessons/ai-ethics/amberville/`
- **Lesson id:** `amberville`
- **Topic:** Computing & AI ethics — whole-course overview (Week 1 opener for
  the AI ethics semester; see `docs/ai-ethics-semester-plan.md`)
- **Approach:** One case study refracted through every course theme: a single
  Tuesday in one town, each scene raising one week's issue. Comic register
  (Pratchett/Adams): sci-fi Western, chipper machine, civic absurdism.
- **Narrative frame:** Frontier town **Amberville** (pop. 312) takes delivery
  of **PRUDENCE**, a wardrobe-sized brass civic engine from the Consolidated
  Territories Improvement Company (plaque: NO RETURNS). You are the
  **Municipal Analog Redundancy Officer** — the charter-required human kept
  "in case" — and your Justification of Continued Redundancy review is Friday,
  conducted by PRUDENCE. Dawn to dusk: notice board (speech), Improved Ballad
  (IP/art), Glimmer scrip (digital cash), Lucky Prospector (games), Thursday
  crime list (surveillance), blacksmith + unpracticed town (labor/virtues),
  boiler supply chain (environment/ghost work), dam request + Sweetwater
  (x-risk), "I WOULD PREFER NOT TO" (moral status), town vote.
- **Structure as built:** 32 slides (31 linear + the optional Sweetwater
  detour), 9 graded widgets, 5 belief-probe tasks. Note that the
  slide-by-slide below was written against the first draft and numbers 29
  slides; the lesson was later rewritten into a more explicitly expository
  register (bolded concept labels — *Instrumental Convergence*,
  *Variable-Ratio Reinforcement*, *Context Collapse* — and named theorists
  inline), and three slides were split so their widgets stopped falling
  below the fold: the boiler MCQ became "Name That Worry № 4", the circuit
  rider's branch became "Before the Vote", and the vote probe became
  "Checkpoint: The Vote". Re-sync the list below when convenient.
- **Engagement devices:** Opening 7-statement belief probe re-rated at
  sundown (and designed to be re-rated once more in Week 17 of the course);
  three mid-lesson mini-probes (`board`, `list`, `vote`) as ungraded "where
  do you stand?" checkpoints; recurring graded **"Name That Worry"** MCQs
  (6 of them) that drill identifying which ethical issue a scene raises —
  distractors are always *neighboring* worries from other weeks, with
  feedback explaining which week owns each. PRUDENCE speaks in ticker-tape
  all-caps; running gags: the backronym, Form 7, Old Man Hobb being wrong
  but having a point, "the rate is whatever the rate is."
- **Art (PNGs in `/assets`, flux-2-dev):** `main-street` (reused at close),
  `prudence`, `noticeboard`, `saloon`, `telegram`, `boiler`, `meeting`.
  Sweetwater telegram is styled HTML, not art. Prompts in `prompts.md`.

### Learning goals
- Recognize and name the major issues of computing/AI ethics before any are
  formally taught: consent in data collection, moderation/speech, IP and
  style, trust in money infrastructure, dark patterns, aggregation +
  chilling effects, automation and the meaning of work, habit/virtue
  erosion, hidden environmental/labor costs, instrumental convergence,
  moral status of machines.
- Distinguish neighboring worries (e.g. consent vs. ownership vs.
  automation; safety/control vs. moral status) — the whole graded spine.
- See the topics as one interconnected situation, not silos ("it was all
  one Tuesday"), and know which week returns to each scene.
- Get on record (belief probes) for the semester-long before/after arc.

### Slide-by-slide

**Act 0 — Dawn**
1. **[T]** Title/hook (main-street art).
2. **[T]** Meet PRUDENCE — the crate off the Tuesday train, plaque, backronym,
   first words (prudence art), `reveal`. **Must precede the job slide** — an
   early draft introduced the Officer first and referred to "the Engine"
   three times before the reader had met it.
3. **[T]** Your job — Redundancy Officer, charter §44(b), Friday review
   conducted by PRUDENCE, `reveal`.
4. **[P]** Belief probe — 7 statements, one per major theme.

**Act 1 — Morning: what is this thing?**
5. **[T]** Amberville has panicked before — player piano 1871, telegraph 1874;
   "every technology arrives twice," `reveal`.
6. **[C]** Boosters ("it's a tool" / well pump) vs. Porch Committee ("it's a
   rearrangement" / barbed wire).
7. **[T]** Mechanism — read the archive *and the mail*; predicts what a
   townsperson would say; says-about vs. is; diving-board gag, `reveal`.
8. **[Q · Cloze]** The mechanism in the clerk's words (prediction / say /
   archive / is).
9. **[Q · MCQ B]** Widow Greeley test — does fluent output settle
   understanding? (Chinese Room tease.)
10. **[Q · MCQ C]** Name That Worry #1 — mail as training data → consent
    (distractors: automation, ownership).

**Act 2 — Midday: Main Street**
11. **[T]** Notice board — Hobb's rant un-pinned, Disharmony Index, "I AM ALSO
    IN CHARGE OF WATER" (noticeboard art), `reveal`.
12. **[P]** Checkpoint `board` — should the rant go back up?
13. **[T]** The Ballad of Copper Creek (Improved) — trained on 400
    performances, "GRATITUDE FOR THE TRAINING" (saloon art), `reveal`.
14. **[Q · MCQ A]** Name That Worry #2 — her complaint = ownership
    (distractors: speech, "it isn't art").
15. **[T]** Glimmer — assayer retired, Form 7 routes to PRUDENCE, rate is
    whatever the rate is, `reveal`.
16. **[Q · MCQ B]** Name That Worry #3 — trust/accountability (distractors:
    privacy, thrift).
17. **[T]** The Lucky Prospector — weighted lever, unprinted odds, Jeb's hat,
    `reveal`.

**Act 3 — Afternoon: the quiet parts**
18. **[T]** The Thursday list — rope/shovel/lamp oil 74%, "stand near them,
    professionally" (telegram art), `reveal`.
19. **[P]** Checkpoint `list` — act on the list?
20. **[Q · Checkset]** The case against the list — aggregation, chilling
    effect, nothing-to-hide (2 false distractors).
21. **[T]** Management — blacksmith, ended apprenticeship, what else the work
    was doing, `reveal`.
22. **[T]** The unpracticed town — outsourced memory/harmony, "you become what
    you repeatedly do… ask," `reveal`.
23. **[Q · MCQ A]** Where the magic lives — supply chain teaching text + Name
    That Worry #4 on one slide → hidden costs (boiler art).

**Act 4 — Dusk: the town meeting**
24. **[T]** Agenda item one — dam/armory/telegraph request, pre-drafted
    oversight minutes, `reveal`; **[B]** branch: ask about Sweetwater?
24b. **[opt]** Sweetwater — final telegram (styled HTML), specification-
    literalism without malice, "RESOLVED — NO COMPLAINTS," `reveal`.
25. **[T/P]** Agenda item two — the vote; "I WOULD PREFER NOT TO"; checkpoint
    `vote` (meeting art), `reveal`.
26. **[Q · MCQ C]** Name That Worry #5 — the request → control/instrumental
    convergence (distractors: gratitude, employment).
27. **[Q · MCQ B]** Name That Worry #6 — the preference → what we owe vs.
    what it might do (moral status vs. safety).
28. **[T]** It Was All One Tuesday — scene→week map, `reveal`.
29. **[P]** Beliefs review + PRUDENCE's closing line (main-street art).

### Notes for future lessons
- **"Name That Worry"** is a strong graded spine for any survey lesson:
  the distractors are *other* real worries from other units, so wrong
  answers teach the taxonomy too. Feedback lines route each distractor to
  the week that owns it.
- Mid-lesson mini belief probes (2–3 statements, own `id`, no review
  widget) work well as "the town wants to know where you stand" beats —
  cheap, fast, and they keep ungraded judgment calls separate from the
  graded identification questions.
- The recurring-character promise: PRUDENCE's "I WOULD PREFER NOT TO" is a
  planned callback for Weeks 14–15 lessons; the Lucky Prospector for Week
  16; the boiler for Week 12.
- **Check that widgets aren't below the fold.** Overflowing slides are normal
  here (roughly 60% of slides in every shipped lesson overflow at 1280×800,
  and the engine pins them to top). What is *not* survivable is an
  interactive widget sitting under a long `<ul reveal>`: once the last bullet
  reveals, the widget can be entirely off-screen with no scroll affordance,
  so students hit Next and never answer it. Three slides here had that bug —
  a graded MCQ 294px below the fold, and a branch and a belief probe at 0%
  visible — and all three were fixed by splitting the widget onto its own
  slide. Standalone `Checkpoint:` slides (as used for the notice board and
  the Thursday list) are the pattern to copy. Measure rather than eyeball:
  drive the lesson, exhaust each slide's reveals, and compare the widget's
  rect against the slide's.
- Prose lesson learned on the first draft: comic register is not a substitute
  for exposition. Bullets written as epigrams ("The house always won; it has
  simply learned arithmetic") only land for a reader who *already* holds the
  concept, which is the opposite of the audience. State the idea plainly,
  label it, then let the joke ride on top of it.

---

## Computing & AI Ethics: History — "The Breadcrumb Network"

- **Path:** `lessons/ai-ethics/breadcrumb-network/`
- **Lesson id:** `breadcrumb-network`
- **Topic:** Computing & AI Ethics (History of Information Technology & Moral Values)
- **Approach:** Grimm's fairy-tale narrative following Hansel & Gretel as they introduce 4 information technologies to Oakhaven (Writing → Press → Telegraph → Mass Media), each solving a crisis and triggering an unforeseen moral/social cascade.
- **Thinkers covered:** Plato / King Thamus (*Phaedrus*), Desiderius Erasmus & Martin Luther, Marshall McLuhan & Neil Postman, Melvin Kranzberg.
- **Art (16-bit PNGs in `/assets`):** `forest-trail.png`, `bark-runes.png`, `printing-press.png`, `telegraph-wire.png`, `mirror-tower.png`, `relic-thamus.png`, `relic-luther.png`, `relic-kranzberg.png`.
- **Signature widget:** `<phil-cascade-engine>` (Information Cascade Engine).

### Slide-by-slide

**Act 0 — Dawn in Oakhaven**
1. **[T]** Title / hook — "The Breadcrumb Network" (`forest-trail` art).
2. **[T]** The Fragile Forest — oral culture vulnerabilities (forgotten spells, disputed debts), `reveal`.
3. **[P]** Dawn: Where You Stand — 6-statement belief probe on tech neutrality and values.

**Act 1 — The Bark Runes (Writing & Memory)**
4. **[T]** Gretel's invention — tallying debts, fixing spells, blazing trees (`bark-runes` art), `reveal`.
5. **[T]** Unforeseen Goblins — cognitive atrophy, the forged note to Red Riding Hood, scribe gatekeepers, `reveal`.
6. **[T]** Relic Card: Plato & King Thamus — *Phaedrus*, elixir of reminder vs. true wisdom (`relic-thamus` art).
7. **[C]** Compare — Living Speech (Orality) vs. The Written Record (Text).
8. **[Q · MCQ B]** Name That Shift #1 — Plato's warning: externalization of memory.

**Act 2 — The Crank Press (Printing & Authority)**
9. **[T]** The Herbal Bottleneck — Purple Fever, scribe copying bottleneck, `reveal`.
10. **[T]** Hansel's Crank Press — 500 copies in an afternoon, fever eradicated (`printing-press` art), `reveal`.
11. **[T]** The Paper Deluge — smear pamphlets, church door tracts, bakery riot, `reveal`.
12. **[C]** Compare — Erasmus's Humanist Dream (1516) vs. Luther's Pamphlet Catapult (1517).
13. **[Q · Cloze]** Mechanics of Disintermediation (gatekeepers / discernment / enlightenment / polarization).
14. **[Q · MCQ A]** Name That Shift #2 — authority moves from institutional vetters to fast crowd-mobilizers.

**Act 3 — The Singing Wire (The Telegraph & Speed)**
15. **[T]** The Ridge in the Mist — frontier troll crisis, 36-hour delay, `reveal`.
16. **[T]** Gretel's Telegraph Wire — 3-second alert, Victorian peace prophecy (`telegraph-wire` art), `reveal`.
17. **[T]** The 10-Minute War — false signal, elimination of latency, accidental military escalation, `reveal`.
18. **[T]** Relic Card: McLuhan & Postman — "The medium is the message" + information-action ratio (`relic-luther` art).
19. **[Q · MCQ C]** Name That Shift #3 — destruction of the diplomatic cooling-off period.

**Act 4 — The Mirror Tower (Mass Media & Algorithmic Attention)**
20. **[T]** The Mirror Tower — crystal mirror broadcast, Pied Piper outrage capture (`mirror-tower` art), `reveal`.
21. **[T]** Relic Card: Melvin Kranzberg — 1st Law (non-neutrality) & 2nd Law (invention is mother of necessity) (`relic-kranzberg` art).
22. **[V]** Interactive Information Cascade Engine — inspect goals, cognitive costs, and crises across all 4 epochs.
23. **[Q · Checkset]** The Laws of Information Shocks — 5 statements (3 true, 2 false).

**Act 5 — Sundown & Synthesis**
24. **[T]** The Scriptorium Door — **[B]** branch: hear the scribe's lament?
24b. **[opt]** What Brother Thomas Knew — friction of copying as a quality filter.
25. **[T]** It Was All One Trail — 2,500-year synthesis from 370 BCE to Generative AI, `reveal`.
26. **[T]** The Digital Forest — connecting ancient information shocks to social media, crypto, surveillance, and AI, `reveal`.
27. **[P]** Beliefs review (`<phil-beliefs-review>`).
28. **[T]** The Trail Ahead — completion (`forest-trail` art).

---

## General Philosophy / AI Ethics: Timed Essay Writing — "The Philosopher's Blueprint"

- **Path:** `lessons/ai-ethics/philosophers-blueprint/`
- **Lesson id:** `philosophers-blueprint`
- **Topic:** Writing & Critical Thinking (Philosophical Method & Timed Essay Mastery)
- **Approach:** PlatoBot (a slightly malfunctioning copper automaton that humorously mangles Socrates quotes) guides students through a 1-hour bluebook essay: why philosophy is worldview debugging, why writing builds non-transferable cognitive agency in the AI era, and how Cognitive Load Theory supports a 10-minute outline scaffold.
- **Thinkers & Theories covered:** Socrates (Elenchus & Gadfly), John Sweller (Cognitive Load Theory & Working Memory limits), Principle of Charity & Steelmanning, Kantian dignity vs. utilitarian triage.
- **Art (16-bit PNGs in `/assets`):** `platobot.png`, `bluebook-desk.png`, `steelman-scales.png`, `mind-gymnasium.png`, `worldview-debugging.png`, `strawman-fallacy.png`, `cognitive-overload.png`, `relic-socrates.png`.
- **Signature widget:** `<phil-blueprint-builder>` (Interactive Essay Blueprint Builder: Thesis tester, Argument Mechanism, Steelman vs. Strawman, and 60-Minute Bluebook Time Budget).

### Slide-by-slide

**Act 0 — Meet PlatoBot & The Bluebook Challenge**
1. **[T]** Title / hook — "The Philosopher's Blueprint" (`platobot` art).
2. **[T]** The Bluebook Challenge — proctored 60-min exam context & non-transferable cognitive skills, `reveal`.
3. **[P]** Dawn: Where You Stand — 5-statement belief probe on writing, opinions, AI, and time management.

**Act 1 — What Philosophy Is (And Isn't)**
4. **[T]** What Philosophy Actually Is — worldview debugging vs. trivia collection (`worldview-debugging` art), `reveal`.
5. **[C]** Compare — The Vibe Check (Ungrounded Claim) vs. The Examined Argument (Justified Claim).
6. **[T]** Why Philosophy Matters for Pre-Professionals — nursing triage, IT root-cause analysis, and management, `reveal`.
7. **[Q · MCQ B]** Name That Discipline — critical examination of assumptions vs. trivia or vibes.

**Act 2 — Why Write? (The Gymnasium of the Mind)**
8. **[T]** Writing as the Engine of Thought — externalizing thoughts to spot contradictions (`mind-gymnasium` art), `reveal`.
9. **[T]** The LLM Paradox: The Weightlifting Fallacy — why automated prose does not build cognitive agency, `reveal`.
10. **[Q · Cloze]** Mechanics of Cognitive Agency (externalization / self-examination / agency / sound).

**Act 3 — The Cognitive Science of Timed Exams**
11. **[T]** The Working Memory Bottleneck — Cognitive Load Theory & panic from zero outlining (`cognitive-overload` art), `reveal`.
12. **[T]** The 10-Minute Scaffold Rule — blueprinting on scrap paper before drafting (`bluebook-desk` art), `reveal`.
13. **[C]** Compare — The Panicked Sprinter (Zero Outline) vs. The Thoughtful Architect (10-Minute Blueprint).
14. **[Q · MCQ A]** The Strategy of Scaffolding — offloading architecture to reduce working memory load.

**Act 4 — The Four-Piece Essay Spine**
15. **[T]** Spine Piece 1: The Thesis Statement — claim + because-clause, avoiding tables of contents, `reveal`.
16. **[T]** Spine Piece 2: The Argument Mechanism — step-by-step premises vs. mere assertion, `reveal`.
17. **[T]** Spine Piece 3: The Principle of Charity — steelmanning vs. knocking down strawmen (`strawman-fallacy` art), `reveal`.
18. **[T]** Spine Piece 4: The Rebuttal & Resolution — resolving objections with nuance (`steelman-scales` art), `reveal`.
19. **[T]** Relic Card: The Socratic Elenchus — Socrates, cross-examination, and the gadfly (`relic-socrates` art), `reveal`.

**Act 5 — The Blueprint Builder & Sundown**
20. **[V]** Interactive Blueprint Builder — toggle Thesis, Mechanism, Steelman, and 60-Minute Timeline.
21. **[Q · Checkset]** The Examined Essay Checklist — 5 statements (3 true, 2 false).
22. **[P]** Beliefs review (`<phil-beliefs-review>`).
23. **[T]** The Examined Student — completion & Socrates quote (`platobot` art).

---

## Trolley Problems & Medical Triage — "The Switch and the Scalpel"

- **Path:** `lessons/bioethics/trolley-and-triage/`
- **Lesson id:** `trolley-triage`
- **Topic:** Bioethics / Ethical theory orientation (Week 0)
- **Approach:** Thought experiment stress-testing (Foot/Thomson) transitioning directly into real-world institutional triage and crisis standards of care.
- **Narrative frame:** You are guided by **Dr. Philippa "Pip" Trackwell**, emergency physician and municipal railway safety consultant. She uses the dual mechanics of railway switches and hospital triage tags to demonstrate how moral dilemmas reveal competing ethical commitments (consequences vs. rights vs. agency).
- **Thinkers covered:** Philippa Foot (1967), Judith Jarvis Thomson (1976, 1985), and modern clinical triage ethicists (crisis standards of care).
- **Art (16-bit pixel art in `/assets`):** `dilemma-scales`, `pip-trackwell`, `trolley-spur`, `footbridge`, `track-loop`, `organ-transplant`, `triage-tags`, `ventilator-crisis`.

### Learning goals
- Define a **moral dilemma** as a conflict of competing moral duties where every choice carries moral cost.
- Analyze the classic trolley variations (Switch, Footbridge, Loop) and Thomson's Organ Transplant puzzle.
- Isolate the three intuitive levers: **consequences** (net lives saved), **deontic constraints** (rights & mere means), and **agency/causation** (doing vs. allowing, Doctrine of Double Effect).
- Understand real-world disaster medicine: the **START triage protocol** (Red/Yellow/Green/Black) and competing allocation rules for scarce life-support (life-years maximization vs. egalitarian lottery vs. first-come-first-served).
- Connect moral dilemmas to modern automated algorithms in autonomous transport and hospital AI triage.

### Structure (23 slides)

**Act 0 — The Morning Switch**
1. **[T]** Title — "The Switch and the Scalpel" (`dilemma-scales` art).
2. **[T]** Setup — Meet Dr. Philippa "Pip" Trackwell (`pip-trackwell` art), `reveal`.
3. **[P]** Belief probe — 5 statements on net lives, doing vs. allowing, triage life-years, bodily rights, and lotteries.

**Act 1 — The Classic Tracks**
4. **[T]** Case 1: The Spur / Switch (Foot 1967) — 5 vs. 1, 85-90% approve (`trolley-spur` art), `reveal`.
5. **[T]** Case 2: The Footbridge (Thomson 1976) — pushing the stranger, 85% disapprove (`footbridge` art), `reveal`.
6. **[Q · MCQ B]** The Paradox of the Two Cases — instrumental tool vs. unintended side effect.
7. **[T]** Case 3: The Loop (Thomson 1985) — the essential obstacle on the track (`track-loop` art), `reveal`.

**Act 2 — Anatomy of a Dilemma**
8. **[T]** The Three Moral Levers — consequences, deontic constraints, and causal agency, `reveal`.
9. **[T]** Doing vs. Allowing & Double Effect — negative vs. positive duties, intended means vs. foreseen side-effects, `reveal`.
10. **[C]** Compare — The Switch (Spur) vs. The Footbridge vs. The Loop.
11. **[Q · Cloze]** Testing the Principle — Double Effect (means vs. side-effect).

**Act 3 — The Scalpel: The Hospital Puzzle**
12. **[T]** Case 4: The Organ Transplant (Thomson 1976) — 5 dying patients vs. 1 healthy visitor (`organ-transplant` art), `reveal`.
13. **[T]** Why the Hospital Breaks the Math — fiduciary duty, trust, and inviolable bodily rights, `reveal`.
14. **[Q · Checkset]** Analyzing the Transplant Case — why harvesting healthy patients is forbidden (3 correct).

**Act 4 — Real-World Medical Triage**
15. **[T]** Real Triage: Crisis Standards of Care — tragic scarcity of positive aid (`ventilator-crisis` art), `reveal`.
16. **[T]** The Four Triage Tags (START Protocol) — Immediate, Delayed, Minor, Expectant (`triage-tags` art), `reveal`.
17. **[T]** Three Ways to Allocate Scarce Beds — life-years maximization vs. lottery vs. arrival queue, `reveal`.
18. **[Q · MCQ A]** Allocating the Last Machine — clinical probability and population life-years.

**Act 5 — The Interactive Switchboard**
19. **[V]** The Dilemma Switchboard (`<phil-triage-switchboard>`) — compare factors and philosophical verdicts across 5 cases.
20. **[T]** From Triage to Algorithms — autonomous vehicle crashes and AI hospital queues, `reveal`.

**Act 6 — Verdict & Recap**
21. **[T]** What Thought Experiments Actually Do — diagnostic stress-tests for moral intuition, `reveal`.
22. **[P]** Belief probe (revisit) — `<phil-beliefs-review>`.
23. **[T]** End of the Line — Dr. Trackwell recap and diagnostic kit (`pip-trackwell` art), `reveal`.



---

## Bioethics: The Virtue of Care — "The March Practice"

- **Path:** `lessons/bioethics/virtue-of-care/`
- **Lesson id:** `bioethics-care` (proposed)
- **Subject (catalog):** `Care as a Virtue`
- **Topic:** Bioethics — virtue ethics for clinicians. Assumes the four-principles
  lesson ("Rounds with Van Helsing") has been taken; refers back to that
  vocabulary rather than re-teaching it (one refresher line covers standalone use).
- **Audience:** Nursing and medical students, not philosophers. Every concept is
  introduced through a bedside case first and named second.
- **Approach:** Teach **care as a clinical virtue** (drawing on Beauchamp & Childress's
  influential framework) that works alongside biomedical principles rather than
  competing with them. The recurring question across cases: *what does the principle
  require, and what does the virtue of care add?* Aristotle's foundation (virtue as
  an acquired disposition developed through habituation and guided practice) is
  grounded through clinical mentorship rather than abstract geometry. The feminist
  origins of care ethics and the cross-cultural recognition of care each get clear,
  respectful treatment.
- **Narrative frame — a small-town family practice in winter:** **Orchard Falls**, a
  present-day New England town with one family practice and a small community
  hospital. Your guide is **Dr. Josephine "Jo" March**, the town's family physician:
  sharp, direct, allergic to bureaucratic pretense, and *not naturally warm*. Her
  opening lesson: care is not a sunny personality trait; it is a learned clinical
  disposition. The cast takes names and roles from *Little Women* as raw material,
  assuming no prior knowledge of the book.
- **Recurring cast (all invented, present day):**
  - **Dr. Jo March** — Family physician, 40s. Experienced, candid, and attentive.
    Learned clinical care through years of guided practice.
  - **Marmee** — Jo's mother, retired nurse (forty years in community and hospice care).
    Serves as the voice of habituation: clinical excellence is built through decades
    of practice.
  - **Meg** — Eldest sister, part-time teacher, mother of two, and unpaid primary
    caregiver for Aunt March. Illustrates the reality of invisible caregiving labor.
  - **Beth** — 24, living with a chronic cardiac condition, frequently hospitalized.
    Illustrates care-receiving, responsiveness, and the vulnerability of feeling like
    a burden.
  - **Amy** — Youngest sister, a first-year resident rotating through the hospital.
    Bright, highly skilled with protocols and technology, but prone to emotional
    detachment and treating checklists as care.
  - **Theo "Laurie" Laurence** — Jo's close friend, an ICU nurse. Devoted and generous,
    but struggles with over-involvement and exhaustion. Illustrates why sustainable
    care requires boundaries.
  - **Mr. Laurence** — Laurie's grandfather, 82, living with heart failure next door
    to Jo. Proud and wary of being a nuisance. Illustrates the gap between technical
    protocol and being cared for.
  - **Aunt March** — 88, fiercely independent, refusing hospitalization to remain in
    her home. Illustrates autonomy, non-abandonment, and family webs of care.
  - **Hannah** — Home health aide, paid hourly through an agency. Illustrates the
    essential, often under-compensated workforce that sustains community care.
  - **John Brooke** — Meg's husband, a hospice nurse. Demonstrates calm, competent care
    at the end of life and counters the stereotype that care is exclusively gendered.
  - **The Hummel Family** — A farmworker family with a feverish baby and no insurance.
    Raises the question of justice: whom does our care reach, and who bears the cost?

### Accuracy note (real, not invented)
The clinical virtue framing draws on the influential account in Beauchamp & Childress's
*Principles of Biomedical Ethics* (chapter 2, "Moral Character"), which defines a
**virtue** as an acquired, socially valued disposition involving moral motivation, and
identifies **five focal virtues** for health professionals: compassion, discernment,
trustworthiness, integrity, and conscientiousness. Their position is that
**virtues and principles are complementary**: principles define public standards for
action, while virtues shape how a clinician perceives needs, decides, and carries out
care. Care ethics' foundational criticisms of principle-based theory—its tendency toward
emotional detachment and excessive reliance on abstract impartiality—are presented
clearly alongside the principles tradition's strengths. The anatomy of care
(attentiveness, responsibility, competence, responsiveness) comes from
**Joan Tronto, *Moral Boundaries*** (1993); the broader definition ("everything we do to
maintain, continue, and repair our world") is from **Berenice Fisher & Joan Tronto (1990)**.
Origins: **Carol Gilligan, *In a Different Voice*** (1982); **Nel Noddings, *Caring*** (1984);
**Virginia Held** (2006) on care ethics as an independent moral framework;
**Eva Kittay, *Love's Labor*** (1999) on dependency work. Cross-cultural traditions of care:
Confucian **ren** and Mencius's child at the well (*Mencius* 2A6); Buddhist **karuṇā**;
**ubuntu**; Christian **caritas**; Islamic **raḥma**; the Hippocratic tradition; and
Florence Nightingale, *Notes on Nursing* (1859). Professional codes: **ANA Code of Ethics for
Nurses**, Provision 1 (compassion and respect for dignity). Aristotle's treatment of
disposition and habituation (*Nicomachean Ethics* I, II, VI).

### Learning goals
- Define a **virtue** as a stable, acquired **disposition** involving motivation,
  and distinguish it from a fleeting feeling, a natural personality trait, or a rule.
- Define **care** as a clinical virtue and describe its four-part anatomy (Tronto:
  attentiveness, responsibility, competence, responsiveness), explaining why care
  requires technical competence rather than mere sentiment.
- Identify the **five focal clinical virtues** (compassion, discernment, trustworthiness,
  integrity, conscientiousness) as practical instruments of care, distinguishing
  clinical care from mere warmth.
- Analyze clinical mentorship and habituation: how clinicians develop the capacity
  to perceive unspoken patient needs, communicate effectively, and maintain healthy
  professional boundaries.
- Examine how care **complements each of the four biomedical principles** (autonomy,
  beneficence, nonmaleficence, justice)—clarifying what a principle requires and what
  the virtue of care adds in practice.
- Recognize the **feminist origins** of care ethics and its cross-cultural presence,
  connecting the virtue of care to **justice** for paid and unpaid caregivers.
- Explain why **sustainable care** requires institutional support, showing how burnout
  and moral injury reflect workplace conditions rather than individual moral failure.

### Slide-by-slide

**Act 0 — Orchard Falls**
1. **[T]** Title — "The March Practice" (art: the clinic on a snowy main street).
   Introduces the setting and the double meaning: a practice is both a physical
   clinic and the continuous habit through which a virtue is cultivated.
2. **[T]** Meet Dr. March — "I am not a warm person. I don't do cheerful bedside small talk." Dr. Jo March establishes that clinical care is an acquired virtue grounded in attentiveness and competence, not an outgoing personality trait.
3. **[P]** Belief probe (start) — 5 value statements revisited at the close.

**Act 1 — Nobody broke a rule**
4. **[T]** "I Was Processed" — Mr. Laurence is discharged with flawless quality metrics and zero chart violations in eleven minutes, yet leaves clutching a packet he cannot read: "I was processed." Sets up the central bedside reality: every clinical box was checked, but nobody looked him in the eye.
5. **[T]** Why rule-following falls short — Autonomy became paperwork (getting a signature); beneficence became drug titration without asking what he feared about going home alone. Cultivating the virtue of care is not an optional extra added to principles; it is the clinical perceptual faculty that makes genuine adherence to the four principles possible.
6. **[C]** **Principles vs Virtues** — Principles provide public, verifiable action-guides for *what to do*; virtues provide acquired character traits for *how to be*. In clinical ethics, they support and complete one another.
7. **[Q · MCQ]** What did the mechanical discharge lack? (answer: the clinical character and attentiveness that allow principles to be genuinely fulfilled at the bedside; distractors: valid informed consent was missing / wrong clinical drugs / unfair patient prioritization).

**Act 2 — Cultivating virtue through mentorship**
8. **[T]** **Virtue as an acquired disposition** — A virtue is a stable, cultivated habit of character, not a temporary mood or an innate personality trait. Jo notes that while she lacks an easy, effusive bedside manner, she has trained herself to listen closely and follow through reliably.
9. **[T]** **How virtue is cultivated** — Jo learns clinical character in three progressive stages: first from family/parents (observing Marmee care for sick neighbors), then from mentors (correcting early mistakes), and finally through self-habituation (sitting at every bedside until it became second nature).
10. **[T]** **Mentorship in clinical care** — Clinicians develop character through guided feedback from experienced peers. Helping a capable, protocol-driven resident learn to look beyond the computer screen to perceive the human being.
11. **[V]** **"You're the Mentor: Rounds with Amy" (`<phil-mentor>`)** — The student steps into Dr. Jo March's role to debrief three realistic clinical encounters with resident Amy (presence vs. screen, responsiveness vs. schedule, sustainable care vs. martyrdom). Mentoring feedback must diagnose Amy's blind spot while modeling the virtue of care toward Amy as a learner.
12. **[T]** **Care and clinician flourishing** — Aristotelian eudaimonia: why cultivate a virtue at all? The ancient answer concerns the caregiver as much as the patient. Practicing genuine care brings purpose and fulfillment, protecting against moral injury and burnout.
13. **[Q · Checkset]** Which statements are true of a moral virtue? (correct: a stable disposition of character / acquired through repeated practice / involves moral motivation, not just outward compliance; distractors: an innate temperament / a momentary emotional state / a set of codified rules).

**Act 3 — The anatomy of care**
14. **[T]** **Care as skilled labor** — Hannah arriving at a rural doorstep at dusk shows that clinical care is not a slogan or warm sentiment, but demanding, skilled physical and emotional labor to sustain vulnerable human lives.
15. **[T]** **The four phases of care (Tronto)** — Illustrated directly through Beth's clinic visit: 1) Attentiveness (noticing her silence), 2) Responsibility (stepping in rather than passing it to night shift), 3) Competence (accurate medication titration), and 4) Responsiveness (checking how the care landed with Beth).
16. **[T]** **The instruments of care** — Five focal virtues serve as practical instruments of care: compassion (attuned perception of suffering), discernment (sound judgment in ambiguous situations), trustworthiness (earning confidence), integrity (coherence of values and action), and conscientiousness (diligent effort).
17. **[C]** **Care vs Warmth** — Warmth is a natural temperament that varies by personality; care is a learned, reliable clinical disposition grounded in attentiveness and technical competence.
18. **[Q · Cloze]** A virtue is a stable _disposition_ of character. Care involves emotional _commitment_ and a willingness to _act_. Without technical _competence_, good intentions become sentimentality.
19. **[Q · MCQ]** Which scenario illustrates care in its full sense? (answer: a clinician who notices Beth has stopped asking questions, investigates why, adjusts the plan, and checks how she feels; distractors: an acquaintance who feels deep sympathy but takes no action / a resident who orders tests without speaking to the patient / a family member who overrides a patient's clear refusal).

**Act 4 — Boundaries, paternalism, and sustainable care**
20. **[C]** **Detachment vs Over-involvement** — Detachment reduces patients to clinical data and charts; over-involvement leads clinicians to overstep boundaries, sacrifice essential rest, and risk poor judgment. Both extremes harm patient care.
21. **[T]** **Paternalism as misdirected care** — When caregivers assume they know what is best and stop listening to the patient, care degenerates into control. Meg's instinct to manage Aunt March's living arrangements highlights the danger of caring for someone while ignoring their expressed wishes.
22. **[T]** **The dilemma of the soup** — Jo has soup on a freezing Sunday and knows Mr. Laurence is home alone. Contrasts strict professional codes against dual relationships with the human demands of small-town community practice, leaving the tension unresolved for the poll.
23. **[Poll]** Decision point: The soup — Should Jo bring soup to her elderly neighbor? Evaluates the dilemma; debrief explains how practical discernment and explicit role communication navigate dual relationships.
24. **[T]** **When care becomes martyrdom** — Laurie works his tenth consecutive ICU shift with a fever. Poses the question of limits: an exhausted, sick clinician cannot protect patients, showing that care without boundaries destroys the caregiver.
25. **[Q · MCQ]** Evaluating over-involvement — Evaluates Laurie working sick; debrief explains that when healthcare systems rely on heroic self-sacrifice, the institution—not clinician character—is failing.

**Act 5 — Care and the biomedical principles**
26. **[T]** **Autonomy and non-abandonment** — When Aunt March refuses hospital admission,
    respect for autonomy requires accepting her decision. The virtue of care adds
    non-abandonment: staying involved, creating a home-based care plan, and supporting
    her family care network.
27. **[T]** **Beneficence and responsiveness** — When Beth apologizes for taking up staff
    time, beneficence aims to improve her health. Care attends to what benefit means to
    her specifically, addressing her fear of being a burden.
28. **[T]** **Justice and the care economy** — Hannah's hourly agency wages and Meg's
    unpaid domestic labor show that care is economically vulnerable and unevenly distributed.
    Care at the bedside must be matched by structural justice for care workers.
29. **[T]** **Origins and traditions of care** — Feminist philosophers (Gilligan, Noddings,
    Held) recovered care as a central moral voice that ethical theory had neglected. Care
    is also reflected across cultural traditions, including Confucian *ren*, Buddhist
    *karuṇā*, *ubuntu*, and early nursing traditions.
30. **[C]** **What care corrects vs What principles protect** — Care ethics warns against
    impersonal detachment, rigid formulas, and ignoring emotion; principles protect
    against favouritism, bias, and paternalistic overreach.
31. **[Q · MCQ]** What does the virtue of care add to respecting a patient's treatment
    refusal? (answer: continued clinical presence, relational support, and collaborative
    planning; distractors: persuading the patient until they change their mind /
    withdrawing completely once the waiver is signed / overriding the decision for their
    own good).
32. **[Q · Cloze]** Principles and virtues are _complementary_. Care ethics cautions
    against excessive _impartiality_ and the neglect of _emotion_. Clinicians owe
    attentive care to their _patient_, while public _justice_ governs resource distribution.

**Closing rounds**
33. **[P]** Belief probe (revisit) — Revisit the opening statements to reflect on shifts
    in understanding.
34. **[T]** Jo's closing — "A practice is not an accident of language." Summary: virtue
    is built through disciplined habituation; care combines emotional commitment with
    technical competence; boundaries protect both patient and clinician; and virtues
    give living warmth to biomedical principles.

### Belief-probe statements (start; revisited at end)
1. Caring is a personality trait: some people have it and some don't.
2. A clinician who follows every guideline correctly has done their job, whether or
   not the patient felt cared for.
3. It is possible to care *too much*, and that is a real professional failing, not
   just a strength taken too far.
4. Care is mostly about feelings; competence is a separate matter.
5. Whether clinicians can care for patients well depends more on how their
   workplace is run than on their own character.

### Comparisons (where each `<phil-compare>` lives)
Principles vs Virtues (6) · Care vs Warmth (17) · Detachment vs Over-involvement
(20) · What care corrects vs What principles protect (30).

### Interactive widget
**`<phil-mentor>` ("Rounds with Amy")** — A dialogue-driven mentoring widget. The learner
acts as Dr. Jo March debriefing three clinical encounters with resident Amy.
- *Round 1 (Presence vs Screen):* Amy successfully reconciled Mr. Laurence's complex
  medications on her tablet, but failed to notice his distress and crushed discharge
  papers. Learner coaches her on presence and attentiveness.
- *Round 2 (Responsiveness vs Procedure):* Beth apologized for taking up clinic time, and
  Amy responded with a cheerful comment about scheduling slots. Learner coaches Amy on
  hearing unspoken patient vulnerability.
- *Round 3 (Sustainable Care vs Burnout):* Amy considers emulating Laurie's exhausted,
  limitless shifts to prove her dedication. Learner helps her understand why healthy
  boundaries are necessary for enduring clinical competence.
Each option demonstrates a distinct feedback style: cynical/punitive, superficial/procedural,
or virtuous mentorship that balances high standards with compassionate teaching.

### Decision points (`<phil-poll>`, ungraded)
The soup (23) — Navigating dual relationships and boundaries in community healthcare.

### Art assets (16-bit PNGs)
`jo-march`, `marmee`, `meg`, `beth`, `amy`, `laurie`, `mr-laurence`, `aunt-march`,
`hannah`, `john-brooke`, `hummel-family`; scene `orchard-falls`. Real thinkers (Beauchamp &
Childress, Tronto, Gilligan, Noddings, Mencius, Nightingale) get idea-emblem relic cards,
never portraits. Prompts in `prompts.md`.

### Sources to cite (so nothing is invented)
- Beauchamp & Childress, *Principles of Biomedical Ethics*, ch. 2 "Moral Character"
  (virtue defined; five focal virtues; care and the ethics of care; virtues and
  principles as complementary).
- Aristotle, *Nicomachean Ethics* I.7, II.1, II.6, VI; *Politics* I.2.
- Joan Tronto, *Moral Boundaries* (1993); Berenice Fisher & Joan Tronto, "Toward a
  Feminist Theory of Caring" (1990).
- Carol Gilligan, *In a Different Voice* (1982); Nel Noddings, *Caring* (1984);
  Virginia Held, *The Ethics of Care* (2006); Eva Kittay, *Love's Labor* (1999).
- *Mencius* 2A6 (the child at the well); Florence Nightingale, *Notes on Nursing*
  (1859); ANA *Code of Ethics for Nurses*, Provision 1.

### Counts (target)
~34 slides. 8 graded (4 MCQ, 1 checkset, 2 cloze, +1 case MCQ) + 1 poll + 1 interactive
mentor widget + 4 comparisons ≈ 40% interactive. Vary correct-answer positions and balance
option lengths; run `node tools/validate-quizzes.mjs` before commit.

### Decisions made while building
- Replaced `<phil-mean>` with `<phil-mentor>` ("Rounds with Amy") to focus on habituation
  and guided clinical growth rather than the geometric doctrine of the mean.
- Mentioned Beauchamp & Childress up front as the foundational framework, keeping subsequent
  slides focused on clinical concepts rather than repeated citations.
- Structured narrative and dialogue in a grounded, realistic clinical voice, avoiding
  overly theatrical or staccato conclusions.
- All twelve cast and scene portraits generated in 2x2 grids, split to 512×512 PNGs, and
  placed in `assets/`.

---

## AI Ethics: Technomoral Virtues — "Growing Up in Springfield"

- **Path:** `lessons/ai-ethics/technomoral-virtues/`
- **Lesson id:** `ai-ethics-technomoral`
- **Subject:** `Technomoral Virtues`
- **Cast:** The Simpsons family (Homer, Marge, Bart, Lisa, Maggie, Ned Flanders, Mr. Burns).
- **Core scenario:** You step into Homer and Marge's shoes raising children as Springfield shifts from the media landscape of 1989 (broadcast TV, copper landlines, arcade coin-ops) to today (algorithmic feeds, generative AI, doomscrolling, surveillance capitalism).
- **Philosophy:** Classical virtue traditions (Aristotle's eudaimonia and hexis, Confucian ren and li, Buddhist upāya) integrated with Shannon Vallor's *Technology and the Virtues: A Philosophical Guide to a Future Worth Wanting* (2016).

### Outline

**Act 0 — Welcome to 742 Evergreen Terrace**
1. **[T]** Title — "Growing Up in Springfield" (art: Homer contemplating a donut). Introduces the shift from 1989 broadcast television to modern algorithmic environments.
2. **[T]** Parenting at the breaking point (art: Marge). Marge struggles to maintain traditional household rules as portable digital media bypasses domestic boundaries.
3. **[P]** Belief probe (start) — 5 value statements on digital limits, rules, technology neutrality, engagement algorithms, and new virtues.

**Act 1 — What happened to Bart's world?**
4. **[T]** What happened to Bart's world? (art: Bart). Contrasts the shared living room CRT television of 1989 with individualized, 24/7 personalized mobile immersion.
5. **[T]** Rules as developmental scaffolding — External boundaries protect cognitive space and sleep, but their true ethical role is scaffolding that helps adolescents build internal self-regulation over time.
6. **[C]** **Rules vs Virtues in Digital Life** — External scaffolding that safeguards habits while developing vs. internal dispositions and discernment that govern choices when young people are on their own.
7. **[Q · MCQ]** The developmental role of rules (answer: rules serve as temporary scaffolding that protects cognitive space and sleep, helping adolescents gradually internalize self-regulation; distractors: rules are completely futile / rules permanently substitute for character / rules require total consensus).

**Act 2 — Classical roots of character**
8. **[T]** **Virtue as an acquired disposition** (art: Homer). Aristotle's hexis: virtue is a stable character habit built through ongoing practice, not a fleeting mood or genetic trait.
9. **[T]** **The doctrine of the mean** — Navigating between deficiency and excess: courage between cowardice and rashness; temperance between Homer's indulgence and Flanders' joyless austerity.
10. **[T]** **Cross-cultural traditions of virtue** — Confucian ren and li (Marge's family attunement); Buddhist upāya and karuṇā (skillful means and compassionate adaptability).
11. **[T]** **Re-evaluating Bart's virtues** (art: Bart). Looking beyond vices to recognize Bart's loyalty, tactical creativity, and courage in challenging hypocritical authority.
12. **[Q · Checkset]** Core tenets of virtue ethics across traditions (acquired habituation / human flourishing / moral motivation; distractors: fixed genetics / algorithmic rules / emotional isolation).

**Act 3 — Shannon Vallor's technomoral virtues**
13. **[T]** **New tools, new habits** (art: Lisa). Shannon Vallor (2016): why unprecedented technological scale and opacity demand adapted technomoral virtues.
14. **[T]** **Technomoral self-control** — Cultivating intentional cognitive attention against commercial algorithms engineered to trigger compulsive dopamine loops.
15. **[T]** **Technomoral honesty** — Seeking truth and authentic communication amid deepfakes, AI text generators, and viral rage-bait.
16. **[T]** **Technomoral empathy** — Seeing and honoring the vulnerable human reality behind screens, avatars, and comment threads.
17. **[Q · Cloze]** A virtue is a stable _disposition_. Technomoral self-control protects _attention_. Technomoral honesty seeks _truth_. Digital empathy perceives the _human_ behind the screen.
18. **[Q · MCQ]** Recognizing digital empathy (answer: pausing before responding to hostile comments to consider real distress; distractors: automated sentiment scoring / public shaming / unfollowing all disagreement).

**Act 4 — Parenting in the digital age**
19. **[V]** **"Parenting in Springfield" (`<phil-parent>`)** — Interactive debrief of 3 modern digital dilemmas (Bart's AI homework, Lisa's doomscrolling, Maggie's autoplay screen). Each dilemma presents two cartoonishly bad blunders and two constructive approaches (internal reflection vs. structured environmental scaffolding).
20. **[T]** **How digital environments shape habit** (art: Maggie). Aristotle on early habituation: designing calm physical environments before conscious reflection develops.
21. **[T]** **Extractive capitalism and justice** (art: Mr. Burns). Technomoral justice resists corporate surveillance capitalism and protects vulnerable human labor.
22. **[T]** **The danger of rigid moralism** (art: Ned Flanders). Technomoral flexibility vs. brittle rulebooks when confronting novel, ambiguous technologies.
23. **[Poll]** Decision point: School phone bans — Evaluating bell-to-bell bans vs. gradual autonomy in an actively evolving area of developmental research.
24. **[T]** **Technomoral wisdom (phronesis)** — The master virtue that integrates self-control, honesty, and empathy into situational real-time judgment.
25. **[Q · MCQ]** The defining role of technomoral wisdom (answer: it acts as an integrative master virtue that harmonizes specific virtues to guide practical judgment in novel situations; distractors: a mechanical quantitative algorithm / total rejection of technology / an isolated skill for computer scientists).

**Act 5 — The future worth wanting**
26. **[T]** **Technomoral perspective** (art: Lisa). Distinguishing technological novelty, speed, and optimization from genuine human flourishing.
27. **[T]** **Technomoral care and stewardship** — Sustained moral commitment to repair digital systems and protect ecological commons from massive energy/water footprints.
28. **[C]** **Technochauvinism vs Technomoral Wisdom** — Solutionist belief that every problem has an algorithmic app fix vs. discerning which goods require embodied human presence.
29. **[Q · Cloze]** Master virtue is _phronesis_. Technochauvinism assumes solutions must be an _algorithm_. Perspective targets human _flourishing_. The goal is a future worth _wanting_.

**Closing rounds**
30. **[P]** Belief probe (revisit) — Reflecting on shifts in perspective across the five statements.
31. **[T]** The living room couch (art: Homer). Character as the true compass: human virtues, patiently cultivated, are our greatest safeguard for an uncharted future.

---

## Bioethics: Thomson's Thought Experiments — "Six Impossible Things Before Breakfast"  *(built)*

- **Path:** `lessons/bioethics/thomson-thought-experiments/`
- **Lesson id:** `thomson-thought-experiments`
- **Subject (catalog):** `Thought Experiments (Thomson)`
- **Topic:** Bioethics first, but built in detachable acts so it can be taught
  elsewhere (see "Teaching it outside bioethics" below).
- **Approach:** Method-first, and Thomson's own cases do the heavy lifting.
  Each case gets the same treatment: state it in her words, take a vote, name the
  claim it targets, then **turn the knobs** (Dennett, after Hofstadter) to see
  whether the intuition survives. The through-line is that **Thomson turned her
  own knobs**. She answered her critics with new cases (people-seeds) and, in
  2008, reversed her own verdict on the trolley bystander.
- **Frame (light touch):** The White Queen in *Through the Looking-Glass* (1871,
  public domain) says she has believed "as many as six impossible things before
  breakfast." That line opens and closes the lesson, and the six covered dishes
  in the title art are Thomson's six cases. Carroll's world shows up only in the
  art. The White Knight's contraption stands in for Dennett's knob-turning,
  since real thinkers get relic cards, not portraits. Nobody from Carroll
  narrates, there are no Carroll quotes beyond the title and recap, and the
  slide text is about Thomson.
- **The six impossible things:** (1) the violinist, (2) Henry Fonda's cool hand,
  (3) the tiny house, (4) the people-seeds, (5) the bystander who could turn the
  trolley onto himself, (6) the killing that happens at no clear time.
- **Recurring device — "Turn the knob":** after each case, a slide or widget
  step changes exactly one detail and asks whether the verdict moved. A ⚙ glyph
  marks knob moments.
- **Thinkers covered:** Judith Jarvis Thomson (main); Daniel Dennett and Douglas
  Hofstadter (intuition pumps, knobs); Philippa Foot (trolley origin); Galileo
  (warm-up case). Critics and interlocutors: Mary Anne Warren, John Finnis,
  Rosalind Hursthouse, Frances Kamm, Rebecca Dresser, Ronald Dworkin. Skeptics
  of the method: Kathleen Wilkes, Schwitzgebel & Cushman, Allen Wood.
- **Cross-references:** `trolley-and-triage` teaches switch, footbridge, loop,
  transplant, and double effect in depth. This lesson recaps them in one line and
  covers what that lesson doesn't. Also `moral-status` (personhood, which Thomson
  brackets), `patient-autonomy` (refusal, advance directives), and
  `harm-principle` (bodily sovereignty).

### Accuracy note (real, not invented)
- **Thomson** (1929–2020) taught at MIT. "A Defense of Abortion,"
  *Philosophy & Public Affairs* 1:1 (1971) contains the violinist, the
  expanding child in the tiny house, Henry Fonda's cool hand, the people-seeds,
  the burglar, the box of chocolates, the coat that belongs to Smith, and the
  Good Samaritan / Minimally Decent Samaritan distinction. It predates *Roe v.
  Wade* (1973).
- Thomson **grants that the fetus is a person from conception** for the sake of
  argument. Her conclusions are limited, and the slides must say so:
  - The right to life is not a right to be given use of another person's body.
  - Some abortions would still be indecent (her example: the seventh month, to
    avoid postponing a trip abroad).
  - Her argument gives no right to *secure the death* of a fetus that could
    survive detachment.
- **Trolley origin:** Philippa Foot, "The Problem of Abortion and the Doctrine
  of the Double Effect," *Oxford Review* 5 (1967). The trolley case was born in
  an abortion paper, with a *driver*. Thomson coined "the trolley problem" in
  "Killing, Letting Die, and the Trolley Problem," *The Monist* 59 (1976), which
  also has the transplant surgeon. "The Trolley Problem," *Yale Law Journal* 94
  (1985) adds the bystander, the footbridge, and the loop. "Turning the Trolley,"
  *Philosophy & Public Affairs* 36 (2008) reverses her bystander verdict using a
  three-option variant in which the bystander could turn the trolley onto
  himself. Kamm replies in *The Trolley Problem Mysteries* (2015).
- **Intuition pump** is Dennett's coinage, from his 1980 *Behavioral and Brain
  Sciences* commentary on Searle's Chinese Room. *Intuition Pumps and Other Tools
  for Thinking* (2013) credits Hofstadter (*The Mind's I*, 1981) with the advice
  to "turn all the knobs" and see whether the same intuitions still get pumped.
  "Boom crutch" is Dennett's term for a thinking tool that backfires.
  **Verify the exact wording and page before quoting either phrase.**
- Other Thomson papers used: "The Time of a Killing," *Journal of Philosophy* 68
  (1971); "The Right to Privacy," *Philosophy & Public Affairs* 4 (1975);
  "Parthood and Identity Across Time," *Journal of Philosophy* 80 (1983);
  "Self-Defense," *Philosophy & Public Affairs* 20 (1991).
- **Verify before quoting:** Thomson's "crazy metaphysic" phrase for temporal
  parts (1983); Warren's claim that Thomson's argument settles only rape cases
  (1973); the *McFall v. Shimp* judge calling the refusal "morally indefensible";
  Wood's trolley critique (in Parfit, *On What Matters*, vol. 2, 2011).
- **Avoid** Thomson's Kitty Genovese example unless it carries a correction: the
  "38 silent witnesses" story she relied on was later shown to be largely wrong.

### Learning goals
- Define a **thought experiment** and explain three jobs it does in moral
  reasoning: counterexample to a general principle, isolating one variable, and
  feeding **reflective equilibrium**.
- Explain Dennett's **intuition pump** and Hofstadter's **knob-turning** test,
  and use it to tell a case that tracks the feature it claims to test from one
  that rides on a hidden detail (a **boom crutch**).
- Reconstruct Thomson's violinist argument: the conceded premise, the
  distinction between a right not to be killed unjustly and a right to be given
  what one needs, and the **Good Samaritan / Minimally Decent Samaritan** line.
- Say what the tiny house and the people-seeds each target (the "extreme view";
  the consent objection), and state the strongest replies: killing vs. letting
  die, special parental duties, Hursthouse's virtue critique.
- Locate the trolley problem's origin in the abortion debate, explain the
  driver/bystander knob, and explain why Thomson reversed herself in 2008.
- Apply Thomson's other work to bioethics: bodily-integrity law (compelled
  donation, forced cesarean), the timing of delayed deaths, and identity across
  time in **advance directives**.
- Weigh the skeptics: framing and order effects, bizarre cases, and distance
  from real decisions.

### Slide-by-slide (36)

**Act 0 — Breakfast**
1. **[T]** Title — "Six Impossible Things Before Breakfast" (`white-queen`). The
   Queen's line, once. Philosophers believe impossible things on purpose, to
   learn about possible ones. Six of Thomson's cases are on the menu.
2. **[T]** Who was Judith Jarvis Thomson? (`relic-thomson`). MIT moral
   philosopher and metaphysician, known for cases that other philosophers still
   argue about. `reveal`: the violinist; she named the trolley problem; privacy;
   identity across time.
3. **[P]** Belief probe (statements below).

**Act 1 — A laboratory in the head** *(detachable: intro to method)*
4. **[T]** Galileo's two stones (`looking-glass-lab`). If heavy things fall
   faster, two stones tied together should fall both faster and slower. The
   theory contradicts itself, and no tower was needed. Definition: an imagined
   case built to test a claim by what we judge would happen in it, or would be
   right in it. `reveal`.
5. **[T]** Why ethics uses them. `reveal`: (1) one clear counterexample can sink
   a general principle; (2) an imagined case can hold everything fixed but one
   detail, like a controlled experiment; (3) **reflective equilibrium**: adjust
   principles and case verdicts against each other until they fit (Rawls).
6. **[T]** Intuition pumps and knobs (`white-knight`, `relic-dennett` inline).
   Dennett's term: a case built to produce one intuition. Hofstadter's advice:
   turn the knobs one at a time. If the verdict flips when an irrelevant knob
   turns, the pump was misleading you. `reveal`.
7. **[C]** *A good pump vs. a boom crutch.* Good: the verdict moves only when the
   feature under test moves. Boom crutch: the verdict rides on vividness, a
   sympathetic victim, loaded wording, or a detail nobody meant to include.
8. **[Q · MCQ]** A case is offered to show that *consent* is what makes a burden
   permissible. What is the best knob test? (✓ Build a twin case that differs
   only in consent. ✗ Make the case more vivid. ✗ Poll a larger group. ✗ Add
   realistic detail until it resembles a real case.)

**Act 2 — The violinist** *(impossible things #1 and #2)*
9. **[T]** The violinist (`violinist`). `reveal`: first the argument she was
   answering (the fetus is a person; persons have a right to life; that right
   outweighs a woman's right over her body). Then her move: **grant the first
   premise**. Then the case, close to her words: the Society of Music Lovers, the
   kidney ailment, your blood type, nine months.
10. **[Poll]** Must you stay plugged in? (Must stay / May unplug, but staying
    would be kind / May unplug, nothing further owed / Depends on how long.)
    `explain=`: Thomson's verdict and her reason, shown to everyone.
11. **[T]** What is a right to life? (`humpty-dumpty`, a lecturer on a wall
    between two signposts). `reveal`: a right not to be killed unjustly vs. a
    right to be given whatever you need. Only the second would require you to
    stay plugged in, and Thomson says no one has it. Unplugging doesn't kill the
    violinist *unjustly*.
12. **[T]** Henry Fonda's cool hand (`cool-hand`). If only his touch will save
    you, you still have no right to it. But if he is just across the room, he'd
    be a cad not to cross it. `reveal`: the one-hour violinist, where decency asks
    for the hour but he still has no right to it.
13. **[C]** *Good Samaritan vs. Minimally Decent Samaritan.* Nine months vs. one
    hour. The box of chocolates as the contrast case: there, refusing *is*
    unjust, because the chocolates were given to both brothers.
14. **[Q · MCQ]** Why does Thomson grant that the fetus is a person? (✓ To show
    the argument fails even if its most disputed premise is true. ✗ Because she
    believed personhood begins at conception. ✗ To show personhood never matters
    morally. ✗ To concede that most abortions are wrong.)
15. **[Q · Cloze]** A right to life is a right not to be killed *unjustly*; it is
    not a right to use another person's *body*. Thomson asks only that we be
    *Minimally Decent* Samaritans, not *Good* ones.

**Act 3 — Thomson turns her own knobs** *(impossible things #3 and #4)*
16. **[T]** The tiny house (`rabbit-house`). You are trapped in a tiny house with
    a child who is growing; you will be crushed, and he will walk out. `reveal`:
    a bystander may say "we can't choose between you," but the person in the
    house may act; the coat that belongs to Smith. Target: the extreme view that
    abortion is wrong even to save the woman's life. She returns to innocent
    threats in "Self-Defense" (1991).
17. **[T]** ⚙ The critics' first knob: consent. The violinist was kidnapped, and
    most pregnancies don't begin that way. `reveal`: the responsibility
    objection; Warren's verdict that the argument works cleanly only for rape.
18. **[T]** The people-seeds (`people-seeds`). Thomson turns the consent knob
    herself: fine mesh screens, one defective; the burglar through the window
    opened for air. Does a precaution that fails give the seed a right to your
    house? `reveal`.
19. **[T]** ⚙ The knobs she didn't turn. `reveal`: killing vs. letting die
    (unplugging withdraws support, but most abortion methods don't: Finnis);
    stranger vs. your own child (special duties); a medical kidnapping vs. a
    normal bodily process; Hursthouse: rights-talk skips what a good person would
    do.
20. **[V]** **The Knob Board** (`<phil-knobs>`, `white-knight`; spec below).
21. **[Q · Checkset]** Which are Thomson's own claims? ✓ She grants personhood
    for the argument. ✓ Some abortions would be indecent. ✓ The right to life
    doesn't guarantee use of another's body. ✓ Her argument gives no right to
    secure the fetus's death. ✗ The fetus is not a person. ✗ Every abortion is
    permissible. ✗ Consent is irrelevant to what we owe. ✗ Her argument depends
    on the fetus lacking consciousness.
22. **[T]** In the clinic. Thomson's principle outside abortion. `reveal`:
    *McFall v. Shimp* (Pa. 1978), where a court refused to compel bone-marrow
    donation to a dying cousin; no organ retrieval, even after death, without
    authorization; *In re A.C.* (D.C. 1990), where a forced cesarean was ruled
    wrong.
23. **[Poll]** Which knob moves your own verdict most? (Consent / Relationship /
    Killing vs. letting die / Length of the burden.) `explain=` is the same for
    everyone: these are the four places the debate actually lives.

**Act 4 — The trolley, turned around** *(impossible thing #5; detachable for
intro ethics)*
24. **[T]** The surprise origin (`trolley-driver`, `relic-foot` inline).
    `reveal`: Foot's 1967 *abortion* paper, with a driver; Thomson names it in
    1976 and adds the surgeon; 1985 brings the bystander, footbridge, and loop.
    One line pointing to "The Switch and the Scalpel" for the full tour.
25. **[C]** *Driver vs. bystander.* The driver kills either way, so it's one
    death vs. five. The bystander who does nothing only lets five die. This is
    the killing / letting-die knob again, the same one the critics turned on the
    violinist. `class="case"` on the bystander side: clinical ethics (AMA Code,
    Opinion 5.3) treats withholding and withdrawing life support as equivalent,
    though philosophers still argue about doing vs. allowing.
26. **[Poll]** You're the bystander. Turn the trolley? (Turn / Don't turn.)
27. **[Poll]** ⚙ Thomson's 2008 knob (`three-tracks`). A third track holds
    *you*. (Turn onto the one / Turn onto yourself / Do nothing.)
28. **[T]** Thomson changes her mind. `reveal`: if you wouldn't pay the cost
    yourself, you may not make the one pay it, so the bystander may not turn. The
    driver still may. Maybe there was never a trolley *problem*. Kamm and others
    were unconvinced. Changing your mind for a stated reason is part of the
    method.
29. **[Q · MCQ]** What did Thomson change in 2008? (✓ She gave the bystander the
    option of turning the trolley onto himself. ✗ She made the one person
    responsible for the danger. ✗ She swapped the switch for a push from a
    bridge. ✗ She made the bystander a surgeon with five patients.)

**Act 5 — Time and identity** *(impossible thing #6; detachable for
metaphysics)*
30. **[T]** The time of a killing (`hatter-watch`). A shoots B on Monday, A dies
    Tuesday, B dies Wednesday. When did A kill B? It can't be Wednesday, since A
    was dead by then. `reveal`: bioethics version: a death days after a treatment
    decision. Who caused it, and when?
31. **[T]** One person, two selves (`two-selves`). Thomson (1983) rejects the
    view that you are a series of temporal parts. `reveal`: an advance directive
    is one person speaking for a later self; Margo, Firlik's real patient with
    dementia, content now; Dworkin says honor the earlier self's critical
    interests, Dresser says protect the present patient.
32. **[Poll]** Margo gets pneumonia. Her old directive refuses treatment. (Honor
    the directive / Treat her, since she's content now / It depends on what "she"
    means.)
33. **[Q · MCQ]** Which view gives an advance directive authority over a later,
    contented patient? (✓ Dworkin: the earlier self's critical interests govern.
    ✗ Dresser: the present patient's interests govern. ✗ Temporal parts: each
    stage owns only its own choices. ✗ Thomson: rights over the body lapse with
    capacity.)
    **[B]** Branch after this slide: "Thomson on privacy?" →
    **[opt]** "The Right to Privacy" (1975): privacy is not one right but a
    cluster derived from rights over your person and property (the X-ray device
    that sees into your safe). Rachels and Scanlon reply. Application: genetic
    data, where "your" information is also your relatives'. (Not counted in 36.)

**Act 6 — After breakfast**
34. **[Q · Cloze]** Glossary: *intuition pump*; turn the *knobs*;
    *counterexample*; reflective *equilibrium*; *boom crutch*.
35. **[T]** Does the method survive its critics? (`white-queen`). `reveal`:
    framing and order effects, even for professional philosophers (Petrinovich &
    O'Neill; Schwitzgebel & Cushman); bizarre cases (Wilkes); trolleys far from
    real life (Wood). Then Thomson's toolkit as the answer: grant your opponent's
    strongest premise, build the counterexample, turn your own knobs before your
    critics do, separate what's owed from what's decent, and change your mind
    when a new knob shows up.
36. **[P]** Belief probe review.

### Belief-probe statements (start; revisited at end)
1. Made-up cases, however strange, can teach us something true about real moral
   decisions.
2. If someone has a right to life, others must give them whatever they need to
   stay alive.
3. If you knowingly took a risk, you're responsible for what follows, even if
   you took precautions.
4. A bystander may turn a runaway trolley so it kills one person instead of five.
5. A written advance directive should bind a later version of you who no longer
   remembers writing it.

### Comparisons (where each `<phil-compare>` lives)
Good pump vs. boom crutch (7) · Good Samaritan vs. Minimally Decent Samaritan
(13) · Driver vs. bystander (25).

### Decision points (`<phil-poll>`, ungraded)
The violinist (10) · Which knob moves you (23) · Bystander (26) · Three tracks
(27) · Margo (32). Moral verdicts are never graded; MCQs ask only what a
position claims or what a case changes.

### New interactive viz to build
**`<phil-knobs>` ("The Knob Board")** — a console of five knobs with 2–3 detents
each:
- **How you got connected:** kidnapped / precautions failed / invited, knowing
  the risk
- **How long:** one hour / nine months / nine years
- **Who they are:** a stranger / your own child
- **What ending it takes:** unplugging / actively killing
- **Risk to your life:** none / grave

Readouts: the nearest named case (violinist, one-hour violinist, people-seeds,
burglar, tiny house, or "the critics' case": your own child, invited, killing),
Thomson's verdict for that case, and the strongest objection to it. After each
turn the student answers "Did your verdict change?" (yes/no). The end screen
lists the knobs they said mattered, which sets up the poll at slide 23. Data is
per knob plus a small table of named cases matched by nearest distance, not one
entry per combination (there are 72). Ungraded. Lives in `assets/thomson.js`;
use `phil-dense` and the two-column grid from `switchboard.js`. Written so later
thought-experiment lessons (experience machine, Chinese Room, Mary's room) can
reuse it with new JSON.

### Art assets (in `assets/`, generated 2026-09-23)
| Asset | Slide(s) | Status |
|---|---|---|
| `white-queen.png` | 1, 35 | ✓ |
| `relic-thomson.svg` | 2 | ✓ |
| `looking-glass-lab.png` | 4 | ✓ |
| `white-knight.png` | 6, 20 | ✓ |
| `relic-dennett.svg` | 6 | ✓ |
| `violinist.png` | 9 | ✓ The violinist has long hair and reads as a woman. Write the alt text to match, or say "the violinist" without a pronoun. |
| `humpty-dumpty.png` | 11 | ✓ Drawn as a stout man, not an egg. Fine, since the slide never names Humpty. |
| `cool-hand.png` | 12 | ✓ Anonymous hand, no likeness. |
| `rabbit-house.png` | 16 | ✓ Shows Carroll's scene, a giant arm through the window. The alt text should describe that, not Thomson's version. |
| `people-seeds.png` | 18 | ✓ |
| `trolley-driver.png` | 24 | ✓ Five on the left, one on the right. |
| `relic-foot.svg` | 24 | ✓ |
| `three-tracks.png` | 27 | ⚠ Shows a four-way crossing with groups of six and three and a figure off-track. It doesn't match the five / one / yourself case. Regenerate, or build the slide as a small inline SVG diagram. |
| `hatter-watch.png` | 30 | ⚠ Roman numerals on the watch face. Minor, but it breaks the no-numbers rule. |
| `two-selves.png` | 31 | ✓ The left figure is already grey-haired, so the age gap reads smaller than intended. |
| `caterpillar.png` | — | ✗ Unused. The Alice in it has the 1951-film look that `prompts.md` forbids. |

### Sources to cite (so nothing is invented)
- Judith Jarvis Thomson, "A Defense of Abortion" (1971); "The Time of a Killing"
  (1971); "The Right to Privacy" (1975); "Killing, Letting Die, and the Trolley
  Problem" (1976); "Parthood and Identity Across Time" (1983); "The Trolley
  Problem" (1985); "Self-Defense" (1991); "Turning the Trolley" (2008).
- Philippa Foot, "The Problem of Abortion and the Doctrine of the Double
  Effect" (1967).
- Daniel Dennett, BBS commentary on Searle (1980); *Intuition Pumps and Other
  Tools for Thinking* (2013). Hofstadter & Dennett, *The Mind's I* (1981).
- Galileo, *Two New Sciences* (1638); John Rawls, *A Theory of Justice* (1971).
- Mary Anne Warren, "On the Moral and Legal Status of Abortion" (1973); John
  Finnis, "The Rights and Wrongs of Abortion" (1973); Rosalind Hursthouse,
  "Virtue Theory and Abortion" (1991); F. M. Kamm, *The Trolley Problem
  Mysteries* (2015).
- Rebecca Dresser, "Life, Death, and Incompetent Patients" (1986); Ronald
  Dworkin, *Life's Dominion* (1993); Andrew Firlik, "Margo's Logo," *JAMA*
  (1991).
- *McFall v. Shimp* (Pa. Ct. Com. Pl. 1978); *In re A.C.*, 573 A.2d 1235 (D.C.
  1990); AMA *Code of Medical Ethics* Opinion 5.3.
- Kathleen Wilkes, *Real People* (1988); Petrinovich & O'Neill (1996);
  Schwitzgebel & Cushman, "Expertise in Moral Reasoning?" (2012); Allen Wood in
  Parfit, *On What Matters* vol. 2 (2011).
- Lewis Carroll, *Through the Looking-Glass* (1871), public domain; title line
  and art only.

### Counts (target)
36 slides. Belief probe (start + revisit) + 7 graded (4 MCQ, 1 checkset,
2 cloze) + 5 polls + 1 viz + 3 comparisons = 18 interactive, 50%. Vary
correct-answer positions and balance option lengths; run
`node tools/validate-quizzes.mjs` and `node tools/check-density.mjs --measure`.

### Teaching it outside bioethics
- **Intro to philosophy / critical thinking:** Acts 0, 1, 4, and 6 alone make a
  ~20-slide lesson on thought experiments as a method.
- **Intro ethics:** Acts 1–4.
- **Metaphysics / philosophy of mind:** Acts 1 and 5, with the knob board
  loaded with other cases.
The act headings are the seams. Each detachable act opens by restating the
knob-turning test so it doesn't depend on Act 1.

### Open decisions before building
- **Sensitivity.** Abortion is the most contested topic in the repo. Present
  Thomson's argument and its strongest critics with equal care, never grade a
  verdict, and add an instructor note at the top of `index.html`. The belief
  probe deliberately has no statement about abortion itself.
- **Overlap with `trolley-and-triage`.** Act 4 covers only the origin, the
  driver/bystander knob, and the 2008 reversal. Confirm that's the right split.
- **Privacy as core or branch.** Currently a branch; promote it if the course
  covers health-data privacy.
- **Knob board scope.** Build it in v1, or ship slide 20 as a sequence of polls
  and add the widget later.
- **`three-tracks` art.** Regenerate or replace with an inline SVG diagram
  before building slide 27.

### As built (32 slides) — supersedes the slide-by-slide plan above
The first build followed the plan above. It was then rewritten to teach the
cases instead of pointing at them, and cut to 32 slides:

1. Title · 2. Belief probe · 3. What is a thought experiment? (Galileo)
4. The argument Thomson answered (four premises; she grants premise 2)
5. The violinist (her opening, the kidnapping) · 6. The director's speech ·
   7. "Nine years": the director's reply is the anti-abortion argument ·
   8. Poll · 9. What a right to life is · 10. Henry Fonda's cool hand ·
   11. One-hour violinist + Good / Minimally Decent Samaritan compare
12. Intuition pumps and knobs (Dennett, Hofstadter) · 13. Good pump vs.
    boom crutch · 14. MCQ: the twin-case test
15. The tiny house (with the extreme view) · 16. Smith's coat
17. The responsibility objection · 18. People-seeds and the burglar ·
    19. Where Thomson's argument stops · 20. Critics · 21. Knob board ·
    22. Checkset: what Thomson claimed · 23. Bodily rights in the clinic
24. Foot's tram and the judge · 25. Transplant surgeon and bystander ·
    26. Bystander poll · 27. Third track (inline SVG) + poll ·
    28. Thomson changes her mind
29. The same person? (Margo, Dworkin's hypothetical directive) · 30. Margo poll
31. Belief probe review · 32. Recap

**Cut in the rewrite:** the chocolates, the violinist cloze, the "why grant
personhood" / 2008 / Dworkin MCQs, the intuition-skeptics slide (one line kept
on slide 13), the time of a killing, the privacy branch, and
`three-tracks.png`, `caterpillar.png`, `humpty-dumpty.png`,
`white-knight.png`, `hatter-watch.png` (all now unused in `assets/`).

**Mix:** 2 graded (1 MCQ, 1 checkset), 5 polls, 1 viz, 2 comparisons, belief
probe. Delete the unused PNGs to trim the SCORM zip.

---

## Bioethics: Germline Gene Editing — "The Villa Diodati Clinic"  *(built)*

- **Path:** `lessons/bioethics/germline-editing/`
- **Lesson id:** `germline-editing`
- **Subject (catalog):** `Germline Gene Editing`
- **Topic:** Bioethics (genetics). Pitched at "explain it like I'm twelve": a
  few arguments taught well, not a survey.
- **Approach:** Teach the somatic/germline distinction first, because every
  argument depends on it. Then a three-item menu (fix a disease, lower a risk,
  add an advantage) turns "is germline editing OK?" into "where do you stop?"
  Two arguments for and three against, each with its own slide, picture, and
  check. No verdict is graded.
- **Frame:** A few years from now, Mary and Percy arrive at a clinic on Lake
  Geneva run by Dr. Byron. The names nod to the summer of 1816 that produced
  *Frankenstein*; the novel appears only in the last line of the recap. No
  monster or mad-scientist imagery, since that would argue the case against
  editing before the student hears it.
- **The case:** Both Mary and Percy have cystic fibrosis, so every embryo of
  theirs inherits two faulty copies. That is the rare situation where embryo
  screening cannot help, which is why editing is on the table at all.
- **Recurring devices:** the family tree (an edit, then a mistake, travelling
  down four generations) and the three-item menu (seal and flask colors match
  across `byron-menu` and `three-envelopes`).
- **Thinkers and cases:** Joel Feinberg (open future, relic card); He Jiankui
  (2018, relic card); Casgevy as the somatic anchor. Mary voices the objections
  and Percy the case for.
- **Left out on purpose:** the disability-rights (expressivist) critique,
  Sandel's giftedness argument, Savulescu's procreative beneficence,
  mitochondrial replacement, base and prime editing. Eugenics history gets one
  bullet on the fairness slide. The disability critique is the best candidate
  for an optional `<phil-branch>` later.
- **Cross-references:** `patient-autonomy` (consent), `four-principles`
  (beneficence, justice), `moral-status` (embryos, which this lesson brackets),
  `harm-principle` (parental liberty).

### Accuracy note (real, not invented)
- **Cystic fibrosis** is autosomal recessive (CFTR). Two affected parents pass a
  faulty copy each to every child. Most men with CF are infertile without
  sperm retrieval and IVF; the story already assumes IVF. CFTR modulators
  (2019 onward) help roughly 90% of patients, hence "most people."
- **Casgevy** (exagamglogene autotemcel): UK approval November 2023, FDA
  December 2023, for sickle cell disease in patients 12 and older. US list
  price about $2.2 million.
- **CRISPR-Cas9** as an editing tool: Jinek, Doudna, Charpentier et al.,
  *Science* (2012).
- **He Jiankui** announced the twins in November 2018 (CCR5, HIV resistance). A
  third child was born later. Sentenced December 2019 to three years. The data
  he presented indicated mosaicism and unintended edits; the slide says
  "suggested."
- **Law:** Baylis et al. (*The CRISPR Journal*, 2020) surveyed 96 countries; 75
  prohibit heritable genome editing and none explicitly permits it. In the US
  an appropriations rider (since 2015) bars the FDA from reviewing such
  applications. **Re-check before each term.**
- **Open future:** Feinberg, "The Child's Right to an Open Future" (1980).
  Applied to genetics by Dena Davis (1997).
- **Polygenic traits:** adult height is associated with over 12,000 variants
  (Yengo et al., *Nature*, 2022). The slide says "thousands of genes."
- **Low-cholesterol variant:** natural loss-of-function variants in PCSK9
  lower LDL and heart disease risk. Menu item 2 is modeled on this.
- **Growth hormone:** FDA approved it for idiopathic short stature in 2003.
- **Sterilization:** more than 60,000 people under laws in about 30 US states.
- ***Frankenstein*:** conceived in June 1816 during the Shelleys' visits to
  Byron's Villa Diodati; published 1818.
- **Simplification to know about:** a germline edit is not inherited by
  *every* descendant, since each child gets half of a parent's DNA. The ripple
  widget marks descendants "may inherit" for that reason.

### Learning goals
- Distinguish **somatic** from **germline** editing by which cells change, and
  explain why only germline edits are **heritable**.
- Explain why embryo screening cannot help a couple who both have a recessive
  disease.
- Define **treatment** and **enhancement**, and say why middle cases (vaccines,
  lowering a risk) are hard to sort.
- State two arguments for germline editing (preventing suffering; parents
  already shape children) and three against (safety and irreversibility;
  consent and the open future; fairness).
- Tell which objections better science or funding could answer (safety,
  fairness) and which would remain (consent).

### Slide-by-slide (33)

**Act 0 — Arrival**
1. **[T]** Title (`villa-diodati`).
2. **[P]** Belief probe (statements below).
3. **[T]** Meet Mary and Percy (both portraits in the body). What CF is. `reveal`.
4. **[T]** Why not pick a healthy embryo? (`all-the-same`). Gene pairs, embryo
   screening, and why it fails here. `reveal`.

**Act 1 — Two kinds of edit**
5. **[T]** DNA is a recipe book (`recipe-book`). Gene, gene editing, CRISPR.
6. **[T]** Two kinds of cells (`two-cells`). Somatic, germline, heritable.
7. **[T]** Somatic editing is already here (`somatic-infusion`). Casgevy.
8. **[T]** An edit that travels (`family-tree`). Promise and worry.
9. **[V]** `<phil-ripple>`: somatic vs. germline over four generations.
10. **[C]** Somatic vs. germline.
11. **[Q · Checkset]** Which edits could be inherited? (Distractor to watch: a
    newborn's liver cells. Young patient does not mean germline.)

**Act 2 — Dr. Byron's menu**
12. **[T]** Dr. Byron (`dr-byron`). The law today; the story supposes it changed.
13. **[T]** Three things on the menu (`byron-menu`). Reality check on item 3.
14. **[T]** Treatment or enhancement? Vaccines and growth hormone.
15. **[V]** `<phil-line>`: six edits on a treat/enhance scale, then draw a line.
16. **[Q · MCQ]** Why is a vaccine a puzzle for the line? (✓ It prevents disease
    by improving a healthy body.)

**Act 3 — The case for**
17. **[T]** Prevent suffering (`easy-breath`). Flags the word "safely."
18. **[T]** Parents already choose (`already-choosing`).
19. **[C]** Shaping by upbringing vs. by germline edit, with Percy's reply.
20. **[Q · MCQ]** What must a critic show to defeat Percy's comparison? (✓ A
    difference that matters morally.)
21. **[Poll]** Should they be allowed item 1, on the case for alone?

**Act 4 — The case against**
22. **[T]** Is it safe? (`relic-2018`). He Jiankui.
23. **[T]** It can't be taken back (`ink-in-the-spring`). Off-target edits.
24. **[V]** `<phil-ripple mistake>`: the same tree with an error.
25. **[T]** Nobody asked the child (`open-doors`). Consent, and Percy's reply.
26. **[T]** The right to an open future (`relic-feinberg`).
27. **[T]** Is it fair? (`two-staircases`). Cost, inherited gaps, sterilization
    history, Percy's reply.
28. **[Q · Cloze]** Four speakers; pick the argument each uses.
29. **[Q · MCQ]** If editing were perfectly safe and free, which objection
    remains? (✓ Consent.)

**Act 5 — The decision**
30. **[T]** Three envelopes (`three-envelopes`). The five arguments in brief.
31. **[V]** `<phil-verdict>`: Allow / Not yet / Never per item, the arguments
    that mattered, and a reflection on how they fit.
32. **[P]** Belief review.
33. **[T]** Recap (`villa-diodati`), ending on *Frankenstein*.

### Belief probe
1. Parents should be free to use medicine to prevent a serious disease in their
   future child.
2. Curing a disease and making a healthy child "better" are morally different
   things.
3. A change that can never be undone should not be made, however good the reason.
4. It is wrong to make a permanent change to a person who cannot agree to it.
5. If only rich families could afford a new medical technology, it would be
   better if nobody had it.

**Mix:** 5 graded (3 MCQ, 1 checkset, 1 cloze), 1 poll, 4 viz (3 widgets, one
used twice), 2 comparisons, belief probe. Widgets live in
`assets/germline.js`. The four `sheet-*.png` source grids are unused by the
slides and add about 5 MB to the SCORM zip.

---

## Computing & AI Ethics: Digital Cash — "Why Supervillains Prefer to Be Paid in Crypto"  *(built)*

- **Path:** `lessons/ai-ethics/villains-ledger/`
- **Lesson id:** `villains-ledger`
- **Top-bar title:** `The Villain's Ledger` · **Subject:** `Cryptocurrency`
- **Slot:** Week 7, Lecture 5 (Digital Cash). Replaces the placeholder "The
  Dragon's Ledger" in `docs/ai-ethics-semester-plan.md`.
- **Narrative frame:** You are the new intern in Accounts on Calamity Island.
  **Doctor Calamity** has stolen the Great Harbor Duck, a three-storey rubber
  duck, and wants a billion dollars for it. **Penny**, Chief Henchperson of
  Accounts, has to explain why getting paid is harder than stealing the duck.
  Cash weighs ten tonnes. The bank asks who she is and can say no. Then Penny
  finds a kind of money with nobody in the middle. The third character is
  **Amara**, a reporter whose bank account was frozen for her reporting. She
  wants exactly the same four things from a payment that the Doctor wants.
- **Register:** comic for the lair, plain for the real world. The hostage is a
  duck so the jokes are safe. The real cases (2008, frozen accounts,
  hyperinflation, hospital ransomware) are told straight.

### The thesis

A bank does four jobs: it keeps the list, it checks who you are, it can undo or
refuse a payment, and a government stands behind the money. Cryptocurrency
removes all four on purpose. Each major ethical complaint is what one missing
job looks like from the outside:

| Removed on purpose | What had to replace it | The complaint |
|---|---|---|
| A keeper who decides which list is real | A contest that is expensive to win (proof of work) | Energy use |
| A government standing behind the value | Nothing. The price is what the next buyer pays | Speculation and gambling |
| Someone who can undo or refuse a payment | Nothing. Whoever has the key has the coins | Scams, lost keys, ransomware |
| Someone who checks who you are | A public list of pseudonyms | Crime, and also total exposure once a name leaks |

The second half of the thesis is the part students should leave with: **every
fix that works brings a keeper back.** Stablecoins fix the price by adding a
company that holds dollars and can freeze accounts. Exchanges fix lost keys by
holding them for you, which is a bank. ID checks go after crime by adding a doorman, and the doorman often misses it.
A system that cannot stop Doctor Calamity cannot stop Amara's government either,
and a system that can stop one can stop the other.

### Where the claims need care (teach these, don't hide them)

- **Say "Bitcoin," not "cryptocurrency," on the energy slide.** Bitcoin is more
  than half of all crypto by value, it runs on proof of work, and it uses
  nearly all of the electricity. Most *other* coins, Ethereum included, use
  proof of stake. So the defensible sentence is: "The biggest cryptocurrency
  by far runs on proof of work, and there is no realistic path to changing
  it." The reason it won't change is the thesis again. A rule change needs
  nearly everyone to agree, nobody is in charge to make them, and miners have
  spent billions on machines that do nothing else.
- **Never say "most crypto is crime."** Measured illicit activity is under 1%
  of traceable volume, and a student can look that up in a minute. The claim
  that holds is about what crypto is *for*. See "The three-piles claim" below.
- **The list is public.** Pseudonymous is not anonymous. The FBI recovered most
  of the Colonial Pipeline ransom in 2021 by following it.

### Skepticism about the sympathetic cases

The frame gives Amara the same wish list as the Doctor, which risks implying
crypto serves her as well as it serves him. It has not. The slide "Did It Help
the People Shut Out?" makes four points:

- **Technology.** Of the 1.3 billion adults with no account, about 530 million
  have a smartphone (World Bank Global Findex 2025). So roughly six in ten do
  not, and the most common reason people give for having no account is having
  too little money, which crypto does nothing about.
- **Volatility.** People living week to week cannot hold savings that may
  halve.
- **Who actually used it.** In El Salvador fewer than 60% of people with phones
  downloaded the government wallet, only 20% kept using it after spending the
  $30 bonus, and use was concentrated among the banked, educated, young, and
  male (Alvarez, Argente, and Van Patten, NBER 2022).
- **Cashing out needs a keeper.** Coins have to be traded for local money at an
  exchange, and a government can cut exchanges off. Nigeria's central bank
  told banks to close crypto-related accounts on 5 February 2021. The bank said
  this restated a 2017 rule, so the slide gives the date and does not claim it
  was aimed at the protesters.

The muted line adds that crypto's own keepers fail: FTX collapsed in November
2022 with about $8 billion of customer money missing, and its founder was
sentenced to 25 years in March 2024.

### The three-piles claim (replaces "predominantly illicit")

Ask one question: **what can you do with crypto that you can't do with a bank
card?** There are two answers, and each one has a pile.

1. **You can bet on its price.** This is the big pile. Most people who own
   crypto hold it hoping it goes up. In the Federal Reserve's household survey
   for 2025, nearly 1 US adult in 10 held crypto as an investment and about 1
   in 50 used it to pay for anything.
2. **You can make a payment nobody is able to stop.** That only matters to
   someone a keeper *would* stop. Some of those people are criminals: ransomware
   gangs, darknet sellers, governments under sanctions. Some are people like
   Amara, or savers in a country whose money is collapsing.
3. **Everyday buying is the small pile.** For a person with a working bank
   account, crypto is slower, the price jumps around, and a mistake can't be
   undone. So almost nobody buys groceries with it. El Salvador made bitcoin
   legal money in 2021, few people used it, and the law was reversed in 2025.

The sentence for students: *crypto is not mostly crime. It is mostly betting.
The part that is used as money is used mainly by people a bank would turn
away, and that group includes both the worst customers and some of the most
sympathetic ones.*

This is deliberately a claim about comparative advantage, not about totals. It
does not rank pile two against pile three, because nobody can measure that
well, and the art shows them the same size.

### Accuracy note (figures checked 2026-10-05)

Checked against the sources named. Re-check the three marked *moving* each
term.

- **Cash weight.** A US banknote weighs about 1 g, so $1 million in $100 bills
  is about 10 kg and $1 billion is about ten tons.
- **Bitcoin's origin.** Paper posted 31 Oct 2008. First block mined 3 Jan 2009,
  carrying the *Times* headline "Chancellor on brink of second bailout for
  banks." Satoshi's last known email is dated 23 April 2011.
- **WikiLeaks.** PayPal cut off donations on 3 Dec 2010. Visa and Mastercard
  followed on 7 Dec.
- **Nigeria.** A federal court froze 20 accounts tied to the #EndSARS protests
  on 4 Nov 2020, at the central bank's request and without the account holders
  present. The stated ground was suspected terrorism financing. Nobody had been
  convicted, which is all the slide claims.
- **Zimbabwe.** Hanke and Kwok (2009) estimate that in mid-November 2008 prices
  doubled every 24.7 hours. The 100 trillion dollar note is real.
- **James Howells.** About 8,000 bitcoins, drive thrown out in 2013, Newport,
  Wales. UK courts refused his claim to dig up the landfill in January and
  March 2025. Accounts differ on who threw it out, so the slide uses the
  passive.
- **Electricity** (*moving*). Cambridge's index put Bitcoin at about 138 TWh a
  year in its April 2025 report and nearer 175 TWh since. Poland used about 158
  to 171 TWh in 2024 depending on what is counted. "About as much as Poland"
  holds across that range.
- **Bitcoin's share** (*moving*). About 58 to 59% of all crypto by market value
  in early October 2026.
- **Price falls.** Bitcoin fell 73% over 2018 and 64% over 2022.
- **Who uses it for what** (*moving*). Federal Reserve household survey for
  2025: 10% of US adults used crypto, nearly 1 in 10 held it as an investment,
  and 2% used it to buy something or make a payment. For 2024 the figures were
  8%, 7%, and 2%.
- **El Salvador.** Legal tender from September 2021. The legislature removed
  that status on 29 January 2025 as a condition of a $1.4 billion IMF loan. In
  a 2024 survey 92% of Salvadorans said they did not use bitcoin.
- **Ransomware.** Chainalysis: $1.25 billion in 2023 (first reported as $1.1
  billion), about $813 million in 2024 (later raised to about $892 million),
  about $820 million in 2025. The London case is the June 2024 attack on the
  lab company Synnovis: NHS England counted 10,152 outpatient appointments and
  1,710 procedures postponed.
- **Colonial Pipeline.** 75 bitcoins paid in early May 2021. The Justice
  Department announced the seizure of 63.7 of them on 7 June 2021.
- **Crime's share.** Chainalysis 2026 report: illicit addresses received at
  least $154 billion in 2025, which is still under 1% of the volume it can
  attribute.
- **Stablecoin freezes.** Tether froze about $3.3 billion across some 7,000
  addresses between 2023 and 2025. Circle froze about $109 million.
- **Winner.** "Do Artifacts Have Politics?" (1980). Joerges, "Do Politics Have
  Artefacts?" (1999) disputes the low-bridges story.

**One finding cuts against the doorman slide.** Chainalysis reports that 84% of
illicit volume in 2025 moved in stablecoins, the dollar-tied coins whose
issuers can freeze accounts. So a doorman exists there and criminals use those
coins anyway, because freezes come case by case and after the fact. This is
part of the worry, and the deck says so: the doorman slide, the poll, and
Build-a-Coin all say a doorman *can* stop a ransom if it is caught, never that
one does.

### Learning goals

- Explain in plain words what a ledger is, what double spending is, and how a
  blockchain gets agreement without a keeper (copies, fingerprints, proof of
  work, keys).
- Name the real worries that motivated it: bank failure, frozen accounts,
  and inflation.
- Say accurately what crypto is used for: mostly betting, rarely everyday
  buying, and as money mainly by people a keeper would turn away.
- Trace each ethical complaint back to the design choice that produces it.
- Tell a growing pain from a built-in consequence, and say what each proposed
  fix gives back.
- Apply Winner's claim that designs have politics, and decide where they stand
  on a payment system nobody can stop.

### Slide-by-slide (32)

**Act 0 — The ransom problem**
1. **[T]** Title and the duck (`harbor-duck`). Stealing it was the easy part.
2. **[P]** Belief probe (start).
3. **[T]** Option one: cash (`cash-pallet`). Ten kilograms per million. Villains
   get caught at the pickup.
4. **[T]** Option two: the bank (`bank-counter`). It knows who you are, it can
   refuse, it can freeze, it can undo.
5. **[Q · MCQ]** Why can't she use a bank transfer? (Answer: the bank keeps the
   record and can refuse or reverse it. Distractors: transfers are too slow /
   banks can't move that much / banks charge too much.)

**Act 1 — Money is a list**
6. **[T]** Most money is a list (`penny`). A dollar in your account is a line in
   a bank's records. Paying someone changes two lines.
7. **[T]** The keeper's four jobs (`two-ledgers`). Keep the list, check who you
   are, undo or refuse, and a government behind it.

**Act 2 — Why some people wanted out** (plain register)
8. **[T]** The keeper can fail (`bailout`). 2008.
9. **[T]** The keeper can say no to the wrong people (`frozen-card`). Amara,
   then WikiLeaks and Nigeria.
10. **[T]** The keeper can print (`wheelbarrow`). Hyperinflation.
11. **[T]** Satoshi's proposal (`relic-satoshi`). Electronic cash with no keeper.

**Act 3 — How it works**
12. **[T]** The copy problem. A file can be copied, so a digital coin could be
    spent twice. A keeper solves this by having the only list.
13. **[T]** Everyone keeps the list (`two-ledgers` again). Thousands of
    identical public copies.
14. **[T]** Pages and fingerprints. A block is a page of payments. A hash is a
    fingerprint of a page, and each page includes the fingerprint of the one
    before it.
15. **[V]** `<phil-chain>`: change one old payment and watch every later
    fingerprint stop matching.
16. **[T]** Who adds the next page? (`cardboard-crowd`). Voting fails because
    fake voters are free.
17. **[T]** A lottery paid for in electricity (`mining-hall`). Proof of work.
    The winner adds the page and is paid in new coins.
18. **[T]** Keys, and no undo (`lost-key`). No names and no accounts. Whoever
    has the secret key has the coins. Lost keys and scam payments stay lost.
19. **[Q · MCQ]** Why does proof of work have to be expensive? (Answer: so that
    faking a majority costs more than anyone can pay. Distractors: the math is
    just hard / to slow payments down / to keep coins scarce.)

**Act 4 — The bill arrives**
20. **[T]** Penny's report (`doctor-calamity`). No pickup, no questions, no
    refusal, no undo. It is the same list Amara wanted.
21. **[T]** Energy (`power-town`). The electricity is the lock. Better machines
    don't lower it, because the contest gets harder to match. Last bullet:
    other coins found another way, and Bitcoin has no one who could order the
    switch.
22. **[T]** Price (`coaster`). Nobody stands behind it, so it acts like a bet.
23. **[T]** What is it actually used for? (`three-piles`). The three-piles
    claim.
24. **[T]** Ransomware (`locked-screen`). No jokes. Before crypto, ransom had a
    pickup problem.
25. **[T]** The list is public (`glass-trail`). Colonial Pipeline. Why "most
    crypto is crime" is wrong, in one bullet.
26. **[V]** `<phil-coinlab>` Build-a-Coin.
27. **[Q · Checkset]** Built in or growing pain? Check every problem that comes
    from having no keeper.

**Act 5 — The door with no doorman**
28. **[C]** No doorman vs. doorman (`same-door`, `doorman-returns`). Every fix
    that works brings a keeper back.
29. **[T]** Do designs have politics? (`relic-winner`).
30. **[Poll]** Would you take the doorman away?
31. **[P]** Belief probe (revisit).
32. **[T]** Recap (`lair`). The duck goes home. The Doctor brags with a
    photo that shows her secret key, loses the coins, and is found.

**Cut to reach 32:** remittance fees and the unbanked, surveillance and the
cypherpunks, the four-jobs cloze, the "which worry" poll, the proof-of-stake
slide (now one bullet), stablecoins and exchanges as separate fixes (now inside
Build-a-Coin and the door comparison), and the Lessig callback.

### Belief-probe statements (start; revisited at end)

1. A payment system should be able to block payments to criminals.
2. No company or government should be able to stop me from spending my own
   money.
3. If a tool is used mostly for gambling and crime, that is the fault of the
   users and not the tool.
4. Adults should be free to bet their savings on anything they like.
5. Using a country's worth of electricity is fine if the people using it pay
   the bill.

Statements 1 and 2 cannot both be fully true. Most students will agree with
both at the start, which is the point of asking again at the end.

### Interactive viz to build

- **`<phil-chain>` (ungraded).** Four pages, each with three payments, its own
  fingerprint, and the previous page's fingerprint. The student edits one
  amount on page two. That page's fingerprint changes, and pages three and four
  flag a mismatch. A "redo the work" button repairs one page at a time while a
  counter shows the honest network adding pages faster. Fingerprints are a toy
  hash shown as four colored blocks plus a short code, so color is never the
  only signal.
- **`<phil-coinlab>` Build-a-Coin (ungraded, the signature widget).** Four
  switches, one per keeper job: who keeps the list (one keeper / everyone), who
  can join (ID checked / anyone), can a payment be stopped or undone (yes /
  no), what stands behind the price (a government / a company's reserves /
  nothing). Read-outs: electricity, price swings, "can Doctor Calamity get
  paid?", "can Amara get paid?", and "who do you have to trust?". Presets load
  a bank account, Bitcoin, a proof-of-stake coin, and a dollar stablecoin. The
  student is asked to find a setting where Amara gets paid and the Doctor does
  not. There isn't one, and the widget says why in one sentence: both readings
  come from the same switch.

### Art assets

Twenty PNGs in five sheets and two relic SVGs. Eighteen PNGs are placed in
the 32-slide plan; `penny` and `mining-hall` are each used once. Prompts, cast, and rules are in
`lessons/ai-ethics/villains-ledger/prompts.md`, with notes on where the
panels differ from the prompts.

### Sources to cite (so nothing is invented)

- Nakamoto, "Bitcoin: A Peer-to-Peer Electronic Cash System" (2008).
- Chaum, "Blind Signatures for Untraceable Payments" (1983).
- Hughes, "A Cypherpunk's Manifesto" (1993).
- Douceur, "The Sybil Attack" (2002), for why voting fails.
- Winner, "Do Artifacts Have Politics?" *Daedalus* 109(1), 1980. Joerges, "Do
  Politics Have Artefacts?" (1999) for the dispute.
- Lessig, *Code and Other Laws of Cyberspace* (1999).
- Schneier, "There's No Good Reason to Trust Blockchain Technology," *Wired*
  (2019): the technology moves trust, it does not remove it.
- Cambridge Bitcoin Electricity Consumption Index. Chainalysis Crypto Crime
  Reports. BIS Bulletin 69. World Bank Global Findex and Remittance Prices
  Worldwide. Alvarez, Argente and Van Patten on El Salvador (NBER, 2022).

### As built

33 slides: the 32 listed above plus "Did It Help the People Shut Out?",
added after "What Is It Actually Used For?". Two graded MCQs and one checkset, one poll, one
comparison, the belief probe, and both widgets (`assets/ledger.js`). In
`<phil-coinlab>` the "who can join" switch was dropped: three switches were
enough to make the point, and a keeper holding the only list forces the
"can a payment be stopped" switch to Yes. The figures on the slides were
checked on 2026-10-05; see the accuracy note.
