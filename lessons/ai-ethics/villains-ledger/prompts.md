# Image prompts — Cryptocurrency ("Why Supervillains Prefer to Be Paid in Crypto")

Twenty scenes ship as 512×512 PNGs in `/assets/`, generated as **five 2×2
sheets** and split into quadrants. Each sheet below is one complete prompt,
ready to paste: house style, grid wrapper, and the four panels in order. On
`flux-2-dev` a sheet renders at 1024², so each quadrant is already 512×512.
See [docs/image-generation.md](../../../docs/image-generation.md). Inspect every
panel full-size: reject any with baked-in text.

The batch file `temp/villains-ledger-sheets.json` is built from the blockquotes
in this file, so edit a prompt here and rebuild rather than editing the JSON.

The cast is **invented**: a cartoon supervillain, her accountant, and a
reporter. Six rules:

1. **Original designs only.** No likeness to any existing film, comic, or
   cartoon villain. Don't name a franchise or a character in a prompt.
2. **The villainy is harmless.** The hostage is a giant rubber duck. No weapons
   pointed at anyone, no people tied up, no gore. The lair is silly, not scary.
3. **The real harms are not a joke.** `locked-screen.png` illustrates ransomware
   attacks on hospitals, which are real. It has no characters and no comedy.
4. **No currency symbols and no logos.** Coins are plain gold discs with blank
   faces. Banknotes are plain green rectangles. No ₿, no $, no coin brand.
5. **Dignity for the people with good reasons.** Amara, the homeowners, and
   the shopper are ordinary capable people in a
   bad spot. Never pitiable, never comic.
6. **No portraits of real people.** Satoshi Nakamoto and Langdon Winner get
   idea-emblem relic cards.

## Palette note

The other AI-ethics lessons already have a look: Amberville is brass and gold,
The Breadcrumb Network is amber forest, Frankenstein's Mistake is cold bone and
slate, The Network With No Middle is phosphor green and beige. This one is the
**cartoon volcano lair**: violet-black rock, magenta glow, gold coins. Sheets C
and E leave the lair for the ordinary world and switch to plain daylight or
lamplight, which also marks the change of tone.

## Status (2026-10-05)

Generated all five 2×2 sheets (`sheet-a.png`, `sheet-b.png`, `sheet-c.png`,
`sheet-d.png`, `sheet-e.png`) using simplified quadrant prompts via the built-in
image generator. Split into all 20 individual 512×512 PNG assets in `/assets/`.
Scrubbed text from `bailout.png`.

All 20 scene PNGs and both hand-authored relic SVGs (`relic-satoshi.svg`,
`relic-winner.svg`) are validated, on-style, text-free, and ready for authoring `index.html`.

Notes from building the deck (2026-10-05). Where the panels differ from the prompts:

- **`bailout.png` was re-cropped from the sheet and scrubbed a second time**
  while building the deck, replacing the earlier scrubbed copy. The word BANK
  is painted out with the surrounding stone color.
- **`glass-trail.png` had digit-like marks on the ledger pages.** The
  lower-right page was refilled and redrawn as plain ruled bars, and the left
  wall was coarsened.
- **Doctor Calamity is off-model on sheet B.** In `bank-counter.png` and
  `cardboard-crowd.png` she is a figure with black hair and a mustache. That
  suits the bank disguise, so the cardboard slide says she is "still wearing
  her bank mustache." Reroll sheet B's bottom-right if that joke wears thin.
- `two-ledgers.png` has eight villagers in the ring, not seven.
- `frozen-card.png`: Amara holds a microphone, not a bank card.
- `three-piles.png`: one huge heap behind the table and two tiny piles on it.
  No dice, and no rope on the door.
- `power-town.png`: the cables run to two blocks of computer racks and a
  neighborhood, not one warehouse and one town of equal width.
- `coaster.png` has three riders. `locked-screen.png` has four monitors.
- `mining-hall.png` has no window or power station.

Alt text in `index.html` describes the panels as they are.

