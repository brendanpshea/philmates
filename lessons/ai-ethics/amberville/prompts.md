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

## Re-rolls needed (review 2026-10-28)

Each line is one panel, written to paste on its own with the shared style
suffix above. Update the panel's `alt` in `index.html` when you swap it in.

- **prospector** (shows a jackpot, but the slide teaches the near miss): A tall
  brass gambling machine in a dim saloon corner, its round window showing two
  plain gold stars on the center line and the third reel stopped with its star
  just below the line, a heavy brass crank on its right side, a silver
  ten-gallon hat on top as the prize, brass tokens on the floorboards, a
  standing oil lamp at left, no people or shadows.
- **saloon** (the crowd is all young men; faint glyphs on the wall plaque): A
  western saloon interior, at left a dark-haired woman singer in her forties in
  a plum saloon dress glaring across the room, at right a brass gramophone horn
  on the bar toasted by a small mixed crowd of men and women, young and old,
  with a range of skin tones, a player piano with keys moving by themselves,
  bare plank walls with no signs.
- **meeting** (the crowd is nearly all men in cowboy hats): A wooden town-hall
  interior at dusk seen from behind the pews, a mixed crowd of townsfolk (men
  and women, young and old, a range of skin tones, some bareheaded or in
  bonnets) facing a brass cabinet machine at the front with a long blank paper
  tape hanging from its slot, several hands half-raised for a vote, warm
  lantern light.
- **telegram** (letter-like headings and lines on the pinned notices): A
  gray-haired Black woman sheriff with a star badge at a wooden desk at night,
  reading an impossibly long blank ticker-tape printout that spills over the
  desk and coils across the floor, the wall behind her holding only pinned
  curls of blank tape, oil lamp glow.
- **main-street** (optional; letter-like glyphs on the middle storefront's
  sign): reuse the prompt above, adding "every signboard is plain unpainted
  wood".
- **boiler** (optional; the window shows two similar young people, the slide
  says four): reuse the prompt above, replacing the window clause with "one
  small warmly lit window where four young card-sorters, two women and two
  men with a range of skin tones, sort stacks of punch cards".
