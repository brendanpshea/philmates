# Image prompts — Double Effect ("The Case of the Merciful Dose")

Sixteen scenes ship as 512×512 PNGs in `/assets/`, generated as **four 2×2
sheets** and split into quadrants. Each sheet below is one complete prompt,
ready to paste: house style, grid wrapper, and the four panels in order. On
`flux-2-dev` a sheet renders at 1024², so each quadrant is already 512×512.
See [docs/image-generation.md](../../../docs/image-generation.md). Inspect every
panel full-size: reject any with baked-in text.

The frame borrows a consulting detective, his doctor friend, and a police
inspector from Arthur Conan Doyle's stories (public domain). The patient, Mr.
Thorne, is invented. Six rules:

1. **Original designs only.** No likeness to any actor or to any film, TV, or
   game adaptation. Don't name the characters, the author, or any adaptation in
   a prompt. No curved calabash pipe and no smoking of any kind.
2. **Dignity for the patient.** Mr. Thorne is awake, composed, and sitting in an
   armchair. No deathbed, no body, no gaunt or frightening illness.
3. **The child is never shown.** The Smith and Jones case is drawn with a
   closed door, a pair of shoes, and a man's back. No bathtub interior, no
   struggle, no child.
4. **Medicine is a bottle and a measuring glass.** No syringes, no needles, no
   skull-and-crossbones label. Poison imagery decides the case before the
   student has heard it.
5. **Nobody is the villain in the sickroom.** The doctor looks careful and
   kind in every panel. Only the two uncles may look sinister, and only from
   behind.
6. **No portraits of real people.** Aquinas, James Rachels, and Timothy Quill
   get idea-emblem relic cards.

## Status (2026-10-08)

All four 2×2 sheets generated (`sheet-a.png`, `sheet-b.png`, `sheet-c.png`, `sheet-d.png`) and split into 16 512×512 PNG quadrants in `lessons/bioethics/double-effect/assets/`. The three relic cards (`relic-aquinas.svg`, `relic-rachels.svg`, `relic-quill.svg`) have also been authored and placed in `assets/`.

The relic cards now in `assets/` are the versions written during authoring.
They replaced the first set, which was overwritten without being kept.

Where the art differs from the prompt (alt text in `index.html` describes what
was drawn):
- `two-candles.png`: the right-hand candle is short but still burning, and two
  hands rest beside it, not one.
- `the-dose.png`: the measuring cup came out as a plain glass, and the watch
  face has tick marks. No numerals.
- `the-will.png`: the lamp is a street lamp on a post, not a wall gas lamp.
- `mr-thorne.png` is darker and bluer than the other interiors.

## House style (already included in each sheet prompt)

> **16-bit SNES/JRPG pixel art**, late-Victorian London by gaslight: fog, brick,
> brass, and firelight. Hard pixel edges, no anti-aliasing, subtle dithered
> shading, chunky silhouettes that read clearly at 64 px. Tight palette drawn
> from the PhilMates UI: void background `#11131f`, panel slate `#1d2235`, ink
> `#eef1ff`, and four accent inks: go-green `#46e07a`, magenta `#ff6ad5`,
> info-blue `#4cc2ff`, amber `#ffcf5a`. Lighting: **cool blue fog-light
> outdoors, warm amber gas lamps and firelight indoors**. Calm and humane, not
> grim. **No text, no lettering, no letters of any alphabet, no numbers, no
> watermark, no signature.**

## Grid wrapper (already included in each sheet prompt)

> A **2×2 grid of four separate square illustrations**, all the same size, in
> the same art style and palette. The four panels are divided by one straight
> vertical and one straight horizontal gutter of plain `#11131f`, each gutter
> about 16 px wide. Nothing crosses a gutter. Each panel is a complete,
> self-contained scene with its own `#11131f` background and its subject
> centred with a clear margin. No panel borders, no captions, no panel numbers.
> The four panels, in reading order:

## Cast (already pasted into the panels that show them)

Reuse these descriptions word for word if a panel needs a re-roll.

- **The detective (Holmes):** a tall, lean man in his forties with a sharp
  profile, dark hair swept back, and pale grey eyes, wearing a mouse-grey
  dressing gown over a white shirt and dark waistcoat, holding a brass
  magnifying glass. Expression: alert and amused.
