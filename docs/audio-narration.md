# Audio narration (shelved — kept for later)

We prototyped per-slide narration, then **shelved it**. No lessons currently use
it. The tooling and engine support are intact, so re-enabling is just a matter of
adding narration text back to slides. This doc is the how-to.

## Status
- ✅ Generator script: `tools/generate-audio.py` (uses **edge-tts**, no API key).
- ✅ Engine support: `<phil-lesson>` plays `assets/audio/<slide.id>.mp3` on slide
  show, with a 🔇/🔊 toggle in the top bar. **The toggle only appears if the lesson
  contains at least one `<phil-narration>`** — so silent lessons show no audio UI.
- ⏸️ No `<phil-narration>` in any lesson right now (removed on purpose).

## How to add narration to a lesson
1. On each slide you want narrated, give the slide a **stable `id`** and add a
   `<phil-narration>` with clean spoken text (it's hidden on screen):
   ```html
   <phil-slide id="the-dream">
     <h1>The Dream</h1>
     <p>…on-screen content…</p>
     <phil-narration>Spoken script for this slide. Write for the ear,
       not as a verbatim read of the bullets.</phil-narration>
   </phil-slide>
   ```
   The `id` is the contract between the generator and the player: the engine looks
   for `assets/audio/<id>.mp3`, and the generator writes that filename.
2. Generate the MP3s:
   ```bash
   pip install edge-tts
   python tools/generate-audio.py lessons/<topic>/<lesson>
   # optional voice override, e.g.:
   python tools/generate-audio.py lessons/<topic>/<lesson> --voice en-US-GuyNeural
   ```
   It writes `lessons/<topic>/<lesson>/assets/audio/<id>.mp3` plus a
   `manifest.json` (content hashes) so unchanged slides are skipped on re-runs.
3. Open the lesson and click the **🔇** button to enable audio (default is off).

## Notes & gotchas
- **Autoplay:** browsers block audio until the first user gesture, so slide 1 stays
  silent until you click 🔇→🔊 (or otherwise interact). That click is the gesture
  that unlocks playback for the rest of the lesson. Default is **off** so nothing
  surprises a classroom.
- **MP3s are binary blobs in Git.** Fine for a few; if narration ever covers many
  slides across many lessons, move audio to **Git LFS** (or generate at deploy
  time) rather than committing it.
- **Voices:** any edge-tts voice works — e.g. `en-US-AriaNeural` (default),
  `en-US-GuyNeural`, `en-GB-SoniaNeural`. List them with `edge-tts --list-voices`.

## Known rough edge to solve before real use: reveal slides
One clip per slide doesn't pace well with **bullets revealed one at a time** — the
audio reads everything while the bullets are still hidden. Two ways forward when we
revisit this:
- **Quick:** write **reveal-agnostic** narration (describe the throughline, don't
  enumerate the bullets). No code changes.
- **Better (recommended):** **per-step clips** — a slide-level `<phil-narration>`
  for the intro plus a `say="…"` on each reveal `<li>`; the generator emits
  `<id>-0.mp3`, `<id>-1.mp3`, … and each Reveal click both shows the bullet and
  plays its line. The existing reveal handler is the natural trigger. Decide
  whether a finished clip should auto-advance the next bullet or wait for a click
  (default: wait, to keep presenter control).
