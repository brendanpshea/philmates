# Image-generation prompts — Dr. Frankenstein and the Problem of Alignment

Generated with `node tools/cf-image.mjs --batch temp/frankenstein.json` (flux-2-dev).
Keep this file as the source of truth; regenerate from it if art needs redoing.

Post-processing applied after generation: downscale to 512px wide
(HighQualityBicubic), then `npx pngquant-bin --force --ext .png --quality 60-90`
to bring each panel under ~200 KB.

**Status:** All 10 panels present in `assets/` and enabled in `index.html`,
including `mirror-diagram`, which was listed below as optional and turned out to
be the strongest image in the set — it now carries the mirror slide.

Outstanding: `creature-wakes` renders the creature with a fully lit, frontal,
skull-like face. That contradicts the "keep the face shadowed or turned" rule
below, and it works against the lesson — slide 4 teaches students that "a
mindless brute" is FALSE, and slide 13 then shows them a ghoul. Worth a reroll
with the face explicitly turned away from the viewer.

Batch file ready to re-run at `temp/frankenstein.json`.

## Palette note

This lesson deliberately does **not** use the warm brass-and-amber palette of
*High Noon in Amberville* or the golden forest of *The Breadcrumb Network*. It
runs cold — bone white, slate, deep indigo — with exactly one warm accent per
panel (a candle, a hearth, a lantern). That single warm point is the whole
emotional argument of the lesson: warmth exists, and the creature is always
outside it, looking in.

Shared style suffix for every prompt:

> 16-bit SNES-era pixel art, limited palette, crisp pixel edges, no
> anti-aliasing, no text, no lettering, no signs with writing, cold desaturated
> palette of bone white, slate grey and deep indigo (#1d2235), a single warm
> candle-gold accent light, centered subject.

## Faces

Victor, the creature, and Walton are **invented characters**, so portraits are
fine (same rule that allows Van Helsing in the bioethics set). Mary Shelley and
Norbert Wiener are **real people** and must not be drawn — they get idea-emblem
relic cards instead, per `AUTHORING.md`.

Keep the creature's face mostly shadowed or turned in every panel. Shelley never
describes it in full daylight, students should be picturing a person rather than
a movie monster, and a pixel-art close-up of a "monster face" would undo the
lesson's central claim in one image.

---

## arctic-ship

A wooden three-masted sailing ship locked fast in Arctic pack ice at night,
seen from across a vast plain of broken ice floes, green and violet aurora
curtains overhead, two tiny lantern-lit figures on the deck, jagged pressure
ridges in the foreground, cold bone-white ice against deep indigo sky.

## victor-workshop

A cluttered attic laboratory at night: a long wooden workbench crowded with
glass jars, coiled copper wire, brass instruments and stacked books, a large
form lying under a heavy sheet at the far end, one guttering candle, rain
streaking a tall arched window, cold slate shadows with a single pool of warm
candlelight.

## creature-wakes

Interior of the same attic laboratory: a very tall gaunt figure sitting upright
on the workbench with its face turned away into shadow, one long arm braced on
the bench, while in the foreground a young man in shirtsleeves stumbles
backward knocking over a stool, his candle falling, sheets sliding to the
floor, cold indigo room with one warm falling candle flame.

## cottage-crack

Interior of a dark lean-to hovel built against a cottage wall: an enormous
hunched figure seen from behind in silhouette, crouched with one eye to a
narrow chink between the planks, a thin blade of warm golden light falling
across its shoulders, and through the gap a glimpse of a family seated at a
lit supper table, cold dark shelter against warm distant hearth.

## village-rejection

Dusk at the edge of a stone village: a cluster of villagers with raised sticks
and two burning torches driving a tall cloaked figure backward toward a wall of
dark pine trees, the figure's arms raised to shield its shadowed face, scattered
stones on the frozen ground, cold blue snow with hot orange torchlight.

## glacier-meeting

A vast blue-white glacier under jagged alpine peaks at midday: two lone figures
facing each other across the ice at a distance, one of ordinary height in a
dark travelling coat, the other nearly twice as tall in ragged clothes, deep
crevasses and drifting mist between them, cold desaturated ice and slate sky.

## second-creature

Interior of a bare stone hut on a remote island: a partly assembled second body
lying draped on a slab table, a man standing over it with one hand gripping a
tool and his head turned toward the window, moonlight on the sea beyond the
opening, a single low candle on the floor, cold grey stone and indigo night.

## relic-shelley

A framed relic composition on dark aged wood: an open leather notebook with
abstract ink marks, a quill, a small glass jar holding a captured spark of
electricity, and behind them a darkened sun low over a storm-lit lake — the
Year Without a Summer. Laurel-silver borders, cold indigo shadows, one warm
spark of gold at the centre.

## relic-wiener

A framed relic composition on dark aged wood: a brass clockwork mechanism
running at full speed with its control lever snapped clean off at the base, the
empty switch socket visible beside it, and an overflowing wooden bucket spilling
water across the frame. Steel-blue borders, cold indigo shadows, one warm brass
highlight.

---

## Optional, if a panel is wanted for the mirror slide

The Victor/creature mirror is better as a hand-authored inline SVG than as a
generated panel — it is a two-column comparison, and `<phil-compare>` already
carries that. Only generate art here if the compare widget looks bare in
testing.

## mirror-diagram (only if needed)

A single tall mirror in a plain wooden frame standing on bare floorboards,
reflecting a tall ragged silhouette back at a smaller man in a travelling coat
who stands before it, both faces turned away from the viewer, cold empty room,
one candle on the floor between them.
