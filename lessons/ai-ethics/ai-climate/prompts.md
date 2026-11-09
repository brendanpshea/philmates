# Image prompts — AI and Climate Change ("Marley's Chain")

Twenty-eight panels ship as square PNGs in `assets/`, made as **seven 2×2
sheets** and split into quadrants. Each sheet below is one short, complete
prompt, ready to paste into any image generator. Render each sheet square.
Inspect every panel full-size: reject any with baked-in text, and re-roll any
sheet that repeats a panel instead of drawing four different scenes.

**To re-roll one panel on its own,** paste the style line, then that panel's
sentence, then "One single square image, not a grid."

The setting is Dickens's London at Christmas, with one change: Scrooge and
Marley's counting-house sells answers from a coal-fired brass thinking engine.
Sheets A to D are the story. Sheets E and F are idea scenes for the thinker
cards. Sheet G is our world today, for the four ledger pages. Rules:

1. **Original designs only.** No likeness to any film, cartoon, or stage
   version of *A Christmas Carol* (no Muppets, no Disney, no Alastair Sim).
   Don't name any of them in a prompt.
2. **The engine is brass and steam.** Boiler, flywheel, pipes, dials with
   blank faces, a chimney. No screens, no robots, no modern computers in
   sheets A to D.
3. **Paper stays blank.** Ledgers, deeds, bills, maps, and dials carry no
   writing and no numbers.
4. **No portraits of real people.** Every thinker gets an idea scene without
   a face.
5. **The Spirits are gentle, not frightening.** Marley's Ghost is sad. The
   last Spirit is hooded and still, with no skull and no scythe.
6. **Vary the people.** Every panel with people names each figure's age,
   gender, and skin color, and every crowd is mixed: men and women, young and
   old, a range of skin tones. Paste each recurring character's description
   word for word.

## Status (2026-11-09)

All seven 2×2 sheets (`sheet-a.png` through `sheet-g.png`) generated with
Cloudflare Workers AI (`flux-2-dev`) and split into all twenty-eight 512×512
PNG assets in `lessons/ai-ethics/ai-climate/assets/`.
Full sheets are kept in `temp/ai-climate-sheets/` outside `assets/` so they
do not inflate the SCORM zip size.

