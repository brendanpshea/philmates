# Image-generation prompts — The Philosopher's Blueprint

Generated as 2×2 blocks with `generate_image`, sliced to 512×512, and compressed with `npx pngquant-bin --force --ext .png --quality 60-90` to bring each panel under ~160 KB.

**Status:** All 8 panels generated, post-processed at 512×512, compressed with pngquant, and enabled in `index.html`.

Shared style suffix for every prompt:
> 16-bit SNES-era pixel art, limited palette, crisp pixel edges, no anti-aliasing, no text, no lettering, no signs with legible writing, dark indigo (#1d2235) shadows, warm golden amber lighting.

## platobot
A friendly retro-chassis copper and brass automaton tutor named PlatoBot with glowing amber vacuum-tube eyes, a small scroll dispenser slot in its chest, and a slightly crooked brass laurel wreath on its head, standing beside a marble pedestal with a rolled scroll in a classical Athenian academy library. Warm lamp glow, dark indigo room.

## bluebook-desk
A wooden examination desk in a quiet exam hall at dusk. On the desk rests an open blank blue examination booklet, an antique glass hourglass with flowing sand, an inkwell with quill, and a small scrap paper showing a 4-part architectural blueprint diagram. Warm lantern light, dark indigo shadows.

## steelman-scales
A polished brass balance scale standing atop a fluted marble pillar under warm lantern light. On one pan rests a solid iron shield representing a thesis; on the other pan rests a gleaming golden sword representing a steelman counterargument, balanced against dark indigo arches.

## mind-gymnasium
An ancient Athenian academy workshop and intellectual forge where a glowing hearth illuminates an anvil with a philosopher's quill and an intricate clockwork mechanism being crafted, surrounded by wooden shelves and scrolls. Warm amber glow, dark indigo shadows.

## worldview-debugging
An ancient Athenian observatory at night showing a glowing brass armillary sphere and celestial globe with interlocking mechanical gears of philosophical principles, under a dark indigo starry night sky.

## strawman-fallacy
A comically flimsy straw training dummy with a crooked pot helmet falling apart into pieces with a gentle poke of a wooden training sword in an ancient Athenian wrestling yard. Warm sunlight, dark indigo shadows.

## cognitive-overload
A frustrated student sitting at a cluttered wooden exam desk surrounded by floating spinning gears, tangled parchment scrolls, overflowing ink bottles, and an hourglass running low, illustrating mental bottleneck and confusion.

## relic-socrates
A framed relic composition showing an ancient Greek ceramic cup, an unrolled papyrus scroll with geometric diagram sketches, and a silver Athenian owl coin resting on dark polished olive wood with laurel gold borders.

## No new art
The Blueprint Builder was moved from an inline `<script>` into
`assets/blueprint.js` as a `<phil-blueprint-builder>` custom element. It draws
itself from CSS — no image assets needed.
