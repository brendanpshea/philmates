# Image prompts — The Wolf at the Door

Sixteen square scenes, generated as **four 2×2 sheets** and split into
quadrants. Each sheet is one short, complete prompt in a code block, ready to
paste into any image generator. Render each sheet square. Inspect every panel
full-size: reject any with baked-in text, and re-roll any sheet that repeats a
panel instead of drawing four different scenes. Keep the source sheets in
`temp/animal-ethics-sheets/`, not in `assets/`.

**To re-roll one panel on its own,** paste the style line, then that panel's
sentence, then "One single square image, not a grid."

The frame is the folk tale of the three little pigs, years later: the Big Bad
Wolf is old and needs a kidney, and the grown pigs sit on the county
hospital's ethics committee. Six rules:

1. **The folk tale only.** Original designs: nothing from Disney's 1933
   cartoon (no sailor suits, no fife and fiddle, no Disney look). Never name
   a studio in a prompt.
2. **The story's animals talk; the barn's don't.** Hettie, Barnaby, Clover,
   and the Wolf wear clothes and stand upright. Farm and lab pigs, mice, and
   flies are ordinary animals, drawn as animals.
3. **No portraits of real people.** Singer, Regan, Cohen, and Russell and
   Burch appear only as idea scenes on thinker cards, with no faces.
4. **No text.** Charts, papers, and screens show blank shapes, never letters
   or numbers.
5. **Nothing gory.** Surgery is clean and bright; the hog barn is crowded but
   not cruel-looking. The art should not decide the lesson's question.
6. **Vary the people.** Every panel with people names each figure's age,
   gender, and skin color, and crowds are mixed.

## Status (2026-10-30)

All four 2×2 sheets (`sheet-a.png` through `sheet-d.png`) generated with Gemini
(Nano Banana) and split into all sixteen 512×512 PNG assets in
`lessons/bioethics/animal-ethics/assets/`.
Full sheets are kept in `temp/animal-ethics-sheets/` outside `assets/` so they
do not inflate the SCORM zip size. All sixteen are checked: on-style (16-bit SNES
pixel art), text-free, and ready for authoring `index.html`.

## Style line (first line of every sheet)

```
16-bit SNES pixel art, a storybook county where talking pigs and an old wolf live alongside people. Hard pixel edges, limited palette, dark navy background, warm brick-red accents. No text, letters, or numbers anywhere.
```

## Cast (keep these words the same in every panel)

- **The Wolf:** an old gray wolf with a grizzled muzzle, round spectacles, a
  brown cardigan, and a wooden cane, standing upright.
- **Hettie:** a spotted pink-and-black sow standing upright, in reading
  glasses and a lavender cardigan.
- **Barnaby:** a black boar with white feet standing upright, in green
  veterinary scrubs.
- **Clover:** a young ginger sow standing upright, in denim overalls and a
  straw hat.
- **Dr. Amara Osei:** a Black woman surgeon in her forties with short natural
  hair, in navy scrubs and a surgical cap.
- **Dr. Ravi Menon:** an Indian American man in his thirties with glasses, in
  a white lab coat.
- **Dale Hargrove:** a white farmer in his sixties with gray stubble, in a
  feed cap and coveralls.

---

## Sheet A — the story

Save as `sheet-a.png`, then split.

