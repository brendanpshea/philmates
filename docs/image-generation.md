# Generating lesson art with Cloudflare Workers AI

Lesson scenes (the PNGs in each `lessons/<topic>/<slug>/assets/`) can be generated
from the prompts recorded in that lesson's `prompts.md`, using Cloudflare's
Workers AI image models via [`tools/cf-image.mjs`](../tools/cf-image.mjs).

Everything below was verified against the live API in July 2026. Where something
is *untested*, it says so.

## Setup

Create `.env.local` at the repo root. **It is gitignored — never commit it.**

```bash
CLOUDFLARE_ACCOUNT_ID=...        # from the dashboard URL: dash.cloudflare.com/<account-id>/ai/...
CLOUDFLARE_API_TOKEN=...         # needs Workers AI permissions
```

No spaces around the `=`. `FOO =bar` is a parse error when the file is sourced
from a POSIX shell (`. ./.env.local`), though the Node script tolerates it.

Confirm the file is ignored before pasting a real key into it:

```bash
git check-ignore -v .env.local
```

Verify a token without spending anything:

```bash
curl -s https://api.cloudflare.com/client/v4/user/tokens/verify \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

A token's *name* in the dashboard means nothing here — only its permissions. A
token created for Workers will run AI inference fine if it carries Workers AI
permissions. If a key is ever pasted into a chat, an issue, or a log, rotate it.

## Usage

```bash
# one image
node tools/cf-image.mjs --prompt "..." --out lessons/<topic>/<slug>/assets/foo.png

# a whole lesson, from a batch file of [{ "out": "...", "prompt": "..." }, ...]
node tools/cf-image.mjs --batch temp/my-lesson.json
```

Both use **flux-2-dev** by default — you only pass `--model` to override it.

Flags: `--model`, `--aspect`, `--steps`, `--seed`, `--attempts` (default 3).

The batch form is the one to use for a lesson — convert the lesson's
`prompts.md` sections into `{ out, prompt }` objects and regenerate the whole
set in one command. Keep `prompts.md` as the source of truth so art is
reproducible.

## Which model

| Model | Free? | Dimensions | Notes |
|---|---|---|---|
| `@cf/black-forest-labs/flux-2-dev` **(default)** | yes | 1024² only | **Best quality by a wide margin.** Painterly; drifts from strict 16-bit |
| `@cf/black-forest-labs/flux-2-klein-4b` | yes | 1024² only | Closer to literal pixel art, weaker at composition |
| `@cf/black-forest-labs/flux-2-klein-9b` | yes | 1024² only | Between the two |
| `@cf/black-forest-labs/flux-1-schnell` | yes | 1024² only | Good style match, simpler compositions |
| `@cf/bytedance/stable-diffusion-xl-lightning` | yes | **any** (multiples of 64) | Honors `width`/`height`. Mediocre on complex prompts |
| `@cf/lykon/dreamshaper-8-lcm` | yes | **any** | Crunchy dithered look; ignores compositional instructions |
| `@cf/stabilityai/stable-diffusion-xl-base-1.0` | yes | any | **Returned a solid black frame.** Avoid |
| `pruna/p-image`, `@cf/leonardo/*` | **no** | — | Need a prepaid gateway balance; 402 without one |

**`flux-2-dev` is the default** — use it for final art. Draft on
`flux-2-klein-4b` (6× cheaper, stricter pixel-art look) or `flux-1-schnell`
(10× cheaper, fine for a single object on a plain ground). See the cost table
below: exploring on `flux-2-dev` burns the daily allocation fast.

## Three calling conventions

The docs don't spell this out; the script handles all three.

| Models | Endpoint | Body |
|---|---|---|
| most `@cf/…` | `/ai/run/@cf/<model>` | JSON, the input object directly |
| `@cf/…/flux-2-*` | `/ai/run/@cf/<model>` | **`multipart/form-data`** fields |
| `pruna/…` | `/ai/run` | JSON `{ model, input }` |

flux-2 rejects JSON with `required properties at '/' are 'multipart'`. Send the
prompt as a form field instead.

To discover any model's schema:

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/models/schema?model=@cf/black-forest-labs/flux-2-dev" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Cost and the daily cap

Free allocation is **10,000 neurons/day**, shared across all models (flux-2
included — it is *not* separately billed, despite being tagged a partner model).
Neurons cost **$0.011 per 1,000** beyond the free tier. Billing is per **512×512
tile**, so a 1024² image is 4 tiles. Limits reset at 00:00 UTC; exceeding one
returns HTTP 429:

> `you have used up your daily free allocation of 10,000 neurons`

Cost per 1024² image, worked from the published per-tile rates:

| Model | Neurons | Free images/day | $ each |
|---|---|---|---|
| `flux-1-schnell` | ~58 | ~170 | $0.0006 |
| `flux-2-klein-4b` | 104 | ~96 | $0.0011 |
| `flux-2-dev` | 600 | ~16 | $0.0066 |
| `flux-2-klein-9b` | 1364 | ~7 | $0.0150 |
| `leonardo/lucid-origin` | 2544+ | ~3 | $0.028 |

`flux-2-dev` is billed **per tile per step** (37.5 × 4 tiles × 4 steps = 600), so
steps are a direct multiplier on it. `flux-2-klein-4b` is flat per tile with no
step term, which makes it both cheaper and more predictable. `klein-9b` is priced
per megapixel and is poor value.

**So: draft cheap, finalize expensive.** A 10-panel lesson costs ~6,000 neurons
on `flux-2-dev` — 60% of a day's allocation, with no room for re-rolls. Iterate
prompts on `flux-1-schnell` or `klein-4b` (where the same lesson costs ~1,000
neurons), then re-run the keepers through `flux-2-dev`.

Because billing is per tile, a 512×512 render costs exactly a quarter of a 1024².
The catch: only the SD-family models accept explicit dimensions, and **those
models are absent from the published pricing table**, so their rate is unknown.
Generating at 1024 and downscaling locally saves nothing — you are billed for
what the model renders, not what you keep.

## Gotchas

- **Everything is square unless the model takes `width`/`height`.** `aspect_ratio`
  is accepted and silently ignored by flux; `width`/`height` return 400 on
  flux-1 and 500 on flux-2. Crop afterwards.
- **The NSFW classifier misfires.** An innocuous prompt was rejected on one call
  and accepted unchanged on the next. Retry rather than rewriting the prompt —
  the script retries transient failures (NSFW, 5xx, capacity) up to `--attempts`.
- **Generated art may carry baked-in text** — watermarks, labels on instruments,
  stamped words — which violates the house "no text" rule. Inspect every panel
  at full size before shipping. If a bad panel is otherwise good, it's usually
  cheaper to paint the text out with a small PIL script (sample the surrounding
  color, refill the region, redraw any instrument line by hand) than to
  regenerate and lose the composition.
- **Aim the prompt at the house style**: `16-bit SNES-era pixel art, limited
  palette, crisp pixel edges, no anti-aliasing, no text, dark indigo background
  (#1d2235)`. See any lesson's `prompts.md` for working examples.

## Workflow

1. Write the scene prompts into the lesson's `prompts.md`.
2. Build a batch file of `{ out, prompt }` objects from it.
3. `node tools/cf-image.mjs --batch … --model @cf/black-forest-labs/flux-2-dev`
4. Inspect every panel full-size; scrub any baked-in text; crop to the panel
   aspect the slide needs.
5. Reference the PNGs from `index.html`, with accurate `alt` text — describe
   what the art *actually shows*, which is often not what the prompt asked for.
