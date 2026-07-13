/* =====================================================================
   <phil-clause-sorter> — "The Council's Docket" (lesson-local visualization)
   Steps through clauses of the Wizard's old constitution. For each one the
   student classifies what the clause is really doing — preventing harm to
   OTHERS, preventing harm to SELF (paternalism), or enforcing MORALITY —
   and sees the council's ruling under Mill's Harm Principle.

   Ungraded exploration (not a quiz widget).
   Authoring:
     <phil-clause-sorter prompt="...">
       <phil-clause verdict="others" note="...">Clause text.</phil-clause>
       <phil-clause verdict="self" note="...">...</phil-clause>
       <phil-clause verdict="morality" note="...">...</phil-clause>
     </phil-clause-sorter>
   verdict: others → KEEP · self → STRIKE (paternalism) · morality → STRIKE
   (legal moralism). note = the council's one-line reasoning.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const CATS = {
  others:   { label: 'Prevents harm to OTHERS', ruling: 'Ruling: KEEP — a legitimate use of Ozma’s power under the Harm Principle.' },
  self:     { label: 'Prevents harm to SELF',   ruling: 'Ruling: STRIKE — paternalism. "His own good… is not a sufficient warrant."' },
  morality: { label: 'Enforces MORALITY',       ruling: 'Ruling: STRIKE — legal moralism. Being immoral isn’t the same as harming someone.' },
};

const STYLE = `
.cs { display:block; margin:14px 0; padding:14px 16px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); font-size:15px; line-height:1.4; }
.cs-prompt { margin:0 0 10px; }
.cs-count { font-size:13px; color:var(--muted); margin:0 0 8px; }
.cs-clause { background:var(--panel); border:3px solid var(--border); padding:12px 14px; margin:0 0 12px;
             font-style:italic; min-height:3em; }
.cs-opts { display:flex; flex-wrap:wrap; gap:8px; margin:0 0 12px; }
.cs-btn { font-family:var(--pixel); font-size:9px; padding:10px 12px; background:var(--panel);
          color:var(--ink); border:3px solid var(--border); box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.cs-btn:disabled { cursor:default; opacity:.45; }
.cs-btn.right { outline:3px solid var(--good); opacity:1; }
.cs-btn.missed { outline:3px solid var(--bad); opacity:1; }
.cs-ruling { font-family:var(--pixel); font-size:10px; line-height:1.6; padding:12px; border:3px solid var(--border); margin:0 0 6px; }
.cs-ruling.good { background:#133a24; color:var(--good); }
.cs-ruling.bad { background:#3a1620; color:var(--bad); }
.cs-note { color:var(--accent-3); margin:0 0 10px; min-height:2.4em; }
.cs-next { font-family:var(--pixel); font-size:9px; padding:8px 10px; background:var(--panel);
           color:var(--ink); border:3px solid var(--border); box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.cs-done { font-family:var(--pixel); font-size:10px; line-height:1.7; padding:12px; border:3px solid var(--border);
           background:#133a24; color:var(--good); }
`;

class PhilClauseSorter extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    if (!document.getElementById('cs-style')) {
      const s = el('style'); s.id = 'cs-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.clauses = [...this.querySelectorAll('phil-clause')].map(c => ({
      text: c.innerHTML.trim(),
      verdict: (c.getAttribute('verdict') || 'others').toLowerCase(),
      note: c.getAttribute('note') || '',
    }));
    this.prompt = this.getAttribute('prompt') ||
      'For each clause: what is it really doing? Classify it, then see the council’s ruling.';
    this.idx = 0;
    this.agreed = 0;
    this.build();
    this.render();
  }

  build() {
    this.classList.add('cs');
    this.innerHTML = '';
    this.append(el('p', 'cs-prompt', this.prompt));
    this._count = el('p', 'cs-count');
    this._clause = el('div', 'cs-clause');
    this._opts = el('div', 'cs-opts');
    this._btns = {};
    for (const key of Object.keys(CATS)) {
      const b = el('button', 'cs-btn', CATS[key].label);
      b.onclick = () => this._pick(key);
      this._btns[key] = b;
      this._opts.append(b);
    }
    this._ruling = el('div', 'cs-ruling'); this._ruling.style.display = 'none';
    this._note = el('p', 'cs-note');
    this._next = el('button', 'cs-next', 'Next clause ▶');
    this._next.style.display = 'none';
    this._next.onclick = () => { this.idx++; this.render(); };
    this.append(this._count, this._clause, this._opts, this._ruling, this._note, this._next);
  }

  render() {
    if (this.idx >= this.clauses.length) {
      this.innerHTML = '';
      this.classList.add('cs');
      this.append(el('div', 'cs-done',
        `📜 Docket cleared — ${this.clauses.length} clauses reviewed. You matched the council’s ruling on ${this.agreed} of ${this.clauses.length}. The hard part was never stating the principle — it was deciding which side of the self/other line a clause really falls on.`));
      return;
    }
    const c = this.clauses[this.idx];
    this._count.textContent = `Clause ${this.idx + 1} of ${this.clauses.length} — from the Wizard’s old constitution`;
    this._clause.innerHTML = `“${c.text}”`;
    for (const b of Object.values(this._btns)) { b.disabled = false; b.className = 'cs-btn'; }
    this._ruling.style.display = 'none';
    this._note.textContent = '';
    this._next.style.display = 'none';
  }

  _pick(key) {
    const c = this.clauses[this.idx];
    const ok = key === c.verdict;
    if (ok) this.agreed++;
    for (const [k, b] of Object.entries(this._btns)) {
      b.disabled = true;
      if (k === c.verdict) b.classList.add('right');          // green = the correct category
      else if (k === key) b.classList.add('missed');          // red = your pick, if wrong
    }
    const cat = CATS[c.verdict];
    this._ruling.className = 'cs-ruling ' + (ok ? 'good' : 'bad');
    this._ruling.innerHTML = (ok
      ? '✔ Correct — the council agrees. '
      : `✘ Not quite — the council classifies this as “${cat.label}.” `) + cat.ruling;
    this._ruling.style.display = 'block';
    this._note.textContent = c.note;
    this._next.style.display = 'inline-block';
    this._next.textContent = this.idx === this.clauses.length - 1 ? 'Finish docket ▶' : 'Next clause ▶';
  }
}

customElements.define('phil-clause-sorter', PhilClauseSorter);
