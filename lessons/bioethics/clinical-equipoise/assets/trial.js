/* =====================================================================
   <phil-trial> — "Run the Trial" (lesson-local simulation)

   One interface in four escalating modes. Each mode exists to let a
   student reach a wrong conclusion and then have it taken away, which is
   the one thing a simulation can do that prose cannot.

     mode="one"      one patient, treated, recovers. Proves nothing.
     mode="many"     a dozen treated, most recover. Still proves nothing,
                     because the illness has a recovery rate of its own.
     mode="compare"  the same pool assigned two ways. Assigning by need is
                     what a caring doctor would do, and it breaks the
                     comparison. Randomizing is what fixes it.
     mode="trial"    the real thing: interim looks with enrollment growing,
                     and at each look the question of whether to keep
                     randomizing.

   NO P-VALUES. The evidence readout is a frequency — "luck alone would
   produce a gap this big about 1 time in 40" — which is what a p-value
   actually means, stated in a way that cannot be misread as "the chance
   the drug does not work". The number is computed from the simulated
   counts with Fisher's exact test, so it moves honestly when the data do.

   The bands matter more than the number. Above 1-in-10 the evidence is
   weak, below 1-in-100 it is strong, and BETWEEN THEM the statistics stop
   settling it. That middle band is where clinical equipoise does its
   work, and the widget is built to make it uncomfortable.

   Ungraded exploration (not a quiz widget).

   Authoring:
     <phil-trial mode="many" n="12"
                 action="Treat all twelve"
                 action2="What would have happened with no drug at all?"
                 verdict="..." verdict2="..."></phil-trial>

   Do NOT name an attribute `reveal`. The engine builds its step-by-step
   reveal from `[reveal] > *`, so an attribute of that name on a widget
   turns every child of the widget into a hidden step, and the whole thing
   stays invisible until the presenter clicks to the end of the slide.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

/* ---------- the world ---------- */
const P_PLACEBO = 0.30;      // this illness eases on its own about a third of the time
const P_DRUG    = 0.60;      // ...and roughly twice as often when HJ-9 works

/* ---------- statistics ----------
   Fisher's exact rather than a normal approximation: the first interim
   look has ten patients per arm, where the approximation is poor and a
   student watching the number could reasonably catch it out. */
function lgamma(x) {
  const g = [76.18009172947146, -86.50532032941677, 24.01409824083091,
             -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let y = x, tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) ser += g[j] / ++y;
  return -tmp + Math.log(2.5066282746310005 * ser / x);
}
const lchoose = (n, k) => (k < 0 || k > n) ? -Infinity
  : lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1);

/* One-sided: how often would luck alone give the drug arm this many
   recoveries or more, if the drug did nothing at all? */
function fisherOneSided(drugWell, drugN, ctrlWell, ctrlN) {
  const total = drugN + ctrlN, wellTotal = drugWell + ctrlWell;
  const denom = lchoose(total, wellTotal);
  let p = 0;
  const hi = Math.min(drugN, wellTotal);
  for (let k = drugWell; k <= hi; k++) {
    const t = lchoose(drugN, k) + lchoose(ctrlN, wellTotal - k) - denom;
    if (isFinite(t)) p += Math.exp(t);
  }
  return Math.min(1, Math.max(p, 1e-12));
}

/* "about 1 time in N" — the phrase students actually read. */
const oneInN = p => {
  const n = 1 / p;
  if (n >= 5000) return { n: 5000, text: 'far less than 1 time in 5,000', band: 'strong' };
  const r = n >= 100 ? Math.round(n / 10) * 10 : Math.round(n);
  return {
    n: r,
    text: `about 1 time in ${r.toLocaleString()}`,
    band: p > 0.10 ? 'weak' : p < 0.01 ? 'strong' : 'middle',
  };
};

const draw = (n, p) => { let k = 0; for (let i = 0; i < n; i++) if (Math.random() < p) k++; return k; };

/* ---------- one patient ---------- */
/* State is carried by shape as well as color: a check, a flat dash, or a
   jagged line. Color alone would leave the grid meaningless to a good
   number of students in any given room. */
