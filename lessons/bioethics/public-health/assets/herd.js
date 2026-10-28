/* =====================================================================
   <phil-herd prompt="…"> — how much vaccination keeps measles out?

   A school of 400 children. Four can't be vaccinated (cancer treatment, a
   transplant, a severe allergy). A slider sets how many of the rest are.
   One unvaccinated child comes back from a trip with measles, and the
   outbreak plays out round by round. "Run 20 outbreaks" repeats it at once
   and reports the spread.

   The teaching is the threshold. Well below 94%, most outbreaks take off
   and reach the four who could not protect themselves. Near 95%, most die
   out in a round or two. The four are much safer, though the first sick
   child can still pass it to one of them directly: herd immunity stops the
   chain, not the first exposure. At 100% no child can bring it home.

   The model is a toy, and the widget says so on its face. Every sick
   child meets 16 others at random and infects 9 in 10 of the unprotected
   ones, so one case in a wholly unprotected school makes about 14 more
   (measles' R0 is usually put at 12 to 18). The vaccine always works here;
   in life two doses of MMR protect about 97 in 100.

   Teaching widget: ungraded, no completion hook, no persistence — same
   contract as <phil-claim-tester>.

   Headings are h2: the widget sits under the slide's h1.
   Type is sized to project: nothing below 15px except pixel-font labels.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const SIDE = 20;                 // 20 × 20 grid
const N = SIDE * SIDE;
const FRAGILE = [47, 132, 268, 351];   // the four who can't be vaccinated, spread out
const CONTACTS = 16;             // others each sick child meets in a round
const CATCH = 0.9;               // chance an unprotected contact catches it
const ROUND_MS = 650;
const BATCH = 20;

const STYLE = `
.hd { display:block; margin:12px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow);
      font-size:17px; line-height:1.45;
      --hd-vax:#4cc2ff; --hd-open:#9aa3c7; --hd-fragile:#ffcf5a; --hd-sick:#ff5d6c; }
.hd-prompt { margin:0 0 10px; font-size:17px; }
.hd-main { display:grid; grid-template-columns:minmax(0, 290px) minmax(0, 1fr); gap:14px; align-items:start; }
@media (max-width:760px) { .hd-main { grid-template-columns:1fr; } .hd-grid { max-width:290px; } }
.hd-grid { background:#0c1426; border:3px solid var(--border); }
.hd-grid svg { display:block; width:100%; height:auto; }
.hd-label { display:block; font-size:15px; color:var(--muted); margin:0 0 4px; }
.hd-val { color:var(--ink); font-weight:700; }
.hd-slider { width:100%; accent-color:var(--accent-3); height:26px; margin:0 0 4px; }
.hd-counts { margin:0 0 10px; font-size:15px; color:var(--muted); }
.hd-row { display:flex; flex-wrap:wrap; gap:6px; margin:0 0 10px; }
.hd-btn { font-family:var(--pixel); font-size:9px; line-height:1.5; padding:8px 9px;
          background:var(--panel); color:var(--ink); border:3px solid var(--border);
          box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.hd-btn:hover { background:#313a5e; }
.hd-btn:disabled { opacity:.55; cursor:default; }
.hd-out { background:var(--panel); border:3px solid var(--border); padding:8px 10px; min-height:3.2em; }
.hd-out p { margin:0 0 4px; font-size:16px; }
.hd-out p:last-child { margin-bottom:0; }
.hd-key { display:flex; flex-wrap:wrap; gap:4px 12px; margin:10px 0 0; padding:0; list-style:none; }
phil-slide .hd-key li { display:flex; align-items:center; gap:5px; font-size:15px; color:var(--muted); margin:0; padding:0; }
phil-slide .hd-key li::before { content:none; }
.hd-key svg { width:14px; height:14px; flex:none; }
.hd-note { margin:10px 0 0; font-size:15px; line-height:1.5; color:var(--muted); }
`;

/* One cell's shape, drawn in a 10 × 10 box at (x, y). Shape carries the
   state as well as colour: filled square, hollow square, diamond, dot, ring. */
