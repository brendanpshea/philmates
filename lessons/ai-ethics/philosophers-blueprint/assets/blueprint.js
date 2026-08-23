/* =====================================================================
   <phil-blueprint-builder> — "The Essay Blueprint Builder"
   Four tabs walking one prompt from a vague topic to a bluebook
   scaffold: thesis formula, argument mechanism, steelman test, and the
   60-minute time budget. Teaching widget — ungraded, no completion
   hook, no persistence.

   Content lives in PIECES only. The first entry renders on load, so
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
.bpb { display:block; margin:14px 0; padding:14px 16px; background:var(--panel-2);
       border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); font-size:17px; line-height:1.45; }
.bpb-prompt { margin:0 0 10px; font-size:17px; }
.bpb-tabs { display:flex; flex-wrap:wrap; gap:8px; margin:0 0 12px; }
.bpb-btn { font-family:var(--pixel); font-size:9px; line-height:1.5; padding:9px 11px; background:var(--panel);
           color:var(--ink); border:3px solid var(--border); box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.bpb-btn:hover { background:#313a5e; }
.bpb-btn[aria-selected="true"] { background:var(--accent-3); color:var(--bg); }

.bpb-panel { background:var(--panel); border:3px solid var(--border); padding:12px 14px; }
.bpb-panel h4 { font-family:var(--pixel); font-size:11px; line-height:1.5; margin:0 0 10px; color:var(--accent); }
.bpb-panel p { margin:0 0 8px; font-size:16px; }
.bpb-panel ul { margin:0; padding-left:0; list-style:none; }
.bpb-panel li { position:relative; padding-left:1.5em; margin:.4em 0; font-size:16px; line-height:1.45; }
.bpb-panel li::before { content:"\\25B8"; position:absolute; left:0; color:var(--accent-2); }

.bpb-example { margin:10px 0 0; padding:10px 12px; background:var(--bg); border-left:4px solid var(--accent-3); font-size:16px; line-height:1.5; }
.bpb-example .no { color:var(--bad); }
.bpb-example .yes { color:var(--good); }
.bpb-example p { margin:0 0 8px; }
.bpb-example p:last-child { margin:0; }
`;

const PROMPT = 'Should hospitals use automated algorithms to decide which ICU patients receive scarce ventilators during a public health crisis?';

const PIECES = [
  {
    tab: '1. Thesis Formula',
    heading: 'The Thesis Formula: Claim + "Because" Clause',
    body: `<p><strong>Prompt:</strong> <em>${PROMPT}</em></p>`,
    example: `
      <p><span class="no">&#10007; Descriptive / weak:</span> "In this essay I will explore the pros and cons of algorithmic ICU triage."</p>
      <p><span class="yes">&#10003; Strong thesis:</span> "Hospitals should not use algorithmic ventilator triage <strong>because</strong> scoring patients by expected lifespan penalizes those with chronic disabilities, treating dignity as a quantity."</p>`
  },
  {
    tab: '2. Argument Mechanism',
    heading: 'The Step-by-Step Argument Mechanism',
    body: `
      <p><strong>Building the logical bridge:</strong></p>
      <ul>
        <li><strong>Premise 1:</strong> Kantian ethics holds that persons have intrinsic dignity and may never be treated as mere instruments.</li>
        <li><strong>Premise 2:</strong> Lifespan-based triage scores rank patients by the quality-adjusted life years they can expect to gain.</li>
        <li><strong>Premise 3:</strong> That ranking systematically places elderly and disabled patients below others with the same survival odds.</li>
        <li><strong>Conclusion:</strong> So lifespan-based algorithmic triage is impermissible: it prices dignity.</li>
      </ul>`,
    example: `<p>Notice each premise does work the next one needs. Cut any one and the conclusion no longer follows — that is the test of a real mechanism.</p>`
  },
  {
    tab: '3. Steelman Test',
    heading: 'The Principle of Charity: Steelman vs. Strawman',
    body: `<p><strong>Facing the strongest counterargument:</strong></p>`,
    example: `
      <p><span class="no">&#10007; Strawman:</span> "Opponents just love technology and do not care what happens to disabled patients."</p>
      <p><span class="yes">&#10003; Steelman:</span> "A published algorithm applies one standard to every patient. Human triage at hour thirty of a shift does not — it drifts with fatigue and bias, and it cannot be audited afterward."</p>`
  },
  {
    tab: '4. 60-Minute Budget',
    heading: 'The 60-Minute Bluebook Time Budget',
    body: `
      <ul>
        <li><strong>0:00 – 0:10 — Blueprint.</strong> On scrap paper: dissect the prompt, write the thesis with its because-clause, list three premises, sketch the steelman.</li>
        <li><strong>0:10 – 0:50 — Draft.</strong> Write into the bluebook following the scaffold. Define terms, signal transitions, do not re-plan.</li>
        <li><strong>0:50 – 1:00 — Audit.</strong> Hunt missing steps, check the rebuttal does not contradict the thesis, fix unclear sentences.</li>
      </ul>`,
    example: `<p>The ten minutes at the front are not lost writing time. They are what stops you rewriting your thesis in minute thirty-five.</p>`
  }
];

class PhilBlueprintBuilder extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    if (!document.getElementById('bpb-style')) {
      const s = el('style'); s.id = 'bpb-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.classList.add('bpb');
    this.build();
    this.show(0);
  }

  build() {
    const prompt = this.getAttribute('prompt');
    this.innerHTML = '';
    if (prompt) this.append(el('p', 'bpb-prompt', prompt));

    const tabs = el('div', 'bpb-tabs');
    tabs.setAttribute('role', 'tablist');
    this._btns = PIECES.map((p, i) => {
      const b = el('button', 'bpb-btn', p.tab);
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.onclick = () => this.show(i);
      tabs.append(b);
      return b;
    });
    this.append(tabs);

    this._panel = el('div', 'bpb-panel');
    this._panel.setAttribute('role', 'tabpanel');
    this.append(this._panel);
  }

  show(i) {
    const p = PIECES[i];
    this._btns.forEach((b, j) => b.setAttribute('aria-selected', j === i ? 'true' : 'false'));
    this._panel.innerHTML =
      `<h4>${p.heading}</h4>${p.body}` +
      (p.example ? `<div class="bpb-example">${p.example}</div>` : '');
  }
}

customElements.define('phil-blueprint-builder', PhilBlueprintBuilder);
