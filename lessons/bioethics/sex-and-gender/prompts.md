# Image prompts — Orlando's Wardrobe

Sixteen square scenes, generated as **four 2×2 sheets** and split into
quadrants. Each sheet is one short, complete prompt in a code block, ready to
paste into any image generator. Render each sheet square. Inspect every panel
full-size: reject any with baked-in text, and re-roll any sheet that repeats a
panel instead of drawing four different scenes. Keep the source sheets in
`temp/sex-and-gender-sheets/`, not in `assets/`.

**To re-roll one panel on its own,** paste the style line, then that panel's
sentence, then "One single square image, not a grid."

The frame is Virginia Woolf's *Orlando* (1928): a young English nobleman who
lives about 350 years, wakes one morning in Constantinople as a woman, and is
thirty-six in 1928. Act 3 is the lesson's own sequel at a present-day clinic.
Six rules:

1. **Orlando keeps one face.** Before and after the change, in every century,
   the same fair skin, rosy cheeks, and long dark curls. Only the clothes and
   the body change.
2. **No portraits of real people.** Beauvoir, Byrne, Haslanger, Jenkins, and
   Saul appear only as idea scenes on thinker cards, with no faces. Elizabeth I
   is seen only from the back of a large hall.
3. **No text.** Forms, books, and screens show blank lines and boxes, never
   letters or numbers.
4. **Nothing mocking.** The jokes in this lesson are about fashion and
   paperwork. No panel makes fun of anyone's body or identity.
5. **Vary the people.** Every panel with people names each figure's age,
   gender, and skin color, and crowds are mixed: men and women, young and old,
   a range of skin tones.
6. **No nudity.** The Constantinople panel shows Orlando in a robe.

## Status (2026-10-30)

All four 2×2 sheets (`sheet-a.png` through `sheet-d.png`) generated and split
into all sixteen PNG assets in `lessons/bioethics/sex-and-gender/assets/`.
Full sheets are kept in `temp/sex-and-gender-sheets/` outside `assets/` so they
do not inflate the SCORM zip size. All sixteen are checked: on-style, no
legible text (the dictionary's lines and the clinic poster are blank
squiggles), Orlando's face consistent across the centuries.

Where the panels differ from the prompts (alt text follows the panels):
- `layers.png`: a glass cabinet with five shelves, not stacked panels.
- `idea-haslanger.png`: the ropes run across the stairs partway up, not
  along one side.
- `clinic.png` and `oak-1928.png`: Orlando's curls are pinned up short.

## Style line (first line of every sheet)

```
16-bit SNES pixel art, a storybook journey through four centuries of English history. Hard pixel edges, limited palette, dark navy background, warm candle-gold accents. No text, letters, or numbers anywhere.
```

## Cast (keep these words the same in every panel)

- **Orlando, before the change:** a teenage English nobleman with fair skin,
  rosy cheeks, and long dark curls, in a black velvet doublet and white ruff.
- **Orlando, after the change:** a young English noblewoman with fair skin,
  rosy cheeks, and the same long dark curls.
- **Orlando, 1928 and today:** a woman of about thirty-six with fair skin,
  rosy cheeks, and long dark curls pinned up, in a long 1920s coat and pearls.
- **Tomás Reyes:** a Latino man in his thirties with short black hair and a
  friendly smile, in a navy polo shirt.

---

## Sheet A — Orlando's centuries

Save as `sheet-a.png`, then split.

