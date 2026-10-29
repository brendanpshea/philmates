#!/usr/bin/env python3
"""Generate the narrated player's audio for a lesson.

Two engines:
  edge    edge-tts, the default: free, no API key, needs network.
  gemini  Gemini TTS through the Gemini API. Needs a key (GEMINI_API_KEY, or a
          `goog-api-key:` line in .env.local) and `pip install lameenc` to
          write MP3. Takes a --model, a --voice from Gemini's voice library,
          and an optional --style: one short delivery note, such as "warm,
          unhurried storyteller". Gemini speaks the text verbatim, so the
          style never goes in the script itself.

          Line by line, Tier 1 allows 10 requests a minute and 100 a day per
          model, and each line is one request: about one lesson a day. With
          --batch, every line goes out as one batch job instead: half price,
          no daily cap, back in minutes (Google allows itself up to a day).
          Batch requests take no style, so a batch voice runs without one.

Every spoken line in <lesson>/index.html becomes one MP3 in assets/audio/:
  - the text of each <phil-narration> (a slide's intro, or its when="after" line)
  - the say="..." attribute on each reveal step
A clip is named by an FNV-1a hash of its line, the same name the engine
computes (clipUrl in shared/phil-core.js). So a line edited without re-running
this script plays captions only, never the old audio.

Only lines whose text, spoken form or voice settings changed are rendered
again, and clips no line uses any more are deleted. manifest.json lists every
clip with its slide and text. The engine, model, voice and style are remembered
there, so each lesson keeps its own voice and the flags are only needed to
change it.

Names TTS gets wrong are respelled for the voice only, via
tools/pronunciations.json ({"word": "respelling"}). Captions keep the real
spelling.

Usage:
    pip install edge-tts
    python tools/generate-audio.py lessons/ethical-theory/utilitarianism
    python tools/generate-audio.py <lesson-dir> --voice en-US-GuyNeural
    python tools/generate-audio.py <lesson-dir> --engine gemini --voice en-gb-storyteller-2 \\
        --style "warm, unhurried storyteller"
    python tools/generate-audio.py <lesson-dir> --engine gemini --voice en-us-sami --batch
    python tools/generate-audio.py <lesson-dir> --dry-run     # list the lines and estimate, render nothing
"""
import argparse, asyncio, base64, io, json, os, re, sys, time, urllib.error, urllib.request, wave
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRONOUNCE = Path(__file__).with_name("pronunciations.json")
DEFAULTS = {"edge": {"voice": "en-US-AvaMultilingualNeural"},
            "gemini": {"voice": "Kore", "model": "gemini-3.8-flash-lite-tts"}}
GEMINI = "https://generativelanguage.googleapis.com/v1beta"
# USD per 1M audio output tokens, standard tier, from Google's pricing page on
# 2026-10-29; batch is half. Google says these double on 2027-01-01. Text
# input (about $0.50 per 1M tokens) is too small to matter. Audio runs about
# 25 tokens a second.
GEMINI_PRICE = {"gemini-3.8-flash-lite-tts": 6.00, "gemini-3.8-flash-tts": 9.00}


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


# --- Gemini ------------------------------------------------------------------

class ApiError(Exception):
    def __init__(self, code, detail):
        super().__init__(f"HTTP {code}: {detail}")
        self.code = code


def gemini_key() -> str:
    for name in ("GEMINI_API_KEY", "GOOGLE_API_KEY"):
        if os.environ.get(name):
            return os.environ[name]
    env = ROOT / ".env.local"
    if env.exists():
        for line in env.read_text(encoding="utf-8").splitlines():
            m = re.match(r"\s*(goog-api-key|GEMINI_API_KEY|GOOGLE_API_KEY)\s*[:=]\s*(\S+)", line, re.I)
            if m:
                return m.group(2).strip("'\"")
    sys.exit("No Gemini key. Set GEMINI_API_KEY, or add a goog-api-key line to .env.local.")


