# Image prompts — The Kids Are Online

Twelve square scenes, generated as **three 2×2 sheets** and split into
quadrants. Each sheet is one short, complete prompt in a code block, ready to
paste into any image generator. Render each sheet square. Inspect every panel
full-size: reject any with baked-in text, and re-roll any sheet that repeats a
panel instead of drawing four different scenes. Keep the source sheets in
`temp/technomoral-virtues-sheets/`, not in `assets/`.

**To re-roll one panel on its own,** paste the style line, then that panel's
sentence, then "One single square image, not a grid."

The frame is invented: the Kapoor family of Oak Hollow. Dev was ten in 1989;
now he and his wife Tasha are raising Zoe (13), Marcus (10), and baby Rosie,
with Dev's mother, Grandma Asha, nearby. This lesson replaced one built on a TV
sitcom's characters and official art, so the rules matter more than usual:

1. **Original designs only.** The look is a 1990s primetime cartoon, but no
   likeness to any show, character, or studio. **Never name a show or its
   creator in a prompt.** Generators answer a show's name by copying its
   characters (yellow skin, overbites), which is the problem this recast fixes.
   The style line describes the look instead.
2. **Natural, varied skin tones.** Cartoon styles default to one skin color.
   Every person is described with their own.
3. **No portraits of real people.** Aristotle and Vallor appear only as idea
   scenes on thinker cards. No faces in those panels.
4. **No text.** Screens, charts, and notes show blank shapes, never letters or
   numbers.
5. **The characters are the setting.** The art should never show a character
   arguing a philosophical position; panels show scenes and cases.

## Status (2026-10-30)

All three 2×2 sheets (`sheet-a.png` through `sheet-c.png`) generated with Gemini
(Nano Banana) and split into all twelve 512×512 PNG assets in
`lessons/ai-ethics/technomoral-virtues/assets/`.
Full sheets are kept in `temp/technomoral-virtues-sheets/` outside `assets/` so
they do not inflate the SCORM zip size.

All 12 scene PNGs are validated, on-style (16-bit SNES pixel art / 1990s cartoon
sitcom), text-free, and ready for authoring `index.html`.

Where the panels differ from the prompts (alt text follows the panels):
- `marcus.png`: the padlock on his phone is intact, not broken.
- `bedside.png`: Zoe is out of frame; Tasha sits on the bed alone, and the
  phone basket is on the nightstand, not by the door.

## Style line (first line of every sheet)

```
16-bit SNES pixel art drawn like a 1990s primetime cartoon sitcom: bold black outlines, flat bright colors, big round eyes, rubbery proportions, retro-futurist gadgets. People have natural human skin tones. No text, letters, or numbers anywhere.
```

## Cast (keep these words the same in every panel)

- **Grandma Asha (today):** a South Asian grandmother in her seventies with
  silver hair in a bun, round glasses, and a maroon cardigan.
- **Dev (today):** a South Asian man in his late forties with graying temples
  and stubble, in a gray hoodie.
- **Dev (1989):** a South Asian boy of ten with a bowl haircut and a neon
  windbreaker.
- **Tasha:** a Black woman in her forties with natural curly hair, in green
  nurse's scrubs.
- **Zoe:** a girl of thirteen with brown skin, curly hair in a puff, braces,
  and an oversized purple hoodie.
- **Marcus:** a boy of ten with brown skin, short twists, a gap-toothed grin,
  and a red T-shirt.
- **Rosie:** a toddler with brown skin and a tuft of curly hair, in yellow
  pajamas.
- **Principal Delgado:** a Latina woman in her fifties with a gray bob and a
  navy blazer.

---

## Sheet A — the Kapoors

Save as `sheet-a.png`, then split.

