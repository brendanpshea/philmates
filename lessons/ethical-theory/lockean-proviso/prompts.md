# Image-generation prompts — Enough and As Good

Generated with `node tools/cf-image.mjs --batch temp/proviso.json` (flux-2-dev).
Keep this file as the source of truth; regenerate from it if art needs redoing.

Post-processing applied after generation: downscale to 512px wide
(HighQualityBicubic), then `npx pngquant-bin --force --ext .png --quality 60-90`
to bring each panel under ~200 KB.

**Status:** Not yet generated.

## Palette note

Deep indigo shadows stay, since that is the house ground across every lesson.
What separates this one is the **flora and the light**: violet and magenta alien
vegetation under a low warm amber sun, with jade and teal accents. Amberville is
brass, Frankenstein is bone and slate, The Network With No Middle is phosphor
green — this reads as none of them at thumbnail size.

Shared style suffix for every prompt:

> 16-bit SNES-era pixel art, limited palette, crisp pixel edges, no
> anti-aliasing, no text, no lettering, no labels, no numbers, no signage of any
> kind, violet and magenta alien vegetation lit by a low warm amber sun, jade
> and teal accents, deep indigo (#1d2235) shadows, centered subject.

## Scale is the argument

Four of these panels are carrying a claim about *proportion* — a handful of
people against a world that could hold billions. Wherever figures appear, they
must be **small and few against something vast**. If a panel comes back with the
settlers filling the frame, reroll it: the composition is the lesson, and a
cosy homestead scene quietly answers the question the slide is asking.

## Faces

Locke, Nozick, Paine and Bentham are real people and must not be drawn, per
`AUTHORING.md` — they get the four idea-emblem relic cards below. The settlers
are invented, but they are a group rather than characters, so keep them distant
and unindividuated throughout.

---

## landing-site

A single small landing craft resting on an endless plain of waist-high violet
and magenta alien vegetation, five or six tiny human figures standing near it
dwarfed by the landscape, rolling hills of the same growth receding to a far
horizon under an enormous pale sky with a low amber sun, deep indigo shadows
pooling in the folds of the land.

## first-field

A small neat rectangle of cleared and furrowed dark earth planted in tidy rows,
sitting in the middle of a vast unbroken expanse of wild violet and magenta
growth that runs to the horizon in every direction, three tiny figures working
at one edge of the rectangle, a low rough fence of cut stems along one side,
warm amber afternoon light, deep indigo shadows.

## second-ship

An enormous colony transport descending through cloud over the same violet
plain, its bulk filling the upper half of the frame and casting a wide shadow
across the vegetation below, where the small original landing craft and its
cleared rectangle of field are now visibly tiny beneath it, amber sun catching
the transport's flank, deep indigo shadows.

## claim-map

A surveyor's field table set up outdoors at dusk: a large unrolled chart of a
whole continent weighted at the corners, ruled straight lines dividing it into
blank parcels, brass dividers, a plumb bob and a rolled spare chart beside it,
one lantern lighting the table, violet plain and low amber horizon behind, deep
indigo shadows.

## idea-orchard

An orchard of trees heavy with glowing jade fruit, where one tree has been
enclosed by a tall iron fence while every other tree stands open and equally
laden, a small figure outside the fence looking in, the enclosed tree no less
full than before, warm amber light through the leaves, deep indigo shadows.

## relic-locke

A framed relic composition on dark aged wood: an open human hand holding a
single acorn, and directly beneath the hand a field divided by a low boundary
wall into one tilled plot and one wild plot of equal size. Jade and amber
accents, deep indigo ground, laurel-gold borders.

## relic-nozick

A framed relic composition on dark aged wood: a tilted tin can pouring a thin
red stream into a vast dark sea that stretches to the frame edges, the red
thread dispersing and vanishing a short way from the can. Deep teal sea, one
warm red accent, deep indigo ground, steel borders.

## relic-paine

A framed relic composition on dark aged wood: a globe resting on a strongbox
whose open lid shows stacked coins, with a small chute running from the globe
down into the box and a second chute running out of the box toward the frame
edge. Jade globe, amber coins, deep indigo ground, silver borders.

## relic-bentham

A framed relic composition on dark aged wood: a rolled property deed and a
heavy statute book bound tightly together with a single iron chain, resting on
bare boards with no halo, glow or ornament of any kind around them. Warm beige
paper, cold iron chain, deep indigo ground, plain steel borders.

---

## Note on relic-bentham

The absence of ornament is the point and should survive any reroll. Locke's
relic gets a laurel-gold frame because his claim is that property is a natural
right that exists before law; Bentham's answer is that property is nothing but
law, so his emblem should look administrative rather than sacred. If the
generator adds a glow or a radiance, reroll it — the visual contrast between
these two cards is carrying a real distinction in the lesson.
