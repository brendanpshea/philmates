# Image prompts — Turing Test & Chinese Room ("The Masquerade of Silverport")

Twenty scenes ship as square PNGs in `/assets/`, generated as **five 2×2
sheets** and split into quadrants. Each sheet is one short, complete prompt in a
code block, ready to paste into any image generator. Render each sheet square.
Inspect every panel full-size: reject any with baked-in text, and re-roll any
sheet that repeats a panel instead of drawing four different scenes. Keep the
source sheets in `temp/masquerade-silverport-sheets/`, not in `assets/`.

**To re-roll one panel on its own,** paste the style line, then that panel's
sentence, then "One single square image, not a grid."

The frame is invented: a masked ball in the port town of Silverport, where the
host announces that one guest is a clockwork automaton. Seven rules:

1. **Original designs only.** No likeness to any actor, film, game, or real
   person.
2. **No portraits of real people.** Turing, Searle, Lovelace, and Weizenbaum
   appear only as idea scenes on thinker cards (Sheet E). No faces in those
   panels.
3. **No text.** The slips, the rulebook, and the notes carry abstract wavy
   shapes or blank lines, never letters, Chinese characters, or numbers. The
   lesson uses an invented script on purpose.
4. **The Mechanical Turk without caricature.** The real automaton wore Ottoman
   costume. Draw a robed mechanical figure with no ethnic costume or features.
5. **The automaton is polite, not menacing.** No glowing red eyes, no horror.
6. **Vary the people.** Every panel with people names each figure's age,
   gender, and skin color, and crowds are mixed: men and women, young and old,
   a range of skin tones.
7. **Characters are the setting.** Nothing in the art should suggest that a
   character speaks for Turing or Searle.

## Status (2026-10-25)

All five sheets (A through E) generated and split into twenty 512×512 PNGs in
`assets/`. Full sheets archived in `temp/masquerade-silverport-sheets/`.

## Style line (first line of every sheet)

```
16-bit SNES pixel art, a candlelit 18th-century port town and its grand ballroom. Hard pixel edges, limited palette, dark navy background, warm candlelight. No text, letters, or numbers anywhere.
```

## Cast (keep these words the same in every panel)

- **The host:** a tall Black woman in her sixties with silver locs pinned up,
  a midnight-blue gown, and a silver half-mask on a stick.
- **The brass guest:** a slender clockwork figure of polished brass with
  visible gears at its joints, a feathered white mask, and an evening coat.
- **You, in the Room:** a young person with short curly red hair in a gray
  shirt, always seen from behind.
- **The crowd:** always "men and women of mixed ages and skin tones."

---

## Sheet A — the ball

Save as `sheet-a.png`, then split.

```
16-bit SNES pixel art, a candlelit 18th-century port town and its grand ballroom. Hard pixel edges, limited palette, dark navy background, warm candlelight. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a grand candlelit ballroom under chandeliers, full of masked dancers, men and women of mixed ages and skin tones, in gowns and evening coats.
Top-right: portrait of a tall Black woman in her sixties with silver locs pinned up, a midnight-blue gown, and a silver half-mask on a stick, smiling knowingly.
Bottom-left: a heavy velvet curtain divides a candlelit room; a gloved hand slides a folded blank note through the gap to a masked guest seated on the other side.
Bottom-right: a slender clockwork figure of polished brass with visible gears at its joints, a feathered white mask, and an evening coat, bowing politely.
```

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `silverport-ball.png` | Title, recap | Sets the frame: everyone is masked, so nobody can be judged by looks. |
| Top-right | `the-host.png` | The host's challenge | Announces that one guest is a machine and sets the rules: notes only. |
| Bottom-left | `note-passing.png` | The imitation game | Turing's setup made literal: the curtain is his screen, the notes his teleprinter. |
| Bottom-right | `brass-guest.png` | Turing's sample dialogue; the unmasking poll | The machine that might pass. Polite, so the art doesn't decide the question. |

---

## Sheet B — machines that seemed to think

Save as `sheet-b.png`, then split.

```
16-bit SNES pixel art, a candlelit 18th-century port town and its grand ballroom. Hard pixel edges, limited palette, dark navy background, warm candlelight. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: an old wooden chess cabinet with its doors open, revealing a hidden middle-aged man crouched inside, while a robed mechanical figure with no face paint sits on top at the chessboard.
Top-right: a 1960s computer room where a young Black woman in a cardigan types at a clunky teletype terminal that prints a long blank paper scroll.
Bottom-left: a brass clockwork hand holds up a cheerful mask of a young teenage boy in front of a blank face made of gears.
Bottom-right: a curious purple octopus on the sea floor wraps its arms around a thick undersea cable, with pulses of light running along it.
```

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `mechanical-turk.png` | Appearances deceive | A "thinking machine" of 1770 with a person hidden inside. Behavior alone can mislead. |
| Top-right | `eliza-teletype.png` | How ELIZA works | A 1966 program people confided in, though it understood nothing. |
| Bottom-left | `boy-mask.png` | Eugene Goostman | A chatbot that posed as a 13-year-old so its mistakes would look like a child's. |
| Bottom-right | `octopus-cable.png` | Chatbots today | Bender and Koller's octopus, which learns the form of messages with no access to what they mean. |