const SHAPES = {
  vax:     (x, y) => `<rect x="${x + 1.5}" y="${y + 1.5}" width="7" height="7" fill="var(--hd-vax)"/>`,
  open:    (x, y) => `<rect x="${x + 2}" y="${y + 2}" width="6" height="6" fill="none" stroke="var(--hd-open)" stroke-width="1.2"/>`,
  fragile: (x, y) => `<path d="M${x + 5} ${y + 0.8}L${x + 9.2} ${y + 5}L${x + 5} ${y + 9.2}L${x + 0.8} ${y + 5}Z" fill="var(--hd-fragile)"/>`,
  sick:    (x, y) => `<circle cx="${x + 5}" cy="${y + 5}" r="4.4" fill="var(--hd-sick)"/>`,
  had:     (x, y) => `<circle cx="${x + 5}" cy="${y + 5}" r="3.6" fill="none" stroke="var(--hd-sick)" stroke-width="1.6"/>`,
};
const KEY = [
  ['vax', 'Vaccinated'],
  ['open', 'Not vaccinated'],
  ['fragile', "Can't be vaccinated"],
  ['sick', 'Sick now'],
  ['had', 'Had measles'],
];
const icon = shape => `<svg viewBox="0 0 10 10" aria-hidden="true">${SHAPES[shape](0, 0)}</svg>`;

