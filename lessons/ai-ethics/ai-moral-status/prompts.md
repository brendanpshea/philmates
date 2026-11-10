# Image prompts — AI and Moral Status ("Robot Movie Night")

Twenty panels ship as square PNGs in `assets/`, made as **five 2×2 sheets**
and split into quadrants. Each sheet below is one short, complete prompt,
ready to paste into any image generator. Render each sheet square. Inspect
every panel full-size: reject any with baked-in text, and re-roll any sheet
that repeats a panel instead of drawing four different scenes.

**To re-roll one panel on its own,** paste the style line, then that panel's
sentence, then "One single square image, not a grid."

The setting is the Rialto, an old single-screen cinema, on the night of its
all-night robot movie marathon. The lesson talks about four real films, but
the art never shows them. Rules:

1. **No film likenesses.** The four "reel" panels show original robots and
   original people in scenes that suggest each film's situation. No likeness
   to any actor, costume, set, poster, or character from *Star Trek*, *Ex
   Machina*, *Her*, or *Blade Runner*. Don't name any of them in a prompt.
2. **No text.** Marquees, posters, signs, screens, tickets, and papers are
   blank. Neon signs are plain glowing shapes.
3. **The kiosk has no face.** Marquee, the ticket kiosk, shows a wavy amber
   line on a round screen, never eyes or a mouth.
4. **No portraits of real people.** Every thinker gets an idea scene without
   a face.
5. **Vary the people.** Every panel with people names each figure's age,
   gender, and skin color, and every crowd is mixed. Paste each recurring
   character's description word for word.

## Status (2026-11-10)

All five 2×2 sheets (`sheet-a.png` through `sheet-e.png`) generated with Gemini
(Nano Banana) and split into all twenty 512×512 PNG assets in
`lessons/ai-ethics/ai-moral-status/assets/`.
Full sheets are kept in `temp/ai-moral-status-sheets/` outside `assets/` so they
do not inflate the SCORM zip size.

All 20 scene PNGs are validated, on-style (16-bit SNES pixel art), text-free,
and ready for authoring `index.html`.

Checked full-size when the slides were written: all 20 are in use and none
has text. One to consider re-rolling: the android in `reel-1.png` is a gold
humanoid with round eyes and reads a lot like C-3PO. That film is not one of
the lesson's four, but rule 1 asks for original designs. To re-roll, ask for
"a slim teal android with a square head and one wide visor."

## Style line (first line of sheets A, B, C, and E)

```
16-bit SNES pixel art. Hard pixel edges, limited palette, warm amber cinema light against deep night blue. No text, letters, or numbers anywhere.
```

## Cast (keep these words the same in every panel)

- **Dee:** a Cuban American woman in her sixties with silver hair in a bun,
  reading glasses on a chain, and a burgundy usher's vest.
- **Kwame:** a Black man of nineteen with short twists and a denim jacket
  covered in enamel pins.
- **Priya:** a South Asian woman in her thirties with a short bob, a gray
  hoodie, and a laptop bag.
- **Hank:** a Navajo man in his seventies with a long gray braid, a bolo tie,
  and a tub of popcorn.
- **Marquee:** a tall wooden ticket kiosk with a round amber screen showing
  one wavy glowing line.

---

## Sheet A — the Rialto

```
16-bit SNES pixel art. Hard pixel edges, limited palette, warm amber cinema light against deep night blue. No text, letters, or numbers anywhere. Setting: an old single-screen cinema late at night.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: the front of an old cinema at night, its blank marquee ringed with glowing bulbs, a few moviegoers of mixed ages and skin tones lining up under it.
Top-right: in a red-carpeted cinema lobby, a Cuban American woman in her sixties with silver hair in a bun, reading glasses on a chain, and a burgundy usher's vest stands at a popcorn counter with a Black man of nineteen with short twists and a denim jacket covered in enamel pins, a South Asian woman in her thirties with a short bob, a gray hoodie, and a laptop bag, and a Navajo man in his seventies with a long gray braid, a bolo tie, and a tub of popcorn.
Bottom-left: a tall wooden ticket kiosk with a round amber screen showing one wavy glowing line stands alone in a dim cinema lobby beside a velvet rope.
Bottom-right: the same cinema lobby at sunrise, pink light through the glass doors, a Cuban American woman in her sixties with silver hair in a bun, reading glasses on a chain, and a burgundy usher's vest holding a ring of keys and looking at a tall wooden ticket kiosk with a round amber screen showing one wavy glowing line.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `title.png` | Title; Summed Up |
| Top-right | `lobby.png` | The Rialto's Robot Marathon |
| Bottom-left | `kiosk.png` | Marquee; final poll |
| Bottom-right | `dawn.png` | Closing Time |

## Sheet B — the four reels (original designs)

```
16-bit SNES pixel art. Hard pixel edges, limited palette, warm amber cinema light against deep night blue. No text, letters, or numbers anywhere. Original characters only, not based on any film or television show.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: in a small hearing room aboard a spaceship, stars in the window, a slim copper android with a smooth oval head and two round lamp eyes stands at a witness rail before a judge's bench where a Black woman in her fifties in a plain gray uniform presides.
Top-right: a glass wall divides a bare concrete room; on one side sits an East Asian man in his twenties holding a notepad, and on the other sits a robot with a clear mesh body and a blank white porcelain mask for a face.
Bottom-left: a Latino man in his forties in a blue jacket sits alone on a city park bench at dusk, smiling, with a small glowing earbud in his ear and a tiny glowing device in his shirt pocket.
Bottom-right: a rain-soaked city street at night lit by plain glowing signs and rising steam, where a lone figure in a long gray raincoat stands under an umbrella, seen from behind.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `reel-1.png` | Reel One: the hearing |
| Top-right | `reel-2.png` | Reel Two: the test |
| Bottom-left | `reel-3.png` | Reel Three: the voice |
| Bottom-right | `reel-4.png` | Reel Four: the hunted |

