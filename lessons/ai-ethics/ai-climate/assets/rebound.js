/* =====================================================================
   Lesson-local visualization for "Marley's Chain".
   Ungraded exploration (not a quiz widget).

   <phil-rebound prompt="…">
     "The Engine Room." Two controls. Thrift: how much coal the new engine
     burns per answer, as a share of the old engine. Appetite: how many
     answers the town buys once answers are cheaper. Two bars show total
     coal a day before and after, and one word names the result: full
     saving, rebound, backfire, or no change. The word carries the result;
     the bar colors only decorate it. All numbers are invented.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const STYLE = `
.rb { display:block; margin:12px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); }
.rb-prompt { margin:0 0 8px; }
.rb-cols { display:grid; grid-template-columns:repeat(auto-fit, minmax(400px, 1fr)); gap:10px 18px; }
.rb-h { font-family:var(--pixel); font-size:10px; line-height:1.5; margin:0 0 6px; color:#4cc2ff; }
.rb-opts { display:flex; flex-wrap:wrap; gap:6px; }
.rb-btn { font:inherit; font-size:16px; padding:6px 10px; background:var(--bg); color:var(--ink);
          border:2px solid var(--border); cursor:pointer; }
.rb-btn::before { content:"○ "; }
.rb-btn[aria-pressed="true"] { background:#133a24; border-color:#46e07a; color:#46e07a; font-weight:bold; }
.rb-btn[aria-pressed="true"]::before { content:"● "; }
.rb-out { margin-top:12px; background:var(--panel); border:3px solid var(--border); padding:10px 12px; }
.rb-row { display:grid; grid-template-columns:minmax(150px, 22%) 1fr; gap:10px; align-items:center; margin:0 0 6px; }
.rb-row p { margin:0; }
.rb-track { height:26px; background:var(--bg); border:2px solid var(--border); }
.rb-bar { height:100%; transition:width .25s; }
.rb-bar.is-old { background:#ffcf5a; }
.rb-bar.is-new { background:#4cc2ff; }
.rb-sum { margin:0 0 4px; color:var(--muted); }
.rb-word { margin:8px 0 0; }
.rb-word strong { font-family:var(--pixel); font-size:13px; line-height:1.6; color:#ffcf5a; }
.rb-toy { margin:8px 0 0; color:var(--muted); }
@media (prefers-reduced-motion: reduce) { .rb-bar { transition:none; } }
`;

const addStyle = () => {
  if (document.getElementById('rb-style')) return;
  const s = el('style'); s.id = 'rb-style'; s.textContent = STYLE; document.head.append(s);
};

/* The old engine: 100 answers a day at 4 scoops of coal each. */
const OLD_ANSWERS = 100, OLD_SCOOPS = 4, OLD_TOTAL = OLD_ANSWERS * OLD_SCOOPS;

const THRIFT = [
  { v: 1,    label: 'The same (4 scoops)' },
  { v: 0.75, label: 'Three-quarters (3 scoops)' },
  { v: 0.5,  label: 'Half (2 scoops)' },
  { v: 0.25, label: 'A quarter (1 scoop)' },
];
const APPETITE = [
  { v: 1,   label: 'The same (100)' },
  { v: 1.5, label: 'Half again (150)' },
  { v: 2,   label: 'Double (200)' },
  { v: 4,   label: 'Four times (400)' },
];

const verdict = (thrift, appetite) => {
  const total = OLD_TOTAL * thrift * appetite;
  const promised = OLD_TOTAL * thrift;            // total if the town bought no more answers
  const saved = OLD_TOTAL - total, hoped = OLD_TOTAL - promised;
  if (thrift === 1 && appetite === 1) return ['No change', 'The new engine is no thriftier, and the town buys no more answers.'];
  if (thrift === 1) return ['More coal', 'The new engine is no thriftier, so there was no saving to lose. The town just buys more answers.'];
  if (appetite === 1) return ['Full saving', `The town buys no more answers, so the whole saving of ${hoped} scoops arrives.`];
  if (total < OLD_TOTAL) return ['Rebound', `The thriftier engine promised to save ${hoped} scoops. Extra answers took back ${hoped - saved} of them, so only ${saved} are saved.`];
  if (total === OLD_TOTAL) return ['No change', `The thriftier engine promised to save ${hoped} scoops. Extra answers took back every one.`];
  return ['Backfire', `The thriftier engine promised to save ${hoped} scoops. Extra answers took back more than that, so the town burns ${total - OLD_TOTAL} more scoops than before.`];
};

