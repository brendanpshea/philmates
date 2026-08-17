#!/usr/bin/env node
/* Generate lesson art with Cloudflare Workers AI.

   Credentials live in .env.local at the repo root (gitignored):
     CLOUDFLARE_ACCOUNT_ID=...
     CLOUDFLARE_API_TOKEN=...

   Usage:
     node tools/cf-image.mjs --prompt "..." --out lessons/<topic>/<slug>/assets/foo.png
     node tools/cf-image.mjs --batch prompts.json          # [{ "out": "...", "prompt": "..." }, ...]
     node tools/cf-image.mjs --prompt "..." --out foo.png --model @cf/black-forest-labs/flux-1-schnell

   Three calling conventions, which the docs do not spell out:
     @cf/... (most)   POST /ai/run/@cf/<model>  JSON body = the input object
     @cf/...flux-2-*  POST /ai/run/@cf/<model>  multipart/form-data fields
     pruna/...        POST /ai/run              JSON { model, input }
   Pruna models need a prepaid gateway balance (402 without one). The flux-2
   models run on this account today; flux-1-schnell is free.

   Every model here returns 1024x1024 no matter what you ask for — aspect_ratio
   is accepted and ignored, width/height 400s or 500s. Crop afterwards.        */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
/* flux-2-dev is the best of the free models by a wide margin on scene prompts.
   Use flux-2-klein-4b instead when you want a stricter pixel-art look, or
   flux-1-schnell for the cheapest simple subjects.                            */
const DEFAULT_MODEL = '@cf/black-forest-labs/flux-2-dev';

/* ---- credentials ------------------------------------------------------- */

async function loadEnv() {
  const env = { ...process.env };
  try {
    const raw = await readFile(path.join(ROOT, '.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && !line.trimStart().startsWith('#')) env[m[1]] ??= m[2];
    }
  } catch { /* fall back to real env vars */ }
  const { CLOUDFLARE_ACCOUNT_ID: account, CLOUDFLARE_API_TOKEN: token } = env;
  if (!account || !token) {
    console.error('Missing credentials. Create .env.local at the repo root with:\n' +
                  '  CLOUDFLARE_ACCOUNT_ID=...\n  CLOUDFLARE_API_TOKEN=...');
    process.exit(1);
  }
  return { account, token };
}

/* ---- args -------------------------------------------------------------- */

function parseArgs(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i += 2) {
    if (!argv[i].startsWith('--')) { console.error(`Unexpected argument: ${argv[i]}`); process.exit(1); }
    a[argv[i].slice(2)] = argv[i + 1];
  }
  return a;
}

/* ---- one generation ---------------------------------------------------- */

async function generate({ account, token }, { prompt, model, aspect, steps, seed }) {
  const partner = !model.startsWith('@cf/');
  const multipart = model.includes('flux-2');
  const base = `https://api.cloudflare.com/client/v4/accounts/${account}/ai/run`;

  const input = { prompt };
  if (aspect) input.aspect_ratio = aspect;
  if (steps) input.steps = Number(steps);
  if (seed) input.seed = Number(seed);

  const url = partner ? base : `${base}/${model}`;
  let init;
  if (multipart) {
    const form = new FormData();
    for (const [k, v] of Object.entries(input)) form.append(k, String(v));
    init = { body: form };                       // fetch sets the boundary itself
  } else {
    init = {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partner ? { model, input } : input),
    };
  }

  const res = await fetch(url, {
    method: 'POST',
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init.headers || {}) },
  });

  const ct = res.headers.get('content-type') || '';
  if (ct.startsWith('image/')) return Buffer.from(await res.arrayBuffer());   // some models stream binary

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    const msg = json?.errors?.[0]?.message || `HTTP ${res.status}`;
    if (res.status === 402) {
      throw new Error(`${msg}\n  → ${model} needs a prepaid gateway balance. Add funds in the dashboard ` +
                      `under AI > Billing, use BYOK, or stay on a free model such as ${DEFAULT_MODEL}.`);
    }
    throw new Error(msg);
  }

  const img = json.result?.image ?? json.result?.images?.[0];
  if (!img) throw new Error(`No image in response: ${JSON.stringify(json.result).slice(0, 200)}`);
  return Buffer.from(String(img).replace(/^data:image\/\w+;base64,/, ''), 'base64');
}

/* ---- main -------------------------------------------------------------- */

const args = parseArgs(process.argv.slice(2));
const creds = await loadEnv();

const jobs = args.batch
  ? JSON.parse(await readFile(path.resolve(args.batch), 'utf8'))
  : [{ out: args.out, prompt: args.prompt }];

if (!jobs.length || jobs.some(j => !j.out || !j.prompt)) {
  console.error('Each job needs --prompt and --out (or a --batch file of { out, prompt } objects).');
  process.exit(1);
}

/* The safety classifier and the backend both misfire intermittently — the same
   unmodified prompt is rejected as NSFW on one call and fine on the next — so
   these are worth retrying rather than rewriting the prompt around. */
const TRANSIENT = /NSFW|Internal server error|Capacity|timeout|502|503|529/i;
const ATTEMPTS = Number(args.attempts || 3);

for (const job of jobs) {
  const model = job.model || args.model || DEFAULT_MODEL;
  const out = path.resolve(ROOT, job.out);
  process.stdout.write(`${path.relative(ROOT, out)} … `);

  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const buf = await generate(creds, {
        prompt: job.prompt,
        model,
        aspect: job.aspect || args.aspect,
        steps: job.steps || args.steps,
        seed: job.seed || args.seed,
      });
      await mkdir(path.dirname(out), { recursive: true });
      await writeFile(out, buf);
      console.log(`${(buf.length / 1024).toFixed(0)} KB  (${model})${attempt > 1 ? `  [attempt ${attempt}]` : ''}`);
      break;
    } catch (err) {
      const retryable = TRANSIENT.test(err.message) && attempt < ATTEMPTS;
      if (retryable) { process.stdout.write(`retry ${attempt}… `); continue; }
      console.log('FAILED');
      console.error(`  ${err.message}`);
      process.exitCode = 1;
      break;                                     // fatal: don't burn the remaining attempts
    }
  }
}