## Sheet C — lights up (the reality checks)

```
16-bit SNES pixel art. Hard pixel edges, limited palette, warm amber cinema light against deep night blue. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a friendly robot face mask hanging on a stand beside a plain gray rack of humming computer servers with small green lights.
Top-right: a movie camera on a tripod pointed through a doorway at a small copper robot sitting alone in an empty room.
Bottom-left: one glowing amber orb in the night sky joined by hundreds of thin threads of light to the lit windows of a wide city of apartment buildings.
Bottom-right: a picture split down the middle: on the left a discarded robot in a scrap bin with one lamp eye still lit, on the right a white woman in her forties tenderly wrapping a scarf around a parking meter.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `mask-and-servers.png` | Lights Up: faces, and smart is not feeling |
| Top-right | `camera.png` | Lights Up: the camera tells us |
| Bottom-left | `copies.png` | Lights Up: one voice, thousands of rooms |
| Bottom-right | `two-errors.png` | Two Ways to Be Wrong |

## Style line for idea scenes (sheet D)

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.
```

This is the shared style line from `docs/thinker-card-prompts.md`, so these
cards match the set in every other lesson.

## Sheet D — idea scenes

```
16-bit SNES pixel art, a single object or small still-life scene on a dark navy background, warm candlelight, rich but limited palette. Hard pixel edges. No text, letters, or numbers anywhere. No people or faces.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a brass balance scale, perfectly level, holding a small red clay heart on one pan and a small steel clockwork heart on the other.
Top-right: a plain theater mask lying on top of a huge heap of handwritten letters and open books with blank pages.
Bottom-left: an ordinary chrome toaster with a sad face painted on its side, standing next to a plain unmarked wooden box with warm light glowing through its seams.
Bottom-right: a large black umbrella propped open over a small wind-up tin robot, under a sky that might or might not rain.
```

| Quadrant | File | Card |
|---|---|---|
| Top-left | `idea-schwitzgebel-garza.png` | Schwitzgebel and Garza: no relevant difference |
| Top-right | `idea-birch.png` | Birch: the gaming problem |
| Bottom-left | `idea-schwitzgebel-design.png` | Schwitzgebel: honest design |
| Bottom-right | `idea-sebo-long.png` | Sebo and Long: precaution under uncertainty |

The toaster's painted face is the one face allowed on this sheet: it is paint
on an object, and the panel is about misleading looks.

## Sheet E — our world today

```
16-bit SNES pixel art. Hard pixel edges, limited palette, muted realistic colors, soft daylight. No text, letters, or numbers anywhere. Setting: real places in our world in the 2020s.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a laptop open on an office desk at night showing two columns of blank chat bubbles, an empty chair pushed back from the desk.
Top-right: a Black woman in her twenties in pajamas sits on a couch late at night smiling at the phone in her hands, its glow on her face, a cold cup of tea beside her.
Bottom-left: in a bright meeting room, four coworkers, a white man in his fifties, an East Asian woman in her thirties, a Black woman in her forties, and a Latino man in his twenties, look at a wall screen showing one blank chat bubble.
Bottom-right: four round film cans stacked on a projection-booth table beside a blank clapperboard, a film projector beam cutting through dust above them.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `chat.png` | The engineer and the chatbot (2022) |
| Top-right | `companion.png` | Decision point: the companion app |
| Bottom-left | `meeting.png` | Our world, November 2026 |
| Bottom-right | `film-cans.png` | Four Habits of Robot Movies |

## Alt-text reminder

Write `alt` from what the final PNG shows, not from the prompt. Check that no
panel resembles a film character, that marquees, signs, screens, and papers
came out blank, that the kiosk has no face, and that the crowds came out
mixed.
