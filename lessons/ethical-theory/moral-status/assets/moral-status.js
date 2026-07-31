/* =====================================================================
   <phil-dossier> — "The Ambassador's Manifest" (lesson-local visualization)
   Steps through unfiled species dossiers. For each one the student assigns a
   status tier (FULL / PARTIAL / NONE), then the four treaty delegates rule —
   and openly disagree. The point is the disagreement: the criteria for moral
   status come apart on exactly these cases.

   Ungraded exploration (not a quiz widget) — there is no "right" tier. The
   final panel tells the student which delegate their manifest resembles.

   Authoring:
     <phil-dossier prompt="...">
       <phil-case name="The Thrum" tag="Dossier 1"
                  sentientist="full :: Reasoning shown on the delegate card."
                  kantian="none :: ..."
                  speciesist="none :: ..."
                  relational="partial :: ...">
         Case description (HTML).
       </phil-case>
     </phil-dossier>
   Delegate attribute format:  "<tier> :: <reasoning>"  where tier is
   full | partial | none.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const TIERS = {
  full:    { label: 'FULL status',    short: 'FULL',    cls: 'full' },
  partial: { label: 'PARTIAL status', short: 'PARTIAL', cls: 'partial' },
  none:    { label: 'NO status',      short: 'NONE',    cls: 'none' },
};

const DELEGATES = {
  sentientist: { name: 'The Sentientist', crit: 'Can it suffer?' },
  kantian:     { name: 'The Kantian',     crit: 'Is it a rational agent?' },
  speciesist:  { name: 'The Traditionalist', crit: 'Is it one of us?' },
  relational:  { name: 'The Relationalist', crit: 'Who stands in relation to it?' },
  contractual: { name: 'The Contractualist', crit: 'Can it give and take?' },
};

const STYLE = `
.dsr { display:block; margin:14px 0; padding:14px 16px; background:var(--panel-2);
       border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); font-size:15px; line-height:1.45; }
.dsr-prompt { margin:0 0 10px; }
.dsr-count { font-family:var(--pixel); font-size:9px; color:var(--muted); margin:0 0 8px; }
.dsr-name { font-family:var(--pixel); font-size:12px; color:var(--accent-2); margin:0 0 8px;
            text-shadow:2px 2px 0 var(--border); }
.dsr-body { background:var(--panel); border:3px solid var(--border); padding:12px 14px; margin:0 0 12px; }
.dsr-body p { margin:0 0 .6em; }
.dsr-body p:last-child { margin:0; }
.dsr-ask { margin:0 0 8px; color:var(--accent-3); }
.dsr-opts { display:flex; flex-wrap:wrap; gap:8px; margin:0 0 12px; }
.dsr-btn { font-family:var(--pixel); font-size:9px; padding:10px 12px; background:var(--panel);
           color:var(--ink); border:3px solid var(--border); box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.dsr-btn:disabled { cursor:default; opacity:.4; }
.dsr-btn.picked { opacity:1; outline:3px solid var(--accent-2); }
.dsr-panel { display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:10px; margin:0 0 10px; }
.dsr-card { background:var(--panel); border:3px solid var(--border); padding:10px 12px; font-size:14px; }
.dsr-card h4 { font-family:var(--pixel); font-size:9px; margin:0 0 4px; color:var(--ink); line-height:1.5; }
.dsr-card .crit { font-size:12px; color:var(--muted); margin:0 0 8px; font-style:italic; }
.dsr-card p { margin:0; }
.dsr-badge { display:inline-block; font-family:var(--pixel); font-size:8px; padding:4px 6px;
             border:2px solid var(--border); margin:0 0 8px; }
.dsr-badge.full { background:#133a24; color:var(--good); }
.dsr-badge.partial { background:#3a3413; color:#ffd45e; }
.dsr-badge.none { background:#3a1620; color:var(--bad); }
.dsr-echo { font-family:var(--pixel); font-size:9px; line-height:1.7; padding:10px 12px; margin:0 0 10px;
            border:3px solid var(--border); background:var(--panel); color:var(--accent-3); }
.dsr-next { font-family:var(--pixel); font-size:9px; padding:8px 10px; background:var(--panel);
            color:var(--ink); border:3px solid var(--border); box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.dsr-done { font-family:var(--pixel); font-size:10px; line-height:1.8; padding:12px; border:3px solid var(--border);
            background:#133a24; color:var(--good); }
.dsr-done .tally { display:block; margin-top:10px; color:var(--ink); }
`;

class PhilDossier extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    if (!document.getElementById('dsr-style')) {
      const s = el('style'); s.id = 'dsr-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.cases = [...this.querySelectorAll('phil-case')].map((c, i) => {
      const rulings = {};
      for (const key of Object.keys(DELEGATES)) {
        const raw = c.getAttribute(key) || 'none :: (no ruling filed)';
        const [tier, ...rest] = raw.split('::');
        rulings[key] = { tier: tier.trim().toLowerCase(), why: rest.join('::').trim() };
      }
      return {
        name: c.getAttribute('name') || `Species ${i + 1}`,
        tag: c.getAttribute('tag') || `Dossier ${i + 1}`,
        text: c.innerHTML.trim(),
        rulings,
      };
    });
    this.prompt = this.getAttribute('prompt') ||
      'Read the dossier, file a tier, then hear the delegates. They will not agree.';
    this.idx = 0;
    this.agree = Object.fromEntries(Object.keys(DELEGATES).map(k => [k, 0]));
    this.build();
    this.render();
  }

  build() {
    this.classList.add('dsr');
    this.innerHTML = '';
    this.append(el('p', 'dsr-prompt', this.prompt));
    this._count = el('p', 'dsr-count');
    this._name = el('p', 'dsr-name');
    this._body = el('div', 'dsr-body');
    this._ask = el('p', 'dsr-ask', 'Your ruling as Moral Status Officer:');
    this._opts = el('div', 'dsr-opts');
    this._btns = {};
    for (const key of Object.keys(TIERS)) {
      const b = el('button', 'dsr-btn', TIERS[key].label);
      b.onclick = () => this._pick(key);
      this._btns[key] = b;
      this._opts.append(b);
    }
    this._echo = el('div', 'dsr-echo'); this._echo.style.display = 'none';
    this._panel = el('div', 'dsr-panel'); this._panel.style.display = 'none';
    this._next = el('button', 'dsr-next', 'Next dossier ▶');
    this._next.style.display = 'none';
    this._next.onclick = () => { this.idx++; this.render(); };
    this.append(this._count, this._name, this._body, this._ask, this._opts,
                this._echo, this._panel, this._next);
  }

  render() {
    if (this.idx >= this.cases.length) return this._finish();
    const c = this.cases[this.idx];
    this._count.textContent = `${c.tag} — ${this.idx + 1} of ${this.cases.length}`;
    this._name.textContent = c.name;
    this._body.innerHTML = c.text;
    for (const b of Object.values(this._btns)) { b.disabled = false; b.className = 'dsr-btn'; }
    this._ask.style.display = 'block';
    this._echo.style.display = 'none';
    this._panel.style.display = 'none';
    this._panel.innerHTML = '';
    this._next.style.display = 'none';
  }

  _pick(tier) {
    const c = this.cases[this.idx];
    for (const [k, b] of Object.entries(this._btns)) {
      b.disabled = true;
      if (k === tier) b.classList.add('picked');
    }
    const shares = [];
    for (const [key, d] of Object.entries(DELEGATES)) {
      const r = c.rulings[key];
      if (r.tier === tier) { this.agree[key]++; shares.push(d.name); }
      const card = el('div', 'dsr-card');
      card.append(
        el('h4', null, d.name),
        el('p', 'crit', d.crit),
        el('span', 'dsr-badge ' + (TIERS[r.tier]?.cls || 'none'), TIERS[r.tier]?.short || '—'),
        el('p', null, r.why),
      );
      this._panel.append(card);
    }
    this._echo.innerHTML = shares.length
      ? `You filed ${TIERS[tier].short}. So did: ${shares.join(', ')}.`
      : `You filed ${TIERS[tier].short}. No delegate filed the same — you are out on your own, which is not the same as being wrong.`;
    this._echo.style.display = 'block';
    this._panel.style.display = 'grid';
    this._next.style.display = 'inline-block';
    this._next.textContent = this.idx === this.cases.length - 1 ? 'File the manifest ▶' : 'Next dossier ▶';
  }

  _finish() {
    const ranked = Object.entries(this.agree).sort((a, b) => b[1] - a[1]);
    const top = ranked[0];
    const tied = ranked.filter(r => r[1] === top[1]);
    const n = this.cases.length;
    const verdict = tied.length > 1
      ? `Your rulings split evenly between ${tied.map(t => DELEGATES[t[0]].name).join(' and ')} — ${top[1]} of ${n} each. Most people's intuitions are mixed like this. The question is whether the mix is a principled position or just a habit of not deciding.`
      : `Your manifest most resembles ${DELEGATES[top[0]].name} — you agreed on ${top[1]} of ${n} dossiers. Their criterion: “${DELEGATES[top[0]].crit}”`;
    const tally = ranked
      .map(([k, v]) => `${DELEGATES[k].name}: ${v}/${n}`)
      .join(' · ');
    this.innerHTML = '';
    this.classList.add('dsr');
    const done = el('div', 'dsr-done', `📁 Manifest filed — ${n} species classified.<br>${verdict}`);
    done.append(el('span', 'tally', tally));
    this.append(done);
  }
}

customElements.define('phil-dossier', PhilDossier);