```
16-bit SNES pixel art, a storybook journey through four centuries of English history. Hard pixel edges, limited palette, dark navy background, warm candle-gold accents. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a young noble with fair skin, rosy cheeks, and long dark curls stands in a candlelit hall of tall mirrors, and each mirror shows the same face in a different century's clothes: an Elizabethan doublet, a powdered wig, a hooped gown, a 1920s dress.
Top-right: a teenage English nobleman with fair skin, rosy cheeks, and long dark curls, in a black velvet doublet and white ruff, sits writing under a huge oak tree on a hilltop, a great house with many chimneys in the valley below.
Bottom-left: morning sun pours into a room in Constantinople with blue tiled walls and a carved wooden window screen, where a young English noblewoman with fair skin, rosy cheeks, and the same long dark curls stands calmly before a tall mirror in a loose silk robe.
Bottom-right: a tall sailing ship at sea under a bright sky, where a young English noblewoman with fair skin, rosy cheeks, and long dark curls, in a full skirt and shawl, stands at the rail while sailors of different ages and skin tones work the rigging above.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `title.png` | Title; Summed up |
| Top-right | `oak.png` | Meet Orlando |
| Bottom-left | `constantinople.png` | One morning in Constantinople |
| Bottom-right | `ship.png` | Back to that morning |

## Sheet B — the court, 1928, and the clinic

Save as `sheet-b.png`, then split.

```
16-bit SNES pixel art, a storybook journey through four centuries of English history. Hard pixel edges, limited palette, dark navy background, warm candle-gold accents. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a great Tudor throne room seen from the back of the hall, where a queen in a wide jeweled gown and a tall lace collar sits far away on a raised throne, men and women courtiers of different ages bowing on either side.
Top-right: under a huge oak tree on a hilltop at midnight, a woman of about thirty-six with fair skin, rosy cheeks, and long dark curls pinned up, in a long 1920s coat and pearls, looks up at a moonlit sky as a small propeller airplane passes overhead.
Bottom-left: a bright present-day clinic waiting room, where a woman of about thirty-six with fair skin and long dark curls pinned up, in a long 1920s coat and pearls, frowns at a clipboard at the front desk, while a Latino man in his thirties with short black hair and a friendly smile, in a navy polo shirt, waits behind the counter, and patients of different ages and skin tones sit behind her.
Bottom-right: a clipboard on a clinic counter holding a blank form with rows of empty checkboxes and lines, a pen beside it and a potted plant behind.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `queen.png` | Questions for the social view |
| Top-right | `oak-1928.png` | Decision point: when, again? |
| Bottom-left | `clinic.png` | Orlando goes to the doctor |
| Bottom-right | `form.png` | Four questions, not one box |

## Sheet C — science, medicine, and Saul's idea scene

Save as `sheet-c.png`, then split.

```
16-bit SNES pixel art, a storybook journey through four centuries of English history. Hard pixel edges, limited palette, dark navy background, warm candle-gold accents. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: five glowing glass panels stacked like layers of a cake on a dark lab bench, showing a pair of chromosomes, a small gland, a simple body outline, a large egg beside tiny sperm, and a double helix.
Top-right: two crowds of small pixel people, one in teal and one in orange, men and women of many ages and skin tones, standing on a hillside in two overlapping mounds, most of each crowd mixed in with the other.
Bottom-left: two crash-test dummies, one large and one small, sit side by side in a car seat rig in a white test lab, with round yellow-and-black target marks on their heads.
Bottom-right: a small pony and a tall giraffe stand side by side in a sunny meadow, each wearing the same blue prize rosette, no people.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `layers.png` | Sex has layers |
| Top-right | `overlap.png` | What the averages show |
| Bottom-left | `dummies.png` | Why medicine needs sex, carefully |
| Bottom-right | `idea-saul.png` | Thinker card: Saul |

## Sheet D — the thinkers' idea scenes

Save as `sheet-d.png`, then split.

```
16-bit SNES pixel art, a storybook journey through four centuries of English history. Hard pixel edges, limited palette, dark navy background, warm candle-gold accents. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters, no faces anywhere:
Top-left: a plain wooden dress form on an empty stage, while many hands of different skin tones reach in from the wings to fit it with an apron, a corset, a veil, and a wide hat.
Top-right: a heavy old dictionary lies open on a wooden lectern in a quiet library, its pages filled with tiny blank lines, a brass magnifying glass resting across it.
Bottom-left: a grand marble staircase in a palace, where velvet ropes block the way up on one side of the stairs and leave the other side open.
Bottom-right: a hand holds up a worn paper map with a winding dotted path against a real cobbled street at dusk, and the map's path lines up with the street ahead.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `idea-beauvoir.png` | Thinker card: Beauvoir |
| Top-right | `idea-byrne.png` | Thinker card: Byrne |
| Bottom-left | `idea-haslanger.png` | Thinker card: Haslanger |
| Bottom-right | `idea-jenkins.png` | Thinker card: Jenkins |
