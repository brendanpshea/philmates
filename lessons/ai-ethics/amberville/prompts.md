# Image-generation prompts — High Noon in Amberville

Generated with `node tools/cf-image.mjs --batch temp/amberville.json` (flux-2-dev).
Keep this file as the source of truth; regenerate from it if art needs redoing.

Post-processing applied after generation: downscale to 512px wide
(HighQualityBicubic), then `npx pngquant-bin --force --ext .png --quality 60-90`
to bring each panel under ~200 KB.

**Status:** All 9 panels (`main-street`, `prudence`, `sorter`, `noticeboard`, `prospector`, `saloon`, `telegram`, `boiler`, and `meeting`) generated, post-processed at 512×512, compressed with pngquant, and enabled in `index.html`.

Shared style suffix for every prompt:
> 16-bit SNES-era pixel art, limited palette, crisp pixel edges, no
> anti-aliasing, no text, no lettering, no signs with writing, dark indigo
> (#1d2235) shadows, centered subject.

## main-street
A dusty frontier-western main street at dawn: wooden saloon and general store
with empty blank signboards, a small white church whose steeple carries an
incongruous satellite dish, telegraph poles receding down the street, a large
wooden shipping crate on the station platform, warm gold dawn sky fading to
dark indigo, one tumbleweed.

## prudence
A wardrobe-sized brass difference-engine cabinet standing alone on wooden
floorboards: riveted brass panels, one large round anxious-looking dial, a
ticker-tape slot with a curl of blank paper tape, small valve gauges, a little
bell on top, soft warm lamplight from the left, dark indigo background.

## noticeboard
A wooden town notice board outdoors: several pinned blank papers, one
conspicuous bright rectangle of unfaded wood where a notice has just been
removed with a single tack left behind, a thin brass mechanical arm retreating
out of frame at the edge, dusk light, dark indigo sky.

## saloon
A western saloon interior: at left a woman singer in a saloon dress glaring
across the room, at right a polished brass speaking-horn (gramophone horn) on
the bar with a small appreciative crowd of cowboys raising glasses to it, a
player piano with keys moving by themselves, warm lamplight, dark indigo
shadows.

## telegram
A sheriff with a star badge and mustache sitting at a wooden desk at night,
reading an impossibly long ticker-tape printout that spills over the desk and
coils onto the floor, behind him a wanted-poster wall holding only pinned
curls of blank tape, oil lamp glow, dark indigo room.

## boiler
Behind a frontier town at dusk: a big iron-and-brass boiler house straddling a
visibly shrunken creek, thick pipes running to a waiting coal cart, steam
rising, and one small warmly-lit window revealing a cramped room where small
figures sort stacks of punch cards, dark indigo sky, distant town silhouette.

## meeting
A wooden town-hall interior at dusk: lantern-lit townsfolk seated in pews seen
from behind, facing a brass cabinet machine standing at the front where a
preacher would stand, a long paper tape hanging from its slot, several hands
half-raised for a vote, warm lantern light against dark indigo shadows.

## sorter
A large brass card-sorting machine inside a wooden frontier granary: a tall
riveted brass cabinet with a row of open sorting slots along its front, stiff
paper index cards fanning through the slots and dropping into two separate
wooden output trays, one tray full and one nearly empty, plump burlap sacks of
seed grain piled against the plank walls behind it, a worn wooden counter in
the foreground, warm morning light slanting from a high window, dark indigo
shadows.

## prospector
A tall brass gambling machine standing in the dim corner of a western saloon:
three vertical reels behind a round glass window, each reel showing one single
large simple gold star shape and nothing else, one large heavy brass crank
handle mounted on its right side, a polished silver ten-gallon hat displayed on
a small pedestal on top as the prize, a scattering of small round brass tokens
spilled on the floorboards at its base, an ornate riveted brass cabinet on
carved wooden legs, a standing oil lamp glowing at the left, dark indigo
shadows.

Note: an earlier attempt using mismatched reel symbols (horseshoes/bells/stars)
composed well but baked letter-like glyphs onto the reels, so it was discarded.
Asking for one single simple shape per reel avoids that. The trade-off is that
three matching stars read as a jackpot rather than the near miss the slide
describes; a reroll aiming for the third reel caught mid-scroll would be better.

## Re-rolls done (2026-10-29)

These replaced the panels flagged in the 2026-10-28 review and supersede
those panels' prompts above.

### Sheet 1 (required)

```
16-bit SNES pixel art, a steampunk frontier-western town. Hard pixel edges, limited palette, warm gold lamplight, dark indigo shadows. No text, letters, or numbers anywhere; every sign, tape, and paper is blank.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a tall brass gambling machine in a dim saloon corner, its window showing two gold stars on the center line and the third star stopped just below it, a brass crank at its side, a silver cowboy hat on top as the prize, no people.
Top-right: a saloon where a dark-haired woman singer in her forties, in a plum dress, glares at a brass gramophone horn on the bar while a mixed crowd, men and women, young and old, of varied skin tones, raise glasses to it.
Bottom-left: a gray-haired Black woman sheriff with a star badge at a desk at night, reading an endless ticker tape that spills off the desk and coils across the floor, oil-lamp glow.
Bottom-right: a lantern-lit town hall seen from behind the pews, a mixed crowd of men and women, young and old, of varied skin tones, facing a wardrobe-sized brass machine with one round dial, a few hands half-raised for a vote.
```

| Quadrant | File |
|---|---|
| Top-left | `amberville/assets/prospector.png` |
| Top-right | `amberville/assets/saloon.png` |
| Bottom-left | `amberville/assets/telegram.png` |
| Bottom-right | `amberville/assets/meeting.png` |

### Sheet 2 (optional; the second takes went unused)

```
16-bit SNES pixel art, a steampunk frontier-western town. Hard pixel edges, limited palette, warm gold lamplight, dark indigo shadows. No text, letters, or numbers anywhere; every sign, tape, and paper is blank.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a dusty frontier main street at dawn, wooden storefronts whose signboards are plain unpainted wood, a small white church with a satellite dish on its steeple, telegraph poles, a shipping crate on the platform, one tumbleweed.
Top-right: a big iron-and-brass boiler house beside a shrunken creek at dusk, thick pipes dipping into the water, a coal cart on rails, and one lit window where four young people, two women and two men of varied skin tones, sort punch cards.
Bottom-left: a close view of a brass gambling machine's round window, two gold stars on the center line and the third reel still spinning, its star sliding just past the line.
Bottom-right: a sheriff's office at night, a gray-haired Black woman sheriff standing on her chair as blank ticker tape floods the floor around her desk like snow.
```

| Quadrant | File |
|---|---|
| Top-left | `amberville/assets/main-street.png` |
| Top-right | `amberville/assets/boiler.png` |
| Bottom-left | second take of `amberville/assets/prospector.png` |
| Bottom-right | second take of `amberville/assets/telegram.png` |
