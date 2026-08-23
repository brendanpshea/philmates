/* =====================================================================
   <phil-cascade-engine> — "The Information Cascade Engine"
   One tab per technological property Oakhaven adopted. Each shows the
   same three columns: the stated goal, the cognitive cost, and the
   unforeseen crisis — so the recurring shape of the pattern is visible
   across five very different tools. Teaching widget: ungraded, no
   completion hook, no persistence.

   Content lives in STAGES only. The first entry renders on load, so
   there is no second copy of the opening panel to drift out of sync.

   Type is sized to project: nothing below 15px.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const STYLE = `
.csc { display:block; margin:14px 0; padding:14px 16px; background:var(--panel-2);
       border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); font-size:17px; line-height:1.45; }
.csc-prompt { margin:0 0 10px; font-size:17px; }
.csc-tabs { display:flex; flex-wrap:wrap; gap:8px; margin:0 0 12px; }
.csc-btn { font-family:var(--pixel); font-size:9px; line-height:1.5; padding:9px 11px; background:var(--panel);
           color:var(--ink); border:3px solid var(--border); box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.csc-btn:hover { background:#313a5e; }
.csc-btn[aria-selected="true"] { background:var(--accent-3); color:var(--bg); }

.csc-cards { display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; }
@media (max-width:700px) { .csc-cards { grid-template-columns:1fr; } }

.csc-card { background:var(--panel); border:3px solid var(--border); border-left-width:6px; padding:10px 12px; }
.csc-card h4 { font-family:var(--pixel); font-size:9px; line-height:1.6; margin:0 0 8px; color:var(--muted); }
.csc-card p { margin:0; font-size:16px; line-height:1.45; }
.csc-card.goal { border-left-color:var(--good); }
.csc-card.goal h4 { color:var(--good); }
.csc-card.cost { border-left-color:var(--accent-3); }
.csc-card.cost h4 { color:var(--accent-3); }
.csc-card.fallout { border-left-color:var(--bad); }
.csc-card.fallout h4 { color:var(--bad); }
`;

const STAGES = [
  {
    tab: '1. Persistence (Runes)',
    goal: '<strong>Stop forgetting debts and paths.</strong> Carve words into birch bark so agreements outlive the people who made them.',
    cost: '<strong>Memory atrophy.</strong> Villagers stop practising oral recall, and the spoken word loses its standing in court.',
    fallout: '<strong>The detached text.</strong> A forged note travels without its author, and there is nobody present to question.'
  },
  {
    tab: '2. Zero-Cost Copying (Press)',
    goal: '<strong>Democratize medical recipes.</strong> Stamp 500 copies of the Wolf-Bane antidote so nobody dies waiting on a scribe.',
    cost: '<strong>Gatekeeper collapse.</strong> The scriptorium\'s authority vanishes years before any public habit of verification grows in.',
    fallout: '<strong>The pamphlet wars.</strong> Rival broadsheets polarize the town into factions, and the bakery burns down.'
  },
  {
    tab: '3. Instant Speed (Wire)',
    goal: '<strong>Instant border defence.</strong> Warn the garrison of a raid in three seconds instead of thirty-six hours.',
    cost: '<strong>Latency destroyed.</strong> The cooling-off buffer of physical travel disappears, and hesitation starts to look like negligence.',
    fallout: '<strong>The 10-minute war.</strong> An unverified four-word telegram escalates into a shooting war by sunrise.'
  },
  {
    tab: '4. Broadcast (Mirror)',
    goal: '<strong>Unite the valley.</strong> Beam the same official news and wholesome music into every cottage at the same hour.',
    cost: '<strong>Outrage optimization.</strong> A medium that lives on attention rewards fear over calm truth, whoever is running it.',
    fallout: '<strong>Atomized panic.</strong> Villagers sit at home watching distant threats they have no way to act on.'
  },
  {
    tab: '5. Personalization',
    goal: '<strong>Show each villager what they care about.</strong> Let every mirror learn its owner and stop wasting their evening.',
    cost: '<strong>No shared picture.</strong> The valley loses the one thing a broadcast still gave it: everyone seeing the same thing.',
    fallout: '<strong>Unaccountable curation.</strong> Nobody chose what you saw, so there is nobody the village can summon to explain it.'
  }
];

class PhilCascadeEngine extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    if (!document.getElementById('csc-style')) {
      const s = el('style'); s.id = 'csc-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.classList.add('csc');
    this.build();
    this.show(0);
  }

  build() {
    const prompt = this.getAttribute('prompt');
    this.innerHTML = '';
    if (prompt) this.append(el('p', 'csc-prompt', prompt));

    const tabs = el('div', 'csc-tabs');
    tabs.setAttribute('role', 'tablist');
    this._btns = STAGES.map((s, i) => {
      const b = el('button', 'csc-btn', s.tab);
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.onclick = () => this.show(i);
      tabs.append(b);
      return b;
    });
    this.append(tabs);

    this._cards = el('div', 'csc-cards');
    this._cards.setAttribute('role', 'tabpanel');
    this.append(this._cards);
  }

  show(i) {
    const s = STAGES[i];
    this._btns.forEach((b, j) => b.setAttribute('aria-selected', j === i ? 'true' : 'false'));
    this._cards.innerHTML = `
      <div class="csc-card goal"><h4>The Stated Goal</h4><p>${s.goal}</p></div>
      <div class="csc-card cost"><h4>The Cognitive Cost</h4><p>${s.cost}</p></div>
      <div class="csc-card fallout"><h4>The Unforeseen Crisis</h4><p>${s.fallout}</p></div>`;
  }
}

customElements.define('phil-cascade-engine', PhilCascadeEngine);
