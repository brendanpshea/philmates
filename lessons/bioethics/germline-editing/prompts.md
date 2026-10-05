# Image prompts — Germline Editing ("The Villa Diodati Clinic")

Sixteen scenes ship as 512×512 PNGs in `/assets/`, generated as **four 2×2
sheets** and split into quadrants. Each sheet below is one complete
prompt, ready to paste: house style, grid wrapper, and the four panels in order. On
`flux-2-dev` a sheet renders at 1024², so each quadrant is already 512×512.
See [docs/image-generation.md](../../../docs/image-generation.md). Inspect every
panel full-size: reject any with baked-in text.

The cast is **invented**: a near-future couple and their doctor at a lakeside
clinic. The names Mary, Percy, and Byron nod to the summer of 1816 that produced
*Frankenstein*, and that is as far as the borrowing goes. Five rules:

1. **Original designs only.** No likeness to the historical Shelleys or Lord
   Byron, or to any portrait, film, or TV depiction of them. Don't name them, the
   novel, or any adaptation in a prompt.
2. **No monster, no mad scientist.** No stitched creature, no lightning-rod
   apparatus, no bubbling flasks, no sinister doctor. That imagery argues the
   case against editing before the student has heard it. The storm is weather.
3. **Dignity for the condition.** Mary and Percy both have cystic fibrosis. They
   are capable adults making a decision, never frail, pitiable, or shown in
   hospital beds. The only visible cue is a small inhaler.
4. **Embryos are abstract.** A small round cluster of glowing cells in a dish.
   Never a miniature baby, never a face.
5. **No portraits of real people.** He Jiankui and Joel Feinberg get idea-emblem
   relic cards.

## Status (2026-10-05)

Generated all four 2×2 sheets (`sheet-a.png`, `sheet-b.png`, `sheet-c.png`, `sheet-d.png`)
with simplified quadrant prompts via the built-in image generation tool, then split
into all 16 distinct 512×512 PNG assets in `/assets/`. Cleaned baked-in text from
`byron-menu.png`. Hand-authored `relic-2018.svg` and `relic-feinberg.svg` in `/assets/`.

All 16 scene PNGs and 2 relic SVGs are validated, on-style (16-bit SNES/JRPG pixel
art with PhilMates palette), text-free, and ready for authoring `index.html`.

Where the art differs from the prompt (alt text in `index.html` describes what
was drawn):
- `byron-menu.png` has the word "Menu" baked into the folder's cover plate.
  Paint it out or re-roll; it breaks the no-text rule.
- `all-the-same.png` shows eight dishes in two rows, not six in one.
- `family-tree.png` has a fifth, partial tier of lanterns below the 1-2-4-8.
- `dr-byron.png` has a name badge and no tablet.
- `ink-in-the-spring.png` shows three cottages, not four.
- `three-envelopes.png` shows one pair of hands, and the magenta envelope sits
  in front of the other two.
- `two-staircases.png` puts both pairs of shoes in front of the stone stair.

The sheet PNGs were deleted after splitting (2026-10-05) to keep the SCORM zip
small. Regenerate a sheet from its prompt if a panel needs redoing.

## House style (already included in each sheet prompt)

> **16-bit SNES/JRPG pixel art**, near-future clinic inside an old lakeside
> villa: gothic stone and tall windows outside, warm and modern inside. Hard
> pixel edges, no anti-aliasing, subtle dithered shading, chunky silhouettes
> that read clearly at 64 px. Tight palette drawn from the PhilMates UI: void
> background `#11131f`, panel slate `#1d2235`, ink `#eef1ff`, and four accent
> inks: go-green `#46e07a`, magenta `#ff6ad5`, info-blue `#4cc2ff`, amber
> `#ffcf5a`. Lighting: **cool blue storm-light through windows, warm amber lamps
> indoors**. Thoughtful and hopeful, not creepy. **No text, no lettering, no
> letters of any alphabet, no numbers, no watermark, no signature.**

## Grid wrapper (already included in each sheet prompt)

> A **2×2 grid of four separate square illustrations**, all the same size, in
> the same art style and palette. The four panels are divided by one straight
> vertical and one straight horizontal gutter of plain `#11131f`, each gutter
> about 16 px wide. Nothing crosses a gutter. Each panel is a complete,
> self-contained scene with its own `#11131f` background and its subject
> centred with a clear margin. No panel borders, no captions, no panel numbers.
> The four panels, in reading order:

## Cast (paste the matching line into any panel that shows a character)

Reuse these descriptions word for word so the three stay recognisable across
sheets.

- **Mary:** a woman in her early thirties with warm brown skin and short
  natural curls, round amber-rimmed glasses, a deep magenta cardigan over a grey
  dress, a small notebook always in hand. Expression: sharp and questioning.
