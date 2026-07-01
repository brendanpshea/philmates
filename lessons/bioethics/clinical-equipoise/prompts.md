# Image prompts — Clinical Equipoise ("The Jekyll Protocol")

The lesson ships with **hand-authored placeholder SVGs** (`/assets/*.svg`) so it
works with zero external art. To enhance later with an image generator, generate
the asset below, drop the PNG in `/assets/` with the matching name (e.g.
`helen-jekyll.png`), and swap the `src` in `index.html`. Aim for the *best* version
of each: fun, gamelike, memorable, and informative — every piece should embody the
research-ethics idea it stands for, not just illustrate the scene.

The cast is a **one-generation-removed Jekyll & Hyde** frame: Helen Jekyll is
wholly fictional and drawn in a modern setting, so a full character portrait is
fair game. Henry Jekyll is Robert Louis Stevenson's public-domain character (1886)
— render him as a stylized period figure (locket/photograph framing), not a real
person's likeness. **No portraits of the real cited philosophers (Fried,
Freedman)** — the outline deliberately keeps them off-camera as text-only
`<phil-compare>` cards; don't add art assets for them.

## House style (prepend to every prompt)

> **16-bit SNES/JRPG pixel art**, gothic-clinical mood (think a modern research
> hospital with one foot still in a Victorian townhouse). Hard pixel edges, no
> anti-aliasing, subtle dithered shading, a chunky silhouette that reads clearly at
> 64 px. Tight palette drawn from the PhilMates UI: void background `#11131f`,
> panel slate `#1d2235`, ink `#eef1ff`, and four accent inks — go-green `#46e07a`,
> magenta `#ff6ad5`, info-blue `#4cc2ff`, amber `#ffcf5a`; reserve a cold clinical
> blue-white for Helen's world and a murky sepia-green for Henry's. **No text, no
> lettering, no watermark, no signature.** Transparent or `#11131f` background.
> Square (1:1) for characters/icons; portrait framing for the two Jekylls.

## Cast & icons

### `helen-jekyll.png` — Dr. Helen Jekyll
> A composed young asian-american physician-scientist in a crisp modern lab coat over a blue
> collar, dark hair pulled back, holding up a clean glass trial vial that catches
> the light; a faint double-helix motif traced into the vial's label forms a
> subtle "H."
> *Teaches:* the protagonist frame — a researcher who insists on doing every step
> the rigorous, ethical way.

### `henry-jekyll.png` — Henry Jekyll (locket photograph)
> An oval locket frame holding a sepia-toned period portrait: a Victorian
> gentleman in a high collar and dark waistcoat, composed expression, faint unease
> around the eyes.
> *Teaches:* the ancestor and cautionary counter-example — every safeguard in the
> lesson is something he lacked.

### `hyde-shadow.png` — the inner Hyde
> The same locket portrait, but a looming, sharp-toothed shadow silhouette rises
> behind/above Henry's head, its eyes two small embers of red — suggesting a
> private, unshared hunch overtaking a single mind.
> *Teaches:* theoretical equipoise's fragility — one person's own private lean
> (their "inner Hyde") is enough to break a strict individual 50/50 balance.

### `expert-panel.png` — the panel of experts
> A row of five diverse clinician silhouettes/busts (white coats, stethoscopes,
> varied ages and styles), each subtly leaning or tilting toward or away from a
> shared center point, a couple rendered in go-green (leaning for) and a couple in
> red (leaning against), one neutral gray.
> *Teaches:* clinical equipoise — genuine disagreement distributed across a
> community, not one person's certainty.

### `serum-vial.png` — Henry's serum
> A cracked, hand-labeled glass vial with a cork stopper, filled with a murky
> greenish-black liquid that seems to swirl on its own, label half torn and
> ink-stained.
> *Teaches:* the uncontrolled, unblinded, self-administered "trial of one."

### `trial-vial.png` — Helen's trial drug
> A clean modern glass vial with a crisp printed label, filled with a clear
> cool-blue liquid, a small printed barcode and randomization code visible (no
> real text needed — implied marks only).
> *Teaches:* the modern apparatus — labeled, tracked, randomized, nothing left to
> improvisation.

### `blindfold.png` — double-blind
> Two simple cloth eye-masks/blindfolds side by side, one slightly larger than the
> other, both tied with a small bow, floating against the dark panel background.
> *Teaches:* single- vs double-blind design — hiding the arm assignment from more
> than one party.

### `placebo-pill.png` — placebo vs real drug
> A plain round white sugar pill on the left and a two-tone blue capsule on the
> right, otherwise nearly identical in size and shape so they read as
> indistinguishable at a glance.
> *Teaches:* the placebo-control question — visually identical, ethically very
> different.

### `dsmb-eye.png` — the monitoring board
> A single large stylized watchful eye rendered in cool blue light, iris shaped
> like a small data chart or heartbeat line, set inside a plain rectangular
> "monitor" frame.
> *Teaches:* the independent Data and Safety Monitoring Board — an outside party
> watching the trial's data so no one inside it has to police themselves.

## Reused assets (no new art needed)

- **`scales.png`** — reused as-is from `lessons/bioethics/four-principles/assets/`.
  "Equipoise" literally means balance, so the same medical scale used for Van
  Helsing's weighing-of-principles slide does double duty here on the
  theoretical-vs-clinical equipoise comparison slide. Recoloring not required.
- Henry's and Helen's vials (`serum-vial` / `trial-vial`, above) are recolors of
  the same silhouette used for `blood-vial.png` in `four-principles` — same
  apparatus, different rigor, reused across generations. If regenerating with an
  image model, keep the *shape* consistent between the two and vary only color/
  label/liquid to preserve that visual rhyme.

## Accuracy notes for the artist/generator

- Henry Jekyll and his serum are the sole fictional device (Stevenson, 1886,
  public domain) — everything else in the lesson (trial phases, equipoise,
  DSMBs, placebo ethics) is real research-ethics methodology and should read as
  *plausible modern clinical apparatus*, not costume-drama props.
- Don't render Charles Fried or Benjamin Freedman — they're cited by name in text
  only; no likenesses needed or wanted.