function patient(state) {
  const body = state === 'well' ? '#46e07a' : state === 'ill' ? '#ffcf5a' : '#9aa3c7';
  const mark = state === 'well'
    ? '<path d="M7 5 L9 7 L13 3" stroke="#46e07a" stroke-width="2" fill="none"/>'
    : state === 'ill'
      ? '<path d="M6 6 L9 3 L12 6" stroke="#ffcf5a" stroke-width="2" fill="none"/>'
      : '<path d="M6 5 L13 5" stroke="#9aa3c7" stroke-width="2" fill="none"/>';
  return `<svg viewBox="0 0 20 28" shape-rendering="crispEdges" focusable="false">
    ${mark}
    <rect x="7" y="9" width="6" height="6" fill="${body}"/>
    <rect x="5" y="15" width="10" height="8" fill="${body}"/>
    <rect x="5" y="23" width="3" height="4" fill="${body}"/>
    <rect x="12" y="23" width="3" height="4" fill="${body}"/>
  </svg>`;
}

const STYLE = `
.tr { display:block; margin:12px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); }
.tr-row { display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin:0 0 10px; }
.tr-btn { font-family:var(--pixel); font-size:11px; line-height:1.4; padding:9px 11px; cursor:pointer;
          background:var(--accent-3); color:#0d1020; border:3px solid var(--ink); box-shadow:0 3px 0 var(--shadow); }
.tr-btn.ghost { background:var(--panel); color:var(--ink); border-color:var(--border); }
.tr-btn:disabled { opacity:.35; cursor:default; box-shadow:none; }

.tr-arms { display:grid; gap:10px; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); margin:0 0 10px; }
.tr-arm { background:var(--panel); border:3px solid var(--border); padding:8px 10px; }
.tr-arm.drug { border-color:var(--accent-3); }
.tr-armlbl { font-family:var(--pixel); font-size:11px; margin:0 0 6px; color:var(--accent-3); }
.tr-arm.ctrl .tr-armlbl { color:var(--muted); }
.tr-grid { display:flex; flex-wrap:wrap; gap:2px; }
.tr-grid svg { width:20px; height:28px; }
.tr-count { font-size:15px; margin:6px 0 0; color:var(--ink); }

.tr-ev { border:3px solid var(--border); padding:9px 11px; margin:0 0 10px; background:var(--panel); }
.tr-ev b { font-family:var(--pixel); font-size:11px; display:block; margin-bottom:4px; }
.tr-ev.weak   { border-color:var(--muted); }
.tr-ev.weak b { color:var(--muted); }
.tr-ev.middle { border-color:#ffcf5a; background:#2a2612; }
.tr-ev.middle b { color:#ffcf5a; }
.tr-ev.strong { border-color:var(--good); background:#133a24; }
.tr-ev.strong b { color:var(--good); }

.tr-note { margin:0 0 10px; color:var(--accent-3); }
.tr-verdict { font-family:var(--pixel); font-size:11px; line-height:1.5; padding:10px; border:3px solid var(--border);
              background:var(--panel); color:var(--muted); }
.tr-verdict.good { background:#133a24; color:var(--good); }
.tr-verdict.bad  { background:#3a1620; color:#ff8fa3; }
.tr-verdict .plain { display:block; margin-top:8px; padding-top:8px; border-top:3px solid var(--border);
                     font-family:var(--body); font-size:15px; color:var(--ink); }
/* When the plain text is all there is — the question asked at each interim
   look — the divider has nothing to divide. */
.tr-verdict .plain:first-child { margin-top:0; padding-top:0; border-top:none; }
`;

