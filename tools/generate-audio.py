#!/usr/bin/env python3
"""Generate narration MP3s for a lesson using edge-tts (no API key, needs network).

Scans <lesson>/index.html for <phil-slide id="..."> elements that contain a
<phil-narration>...</phil-narration>, and writes <lesson>/assets/audio/<id>.mp3.
Only re-renders slides whose narration text (or voice) changed, tracked in a
small manifest.json next to the audio.

Usage:
    pip install edge-tts
    python tools/generate-audio.py lessons/ethical-theory/utilitarianism
    python tools/generate-audio.py <lesson-dir> --voice en-US-GuyNeural
"""
import asyncio, hashlib, json, re, sys
from pathlib import Path

try:
    import edge_tts
except ImportError:
    sys.exit("edge-tts not installed.  Run:  pip install edge-tts")

DEFAULT_VOICE = "en-US-AriaNeural"
TAG = re.compile(r"<[^>]+>")
WS = re.compile(r"\s+")

def clean(fragment: str) -> str:
    text = TAG.sub(" ", fragment)
    for a, b in (("&amp;", "&"), ("&mdash;", "—"), ("&nbsp;", " "), ("&hellip;", "…")):
        text = text.replace(a, b)
    return WS.sub(" ", text).strip()

def find_narrations(html: str):
    items = []
    for m in re.finditer(r"<phil-slide\b([^>]*)>([\s\S]*?)</phil-slide>", html, re.I):
        attrs, body = m.group(1), m.group(2)
        nar = re.search(r"<phil-narration\b[^>]*>([\s\S]*?)</phil-narration>", body, re.I)
        if not nar:
            continue
        idm = re.search(r'\bid="([^"]+)"', attrs)
        items.append((idm.group(1) if idm else None, clean(nar.group(1))))
    return items

async def main():
    pos = [a for a in sys.argv[1:] if not a.startswith("--")]
    voice = sys.argv[sys.argv.index("--voice") + 1] if "--voice" in sys.argv else DEFAULT_VOICE
    if not pos:
        sys.exit("Usage: python tools/generate-audio.py <lesson-dir> [--voice NAME]")

    lesson = Path(pos[0])
    html = (lesson / "index.html").read_text(encoding="utf-8")
    items = find_narrations(html)
    if not items:
        print("No <phil-narration> slides found.")
        return

    audio_dir = lesson / "assets" / "audio"
    audio_dir.mkdir(parents=True, exist_ok=True)
    man_path = audio_dir / "manifest.json"
    manifest = json.loads(man_path.read_text()) if man_path.exists() else {}

    made = skipped = 0
    for sid, text in items:
        if not sid:
            print(f'  ! narrated slide has no id= -- skipping ("{text[:40]}...")')
            continue
        h = hashlib.sha1(f"{voice}|{text}".encode("utf-8")).hexdigest()
        out = audio_dir / f"{sid}.mp3"
        if manifest.get(sid) == h and out.exists():
            skipped += 1
            continue
        print(f"  + {sid}.mp3  ({len(text)} chars)")
        await edge_tts.Communicate(text, voice).save(str(out))
        manifest[sid] = h
        made += 1

    man_path.write_text(json.dumps(manifest, indent=2))
    print(f"Done -- {made} generated, {skipped} unchanged.  Voice: {voice}")

if __name__ == "__main__":
    asyncio.run(main())
