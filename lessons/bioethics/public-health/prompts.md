# Image prompts — Public Health Ethics ("Move On")

Twenty panels ship as square PNGs in `assets/`, made as **five 2×2 sheets**
and split into quadrants. Mill's idea scene is copied from
`lessons/bioethics/right-to-health-care/assets/idea-mill.png`. Each sheet
below is one short, complete prompt, ready to paste into any image
generator. Render each sheet square. Inspect every panel full-size: reject
any with baked-in text, and re-roll any sheet that repeats a panel instead
of drawing four different scenes.

**To re-roll one panel on its own,** paste the style line, then that panel's
sentence, then "One single square image, not a grid."

The lesson has two settings. Sheets A and B are London in 1853, loosely
after Dickens's *Bleak House* (1852–53, public domain). Sheets C and D are a
present-day American county. Sheet E holds the idea scenes for the thinker
cards. Rules:

1. **Original designs only.** No likeness to any actor or to any film or TV
   adaptation. Don't name the characters, the novel, or Dickens in a prompt.
2. **Illness with dignity.** Sick people rest, are cared for, or are looked
   after. No sores, rashes, blood, or wasting. Poverty is drawn plainly, never
   as a joke or a horror.
3. **Medicine is a bottle, a cup, a vial, or a bandage.** No needles in skin,
   no syringes close up.
4. **Paper and signs stay blank.** Maps, signs, ledgers, and posters carry no
   writing.
5. **No portraits of real people.** Mill, Brennan, Giubilini, Childress, and
   Leiter get idea scenes without faces.
6. **No villains.** The constable is tired, not cruel. The parent at the
   microphone is earnest. Nothing in the art should decide who is right.
7. **Vary the people.** Every panel with people names each figure's age,
   gender, and skin color, and every crowd is mixed: men and women, young and
   old, a range of skin tones. Paste each recurring character's description
   word for word.
## Status (2026-10-28)

All five 2×2 sheets (`sheet-a.png` through `sheet-e.png`) generated and split into
all twenty 512×512 PNG assets in `lessons/bioethics/public-health/assets/`.
Mill's idea scene (`idea-mill.png`) copied from
`lessons/bioethics/right-to-health-care/assets/idea-mill.png`.
Cleaned baked-in text from the bus destination sign in `school.png`.
Full sheets are kept in `temp/public-health-sheets/` outside `assets/` so they
do not inflate the SCORM zip size.

All 21 scene PNGs are validated, on-style (16-bit SNES pixel art with PhilMates palette),
text-free, and ready for authoring `index.html`.

## Style line (first line of every sheet)

```
16-bit SNES pixel art. Hard pixel edges, limited palette, dark slate-blue background, soft warm light. No text, letters, or numbers anywhere.
```

## Cast (keep these words the same in every panel)

- **Jo:** a thin, ragged boy of about twelve with light brown skin and messy
  black hair, in a torn oversized coat, holding a worn broom.
- **Charley:** a small freckled white girl of about thirteen in a white maid's
  cap and apron.
- **Esther:** a young Black woman of about twenty, hair pinned up, in a plain
  gray dress with a white collar and a ring of keys at her waist.
- **Dr. Woodcourt:** a young South Asian doctor in his late twenties in a dark
  frock coat, carrying a leather doctor's bag.
- **The constable:** a stout, gray-whiskered white policeman in his fifties in
  a dark blue tailcoat and a tall black top hat.
- **The health officer:** a Black woman in her fifties with short gray hair and
  reading glasses, in a cardigan with a lanyard.

---

## Sheet A — London, 1853: the crossing and the fever