def api(method: str, url: str, key: str, body=None):
    req = urllib.request.Request(url, data=json.dumps(body).encode() if body is not None else None,
                                 method=method, headers={"x-goog-api-key": key, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=600) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise ApiError(e.code, e.read().decode("utf-8", "replace")[:300]) from None


def wav_to_mp3(data: bytes) -> bytes:
    with wave.open(io.BytesIO(data)) as w:
        rate, channels, pcm = w.getframerate(), w.getnchannels(), w.readframes(w.getnframes())
    enc = lameenc.Encoder()
    enc.set_bit_rate(48)                       # mono speech; about the size of edge-tts clips
    enc.set_in_sample_rate(rate)
    enc.set_channels(channels)
    enc.set_quality(2)
    return enc.encode(pcm) + enc.flush()


def gemini_mp3(text: str, s: dict, key: str):
    """One line through Gemini TTS. Returns the MP3 bytes and the audio tokens used."""
    content = {"type": "text", "text": text}
    if s.get("style"):
        content["annotations"] = [{"type": "speech_metadata", "style": s["style"]}]
    resp = api("POST", f"{GEMINI}/interactions", key, {
        "model": s["model"], "input": [{"type": "user_input", "content": [content]}],
        "response_format": {"type": "audio"},
        "generation_config": {"speech_config": [{"voice": s["voice"]}]}})
    audio = next(c for step in resp.get("steps", []) for c in step.get("content", []) if c.get("type") == "audio")
    return wav_to_mp3(base64.b64decode(audio["data"])), resp.get("usage", {}).get("total_output_tokens", 0)


def batch_submit(lines: dict, s: dict, key: str) -> str:
    """Send {clip: spoken text} as one batch job; returns the job's name."""
    voice = {"voice_config": {"prebuilt_voice_config": {"voice_name": s["voice"]}}}
    requests = [{"request": {"contents": [{"parts": [{"text": text}]}],
                             "generation_config": {"response_modalities": ["AUDIO"], "speech_config": voice}},
                 "metadata": {"key": name}} for name, text in lines.items()]
    op = api("POST", f"{GEMINI}/models/{s['model']}:batchGenerateContent", key,
             {"batch": {"display_name": "philmates-narration", "input_config": {"requests": {"requests": requests}}}})
    return op["name"]


def batch_collect(job: str, key: str) -> dict:
    """Wait for a batch job, then return {clip: (mp3 bytes, audio tokens)} for every line that worked."""
    t0 = time.time()
    while not api("GET", f"{GEMINI}/{job}?fields=done", key).get("done"):
        time.sleep(30)
        print(f"  batch still running, {(time.time() - t0) / 60:.0f} min ...", flush=True)
    out = api("GET", f"{GEMINI}/{job}?fields=response,error", key)
    if "error" in out:
        raise RuntimeError(f"batch {job} failed: {json.dumps(out['error'])[:300]}")
    results = out.get("response", {}).get("inlinedResponses", {}).get("inlinedResponses")
    if results is None:                        # large jobs may answer with a file instead
        f = out["response"]["responsesFile"]
        req = urllib.request.Request(f"https://generativelanguage.googleapis.com/download/v1beta/{f}:download?alt=media",
                                     headers={"x-goog-api-key": key})
        with urllib.request.urlopen(req, timeout=600) as r:
            results = [json.loads(l) for l in r.read().splitlines() if l.strip()]
    clips = {}
    for r in results:
        name = (r.get("metadata") or {}).get("key") or r.get("key")
        try:
            resp = r["response"]
            data = resp["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]
        except (KeyError, IndexError):
            print(f"  ✘ {name}.mp3: {json.dumps(r.get('error') or r)[:200]}")
            continue
        clips[name] = (wav_to_mp3(base64.b64decode(data)), resp.get("usageMetadata", {}).get("candidatesTokenCount", 0))
    return clips


def retry_after(msg: str):
    """Seconds from a 429's "Please retry in 1h2m3s", or None."""
    m = re.search(r"retry in ((?:[\d.]+[hms])+)", msg)
    if not m:
        return None
    return sum(float(n) * {"h": 3600, "m": 60, "s": 1}[u] for n, u in re.findall(r"([\d.]+)([hms])", m.group(1)))


class Pacer:
    """Spaces out request starts to stay under a requests-per-minute limit."""

    def __init__(self, rpm: float):
        self.gap, self.next, self.lock = 60 / rpm, 0.0, asyncio.Lock()

    async def wait(self):
        async with self.lock:
            now = time.monotonic()
            if self.next > now:
                await asyncio.sleep(self.next - now)
            self.next = max(now, self.next) + self.gap


# --- Rendering ---------------------------------------------------------------

def write_clip(out: Path, mp3: bytes):
    # Written to a .part file and renamed only when complete, so a failed or
    # interrupted write can never leave a broken clip under a real name.
    part = out.with_name(out.name + ".part")
    part.write_bytes(mp3)
    part.replace(out)


async def render(text: str, s: dict, out: Path, key: str = "", pacer: Pacer = None) -> int:
    """Render one clip; returns the audio tokens it used (0 for edge-tts)."""
    part = out.with_name(out.name + ".part")
    for attempt in range(5):
        try:
            if s["engine"] == "gemini":
                await pacer.wait()
                mp3, tokens = await asyncio.to_thread(gemini_mp3, text, s, key)
                write_clip(out, mp3)
                return tokens
            await edge_tts.Communicate(text, s["voice"]).save(str(part))
            part.replace(out)
            return 0
        except Exception as e:                 # the services drop requests, more so under load
            part.unlink(missing_ok=True)
            wait = retry_after(str(e))                # a 429 says how long
            if (attempt == 4 or (isinstance(e, ApiError) and e.code in (400, 401, 403, 404))
                    or (wait or 0) > 300):            # hours: a daily limit, so not today
                raise
            print(f"  ! retrying {out.name}: {str(e)[:120]}")
            await asyncio.sleep(wait + 1 if wait else 2 ** (attempt + 1))


async def main():
    ap = argparse.ArgumentParser(description="Generate narration clips for a lesson.")
    ap.add_argument("lesson")
    ap.add_argument("--engine", choices=sorted(DEFAULTS))
    ap.add_argument("--voice")
    ap.add_argument("--model", help="Gemini TTS model (gemini engine only)")
    ap.add_argument("--style", help='one short delivery note (gemini engine only); "" clears it')
    ap.add_argument("--batch", action="store_true",
                    help="gemini: send every line as one batch job (half price, no daily cap, no style)")
    ap.add_argument("--rpm", type=float, default=10,
                    help="Gemini requests per minute, line by line (default 10, the Tier 1 limit)")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")   # the ✘ mark, on a Windows console

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
    old_s = {"engine": old.get("engine", "edge"), "voice": old.get("voice"),
             "model": old.get("model"), "style": old.get("style")}
    engine = args.engine or old_s["engine"]
    keep = old_s if engine == old_s["engine"] else {}   # a new engine starts from its own defaults
    s = {"engine": engine,
         "voice": args.voice or keep.get("voice") or DEFAULTS[engine]["voice"],
         "model": None, "style": None}
    if engine == "gemini":
        s["model"] = args.model or keep.get("model") or DEFAULTS[engine]["model"]
        s["style"] = args.style if args.style is not None else (keep.get("style") or "")
    if args.batch and engine != "gemini":
        sys.exit("--batch is for --engine gemini.")
    if args.batch and s["style"]:
        sys.exit(f'Batch requests take no style, and this lesson\'s is "{s["style"]}". '
                 'Add --style "" to render the whole lesson without one.')
    words = json.loads(PRONOUNCE.read_text(encoding="utf-8")) if PRONOUNCE.exists() else {}

    want = {}
    for slide, text in lines:
        want.setdefault(clip_name(text), {"slide": slide, "text": text, "spoken": spoken(text, words)})
    n_words = sum(len(v["text"].split()) for v in want.values())
    print(f"{len(want)} lines, {n_words} words. "
          + ", ".join(f"{k}: {v}" for k, v in s.items() if v))

    same = all((s[k] or None) == (old_s[k] or None) for k in s)   # no style and "" are alike
    before = old.get("clips", {}) if same else {}
    done = {k: v for k, v in want.items()
            if (audio / f"{k}.mp3").exists() and before.get(k, {}).get("spoken") == v["spoken"]}
    todo = [k for k in want if k not in done]
    price = GEMINI_PRICE.get(s["model"], 0) / (2 if args.batch else 1)
    if args.dry_run:
        for name, line in want.items():
            print(f"  {'  ' if name in done else '+ '}{name}  {line['slide']:<16} {line['text'][:66]}")
        if engine == "gemini" and todo:
            secs = sum(len(want[k]["text"].split()) for k in todo) / 2.3   # measured: 2.1 to 2.6 words a second
            cost = f", about ${secs * 25 * price / 1e6:.2f}" if price else ""
            print(f"{len(todo)} to render: about {secs / 60:.0f} min of audio, {secs * 25:,.0f} audio tokens{cost}.")
        return

    key = ""
    try:
        if engine == "gemini":
            global lameenc
            import lameenc
            key = gemini_key()
        else:
            global edge_tts
            import edge_tts
    except ImportError as e:
        sys.exit(f"{e.name} not installed.  Run:  pip install {e.name.replace('_', '-')}")

    audio.mkdir(parents=True, exist_ok=True)
    for f in audio.glob("*.part"):              # left by a run that was killed
        f.unlink()
    failed, tokens = [], [0]
    # A batch job in flight is kept in the manifest, so a run that is stopped
    # while waiting picks the same job up again instead of paying twice.
    job = old.get("batch") if args.batch and same else None

    def save():
        clips = {k: done[k] for k in want if k in done}
        settings = {k: v for k, v in s.items() if v and not (k == "engine" and v == "edge")}
        man_path.write_text(json.dumps({**settings, **({"batch": job} if job else {}), "clips": clips},
                                       indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    try:
        if args.batch:
            if job and sorted(job["lines"]) != sorted(todo):
                print(f"  Not collecting batch {job['name']}: the lines have changed since it was sent.")
                job = None
            if todo and not job:
                job = {"name": batch_submit({k: want[k]["spoken"] for k in todo}, s, key), "lines": todo}
                save()
                print(f"Sent {len(todo)} lines as {job['name']}. Waiting; stopping now is safe, "
                      "and running again collects the same job.")
            if job:
                results = await asyncio.to_thread(batch_collect, job["name"], key)
                for name, (mp3, used) in results.items():
                    if name in want:
                        write_clip(audio / f"{name}.mp3", mp3)
                        done[name] = want[name]
                        tokens[0] += used
                failed = [k for k in todo if k not in results]
                job = None
        else:
            gate = asyncio.Semaphore(3)
            pacer = Pacer(args.rpm) if engine == "gemini" else None
            if pacer and todo:
                print(f"{len(todo)} to render at {args.rpm:g} a minute: about {len(todo) / args.rpm:.0f} min.")
            out_of_quota = []

            async def one(name):
                async with gate:
                    line = want[name]
                    if out_of_quota:
                        failed.append(name)
                        return
                    try:
                        used = await render(line["spoken"], s, audio / f"{name}.mp3", key, pacer)
                        tokens[0] += used      # not `+= await`: that reads the total before awaiting
                    except Exception as e:     # one bad line shouldn't stop the rest
                        failed.append(name)
                        if "per day" in str(e):        # ...but a spent daily quota stops them all
                            if not out_of_quota:
                                print(f"  ✘ Daily request limit reached; it resets in about "
                                      f"{(retry_after(str(e)) or 0) / 3600:.0f} h. Finished clips are kept.")
                            out_of_quota.append(name)
                        else:
                            print(f"  ✘ {name}.mp3  {line['slide']}: {e}")
                        return
                    done[name] = line
                    print(f"  + {name}.mp3  {line['slide']}: {line['text'][:60]}")

            await asyncio.gather(*(one(k) for k in todo))
    finally:
        save()                                 # even after a failure, so finished clips are kept

    stale = [f for f in audio.glob("*.mp3") if f.stem not in want]
    for f in stale:
        f.unlink()
    print(f"Done: {len(todo) - len(failed)} rendered, {len(want) - len(todo)} unchanged, {len(stale)} removed.")
    if tokens[0]:
        cost = f", about ${tokens[0] * price / 1e6:.2f} at ${price:.2f} per 1M" if price else ""
        print(f"Gemini audio: {tokens[0]:,} tokens ({tokens[0] / 25 / 60:.1f} min){cost}.")
    if failed:
        sys.exit(f"{len(failed)} line(s) failed. Run again to retry just those.")


if __name__ == "__main__":
    asyncio.run(main())
