# The narrated player

A lesson with narration gets a **Play** button. Pressed, the lesson plays like a
narrated slideshow: a voice introduces each slide, each bullet appears as its
line is spoken, and slides with nothing to do move on by themselves. The player
stops at every activity and picks up again once the student finishes. Captions
are on by default.

The click-through lesson is still there: a student who never presses Play gets
the ordinary lesson, and a paused player behaves exactly like it. Next and Back
always work, so nothing is ever locked.

**In use:** ten lessons, starting with the pilot, *The Midnight Tribunal*
(`ethical-theory/utilitarianism`). Every AI-ethics lesson except *Growing Up in
Springfield* is narrated. The catalog marks narrated lessons with a
**Narrated** badge. Four of them use a Gemini voice chosen for the lesson (see
*Gemini voices* below): *The Masquerade of Silverport*, *The Last Job*, *Move
On* and *The Ship's Chest*. The rest use edge-tts.

Scripts for five of them were drafted by a smaller model (Sonnet) from a written
brief, then spot-checked against the slides for changed facts. That works well:
the structure is mechanical, and a walkthrough check catches missing lines and
waits. Two rules from that run: the script never respells words (it doubles as
the captions; respellings go in `tools/pronunciations.json`), and it never adds
a fact the slide doesn't have.

## What the student sees

- **▶ Play** in the bottom bar on every slide, and a large **▶ Play with
  narration** button on the title slide. Space also plays and pauses.
- **❚❚ Pause / ▶ Resume.** While paused, Next reveals bullets one at a time as
  usual, and Resume carries on from wherever the student got to.
- **↻** replays the current slide. **1×** cycles 1, 1.25, 1.5 and 0.75 speed.
  **CC** turns captions off and on. Speed and captions are remembered.
- At an activity the button reads **✎ Your turn** until the student finishes.
  Then it reads **▶ Continue**.
- While playing, Next skips to the next bullet's line, or to the next slide.

## When the player waits

After a slide's last line, the player decides whether to move on:

| The slide has… | The player… |
|---|---|
| a graded question not yet solved, or a poll or belief probe not yet done | waits (**✎ Your turn**), then plays the slide's after line, if any, and offers **Continue** |
| an activity that's already done (or finished while the narrator talked) | plays the after line, if any, and offers **Continue**, so the feedback is never whisked away |
| `hold` on the `<phil-slide>`, or a `<phil-branch>` | offers **Continue** (for widgets with no "done" signal, like the cake slider) |
| a review detour after a miss | offers **Continue**, which goes back to the question |
| nothing to do | moves on after a second |

## Writing the script

Three kinds of line, all plain text:

```html
<phil-slide id="kinds-of-desire">
  <h1>Not All Desires Are Equal</h1>
  <!-- the intro: spoken first -->
  <phil-narration>So why does Epicurus frown at your cake? Because he sorts
    desires into three bins.</phil-narration>
  <ul reveal>
    <!-- one line per reveal step, spoken as the step appears -->
    <li say="First, desires that are natural and necessary…">…</li>
    <li say="Second, desires that are natural but unnecessary…">…</li>
  </ul>
</phil-slide>

<phil-slide>
  <phil-beliefs>…</phil-beliefs>
  <phil-narration>Rate each of these five statements, then press Submit.</phil-narration>
  <!-- optional: spoken once the activity is done -->
  <phil-narration when="after">Saved. You'll come back to these at the end.</phil-narration>
</phil-slide>

<!-- an explore widget with no "done" signal: wait for Continue -->
<phil-slide hold>…</phil-slide>
```

- **Write for the ear.** Short sentences. Paraphrase the bullet, don't read it
  out; the student can already see it. The same register rules apply as on the
  slides (`node tools/check-register.mjs` reads the script too).
- **Spell out what TTS stumbles on:** "forty-dollar" rather than "$40", no
  decimals, no abbreviations with periods ("e.g.", "Dr."). Captions break at
  sentence ends, so a period inside an abbreviation splits a caption.
- **Tell the student what to press** on activity slides, using the UI's labels:
  *Check answers* (classify, checkset), *Check* (cloze), *Submit* (belief
  probes), *Continue* (the player).