- **The doctor (Watson):** a sturdy man in his forties with South Asian
  features, warm brown eyes, and a neat dark moustache, wearing a brown tweed
  suit with a go-green tie, carrying a worn brown leather doctor's bag.
  Expression: kind and troubled.
- **The inspector (Lestrade):** a wiry, sharp woman in her fifties with a
  narrow face, silver-streaked dark hair tucked under a black bowler hat,
  wearing a dark tailored overcoat and white collar, holding a small closed
  notebook. Expression: brisk, intelligent, and certain.
- **Mr. Thorne:** a retired lighthouse keeper of about seventy with a short
  white beard, wearing a knitted navy jersey and a soft scarf at his throat, a
  tartan blanket over his knees. Expression: tired, calm, and clear-eyed.

---

## Sheet A — Baker Street and the cast

Save as `sheet-a.png`, then split.

> **16-bit SNES/JRPG pixel art**, late-Victorian London by gaslight: fog, brick,
> brass, and firelight. Hard pixel edges, no anti-aliasing, subtle dithered
> shading, chunky silhouettes that read clearly at 64 px. Tight palette drawn
> from the PhilMates UI: void background `#11131f`, panel slate `#1d2235`, ink
> `#eef1ff`, and four accent inks: go-green `#46e07a`, magenta `#ff6ad5`,
> info-blue `#4cc2ff`, amber `#ffcf5a`. Lighting: **cool blue fog-light
> outdoors, warm amber gas lamps and firelight indoors**. Calm and humane, not
> grim. **No text, no lettering, no letters of any alphabet, no numbers, no
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
> **Top-left:** A foggy London street at night seen from the opposite pavement:
> a row of tall brick townhouses, one upstairs bow window glowing warm amber, a
> black front door with a blank brass plate, a gas street lamp with a soft
> halo, a horse-drawn cab waiting at the kerb, wet cobblestones reflecting the
> light.
>
> **Top-right:** Portrait, chest up, three-quarter view: a tall, lean man in his
> forties with a sharp profile, dark hair swept back, and pale grey eyes,
> wearing a mouse-grey dressing gown over a white shirt and dark waistcoat,
> holding up a brass magnifying glass. Expression: alert and amused. Behind
> him, a cluttered mantelpiece and a firelit wall.
>
> **Bottom-left:** Portrait, chest up, three-quarter view: a sturdy man in his
> forties with South Asian features, warm brown eyes, and a neat dark
> moustache, wearing a brown tweed suit with a go-green tie, holding a worn
> brown leather doctor's bag against his chest. Expression: kind and troubled.
> Behind him, a bookshelf with blank spines and a gas lamp.
>
> **Bottom-right:** Portrait, chest up, facing the viewer: a wiry, sharp woman
> in her fifties with a narrow face, silver-streaked dark hair tucked neatly
> under a black bowler hat, wearing a dark tailored overcoat and white collar,
> holding a small closed notebook. Expression: brisk, intelligent, and certain.
> Behind her, a foggy doorway with a blue police lantern.

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `baker-street.png` | Title, recap | Sets the frame. Reuse on the closing slide. |
| Top-right | `holmes.png` | Meet the pair; the twin cases | Holmes brings the test cases. He infers intentions from evidence, which is the skill the doctrine needs. |
| Bottom-left | `watson.png` | Meet the pair | Watson is the physician who must decide about the dose. |
| Bottom-right | `lestrade.png` | Medicine and the law | Lestrade speaks for the rules as written: the AMA statement and the 1997 Supreme Court ruling. |

---

## Sheet B — the patient and the doctrine

Save as `sheet-b.png`, then split.

