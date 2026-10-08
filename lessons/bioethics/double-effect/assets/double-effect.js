/* =====================================================================
   Lesson-local visualizations for "The Case of the Merciful Dose".
   Both are ungraded explorations (not quiz widgets).

   <phil-conditions prompt="…">
     <script type="application/json">
     { "conditions": [ { "id": "act", "label": "…", "q": "…" } ],
       "cases": [ { "name": "…", "story": "…",
                    "pass": { "act": true }, "why": { "act": "…" },
                    "verdict": "…" } ] }
     </script>
   </phil-conditions>
     Pick a case, answer Yes or No for each condition, and see what the
     doctrine says and why. `pass` holds the doctrine's own answer.

   <phil-fourbox prompt="…">
     <script type="application/json">
     { "rows": ["…", "…"], "cols": ["…", "…"],
       "cells": ["row 1 col 1", "row 1 col 2", "row 2 col 1", "row 2 col 2"] }
     </script>
   </phil-fourbox>
     A two-by-two grid of cases with the same outcome. The student marks each
     Permitted or Wrong, and the widget says which distinction their answers
     follow. Rows are act / stop treatment; columns are death aimed at / death
     only foreseen.
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

const STYLE = `
.de { display:block; margin:12px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); }
.de-prompt { margin:0 0 10px; }
.de-row { display:flex; flex-wrap:wrap; align-items:center; gap:6px; }
.de-btn { font:inherit; font-size:16px; padding:5px 11px; background:var(--bg); color:var(--ink);
          border:2px solid var(--border); cursor:pointer; }
.de-btn[aria-pressed="true"] { background:#133a24; border-color:var(--good); color:var(--good); font-weight:bold; }
.de-btn[aria-pressed="true"]::before { content:"✔ "; }
.de-h { font-family:var(--pixel); font-size:10px; line-height:1.5; margin:0 0 5px; color:var(--accent-3); }
.de-box { background:var(--panel); border:3px solid var(--border); padding:7px 10px; }
.de-box p { margin:0 0 5px; }
.de-box p:last-child { margin-bottom:0; }
.de-out { background:var(--panel); border:3px solid var(--border); padding:8px 10px; margin:8px 0 0; min-height:2.9em; }
.de-out p { margin:0 0 4px; }
.de-out p:last-child { margin-bottom:0; }
.de-note { color:var(--muted); }

/* ---- conditions ---- */
.cd-story { margin:8px 0; }
.cd-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(400px, 1fr)); gap:8px; }
@media (max-width:650px) { .cd-grid { grid-template-columns:1fr; } }
.cd-why { margin-top:5px; }
.cd-why.is-agree strong { color:var(--good); }
.cd-why.is-differ strong { color:#ffcf5a; }

/* ---- fourbox ---- */
.fb-grid { display:grid; grid-template-columns:auto 1fr 1fr; gap:8px; align-items:stretch; }
.fb-col, .fb-rowh { font-family:var(--pixel); font-size:10px; line-height:1.5; color:var(--accent-3); }
.fb-col { text-align:center; align-self:end; }
.fb-rowh { align-self:center; max-width:9em; }
.fb-cell { display:flex; flex-direction:column; justify-content:space-between; gap:6px; }
@media (max-width:650px) {
  .fb-grid { grid-template-columns:1fr; }
  .fb-col, .fb-rowh, .fb-corner { display:none; }
}
`;

const addStyle = () => {
  if (document.getElementById('de-style')) return;
  const s = el('style'); s.id = 'de-style'; s.textContent = STYLE; document.head.append(s);
};

const toggleBtn = (label, onclick) => {
  const b = el('button', 'de-btn'); b.type = 'button'; b.textContent = label;
  b.setAttribute('aria-pressed', 'false');
  b.onclick = onclick;
  return b;
};

/* ------------------------------------------------------------------ */

class PhilConditions extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.data = readJSON(this, { conditions: [], cases: [] });
    this.ci = 0;
    this.ans = {};
    this.classList.add('de', 'phil-dense');
    const prompt = this.getAttribute('prompt') || 'Pick a case and test it.';
    this.innerHTML = '';
    this.append(el('p', 'de-prompt', prompt));

    const cases = el('div', 'de-row');
    cases.setAttribute('role', 'group'); cases.setAttribute('aria-label', 'Cases');
    this._caseBtns = this.data.cases.map((c, i) => {
      const b = toggleBtn(c.name, () => { this.ci = i; this.ans = {}; this.render(); });
      cases.append(b); return b;
    });
    this.append(cases);

    this._story = el('p', 'cd-story');
    this.append(this._story);

    const grid = el('div', 'cd-grid');
    this._rows = this.data.conditions.map((cond, i) => {
      const box = el('div', 'de-box');
      const h = el('h2', 'de-h', `${i + 1}. ${cond.label}`); h.id = `cd-h-${i}`;
      const q = el('p', null, cond.q);
      const row = el('div', 'de-row');
      row.setAttribute('role', 'group'); row.setAttribute('aria-labelledby', h.id);
      const yes = toggleBtn('Yes', () => { this.ans[cond.id] = true; this.render(); });
      const no = toggleBtn('No', () => { this.ans[cond.id] = false; this.render(); });
      row.append(yes, no);
      const why = el('p', 'cd-why');
      box.append(h, q, row, why);
      grid.append(box);
      return { cond, yes, no, why };
    });
    this.append(grid);

    this._out = el('div', 'de-out');
    this._out.setAttribute('aria-live', 'polite');
    this.append(this._out);
    this.render();
  }

  render() {
    const c = this.data.cases[this.ci];
    if (!c) return;
    this._caseBtns.forEach((b, i) => b.setAttribute('aria-pressed', String(i === this.ci)));
    this._story.innerHTML = `<strong>${c.name}.</strong> ${c.story}`;

    let open = 0;
    for (const { cond, yes, no, why } of this._rows) {
      const a = this.ans[cond.id];
      yes.setAttribute('aria-pressed', String(a === true));
      no.setAttribute('aria-pressed', String(a === false));
      if (a === undefined) { open++; why.className = 'cd-why'; why.innerHTML = ''; continue; }
      const truth = c.pass[cond.id];
      const agree = a === truth;
      why.className = 'cd-why ' + (agree ? 'is-agree' : 'is-differ');
      why.innerHTML = `<strong>${agree ? '✔ The doctrine agrees.' : `✘ The doctrine says ${truth ? 'yes' : 'no'}.`}</strong> ${c.why[cond.id]}`;
    }

    this._out.innerHTML = open
      ? `<p class="de-note">Answer all four conditions to see the doctrine's verdict. ${open} to go.</p>`
      : `<p>${c.verdict}</p>`;
  }
}