---

## Sheet C — the Room

Save as `sheet-c.png`, then split.

```
16-bit SNES pixel art, a candlelit 18th-century port town and its grand ballroom. Hard pixel edges, limited palette, dark navy background, warm candlelight. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a stone cellar corridor lit by one lantern, where paper slips covered in abstract wavy shapes slide under a heavy locked wooden door.
Top-right: an enormous open book on a lectern, its pages filled with rows of abstract wavy shapes joined by arrows, lit by a single candle.
Bottom-left: inside a cramped stone room, a young person with short curly red hair in a gray shirt, seen from behind, compares a paper slip to a giant open book.
Bottom-right: outside a cellar door, an elderly South Asian woman in a shawl reads a small paper slip and smiles with relief, a gray cat at her feet.
```

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `cellar-door.png` | To the cellar | The Room from outside: questions go in, answers come out. |
| Top-right | `rulebook.png` | The rulebook | Rules that pair shapes with shapes. Nothing in them says what any shape means. |
| Bottom-left | `inside-room.png` | The Room widget slide | You, following the rules, with no idea what the slips say. |
| Bottom-right | `the-reveal.png` | The reveal | The person outside was comforted about her lost cat. You never knew. |

---

## Sheet D — replies to Searle

Save as `sheet-d.png`, then split.

```
16-bit SNES pixel art, a candlelit 18th-century port town and its grand ballroom. Hard pixel edges, limited palette, dark navy background, warm candlelight. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a cutaway view of a small stone room like a dollhouse, showing a person at a desk, a giant book, baskets of paper slips, and a slot in the door.
Top-right: a giant walking brass robot whose chest is a tiny lit room with a person inside reading a book, its glass eyes gazing at a tree.
Bottom-left: a vast cellar maze of copper water pipes and brass valves branching like nerves, with a middle-aged East Asian woman turning one valve.
Bottom-right: a young person with short curly red hair in a gray shirt, seen from behind, walks down a sunny street, puzzled by a note of abstract wavy shapes a vendor hands them.
```

| Quadrant | File | Slide use | Pedagogical role |
|---|---|---|---|
| Top-left | `whole-room.png` | The systems reply | Maybe the whole room understands, even if the person inside doesn't. |
| Top-right | `robot-room.png` | The robot reply | Give the program a body that sees and acts. |
| Bottom-left | `water-pipes.png` | The brain-simulator reply | Searle's own image: copy the brain's wiring in water pipes. |
| Bottom-right | `memorized.png` | Searle answers the systems reply | Memorize the rulebook and walk outside: you still don't understand. |

---

## Sheet E — thinker cards (idea scenes, no faces)

Save as `sheet-e.png`, then split. These go on the `<phil-thinker>` cards.

```
16-bit SNES pixel art, a candlelit 18th-century port town and its grand ballroom. Hard pixel edges, limited palette, dark navy background, warm candlelight. No text, letters, or numbers anywhere. No people or faces in any panel.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a heavy velvet curtain with a folded blank note slipping through a gap at its hem, an old teleprinter on a desk in front of it.
Top-right: a closed wooden door with a slot near the floor, paper slips of abstract wavy shapes sliding out, a thick book lying beside it.
Bottom-left: an intricate brass calculating engine of gears and columns beside a stack of punched cards and a quill on a lacquered desk.
Bottom-right: a 1960s typewriter terminal facing a hand mirror, its blank paper reflected in the glass.
```

| Quadrant | File | Card |
|---|---|---|
| Top-left | `idea-turing.png` | Alan Turing: judge a machine by its answers, through a screen. |
| Top-right | `idea-searle.png` | John Searle: the room that answers without understanding. |
| Bottom-left | `idea-lovelace.png` | Ada Lovelace: the Engine "has no pretensions to originate anything." |
| Bottom-right | `idea-weizenbaum.png` | Joseph Weizenbaum: ELIZA reflects your words back at you. |

## Alt-text reminder

Write `alt` from what the final PNG shows, not from the prompt. Check that the
slips, rulebook, and notes came out without letters or characters, that the
Mechanical Turk figure has no ethnic costume, and that no idea-scene panel has a
face in it.
