# Idea scenes for converting relic cards to thinker cards

Every relic card still in use gets an **idea scene**: a square PNG that pictures
the thinker's central move without a face. Each scene goes into the `img` of a
`<phil-thinker>` card (see AUTHORING.md). Thirty-two scenes, in **eight 2×2
sheets**.

Each sheet is one short prompt in a code block, ready to paste into any image
generator. Render each sheet square. Save sheets in `temp/thinker-sheets/`,
not in a lesson's `assets/`. Split each sheet into four files named in its
table, and copy each file into the `assets/` of every lesson listed.

**To re-roll one panel on its own,** paste the style line, then that panel's
sentence, then "One single square image, not a grid."

Rules:

1. **No faces, and no portraits of real people.** A hand is allowed only where
   the panel names one.
2. **No text.** Books, deeds, scrolls, and newspapers are blank. No letters,
   numbers, or symbols that read as words.
3. **One idea per panel.** Each scene keeps the old emblem's mnemonic and gives
   it a setting, so a student can tell what it means once the card's claim
   explains it.
4. **Same style across all eight sheets,** so the cards look like one set in
   every lesson.

Left out: Jonsen (drawn, but on no slide). Daniels is included so his
prototype card in the Ship's Chest can drop the old emblem.
Timothy Quill is included even though his card isn't on a slide yet: a
thinker card fits the "Criticisms 2 and 3" slide in double-effect.

## Style line (first line of every sheet)

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.
```

---

## Sheet 1 — utilitarians

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a simple wooden table in a sunlit garden holding a loaf of bread, a cup of water, and a small bunch of grapes.
Top-right: a brass balance on a carved stone tablet, gold coins piled in one pan and dark pebbles in the other.
Bottom-left: an open book on a desk in a dim study, a bright flame rising from its pages.
Bottom-right: rings of light spreading across a dark pond from one dropped pebble, a fish, a bird, and a deer at the widening edges.
```

| Quadrant | File | Card | Copy into |
|---|---|---|---|
| Top-left | `idea-epicurus.png` | Epicurus: simple natural pleasures | utilitarianism |
| Top-right | `idea-bentham-calculus.png` | Bentham: the felicific calculus | utilitarianism, moral-status |
| Bottom-left | `idea-mill.png` | J. S. Mill | utilitarianism, harm-principle, right-to-health-care |
| Bottom-right | `idea-singer.png` | Singer: the expanding circle | utilitarianism, moral-status |

---

## Sheet 2 — Kantians and Locke

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a brass compass on a stone ledge, its needle pointing up into a sky crowded with bright stars.
Top-right: a round brass badge of honor on a velvet cushion, stamped with a single paw print.
Bottom-left: an old iron key resting on an unrolled blank scroll beside a quill.
Bottom-right: an open hand holding one acorn above a field split by a low stone wall into a tilled plot and a wild plot.
```

| Quadrant | File | Card | Copy into |
|---|---|---|---|
| Top-left | `idea-kant.png` | Kant: the moral law within | kantian-deontology, moral-status |
| Top-right | `idea-korsgaard.png` | Korsgaard: fellow creatures | kantian-deontology |
| Bottom-left | `idea-oneill.png` | O'Neill: could those affected consent? | kantian-deontology |
| Bottom-right | `idea-locke.png` | Locke: mixing labor with land | lockean-proviso |

---

## Sheet 3 — property and fair starts

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a tilted tin can pouring a thin red stream into a vast dark sea, the red thread fading to nothing.
Top-right: a small globe resting on an open strongbox of coins, one chute running from the globe into the box and another carrying coins out.
Bottom-left: a rolled blank deed and a heavy closed law book bound together by one iron chain on bare wooden boards.
Bottom-right: three identical starting blocks on one level wooden beam, held up by posts of different heights over rough ground, a gold star far ahead.
```

| Quadrant | File | Card | Copy into |
|---|---|---|---|
| Top-left | `idea-nozick.png` | Nozick: the tomato juice in the sea | lockean-proviso |
| Top-right | `idea-paine.png` | Paine: a ground rent owed to everyone | lockean-proviso |
| Bottom-left | `idea-bentham-law.png` | Bentham: property is made by law | lockean-proviso |
| Bottom-right | `idea-rawls.png` | Rawls: fair equality of opportunity | right-to-health-care |

---

