/* =====================================================================
   <phil-triage-switchboard> — "The Dilemma Switchboard"
   Interactive side-by-side scenario comparator:
   Students step through five classic scenarios (Switch, Footbridge,
   Loop, Transplant, Crisis-Standards Ventilator Triage) and read how
   three ethical frameworks (Consequentialism, Deontology / Rights,
   Doctrine of Double Effect) judge each one, revealing where the
   frameworks agree and where they pull apart.

   Type is sized to project: nothing below 15px. If you add a field,
   keep it short — this widget is read from the back of a classroom.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const STYLE = `
.tsb { display:block; margin:14px 0; padding:14px 16px; background:var(--panel-2);
       border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); font-size:17px; line-height:1.45; }
.tsb-prompt { margin:0 0 10px; font-size:17px; }
.tsb-nav { display:flex; align-items:center; gap:10px; margin:0 0 12px; flex-wrap:wrap; }
.tsb-btn { font-family:var(--pixel); font-size:10px; padding:9px 11px; background:var(--panel);
           color:var(--ink); border:3px solid var(--border); box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.tsb-btn:disabled { opacity:.35; cursor:default; }
.tsb-stage-lbl { font-size:16px; color:var(--muted); }

.tsb-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:0 0 12px; }
@media (max-width:650px) { .tsb-grid { grid-template-columns:1fr; } }

.tsb-box { background:var(--panel); border:3px solid var(--border); padding:10px 12px; }
.tsb-box h4 { font-family:var(--pixel); font-size:11px; margin:0 0 8px; color:var(--accent); }
.tsb-box p { margin:0 0 6px; font-size:16px; }

.tsb-factors { display:flex; flex-direction:column; gap:5px; margin:0 0 8px; }
.tsb-factor { display:flex; justify-content:space-between; gap:10px; font-size:15px; padding:5px 7px; background:var(--bg); border:1px solid var(--border); }
.tsb-factor > span:first-child { color:var(--muted); flex:none; }
.tsb-factor-val { font-weight:bold; text-align:right; }
.tsb-factor-val.good { color:var(--good); }
.tsb-factor-val.warn { color:var(--accent-3); }
.tsb-factor-val.bad { color:var(--bad); }

.tsb-eval { display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:8px; margin:0 0 10px; }
.tsb-badge { padding:8px 10px; border:2px solid var(--border); font-size:15px; line-height:1.35; text-align:center; }
.tsb-badge strong { display:block; margin-bottom:3px; }
.tsb-badge.permit { background:#133a24; border-color:var(--good); color:var(--good); }
.tsb-badge.forbid { background:#3a1620; border-color:var(--bad); color:var(--bad); }
.tsb-badge.conflict { background:#3a2f16; border-color:var(--accent-3); color:var(--accent-3); }

.tsb-takeaway { font-size:16px; line-height:1.5; padding:11px; border:3px solid var(--border); background:var(--panel); color:var(--ink); }
.tsb-takeaway strong { font-family:var(--pixel); font-size:10px; display:block; margin-bottom:6px; color:var(--accent-2); }
`;

const SCENARIOS = [
  {
    title: "1 · Foot's Spur (The Switch)",
    domain: "Railway Track",
    action: "Pull switch to redirect train from 5 workers to 1 worker",
    netLives: "+4 lives saved (5 saved vs 1 lost)",
    agency: "Redirect existing runaway danger",
    intention: "Foreseen side-effect (death of 1 is not required to save the 5)",
    contact: "Indirect (lever / track)",
    utilitarian: "Permissible (Maximizes net welfare: 5 > 1)",
    deontology: "Permissible (Does not use person as a mere tool)",
    doubleEffect: "Passes (Harm is unintended side-effect)",
    takeaway: "The vast majority (~85%) approve pulling the switch: you minimize harm by deflecting an already active lethal momentum without treating the one person as a physical tool."
  },
  {
    title: "2 · Thomson's Footbridge (The Heavy Bystander)",
    domain: "Railway Track",
    action: "Push a heavy stranger off a bridge to physically halt the trolley",
    netLives: "+4 lives saved (5 saved vs 1 lost)",
    agency: "Initiate new direct violent force against a non-threatened person",
    intention: "Intended means (the person's physical body is required to absorb the crash)",
    contact: "Direct physical contact / assault",
    utilitarian: "Permissible on pure math, but creates severe rule instability",
    deontology: "Impermissible (Violates rights; treats person as mere physical buffer)",
    doubleEffect: "Fails (Harm is the direct causal means of saving the others)",
    takeaway: "Intuitions flip sharply (~85% disapprove). The math (5 vs 1) is identical to the Switch, but here you use an innocent human body as an instrumental object."
  },
  {
    title: "3 · Thomson's Loop (The Essential Obstacle)",
    domain: "Railway Track",
    action: "Divert trolley to a loop that circles back unless it hits a heavy worker",
    netLives: "+4 lives saved (5 saved vs 1 lost)",
    agency: "Redirect train, but success depends entirely on the body stopping it",
    intention: "Intended means (without the body, the 5 still die)",
    contact: "Indirect (switch lever)",
    utilitarian: "Permissible (5 saved > 1 lost)",
    deontology: "Tension: Lever feels like Spur, but logic relies on person as tool",
    doubleEffect: "Fails strict test (You need the collision to save the 5)",
    takeaway: "The Loop exposes the boundary of Double Effect: if the one worker were absent, pulling the lever would accomplish nothing. You are depending on their presence to stop the train."
  },
  {
    title: "4 · The Transplant Surgeon (Foot/Thomson)",
    domain: "Hospital Ward",
    action: "Harvest heart, lungs, and kidneys from 1 healthy checkup patient to save 5 dying patients",
    netLives: "+4 lives saved (5 saved vs 1 lost)",
    agency: "Active intentional killing of a healthy patient in clinic",
    intention: "Intended means (organs taken by lethal assault)",
    contact: "Direct clinical surgical assault",
    utilitarian: "Act: saves 5. Rule: Destroys healthcare system entirely",
    deontology: "Impermissible (Absolute violation of non-maleficence & bodily rights)",
    doubleEffect: "Fails completely (Killing is the exact mechanism of treatment)",
    takeaway: "Almost everyone rejects harvesting the 1 patient. In medicine, negative duty ('first, do no harm') and inviolable patient rights decisively outweigh simple utilitarian addition."
  },
  {
    title: "5 · Crisis Standards: 2 Ventilators, 6 Patients",
    domain: "Pandemic Triage",
    action: "Allocate 2 ventilators by short-term survival odds (SOFA), published in advance",
    netLives: "Maximizes the number who survive this admission",
    agency: "Allocating scarce aid among patients who all arrived with lethal illness",
    intention: "Intended aid for those treated; foreseen palliative care for the rest",
    contact: "Protocol-driven, applied by a triage officer at the bedside",
    utilitarian: "Recommended (Maximizes total survivors)",
    deontology: "Permissible if criteria are objective, public, and non-discriminatory",
    doubleEffect: "Passes (Not killing the untreated; scarcity forces tragic choice)",
    takeaway: "Unlike Transplant, triage kills no one to harvest parts — it allocates scarce aid when not everyone can be saved. Note what the criterion is: surviving this admission, not having the most future left. Most US protocols exclude expected lifespan on purpose."
  }
];

class PhilTriageSwitchboard extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    if (!document.getElementById('tsb-style')) {
      const s = el('style'); s.id = 'tsb-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.prompt = this.getAttribute('prompt') ||
      'Compare how moral factors change across rail and hospital dilemmas.';
    this.idx = 0;
    this.build();
    this.render();
  }

  build() {
    this.classList.add('tsb');
    this.innerHTML = '';
    this.append(el('p', 'tsb-prompt', this.prompt));

    const nav = el('div', 'tsb-nav');
    this._prevBtn = el('button', 'tsb-btn', '◀ Prev Case');
    this._nextBtn = el('button', 'tsb-btn', 'Next Case ▶');
    this._stageLbl = el('span', 'tsb-stage-lbl');
    this._prevBtn.onclick = () => { if (this.idx > 0) { this.idx--; this.render(); } };
    this._nextBtn.onclick = () => { if (this.idx < SCENARIOS.length - 1) { this.idx++; this.render(); } };
    nav.append(this._prevBtn, this._stageLbl, this._nextBtn);
    this.append(nav);

    this._grid = el('div', 'tsb-grid');
    this.append(this._grid);

    this._eval = el('div', 'tsb-eval');
    this.append(this._eval);

    this._takeaway = el('div', 'tsb-takeaway');
    this.append(this._takeaway);
  }

  render() {
    const sc = SCENARIOS[this.idx];
    this._stageLbl.textContent = `Case ${this.idx + 1}/${SCENARIOS.length} — ${sc.title}`;
    this._prevBtn.disabled = this.idx === 0;
    this._nextBtn.disabled = this.idx === SCENARIOS.length - 1;

    this._grid.innerHTML = `
      <div class="tsb-box">
        <h4>Scenario & Intervention</h4>
        <p><strong>Domain:</strong> ${sc.domain}</p>
        <p><strong>Action:</strong> ${sc.action}</p>
        <div class="tsb-factors">
          <div class="tsb-factor"><span>Net Lives Saved</span><span class="tsb-factor-val good">${sc.netLives}</span></div>
          <div class="tsb-factor"><span>Physical Contact</span><span class="tsb-factor-val">${sc.contact}</span></div>
        </div>
      </div>
      <div class="tsb-box">
        <h4>Causal Mechanism</h4>
        <div class="tsb-factors">
          <div class="tsb-factor"><span>Type of Agency</span><span class="tsb-factor-val">${sc.agency}</span></div>
          <div class="tsb-factor"><span>Intention vs Side Effect</span><span class="tsb-factor-val ${sc.intention.startsWith('Intended') ? 'bad' : 'good'}">${sc.intention}</span></div>
        </div>
      </div>
    `;

    this._eval.innerHTML = `
      <div class="tsb-badge ${sc.utilitarian.startsWith('Permissible') ? 'permit' : 'conflict'}">
        <strong>Consequentialism</strong><br>${sc.utilitarian}
      </div>
      <div class="tsb-badge ${sc.deontology.startsWith('Permissible') ? 'permit' : sc.deontology.startsWith('Impermissible') ? 'forbid' : 'conflict'}">
        <strong>Deontology / Rights</strong><br>${sc.deontology}
      </div>
      <div class="tsb-badge ${sc.doubleEffect.startsWith('Passes') ? 'permit' : 'forbid'}">
        <strong>Double Effect</strong><br>${sc.doubleEffect}
      </div>
    `;

    this._takeaway.innerHTML = `<strong>💡 Philosophical Insight:</strong> ${sc.takeaway}`;
  }
}

customElements.define('phil-triage-switchboard', PhilTriageSwitchboard);
