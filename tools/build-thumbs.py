#!/usr/bin/env python3
"""Make the small card images for the homepage catalog.

For every lesson, take the first slide illustration (the first <img slot="art">)
and write a 192x192 WebP to shared/thumbs/<topic>--<lesson>.webp. The homepage
generator uses that file when it exists and falls back to the full-size image
when it does not, so this is an optimisation and never a requirement.

    python tools/build-thumbs.py          # only lessons whose thumbnail is missing or stale
    python tools/build-thumbs.py --all    # redo every one

Needs Pillow (pip install pillow). SVG art is skipped: the page uses it as is.
"""
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "shared" / "thumbs"
SIZE = 192
ART = re.compile(r'<img[^>]*\bslot="art"[^>]*\bsrc="([^"]+)"', re.I)


def main():
    redo = "--all" in sys.argv
    OUT.mkdir(parents=True, exist_ok=True)
    made = skipped = 0
    for page in sorted((ROOT / "lessons").glob("*/*/index.html")):
        topic, lesson = page.parts[-3], page.parts[-2]
        m = ART.search(page.read_text(encoding="utf-8"))
        if not m or m.group(1).lower().endswith(".svg"):
            continue
        src = (page.parent / m.group(1)).resolve()
        dest = OUT / f"{topic}--{lesson}.webp"
        if not src.exists():
            print(f"  missing art: {src.relative_to(ROOT)}")
            continue
        if not redo and dest.exists() and dest.stat().st_mtime >= src.stat().st_mtime:
            skipped += 1
            continue
        im = Image.open(src).convert("RGBA")
        im = Image.alpha_composite(Image.new("RGBA", im.size, "#11131f"), im).convert("RGB")   # page background behind transparent art
        side = min(im.size)                                   # centre-crop to a square
        left, top = (im.width - side) // 2, (im.height - side) // 2
        im = im.crop((left, top, left + side, top + side)).resize((SIZE, SIZE), Image.Resampling.LANCZOS)
        im.save(dest, "WEBP", quality=82, method=6)
        made += 1
        print(f"  {dest.relative_to(ROOT)}  ({dest.stat().st_size // 1024} KB)")
    print(f"{made} thumbnail(s) written, {skipped} already current.")


if __name__ == "__main__":
    main()