class PhilTrial extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    if (!document.getElementById('tr-style')) {
      const s = el('style'); s.id = 'tr-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.mode = (this.getAttribute('mode') || 'one').toLowerCase();
    this.n = parseInt(this.getAttribute('n') || '12', 10);
    this.txt = a => this.getAttribute(a) || '';
    this.classList.add('tr', 'phil-dense');
    this.innerHTML = '';
    this.runs = 0;
    ({ one: 'buildOne', many: 'buildMany', compare: 'buildCompare', trial: 'buildTrial' }[this.mode]
      ? this[{ one: 'buildOne', many: 'buildMany', compare: 'buildCompare', trial: 'buildTrial' }[this.mode]]()
      : this.buildOne());
  }

  /* Shared furniture -------------------------------------------------- */
  arm(title, cls) {
    const box = el('div', 'tr-arm ' + cls);
    box.append(el('p', 'tr-armlbl', title));
    const grid = el('div', 'tr-grid');
    // The grid is decoration. Every fact it shows is in the count line
    // below it, which is what a screen reader and the back row both get.
    grid.setAttribute('aria-hidden', 'true');
    const count = el('p', 'tr-count');
    box.append(grid, count);
    return { box, grid, count };
  }
  fill(a, well, n, label) {
    a.grid.innerHTML = Array.from({ length: n }, (_, i) => patient(i < well ? 'well' : 'same')).join('');
    a.count.innerHTML = `<strong>${well} of ${n}</strong> ${label}`;
  }
  verdictBox() {
    const v = el('div', 'tr-verdict');
    v.setAttribute('role', 'status');
    return v;
  }

  /* mode="one" -------------------------------------------------------- */
  buildOne() {
    const row = el('div', 'tr-row');
    const btn = el('button', 'tr-btn', this.txt('action') || 'Treat the patient');
    btn.type = 'button';
    const grid = el('div', 'tr-grid');
    grid.setAttribute('aria-hidden', 'true');
    grid.innerHTML = patient('ill');
    row.append(grid, btn);
    const v = this.verdictBox();
    v.textContent = 'One patient, currently unwell.';
    this.append(row, v);

    let seen = 0, better = 0;
    btn.onclick = () => {
      // The first patient recovers, because the slide asks whether that
      // proves anything and the answer has to be about the reasoning rather
      // than about a coin landing badly. Every patient after is a real draw,
      // and watching them differ is the argument.
      const well = seen === 0 ? true : Math.random() < P_DRUG;
      seen++; if (well) better++;
      grid.innerHTML = patient(well ? 'well' : 'same');
      btn.textContent = this.txt('action-again') || 'Try another patient';
      v.className = 'tr-verdict ' + (well ? 'good' : 'bad');
      const head = well ? 'She recovered.' : 'This one did not.';
      const tally = seen > 1
        ? ` ${better} of ${seen} patients so far.`
        : '';
      v.innerHTML = head + tally
        + `<span class="plain">${seen > 1 ? (this.txt('verdict2') || this.txt('verdict')) : this.txt('verdict')}</span>`;
    };
  }

  /* mode="many" ------------------------------------------------------- */
  buildMany() {
    const row = el('div', 'tr-row');
    const treat = el('button', 'tr-btn', this.txt('action') || `Treat all ${this.n}`);
    const reveal = el('button', 'tr-btn ghost', this.txt('action2') || 'What if none of them had been treated?');
    treat.type = reveal.type = 'button';
    reveal.disabled = true;
    row.append(treat, reveal);

    const arms = el('div', 'tr-arms');
    const treated = this.arm('Everyone got HJ-9', 'drug');
    const shadow = this.arm('If none had been treated', 'ctrl');
    shadow.box.style.display = 'none';
    arms.append(treated.box, shadow.box);

    const v = this.verdictBox();
    v.textContent = `${this.n} patients, all unwell.`;
    treated.grid.innerHTML = Array.from({ length: this.n }, () => patient('ill')).join('');
    this.append(row, arms, v);

    let runs = 0;
    const shown = () => shadow.box.style.display !== 'none';
    const drawBoth = () => {
      runs++;
      const w = draw(this.n, P_DRUG);
      this.fill(treated, w, this.n, 'got better');
      let head = `${w} of ${this.n} got better.`;
      if (shown()) {
        const c = draw(this.n, P_PLACEBO);
        this.fill(shadow, c, this.n, 'would have gotten better anyway');
        head = `${w} of ${this.n} treated got better. ${c} of ${this.n} would have anyway.`;
      }
      treat.textContent = this.txt('action-again') || `Run another ${this.n}`;
      v.className = 'tr-verdict ' + (shown() ? 'bad' : 'good');
      // Once they have run it a few times the point makes itself: the
      // numbers move, and no single run was ever going to settle anything.
      const wobble = runs >= 3
        ? '<br><br>Notice how much the numbers move between runs. Nothing about the drug changed.'
        : '';
      v.innerHTML = head + `<span class="plain">`
        + (shown() ? (this.txt('verdict2') || this.txt('verdict')) : this.txt('verdict'))
        + wobble + `</span>`;
    };
    treat.onclick = () => { reveal.disabled = false; drawBoth(); };
    reveal.onclick = () => { shadow.box.style.display = ''; drawBoth(); };
  }

  /* mode="compare" ---------------------------------------------------- */
  /* The widget does the bad assignment itself. Asking a student to sort
     the patients only teaches anything if they happen to sort them the
     interesting way, and most will not. */
  buildCompare() {
    const row = el('div', 'tr-row');
    const byNeed = el('button', 'tr-btn ghost', this.txt('action') || 'Assign the way a caring doctor would');
    const byLot = el('button', 'tr-btn', this.txt('action2') || 'Assign at random');
    byNeed.type = byLot.type = 'button';
    row.append(byNeed, byLot);

    const arms = el('div', 'tr-arms');
    const d = this.arm('HJ-9 arm', 'drug');
    const c = this.arm('Placebo arm', 'ctrl');
    arms.append(d.box, c.box);
    const v = this.verdictBox();
    v.textContent = 'Twenty-four patients, some much sicker than others.';
    this.append(row, arms, v);

    const half = this.n / 2;
    const show = (dw, cw, cls, head, plain) => {
      this.fill(d, dw, half, 'got better');
      this.fill(c, cw, half, 'got better');
      v.className = 'tr-verdict ' + cls;
      v.innerHTML = `${head}<span class="plain">${plain}</span>`;
    };
    // Both stay live. Toggling between them is how the contrast lands, and
    // re-running either shows that the pattern holds rather than being one
    // unlucky draw.
    byNeed.onclick = () => {
      // The sickest go on the drug, so the drug arm starts far behind. The
      // drug genuinely works and the trial still says it does not.
      show(draw(half, P_DRUG * 0.55), draw(half, P_PLACEBO * 1.6), 'bad',
        'HJ-9 looks no better, and may look worse.', this.txt('verdict'));
    };
    byLot.onclick = () => {
      show(draw(half, P_DRUG), draw(half, P_PLACEBO), 'good',
        'Now the two arms are comparable.', this.txt('verdict2'));
    };
  }

  /* mode="trial" ------------------------------------------------------ */
  buildTrial() {
    /* Enrollment grows between looks, which is the whole ethical point:
       stopping a trial does not help anyone already randomized, it spares
       the people who would have been randomized next.

       Outcomes are drawn once for the full final cohort, and each look
       reads the first n of them. That makes the counts accumulate the way
       a real interim analysis does, since a patient who recovered at week
       2 is still recovered at week 10. Resampling the whole trial at every
       look would let the evidence wander backwards, which does not happen
       and would teach the wrong thing. */
    this.looks = [{ w: 2, n: 10 }, { w: 4, n: 20 }, { w: 6, n: 35 },
                  { w: 8, n: 55 }, { w: 10, n: 80 }];
    this.maxN = this.looks[this.looks.length - 1].n;

    const row = el('div', 'tr-row');
    this._next = el('button', 'tr-btn', 'Open the trial');
    this._keep = el('button', 'tr-btn ghost', 'Keep randomizing');
    this._stop = el('button', 'tr-btn ghost', 'Stop the trial');
    this._again = el('button', 'tr-btn ghost', 'Run a new trial');
    [this._next, this._keep, this._stop, this._again].forEach(b => b.type = 'button');
    this._keep.style.display = this._stop.style.display = this._again.style.display = 'none';
    row.append(this._next, this._keep, this._stop, this._again);

    const arms = el('div', 'tr-arms');
    this._d = this.arm('HJ-9 arm', 'drug');
    this._c = this.arm('Placebo arm', 'ctrl');
    arms.append(this._d.box, this._c.box);

    this._ev = el('div', 'tr-ev weak');
    this._ev.style.display = 'none';
    this._v = this.verdictBox();
    this._v.textContent = 'The trial has not opened yet.';
    this.append(row, arms, this._ev, this._v);

    this._next.onclick = () => this.advance();
    this._keep.onclick = () => this.advance();
    this._stop.onclick = () => this.stop();
    this._again.onclick = () => this.reset();

    this.deal(true);
  }

  /* Is this draw the one a class should see first? Three conditions, and
     all of them are about the story rather than about the statistics.

     The first look stays weak, because modes one and many have just spent
     three slides establishing that ten patients tell you nothing and the
     trial should not immediately contradict them. The judgment call has to
     land in the middle of the trial, not at the last look where refusing
     to stop costs nobody anything. And the evidence must not run backwards,
     which is honest but reads as a bug from the back of a room. */
  teachable() {
    const r = this.results;
    const band = x => (x.p > 0.10 ? 0 : x.p < 0.01 ? 2 : 1);
    const bands = r.map(band);
    // Weak at the first look, at least one judgment call in the middle of
    // the run, and the bands never going backwards, which is honest but
    // reads as a bug from the back of a room.
    if (bands[0] !== 0) return false;
    if (!bands.slice(1, -1).includes(1)) return false;
    for (let i = 1; i < bands.length; i++) if (bands[i] < bands[i - 1]) return false;
    // The evidence has to become clear BEFORE the final look. If it only
    // arrives at the end, then running the trial out costs nobody anything
    // and the closing question has no bite.
    const crossed = r.findIndex(x => x.p < 0.01);
    return crossed === 2 || crossed === 3;
  }

  /* Run one uses a drug that works, so the shape of the thing lands
     reliably in a room. Every run after is a fresh draw, including whether
     HJ-9 works at all, which is the uncertainty the lesson is about. */
  deal(first) {
    this.works = first ? true : Math.random() < 0.5;
    const pDrug = this.works ? P_DRUG : P_PLACEBO;
    const flips = p => Array.from({ length: this.maxN }, () => (Math.random() < p ? 1 : 0));
    const sum = (arr, n) => arr.slice(0, n).reduce((a, b) => a + b, 0);
    const score = () => this.looks.map(l => {
      const dw = sum(this.poolD, l.n), cw = sum(this.poolC, l.n);
      return { dw, cw, n: l.n, p: fisherOneSided(dw, l.n, cw, l.n) };
    });

    /* Run one has to pass through the middle band, because the middle band
       is the lesson. Left to chance the evidence can jump straight from
       "could be luck" to "hardly ever", and a class that never sees the
       uncomfortable zone never meets the question. So run one redraws until
       the shape is right. Later runs take whatever they get. */
    let tries = 0;
    do {
      this.poolD = flips(pDrug);
      this.poolC = flips(P_PLACEBO);
      this.results = score();
      tries++;
    } while (first && tries < 600 && !this.teachable());

    this.at = -1;
    // Where the evidence first passes 1 in 100, read off the data the
    // student is actually shown rather than off expected values.
    this.crossed = this.results.findIndex(r => r.p < 0.01);
  }

  reset() {
    this.deal(false);
    this._d.grid.innerHTML = this._c.grid.innerHTML = '';
    this._d.count.textContent = this._c.count.textContent = '';
    this._ev.style.display = 'none';
    this._again.style.display = 'none';
    this._next.style.display = '';
    this._next.textContent = 'Open the trial';
    this._v.className = 'tr-verdict';
    this._v.textContent = 'A new trial, and a new drug. Nobody knows yet whether this one works.';
  }

  advance() {
    this.at++;
    const look = this.looks[this.at], r = this.results[this.at];
    this.fill(this._d, r.dw, look.n, 'got better');
    this.fill(this._c, r.cw, look.n, 'got better');

    const ev = oneInN(r.p);
    this._ev.style.display = '';
    this._ev.className = 'tr-ev ' + ev.band;
    const band = ev.band === 'weak'
      ? 'This could easily be luck.'
      : ev.band === 'middle'
        ? 'Too strong to wave away, too weak to settle it. This is where the judgment lives.'
        : 'Luck is a poor explanation now.';
    this._ev.innerHTML = '<b>Week ' + look.w + ' · ' + look.n + ' in each arm</b>'
      + 'If HJ-9 did nothing at all, luck alone would produce a gap this big '
      + ev.text + '. ' + band;

    this._next.style.display = 'none';
    if (this.at === this.looks.length - 1) { this.finish(); return; }
    this._keep.style.display = this._stop.style.display = '';
    this._v.className = 'tr-verdict';
    this._v.innerHTML = '<span class="plain">'
      + (this.txt('ask') || 'Does continuing to randomize patients still respect clinical equipoise?')
      + '</span>';
  }

  /* Both answers cost something, and the widget has to show both bills. */
  stop() {
    this._keep.style.display = this._stop.style.display = 'none';
    this._again.style.display = '';
    const spared = this.maxN - this.looks[this.at].n;
    const early = this.crossed < 0 || this.at < this.crossed;
    if (this.works) {
      this._v.className = 'tr-verdict good';
      this._v.innerHTML = 'You stopped at week ' + this.looks[this.at].w + '. HJ-9 really does work.'
        + '<span class="plain">' + spared + ' patients who would have been randomized to placebo got the drug instead. '
        + (early
            ? 'You called it before the evidence was strong, and this time you were right. On the next trial the same call may not be.'
            : 'The evidence had already passed 1 in 100, so this was the defensible moment to act.')
        + '</span>';
    } else {
      this._v.className = 'tr-verdict bad';
      this._v.innerHTML = 'You stopped at week ' + this.looks[this.at].w + '. HJ-9 does nothing at all.'
        + '<span class="plain">The gap you were watching was luck. Every future patient now gets a drug that does not work, '
        + 'and because the trial stopped, nobody will ever find that out.</span>';
    }
  }

  finish() {
    this._keep.style.display = this._stop.style.display = 'none';
    this._again.style.display = '';
    if (this.works && this.crossed >= 0 && this.crossed < this.looks.length - 1) {
      const late = this.maxN - this.looks[this.crossed].n;
      this._v.className = 'tr-verdict bad';
      this._v.innerHTML = 'The trial ran to the end. HJ-9 really does work.'
        + '<span class="plain">The evidence passed 1 in 100 back at week ' + this.looks[this.crossed].w + '. '
        + 'About ' + late + ' more patients were randomized to placebo after that, and every one of them '
        + 'could have had the drug instead. That is what waiting for certainty costs, and somebody pays it.</span>';
    } else if (this.works && this.crossed >= 0) {
      this._v.className = 'tr-verdict good';
      this._v.innerHTML = 'The trial ran to the end. HJ-9 really does work.'
        + '<span class="plain">The evidence only became clear at the very last look, so almost nobody was '
        + 'denied the drug once it was. This is the lucky version, and you do not get to choose it.</span>';
    } else if (this.works) {
      this._v.className = 'tr-verdict';
      this._v.innerHTML = 'The trial ran to the end. HJ-9 really does work, and the trial never proved it.'
        + '<span class="plain">Eighty patients per arm was not enough to separate this drug from luck. '
        + 'Nobody did anything wrong, and the answer is still unknown. Most trials end here, and it is '
        + 'the outcome nobody writes papers about.</span>';
    } else {
      this._v.className = 'tr-verdict good';
      this._v.innerHTML = 'The trial ran to the end. HJ-9 does nothing at all.'
        + '<span class="plain">Running it out was the right call. Had you stopped on that early gap you would '
        + 'have adopted a useless drug, and never learned otherwise.</span>';
    }
  }
}

customElements.define('phil-trial', PhilTrial);
