#!/usr/bin/env python3
"""Generate the narrated player's audio for a lesson, using edge-tts (no API
key, needs network).

Every spoken line in <lesson>/index.html becomes one MP3 in assets/audio/:
  - the text of each <phil-narration> (a slide's intro, or its when="after" line)
  - the say="..." attribute on each reveal step
A clip is named by an FNV-1a hash of its line, the same name the engine
computes (clipUrl in shared/phil-core.js). So a line edited without re-running
this script plays captions only, never the old audio.

Only lines whose text, spoken form or voice changed are rendered again, and
clips no line uses any more are deleted. manifest.json lists every clip with
its slide and text. The voice is remembered there, so --voice is only needed
to change it.

Names TTS gets wrong are respelled for the voice only, via
tools/pronunciations.json ({"word": "respelling"}). Captions keep the real
spelling.

Usage:
    pip install edge-tts
    python tools/generate-audio.py lessons/ethical-theory/utilitarianism
    python tools/generate-audio.py <lesson-dir> --voice en-US-GuyNeural
    python tools/generate-audio.py <lesson-dir> --dry-run     # list the lines, render nothing
"""
import argparse, asyncio, json, re, sys
from html.parser import HTMLParser
from pathlib import Path

DEFAULT_VOICE = "en-US-AvaMultilingualNeural"
PRONOUNCE = Path(__file__).with_name("pronunciations.json")


def squash(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def clip_name(text: str) -> str:
    """FNV-1a over UTF-8, as 8 hex digits. Must match clipUrl in phil-core.js."""
    h = 0x811C9DC5
    for b in text.encode("utf-8"):
        h = ((h ^ b) * 0x01000193) & 0xFFFFFFFF
    return f"{h:08x}"


class Lines(HTMLParser):
    """Every spoken line, in document order, with the slide it is on."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lines, self.slide, self.count, self.buf = [], None, 0, None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "phil-slide":
            self.count += 1
            self.slide = a.get("id") or f"s{self.count}"   # the engine's fallback id
        if a.get("say"):
            self.lines.append((self.slide, squash(a["say"])))
        if tag == "phil-narration":
            self.buf = []

    def handle_endtag(self, tag):
        if tag == "phil-narration" and self.buf is not None:
            self.lines.append((self.slide, squash("".join(self.buf))))
            self.buf = None

    def handle_data(self, data):
        if self.buf is not None:
            self.buf.append(data)


def spoken(text: str, words: dict) -> str:
    for word, say in words.items():
        text = re.sub(rf"\b{re.escape(word)}\b", say, text)
    return text


async def render(text: str, voice: str, out: Path):
    # Written to a .part file and renamed only when complete, so a failed or
    # interrupted request can never leave a broken clip under a real name.
    part = out.with_name(out.name + ".part")
    for attempt in range(5):
        try:
            await edge_tts.Communicate(text, voice).save(str(part))
            part.replace(out)
            return
        except Exception as e:                 # the service drops requests, more so under load
            part.unlink(missing_ok=True)
            if attempt == 4:
                raise
            print(f"  ! retrying {out.name}: {e}")
            await asyncio.sleep(2 ** (attempt + 1))


async def main():
    ap = argparse.ArgumentParser(description="Generate narration clips for a lesson.")
    ap.add_argument("lesson")
    ap.add_argument("--voice")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    lesson = Path(args.lesson)
    parser = Lines()
    parser.feed((lesson / "index.html").read_text(encoding="utf-8"))
    lines = [(slide, text) for slide, text in parser.lines if text]
    if not lines:
        print("No <phil-narration> or say= lines found.")
        return

    audio = lesson / "assets" / "audio"
    man_path = audio / "manifest.json"
    old = json.loads(man_path.read_text(encoding="utf-8")) if man_path.exists() else {}
    voice = args.voice or old.get("voice") or DEFAULT_VOICE
    words = json.loads(PRONOUNCE.read_text(encoding="utf-8")) if PRONOUNCE.exists() else {}

    want = {}
    for slide, text in lines:
        want.setdefault(clip_name(text), {"slide": slide, "text": text, "spoken": spoken(text, words)})
    print(f"{len(want)} lines, {sum(len(v['text'].split()) for v in want.values())} words. Voice: {voice}")
    if args.dry_run:
        for name, line in want.items():
            print(f"  {name}  {line['slide']:<16} {line['text'][:70]}")
        return

    try:
        global edge_tts
        import edge_tts
    except ImportError:
        sys.exit("edge-tts not installed.  Run:  pip install edge-tts")

    audio.mkdir(parents=True, exist_ok=True)
    for f in audio.glob("*.part"):              # left by a run that was killed
        f.unlink()
    before = old.get("clips", {}) if old.get("voice") == voice else {}
    done = {k: v for k, v in want.items()
            if (audio / f"{k}.mp3").exists() and before.get(k, {}).get("spoken") == v["spoken"]}
    todo = [k for k in want if k not in done]
    gate = asyncio.Semaphore(3)
    failed = []

    async def one(name):
        async with gate:
            line = want[name]
            try:
                await render(line["spoken"], voice, audio / f"{name}.mp3")
            except Exception as e:             # one bad line shouldn't stop the rest
                failed.append(name)
                print(f"  ✘ {name}.mp3  {line['slide']}: {e}")
                return
            done[name] = line
            print(f"  + {name}.mp3  {line['slide']}: {line['text'][:60]}")

    try:
        await asyncio.gather(*(one(k) for k in todo))
    finally:
        # Written even after a failure, so the clips that did render are kept.
        clips = {k: done[k] for k in want if k in done}
        man_path.write_text(json.dumps({"voice": voice, "clips": clips}, indent=2, ensure_ascii=False) + "\n",
                            encoding="utf-8")

    stale = [f for f in audio.glob("*.mp3") if f.stem not in want]
    for f in stale:
        f.unlink()
    print(f"Done: {len(todo) - len(failed)} rendered, {len(want) - len(todo)} unchanged, {len(stale)} removed.")
    if failed:
        sys.exit(f"{len(failed)} line(s) failed. Run again to retry just those.")


if __name__ == "__main__":
    asyncio.run(main())