The sheet PNGs were deleted after splitting (2026-10-05) to keep the SCORM zip
small. Regenerate a sheet from its prompt if a panel needs redoing.

## House style (already included in each sheet prompt)

> **16-bit SNES/JRPG pixel art** in a playful Saturday-morning-cartoon world.
> Hard pixel edges, no anti-aliasing, subtle dithered shading, chunky
> silhouettes that read clearly at 64 px. Tight palette drawn from the PhilMates
> UI: void background `#11131f`, panel slate `#1d2235`, ink `#eef1ff`, and four
> accent inks: go-green `#46e07a`, magenta `#ff6ad5`, info-blue `#4cc2ff`, amber
> `#ffcf5a`, plus deep violet for villain scenes. Never gory, never frightening.
> Every coin is a plain gold disc with a blank face. Every banknote is a plain
> green rectangle. Every book, screen, sign, form, and sheet of paper is blank
> or shows only rows of small colored squares. **No text, no lettering, no
> letters of any alphabet, no numbers, no currency symbols, no logos, no
> watermark, no signature.**

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

- **Doctor Calamity:** a tall supervillain in her fifties with a towering
  swept-up silver-white hairdo, amber-tinted round goggles pushed up on her
  forehead, a high-collared deep violet lab coat with magenta lining, and long
  black rubber gloves. Expression: theatrical and exasperated.
- **Penny:** a short, round accountant with warm brown skin, a green
  accountant's eyeshade visor, round glasses, a plain slate-grey jumpsuit with
  sleeve garters, and a wooden abacus under one arm. Expression: patient, dry,
  unimpressed.
- **Amara:** a newspaper reporter in her thirties with dark brown skin and long
  braids tied back, an info-blue raincoat, a canvas satchel, and a small camera
  on a strap. Expression: determined.
- **Henchmen:** small identical figures in slate-grey jumpsuits and round
  helmets with a magenta stripe. Scenery, never portraits.

---

## Sheet A — the lair and the cast

Save as `sheet-a.png`, then split.

> **16-bit SNES/JRPG pixel art** in a playful Saturday-morning-cartoon world.
> Hard pixel edges, no anti-aliasing, subtle dithered shading, chunky
> silhouettes that read clearly at 64 px. Tight palette drawn from the PhilMates
> UI: void background `#11131f`, panel slate `#1d2235`, ink `#eef1ff`, and four
> accent inks: go-green `#46e07a`, magenta `#ff6ad5`, info-blue `#4cc2ff`, amber
> `#ffcf5a`, plus deep violet for villain scenes. Never gory, never frightening.
> Every coin is a plain gold disc with a blank face. Every banknote is a plain
> green rectangle. Every book, screen, sign, form, and sheet of paper is blank
> or shows only rows of small colored squares. **No text, no lettering, no
> letters of any alphabet, no numbers, no currency symbols, no logos, no
> watermark, no signature.**
>
> A **2×2 grid of four separate square illustrations**, all the same size, in
> the same art style and palette. The four panels are divided by one straight
> vertical and one straight horizontal gutter of plain `#11131f`, each gutter
> about 16 px wide. Nothing crosses a gutter. Each panel is a complete,
> self-contained scene with its own `#11131f` background and its subject
> centred with a clear margin. No panel borders, no captions, no panel numbers.
> The four panels, in reading order:
>
> **Top-left:** A small volcano island at night, seen from the sea. The crater
> glows magenta instead of red, with a thin curl of pink smoke. A round steel
> door and three lit round porthole windows are set into the violet-black
> cliff. A dish antenna sits on the rim and a small submarine is moored at a
> dock on the waterline. Stars and a calm dark sea.
>
> **Top-right:** Portrait, chest up, three-quarter view: a tall supervillain in
> her fifties with a towering swept-up silver-white hairdo, amber-tinted round
> goggles pushed up on her forehead, a high-collared deep violet lab coat with
> magenta lining, and long black rubber gloves, one hand raised dramatically.
> Expression: theatrical and exasperated. Behind her, a control room wall of
> blank glowing screens.
>
> **Bottom-left:** Portrait, chest up, three-quarter view: a short, round
> accountant with warm brown skin, a green accountant's eyeshade visor, round
> glasses, a plain slate-grey jumpsuit with sleeve garters, and a wooden abacus
> held under one arm. Expression: patient, dry, unimpressed. Behind them, a
> cramped office with grey filing cabinets and tall stacks of blank paper under
> one amber desk lamp.
>
> **Bottom-right:** A huge bright yellow rubber duck, three storeys tall,
> sitting inside an enormous glass dome in a violet rock cavern. Two tiny
> henchmen in slate-grey jumpsuits and round helmets stand guard at the base of
> the dome, no taller than the duck's beak is wide. A red velvet rope on brass
> posts runs around the dome. Magenta light from above.

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `lair.png` | Title, recap | Sets the frame. Reuse on the closing slide. |
| Top-right | `doctor-calamity.png` | The ransom problem; "the report" | She wants four things from a payment: no pickup, no questions, no refusal, no undo. |
| Bottom-left | `penny.png` | Money is a list; the bill arrives | The teaching voice. Penny explains how each thing works and what it costs. |
| Bottom-right | `harbor-duck.png` | The hostage | Keeps the crime harmless so the jokes are safe to make. |

