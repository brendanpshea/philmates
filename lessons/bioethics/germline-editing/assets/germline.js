/* =====================================================================
   Lesson-local visualizations for "The Villa Diodati Clinic".
   All three are ungraded explorations (not quiz widgets).

   <phil-ripple prompt="…" [mistake]>
     A four-generation family tree (1, 2, 4, 8 people). The student picks a
     somatic or a germline edit for the person at the top and watches how far
     it travels. With `mistake`, the edit carries an off-target error.

   <phil-line prompt="…" left="…" right="…">
     <script type="application/json">{ "items": ["…", "…"] }</script>
   </phil-line>
     One slider per edit, all sharing the same two ends, plus a "your line"
     slider that draws a rule down the whole stack.

   <phil-verdict prompt="…">
     <script type="application/json">
     { "items":   [ { "id": "fix", "label": "…" } ],
       "reasons": [ { "id": "safety", "label": "…" } ] }
     </script>
   </phil-verdict>
     Allow / Not yet / Never for each item, the arguments that mattered, and
     a short reflection on how the two fit together. The reflection rules use
     the item ids `fix`, `risk`, `adv` and the reason ids `suffering`,
     `parents`, `safety`, `consent`, `fairness`.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const readJSON = (host, fallback) => {
  const json = host.querySelector('script[type="application/json"]');
  try { return JSON.parse(json ? json.textContent : ''); }
  catch { return fallback; }
};

const list = (arr) => arr.length < 2 ? arr.join('')
  : arr.length === 2 ? arr.join(' and ')
  : `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`;

const STYLE = `
.gl { display:block; margin:12px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); }
.gl-prompt { margin:0 0 10px; }
.gl-row { display:flex; flex-wrap:wrap; align-items:center; gap:8px; }
.gl-btn { font:inherit; font-size:16px; padding:6px 12px; background:var(--bg); color:var(--ink);
          border:2px solid var(--border); cursor:pointer; }
.gl-btn[aria-pressed="true"] { background:#133a24; border-color:var(--good); color:var(--good); font-weight:bold; }
.gl-btn[aria-pressed="true"]::before { content:"✔ "; }
.gl-out { background:var(--panel); border:3px solid var(--border); padding:8px 10px; margin:10px 0 0; min-height:3.2em; }
.gl-out p { margin:0 0 4px; }
.gl-out p:last-child { margin-bottom:0; }
.gl-h { font-family:var(--pixel); font-size:10px; line-height:1.5; margin:0 0 6px; color:var(--accent-3); }

/* ---- ripple ---- */
.rp-tree { display:grid; grid-template-columns:auto 1fr; gap:0 10px; margin:10px 0 0; }
.rp-labels, .rp-field { display:grid; grid-template-rows:repeat(4, 52px); }
.rp-labels span { align-self:center; font-size:15px; color:var(--muted); }
.rp-field { position:relative; background:var(--panel); border:3px solid var(--border); }
.rp-field svg { position:absolute; inset:0; width:100%; height:100%; }
.rp-field line { stroke:#3a4260; stroke-width:2; vector-effect:non-scaling-stroke; }
.rp-gen { position:relative; display:flex; justify-content:space-around; align-items:center; }
.rp-node { width:32px; height:32px; border-radius:50%; box-sizing:border-box; display:grid; place-items:center;
           background:var(--bg); border:3px solid #6b7499; color:var(--ink); font-weight:bold; font-size:17px; line-height:1; }
.rp-node.is-edit { background:#133a24; border-color:var(--good); color:var(--good); }
.rp-node.is-may  { background:var(--bg); border:3px dashed var(--good); color:var(--good); }
.rp-node.is-bad  { background:#3a1330; border-color:#ff6ad5; color:#ff6ad5; }
.rp-node.is-maybad { background:var(--bg); border:3px dashed #ff6ad5; color:#ff6ad5; }
.rp-key { margin:8px 0 0; color:var(--muted); }
@media (max-width:650px) {
  .rp-tree { grid-template-columns:1fr; }
  .rp-labels { display:none; }
  .rp-node { width:24px; height:24px; font-size:13px; border-width:2px; }
}

/* ---- line ---- */
.ln-rows { position:relative; isolation:isolate; --c1:38%; --g:12px; --t:22px; }
.ln-item { display:grid; grid-template-columns:var(--c1) 1fr; column-gap:var(--g); align-items:center; padding:3px 0; }
.ln-item label { margin:0; }
.ln-ends { display:grid; grid-template-columns:var(--c1) 1fr; column-gap:var(--g); margin:0 0 2px; }
.ln-ends div { grid-column:2; display:flex; justify-content:space-between;
               font-family:var(--pixel); font-size:10px; line-height:1.5; color:var(--accent-3); }
.ln-item input[type=range] { width:100%; margin:0; height:var(--t); background:transparent;
                             -webkit-appearance:none; appearance:none; cursor:pointer; }
.ln-item input[type=range]::-webkit-slider-runnable-track { height:8px; background:var(--bg); border:2px solid var(--border); }
.ln-item input[type=range]::-moz-range-track { height:6px; background:var(--bg); border:2px solid var(--border); }
.ln-item input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:var(--t); height:var(--t); margin-top:-9px;
                             background:var(--accent-3); border:3px solid var(--border); border-radius:0; }
.ln-item input[type=range]::-moz-range-thumb { width:16px; height:16px; background:var(--accent-3);
                             border:3px solid var(--border); border-radius:0; }
.ln-item.is-line { margin-top:6px; padding-top:8px; border-top:3px solid var(--border); }
.ln-item.is-line label { color:#ffcf5a; font-weight:bold; }
.ln-item.is-line input[type=range]::-webkit-slider-thumb { background:#ffcf5a; }
.ln-item.is-line input[type=range]::-moz-range-thumb { background:#ffcf5a; }
.ln-rule { position:absolute; top:0; bottom:0; width:0; border-left:3px dashed #ffcf5a; pointer-events:none; z-index:-1;
           left:calc(var(--c1) + var(--g) + var(--t) / 2 + (100% - var(--c1) - var(--g) - var(--t)) * var(--p, .5) - 1.5px); }
@media (max-width:650px) {
  .ln-rows { --c1:0px; --g:0px; }
  .ln-item { grid-template-columns:1fr; }
  .ln-ends { grid-template-columns:1fr; }
  .ln-ends div { grid-column:1; }
}

/* ---- verdict ---- */
.vd-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:8px; }
.vd-item { background:var(--panel); border:3px solid var(--border); padding:8px 10px; }
.vd-item .gl-h { color:var(--accent); }
.vd-reasons { margin:10px 0 0; }
.vd-reasons .gl-h { margin-bottom:8px; }
`;

const addStyle = () => {
  if (document.getElementById('gl-style')) return;
  const s = el('style'); s.id = 'gl-style'; s.textContent = STYLE; document.head.append(s);
};

const toggleBtn = (label, onclick) => {
  const b = el('button', 'gl-btn'); b.type = 'button'; b.textContent = label;
  b.setAttribute('aria-pressed', 'false');
  b.onclick = onclick;
  return b;
};

/* ------------------------------------------------------------------ */

const GENERATIONS = ['The patient', 'Children', 'Grandchildren', 'Great-grandchildren'];

class PhilRipple extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.mistake = this.hasAttribute('mistake');
    this.kind = null;
    this.classList.add('gl', 'phil-dense');
    const prompt = this.getAttribute('prompt') || 'Choose a kind of edit.';
    this.innerHTML = '';
    this.append(el('p', 'gl-prompt', prompt));

    const row = el('div', 'gl-row');
    this._som = toggleBtn('Somatic edit (body cells)', () => this.pick('somatic'));
    this._ger = toggleBtn('Germline edit (embryo)', () => this.pick('germline'));
    row.append(this._som, this._ger);
    this.append(row);

    const tree = el('div', 'rp-tree');
    const labels = el('div', 'rp-labels');
    GENERATIONS.forEach(g => labels.append(el('span', null, g)));
    const field = el('div', 'rp-field');
    field.setAttribute('role', 'img');
    this._field = field;

    let lines = '';
    for (let g = 0; g < 3; g++) {
      const n = 2 ** g;
      for (let i = 0; i < n; i++) {
        const x = (i + 0.5) / n * 100, y = g * 25 + 12.5;
        for (const c of [2 * i, 2 * i + 1]) {
          lines += `<line x1="${x}" y1="${y}" x2="${(c + 0.5) / (2 * n) * 100}" y2="${y + 25}"/>`;
        }
      }
    }
    field.innerHTML = `<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${lines}</svg>`;
    this._nodes = GENERATIONS.map((_, g) => {
      const gen = el('div', 'rp-gen');
      const nodes = Array.from({ length: 2 ** g }, () => {
        const n = el('span', 'rp-node'); n.setAttribute('aria-hidden', 'true'); gen.append(n); return n;
      });
      field.append(gen);
      return nodes;
    });
    tree.append(labels, field);
    this.append(tree);

    this._out = el('div', 'gl-out');
    this._out.setAttribute('aria-live', 'polite');
    this.append(this._out);
    this.append(el('p', 'rp-key', this.mistake
      ? '<strong>!</strong> has the mistake &nbsp;·&nbsp; <strong>?</strong> may inherit it &nbsp;·&nbsp; empty circle: untouched'
      : '<strong>✚</strong> has the edit &nbsp;·&nbsp; <strong>?</strong> may inherit it &nbsp;·&nbsp; empty circle: untouched'));
    this.render();
  }

  pick(kind) {
    this.kind = kind;
    clearTimeout(this._timer);
    this.render();
  }

  render() {
    this._som.setAttribute('aria-pressed', String(this.kind === 'somatic'));
    this._ger.setAttribute('aria-pressed', String(this.kind === 'germline'));
    const hit = this.mistake ? 'is-bad' : 'is-edit';
    const may = this.mistake ? 'is-maybad' : 'is-may';
    const mark = this.mistake ? '!' : '✚';
    this._nodes.flat().forEach(n => { n.className = 'rp-node'; n.textContent = ''; });

    const paint = (g) => {
      this._nodes[g].forEach(n => {
        n.classList.add(g === 0 ? hit : may);
        n.textContent = g === 0 ? mark : '?';
      });
    };

    let html, label;
    if (!this.kind) {
      html = '<p>Nobody has been edited yet. Pick a kind of edit above.</p>';
      label = 'Family tree of fifteen people over four generations. Nobody has been edited.';
    } else if (this.kind === 'somatic') {
      paint(0);
      html = this.mistake
        ? '<p><strong>1 of 15 people.</strong> A mistake in body cells can harm this patient, and it stops there.</p><p>The patient heard the risks and agreed to them. No one else carries the mistake.</p>'
        : '<p><strong>1 of 15 people.</strong> The edit is in this person\'s body cells. It is not in their eggs or sperm, so it ends with them.</p>';
      label = `Family tree of fifteen people. Only the patient at the top has the ${this.mistake ? 'mistake' : 'edit'}.`;
    } else {
      const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const step = (g) => {
        paint(g);
        if (g < 3) { if (still) step(g + 1); else this._timer = setTimeout(() => step(g + 1), 420); }
      };
      step(0);
      html = this.mistake
        ? '<p><strong>Up to 15 of 15 people.</strong> A mistake in an embryo is copied into every cell, including eggs or sperm. Any descendant may inherit it.</p><p>None of them agreed to the risk. Removing the mistake would mean finding and treating each one.</p>'
        : '<p><strong>Up to 15 of 15 people.</strong> The edit is in every cell of the first person, including their eggs or sperm.</p><p>A child gets half of each parent\'s DNA, so any descendant may inherit the edit. None of them were asked.</p>';
      label = `Family tree of fifteen people. The patient at the top has the ${this.mistake ? 'mistake' : 'edit'}, and all fourteen descendants may inherit it.`;
    }
    this._out.innerHTML = html;
    this._field.setAttribute('aria-label', label);
  }
}

/* ------------------------------------------------------------------ */

const WHERE = (v) => v < 20 ? 'clearly treats a disease'
  : v < 40 ? 'leans toward treating a disease'
  : v <= 60 ? 'in the middle'
  : v <= 80 ? 'leans toward adding an advantage'
  : 'clearly adds an advantage';

let lineCount = 0;

class PhilLine extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    const data = readJSON(this, { items: [] });
    const left = this.getAttribute('left') || 'Treats a disease';
    const right = this.getAttribute('right') || 'Adds an advantage';
    const prompt = this.getAttribute('prompt') || 'Place each item.';
    this.classList.add('gl', 'phil-dense');
    this.innerHTML = '';
    this.append(el('p', 'gl-prompt', prompt));

    const rows = el('div', 'ln-rows');
    const ends = el('div', 'ln-ends');
    ends.append(el('div', null, `<span>◀ ${left}</span><span>${right} ▶</span>`));
    rows.append(ends);

    this.touched = new Set();
    const uid = ++lineCount;
    const slider = (label, i, cls) => {
      const row = el('div', 'ln-item' + (cls ? ' ' + cls : ''));
      const id = `ln-${uid}-${i}`;
      const lab = el('label', null, label); lab.htmlFor = id;
      const r = el('input'); r.type = 'range'; r.min = 0; r.max = 100; r.step = 5; r.value = 50; r.id = id;
      row.append(lab, r);
      rows.append(row);
      return r;
    };
    this._items = data.items.map((label, i) => {
      const r = slider(label, i);
      r.oninput = () => { this.touched.add(i); this.render(); };
      return { label, r };
    });
    this._line = slider('Your line: allow everything left of here', 'line', 'is-line');
    this._line.oninput = () => { this.lineSet = true; this.render(); };
    this._rule = el('div', 'ln-rule');
    rows.append(this._rule);
    this.append(rows);

    this._out = el('div', 'gl-out');
    this._out.setAttribute('aria-live', 'polite');
    this.append(this._out);
    this.render();
  }

  render() {
    const line = Number(this._line.value);
    this._rule.style.setProperty('--p', line / 100);
    this._line.setAttribute('aria-valuetext', `${line} of 100, ${WHERE(line)}`);
    this._items.forEach(({ r }) => r.setAttribute('aria-valuetext', WHERE(Number(r.value))));

    if (this.touched.size < this._items.length || !this.lineSet) {
      const left = this._items.length - this.touched.size;
      this._out.innerHTML = left
        ? `<p>Move every slider, even a little. ${left} of ${this._items.length} still to place.</p>`
        : '<p>Now move the yellow slider to set your line.</p>';
      return;
    }
    const short = (s) => s.charAt(0).toLowerCase() + s.slice(1);
    const allow = this._items.filter(x => Number(x.r.value) <= line).map(x => short(x.label));
    const refuse = this._items.filter(x => Number(x.r.value) > line).map(x => short(x.label));
    const mid = this._items.filter(x => { const v = Number(x.r.value); return v >= 35 && v <= 65; }).map(x => short(x.label));
    let html = `<p><strong>You would allow:</strong> ${allow.length ? list(allow) : 'nothing'}.</p>`
      + `<p><strong>You would not allow:</strong> ${refuse.length ? list(refuse) : 'nothing'}.</p>`;
    html += mid.length
      ? `<p><strong>Near the middle:</strong> ${list(mid)}. Middle cases are where people disagree most.</p>`
      : '<p>You placed nothing near the middle. Compare with a classmate: did they sort every edit the same way?</p>';
    this._out.innerHTML = html;
  }
}

/* ------------------------------------------------------------------ */

const VERDICTS = ['Allow', 'Not yet', 'Never'];

class PhilVerdict extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.data = readJSON(this, { items: [], reasons: [] });
    this.choice = {};
    this.why = new Set();
    this.classList.add('gl', 'phil-dense');
    const prompt = this.getAttribute('prompt') || 'Decide each item.';
    this.innerHTML = '';
    this.append(el('p', 'gl-prompt', prompt));

    const grid = el('div', 'vd-grid');
    this._btns = {};
    this.data.items.forEach((it, i) => {
      const box = el('div', 'vd-item');
      const h = el('h2', 'gl-h', it.label); h.id = `vd-h-${i}`;
      const row = el('div', 'gl-row');
      row.setAttribute('role', 'group'); row.setAttribute('aria-labelledby', h.id);
      this._btns[it.id] = VERDICTS.map(v => {
        const b = toggleBtn(v, () => { this.choice[it.id] = v; this.render(); });
        row.append(b); return b;
      });
      box.append(h, row);
      grid.append(box);
    });
    this.append(grid);

    const why = el('div', 'vd-reasons');
    const wh = el('h2', 'gl-h', 'Which arguments mattered most to you?'); wh.id = 'vd-why';
    const wrow = el('div', 'gl-row');
    wrow.setAttribute('role', 'group'); wrow.setAttribute('aria-labelledby', wh.id);
    this._why = this.data.reasons.map(r => {
      const b = toggleBtn(r.label, () => { this.why.has(r.id) ? this.why.delete(r.id) : this.why.add(r.id); this.render(); });
      wrow.append(b); return { r, b };
    });
    why.append(wh, wrow);
    this.append(why);

    this._out = el('div', 'gl-out');
    this._out.setAttribute('aria-live', 'polite');
    this.append(this._out);
    this.render();
  }

  render() {
    for (const it of this.data.items) {
      this._btns[it.id].forEach((b, j) => b.setAttribute('aria-pressed', String(this.choice[it.id] === VERDICTS[j])));
    }
    this._why.forEach(({ r, b }) => b.setAttribute('aria-pressed', String(this.why.has(r.id))));

    const open = this.data.items.filter(it => !this.choice[it.id]).length;
    if (open || !this.why.size) {
      this._out.innerHTML = open
        ? `<p>Open all three envelopes. ${open} still to decide.</p>`
        : '<p>Now pick at least one argument that mattered to you.</p>';
      return;
    }
    const c = this.choice, w = this.why;
    const notes = [];
    const vals = this.data.items.map(it => c[it.id]);
    if (vals.every(v => v === vals[0])) {
      notes.push(`You gave all three the same answer (${vals[0].toLowerCase()}). So the line between treatment and enhancement made no difference to you. Is that what you meant?`);
    }
    if (c.fix === 'Never' && w.has('suffering')) {
      notes.push('Preventing suffering mattered to you, yet you ruled out fixing the disease. Which objection outweighed it?');
    }
    if (c.adv === 'Allow' && w.has('fairness')) {
      notes.push('You allowed the advantage, and fairness worries you. Who would pay so that every family could have it?');
    }
    if (c.adv === 'Allow' && w.has('consent')) {
      notes.push('You allowed the advantage, and consent worries you. Would the child have picked that trait for themselves?');
    }
    if (c.fix === 'Allow' && c.adv === 'Never') {
      notes.push('You allow treatment and forbid enhancement. Lowering a risk sits between them, so check that you can defend your answer there.');
    }
    if (vals.includes('Not yet')) {
      notes.push('"Not yet" is the answer the safety objection gives. What evidence would be enough for you to say yes?');
    }
    if (vals.includes('Never') && !w.has('consent') && !w.has('fairness')) {
      notes.push('You said "never" somewhere, but safety could one day be solved. Which objection would still stand then?');
    }
    if (!notes.length) notes.push('Your answers and your reasons fit together. Could you explain them to someone who disagrees?');

    const picked = this._why.filter(({ r }) => w.has(r.id)).map(({ r }) => r.label.toLowerCase());
    this._out.innerHTML = `<p><strong>Your reasons:</strong> ${list(picked)}.</p>`
      + notes.slice(0, 2).map(n => `<p>${n}</p>`).join('');
  }
}

customElements.define('phil-ripple', PhilRipple);
customElements.define('phil-line', PhilLine);
customElements.define('phil-verdict', PhilVerdict);