class PhilRebound extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.classList.add('rb', 'phil-dense');
    this.thrift = 0.5; this.appetite = 1;
    const prompt = this.getAttribute('prompt') || 'Set the two controls and watch the coal.';
    this.innerHTML = '';
    this.append(el('p', 'rb-prompt', prompt));

    const cols = el('div', 'rb-cols');
    const group = (id, title, opts, key) => {
      const box = el('div');
      const h = el('h2', 'rb-h', title); h.id = id;
      const row = el('div', 'rb-opts');
      row.setAttribute('role', 'group'); row.setAttribute('aria-labelledby', id);
      const btns = opts.map(o => {
        const b = el('button', 'rb-btn'); b.type = 'button'; b.textContent = o.label;
        b.onclick = () => { this[key] = o.v; this.render(); };
        row.append(b);
        return { o, b };
      });
      box.append(h, row);
      cols.append(box);
      return btns;
    };
    this._thrift = group('rb-thrift', 'Thrift: coal per answer in the new engine', THRIFT, 'thrift');
    this._appetite = group('rb-appetite', 'Appetite: answers the town buys each day', APPETITE, 'appetite');
    this.append(cols);

    const out = el('div', 'rb-out');
    out.setAttribute('aria-live', 'polite');
    this._oldSum = el('p', 'rb-sum');
    this._newSum = el('p', 'rb-sum');
    const bar = (label, cls) => {
      const row = el('div', 'rb-row');
      const text = el('p', null, label);
      const track = el('div', 'rb-track'); track.setAttribute('aria-hidden', 'true');
      const fill = el('div', 'rb-bar ' + cls);
      track.append(fill); row.append(text, track);
      return { row, text, fill };
    };
    this._old = bar('', 'is-old');
    this._new = bar('', 'is-new');
    this._word = el('p', 'rb-word');
    out.append(this._oldSum, this._newSum, this._old.row, this._new.row, this._word);
    this.append(out);
    this.append(el('p', 'rb-toy', 'Invented numbers. A toy, not a forecast.'));
    this.render();
  }

  render() {
    this._thrift.forEach(({ o, b }) => b.setAttribute('aria-pressed', String(o.v === this.thrift)));
    this._appetite.forEach(({ o, b }) => b.setAttribute('aria-pressed', String(o.v === this.appetite)));
    const answers = OLD_ANSWERS * this.appetite, scoops = OLD_SCOOPS * this.thrift;
    const total = answers * scoops, max = Math.max(OLD_TOTAL, total);
    this._oldSum.innerHTML = `<strong>Old engine:</strong> ${OLD_ANSWERS} answers × ${OLD_SCOOPS} scoops = ${OLD_TOTAL} scoops of coal a day`;
    this._newSum.innerHTML = `<strong>New engine:</strong> ${answers} answers × ${scoops} ${scoops === 1 ? 'scoop' : 'scoops'} = ${total} scoops of coal a day`;
    this._old.text.textContent = `Before: ${OLD_TOTAL} scoops`;
    this._new.text.textContent = `After: ${total} scoops`;
    this._old.fill.style.width = (100 * OLD_TOTAL / max) + '%';
    this._new.fill.style.width = (100 * total / max) + '%';
    const [word, why] = verdict(this.thrift, this.appetite);
    this._word.innerHTML = `<strong>${word}.</strong> ${why}`;
  }
}

customElements.define('phil-rebound', PhilRebound);