---

## Sheet B — the ransom problem and the two ledgers

Save as `sheet-b.png`, then split.

> **16-bit SNES/JRPG pixel art** in a playful Saturday-morning-cartoon world.
> Hard pixel edges, no anti-aliasing, subtle dithered shading, chunky
> silhouettes that read clearly at 64 px. Tight palette drawn from the PhilMates
> UI: void background `#11131f`, panel slate `#1d2235`, ink `#eef1ff`, and four
> accent inks: go-green `#46e07a`, magenta `#ff6ad5`, info-blue `#4cc2ff`, amber
> `#ffcf5a`, plus deep violet for villain scenes. Never gory, never frightening.
> Every coin is a plain gold disc with a blank face. Every banknote is a plain
> green rectangle. Every book, screen, sign, form, and sheet of paper is blank
> or shows only rows of small colored squares. **No text, no lettering, no
> letters of any alphabet, no numbers, no currency symbols, no logos, no
> watermark, no signature.**
>
> A **2×2 grid of four separate square illustrations**, all the same size, in
> the same art style and palette. The four panels are divided by one straight
> vertical and one straight horizontal gutter of plain `#11131f`, each gutter
> about 16 px wide. Nothing crosses a gutter. Each panel is a complete,
> self-contained scene with its own `#11131f` background and its subject
> centred with a clear margin. No panel borders, no captions, no panel numbers.
> The four panels, in reading order:
>
> **Top-left:** A cargo bay inside a violet rock cavern. A wooden shipping
> pallet is stacked into a neat cube of banknote bundles taller than a person,
> each bundle a plain green rectangle with a plain white paper band. A small
> henchman in a slate-grey jumpsuit and round helmet stands beside it holding
> one small open empty briefcase, looking up at the stack. A yellow forklift is
> parked behind.
>
> **Top-right:** A bank counter seen from the side, in warm daylight. On the
> customer side stands a tall woman with a towering swept-up silver-white
> hairdo and a high-collared deep violet coat, wearing an obviously fake black
> mustache and a small bowler hat as a disguise. Behind the counter glass a
> calm bank teller in an info-blue vest holds up one flat palm in a stop
> gesture. A single blank white sheet of paper lies on the counter between
> them. A round steel vault door is closed in the wall behind the teller.
>
> **Bottom-left:** A scene split down the middle by a thin vertical line of
> light. Left half: one enormous open book on a tall wooden lectern behind a
> brass rail, a single keeper in an info-blue vest standing over it with a
> quill, a large key hanging at the belt, and three villagers waiting in a
> queue. Right half: seven villagers standing in a ring on a village green,
> each holding an identical small open book, and every book glows the same
> go-green.
>
> **Bottom-right:** A tall woman with a towering swept-up silver-white hairdo
> and a high-collared deep violet coat stands proudly with arms spread wide in
> front of three rows of identical flat cardboard cutout henchmen propped up on
> wooden stands, each cutout with one arm raised. The cutouts are visibly flat
> brown cardboard, some leaning, and one has fallen over on its face. One real
> henchman in a slate-grey jumpsuit stands at the side with arms folded.

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `cash-pallet.png` | Option one: cash | A million dollars in hundreds weighs about 10 kg. A billion weighs ten tonnes, and someone has to collect it. |
| Top-right | `bank-counter.png` | Option two: the bank | The keeper knows who you are and can say no. The disguise is the joke; the stop gesture is the point. |
| Bottom-left | `two-ledgers.png` | Money is a list; everyone keeps the list | Left: one trusted keeper. Right: no keeper, identical copies. The core picture of the lesson. |
| Bottom-right | `cardboard-crowd.png` | Why voting fails | Fake identities are free, so one-person-one-vote cannot run a network anyone can join. |

