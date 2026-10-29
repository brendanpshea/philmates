# Image prompts — The Third Twin

Twenty square scenes, generated as **five 2×2 sheets** and split into
quadrants. Each sheet is one short, complete prompt in a code block, ready to
paste into any image generator. Render each sheet square. Inspect every panel
full-size: reject any with baked-in text, and re-roll any sheet that repeats a
panel instead of drawing four different scenes. Keep the source sheets in
`temp/ai-diagnosis-sheets/`, not in `assets/`.

**To re-roll one panel on its own,** paste the style line, then that panel's
sentence, then "One single square image, not a grid."

The frame is invented: Mustard Medical Center in Brassica, a small Minnesota
river town, founded in the 1890s by the twin doctors Ida and Otto Mustard.
Today the Center is deciding whether to use an AI diagnostic system the staff
call "the Third Twin." Six rules:

1. **Original designs only.** No likeness to any real person, hospital, or
   logo. The Center is a nod to a real Minnesota clinic, so draw nothing that
   copies a real building or emblem.
2. **No portraits of real people.** London, Bjerring and Busch, Parfit, and
   Elish appear only as idea scenes on thinker cards. No faces in those panels.
3. **No text.** Screens, charts, tags, and papers show blank shapes or bars,
   never letters or numbers.
4. **The Third Twin is a machine, never a face.** A plain workstation with a
   small round mustard-yellow light. Not menacing, not cute: the art should not
   decide whether it can be trusted.
5. **Vary the people.** Every panel with people names each figure's age,
   gender, and skin color, and groups are mixed: men and women, young and old,
   a range of skin tones.
6. **1890s scenes are sepia;** today's scenes use the full palette.

## Status (2026-10-29)

All five 2×2 sheets (`sheet-a.png` through `sheet-e.png`) generated with Gemini
(Nano Banana) and split into all twenty 512×512 PNG assets in
`lessons/bioethics/ai-diagnosis/assets/`.
Full sheets are kept in `temp/ai-diagnosis-sheets/` outside `assets/` so they
do not inflate the SCORM zip size.

All 20 scene PNGs are validated, on-style (16-bit SNES pixel art with PhilMates palette),
text-free, and ready for authoring `index.html`.

## Style line (first line of every sheet)

```
16-bit SNES pixel art, a small snowy Minnesota river town and its big medical center. Hard pixel edges, limited palette, dark navy background, mustard-yellow accents. No text, letters, or numbers anywhere.
```

## Cast (keep these words the same in every panel)

- **Dr. Ida Mustard (1890s):** a woman doctor in her thirties with fair skin
  and dark hair in a bun, a high-collared plum dress, and a leather doctor's
  bag.
- **Dr. Otto Mustard (1890s):** her twin brother, a man in his thirties with
  fair skin, dark hair, and a neat mustache, in a dark three-piece suit.
- **Dr. Sam Beaulieu:** an Ojibwe man in his fifties with long gray hair tied
  back and glasses, in a navy blazer over scrubs.
- **Dr. Kari Lund:** a white woman radiologist in her forties with short
  blond hair and reading glasses, in light blue scrubs.
- **June Pham:** a Vietnamese American woman in her sixties with short gray
  hair, in a green cardigan.
- **Hodan Warsame:** a Somali American woman in her thirties, a pharmacist, in
  a patterned headscarf and a white coat.
- **Arne Dahl:** a white farmer in his seventies with weathered hands, in a
  seed cap and a red flannel shirt.
- **The Third Twin:** a sleek white workstation with two wide screens and a
  small round mustard-yellow light on top.

---

## Sheet A — the Center

Save as `sheet-a.png`, then split.

```
16-bit SNES pixel art, a small snowy Minnesota river town and its big medical center. Hard pixel edges, limited palette, dark navy background, mustard-yellow accents. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a tall modern limestone-and-glass hospital tower in a small snowy river town at dusk, mustard-yellow banners on lampposts, a glass skyway, and a little old brick clinic at its foot.
Top-right: a sepia 1890s studio portrait of twin doctors side by side: a woman in her thirties with fair skin and dark hair in a bun, in a high-collared plum dress, and a man in his thirties with fair skin, dark hair, and a neat mustache, in a dark three-piece suit.
Bottom-left: a sleek white workstation with two wide screens showing a chest X-ray and a heart tracing, and a small round mustard-yellow light on top, in a quiet dim reading room.
Bottom-right: a hospital meeting room at night with snow at the window, an Ojibwe man in his fifties with long gray hair tied back and glasses at the head of the table, and doctors and nurses of different ages, genders, and skin tones looking at a big screen.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `center.png` | Title; Summed up |
| Top-right | `twins.png` | The Mustard twins |
| Bottom-left | `third-twin.png` | How a diagnostic AI learns |
| Bottom-right | `board.png` | Your job; your report to the board |

## Sheet B — the state of the art

Save as `sheet-b.png`, then split.

```
16-bit SNES pixel art, a small snowy Minnesota river town and its big medical center. Hard pixel edges, limited palette, dark navy background, mustard-yellow accents. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a long glowing light wall covered in hundreds of chest X-rays in neat rows, each with a small blank colored tab, receding into the distance.
Top-right: a clinic exam room where a heart tracing glows on a small monitor beside a big red pixel heart, a paper-covered exam table behind it.
Bottom-left: a middle-aged Black man in a bathrobe at a kitchen table at night, frowning at his phone, whose screen shows only blank chat bubbles, a mug of tea beside him.
Bottom-right: a hospital nurses' station where a dozen monitors flash red alert lights at once, and a tired young Latina nurse in teal scrubs rubs her eyes.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `xray-wall.png` | How a diagnostic AI learns |
| Top-right | `heart-trace.png` | Where it works today |
| Bottom-left | `chatbot.png` | Chatbots that diagnose |
| Bottom-right | `alarms.png` | Where it has failed |

