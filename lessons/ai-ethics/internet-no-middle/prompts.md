# Image-generation prompts — The Network With No Middle

Generated with `node tools/cf-image.mjs --batch temp/internet.json` (flux-2-dev).
Keep this file as the source of truth; regenerate from it if art needs redoing.

Post-processing applied after generation: downscale to 512px wide
(HighQualityBicubic), then `npx pngquant-bin --force --ext .png --quality 60-90`
to bring each panel under ~200 KB.

**Status:** All 9 panels present in `assets/` and enabled in `index.html`.

Two notes from inspection. The `relic-baran` panel dropped the "numbered
fragments reassembling" idea and rendered a torn document behind a mesh instead
— readable, but not the reassembly the prompt asked for, so the slide's alt text
was rewritten to describe what is actually there rather than what was ordered. And
`spacewar-terminal` came back with three figures rather than two; alt text
likewise corrected.

The anti-text strategy worked. Specifying screens as "plain glowing green
rectangles" and "ship shapes on a grid" produced clean abstract displays with no
character-like glyphs on any of the three screen-bearing panels.

## Palette note

Three lessons in this topic already have a look: Amberville is brass and gold,
The Breadcrumb Network is amber forest, Frankenstein's Mistake is cold bone and
slate. This one is the **1970s computer room** — phosphor green on black, warm
beige equipment cabinets, burnt-orange cable, fluorescent overheads. Period
correct, and it keeps four lessons in the same topic visually separable at
thumbnail size.

Shared style suffix for every prompt:

> 16-bit SNES-era pixel art, limited palette, crisp pixel edges, no
> anti-aliasing, no text, no lettering, no labels, no numbers, no signage of any
> kind, palette of phosphor green and warm beige equipment against deep indigo
> (#1d2235) shadows, one burnt-orange cable accent, centered subject.

## The text problem in this lesson

This is the highest-risk lesson in the set for baked-in lettering. Generators
put labels on network diagrams, glowing text on CRT screens, and model numbers
on equipment panels almost by reflex. Every prompt below is written to avoid
giving it an excuse: screens show **shapes and waveforms**, never characters;
equipment shows **dials, lamps and switches**, never plates.

Inspect every panel full-size before shipping. If a screen comes back with
character-like glyphs on it, reroll rather than shrinking it and hoping.

## Diagrams are SVG, not generated art

The packet-switching diagram and the protocol-layer diagram must be
**hand-authored inline SVG**, not generated panels. They carry precise
relationships (this packet took that route; this layer sits on that one), a
generator cannot be trusted to get those right, and `AUTHORING.md` prefers
hand-authored SVG anyway. They are not listed below.

---

## imp-room

The inside of a university computer room in 1969: a refrigerator-sized grey
steel equipment cabinet with rows of small round indicator lamps and toggle
switches on its front panel, a teletype terminal on a metal desk beside it, a
thick orange cable running from the cabinet across the floor and out through a
hole in the cinderblock wall, two people in shirtsleeves standing at the desk,
hard fluorescent overhead light, deep indigo shadows in the corners.

## spacewar-terminal

A dim university laboratory at night, 1962: a large grey minicomputer cabinet
with a round glass radar-style screen set into it, and on that screen two tiny
glowing green spaceship shapes and a bright point of light between them, two
students hunched close to the screen gripping small hand-made control boxes
wired to the machine, phosphor-green glow on their faces, everything else in
deep indigo shadow.

## cern-cube

A cluttered office desk in a physics laboratory, 1990: a matte black cube-shaped
computer workstation with a small screen showing plain glowing green rectangles,
stacks of paper and technical binders, a coffee cup, cables trailing off the
desk edge, and a window behind showing snow-covered mountains under a pale sky,
warm desk lamp against cool daylight.

## dns-catalog

An enormous library hall filled floor to ceiling with wooden card-catalogue
drawers stretching into the distance, each with a small brass pull, a single
clerk on a rolling ladder halfway up one wall holding one drawer open, a single
large brass key hanging on a hook by the door, warm beige wood, dust in a shaft
of light, deep indigo depths.

## cookie-counter

A shop interior seen from behind the counter: a customer browsing shelves in the
middle distance, and in the foreground a clerk at a tall desk writing in a long
ledger, watching them, with a row of many identical filled ledgers on a shelf
above, each one tagged with a blank paper tab, warm lamplight on the ledger, the
customer lit more coldly, deep indigo corners.

## relic-baran

A framed relic composition on a dark panel: a single sheet of paper torn into
five numbered fragments, each fragment travelling along a different glowing
thread through a diamond-shaped mesh of small nodes, converging and reassembling
into one whole sheet at the far side. Phosphor-green threads, warm beige paper,
one burnt-orange fragment, deep indigo ground, steel borders.

## relic-endtoend

A framed relic composition on a dark panel: a long plain grey pipe running left
to right across the frame, completely dark and featureless along its whole
length, with a bright intricate glowing lamp mechanism mounted at each open end.
Phosphor-green lamps, dull beige pipe, deep indigo ground, steel borders.

## relic-berners-lee

A framed relic composition on a dark panel: an open document page with a single
glowing thread rising out of one line of it, arcing across the frame, and
entering a second document page in the far corner, with more faint threads
hinting outward beyond the frame edges. Phosphor-green threads, warm beige
pages, deep indigo ground, laurel-silver borders.

## relic-lessig

A framed relic composition on a dark panel: a judge's wooden gavel resting on a
thick closed law book, where the head of the gavel is made of green circuit
board with fine copper traces running across it. Warm beige book, phosphor-green
board, burnt-orange traces, deep indigo ground, steel borders.

---

## Faces

Every person named in this lesson is real — Paul Baran, Ray Tomlinson, Vint
Cerf, Bob Kahn, Tim Berners-Lee, Lawrence Lessig — so **none of them may be
drawn**, per `AUTHORING.md`. They get idea-emblem relic cards instead, which is
what the four `relic-*` panels above are for.

The people in `imp-room`, `spacewar-terminal` and `cookie-counter` are anonymous
figures, seen small, at a distance, or from behind. Keep them that way: they are
scenery, not portraits of the historical figures who were actually in those
rooms.