---

## Sheet C — why some people wanted out

Save as `sheet-c.png`, then split. Ordinary world, no lair, no comedy.

> **16-bit SNES/JRPG pixel art** in a playful Saturday-morning-cartoon world.
> Hard pixel edges, no anti-aliasing, subtle dithered shading, chunky
> silhouettes that read clearly at 64 px. Tight palette drawn from the PhilMates
> UI: void background `#11131f`, panel slate `#1d2235`, ink `#eef1ff`, and four
> accent inks: go-green `#46e07a`, magenta `#ff6ad5`, info-blue `#4cc2ff`, amber
> `#ffcf5a`, plus deep violet for villain scenes. Never gory, never frightening.
> Every coin is a plain gold disc with a blank face. Every banknote is a plain
> green rectangle. Every book, screen, sign, form, and sheet of paper is blank
> or shows only rows of small colored squares. **No text, no lettering, no
> letters of any alphabet, no numbers, no currency symbols, no logos, no
> watermark, no signature.**
>
> A **2×2 grid of four separate square illustrations**, all the same size, in
> the same art style and palette. The four panels are divided by one straight
> vertical and one straight horizontal gutter of plain `#11131f`, each gutter
> about 16 px wide. Nothing crosses a gutter. Each panel is a complete,
> self-contained scene with its own `#11131f` background and its subject
> centred with a clear margin. No panel borders, no captions, no panel numbers.
> The four panels, in reading order:
>
> **Top-left:** An ordinary city street under a grey sky. A grand stone bank
> building with tall columns is badly cracked and leaning, held up by heavy
> timber braces. A crane lowers one huge bulging sack of gold coins in through
> its roof. In the foreground stand three small houses with boarded-up windows
> and one cardboard moving box left on the pavement.
>
> **Top-right:** A city street at dusk. A newspaper reporter in her thirties
> with dark brown skin and long braids tied back, an info-blue raincoat, a
> canvas satchel, and a small camera on a strap stands at an outdoor cash
> machine holding a bank card. The machine is frozen solid: its card slot is
> sealed in a block of ice, icicles hang from it, and its screen shows only one
> large padlock shape. Expression: determined, not defeated.
>
> **Bottom-left:** A market street in daylight. A shopper pushes a wheelbarrow
> piled high with bundles of plain green banknotes up to a bakery stall. The
> baker behind the stall holds out one single small loaf of bread. Loose
> banknotes blow along the ground like fallen leaves.
>
> **Bottom-right:** A long stone counting table seen from the front, holding
> exactly three heaps of gold coins in a row. The left heap is huge, taller
> than everything else on the table. The middle heap and the right heap are
> both small and the same size as each other. Behind the huge heap stand a
> roulette wheel and a pair of blank dice. Behind the middle heap stands a
> heavy closed door with a red velvet rope across it. Behind the right heap
> stands a small shopping basket holding a loaf of bread.

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `bailout.png` | Worry one: the keeper can fail | 2008. The banks were rescued; many of their customers were not. |
| Top-right | `frozen-card.png` | Worry two: the keeper can say no to the wrong people | Amara's account is frozen for her reporting. Same power that stops Doctor Calamity. |
| Bottom-left | `wheelbarrow.png` | Worry three: the keeper can print | Hyperinflation: savings that buy a loaf of bread. |
| Bottom-right | `three-piles.png` | What is it actually used for? | Betting is the big pile. Payments a keeper would stop and everyday buying are both small. The two small heaps are equal on purpose: the lesson does not rank them. |

