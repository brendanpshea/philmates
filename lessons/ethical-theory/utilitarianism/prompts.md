# Image prompts — Utilitarianism ("The Judges of the $40 Cake")

The lesson ships with **hand-authored SVGs** (`/assets/*.svg`) so it works with zero
external art. To enhance later with an image generator, generate the asset below,
drop the PNG in `/assets/` with the matching name (e.g. `bentham.png`), and swap the
`src` in `index.html`. Aim for the *best* version of each: fun, gamelike, memorable,
and informative — the picture should teach the idea, not just label a name.

## House style (prepend to every prompt)

> **16-bit SNES/JRPG pixel art.** Hard pixel edges, no anti-aliasing, subtle
> dithered shading, a chunky silhouette that still reads clearly at 64 px. Tight
> palette drawn from the PhilMates UI: void background `#11131f`, panel slate
> `#1d2235`, ink `#eef1ff`, and four accent inks — go-green `#46e07a`, magenta
> `#ff6ad5`, info-blue `#4cc2ff`, amber `#ffcf5a`. Dramatic single-source "screen
> glow" lighting. **No text, no lettering, no numerals, no watermark, no
> signature.** Transparent or `#11131f` background. **Objects** are square (1:1);
> **thinker relic cards** are a tall card (4:5).

## Relic-card frame (use for every philosopher)

We never draw a real thinker's face — at pixel size a likeness just reads as a
generic person, so recognition never lands. Instead each thinker is a **collectible
"relic card"** whose emblem *encodes their core idea* (a mnemonic you can collect).

> Render as a tall pixel **relic card**: a chunky near-black `#050610` outer border,
> a glowing 2 px inner frame in the card's **accent color**, a faceted rank-gem set
> in the top bar, and three rarity-pips along the bottom edge. One emblem floats
> centered on the slate panel, lit from above like a museum artifact; the accent
> color tints the frame, gem, pips, and the emblem's highlights.

## Thinkers

### `epicurus.png` — Epicurus · accent **green**
> Emblem: a humble earthenware cup brimming with clear water beside a torn barley
> loaf and a single sprig of garden herb, resting on cool stone; a soft candle-warm
> glow and a few drifting "calm" motes. Behind, the faint silhouette of a walled
> garden gate (Epicurus's Garden).
> *Teaches:* the greatest pleasure is the simplest — bread, water, friendship, a
> quiet mind (*ataraxia*), not luxury.

### `bentham.png` — Jeremy Bentham · accent **blue**
> Emblem: a brass clockwork "felicity engine" — a two-column ledger-abacus, a tall
> stack of glowing green pleasure-tokens (+) outweighing a shorter stack of magenta
> pain-tokens (−), a sum-needle tipping to a net-green result. Every token is
> identical and the same size.
> *Teaches:* morality made arithmetic — the hedonic calculus, and "each to count
> for one, none for more than one."

### `mill.png` — John Stuart Mill · accent **amber**
> Emblem: an open leather-bound book on a small lectern, a warm lantern-flame of
> intellect rising from its pages and throwing light upward; a short stair of light
> climbs from a dim ember ("lower" pleasure) to a bright star ("higher" pleasure); a
> quill rests in the gutter.
> *Teaches:* better to be Socrates dissatisfied than a fool satisfied — higher,
> intellectual pleasures rank above mere sensation.

### `singer.png` — Peter Singer · accent **magenta**
> Emblem: concentric rings ripple outward across still water from a central figure,
> like a stone dropped in a pond; each wider ring gathers in more beings — self,
> then strangers, then animals — drawn as small silhouettes, all lit equally;
> outward-pointing arrows.
> *Teaches:* the expanding circle of equal consideration — every being capable of
> suffering counts, and distance doesn't dilute the claim.

## Objects

### `cake.png` — the $40 cake
> A single glossy slice of dark-chocolate gateau crowned with gold leaf and a
> glistening cherry on a fancy china plate, wrapped in a tempting magenta
> sugar-sparkle aura. Draw it like a rare *consumable item* sitting in its
> inventory slot.
> *Teaches:* the tempting splurge every judge in the story has to weigh — is the
> fleeting pleasure worth the cost?

### `scales.png` — the balance of pleasure and pain
> A tall brass balance: the left pan heaped with glowing green happiness-orbs, the
> right with magenta suffering-shards, the beam tilting just past level toward
> green; a faint grid backdrop like a JRPG status screen.
> *Teaches:* the core utilitarian move — weigh total pleasure against total pain and
> see which way it tips.

> Note: thinker cards are stylized educational emblems, never photoreal likenesses —
> the *ideas* are the content.