```
16-bit SNES pixel art, a storybook county where talking pigs and an old wolf live alongside people. Hard pixel edges, limited palette, dark navy background, warm brick-red accents. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: an old gray wolf with a grizzled muzzle, round spectacles, a brown cardigan, and a wooden cane knocks politely at the door of a small brick cottage at dusk, while three upright pigs, one spotted, one black, one ginger, peek out of the window.
Top-right: an old gray wolf with round spectacles and a brown cardigan sits in a dialysis chair in a bright clinic, tubes running to a machine beside him, while a Filipina nurse in her fifties in teal scrubs checks the machine.
Bottom-left: in a brick-walled meeting room, a spotted sow in reading glasses and a lavender cardigan, a black boar in green veterinary scrubs, and a young ginger sow in overalls and a straw hat sit at a long table with papers, listening to a Black woman surgeon in navy scrubs pointing at a blank chart on an easel.
Bottom-right: a sunny kitchen inside a cottage made of straw, with a bowl of ripe fruit and vegetables on the table, tiny fruit flies buzzing over it, and a fly swatter hanging on a hook.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `title.png` | Title; Summed up |
| Top-right | `dialysis.png` | The Wolf's request |
| Bottom-left | `committee.png` | Decision points |
| Bottom-right | `straw-kitchen.png` | Dial two: who pays |

## Sheet B — transplant medicine

Save as `sheet-b.png`, then split.

```
16-bit SNES pixel art, a storybook county where talking pigs and an old wolf live alongside people. Hard pixel edges, limited palette, dark navy background, warm brick-red accents. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a hospital waiting area at dawn where patients of different ages, genders, and skin tones sit waiting, an old man holding a pager, a young woman with a small packed suitcase at her feet.
Top-right: a bright, clean operating room where a Black woman surgeon in her forties and an East Asian man surgeon in his fifties, both masked, lift a pink kidney from a steel cooler.
Bottom-left: a spotless white barn behind a glass wall, where ordinary pink pigs root in clean straw while staff of different skin tones in full white gowns and masks watch over them.
Bottom-right: an ordinary pink pig in a clean pen looks into a mirror on the wall to find a food bowl hidden behind a partition.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `waitlist.png` | The waitlist |
| Top-right | `surgery.png` | Pig organs so far |
| Bottom-left | `donor-barn.png` | Making a donor pig |
| Bottom-right | `mirror-pig.png` | Do pigs count? |

## Sheet C — farm and lab

Save as `sheet-c.png`, then split.

```
16-bit SNES pixel art, a storybook county where talking pigs and an old wolf live alongside people. Hard pixel edges, limited palette, dark navy background, warm brick-red accents. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a long modern hog barn with rows of pens of ordinary pink pigs under fluorescent lights, a white farmer in his sixties with gray stubble, a feed cap, and coveralls looking down the aisle.
Top-right: a clean animal lab with rows of clear mouse cages full of nesting material, a Latina technician in her thirties in a lab coat and gloves gently checking one cage.
Bottom-left: an Indian American man in his thirties with glasses and a white lab coat looks through a microscope beside racks of small glass vials holding tiny fruit flies.
Bottom-right: glowing petri dishes and a small clear organ-on-a-chip device with colored channels on a tidy lab bench, a microscope behind them.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `hog-barn.png` | Dial one: what's gained |
| Top-right | `mouse-lab.png` | Who oversees the lab |
| Bottom-left | `fly-lab.png` | Flies in research |
| Bottom-right | `organoids.png` | Moving away from animals |

## Sheet D — the thinkers' idea scenes

Save as `sheet-d.png`, then split.

```
16-bit SNES pixel art, a storybook county where talking pigs and an old wolf live alongside people. Hard pixel edges, limited palette, dark navy background, warm brick-red accents. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters, no faces anywhere:
Top-left: a brass balance scale on a wooden table with an identical small red heart on each pan, perfectly level, the shadows of a pig and a person cast on the wall behind it.
Top-right: an open, empty cage with its door swung wide, standing in a sunlit meadow of wildflowers.
Bottom-left: a round wooden council table with empty chairs, a gavel, and a neat stack of signed papers, lit by a hanging lamp.
Bottom-right: an old cloth-bound book lying open on a lab bench beside a microscope, a small mouse curled asleep on a soft nest next to it.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `idea-singer.png` | Thinker card: Singer |
| Top-right | `idea-regan.png` | Thinker card: Regan |
| Bottom-left | `idea-cohen.png` | Thinker card: Cohen |
| Bottom-right | `idea-russell-burch.png` | Thinker card: Russell and Burch |