```
16-bit SNES pixel art drawn like a 1990s primetime cartoon sitcom: bold black outlines, flat bright colors, big round eyes, rubbery proportions, retro-futurist gadgets. People have natural human skin tones. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a family living room at night where a South Asian dad in a gray hoodie, a Black mom in green scrubs, a girl in a purple hoodie, and a boy in a red T-shirt each stare into their own glowing screen, a toddler in yellow pajamas watches a tablet in a playpen, and a South Asian grandmother in a maroon cardigan frowns in the doorway.
Top-right: a South Asian grandmother with silver hair in a bun, round glasses, and a maroon cardigan points sternly at a blank chore chart on the fridge, while behind her a boy with short twists and a red T-shirt tiptoes away with a phone.
Bottom-left: a 1989 shopping mall arcade glowing with neon, where a South Asian boy of ten with a bowl haircut and a neon windbreaker plays a big arcade cabinet as kids of different ages and skin tones wait their turn.
Bottom-right: a boy of ten with brown skin, short twists, a gap-toothed grin, and a red T-shirt proudly holds up a phone whose screen shows a broken padlock, in a messy bedroom.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `title.png` | Title |
| Top-right | `grandma.png` | Rules at the breaking point |
| Bottom-left | `arcade-1989.png` | What happened to Dev's world? |
| Bottom-right | `marcus.png` | Re-evaluating Marcus; widget avatar |

## Sheet B — the kids at home

Save as `sheet-b.png`, then split.

```
16-bit SNES pixel art drawn like a 1990s primetime cartoon sitcom: bold black outlines, flat bright colors, big round eyes, rubbery proportions, retro-futurist gadgets. People have natural human skin tones. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a girl of thirteen with brown skin, curly hair in a puff, braces, and an oversized purple hoodie lies in bed at night, her teary face lit blue by her phone, a sketchbook forgotten on the blanket.
Top-right: a toddler with brown skin and a tuft of curly hair, in yellow pajamas, stares wide-eyed at a tablet propped in her playpen, flashing bright colors, while a dad on the couch behind her watches football on a big TV.
Bottom-left: a wicker basket on a kitchen counter at night holding five phones charging face-down, a blank sticky note on the basket, moonlight through the window.
Bottom-right: a Black woman in her forties with natural curly hair, in green nurse's scrubs, sits at the foot of her teenage daughter's bed at night, listening closely, both their phones resting in a basket by the door.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `zoe.png` | Widget avatar (Zoe and feeds) |
| Top-right | `rosie.png` | Widget avatar (Rosie and the tablet) |
| Bottom-left | `basket.png` | Rules as scaffolding |
| Bottom-right | `bedside.png` | Technochauvinism vs. technomoral wisdom |

## Sheet C — the town, and the thinkers' idea scenes

Save as `sheet-c.png`, then split.

```
16-bit SNES pixel art drawn like a 1990s primetime cartoon sitcom: bold black outlines, flat bright colors, big round eyes, rubbery proportions, retro-futurist gadgets. People have natural human skin tones. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a middle school hallway with bright lockers, where students of different ages, genders, and skin tones slide their phones into gray pouches at a table while a Latina principal in her fifties with a gray bob and a navy blazer watches.
Top-right: three generations of one family, a South Asian grandmother, a South Asian dad, a Black mom, a teenage girl, a boy, and a toddler, squeezed onto a living room couch laughing over a board game, their phones charging in a basket on the shelf behind them.
Bottom-left: a young sapling tied to a wooden stake in a sunny garden, growing straight along it, no people.
Bottom-right: an old brass compass resting on the glowing screen of a smartphone, its needle steady, on a wooden desk, no people.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `school.png` | Decision point: school phone bans |
| Top-right | `couch.png` | The living room couch (closing) |
| Bottom-left | `idea-aristotle.png` | Thinker card: Aristotle (twice) |
| Bottom-right | `idea-vallor.png` | Thinker card: Vallor (four times) |

The old files (`homer.png`, `marge.png`, `bart.png`, `lisa.png`, `maggie.png`,
`burns.png`, `flanders.png`) were deleted in the recast and must not return.
