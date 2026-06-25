# PhilMates — Lesson Outlines

A running reference of every lesson we've built: its topic, learning goals,
narrative frame, and slide-by-slide structure (including which slides are
interactive). Use it to avoid duplication, reuse framing devices, and see how
content/quiz pacing has worked. Add a new section per lesson.

Legend: **[T]** teaching slide · **[Q]** graded interactive · **[V]** ungraded
interactive visualization · **[B]** branch · **[opt]** optional/branch-only slide ·
`reveal` = bullets shown one at a time.

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

**Act 2 — Bentham (why sharing was better)**
9. **[T]** Second judge — Principle of Utility, everyone counts equally.
10. **[T]** Hedonic calculus dimensions, `reveal`.
11. **[T]** Extent + diminishing returns → sharing maximizes total utility, `reveal`.
12. **[V]** "See It Yourself" — `<phil-cake-utility>` interactive viz: divide 12
    bites among 4 people via –/+ steppers; live happiness bars per person + total
    bar, a shrinking "next bite: +x" marginal readout, and "All to You" /
    "Spread evenly" presets. Demonstrates diminishing marginal utility and why the
    optimum total comes from spreading the cake. (Defined in
    `diminishing-utility.js`; concave utility = base·(1−rate^b)/(1−rate).)
13. **[Q · Checkset]** Which factors belong to the hedonic calculus (distractors:
    virtue of the person, priest's approval).
14. **[Q · MCQ]** Why sharing maximizes total happiness.

**Optional detour — Mill**
15. **[B]** "A Voice From the Gallery" — branch: hear Mill or skip.
15b. **[opt][T]** Mill: higher vs. lower pleasures; cake as a "lower" pleasure;
    "Socrates dissatisfied," `reveal`.

**Act 3 — Singer (what to eat, how to spend)**
16. **[T]** Third judge — preference utilitarianism + equal consideration.
17. **[T]** Lesson One: what you eat — speciesism, animal suffering, plant-based, `reveal`.
18. **[T]** Lesson Two: the $40 — drowning child, effective charity, effective
    altruism, `reveal`.
19. **[Q · Checkset]** Claims Singer endorses (distractors: only humans count;
    effectiveness doesn't matter).
20. **[Q · Cloze]** Synthesis across all three judges (pleasure / happiness /
    number / animals).

**Wake up**
21. **[T]** "You Wake Up" — recap of the three lessons, `reveal`.

### Counts
~21 main slides (+1 optional). **6 graded interactions** (2 MCQ, 2 checkset,
2 cloze) + **1 interactive visualization** ≈ 33% interactive. Branch used once for
genuinely optional Mill content.

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