> **16-bit SNES/JRPG pixel art**, late-Victorian London by gaslight: fog, brick,
> brass, and firelight. Hard pixel edges, no anti-aliasing, subtle dithered
> shading, chunky silhouettes that read clearly at 64 px. Tight palette drawn
> from the PhilMates UI: void background `#11131f`, panel slate `#1d2235`, ink
> `#eef1ff`, and four accent inks: go-green `#46e07a`, magenta `#ff6ad5`,
> info-blue `#4cc2ff`, amber `#ffcf5a`. Lighting: **cool blue fog-light
> outdoors, warm amber gas lamps and firelight indoors**. Calm and humane, not
> grim. **No text, no lettering, no letters of any alphabet, no numbers, no
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
> **Top-left:** A warm, tidy sitting room in the evening. A retired lighthouse
> keeper of about seventy with a short white beard sits upright in a
> high-backed armchair by a window, wearing a knitted navy jersey and a soft
> scarf at his throat, a tartan blanket over his knees. He is awake, tired, and
> calm, one hand raised in greeting. On the mantelpiece stands a small model
> lighthouse. A side table holds a glass of water and a closed book.
>
> **Top-right:** Close view of a small bedside table lit by one candle. On it:
> a brown glass medicine bottle with a blank paper label, a small glass
> measuring cup with a little clear liquid in it, a silver spoon, and an open
> pocket watch whose face shows two hands and no numerals.
>
> **Bottom-left:** A single brass oil lamp stands on a table. In front of it,
> one open hand is held out, palm down. On the plain wall behind, the hand
> casts exactly two separate shadows side by side: the left shadow is tinted
> go-green, the right shadow is tinted magenta. Nothing else on the wall.
>
> **Bottom-right:** A brass balance scale on a dark wooden desk. In the left
> pan sits a small steady go-green flame. In the right pan stands a small
> hourglass with magenta sand running. The beam tilts slightly toward the
> green flame. Plain dark wall behind.

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `mr-thorne.png` | Watson's patient | A real person who can speak for himself and has asked for relief. The armchair keeps it from being a deathbed. |
| Top-right | `the-dose.png` | The dose; the opioid fact | One medicine that eases pain and may shorten life. Reused when the lesson gives the evidence on opioids. |
| Bottom-left | `two-effects.png` | One act, two effects | One hand, two shadows: green is the effect you want, magenta is the one you only foresee. |
| Bottom-right | `scales.png` | Condition 4, proportion | The good effect has to be large enough to justify risking the bad one. |

---

## Sheet C — killing, letting die, and the two uncles

Save as `sheet-c.png`, then split. No faces in any panel.

> **16-bit SNES/JRPG pixel art**, late-Victorian London by gaslight: fog, brick,
> brass, and firelight. Hard pixel edges, no anti-aliasing, subtle dithered
> shading, chunky silhouettes that read clearly at 64 px. Tight palette drawn
> from the PhilMates UI: void background `#11131f`, panel slate `#1d2235`, ink
> `#eef1ff`, and four accent inks: go-green `#46e07a`, magenta `#ff6ad5`,
> info-blue `#4cc2ff`, amber `#ffcf5a`. Lighting: **cool blue fog-light
> outdoors, warm amber gas lamps and firelight indoors**. Calm and humane, not
> grim. **No text, no lettering, no letters of any alphabet, no numbers, no
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
> **Top-left:** Two identical white candles in identical brass holders stand
> side by side on a table. On the left, a hand lowers a brass candle snuffer
> over the flame, putting it out. On the right, the candle has burned down to
> a short stub and its flame is guttering out by itself, while a second hand
> rests open and idle on the table beside it. A thin thread of smoke rises
> from each.
>
> **Top-right:** A narrow hall table under a gas lamp. On the table lies a
> folded paper document tied with ribbon and closed with a red wax seal, its
> surface blank, beside a small wooden toy sailing boat. On a hall stand
> behind hang exactly two identical black top hats and two identical pairs of
> grey gloves.
>
> **Bottom-left:** An upstairs landing at night. A closed wooden door with warm
> light showing in a line beneath it. A thin trickle of water creeps out from
> under the door across the floorboards. A pair of men's black shoes has been
> left neatly beside the door, with a black top hat on a chair. Nobody is
> visible.
>
> **Bottom-right:** The same upstairs landing. The wooden door now stands half
> open, with pale steam and light beyond it and nothing else visible inside.
> A man in a dark coat stands motionless in the doorway, seen from behind as a
> silhouette, his hands clasped behind his back holding a pair of grey gloves.

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `two-candles.png` | Killing vs. letting die | One flame is put out and one is allowed to go out. Both end the same way, which is the question. |
| Top-right | `the-will.png` | The twin cases: setup | Two of everything: Smith and Jones have the same motive and want the same result. The toy boat stands in for the young cousin. |
| Bottom-left | `closed-door.png` | Smith | Smith acts. The door is shut so nothing is shown. |
| Bottom-right | `the-watcher.png` | Jones | Jones stands by with his hands behind his back and lets it happen. |

