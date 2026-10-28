/* =====================================================================
   <phil-week prompt="…" slots="4"> — plan a week with no jobs to do.

   <phil-week prompt="…" slots="4">
     <script type="application/json">
     { "goods": [ { "id": "mastery", "label": "Mastery" } ],
       "activities": [ { "id": "button", "icon": "🔘", "name": "…", "desc": "…",
                         "goods": { "mastery": 0, "recognition": 2 },
                         "note": "…" } ],
       "hint": "…" }
     </script>
   </phil-week>

   Pick up to `slots` activities. Four meters show how much of each good of
   work the week provides (0 none, 1 a little, 2 some, 3 or more plenty),
   and the side panel shows the note for the latest pick. A good at "some" or better counts as
   covered. The teaching is in what stays thin: in a town where robots do
   every needed job, some goods are easy to find and some are not.

   Teaching widget: ungraded, no completion hook, no persistence — same
   contract as <phil-claim-tester> and <phil-herd>.

   Headings are h2: the widget sits under the slide's h1.
   Type is sized to project: nothing below 15px except pixel-font labels.
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

const LEVELS = ['none', 'a little', 'some', 'plenty'];

const STYLE = `
.wk { display:block; margin:12px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow);
      font-size:17px; line-height:1.45; --wk-on:#46e07a; --wk-dim:#6b7499; }
.wk-prompt { margin:0 0 10px; font-size:17px; }
.wk-main { display:grid; grid-template-columns:minmax(0, 1.35fr) minmax(0, 1fr); gap:12px; align-items:start; }
@media (max-width:760px) { .wk-main { grid-template-columns:1fr; } }
.wk-acts { display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:6px; }
.wk-act { font:inherit; font-size:15px; line-height:1.35; text-align:left; padding:6px 9px;
          background:var(--panel); color:var(--ink); border:3px solid var(--border); cursor:pointer;
          display:flex; gap:8px; align-items:flex-start; }
.wk-act:hover { background:#313a5e; }
.wk-act[aria-pressed="true"] { border-color:var(--wk-on); background:#133a24; }
.wk-act:disabled { opacity:.5; cursor:default; }
.wk-icon { font-size:20px; line-height:1.2; }
.wk-name { display:block; font-weight:700; }
.wk-desc { display:block; color:var(--muted); }
.wk-side { background:var(--panel); border:3px solid var(--border); padding:8px 10px; }
.wk-count { font-family:var(--pixel); font-size:10px; line-height:1.6; color:var(--accent-3); margin:0 0 8px; }
.wk-meter { margin:0 0 7px; }
.wk-meter-label { display:flex; justify-content:space-between; gap:8px; font-size:15px; }
.wk-meter-label b { font-weight:700; }
.wk-bar { display:grid; grid-template-columns:repeat(3, 1fr); gap:3px; margin-top:3px; }
.wk-bar span { height:12px; background:var(--bg); border:2px solid var(--wk-dim); }
.wk-bar span.on { background:var(--wk-on); border-color:var(--border); }
.wk-verdict { margin:8px 0 0; font-size:15px; }
.wk-note { margin:6px 0 0; font-size:15px; color:var(--muted); }
.wk-note b { color:var(--ink); }
.wk-hint { margin:10px 0 0; font-size:15px; line-height:1.5; color:var(--muted); }
`;

class PhilWeek extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;
    if (!document.getElementById('wk-style')) {
      const s = el('style'); s.id = 'wk-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.classList.add('wk');
    const data = readJSON(this, { goods: [], activities: [] });
    this.goods = data.goods || [];
    this.acts = data.activities || [];
    this.hint = data.hint || '';
    this.slots = Math.max(1, parseInt(this.getAttribute('slots') || '4', 10));
    this.picked = new Set();
    this.build();
    this.update();
  }

  build() {
    const prompt = this.getAttribute('prompt');
    this.innerHTML = '';
    if (prompt) this.append(el('p', 'wk-prompt', prompt));

    const main = el('div', 'wk-main');
    const acts = el('div', 'wk-acts');
    acts.setAttribute('role', 'group');
    acts.setAttribute('aria-label', 'Activities for the week');
    this._btns = this.acts.map(a => {
      const b = el('button', 'wk-act',
        `<span class="wk-icon" aria-hidden="true">${a.icon || ''}</span>` +
        `<span><span class="wk-name">${a.name}</span><span class="wk-desc">${a.desc || ''}</span></span>`);
      b.type = 'button';
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => {
        if (this.picked.has(a.id)) { this.picked.delete(a.id); if (this.last === a) this.last = null; }
        else if (this.picked.size < this.slots) { this.picked.add(a.id); this.last = a; }
        this.update();
      });
      acts.append(b);
      return b;
    });
    main.append(acts);

    const side = el('div', 'wk-side');
    this._count = el('p', 'wk-count');
    side.append(this._count);
    this._meters = this.goods.map(g => {
      const m = el('div', 'wk-meter');
      const label = el('div', 'wk-meter-label', `<span>${g.label}</span><b></b>`);
      const bar = el('div', 'wk-bar');
      bar.setAttribute('aria-hidden', 'true');
      for (let i = 0; i < 3; i++) bar.append(el('span'));
      m.append(label, bar);
      side.append(m);
      return { good: g, value: label.querySelector('b'), cells: [...bar.children] };
    });
    this._verdict = el('p', 'wk-verdict');
    this._verdict.setAttribute('aria-live', 'polite');
    this._note = el('p', 'wk-note');
    side.append(this._verdict, this._note);
    main.append(side);
    this.append(main);
    if (this.hint) this.append(el('p', 'wk-hint', this.hint));
  }

  update() {
    const chosen = this.acts.filter(a => this.picked.has(a.id));
    const full = this.picked.size >= this.slots;
    this.acts.forEach((a, i) => {
      const on = this.picked.has(a.id);
      this._btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      this._btns[i].disabled = full && !on;
    });
    this._count.textContent = `${this.picked.size} of ${this.slots} chosen`;

    const thin = [];
    this._meters.forEach(m => {
      const total = Math.min(3, chosen.reduce((s, a) => s + (a.goods?.[m.good.id] || 0), 0));
      m.value.textContent = LEVELS[total];
      m.cells.forEach((c, i) => c.classList.toggle('on', i < total));
      if (total < 2) thin.push(m.good.label.toLowerCase());
    });

    this._verdict.textContent = !chosen.length
      ? 'Pick activities to fill the week.'
      : !thin.length
        ? 'This week gives some of every good of work.'
        : `Thin or missing: ${thin.join(', ')}.`;

    this._note.innerHTML = this.last ? `<b>${this.last.name}:</b> ${this.last.note || ''}` : '';
  }
}

customElements.define('phil-week', PhilWeek);