- **Percy:** a tall, slim man in his early thirties with pale skin and untidy
  sandy hair, a go-green scarf over a rumpled navy jacket, a small blue inhaler
  in his breast pocket. Expression: earnest and hopeful.
- **Dr. Byron:** a doctor in her fifties with East Asian features and a silver
  streak in a black bob, a long white clinic coat over an info-blue waistcoat,
  a slim glowing tablet held like a restaurant menu. Expression: charming,
  confident, a little too pleased with the menu.

---

## Sheet A — the villa and the cast

Save as `sheet-a.png`, then split.

> **16-bit SNES/JRPG pixel art**, near-future clinic inside an old lakeside
> villa: gothic stone and tall windows outside, warm and modern inside. Hard
> pixel edges, no anti-aliasing, subtle dithered shading, chunky silhouettes
> that read clearly at 64 px. Tight palette drawn from the PhilMates UI: void
> background `#11131f`, panel slate `#1d2235`, ink `#eef1ff`, and four accent
> inks: go-green `#46e07a`, magenta `#ff6ad5`, info-blue `#4cc2ff`, amber
> `#ffcf5a`. Lighting: **cool blue storm-light through windows, warm amber lamps
> indoors**. Thoughtful and hopeful, not creepy. **No text, no lettering, no
> letters of any alphabet, no numbers, no watermark, no signature.**
>
> A **2×2 grid of four separate square illustrations**, all the same size, in
> the same art style and palette. The four panels are divided by one straight
> vertical and one straight horizontal gutter of plain `#11131f`, each gutter
> about 16 px wide. Nothing crosses a gutter. Each panel is a complete,
> self-contained scene with its own `#11131f` background and its subject
> centred with a clear margin. No panel borders, no captions, no panel numbers.
> The four panels, in reading order:
>
> **Top-left:** A grand three-storey stone villa on a hillside above a wide dark
> lake at night, seen from the lakeshore path. Rain falling, a single fork of
> pale lightning far off over the mountains on the far shore. Every tall window
> glows warm amber. A discreet modern glass entrance has been added to the old
> stone front, lit info-blue. A small rowing boat is tied at a jetty below.
>
> **Top-right:** Portrait, chest up, three-quarter view: a woman in her early
> thirties with warm brown skin and short natural curls, round amber-rimmed
> glasses, a deep magenta cardigan over a grey dress, a small notebook held
> against her chest. Expression: sharp and questioning. Behind her, a
> rain-streaked window.
>
> **Bottom-left:** Portrait, chest up, three-quarter view: a tall, slim man in
> his early thirties with pale skin and untidy sandy hair, a go-green scarf over
> a rumpled navy jacket, a small blue inhaler in his breast pocket. Expression:
> earnest and hopeful. Behind him, a warm lamp and a bookshelf with blank spines.
>
> **Bottom-right:** Portrait, chest up, facing the viewer: a doctor in her
> fifties with East Asian features and a silver streak in a black bob, a long
> white clinic coat over an info-blue waistcoat, holding a slim glowing tablet
> like a restaurant menu, its screen blank. Expression: charming and confident.
> Behind her, a tidy modern consulting room with an arched stone window.

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `villa-diodati.png` | Title, recap | Sets the frame. Reuse on the closing slide. |
| Top-right | `mary.png` | Meet the couple; consent argument | Mary voices the worries: consent and the open future. |
| Bottom-left | `percy.png` | Meet the couple; "we already choose" | Percy voices the case for. The inhaler is the only cue to CF. |
| Bottom-right | `dr-byron.png` | The menu | The tablet-as-menu sets up the three escalating requests. |

---

## Sheet B — the science

Save as `sheet-b.png`, then split. No characters.