---

## Sheet D — does intention matter?

Save as `sheet-d.png`, then split.

> **16-bit SNES/JRPG pixel art**, late-Victorian London by gaslight: fog, brick,
> brass, and firelight. Hard pixel edges, no anti-aliasing, subtle dithered
> shading, chunky silhouettes that read clearly at 64 px. Tight palette drawn
> from the PhilMates UI: void background `#11131f`, panel slate `#1d2235`, ink
> `#eef1ff`, and four accent inks: go-green `#46e07a`, magenta `#ff6ad5`,
> info-blue `#4cc2ff`, amber `#ffcf5a`. Lighting: **cool blue fog-light
> outdoors, warm amber gas lamps and firelight indoors**. Calm and humane, not
> grim. **No text, no lettering, no letters of any alphabet, no numbers, no
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
> **Top-left:** A cosy parlour. A dignified elderly Black matriarch in her
> seventies with soft silver-grey hair in a neat bun sits smiling warmly in a
> high-backed armchair with a patterned wool shawl around her shoulders. Two
> young visitors in their twenties stand before her: on the left, a young Black
> man in a dark waistcoat holding out a small bunch of yellow flowers, with a
> small thought bubble floating above his head containing a red heart; on the
> right, a young East Asian woman in a Victorian blue day dress holding out an
> identical small bunch of yellow flowers, with a small thought bubble floating
> above her head containing a single gold coin.
>
> **Top-right:** Close view of a brass magnifying glass held by a hand in a
> grey sleeve over the front of a brown tweed waistcoat. Through the lens,
> instead of cloth, there is a knot of four tangled threads, one go-green, one
> magenta, one info-blue, one amber, wound tightly round each other.
>
> **Bottom-left:** A hearth rug in front of a lit fireplace. A small scruffy
> terrier sits upright, unhurt, head tilted, looking up in puzzlement. Beside
> the dog, only the legs and boots of a person are visible, caught mid-stumble,
> with two books and an umbrella tumbling through the air.
>
> **Bottom-right:** First light through a tall sash window, the fog outside
> thinning to pale gold. A sturdy man in a brown tweed suit stands at the
> window, seen from behind, his hands resting on the sill. On the sill stand a
> brown glass medicine bottle with a blank label and a small glass measuring
> cup. A worn brown leather doctor's bag sits on a chair beside him.

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `jack-and-jill.png` | Jack and Jill | Same act, same flowers, different intentions. Did they do different things? |
| Top-right | `tangled-threads.png` | Mixed and hidden motives | A doctor's reasons are several at once and cannot be read from outside, even with a magnifying glass. |
| Bottom-left | `stumbled-over.png` | The defenders reply | The judge Oliver Wendell Holmes Jr. wrote that even a dog knows being stumbled over from being kicked. The dog is unhurt. |
| Bottom-right | `watson-decides.png` | Final poll | The decision is left to the student. |

---

## Relic cards (hand-authored SVG, 80×108)

Use the standard frame: dark border, accent inner frame, rank gem in the top bar,
rarity pips at the bottom. See `lessons/ethical-theory/*/assets/` for reference.
These are not generated.

### `relic-aquinas.svg` — Thomas Aquinas (accent: amber `#ffcf5a`)
Emblem: a round shield raised against a falling sword, the shield casting two
shadows. Encodes the doctrine's origin in his account of self-defense: one act,
saving your life, with a second effect you did not aim at.

### `relic-rachels.svg` — James Rachels (accent: magenta `#ff6ad5`)
Emblem: two identical top hats side by side above one closed door. Encodes the
twin-case method: hold everything the same except one feature.

### `relic-quill.svg` — Timothy Quill (accent: info-blue `#4cc2ff`)
Emblem: a stethoscope whose tubing is tied in a knot. Encodes his criticism
that a doctor's intentions are mixed and hard to read, even for the doctor.

## Alt-text reminder

Write `alt` from what the final PNG shows, not from the prompt. Check the
counts before shipping: exactly two shadows, two candles, two hats, and two
visitors. Check that the watch face and every label came out blank.