const shuffled = n => {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

class PhilHerd extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;
    if (!document.getElementById('hd-style')) {
      const s = el('style'); s.id = 'hd-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.classList.add('hd');
    this.fragile = new Set(FRAGILE);
    this.eligible = [];
    for (let i = 0; i < N; i++) if (!this.fragile.has(i)) this.eligible.push(i);
    // A fixed order, so moving the slider adds or removes the same children
    // each time instead of reshuffling the whole school.
    this.order = shuffled(this.eligible.length).map(k => this.eligible[k]);
    this.coverage = 90;
    this.build();
    this.applyCoverage();
  }

  disconnectedCallback() { this.stop(); }

  build() {
    const prompt = this.getAttribute('prompt');
    this.innerHTML = '';
    if (prompt) this.append(el('p', 'hd-prompt', prompt));

    const main = el('div', 'hd-main');
    this._grid = el('div', 'hd-grid');
    this._grid.setAttribute('role', 'img');
    main.append(this._grid);

    const side = el('div');
    const lab = el('label', 'hd-label');
    lab.setAttribute('for', 'hd-slider');
    lab.innerHTML = 'Vaccinated: <span class="hd-val">90%</span> of the children who can be';
    this._val = lab.querySelector('.hd-val');
    const sl = el('input', 'hd-slider');
    sl.type = 'range'; sl.min = '50'; sl.max = '100'; sl.step = '1'; sl.value = String(this.coverage);
    sl.id = 'hd-slider';
    sl.addEventListener('input', () => { this.coverage = +sl.value; this.applyCoverage(); });
    this._slider = sl;
    this._counts = el('p', 'hd-counts');

    const row = el('div', 'hd-row');
    this._runBtn = el('button', 'hd-btn', '▶ Run one outbreak');
    this._runBtn.type = 'button';
    this._runBtn.addEventListener('click', () => this.runOne());
    this._batchBtn = el('button', 'hd-btn', `Run ${BATCH} outbreaks`);
    this._batchBtn.type = 'button';
    this._batchBtn.addEventListener('click', () => this.runBatch());
    row.append(this._runBtn, this._batchBtn);

    this._out = el('div', 'hd-out');
    this._out.setAttribute('aria-live', 'polite');
    this._out.innerHTML = '<p>One unvaccinated child is about to come back from a trip with measles. Set the slider, then run an outbreak.</p>';

    const key = el('ul', 'hd-key');
    key.setAttribute('aria-label', 'Key');
    KEY.forEach(([shape, text]) => key.append(el('li', null, `${icon(shape)}${text}`)));

    side.append(lab, sl, this._counts, row, this._out, key);
    main.append(side);
    this.append(main);

    this.append(el('p', 'hd-note',
      'A toy model, not a forecast. Each sick child meets 16 others, and 9 in 10 of the unprotected ones catch it. ' +
      'Here the vaccine always works. In real life, two doses of the MMR vaccine protect about 97 in 100 children.'));
  }

  /* ---- state ---- */
  applyCoverage() {
    this.stop();
    const nVax = Math.round(this.eligible.length * this.coverage / 100);
    this.vax = new Set(this.order.slice(0, nVax));
    this.state = new Array(N).fill('well');     // well | sick | had
    this._val.textContent = this.coverage + '%';
    this._counts.textContent = `${nVax} vaccinated · ${this.eligible.length - nVax} not vaccinated · ${FRAGILE.length} can't be`;
    this.draw();
  }

  shape(i) {
    if (this.state[i] === 'sick') return 'sick';
    if (this.state[i] === 'had') return 'had';
    if (this.fragile.has(i)) return 'fragile';
    return this.vax.has(i) ? 'vax' : 'open';
  }

  draw() {
    let cells = '';
    for (let i = 0; i < N; i++) cells += SHAPES[this.shape(i)]((i % SIDE) * 10, Math.floor(i / SIDE) * 10);
    this._grid.innerHTML = `<svg viewBox="0 0 ${SIDE * 10} ${SIDE * 10}" aria-hidden="true">${cells}</svg>`;
    const sick = this.state.filter(s => s !== 'well').length;
    this._grid.setAttribute('aria-label',
      `A school of ${N} children: ${this.vax.size} vaccinated, ${this.eligible.length - this.vax.size} not vaccinated, ` +
      `${FRAGILE.length} who can't be vaccinated.` + (sick ? ` ${sick} have caught measles.` : ''));
  }

  /* ---- the model ---- */
  // Each sick person meets CONTACTS children at random. An unprotected child
  // who is met, and has not had measles, catches it with chance CATCH.
  spread(state, sources) {
    const next = new Set();
    for (let s = 0; s < sources; s++) {
      for (let c = 0; c < CONTACTS; c++) {
        const j = Math.floor(Math.random() * N);
        if (state[j] === 'well' && !this.vax.has(j) && Math.random() < CATCH) next.add(j);
      }
    }
    return next;
  }

  // One whole outbreak, start to finish, without drawing. Returns the
  // rounds as lists of newly sick children. It starts with one unvaccinated
  // child back from a trip, so at 100% there is nobody to start it.
  simulate() {
    const state = new Array(N).fill('well');
    const rounds = [];
    const open = this.eligible.filter(i => !this.vax.has(i));
    if (!open.length) return rounds;
    let sick = new Set([open[Math.floor(Math.random() * open.length)]]);
    while (sick.size && rounds.length < 60) {
      sick.forEach(j => { state[j] = 'sick'; });
      rounds.push([...sick]);
      const next = this.spread(state, sick.size);
      sick.forEach(j => { state[j] = 'had'; });
      sick = next;
    }
    return rounds;
  }

  summary(rounds) {
    const all = rounds.flat();
    const hit = all.filter(j => this.fragile.has(j)).length;
    return { total: all.length, hit, rounds: rounds.length };
  }

  stop() {
    clearTimeout(this._timer);
    this._timer = null;
    if (this._runBtn) { this._runBtn.disabled = false; this._batchBtn.disabled = false; }
  }

  runOne() {
    this.stop();
    this.state.fill('well');
    const rounds = this.simulate();
    const { total, hit } = this.summary(rounds);
    const finish = () => {
      this.stop();
      this.draw();
      this._out.innerHTML = total
        ? `<p>The outbreak is over after ${rounds.length} round${rounds.length === 1 ? '' : 's'}. ` +
          `<strong>${total}</strong> children caught measles, including <strong>${hit} of the ${FRAGILE.length}</strong> who can't be vaccinated.</p>`
        : `<p>Every child who can be vaccinated is, so no child brought measles home from a trip. Nobody caught it.</p>`;
    };
    if (!rounds.length || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rounds.forEach(r => r.forEach(j => { this.state[j] = 'had'; }));
      return finish();
    }
    this._runBtn.disabled = true;
    this._batchBtn.disabled = true;
    let k = 0, sickSoFar = 0;
    const step = () => {
      this.state.forEach((s, j) => { if (s === 'sick') this.state[j] = 'had'; });
      if (k === rounds.length) return finish();
      rounds[k].forEach(j => { this.state[j] = 'sick'; });
      sickSoFar += rounds[k].length;
      k++;
      this.draw();
      this._out.innerHTML = `<p>Round ${k}: ${sickSoFar} children have caught measles so far.</p>`;
      this._timer = setTimeout(step, ROUND_MS);
    };
    step();
  }

  runBatch() {
    this.stop();
    if (this.vax.size === this.eligible.length) return this.runOne();
    const runs = Array.from({ length: BATCH }, () => this.summary(this.simulate()));
    const totals = runs.map(r => r.total);
    const mean = Math.round(totals.reduce((a, b) => a + b, 0) / BATCH);
    const reached = runs.filter(r => r.hit > 0).length;
    const big = runs.filter(r => r.total >= 20).length;
    // The batch reports numbers, not one outbreak, so the grid goes back to well.
    this.state.fill('well');
    this.draw();
    this._out.innerHTML =
      `<p><strong>${BATCH} outbreaks at ${this.coverage}%.</strong> On average, ${mean} children caught measles ` +
      `(fewest ${Math.min(...totals)}, most ${Math.max(...totals)}). ${big} of the ${BATCH} reached 20 or more children.</p>` +
      `<p>A child who can't be vaccinated caught it in <strong>${reached} of the ${BATCH}</strong>.</p>`;
  }
}

customElements.define('phil-herd', PhilHerd);