Checked full-size against the rules when the slides were written. Six panels
need a re-roll (paste the style line, the panel's sentence, and "One single
square image, not a grid"):

- `two-ledgers.png` came out as a dark engine room with no ledgers. The "One
  Engine, Two Honest Totals" slide has no art until this is redone; an HTML
  comment marks the spot.
- `morning.png` holds the family around the grate, and `present.png` holds
  the Spirit alone. The Christmas-morning panel (Scrooge at the window) was
  never drawn. The final poll uses `papers.png` for now.
- `queue.png` has a lettered shop sign (rule: no text).
- `idea-rolnick.png` has N and E on the weather vane and a numbered dial.
- `bill.png` has scribbled writing on the bill (rule 3: paper stays blank).
- `build-out.png` has four caricature faces that all read as men (rule 6).

Sheets E and G came out as smooth renders, not hard-edged pixel art. Not
used on any slide: `past.png`, `morning.png`, `two-ledgers.png`.

## Style line (first line of every story sheet)

```
16-bit SNES pixel art. Hard pixel edges, limited palette, warm gaslight and candlelight against cold blue snow. No text, letters, or numbers anywhere.
```

## Cast (keep these words the same in every panel)

- **Scrooge:** a thin Black woman in her sixties with close-cropped gray hair,
  small round spectacles, a dark green wool coat, and fingerless gloves.
- **Marley's Ghost:** a pale, see-through white man in his seventies with a
  bandage tied under his chin, wrapped in a long heavy chain hung with
  cash-boxes and lumps of coal.
- **Mrs. Cratchit:** a South Asian woman in her thirties with a long black
  braid, a patched brown shawl, and a coal-smudged apron.
- **Tim:** a small South Asian boy of eight with a wool cap and a little
  wooden crutch.
- **Freddie:** a cheerful Black woman in her twenties with a red scarf and a
  rolled-up blank map under her arm.
- **The Spirit of Christmas Past:** a small childlike figure of no clear age
  or gender in a white tunic, with a soft flame of light glowing from the top
  of its head.
- **The Spirit of Christmas Present:** a large, smiling brown-skinned woman
  with a holly wreath in her curly hair, in a long green robe trimmed with
  white fur, holding up a glowing torch.
- **The Spirit of Christmas Yet to Come:** a tall, still figure in a long
  dark hooded robe that hides its face, with one hand pointing.
- **The engine:** a wardrobe-sized brass thinking engine with a round boiler,
  a slow flywheel, pipes, and blank dials.

---

## Sheet A — the counting-house

```
16-bit SNES pixel art. Hard pixel edges, limited palette, warm gaslight and candlelight against cold blue snow. No text, letters, or numbers anywhere. Setting: Victorian London on a snowy Christmas Eve.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a narrow brick counting-house on a snowy street at night with one lit window, and behind it a tall chimney pouring dark smoke into the sky.
Top-right: a thin Black woman in her sixties with close-cropped gray hair, small round spectacles, a dark green wool coat, and fingerless gloves sits at a high desk with an open blank ledger, a locked coal-box at her feet.
Bottom-left: a South Asian woman in her thirties with a long black braid, a patched brown shawl, and a coal-smudged apron shovels coal into the firebox of a wardrobe-sized brass thinking engine with a round boiler, a slow flywheel, pipes, and blank dials.
Bottom-right: a blank deed, a quill pen, and a stick of red sealing wax lie on a desk beside a candle burned low, with a snowy window behind.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `title.png` | Title |
| Top-right | `scrooge.png` | If you haven't read the story |
| Bottom-left | `engine.png` | Three kinds of effect (or spare) |
| Bottom-right | `papers.png` | The papers and the deadline |

## Sheet B — Marley and the ledger

```
16-bit SNES pixel art. Hard pixel edges, limited palette, warm gaslight and candlelight against cold blue snow. No text, letters, or numbers anywhere. Setting: Victorian London on a snowy Christmas Eve.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a pale, see-through white man in his seventies with a bandage tied under his chin, wrapped in a long heavy chain hung with cash-boxes and lumps of coal, stands sadly in a dark bedroom doorway.
Top-right: a close view of one small iron chain link lying on a wooden floor, with a very long chain trailing away from it into the dark.
Bottom-left: a cheerful Black woman in her twenties with a red scarf and a rolled-up blank map under her arm points out a window at a rising river, with a brass weather-glass on the sill.
Bottom-right: two open blank ledgers side by side on a desk, a heap of coal resting on the left one and a small toy windmill standing on the right one.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `marley.png` | Marley's chain |
| Top-right | `link.png` | One riddle, one spoonful (or the "is your prompt a link?" poll) |
| Bottom-left | `freddie.png` | AI for sustainability vs the sustainability of AI |
| Bottom-right | `two-ledgers.png` | One engine, two honest totals |

## Sheet C — the three Spirits

```
16-bit SNES pixel art. Hard pixel edges, limited palette, warm gaslight and candlelight against cold blue snow. No text, letters, or numbers anywhere. Setting: Victorian England at Christmas.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a small childlike figure of no clear age or gender in a white tunic, with a soft flame of light glowing from the top of its head, stands on a hill above a coal mine with a great beam steam engine and rows of smoking chimneys.
Top-right: a large, smiling brown-skinned woman with a holly wreath in her curly hair, in a long green robe trimmed with white fur, holding up a glowing torch, stands in a tiny kitchen where a family of mixed ages huddles around a grate holding one small glowing coal.
Bottom-left: a tall, still figure in a long dark hooded robe that hides its face, with one hand pointing, stands beside a small South Asian boy of eight with a wool cap and a little wooden crutch, both looking at a city half hidden in fog.
Bottom-right: a thin Black woman in her sixties with close-cropped gray hair, small round spectacles, a dark green wool coat, and fingerless gloves throws open a window onto a bright, clear, snowy morning with church bells swinging.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `past.png` | The Spirit sets you down in 1865 |
| Top-right | `present.png` | The Cratchits' one coal and Scrooge's fire |
| Bottom-left | `yet-to-come.png` | "Will be" or "May be, only" |
| Bottom-right | `morning.png` | Christmas morning (final poll) |

## Sheet D — the town

```
16-bit SNES pixel art. Hard pixel edges, limited palette, warm gaslight and candlelight against cold blue snow. No text, letters, or numbers anywhere. Setting: Victorian London on a snowy Christmas Eve.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a single teaspoon holding a little coal dust rests on a table in front of a huge dark heap of coal that fills the room behind it.
Top-right: a long line of townspeople of mixed ages, genders, and skin tones winds down a snowy street and around the corner to the counter window of a brick counting-house.
Bottom-left: an unpaid blank bill lies on a table between three purses of different sizes: a fat velvet one, a plain leather one, and a small patched cloth one.
Bottom-right: a crowded town meeting in a candlelit hall, men and women of mixed ages and skin tones raising their hands to vote.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `spoonful.png` | One riddle, one spoonful |
| Top-right | `queue.png` | Three outcomes: saving, rebound, backfire |
| Bottom-left | `bill.png` | Who pays for the coal? |
| Bottom-right | `meeting.png` | "What should the town ask of her?" poll |

## Style line for idea scenes (sheets E and F)

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.
```

This is the shared style line from `docs/thinker-card-prompts.md`, so these
cards match the set in every other lesson.

## Sheet E — idea scenes

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: an open blank ledger ruled into three columns, with a lump of coal at the head of the first, a brass gear at the head of the second, and a tiny model town at the head of the third.
Top-right: a small, neat brass steam engine with a tiny coal scuttle beside it, standing in front of a mountain of coal many times its height.
Bottom-left: an open-topped vintage motor car parked alone on an empty, sunny country road, a picnic basket on its seat.
Bottom-right: a thousand tiny drops of water falling from many small cups into one large clay jug.
```

| Quadrant | File | Card |
|---|---|---|
| Top-left | `idea-kaack.png` | Kaack and colleagues: three kinds of effect |
| Top-right | `idea-jevons.png` | Jevons: a thriftier engine, a bigger coal heap |
| Bottom-left | `idea-sinnott-armstrong.png` | Sinnott-Armstrong: the Sunday joyride |
| Bottom-right | `idea-parfit-drops.png` | Parfit: many imperceptible effects, one large one |

## Sheet F — idea scenes

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a plain wooden plate holding one loaf of bread beside a tall, frosted, many-tiered cake on a silver stand.
Top-right: three dark storm fronts closing in from three sides on one small sailing boat on a rough sea.
Bottom-left: a row of hands passing a lit lantern forward, one to the next, along a line that fades into darkness ahead.
Bottom-right: a brass barometer, a weather vane, and a small model windmill arranged on a workbench.
```

| Quadrant | File | Card |
|---|---|---|
| Top-left | `idea-shue.png` | Shue: subsistence emissions and luxury emissions |
| Top-right | `idea-gardiner.png` | Gardiner: the perfect moral storm |
| Bottom-left | `idea-jonas.png` | Jonas: act so that life can go on after you |
| Bottom-right | `idea-rolnick.png` | Rolnick and colleagues: machine learning against climate change |

`idea-jonas.png` is the one idea scene with hands in it; rule 1 of
`docs/thinker-card-prompts.md` allows a hand where the panel names one. If
the generator adds faces, re-roll that panel alone.

`lessons/bioethics/ai-diagnosis/assets/idea-parfit.png` exists but pictures
the priority view. Don't reuse it here.

## Sheet G — our world today (the four ledger pages)

```
16-bit SNES pixel art. Hard pixel edges, limited palette, muted realistic colors, soft daylight. No text, letters, or numbers anywhere. Setting: real places in our world in the 2020s.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a row of long, windowless data center buildings on flat farmland at dusk, with tall power lines running to them and cooling units along the roofs.
Top-right: a phone lying on a desk beside one small glowing LED desk lamp, with the rest of the room dark.
Bottom-left: a huge construction site where cranes raise a new data hall beside three finished ones, with workers of mixed ages, genders, and skin tones in hard hats in the foreground.
Bottom-right: a weather forecaster, a Latina woman in her forties, studies a wall of blank glowing weather maps showing a swirling storm, while through the window an airliner leaves a white trail across the sky.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `data-center.png` | Ledger page 1: how big is it? |
| Top-right | `bulb.png` | Ledger page 2: what one prompt costs |
| Bottom-left | `build-out.png` | Ledger page 3: cheaper answers, rising totals |
| Bottom-right | `forecast.png` | Ledger page 4: the promise |

## Alt-text reminder

Write `alt` from what the final PNG shows, not from the prompt. Check that
ledgers, deeds, bills, maps, and dials came out blank, that the last Spirit
has no skull or scythe, that no figure looks like a film Scrooge, and that
the crowds came out mixed.
