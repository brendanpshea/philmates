/* =====================================================================
   Lesson-local visualizations for "The Ship's Chest".
   All three are ungraded explorations (not quiz widgets).

   <phil-lanterns prompt="…">
     <script type="application/json">
     { "stations": [ { "id": "lookout", "label": "Lookout" } ],
       "sailors":  [ { "name": "…", "story": "…", "treat": "…",
                       "before": ["lookout"], "after": [],
                       "pain": ["Severe", "Eased"],
                       "verdict": ["…untreated…", "…treated…"] } ] }
     </script>
   </phil-lanterns>
     A ship with a lantern at each of eight stations. Pick a sailor and his
     condition puts out the lanterns at stations he can no longer work. Treat
     him and see which relight. `before` and `after` list the CLOSED stations;
     `pain` is optional. Station ids must match the positions in LANTERN_AT.

   <phil-chest prompt="…" budget="100">
     <script type="application/json">
     { "claims": [ { "id": "limes", "icon": "🍋", "name": "…", "desc": "…",
                     "cost": 10, "years": 20 } ],
       "presets": [ { "label": "…", "ids": ["limes"], "note": "…" } ] }
     </script>
   </phil-chest>
     Spend the chest on whole claims. Shows coins left, healthy sailor-years
     bought, and notes that name the rationing problem a choice runs into.
     The note rules use the claim ids `limes`, `teeth`, `fever`, `comfort`.

   <phil-articles prompt="…">
     Three choices (what the chest owes, who fills it, who decides when it
     runs short) write one article. The widget says how Engelhardt, a
     utilitarian, and Daniels would each judge it, and how it does on Daniels
     and Sabin's four conditions. Arguments are credited to the philosophers,
     never to the crew.
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

const fmt = (n) => Number.isInteger(n) ? String(n) : n.toFixed(1);

const STYLE = `
.sc { display:block; margin:12px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow);
      --sc-amber:#ffcf5a; --sc-dim:#6b7499; }
.sc-prompt { margin:0 0 10px; }
.sc-row { display:flex; flex-wrap:wrap; align-items:center; gap:6px; }
.sc-btn { font:inherit; font-size:16px; padding:5px 11px; background:var(--bg); color:var(--ink);
          border:2px solid var(--border); cursor:pointer; }
.sc-btn[aria-pressed="true"] { background:#133a24; border-color:var(--good); color:var(--good); font-weight:bold; }
.sc-btn[aria-pressed="true"]::before { content:"✔ "; }
.sc-btn:disabled { opacity:.55; cursor:default; }
.sc-h { font-family:var(--pixel); font-size:10px; line-height:1.5; margin:0 0 6px; color:var(--accent-3); }
.sc-out { background:var(--panel); border:3px solid var(--border); padding:8px 10px; margin:8px 0 0; min-height:2.9em; }
.sc-out p { margin:0 0 4px; }
.sc-out p:last-child { margin-bottom:0; }
.sc-note { color:var(--muted); }

/* ---- lanterns ---- */
.lt-main { display:grid; grid-template-columns:minmax(0, 1.25fr) minmax(0, 1fr); gap:10px; margin:8px 0 0; align-items:start; }
.lt-ship { background:#0c1426; border:3px solid var(--border); }
.lt-ship svg { display:block; width:100%; height:auto; }
.lt-list { display:grid; grid-template-columns:1fr 1fr; gap:3px 8px; font-size:clamp(15px, 1.4vw, 18px); line-height:1.35; }
.lt-dot { color:var(--sc-amber); }
.lt-list .is-closed { color:var(--muted); }
.lt-list .is-closed .lt-dot { color:var(--sc-dim); }
.lt-list b { font-weight:normal; font-size:.85em; }
.lt-story { margin:8px 0 6px; }
.lt-count { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.lt-meter { display:inline-grid; grid-template-columns:repeat(8, 14px); gap:3px; }
.lt-meter span { height:14px; background:var(--bg); border:2px solid var(--sc-dim); }
.lt-meter span.on { background:var(--sc-amber); border-color:var(--border); }
@media (max-width:760px) { .lt-main { grid-template-columns:1fr; } }

/* ---- chest ---- */
.ch-main { display:grid; grid-template-columns:minmax(0, 1fr) 190px; gap:10px; align-items:start; }
.ch-claims { display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:6px; }
.ch-claim { background:var(--panel); border:3px solid var(--border); padding:6px 9px; display:flex; flex-direction:column; gap:4px; }
.ch-claim.is-paid { border-color:var(--good); }
.ch-claim p { margin:0; }
.ch-name { font-weight:bold; }
.ch-meta { color:var(--muted); }
.ch-side { background:var(--panel); border:3px solid var(--border); padding:8px; }
.ch-coins { display:grid; grid-template-columns:repeat(10, 1fr); gap:2px; margin:0 0 8px; }
.ch-coins span { aspect-ratio:1; border-radius:50%; background:var(--sc-amber); border:1px solid #8a6a1e;
                 display:grid; place-items:center; font-size:9px; line-height:1; }
.ch-coins span.spent { background:var(--bg); border-color:#3a4260; }
.ch-stat { margin:0 0 6px; }
.ch-stat strong { font-family:var(--pixel); font-size:13px; color:var(--sc-amber); display:block; margin-top:2px; }
.ch-presets { margin:8px 0 0; }
@media (max-width:760px) { .ch-main { grid-template-columns:1fr; } }

/* ---- articles ---- */
.ar-groups { display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:8px; }
.ar-group { background:var(--panel); border:3px solid var(--border); padding:7px 9px; }
.ar-group .sc-row { flex-direction:column; align-items:stretch; }
.ar-group .sc-btn { text-align:left; font-size:15px; }
.ar-result { display:grid; grid-template-columns:minmax(0, 1.2fr) minmax(0, 1fr); gap:10px; margin:10px 0 0; }
.ar-parchment { background:#e8dcc0; color:#2b1d0e; border:3px solid var(--border); box-shadow:inset 0 0 0 3px #c9b88f;
                padding:10px 14px; font-family:Georgia, 'Times New Roman', serif; }
.ar-parchment h2 { font-family:Georgia, 'Times New Roman', serif; font-size:19px; color:#5a1e12; margin:0 0 6px; text-shadow:none; }
.ar-parchment p { color:#2b1d0e; margin:0 0 5px; }
.ar-signers p { margin:0 0 5px; }
.ar-checks { display:flex; flex-wrap:wrap; gap:4px 12px; margin:6px 0 0; }
@media (max-width:760px) { .ar-result { grid-template-columns:1fr; } }
`;

const addStyle = () => {
  if (document.getElementById('sc-style')) return;
  const s = el('style'); s.id = 'sc-style'; s.textContent = STYLE; document.head.append(s);
};

const toggleBtn = (label, onclick) => {
  const b = el('button', 'sc-btn'); b.type = 'button'; b.textContent = label;
  b.setAttribute('aria-pressed', 'false');
  b.onclick = onclick;
  return b;
};

/* ------------------------------------------------------------------ */

/* Lantern positions on the 220×150 ship drawing, keyed by station id. */
const LANTERN_AT = {
  lookout:       [100, 4],
  topman:        [140, 26],
  helmsman:      [184, 72],
  gunner:        [40, 104],
  carpenter:     [22, 76],
  navigator:     [196, 104],
  cook:          [138, 66],
  quartermaster: [84, 72],
};

const SHIP = `
  <rect x="0" y="130" width="220" height="20" fill="#16304d"/>
  <rect x="8" y="136" width="10" height="2" fill="#23507a"/><rect x="52" y="140" width="14" height="2" fill="#23507a"/>
  <rect x="120" y="137" width="12" height="2" fill="#23507a"/><rect x="176" y="141" width="16" height="2" fill="#23507a"/>
  <rect x="56" y="30" width="3" height="68" fill="#8a6a44"/>
  <rect x="42" y="40" width="31" height="26" fill="#d9cfb4"/>
  <rect x="108" y="10" width="4" height="88" fill="#8a6a44"/>
  <rect x="98" y="18" width="24" height="6" fill="#6b4a2e"/>
  <rect x="82" y="38" width="56" height="3" fill="#6b4a2e"/>
  <rect x="86" y="41" width="48" height="32" fill="#e8dcc0"/>
  <rect x="159" y="34" width="3" height="64" fill="#8a6a44"/>
  <rect x="147" y="44" width="27" height="22" fill="#d9cfb4"/>
  <polygon points="14,100 206,100 192,130 30,130" fill="#6b4a2e"/>
  <rect x="14" y="96" width="192" height="4" fill="#8a6a44"/>
  <rect x="24" y="112" width="174" height="3" fill="#3e2a1a"/>
  <rect x="52" y="116" width="10" height="8" fill="#11131f"/>
  <rect x="46" y="119" width="8" height="3" fill="#3a4260"/>
  <rect x="180" y="104" width="12" height="6" fill="#ffcf5a"/>
  <rect x="174" y="84" width="2" height="12" fill="#8a6a44"/>
  <rect x="168" y="82" width="14" height="2" fill="#8a6a44"/><rect x="174" y="78" width="2" height="4" fill="#8a6a44"/>
  <rect x="168" y="78" width="2" height="6" fill="#8a6a44"/><rect x="180" y="78" width="2" height="6" fill="#8a6a44"/>
  <rect x="128" y="82" width="6" height="14" fill="#3a4260"/>
  <rect x="129" y="76" width="3" height="3" fill="#9aa3c7"/><rect x="132" y="71" width="3" height="3" fill="#9aa3c7"/>
  <rect x="26" y="88" width="16" height="8" fill="#8a6a44"/><rect x="28" y="84" width="4" height="4" fill="#9aa3c7"/>
  <rect x="88" y="88" width="14" height="8" fill="#6b4a2e"/><rect x="94" y="90" width="3" height="3" fill="#ffcf5a"/>`;

const lanternSVG = (x, y, lit, n) => `
  <g transform="translate(${x} ${y})">
    ${lit ? '<rect x="-3" y="5" width="14" height="8" fill="#ffcf5a" opacity=".3"/><rect x="-1" y="2" width="10" height="14" fill="#ffcf5a" opacity=".3"/>' : ''}
    <rect x="3" y="0" width="2" height="2" fill="#9aa3c7"/>
    <rect x="1" y="2" width="6" height="2" fill="#3a4260"/>
    <rect x="0" y="4" width="8" height="10" fill="${lit ? '#050610' : '#6b7499'}"/>
    <rect x="1" y="5" width="6" height="8" fill="${lit ? '#ffcf5a' : '#11131f'}"/>
    ${lit ? '<rect x="3" y="7" width="2" height="4" fill="#fff6c8"/>' : ''}
    <text x="11" y="13" font-family="'Press Start 2P', monospace" font-size="7" fill="${lit ? '#eef1ff' : '#9aa3c7'}">${n}</text>
  </g>`;

class PhilLanterns extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.data = readJSON(this, { stations: [], sailors: [] });
    this.si = 0;
    this.treated = false;
    this.classList.add('sc', 'phil-dense');
    const prompt = this.getAttribute('prompt') || 'Pick a sailor.';
    this.innerHTML = '';
    this.append(el('p', 'sc-prompt', prompt));

    const row = el('div', 'sc-row');
    row.setAttribute('role', 'group'); row.setAttribute('aria-label', 'Sailors');
    this._sailorBtns = this.data.sailors.map((s, i) => {
      const b = toggleBtn(s.name, () => { this.si = i; this.treated = false; this.render(); });
      row.append(b); return b;
    });
    this.append(row);

    this._story = el('p', 'lt-story');
    this.append(this._story);

    const main = el('div', 'lt-main');
    this._ship = el('div', 'lt-ship');
    this._ship.setAttribute('role', 'img');
    this._list = el('div', 'lt-list');
    this._items = this.data.stations.map((st, i) => {
      const li = el('div'); this._list.append(li); return { st, li, n: i + 1 };
    });
    const side = el('div');
    side.append(this._list);
    this._treat = toggleBtn('', () => { this.treated = !this.treated; this.render(); });
    const trow = el('div', 'sc-row'); trow.style.marginTop = '8px';
    trow.append(this._treat);
    side.append(trow);
    main.append(this._ship, side);
    this.append(main);

    this._out = el('div', 'sc-out');
    this._out.setAttribute('aria-live', 'polite');
    this.append(this._out);
    this.render();
  }

  render() {
    const s = this.data.sailors[this.si];
    if (!s) return;
    this._sailorBtns.forEach((b, i) => b.setAttribute('aria-pressed', String(i === this.si)));
    this._story.innerHTML = `<strong>${s.name}.</strong> ${s.story}`;
    this._treat.textContent = `Treat: ${s.treat}`;
    this._treat.setAttribute('aria-pressed', String(this.treated));

    const closed = new Set(this.treated ? s.after : s.before);
    let lamps = '';
    for (const { st, li, n } of this._items) {
      const lit = !closed.has(st.id);
      li.className = lit ? '' : 'is-closed';
      li.innerHTML = `<span class="lt-dot" aria-hidden="true">${lit ? '●' : '○'}</span> ${n}. ${st.label} <b>(${lit ? 'open' : 'closed'})</b>`;
      const at = LANTERN_AT[st.id];
      if (at) lamps += lanternSVG(at[0], at[1], lit, n);
    }
    const total = this._items.length;
    const open = total - closed.size;
    this._ship.innerHTML = `<svg viewBox="0 0 220 150" shape-rendering="crispEdges" aria-hidden="true">${SHIP}${lamps}</svg>`;
    this._ship.setAttribute('aria-label',
      `Ship with ${total} stations. ${open} lanterns lit, ${closed.size} dark.`);

    const meter = Array.from({ length: total }, (_, i) => `<span class="${i < open ? 'on' : ''}"></span>`).join('');
    const pain = s.pain ? `<p><strong>Pain:</strong> ${this.treated ? s.pain[1] : s.pain[0]}</p>` : '';
    this._out.innerHTML =
      `<p class="lt-count"><span><strong>Stations open: ${open} of ${total}.</strong> A healthy sailor: ${total} of ${total}.</span>`
      + `<span class="lt-meter" aria-hidden="true">${meter}</span></p>`
      + pain
      + `<p>${this.treated ? s.verdict[1] : s.verdict[0]}</p>`;
  }
}

/* ------------------------------------------------------------------ */

class PhilChest extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.data = readJSON(this, { claims: [], presets: [] });
    this.budget = Number(this.getAttribute('budget')) || 100;
    this.paid = new Set();
    this.preset = null;
    this.classList.add('sc', 'phil-dense');
    const prompt = this.getAttribute('prompt') || 'Spend the chest.';
    this.innerHTML = '';
    this.append(el('p', 'sc-prompt', prompt));

    const main = el('div', 'ch-main');
    const claims = el('div', 'ch-claims');
    this._cards = this.data.claims.map((c, i) => {
      const card = el('div', 'ch-claim');
      const name = el('p', 'ch-name', `<span aria-hidden="true">${c.icon}</span> ${c.name}`);
      name.id = `ch-n-${i}`;
      const desc = el('p', null, c.desc);
      const meta = el('p', 'ch-meta', `Cost: ${c.cost} · Healthy years: +${fmt(c.years)}`);
      const btn = toggleBtn(`Pay ${c.cost}`, () => {
        this.preset = null;
        this.paid.has(c.id) ? this.paid.delete(c.id) : this.paid.add(c.id);
        this.render();
      });
      btn.setAttribute('aria-describedby', name.id);
      const r = el('div', 'sc-row'); r.append(btn);
      card.append(name, desc, meta, r);
      claims.append(card);
      return { c, card, btn };
    });

    const side = el('div', 'ch-side');
    this._coins = el('div', 'ch-coins');
    this._coins.setAttribute('aria-hidden', 'true');
    this._stats = el('div');
    side.append(this._coins, this._stats);
    main.append(claims, side);
    this.append(main);

    const pr = el('div', 'sc-row ch-presets');
    pr.setAttribute('role', 'group'); pr.setAttribute('aria-label', 'Ready-made choices');
    this._presetBtns = this.data.presets.map((p, i) => {
      const b = toggleBtn(p.label, () => { this.paid = new Set(p.ids); this.preset = i; this.render(); });
      pr.append(b); return b;
    });
    const clear = el('button', 'sc-btn', 'Empty the chest'); clear.type = 'button';
    clear.onclick = () => { this.paid.clear(); this.preset = null; this.render(); };
    pr.append(clear);
    this.append(pr);

    this._out = el('div', 'sc-out');
    this._out.setAttribute('aria-live', 'polite');
    this.append(this._out);
    this.render();
  }

  render() {
    const claims = this.data.claims;
    const paid = claims.filter(c => this.paid.has(c.id));
    const spent = paid.reduce((s, c) => s + c.cost, 0);
    const left = this.budget - spent;
    const years = paid.reduce((s, c) => s + c.years, 0);

    for (const { c, card, btn } of this._cards) {
      const on = this.paid.has(c.id);
      card.classList.toggle('is-paid', on);
      btn.setAttribute('aria-pressed', String(on));
      btn.textContent = on ? `Paid ${c.cost}` : `Pay ${c.cost}`;
      btn.disabled = !on && c.cost > left;
      if (btn.disabled) btn.textContent = `Needs ${c.cost}`;
    }
    this._presetBtns.forEach((b, i) => b.setAttribute('aria-pressed', String(i === this.preset)));

    let coins = '';
    for (const c of paid) for (let k = 0; k < c.cost; k++) coins += `<span class="spent">${k === 0 ? c.icon : ''}</span>`;
    for (let k = 0; k < left; k++) coins += '<span></span>';
    this._coins.innerHTML = coins;

    this._stats.innerHTML =
      `<p class="ch-stat">Coins left<strong>${left} of ${this.budget}</strong></p>`
      + `<p class="ch-stat">Healthy sailor-years<strong>${fmt(years)}</strong></p>`
      + `<p class="ch-stat">Claims paid<strong>${paid.length} of ${claims.length}</strong></p>`;

    if (!paid.length) {
      this._out.innerHTML = `<p class="sc-note">The chest holds ${this.budget} coins, and the claims add up to more. Pay for some, or try a ready-made choice.</p>`;
      return;
    }
    const has = (id) => this.paid.has(id);
    const notes = [];
    if (this.preset != null) notes.push(this.data.presets[this.preset].note);
    if (has('teeth') && !has('fever')) {
      notes.push('<strong>Aggregation.</strong> Thirty small gains outweighed Kit\'s one chance at a whole life. Added up, small benefits can beat a large one. Should they?');
    }
    if (has('fever') && !has('teeth')) {
      notes.push('<strong>Fair chances or best outcomes?</strong> You gave Kit a 1-in-4 chance and passed over a surer gain for thirty hands. Many people think she is owed her chance anyway.');
    }
    if (!has('fever') && !has('teeth') && left >= 10) {
      notes.push('<strong>Priority to the sickest.</strong> Kit is the worst-off sailor aboard. How much extra weight should that earn him?');
    }
    if (has('comfort')) {
      notes.push('<strong>Comfort.</strong> Easing Redruth\'s pain adds only 0.1 healthy years to the count. If you paid for it anyway, the count is missing something you care about.');
    } else if (spent >= 60) {
      notes.push('<strong>Comfort.</strong> Redruth gets nothing for her pain, and the healthy-years count barely changes. Does the count leave something out?');
    }
    if (!has('limes')) {
      notes.push('<strong>The limes.</strong> They buy more health per coin than anything else here, so nearly every theory pays for them first.');
    }
    this._out.innerHTML = notes.slice(0, 2).map(n => `<p>${n}</p>`).join('');
  }
}

/* ------------------------------------------------------------------ */

const OWES = [
  { id: 'nothing', label: 'Nothing. Each hand pays their own surgeon.',
    text: 'No hand may claim on the chest for sickness or injury. Each pays their own surgeon.' },
  { id: 'rescue',  label: 'Rescue only. Save a life, then the hand pays.',
    text: 'A hand in danger of death shall be treated at once from the chest. After that, the hand pays their own way.' },
  { id: 'minimum', label: 'A decent minimum of basic care.',
    text: 'Every hand shall have from the chest the basic care most sailors need: bones set, fevers treated, and pain eased.' },
  { id: 'fair',    label: 'A fair share: what restores a hand\'s station.',
    text: 'Every hand shall have from the chest the care that restores them to their station, as nearly as the chest allows.' },
  { id: 'most',    label: 'Whatever does the most good for the crew.',
    text: 'The chest shall be spent on whatever care does the most good for the crew as a whole.' },
];
const FILLS = [
  { id: 'equal', label: 'Every hand pays the same each month.',
    text: 'Every hand pays sixpence a month into the chest.' },
  { id: 'share', label: 'Bigger shares pay more.',
    text: 'Every hand pays into the chest in proportion to their share of the voyage\'s profits.' },
  { id: 'free',  label: 'Only those who choose to give.',
    text: 'Any hand who wishes may give to the chest. None shall be made to.' },
];
const DECIDES = [
  { id: 'captain', label: 'The captain decides.',
    text: 'When the chest runs short, the captain decides who is treated.',
    checks: [false, false, false, true] },
  { id: 'doctor',  label: 'The doctor decides by medical need.',
    text: 'When the chest runs short, the doctor decides by medical need.',
    checks: [false, true, false, true] },
  { id: 'posted',  label: 'Rules posted with reasons, open to appeal.',
    text: 'When the chest runs short, the rules for who comes first shall be posted on the mast with their reasons, and any hand may appeal to the whole crew.',
    checks: [true, true, true, true] },
  { id: 'vote',    label: 'The crew votes on each case.',
    text: 'When the chest runs short, the crew shall vote on each case.',
    checks: [true, false, false, true] },
];
const CHECKS = ['Publicity', 'Relevance', 'Appeals', 'Enforcement'];

const engelhardtSays = (o, f) => {
  if (o === 'nothing') return ['accepts', 'Nobody is made to pay for another person\'s bad luck.'];
  if (f === 'free') return ['accepts', 'Nobody is made to give, so nobody\'s property is taken.'];
  if (o === 'rescue') return ['accepts', 'A crew may agree to rescue its own. Nobody claims more than that as a right.'];
  return ['accepts, with a caveat', 'Every hand chose to sign, so the agreement binds them. A country is different: nobody signs up to be born in one.'];
};

const utilitarianSays = (o, f) => {
  if (o === 'nothing' || o === 'rescue') return ['rejects', 'Sick hands can\'t sail, and cheap care for many does more good than anything else the chest could buy.'];
  if (f === 'free') return ['rejects', 'If giving is voluntary, the healthy keep their coins and the chest is empty when it is needed.'];
  if (o === 'most') return ['accepts', 'This writes the utilitarian ledger into the articles.'];
  return ['accepts', 'Close enough. The fight will be over what comes first when the chest runs short.'];
};

const danielsSays = (o, f, d) => {
  if (o === 'nothing' || o === 'rescue') return ['rejects', 'A hand who survives the emergency can still be left with their stations closed for good.'];
  if (f === 'free') return ['rejects', 'Care that depends on charity is not a right. It is luck of another kind.'];
  if (o === 'most') return ['hesitates', 'The most good for the crew could mean Kit never gets her chance.'];
  const fair = d === 'posted';
  if (o === 'minimum') return [fair ? 'accepts' : 'accepts, uneasily', `A decent minimum is a start, though it may not restore a hand's station.${fair ? '' : ' Daniels also wants the limits set in the open.'}`];
  return fair ? ['accepts', 'This protects each hand\'s fair share of opportunity, with limits set in the open.']
              : ['accepts, uneasily', 'The clause fits his argument. But he wants the limits posted with reasons that anyone can appeal.'];
};

class PhilArticles extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.pick = { owes: null, fills: null, decides: null };
    this.classList.add('sc', 'phil-dense');
    const prompt = this.getAttribute('prompt') || 'Write the article.';
    this.innerHTML = '';
    this.append(el('p', 'sc-prompt', prompt));

    const groups = el('div', 'ar-groups');
    this._btns = {};
    const group = (key, title, opts) => {
      const box = el('div', 'ar-group');
      const h = el('h2', 'sc-h', title); h.id = `ar-h-${key}`;
      const row = el('div', 'sc-row');
      row.setAttribute('role', 'group'); row.setAttribute('aria-labelledby', h.id);
      this._btns[key] = opts.map(o => {
        const b = toggleBtn(o.label, () => { this.pick[key] = o.id; this.render(); });
        row.append(b); return { o, b };
      });
      box.append(h, row);
      groups.append(box);
    };
    group('owes', '1. What does the chest owe?', OWES);
    group('fills', '2. Who fills the chest?', FILLS);
    group('decides', '3. Who decides when it runs short?', DECIDES);
    this.append(groups);

    this._out = el('div', 'sc-out');
    this._out.setAttribute('aria-live', 'polite');
    this.append(this._out);
    this.render();
  }

  render() {
    for (const key of Object.keys(this._btns)) {
      this._btns[key].forEach(({ o, b }) => b.setAttribute('aria-pressed', String(this.pick[key] === o.id)));
    }
    const { owes, fills, decides } = this.pick;
    const open = [owes, fills, decides].filter(v => !v).length;
    if (open) {
      this._out.innerHTML = `<p class="sc-note">Make all three choices to write the article. ${open} to go.</p>`;
      return;
    }
    const O = OWES.find(x => x.id === owes), F = FILLS.find(x => x.id === fills), D = DECIDES.find(x => x.id === decides);
    const sign = (who, [verb, why]) => `<p><strong>${who} ${verb}.</strong> ${why}</p>`;
    const checks = D.checks.map((ok, i) => `<span>${ok ? '✔' : '✘'} ${CHECKS[i]}</span>`).join('');
    this._out.innerHTML =
      `<div class="ar-result">`
      + `<div class="ar-parchment"><h2>Article the Ninth</h2><p>${O.text}</p><p>${F.text}</p><p>${D.text}</p></div>`
      + `<div class="ar-signers">`
      + sign('Engelhardt', engelhardtSays(owes, fills))
      + sign('A utilitarian', utilitarianSays(owes, fills))
      + sign('Daniels', danielsSays(owes, fills, decides))
      + `<p><strong>Daniels and Sabin's four conditions:</strong></p><p class="ar-checks">${checks}</p>`
      + `</div></div>`;
  }
}

customElements.define('phil-lanterns', PhilLanterns);
customElements.define('phil-chest', PhilChest);
customElements.define('phil-articles', PhilArticles);
