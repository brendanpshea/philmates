/* =====================================================================
   <phil-knobs> — "The Knob Board" (lesson-local visualization)
   Dennett's knob-turning, made literal. The student sets each detail of a
   thought experiment, the board finds the closest named case, and shows
   what its author says about it and the strongest objection. After each
   turn it asks whether the student's own verdict moved, and keeps a
   running list of the knobs that mattered to them.

   Ungraded exploration (not a quiz widget). Data is an inline JSON block,
   so any thought-experiment lesson can reuse it:

     <phil-knobs prompt="...">
       <script type="application/json">
       { "knobs": [ { "id": "k", "label": "…", "options": ["…", "…"] } ],
         "cases": [ { "name": "…", "set": { "k": 0 }, "says": "…", "objection": "…" } ] }
       </script>
     </phil-knobs>

   `set` gives an option index per knob. The closest case is the one that
   differs on the fewest knobs; ties go to the case listed first.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const STYLE = `
.kb { display:block; margin:12px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); }
.kb-prompt { margin:0 0 10px; }
.kb-knobs { display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:8px; margin:0 0 10px; }
.kb-knob { background:var(--panel); border:3px solid var(--border); padding:7px 9px; }
.kb-knob h2 { font-family:var(--pixel); font-size:10px; line-height:1.5; margin:0 0 6px; color:var(--accent-3); }
.kb-opts { display:flex; flex-wrap:wrap; gap:5px; }
.kb-opt { font:inherit; font-size:15px; padding:4px 8px; background:var(--bg); color:var(--ink);
          border:2px solid var(--border); cursor:pointer; }
.kb-opt[aria-pressed="true"] { background:#133a24; border-color:var(--good); color:var(--good); font-weight:bold; }
.kb-opt[aria-pressed="true"]::before { content:"⚙ "; }
.kb-out { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin:0 0 8px; }
@media (max-width:650px) { .kb-out { grid-template-columns:1fr; } }
.kb-box { background:var(--panel); border:3px solid var(--border); padding:8px 10px; }
.kb-box h2 { font-family:var(--pixel); font-size:10px; line-height:1.5; margin:0 0 6px; color:var(--accent); }
.kb-box.obj h2 { color:var(--accent-2); }
.kb-case { margin:0 0 4px; }
.kb-case strong { color:var(--ink); }
.kb-near { color:var(--muted); margin:0 0 4px; }
.kb-ask { display:flex; flex-wrap:wrap; align-items:center; gap:8px; padding:8px 10px;
          background:var(--panel); border:3px solid var(--border); }
.kb-ask p { margin:0; }
.kb-btn { font-family:var(--pixel); font-size:10px; padding:8px 10px; background:var(--panel-2); color:var(--ink);
          border:3px solid var(--border); box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.kb-tally { margin:8px 0 0; color:var(--accent-3); }
`;

class PhilKnobs extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    if (!document.getElementById('kb-style')) {
      const s = el('style'); s.id = 'kb-style'; s.textContent = STYLE; document.head.append(s);
    }
    const json = this.querySelector('script[type="application/json"]');
    try { this.data = JSON.parse(json ? json.textContent : '{}'); }
    catch { this.data = { knobs: [], cases: [] }; }
    this.prompt = this.getAttribute('prompt') || 'Turn one knob at a time.';
    const first = this.data.cases[0];
    this.state = {};
    for (const k of this.data.knobs) this.state[k.id] = first ? (first.set[k.id] ?? 0) : 0;
    this.moved = new Set();
    this.pending = null;          // the knob whose effect we are asking about
    this.build();
    this.render();
  }

  build() {
    this.classList.add('kb', 'phil-dense');
    this.innerHTML = '';
    this.append(el('p', 'kb-prompt', this.prompt));

    const grid = el('div', 'kb-knobs');
    this._btns = {};
    this.data.knobs.forEach((k, i) => {
      const box = el('div', 'kb-knob');
      const hid = `kb-h-${i}`;
      const h = el('h2', null, k.label); h.id = hid;
      const opts = el('div', 'kb-opts');
      opts.setAttribute('role', 'group');
      opts.setAttribute('aria-labelledby', hid);
      this._btns[k.id] = k.options.map((label, j) => {
        const b = el('button', 'kb-opt'); b.type = 'button'; b.textContent = label;
        b.onclick = () => this.turn(k, j);
        opts.append(b);
        return b;
      });
      box.append(h, opts);
      grid.append(box);
    });
    this.append(grid);

    const out = el('div', 'kb-out');
    this._says = el('div', 'kb-box');
    this._obj = el('div', 'kb-box obj');
    out.append(this._says, this._obj);
    out.setAttribute('aria-live', 'polite');
    this.append(out);

    this._ask = el('div', 'kb-ask');
    this.append(this._ask);
    this._tally = el('p', 'kb-tally');
    this.append(this._tally);
  }

  turn(knob, j) {
    if (this.state[knob.id] === j) return;
    this.state[knob.id] = j;
    this.pending = knob;
    this.render();
  }

  nearest() {
    let best = null, bestD = Infinity, diff = [];
    for (const c of this.data.cases) {
      const off = this.data.knobs.filter(k => (c.set[k.id] ?? 0) !== this.state[k.id]);
      if (off.length < bestD) { best = c; bestD = off.length; diff = off; }
    }
    return { c: best, diff };
  }

  render() {
    for (const k of this.data.knobs) {
      this._btns[k.id].forEach((b, j) => b.setAttribute('aria-pressed', String(this.state[k.id] === j)));
    }

    const { c, diff } = this.nearest();
    if (!c) return;
    const near = diff.length === 0
      ? 'An exact match.'
      : `Closest match. Your setting differs on: ${diff.map(k => k.label.toLowerCase()).join(', ')}.`;
    this._says.innerHTML = '';
    this._says.append(el('h2', null, 'What Thomson says'),
      el('p', 'kb-case', `<strong>${c.name}.</strong> ${c.says}`),
      el('p', 'kb-near', near));
    this._obj.innerHTML = '';
    this._obj.append(el('h2', null, 'Strongest objection'), el('p', null, c.objection));

    this._ask.innerHTML = '';
    if (this.pending) {
      const k = this.pending;
      this._ask.append(el('p', null, `You just turned <strong>${k.label.toLowerCase()}</strong>. Did your own verdict change?`));
      const yes = el('button', 'kb-btn', 'Yes, it moved');
      const no = el('button', 'kb-btn', 'No');
      yes.type = no.type = 'button';
      yes.onclick = () => { this.moved.add(k.label); this.pending = null; this.render(); };
      no.onclick = () => { this.pending = null; this.render(); };
      this._ask.append(yes, no);
    } else {
      this._ask.append(el('p', 'kb-near', 'Turn one knob at a time, then say whether your verdict moved.'));
    }

    this._tally.textContent = this.moved.size
      ? `Knobs that have moved your verdict so far: ${[...this.moved].join(' · ')}`
      : 'No knob has moved your verdict yet.';
  }
}

customElements.define('phil-knobs', PhilKnobs);
