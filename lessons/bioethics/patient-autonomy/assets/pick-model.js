/* =====================================================================
   <phil-pick> — "Name That Model" (lesson-local visualization)
   Read each doctor's response and pick which of Emanuel's four models it shows.
   All scenarios are shown at once and answered inline (no internal paging, so it
   never competes with the lesson's Next button); scenario order is shuffled so
   the correct model isn't predictable from position. Ungraded practice.

   Authoring:
     <phil-pick prompt="Read each response and name the model.">
       <phil-scenario model="deliberative" why="...">"A doctor's line…"</phil-scenario>
       ...
     </phil-pick>
   model ∈ paternalistic | informative | interpretive | deliberative
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const MODELS = [
  ['paternalistic', 'Paternalistic'],
  ['informative', 'Informative'],
  ['interpretive', 'Interpretive'],
  ['deliberative', 'Deliberative'],
];
const NAME = Object.fromEntries(MODELS);

const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const STYLE = `
.pm { display:block; margin:14px 0; padding:16px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); font-size:16px; line-height:1.45; }
.pm-head { display:flex; align-items:baseline; justify-content:space-between; gap:12px; flex-wrap:wrap; margin:0 0 6px; }
.pm-score { font-family:var(--pixel); font-size:10px; color:var(--muted); white-space:nowrap; }
.pm-item { margin-top:14px; padding-top:14px; border-top:3px solid var(--border); }
.pm-item:first-of-type { margin-top:8px; padding-top:0; border-top:none; }
.pm-quote { font-style:italic; margin:0 0 10px; }
.pm-opts { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }
.pm-opts button { font-family:var(--pixel); font-size:11px; color:var(--ink); text-align:left;
      background:var(--panel); border:3px solid var(--border); box-shadow:0 3px 0 var(--shadow);
      padding:11px 10px; cursor:pointer; }
.pm-opts button:hover:not(:disabled) { background:#2b3252; }
.pm-opts button:active:not(:disabled) { transform:translateY(3px); box-shadow:none; }
.pm-opts button.right { background:#133a24; border-color:var(--good); color:var(--good); }
.pm-opts button.wrong { background:#3a1620; border-color:var(--bad); color:var(--bad); }
.pm-opts button:disabled { cursor:default; }
.pm-fb { margin:10px 0 0; padding:10px 12px; border:3px solid var(--border); font-size:.95em; display:none; }
.pm-fb.show { display:block; }
.pm-fb.right { background:#133a24; color:var(--good); }
.pm-fb.wrong { background:#3a1620; color:var(--bad); }
.pm-fb b { font-family:var(--pixel); font-size:10px; display:block; margin-bottom:5px; }
`;

class PhilPick extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    if (!document.getElementById('pm-style')) {
      const s = el('style'); s.id = 'pm-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.items = shuffle([...this.querySelectorAll('phil-scenario')].map(s => ({
      quote: s.innerHTML.trim(),
      model: (s.getAttribute('model') || '').toLowerCase(),
      why: s.getAttribute('why') || '',
    })));
    this.prompt = this.getAttribute('prompt') || 'Read each response and name the model.';
    this.answered = 0; this.score = 0;
    this.build();
  }

  build() {
    this.classList.add('pm');
    this.innerHTML = '';
    const head = el('div', 'pm-head');
    head.append(el('span', null, `<strong>${this.prompt}</strong>`));
    this._score = el('span', 'pm-score', '');
    head.append(this._score);
    this.append(head);

    this.items.forEach(item => this.append(this._renderItem(item)));
    this._updateScore();
  }

  _renderItem(item) {
    const wrap = el('div', 'pm-item');
    wrap.append(el('p', 'pm-quote', item.quote));
    const opts = el('div', 'pm-opts');
    const fb = el('div', 'pm-fb');
    MODELS.forEach(([key, label]) => {
      const b = el('button', null, label);
      b.onclick = () => this._answer(item, key, b, opts, fb);
      opts.append(b);
    });
    wrap.append(opts, fb);
    return wrap;
  }

  _answer(item, key, btn, opts, fb) {
    if (item._done) return;
    item._done = true;
    this.answered++;
    const correct = key === item.model;
    if (correct) this.score++;
    [...opts.children].forEach(b => {
      b.disabled = true;
      if (b.textContent.toLowerCase() === item.model) b.classList.add('right');
    });
    if (!correct) btn.classList.add('wrong');
    fb.className = 'pm-fb show ' + (correct ? 'right' : 'wrong');
    fb.innerHTML = `<b>${correct ? '✔ Yes' : '✘ Not quite'}</b>${correct ? '' : `It's the <strong>${NAME[item.model]}</strong> model. `}${item.why}`;
    this._updateScore();
  }

  _updateScore() {
    this._score.textContent = `Matched ${this.score} / ${this.items.length}`;
  }
}

customElements.define('phil-pick', PhilPick);