```
16-bit SNES pixel art. Hard pixel edges, limited palette, dark slate-blue background, soft warm light. No text, letters, or numbers anywhere. Setting: foggy London streets in 1853, gas lamps, mud, soot-dark brick.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a thin, ragged boy of about twelve with light brown skin and messy black hair, in a torn oversized coat, holding a worn broom, sweeps a clean path across a muddy street crossing at dusk while a horse-drawn carriage passes behind him.
Top-right: a stout, gray-whiskered white policeman in his fifties in a dark blue tailcoat and a tall black top hat points wearily down a foggy street, and the ragged boy with the broom trudges away.
Bottom-left: a crumbling slum courtyard of sagging soot-black houses around an open drain, with laundry lines and a sickly green fog, and tired people of mixed ages, genders, and skin tones sitting in the doorways.
Bottom-right: by candlelight in a small bedroom, a young Black woman of about twenty, hair pinned up, in a plain gray dress with a white collar and a ring of keys at her waist, holds a cup to a small freckled white girl of about thirteen who lies feverish under a quilt.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `crossing.png` | Title |
| Top-right | `move-on.png` | Move on (the ladder part opens here) |
| Bottom-left | `tom-all-alones.png` | The fever travels |
| Bottom-right | `nursing.png` | Charley never chose |

## Sheet B — London, 1853: care, the vaccinator, and the cost

```
16-bit SNES pixel art. Hard pixel edges, limited palette, dark slate-blue background, soft warm light. No text, letters, or numbers anywhere. Setting: London in 1853, gas lamps, fog, plain rooms.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a young South Asian doctor in his late twenties in a dark frock coat, carrying a leather doctor's bag, kneels in a dark doorway and holds a cup of water to a thin, ragged boy of about twelve with light brown skin and messy black hair, wrapped in a blanket.
Top-right: a parish hall where a long line of mothers holding babies, women of mixed ages and skin tones, waits at a wooden table with small glass vials and a closed ledger, where the young South Asian doctor in a dark frock coat sits ready.
Bottom-left: a small hand mirror lying face down on a sunny windowsill beside a jar of wildflowers, with a plain gray dress and white collar folded over a chair.
Bottom-right: a worn broom leaning against a gas lamp at an empty, foggy street crossing at dawn, the swept path already muddy again.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `woodcourt.png` | Public health is different (bedside care) |
| Top-right | `vaccinator.png` | Exemptions, then and now |
| Bottom-left | `mirror.png` | Reciprocity: Esther's scars |
| Bottom-right | `empty-crossing.png` | Summed up |

## Sheet C — Today: the county

```
16-bit SNES pixel art. Hard pixel edges, limited palette, dark slate-blue background, soft warm light. No text, letters, or numbers anywhere. Setting: a present-day American county.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: morning drop-off at a brick elementary school with a yellow school bus and autumn trees, as parents and children of mixed ages and skin tones walk in together.
Top-right: a cluttered county health department office with a laptop and a coffee mug on a desk, where a Black woman in her fifties with short gray hair and reading glasses, in a cardigan with a lanyard, points at a pin on a large blank wall map.
Bottom-left: a small bald girl of about six with brown skin, in a hospital bed under a colorful blanket, hugs a stuffed rabbit and looks out the window at a schoolyard.
Bottom-right: a crowded amusement park at sunset with a carousel, a roller coaster, and a Ferris wheel, full of families of mixed ages and skin tones.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `school.png` | Duty poll |
| Top-right | `health-office.png` | 1853 and now (your job) |
| Bottom-left | `cant-vaccinate.png` | Herd immunity today |
| Bottom-right | `park.png` | The fever travels (2014) |

## Sheet D — Today: policy

```
16-bit SNES pixel art. Hard pixel edges, limited palette, dark slate-blue background, soft warm light. No text, letters, or numbers anywhere. Setting: a present-day American county.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a tall wooden ladder with eight rungs standing against a dark wall, each rung glowing a different soft color from cool blue at the bottom to warm red at the top.
Top-right: a school gym turned into a free vaccine clinic, where a middle-aged East Asian man nurse in blue scrubs hands a sticker to a smiling Black father holding his little daughter, with families of mixed ages and skin tones waiting in line.
Bottom-left: a packed school board meeting in a gym, where an earnest middle-aged white man with a beard speaks at a microphone to rows of parents of mixed ages and skin tones on folding chairs, some holding blank signs.
Bottom-right: a tent camp under a freeway overpass at dusk, where an outreach nurse, a Black woman in her forties in a blue jacket with a small cooler, talks kindly with an older white man sitting by his tent, next to a portable hand-washing station.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `ladder.png` | The intervention ladder |
| Top-right | `clinic.png` | Outbreak decision poll |
| Bottom-left | `hearing.png` | Three kinds of exemption; the county's rule |
| Bottom-right | `outreach.png` | Move on, today |

## Sheet E — idea scenes for the thinker cards

```
16-bit SNES pixel art. Hard pixel edges, limited palette, dark slate-blue background, soft warm light. No text, letters, or numbers anywhere. Symbolic still lifes; no faces.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a heap of gray stones growing in the middle of a road, with one clean open hand above it holding its stone back.
Top-right: one huge umbrella held up in the rain by many raised arms of different skin tones, keeping the ground beneath it dry, while one pair of hands stays tucked in coat pockets underneath.
Bottom-left: an old wooden gate held shut by four brass padlocks of different shapes: round, square, triangular, and heart-shaped.
Bottom-right: a brass balance scale with a church candle in one pan and a plain oil lamp in the other, hanging perfectly level.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `idea-brennan.png` | Clean hands (Brennan) |
| Top-right | `idea-giubilini.png` | Fairness and free riding (Giubilini) |
| Bottom-left | `idea-childress.png` | Four questions (Childress and colleagues) |
| Bottom-right | `idea-leiter.png` | Leiter's challenge |

## Alt-text reminder

Write `alt` from what the final PNG shows, not from the prompt. Check that the
map, signs, and ledger came out blank, that nobody's face is in the idea
scenes, and that the crowds came out mixed.