---

## Sheet D — how it works, and what it costs

Save as `sheet-d.png`, then split. No named characters.

> **16-bit SNES/JRPG pixel art** in a playful Saturday-morning-cartoon world.
> Hard pixel edges, no anti-aliasing, subtle dithered shading, chunky
> silhouettes that read clearly at 64 px. Tight palette drawn from the PhilMates
> UI: void background `#11131f`, panel slate `#1d2235`, ink `#eef1ff`, and four
> accent inks: go-green `#46e07a`, magenta `#ff6ad5`, info-blue `#4cc2ff`, amber
> `#ffcf5a`, plus deep violet for villain scenes. Never gory, never frightening.
> Every coin is a plain gold disc with a blank face. Every banknote is a plain
> green rectangle. Every book, screen, sign, form, and sheet of paper is blank
> or shows only rows of small colored squares. **No text, no lettering, no
> letters of any alphabet, no numbers, no currency symbols, no logos, no
> watermark, no signature.**
>
> A **2×2 grid of four separate square illustrations**, all the same size, in
> the same art style and palette. The four panels are divided by one straight
> vertical and one straight horizontal gutter of plain `#11131f`, each gutter
> about 16 px wide. Nothing crosses a gutter. Each panel is a complete,
> self-contained scene with its own `#11131f` background and its subject
> centred with a clear margin. No panel borders, no captions, no panel numbers.
> The four panels, in reading order:
>
> **Top-left:** A vast warehouse receding into the distance, filled with long
> rows of identical metal racks of machines with spinning fans and small green
> and amber lamps. One thick bundle of power cables runs along the floor and
> out through the wall. Through a big window, a power station with two cooling
> towers and rising steam. In the foreground, a brass raffle drum full of blank
> paper tickets on a stand.
>
> **Top-right:** A wooden pier at night. A heavy iron-bound treasure chest sits
> locked on the pier, gold light leaking from under its lid. Beside it a figure
> kneels and reaches an arm down through a gap in the planks. Below the pier,
> one small golden key sinks through dark blue water, trailing bubbles.
>
> **Bottom-left:** A roller coaster at night whose track is shaped like a
> jagged line chart: a steep climb, a sharp peak, then a near-vertical plunge.
> One cart with four riders is at the very top, arms in the air, gold coins
> flying out of their pockets. Fairground lights and a striped tent far below.
>
> **Bottom-right:** A night landscape split by one tall power pylon in the
> middle. From the pylon, one thick glowing amber cable runs left into a single
> long windowless warehouse with fans on its roof. One equally thick glowing
> amber cable runs right into a whole small town of many houses, a school, and
> streetlamps, all lit. The warehouse and the town are drawn the same width.

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `mining-hall.png` | Proof of work | The lottery whose tickets are paid for in electricity. The raffle drum carries the analogy. |
| Top-right | `lost-key.png` | Keys; consequence three: no undo | Whoever holds the key holds the coins, and nobody can issue a new key. |
| Bottom-left | `coaster.png` | Consequence two: price | Nothing stands behind the price, so it behaves like a bet. |
| Bottom-right | `power-town.png` | Consequence one: energy | One network's machines draw as much electricity as a country's homes. Equal cables, equal widths. |

---

## Sheet E — crime, the trail, and the door

Save as `sheet-e.png`, then split.

