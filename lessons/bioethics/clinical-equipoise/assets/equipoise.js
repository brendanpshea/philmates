/* =====================================================================
   <phil-equipoise> — "The Panel of Experts" (lesson-local visualization)
   Steps through a sequence of hypothetical interim trial results. At each
   stage, a panel of expert clinicians leans for/against/undecided on the
   drug under test. The widget reads out whether CLINICAL EQUIPOISE still
   holds (a genuine split in the expert community) or has COLLAPSED
   (consensus has formed) — author-specified per stage.

   Ungraded exploration (not a quiz widget).
   Authoring:
     <phil-equipoise prompt="...">
       <phil-stage label="Trial opens" verdict="holds" note="...">
         <phil-expert lean="for">Dr. Álvarez</phil-expert>
         <phil-expert lean="against">Dr. Boyko</phil-expert>
         <phil-expert lean="neutral">Dr. Osei</phil-expert>
       </phil-stage>
       ...
     </phil-equipoise>
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const STYLE = `
.eq { display:block; margin:14px 0; padding:14px 16px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); font-size:15px; line-height:1.4; }
.eq-prompt { margin:0 0 10px; }

.eq-nav { display:flex; align-items:center; gap:10px; margin:0 0 12px; }
.eq-btn { font-family:var(--pixel); font-size:9px; padding:8px 10px; background:var(--panel);
          color:var(--ink); border:3px solid var(--border); box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.eq-btn:disabled { opacity:.35; cursor:default; }
.eq-stage-lbl { font-size:13px; color:var(--muted); }

.eq-panel { display:flex; flex-direction:column; gap:6px; margin:0 0 10px; }
.eq-expert { display:flex; align-items:center; gap:10px; background:var(--panel); border:3px solid var(--border); padding:6px 10px; }
.eq-name { flex:0 0 110px; font-size:13px; }
.eq-track { position:relative; flex:1; height:10px; background:var(--bg); border:2px solid var(--border); }
.eq-dot { position:absolute; top:50%; width:14px; height:14px; margin:-7px 0 0 -7px;
          border:2px solid var(--border); border-radius:50%; transition:left .3s ease-out; }
.eq-dot.eq-for { left:88%; background:var(--good); }
.eq-dot.eq-against { left:2%; background:var(--bad); }
.eq-dot.eq-neutral { left:45%; background:var(--muted); }
.eq-lean-lbl { flex:0 0 74px; text-align:right; font-size:12px; color:var(--muted); }

.eq-agg { display:flex; height:16px; border:3px solid var(--border); overflow:hidden; margin:0 0 10px; }
.eq-agg i { display:block; height:100%; transition:width .3s ease-out; }
.eq-agg-for { background:var(--good); }
.eq-agg-neu { background:var(--muted); }
.eq-agg-against { background:var(--bad); }

.eq-note { color:var(--accent-3); margin:0 0 10px; }

.eq-verdict { font-family:var(--pixel); font-size:11px; line-height:1.5; padding:12px; border:3px solid var(--border); }
.eq-verdict.yes { background:#133a24; color:var(--good); }
.eq-verdict.no { background:#3a1620; color:var(--bad); }
`;

class PhilEquipoise extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    if (!document.getElementById('eq-style')) {
      const s = el('style'); s.id = 'eq-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.stages = [...this.querySelectorAll('phil-stage')].map(s => ({
      label: s.getAttribute('label') || '',
      note: s.getAttribute('note') || '',
      verdict: (s.getAttribute('verdict') || 'holds').toLowerCase(),
      experts: [...s.querySelectorAll('phil-expert')].map(e => ({
        name: e.textContent.trim(),
        lean: (e.getAttribute('lean') || 'neutral').toLowerCase(),
      })),
    }));
    this.prompt = this.getAttribute('prompt') ||
      'Step through the interim results and watch whether the panel is still genuinely split.';
    this.idx = 0;
    this.build();
    this.render();
  }

  build() {
    this.classList.add('eq');
    this.innerHTML = '';
    this.append(el('p', 'eq-prompt', this.prompt));

    const nav = el('div', 'eq-nav');
    this._prevBtn = el('button', 'eq-btn', '◀ Prev');
    this._nextBtn = el('button', 'eq-btn', 'Next ▶');
    this._stageLbl = el('span', 'eq-stage-lbl');
    this._prevBtn.onclick = () => { if (this.idx > 0) { this.idx--; this.render(); } };
    this._nextBtn.onclick = () => { if (this.idx < this.stages.length - 1) { this.idx++; this.render(); } };
    nav.append(this._prevBtn, this._stageLbl, this._nextBtn);
    this.append(nav);

    this._panel = el('div', 'eq-panel');
    this.append(this._panel);

    this._aggBar = el('div', 'eq-agg');
    this._aggFor = el('i', 'eq-agg-for');
    this._aggNeu = el('i', 'eq-agg-neu');
    this._aggAgainst = el('i', 'eq-agg-against');
    this._aggBar.append(this._aggFor, this._aggNeu, this._aggAgainst);
    this.append(this._aggBar);

    this._note = el('p', 'eq-note');
    this.append(this._note);

    this._verdict = el('div', 'eq-verdict');
    this.append(this._verdict);
  }

  render() {
    const stage = this.stages[this.idx];
    this._stageLbl.textContent = `Stage ${this.idx + 1}/${this.stages.length} — ${stage.label}`;
    this._prevBtn.disabled = this.idx === 0;
    this._nextBtn.disabled = this.idx === this.stages.length - 1;

    this._panel.innerHTML = '';
    stage.experts.forEach(ex => {
      const row = el('div', 'eq-expert');
      const track = el('div', 'eq-track');
      track.append(el('div', `eq-dot eq-${ex.lean}`));
      const lbl = ex.lean === 'for' ? 'For' : ex.lean === 'against' ? 'Against' : 'Undecided';
      row.append(el('span', 'eq-name', ex.name), track, el('span', 'eq-lean-lbl', lbl));
      this._panel.append(row);
    });

    const total = stage.experts.length;
    const forN = stage.experts.filter(e => e.lean === 'for').length;
    const againstN = stage.experts.filter(e => e.lean === 'against').length;
    const neuN = total - forN - againstN;
    const pct = n => (total ? Math.round((n / total) * 100) : 0);
    this._aggFor.style.width = pct(forN) + '%';
    this._aggNeu.style.width = pct(neuN) + '%';
    this._aggAgainst.style.width = pct(againstN) + '%';

    this._note.textContent = stage.note;

    const holds = stage.verdict === 'holds';
    this._verdict.className = 'eq-verdict ' + (holds ? 'yes' : 'no');
    this._verdict.innerHTML = holds
      ? `✔ Clinical equipoise holds — the expert community is still genuinely split (${forN} for, ${againstN} against, ${neuN} undecided). Randomizing patients remains defensible.`
      : `⚠ Clinical equipoise has collapsed — the panel has moved to consensus (${forN} for, ${againstN} against, ${neuN} undecided). A DSMB should act: stop, unblind, or amend the trial.`;
  }
}

customElements.define('phil-equipoise', PhilEquipoise);