## Sheet C — can you trust what you can't follow?

Save as `sheet-c.png`, then split.

```
16-bit SNES pixel art, a small snowy Minnesota river town and its big medical center. Hard pixel edges, limited palette, dark navy background, mustard-yellow accents. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a sepia 1890s doctor's office lit by an oil lamp, where a woman doctor in her thirties with fair skin and dark hair in a bun writes in a thick leather casebook while her twin, a man with a neat mustache, listens to an old farmer's chest.
Top-right: a Vietnamese American woman in her sixties with short gray hair, in a green cardigan, sits beside a doctor's desk and looks worried at a screen showing a chest scan with one small spot ringed in yellow, a young doctor seen from behind.
Bottom-left: a chest X-ray on a glowing light box with a small yellow tag in its top corner, and a big magnifying glass hovering over the tag instead of the lungs.
Bottom-right: an antique glass bottle of white pills and a closed black box side by side on a lab bench under a lamp, a long paper chart of rising bars behind them, no people.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `casebook.png` | Part 1 opener (then and now) |
| Top-right | `june.png` | June's scan; poll |
| Bottom-left | `tag.png` | Right for the wrong reason |
| Bottom-right | `idea-london.png` | Thinker card: London |

## Sheet D — accurate for whom?

Save as `sheet-d.png`, then split.

```
16-bit SNES pixel art, a small snowy Minnesota river town and its big medical center. Hard pixel edges, limited palette, dark navy background, mustard-yellow accents. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a sepia 1890s scene of two twin doctors, a woman in a plum dress and a man with a neat mustache, driving a horse-drawn buggy down a snowy prairie road toward a lone farmhouse at dawn.
Top-right: a small one-story rural clinic, where a white farmer in his seventies in a seed cap and red flannel shirt sits on an exam table as a young Hmong woman nurse in purple scrubs wheels a portable X-ray machine toward him.
Bottom-left: a Somali American woman in her thirties in a patterned headscarf and white coat stands at a pharmacy counter, studying a tablet that shows a close-up photo of a dark spot on deep brown skin.
Bottom-right: two stacks of wooden building blocks, one tall and one short, and a hand reaching in to knock the tall stack down to the short one's height, no faces.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `buggy.png` | Part 2 opener (then and now) |
| Top-right | `prairie-clinic.png` | Three ways a tool can fail a group |
| Bottom-left | `hodan.png` | The deployment dilemma; poll |
| Bottom-right | `idea-parfit.png` | Thinker card: Parfit |

## Sheet E — who's really in charge?

Save as `sheet-e.png`, then split.

```
16-bit SNES pixel art, a small snowy Minnesota river town and its big medical center. Hard pixel edges, limited palette, dark navy background, mustard-yellow accents. No text, letters, or numbers anywhere.

A 2×2 grid of four DIFFERENT square scenes, separated by thin dark gutters:
Top-left: a sepia 1890s clinic where twin doctors, a woman in a plum dress and a man with a neat mustache, stand back to back, each studying a separate copy of the same patient's chart.
Top-right: a white woman radiologist in her forties with short blond hair and reading glasses, in light blue scrubs, at a dark reading station of three screens of breast X-rays, one screen with a bright yellow box drawn on it, her hand resting on the mouse.
Bottom-left: a crash-test car stopped against a concrete wall, its front folded up like an accordion, and a white doctor's coat caught in the crumpled hood, no people.
Bottom-right: two empty chairs, a patient's and a doctor's, facing a desk where a closed black box sits beside a notepad sketch of a path that forks in two, no people.
```

| Quadrant | File | Slide use |
|---|---|---|
| Top-left | `two-looks.png` | Part 3 opener (then and now) |
| Top-right | `kari.png` | When the machine leads |
| Bottom-left | `idea-elish.png` | Thinker card: Elish |
| Bottom-right | `idea-bjerring-busch.png` | Thinker card: Bjerring and Busch |