/* ------------------------------------------------------------------ */

/* Keys are the four answers in reading order, P = permitted, W = wrong. */
const READINGS = {
  WPWP: 'Your answers follow <strong>intention</strong> alone. Aiming at death is wrong whether the doctor acts or stops, and foreseeing it is not. This is how Sullivan reads the traditional view.',
  WWPP: 'Your answers follow <strong>killing versus letting die</strong> alone. Giving a drug is wrong and stopping treatment is not, whatever the doctor aims at. Smith and Jones are aimed at this view.',
  WPPP: 'Only one box is wrong for you: acting with death as the aim. You need <strong>both</strong> distinctions to pick out that box. Many medical codes read this way.',
  PPPP: 'You permit all four, so <strong>neither</strong> distinction matters to you. Rachels would agree. For him the patient\'s wishes and suffering decide it.',
  WWWW: 'You forbid all four, so <strong>neither</strong> distinction matters to you. On this view Mr. Thorne must stay on every treatment and go without the dose. Very few people accept that.',
  WWWP: 'Only one box is permitted for you: stopping treatment without aiming at death. That is the strictest version of the traditional view, and it rules out Watson\'s dose.',
};

class PhilFourbox extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    const d = readJSON(this, { rows: [], cols: [], cells: [] });
    this.ans = [null, null, null, null];
    this.classList.add('de', 'phil-dense');
    const prompt = this.getAttribute('prompt') || 'Judge each case.';
    this.innerHTML = '';
    this.append(el('p', 'de-prompt', prompt));

    const grid = el('div', 'fb-grid');
    grid.append(el('div', 'fb-corner'), el('div', 'fb-col', d.cols[0]), el('div', 'fb-col', d.cols[1]));
    this._btns = [];
    d.cells.forEach((text, i) => {
      if (i % 2 === 0) grid.append(el('div', 'fb-rowh', d.rows[i / 2]));
      const cell = el('div', 'de-box fb-cell');
      const p = el('p', null, text); p.id = `fb-p-${i}`;
      const row = el('div', 'de-row');
      row.setAttribute('role', 'group'); row.setAttribute('aria-labelledby', p.id);
      const ok = toggleBtn('Permitted', () => { this.ans[i] = 'P'; this.render(); });
      const bad = toggleBtn('Wrong', () => { this.ans[i] = 'W'; this.render(); });
      row.append(ok, bad);
      cell.append(p, row);
      grid.append(cell);
      this._btns.push([ok, bad]);
    });
    this.append(grid);

    this._out = el('div', 'de-out');
    this._out.setAttribute('aria-live', 'polite');
    this.append(this._out);
    this.render();
  }

  render() {
    this._btns.forEach(([ok, bad], i) => {
      ok.setAttribute('aria-pressed', String(this.ans[i] === 'P'));
      bad.setAttribute('aria-pressed', String(this.ans[i] === 'W'));
    });
    const open = this.ans.filter(a => !a).length;
    if (open) {
      this._out.innerHTML = `<p class="de-note">The patient dies in every box. Judge all four. ${open} to go.</p>`;
      return;
    }
    const key = this.ans.join('');
    this._out.innerHTML = `<p>${READINGS[key]
      || 'Your answers don\'t follow either distinction all the way. Find the box you would find hardest to defend, and ask what makes it different from the one beside it.'}</p>`;
  }
}

customElements.define('phil-conditions', PhilConditions);
customElements.define('phil-fourbox', PhilFourbox);