> **16-bit SNES/JRPG pixel art**, near-future clinic inside an old lakeside
> villa: gothic stone and tall windows outside, warm and modern inside. Hard
> pixel edges, no anti-aliasing, subtle dithered shading, chunky silhouettes
> that read clearly at 64 px. Tight palette drawn from the PhilMates UI: void
> background `#11131f`, panel slate `#1d2235`, ink `#eef1ff`, and four accent
> inks: go-green `#46e07a`, magenta `#ff6ad5`, info-blue `#4cc2ff`, amber
> `#ffcf5a`. Lighting: **cool blue storm-light through windows, warm amber lamps
> indoors**. Thoughtful and hopeful, not creepy. **No text, no lettering, no
> letters of any alphabet, no numbers, no watermark, no signature.**
>
> A **2×2 grid of four separate square illustrations**, all the same size, in
> the same art style and palette. The four panels are divided by one straight
> vertical and one straight horizontal gutter of plain `#11131f`, each gutter
> about 16 px wide. Nothing crosses a gutter. Each panel is a complete,
> self-contained scene with its own `#11131f` background and its subject
> centred with a clear margin. No panel borders, no captions, no panel numbers.
> The four panels, in reading order:
>
> **Top-left:** A huge old recipe book lying open on a wooden kitchen table.
> Its pages are filled with rows of small coloured squares in four colours
> (green, magenta, blue, amber) instead of writing. A ribbon bookmark rises from
> the spine and twists upward into a glowing double-helix spiral. On the
> right-hand page, exactly one square in one row glows brighter than the rest
> and is the wrong colour for its row. A wooden spoon and a mixing bowl sit
> beside the book.
>
> **Top-right:** A scene split down the middle by a thin vertical line of light.
> Left half: a plain standing human silhouette in slate grey, with one small
> patch glowing go-green in the chest. Right half: a shallow round glass dish on
> a lab bench holding a small cluster of eight round cells, every one of them
> glowing go-green.
>
> **Bottom-left:** A neat row of exactly six shallow round glass dishes on a lab
> bench under a soft lamp, seen from slightly above. Each dish holds one small
> round cluster of pale cells. Every cluster has the same single magenta dot in
> the same place. A magnifying glass on a stand hovers over the third dish,
> showing the same magenta dot enlarged.
>
> **Bottom-right:** A bright, calm treatment room. A teenager in ordinary
> clothes sits comfortably in a reclining chair by a sunny window, reading a
> book, one sleeve rolled up. A clear drip bag hangs on a stand beside the
> chair, full of tiny go-green glowing dots, with a thin line running to the
> arm. A potted plant on the windowsill.

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `recipe-book.png` | DNA as a recipe book | Genes are instructions; a disease gene is one wrong square. Squares stand in for letters so no text is needed. |
| Top-right | `two-cells.png` | Somatic vs germline | Left: an edit in one part of one body. Right: an edit made so early it ends up in every cell. |
| Bottom-left | `all-the-same.png` | Why screening can't help | Every embryo carries the same mark, so there is no unaffected one to choose. |
| Bottom-right | `somatic-infusion.png` | Somatic anchor (Casgevy, 2023) | Somatic therapy is real and treats one consenting patient. Keep it sunny and ordinary. |

---

## Sheet C — the ripple, the menu, and the case for

Save as `sheet-c.png`, then split. No named characters.

> **16-bit SNES/JRPG pixel art**, near-future clinic inside an old lakeside
> villa: gothic stone and tall windows outside, warm and modern inside. Hard
> pixel edges, no anti-aliasing, subtle dithered shading, chunky silhouettes
> that read clearly at 64 px. Tight palette drawn from the PhilMates UI: void
> background `#11131f`, panel slate `#1d2235`, ink `#eef1ff`, and four accent
> inks: go-green `#46e07a`, magenta `#ff6ad5`, info-blue `#4cc2ff`, amber
> `#ffcf5a`. Lighting: **cool blue storm-light through windows, warm amber lamps
> indoors**. Thoughtful and hopeful, not creepy. **No text, no lettering, no
> letters of any alphabet, no numbers, no watermark, no signature.**
>
> A **2×2 grid of four separate square illustrations**, all the same size, in
> the same art style and palette. The four panels are divided by one straight
> vertical and one straight horizontal gutter of plain `#11131f`, each gutter
> about 16 px wide. Nothing crosses a gutter. Each panel is a complete,
> self-contained scene with its own `#11131f` background and its subject
> centred with a clear margin. No panel borders, no captions, no panel numbers.
> The four panels, in reading order:
>
> **Top-left:** A family tree drawn as a real tree at night. Its branches hold
> round paper lanterns arranged in four clear tiers: one lantern at the top,
> two below it, four below those, eight along the bottom. The top lantern glows
> go-green, and glowing green light runs down the branches so that every
> lantern below is lit the same green. Plain dark hillside behind.
>
> **Top-right:** A round silver serving tray on a white tablecloth, seen from
> slightly above, holding exactly three glass vials standing in a row from
> small to large. The small vial glows go-green, the middle vial glows
> info-blue, the large vial glows magenta. Beside the tray, a closed leather
> menu folder with a blank cover and a small silver service bell.
>
> **Bottom-left:** A bright morning on a grassy lakeshore. A child of about
> eight runs flat out along the shore flying a red kite, mouth open in a
> laugh, hair blown back. Mountains and calm blue water behind. Seen from the
> side, the whole figure in frame.
>
> **Bottom-right:** A cosy kitchen table in the evening. A parent leans over a
> child's shoulder, pointing at an open exercise book with blank pages. On the
> table: a glass of milk, a pair of small child's glasses, a bowl of fruit, a
> small bottle with a blank label. A child-sized violin leans against the
> chair. Warm amber lamp overhead.

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `family-tree.png` | Germline ripple (teach slide before the viz) | A germline edit is inherited by every descendant. Reused in Act 4 for a mistake rippling down. |
| Top-right | `byron-menu.png` | The three requests | Small to large is fix, lower a risk, add an advantage. Colours match the spectrum viz. |
| Bottom-left | `easy-breath.png` | Argument for: preventing suffering | The good on offer: a child who never has the disease. Joy, not pity. |
| Bottom-right | `already-choosing.png` | Argument for: parents already shape children | Glasses, vitamins, tutoring, music lessons. How is editing different? |