> **16-bit SNES/JRPG pixel art** in a playful Saturday-morning-cartoon world.
> Hard pixel edges, no anti-aliasing, subtle dithered shading, chunky
> silhouettes that read clearly at 64 px. Tight palette drawn from the PhilMates
> UI: void background `#11131f`, panel slate `#1d2235`, ink `#eef1ff`, and four
> accent inks: go-green `#46e07a`, magenta `#ff6ad5`, info-blue `#4cc2ff`, amber
> `#ffcf5a`, plus deep violet for villain scenes. Never gory, never frightening.
> Every coin is a plain gold disc with a blank face. Every banknote is a plain
> green rectangle. Every book, screen, sign, form, and sheet of paper is blank
> or shows only rows of small colored squares. **No text, no lettering, no
> letters of any alphabet, no numbers, no currency symbols, no logos, no
> watermark, no signature.**
>
> A **2×2 grid of four separate square illustrations**, all the same size, in
> the same art style and palette. The four panels are divided by one straight
> vertical and one straight horizontal gutter of plain `#11131f`, each gutter
> about 16 px wide. Nothing crosses a gutter. Each panel is a complete,
> self-contained scene with its own `#11131f` background and its subject
> centred with a clear margin. No panel borders, no captions, no panel numbers.
> The four panels, in reading order:
>
> **Top-left:** A hospital nurses' station at night with nobody in it. Three
> computer monitors on the desk each show the same thing: a plain dark screen
> with one large magenta padlock shape. An empty wheeled bed and a drip stand
> wait in the dim corridor behind. Quiet and serious, not cartoonish.
>
> **Top-right:** A detective in a tan trench coat and hat, seen from behind,
> holds up a large magnifying glass and follows a line of glowing go-green
> footprints across a floor made of giant open book pages ruled into rows of
> small colored squares. The footprints lead to a distant doorway where the
> edge of a violet cape is just slipping out of view.
>
> **Bottom-left:** A plain stone wall with one open doorway, warm amber light
> inside. Beside the doorway stands an empty wooden stool with a doorman's
> peaked cap resting on it. Two people walk in through the doorway side by
> side, seen from behind: one tall figure in a high-collared deep violet coat,
> one figure in an info-blue raincoat with a canvas satchel.
>
> **Bottom-right:** A plain stone wall with one doorway, warm amber light
> inside. A doorman in an info-blue uniform and peaked cap stands in the
> doorway holding a clipboard with a blank page, a red velvet rope stretched
> across the door. Two people wait in a queue in front of the rope, seen from
> behind: one tall figure in a high-collared deep violet coat, one figure in an
> info-blue raincoat with a canvas satchel.

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `locked-screen.png` | Consequence four: ransomware | The real version of the duck. No jokes on this slide. |
| Top-right | `glass-trail.png` | The list is public | Pseudonymous is not anonymous. Every payment is on the record forever. |
| Bottom-left | `same-door.png` | The door with no doorman | Nobody can be stopped, so the villain and the reporter both get through. |
| Bottom-right | `doorman-returns.png` | Every fix brings a keeper back | Somebody can now stop the villain, and the same somebody can stop the reporter. Pair with `same-door.png` in a `<phil-compare>`. |

---

## Relic cards (hand-authored SVG, 80×108)

Standard frame: dark border, accent inner frame, rank gem in the top bar,
rarity pips at the bottom. These are not generated.

### `relic-satoshi.svg` — Satoshi Nakamoto (accent: amber `#ffcf5a`)
Emblem: a folded newspaper sealed inside a stone block, with a chain link
leading off each side. Encodes the first block of Bitcoin, mined 3 January
2009, which carries a newspaper headline about a bank bailout. Nobody knows who
Satoshi is, so there would be no face to draw even if the rule allowed one.

### `relic-winner.svg` — Langdon Winner (accent: magenta `#ff6ad5`)
Emblem: a low stone bridge over a road, with a tall bus stopped in front of it
and a small car passing underneath. Encodes "Do Artifacts Have Politics?"
(1980): a design can decide who gets through. The bridge story itself is
disputed by historians, which the slide should say.

`relic-lessig.png` from The Network With No Middle can be reused for the
"code is law" callback.

## Alt-text reminder

Write `alt` from what the final PNG shows, not from the prompt. Counts are the
usual failure: check for exactly three heaps of coins (one huge, two small and equal),
seven villagers in the ring,
three monitors, and four riders before shipping.