## Sheet 4 — the end of life and the open future

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a round shield raised against a falling sword, casting two shadows on a stone wall, one green and one magenta.
Top-right: two identical top hats side by side on a hall table in front of one closed door.
Bottom-left: an open palm holding a ring of three different keys, three distant doors standing in a row behind it.
Bottom-right: a laboratory door left ajar with a broken padlock hanging from it, cold light spilling across the floor from glass dishes on a bench.
```

| Quadrant | File | Card | Copy into |
|---|---|---|---|
| Top-left | `idea-aquinas.png` | Aquinas: double effect | double-effect |
| Top-right | `idea-rachels.png` | Rachels: the twin cases | double-effect |
| Bottom-left | `idea-feinberg.png` | Feinberg: the right to an open future | germline-editing |
| Bottom-right | `idea-2018.png` | The 2018 case (He Jiankui) | germline-editing |

---

## Sheet 5 — thought experiments

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a railway switch lever beside a track that splits in two under a gray sky.
Top-right: a small violin with an unplugged medical tube curled around it, resting on a hospital blanket.
Bottom-left: an old iron hand water pump with three round brass knobs on its barrel, a drop falling from the spout.
Bottom-right: a doctor's stethoscope lying on a desk, its tubing tied in a tight knot.
```

| Quadrant | File | Card | Copy into |
|---|---|---|---|
| Top-left | `idea-foot.png` | Foot: the trolley problem | thomson-thought-experiments |
| Top-right | `idea-thomson.png` | Thomson: the violinist | thomson-thought-experiments |
| Bottom-left | `idea-dennett.png` | Dennett: intuition pumps | thomson-thought-experiments |
| Bottom-right | `idea-quill.png` | Quill: mixed and hidden motives | double-effect |

---

## Sheet 6 — luck, creation, and control

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a lottery drum on a wooden stand, a storm cloud and a lightning bolt swirling inside its glass window.
Top-right: an open leather notebook and a quill beside a small glass jar holding a crackling spark, a storm-lit lake behind.
Bottom-left: a brass clockwork machine whirring at full speed with its control lever snapped off, a wooden bucket overflowing with water beside it.
Bottom-right: a torn blank sheet of paper behind a glowing diamond-shaped mesh of linked nodes, its pieces traveling along different paths.
```

| Quadrant | File | Card | Copy into |
|---|---|---|---|
| Top-left | `idea-engelhardt.png` | Engelhardt: the natural lottery | right-to-health-care |
| Top-right | `idea-shelley.png` | Mary Shelley | frankenstein-alignment |
| Bottom-left | `idea-wiener.png` | Wiener: machines we can't stop | frankenstein-alignment |
| Bottom-right | `idea-baran.png` | Baran: packet switching | internet-no-middle |

---

## Sheet 7 — the network

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: two blank pages of paper in far corners joined by a single glowing thread, fainter threads branching off toward the edges.
Top-right: a long plain gray pipe crossing the frame, dark and featureless, with a bright glowing lamp mechanism at each end.
Bottom-left: a judge's wooden gavel whose head is made of green circuit board, resting on a thick closed law book.
Bottom-right: a hand resting on the handle of a brass tap, one drop of water falling from the spout.
```

| Quadrant | File | Card | Copy into |
|---|---|---|---|
| Top-left | `idea-berners-lee.png` | Berners-Lee: the web of links | internet-no-middle |
| Top-right | `idea-endtoend.png` | The end-to-end principle | internet-no-middle |
| Bottom-left | `idea-lessig.png` | Lessig: code is law | internet-no-middle |
| Bottom-right | `idea-westin.png` | Westin: privacy as control | nobody-asked-nell |

---

## Sheet 8 — privacy, cash, and built things

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a grid of small dim dots where a cluster of glowing green dots together forms the shape of a keyhole.
Top-right: a folded newspaper with blank columns sealed inside a block of stone, a gold chain link leading off each side.
Bottom-left: a low stone bridge over a road, a tall blue bus stopped in front of it while a small green car passes underneath.
Bottom-right: five paths fanning out from a small stone harbor toward five lit lanterns, one path broken and bridged by a wooden splint.
```

| Quadrant | File | Card | Copy into |
|---|---|---|---|
| Top-left | `idea-group.png` | Group privacy | nobody-asked-nell |
| Top-right | `idea-satoshi.png` | Satoshi Nakamoto: the genesis block | villains-ledger |
| Bottom-left | `idea-winner.png` | Winner: do artifacts have politics? | villains-ledger |
| Bottom-right | `idea-daniels.png` | Daniels: health protects your share of opportunity | right-to-health-care |

## After generating

For each lesson, swap each relic `<img slot="art" …>` for a `<phil-thinker>`
with name, verified dates, work, a one-line claim, and the new `img`. Write the
`alt` from what the panel actually shows. Leave `dates` off until checked.