---

## Sheet D — the case against, and the decision

Save as `sheet-d.png`, then split. No faces.

> **16-bit SNES/JRPG pixel art**, near-future clinic inside an old lakeside
> villa: gothic stone and tall windows outside, warm and modern inside. Hard
> pixel edges, no anti-aliasing, subtle dithered shading, chunky silhouettes
> that read clearly at 64 px. Tight palette drawn from the PhilMates UI: void
> background `#11131f`, panel slate `#1d2235`, ink `#eef1ff`, and four accent
> inks: go-green `#46e07a`, magenta `#ff6ad5`, info-blue `#4cc2ff`, amber
> `#ffcf5a`. Lighting: **cool blue storm-light through windows, warm amber lamps
> indoors**. Thoughtful and hopeful, not creepy. **No text, no lettering, no
> letters of any alphabet, no numbers, no watermark, no signature.**
>
> A **2×2 grid of four separate square illustrations**, all the same size, in
> the same art style and palette. The four panels are divided by one straight
> vertical and one straight horizontal gutter of plain `#11131f`, each gutter
> about 16 px wide. Nothing crosses a gutter. Each panel is a complete,
> self-contained scene with its own `#11131f` background and its subject
> centred with a clear margin. No panel borders, no captions, no panel numbers.
> The four panels, in reading order:
>
> **Top-left:** A mountain spring at the top of a hillside, seen from above and
> to one side. A single drop of magenta ink has just fallen into the spring's
> clear pool. Below, the stream runs downhill past four small cottages, one
> after another, each with a lit window. The magenta colour is already
> spreading down the stream toward the first cottage; the water below is still
> clear blue.
>
> **Top-right:** A small child seen from behind, standing at the start of a
> long hallway. Many doors line both walls, each a different colour and each
> standing open with light spilling out. At the near end, exactly one door has
> been bricked shut. The child looks down the hallway.
>
> **Bottom-left:** Two staircases rising side by side from the same stone
> floor. The left staircase is a smooth, gleaming escalator edged in amber
> light, climbing high out of frame. The right staircase is worn stone with
> cracked and missing steps, climbing only a short way. Two identical pairs of
> small shoes sit at the bottom, one pair before each staircase.
>
> **Bottom-right:** Close view of a round wooden table by a storm-lit window.
> Exactly three sealed envelopes lie in a row on the table, each closed with a
> wax seal: the first go-green, the second info-blue, the third magenta. Two
> pairs of hands rest on the table edge, one with a magenta cardigan cuff and
> one with a navy jacket cuff, the nearer hands almost touching. A lit candle
> and a fountain pen beside the envelopes. No faces.

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `ink-in-the-spring.png` | Argument against: safety and irreversibility | A mistake upstream reaches everyone downstream and can't be taken back out. |
| Top-right | `open-doors.png` | Argument against: consent and the open future | The child can't agree in advance. Most doors stay open; an edit may close one for them. |
| Bottom-left | `two-staircases.png` | Argument against: fairness | Same starting floor, unequal climbs. Shoes, not people, so nobody is cast as the loser. |
| Bottom-right | `three-envelopes.png` | Final decision | One envelope per menu item; seal colours match `byron-menu.png`. The students choose. |

---

## Relic cards (hand-authored SVG, 80×108)

Use the standard frame: dark border, accent inner frame, rank gem in the top bar,
rarity pips at the bottom. See `lessons/ethical-theory/*/assets/` for reference.
These are not generated.

### `relic-2018.svg` — the He Jiankui case (accent: amber `#ffcf5a`)
Emblem: a laboratory door standing ajar, a broken padlock hanging from its
latch, a thin line of light on the floor. Encodes the first germline-edited
babies, born in 2018 before the safety questions were answered.

### `relic-feinberg.svg` — Joel Feinberg (accent: info-blue `#4cc2ff`)
Emblem: a ring of keys, each a different shape, held out in an open palm.
Encodes the child's right to an open future: the keys are theirs to use later.

## Alt-text reminder

Write `alt` from what the final PNG shows, not from the prompt. Counts are the
usual failure: check for exactly six dishes, three vials, three envelopes, and
1-2-4-8 lanterns before shipping.
