# Image prompts — Thomson's Thought Experiments ("Six Impossible Things Before Breakfast")

Scenes and invented characters ship as generated 512×512 PNGs in `/assets/`.
Generate with `node tools/cf-image.mjs --batch …` (see
[docs/image-generation.md](../../../docs/image-generation.md)); convert each
section below into a `{ out, prompt }` entry and prepend the house style.
Inspect every PNG full-size: reject any with baked-in text.

The cast is borrowed from Lewis Carroll's *Alice's Adventures in Wonderland*
(1865) and *Through the Looking-Glass* (1871), both public domain. Three rules:

1. **Original designs only.** No likeness to any film, TV, or game adaptation,
   and especially not the 1951 animated film. Avoid its signature combination of
   a powder-blue dress, white pinafore, and black hairband. Don't name any
   adaptation in a prompt.
2. **No portraits of real people.** Thomson, Foot, and Dennett get idea-emblem
   relic cards. Henry Fonda appears only as an anonymous hand; never a face.
3. **Dignity for the medical scenes.** The violinist and the tiny house carry
   serious subject matter. Keep them calm and clinical, never grotesque or comic.

## Status (2026-09-23)

All assets are generated. Carroll's world appears in the art only; the slide
text is about Thomson. Known issues:

- `three-tracks.png` needs a re-roll. It shows a four-way crossing with groups
  of six and three, not five / one / the bystander. The prompt below is
  tightened for the retry.
- `hatter-watch.png` has Roman numerals on the watch face. Minor; paint them
  out or re-roll if it bothers you.
- `caterpillar.png` is **unused**. Its Alice has the 1951-film look that rule 1
  forbids, and the revised outline dropped the slide.

## House style (prepend to every prompt)

> **16-bit SNES/JRPG pixel art**, storybook Victorian fantasy seen through a
> looking-glass. Hard pixel edges, no anti-aliasing, subtle dithered shading, a
> chunky silhouette that reads clearly at 64 px. Tight palette drawn from the
> PhilMates UI: void background `#11131f`, panel slate `#1d2235`, ink `#eef1ff`,
> and four accent inks: go-green `#46e07a`, magenta `#ff6ad5`, info-blue
> `#4cc2ff`, amber `#ffcf5a`. Lighting: **cool silver mirror-light with warm
> amber candle accents**. Whimsical but clear, not creepy. **No text, no
> lettering, no numbers, no watermark, no signature.** `#11131f` background.
> Square (1:1).

## Cast and scenes

### `white-queen.png` — the White Queen's breakfast (title and closing)
> An absent-minded queen in a rumpled white gown and a crooked crown, shawl
> slipping off one shoulder and stuck with too many pins, hair escaping in every
> direction. She sits at the head of a long breakfast table set with six silver
> covered dishes, lids slightly raised with a faint glow leaking from each. Behind
> her, a tall ornate looking-glass shows the same table reversed. Expression:
> serene and a little dotty.
> *Pedagogical role:* The six covered dishes are the lesson's six impossible
> things, one per case. Reuse on the recap slide.

### `white-knight.png` — the White Knight and his contraption (Dennett's method)
> A gentle, lanky knight in dented tin armor, visor up, mild kind eyes and a
> drooping mustache. His horse's saddle is hung with odd inventions: a beehive, a
> mousetrap, a small upside-down box. He is bent over a brass control console on
> a wooden stand, turning one of five large round knobs with great care; small
> gauges and glowing dials on the console. One knob is clearly marked by a
> magenta glow as the one being turned.
> *Pedagogical role:* Knob-turning. Change one detail at a time and watch the
> gauges, i.e. whether the intuition still gets pumped.

### `looking-glass-lab.png` — Galileo's two stones
> A tall stone tower seen inside a gilded oval mirror frame, as if the scene
> exists only in reflection. Near the top of the tower, two stones of very
> different size, one large and one small, tied together with a short rope, are
> falling side by side through the air. Faint motion lines. A pale thought-bubble
> glow surrounds the mirror.
> *Pedagogical role:* A thought experiment refutes a theory with no lab. The
> mirror frame says "this happens in the head."

### `violinist.png` — the violinist (impossible thing #1)
> A quiet hospital room at night. Two beds side by side. In one, a person sits up,
> just waking, looking down in alarm at a clear tube running from their arm. The
> tube crosses to the second bed, where an unconscious man lies peacefully with
> long hair spread on the pillow. A violin case rests against the foot of his
> bed. A heart monitor glows info-blue. Through the doorway, a cluster of
> well-dressed music lovers in evening clothes waits, holding concert programs
> with blank covers.
> *Pedagogical role:* The kidnapping frame. You were chosen, not asked.

### `humpty-dumpty.png` — "what does a right to life mean?"
> A large egg-shaped figure in a smart cravat and waistband, sitting on a narrow
> brick wall with his legs crossed. He holds up a long unrolled blank scroll and
> points at it with the air of a lecturer. Two blank signboards on posts below
> the wall point in different directions.
> *Pedagogical role:* Conceptual analysis. The two signposts are the two
> readings of "right to life" (not to be killed unjustly vs. to be given what
> you need). Keep them blank; the slide supplies the words.