- **Every step on a narrated slide needs a `say`.** A step without one still
  appears, after a pause long enough to read it, but in silence.
- The script is not part of the click-through lesson, so it must never carry
  anything a question depends on. `student-view.mjs` leaves it out of the
  blind-solver view for that reason.

## Generating the audio

```bash
pip install -U edge-tts           # keep it current; old versions get a 403 from the service
python tools/generate-audio.py lessons/<topic>/<lesson> --dry-run   # list lines and word count
python tools/generate-audio.py lessons/<topic>/<lesson>
```

- Uses **edge-tts**: free, no API key, needs network. Default voice
  `en-US-AvaMultilingualNeural`. Change it with `--voice NAME` (list them with
  `python -m edge_tts --list-voices`); the choice is remembered in the lesson's
  `assets/audio/manifest.json`, so later runs keep it.
- Each line becomes `assets/audio/<hash>.mp3`, named by a hash of its text that
  the engine computes too. **Editing a line can never play stale audio.** Until
  you re-run the script, that line shows its captions at reading speed instead.
  The same fallback lets you try a whole script before generating anything.
- Re-runs render only lines whose text, pronunciation or voice changed, and
  delete clips nothing uses any more.
- The free service throttles a long run now and then. Each line is retried with
  backoff, a failed line never leaves a broken clip, and any line that still
  fails is listed at the end. Run the script again to fill in just those.
- **Pronunciation:** names the voice gets wrong are respelled for the voice only
  in `tools/pronunciations.json` (`{"Cy": "Sigh"}`). Captions keep the real
  spelling. Listen to new names before shipping.
- **Gemini voices (since October 2026):** `--engine gemini` renders with
  Gemini TTS instead (default model `gemini-3.8-flash-lite-tts`). It needs a
  key (`GEMINI_API_KEY`, or a `goog-api-key:` line in `.env.local`) and
  `pip install lameenc`. Each lesson can have its own `--voice`, chosen from
  Google's voice library of about a thousand voices (`GET /v1beta/voices`
  lists each voice's accent, age and manner), plus an optional `--style`,
  one short delivery note. All of these are remembered in the manifest.
  - **Use `--batch`.** Line by line, Tier 1 allows only 100 requests a day
    per model, and each line is one request: one lesson a day at best. A
    batch job has no daily cap, costs half, and came back in minutes in
    testing. Batch requests can't carry a style, so a batch voice runs
    without one. That's no loss: a trial style ("warm, unhurried storyteller
    with a hint of mischief") sounded overdone, and the lessons in use run
    without one.
  - **Choosing a voice:** match it to the lesson's frame. The four in use:
    `en-gb-storyteller-2` (Masquerade: a witty British woman at a candlelit
    ball), `en-gb-storyteller-4` (Ship's Chest: a Bristol man for a Bristol
    harbor), `en-us-sami` (Move On: a calm American woman, since the lesson is
    about today), `en-za-podcaster-4` (The Last Job: a wry game-show host).
  - **Cost:** about 25 audio tokens a second. A 2,500-word lesson is about
    30,000 tokens: roughly $0.09 by batch or $0.18 line by line on
    flash-lite, at the rates of October 2026. Google says those rates double
    on 1 January 2027.
  - **Pacing:** Gemini voices read about 2.3 words a second, against 2.6 for
    edge-tts, so a lesson runs about a tenth longer. A style asking for an
    "unhurried" delivery slowed one lesson by a further fifth.
- **Size:** about 6 KB per second of speech. A lesson's narration runs 1,800 to
  2,700 words (11 to 17 minutes), which comes to 4 to 6 MB. It ships in the
  SCORM package. If many lessons get narrated, consider Git LFS for
  `assets/audio/`.

## Engine notes

- The player lives in `<phil-lesson>` (`shared/phil-core.js`, "narrated
  player"). It appears only when the lesson contains a `<phil-narration>`.
- Browsers block audio until the user interacts with the page. Pressing Play is
  that interaction, so the lesson never tries to start audio by itself. If a
  browser still refuses, the player pauses and Resume starts it.
- Captions sit in a strip between the stage and the controls, never over the
  slide. They are not a live region, so a screen reader doesn't read them over
  the voice. The your-turn cue is announced.
