/* =====================================================================
   Lesson-local visualization for "Robot Movie Night".
   Ungraded exploration (not a quiz widget).

   <phil-wrong-grid prompt="…">
     "Two Ways to Be Wrong." The student picks how the Rialto treats
     Marquee, its ticket kiosk (as a tool, as a person, or with cheap
     precautions), and then picks which world it turns out to be (Marquee
     feels nothing, or Marquee can feel). The widget names the result in
     words: no mistake, over-attribution, or under-attribution, with one
     or two sentences on what it cost. A small table keeps track of which
     of the six combinations have been seen.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const STYLE = `
.wg { display:block; margin:12px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); }
.wg-prompt { margin:0 0 8px; }
.wg-cols { display:grid; grid-template-columns:repeat(auto-fit, minmax(400px, 1fr)); gap:10px 18px; }
.wg-h { font-family:var(--pixel); font-size:10px; line-height:1.5; margin:0 0 6px; color:#4cc2ff; }
.wg-opts { display:flex; flex-wrap:wrap; gap:6px; }
.wg-btn { font:inherit; font-size:16px; padding:6px 10px; background:var(--bg); color:var(--ink);
          border:2px solid var(--border); cursor:pointer; }
.wg-btn::before { content:"○ "; }
.wg-btn[aria-pressed="true"] { background:#133a24; border-color:#46e07a; color:#46e07a; font-weight:bold; }
.wg-btn[aria-pressed="true"]::before { content:"● "; }
.wg-out { margin-top:12px; background:var(--panel); border:3px solid var(--border); padding:10px 12px; min-height:5em; }
.wg-word { margin:0 0 4px; }
.wg-word strong { font-family:var(--pixel); font-size:13px; line-height:1.6; color:#ffcf5a; }
.wg-why { margin:0; }
.wg-table { margin:10px 0 0; border-collapse:collapse; width:100%; }
.wg-table th, .wg-table td { border:2px solid var(--border); padding:4px 8px; text-align:left; font-size:16px; }
.wg-table th { color:var(--muted); font-weight:normal; }
.wg-table td.is-now { outline:2px solid #ffcf5a; outline-offset:-4px; }
.wg-toy { margin:8px 0 0; color:var(--muted); }
`;

const addStyle = () => {
  if (document.getElementById('wg-style')) return;
  const s = el('style'); s.id = 'wg-style'; s.textContent = STYLE; document.head.append(s);
};

const POLICY = [
  { id: 'tool',   label: 'As a tool',        long: 'Treat Marquee as a tool' },
  { id: 'person', label: 'As a being that counts', long: 'Treat Marquee as a being that counts' },
  { id: 'care',   label: 'Cheap precautions', long: 'Take cheap precautions' },
];
const WORLD = [
  { id: 'no',  label: 'Marquee feels nothing' },
  { id: 'yes', label: 'Marquee can feel' },
];

const CELLS = {
  'tool-no':    ['No mistake', 'Nothing was owed to Marquee, and nothing was spent on it.'],
  'tool-yes':   ['Under-attribution', 'A being that can suffer was used, copied, and switched off like a kettle. If there are millions of copies, the wrong is very large.'],
  'person-no':  ['Over-attribution', 'Care, money, and legal protection went to a thing that needed none. They came out of what people and animals could have had, and a seller can use your sympathy to keep you paying.'],
  'person-yes': ['No mistake', 'A being that counts was treated as one.'],
  'care-no':    ['A small over-attribution', 'A few cheap safeguards were wasted on a thing that needed none.'],
  'care-yes':   ['A small under-attribution', 'Marquee got less than it was owed, but the cheap safeguards prevented the worst of it.'],
};

class PhilWrongGrid extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.classList.add('wg', 'phil-dense');
    this.policy = null; this.world = null; this.seen = new Set();
    this.innerHTML = '';
    this.append(el('p', 'wg-prompt', this.getAttribute('prompt') || 'Pick a policy, then pick a world.'));

    const cols = el('div', 'wg-cols');
    const group = (id, title, opts, key) => {
      const box = el('div');
      const h = el('h2', 'wg-h', title); h.id = id;
      const row = el('div', 'wg-opts');
      row.setAttribute('role', 'group'); row.setAttribute('aria-labelledby', id);
      const btns = opts.map(o => {
        const b = el('button', 'wg-btn'); b.type = 'button'; b.textContent = o.long || o.label;
        b.onclick = () => { this[key] = o.id; this.render(); };
        row.append(b);
        return { o, b };
      });
      box.append(h, row); cols.append(box);
      return btns;
    };
    this._policy = group('wg-policy', 'What the Rialto does', POLICY, 'policy');
    this._world = group('wg-world', 'What turns out to be true', WORLD, 'world');
    this.append(cols);

    const out = el('div', 'wg-out');
    out.setAttribute('aria-live', 'polite');
    this._word = el('p', 'wg-word');
    this._why = el('p', 'wg-why');
    out.append(this._word, this._why);
    this.append(out);

    const table = el('table', 'wg-table');
    table.append(el('caption', null, ''));
    table.querySelector('caption').textContent = 'Combinations you have seen';
    const head = el('tr');
    const corner = el('th', null, 'The Rialto treats Marquee'); corner.scope = 'col';
    head.append(corner, ...WORLD.map(w => { const th = el('th', null, w.label); th.scope = 'col'; return th; }));
    table.append(head);
    this._cells = {};
    POLICY.forEach(p => {
      const tr = el('tr');
      const th = el('th', null, p.label); th.scope = 'row';
      tr.append(th);
      WORLD.forEach(w => { const td = el('td', null, 'Not seen yet'); this._cells[`${p.id}-${w.id}`] = td; tr.append(td); });
      table.append(tr);
    });
    this.append(table);
    this.append(el('p', 'wg-toy', 'An invented example that takes feeling as the test of whether Marquee counts. It shows the shape of the choice, not the odds.'));
    this.render();
  }

  render() {
    this._policy.forEach(({ o, b }) => b.setAttribute('aria-pressed', String(o.id === this.policy)));
    this._world.forEach(({ o, b }) => b.setAttribute('aria-pressed', String(o.id === this.world)));
    Object.values(this._cells).forEach(td => td.classList.remove('is-now'));
    if (!this.policy || !this.world) {
      this._word.innerHTML = '<strong>Your move.</strong>';
      this._why.textContent = this.policy ? 'Now pick what turns out to be true.' : 'Pick what the Rialto does, and then what turns out to be true.';
      return;
    }
    const key = `${this.policy}-${this.world}`;
    const [word, why] = CELLS[key];
    this.seen.add(key);
    this._word.innerHTML = `<strong>${word}.</strong>`;
    this._why.textContent = why + (this.seen.size === 6 ? ' You have now seen all six.' : '');
    this.seen.forEach(k => { this._cells[k].textContent = CELLS[k][0]; });
    this._cells[key].classList.add('is-now');
  }
}

customElements.define('phil-wrong-grid', PhilWrongGrid);