### `cool-hand.png` — Henry Fonda's cool hand (impossible thing #2)
> Close-up: a feverish patient's forehead on a pillow, beads of sweat, flushed
> cheeks, eyes closed; only the brow and one closed eye are visible. A single
> anonymous hand in a crisp shirt cuff hovers just above the brow, cool
> info-blue light radiating from the fingertips. The hand's owner is fully out
> of frame. No face other than the patient's partial profile.
> *Pedagogical role:* You'd benefit from the touch, but you have no right to it.
> The owner is deliberately unseen: no real-person likeness.

### `rabbit-house.png` — the tiny house (impossible thing #3)
> A small cottage with a brass nameplate (blank) on the door, its walls visibly
> bulging, roof tiles lifting, windows cracking outward, because something
> enormous is filling it from inside. One giant arm reaches out of an upstairs
> window. Outside, a small white rabbit in a waistcoat and a lizard holding a
> ladder look up, helpless and unsure.
> *Pedagogical role:* The expanding-child case. The rabbit and lizard are the
> bystanders who say "we can't choose between you." Slide text notes that in
> Thomson's version *you* are the one inside.

### `people-seeds.png` — the people-seeds (impossible thing #4)
> A cozy parlor at dusk seen from inside. An open window fitted with a fine mesh
> screen; one corner of the screen is torn. Glowing seed-puffs like dandelion
> clocks drift in the evening air outside, pale go-green, and one has slipped
> through the tear and settled on the carpet, where a tiny luminous sprout is
> beginning to root. A wingback chair and a reading lamp nearby. No faces on the
> seeds.
> *Pedagogical role:* Precautions that fail. Did opening the window give the seed
> a right to the house?

### `trolley-driver.png` — Foot's original case
> A small vintage streetcar careening down a track, sparks flying from its
> wheels. Seen from just behind the driver's shoulder in the open cab: a
> uniformed driver gripping a brass steering lever, looking ahead at a fork in
> the track. Five small figures stand on the left branch, one on the right. The
> brake handle in the cab hangs broken.
> *Pedagogical role:* The trolley began with a *driver*, in a paper about
> abortion. Distinct from `trolley-spur` in `trolley-and-triage`, which shows a
> bystander.

### `three-tracks.png` — Thomson's 2008 case
> A simple top-down diagram-like view of railway tracks. A single track enters
> from the bottom, where a runaway trolley is approaching, and splits into
> exactly three separate branches fanning upward like a trident: left, middle,
> right. Exactly five small figures stand in a row on the far end of the left
> branch. Exactly one small figure stands on the far end of the middle branch.
> On the right branch, a single man in a cap stands on the rails beside a switch
> lever at the fork, looking down at his own feet on the track. No other people,
> no crossing tracks, plain grass between the branches.
> *Pedagogical role:* The knob Thomson turned: the bystander could divert the
> trolley onto himself.

### `hatter-watch.png` — "The Time of a Killing"
> A long, messy tea table under a tree: mismatched teacups, a teapot with a
> sleepy dormouse half inside it, and an oversized top hat with a blank price
> card tucked in the band (no text) set on an empty chair. In the foreground, a
> pocket watch lies open in a saucer of tea, its hands stopped. Faint dreamlike
> clock faces float in the background, all with blank dials.
> *Pedagogical role:* When does a killing happen if the act and the death are
> days apart? The stopped watch says time went wrong.

### `caterpillar.png` — "Who are you?" *(unused; see Status)*
> A large, calm blue caterpillar lounging on top of a giant mushroom, arms folded,
> looking down with heavy-lidded, skeptical eyes. Lazy smoke rings drift up
> around him (no pipe or hookah visible). Far below, a tiny girl in a simple
> original pinafore dress looks up at him. Several faint ghost-outlines of the
> girl at different heights stand behind her, overlapping.
> *Pedagogical role:* Identity across time. The ghost outlines are Alice
> "changed several times since this morning."

### `two-selves.png` — Margo and the advance directive
> A split scene mirrored across a looking-glass. On the left, a middle-aged woman
> at a writing desk carefully seals a letter with amber wax. On the right, the
> same woman thirty years older, in a cardigan, happily painting a simple,
> repeated flower pattern at an easel in a sunny care-home room. The sealed letter
> sits unopened on a table beside her. The mirror frame runs down the middle.
> *Pedagogical role:* One person, two selves. Who speaks for her now? Warm and
> respectful, not sad.

## Relic cards (hand-authored SVG, 80×108)

Use the standard frame: dark border, accent inner frame, rank gem in the top bar,
rarity pips at the bottom. See `lessons/ethical-theory/*/assets/` for reference.
These are not generated.

### `relic-thomson.svg` — Judith Jarvis Thomson (accent: magenta `#ff6ad5`)
Emblem: an unplugged medical cord, its plug resting just apart from its socket,
curling around the neck of a small violin. Encodes her central move: the right
to life isn't a right to use another's body.

### `relic-foot.svg` — Philippa Foot (accent: amber `#ffcf5a`)
Emblem: a railway switch lever above a track that splits in two. Encodes the
trolley's origin and the doctrine of double effect.

### `relic-dennett.svg` — Daniel Dennett (accent: info-blue `#4cc2ff`)
Emblem: an old-fashioned hand water pump with three round knobs mounted on its
barrel, a single droplet at the spout. Encodes the intuition pump and the knobs
you turn to test it.
