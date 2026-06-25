/* =====================================================================
   <phil-balance> — "The Scales of Van Helsing" (lesson-local visualization)
   A conflict-of-duties case. The student decides which of Beauchamp &
   Childress's conditions for a JUSTIFIED INFRINGEMENT are met; the scale
   tips, and only when every condition is satisfied does the override read
   as justified — at which point the MORAL RESIDUE (what's still owed) shows.

   Ungraded exploration (not a quiz widget).
   Authoring:
     <phil-balance
        case="The werewolf hurts himself every transformation but refuses sedation."
        action="Sedate him against his wishes, for his own safety"
        infringed="Respect for autonomy"
        honored="Beneficence / nonmaleficence"
        residue="You still owe him an honest debrief, an apology, and a plan he can consent to next time.">
       <phil-cond>You have good reasons: untreated, he is seriously and repeatedly injured.</phil-cond>
       ...
     </phil-balance>
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const STYLE = `
.pb { display:block; margin:14px 0; padding:14px 16px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); font-size:15px; line-height:1.4; }
.pb-case { margin:0 0 4px; }
.pb-action { margin:0 0 10px; color:var(--accent-3); }
.pb-action b { color:var(--ink); }

.pb-scale { position:relative; height:80px; margin:2px 0 10px; }
.pb-post { position:absolute; left:50%; bottom:0; width:4px; height:70px; margin-left:-2px; background:var(--muted); }
.pb-base { position:absolute; left:50%; bottom:0; width:60px; height:6px; margin-left:-30px; background:var(--muted); }
.pb-beam { position:absolute; left:50%; top:14px; width:240px; height:6px; margin-left:-120px;
           background:var(--ink); transform-origin:center; transition:transform .35s ease-out; }
.pb-pan { position:absolute; top:24px; width:120px; text-align:center; transition:transform .35s ease-out; }
.pb-pan.left { left:calc(50% - 130px); }
.pb-pan.right { left:calc(50% + 10px); }
.pb-pan .dish { height:8px; border:3px solid var(--border); }
.pb-pan.left .dish { background:var(--accent-2); }
.pb-pan.right .dish { background:var(--accent); }
.pb-pan .lbl { font-size:13px; color:var(--muted); margin-top:6px; }

.pb-conds { list-style:none; padding:0; margin:0 0 10px; display:flex; flex-direction:column; gap:6px; }
.pb-conds li { display:flex; gap:10px; align-items:flex-start; background:var(--panel); border:3px solid var(--border); padding:8px 10px; cursor:pointer; }
.pb-conds li.met { border-color:var(--good); }
.pb-conds input { width:18px; height:18px; flex:none; margin-top:2px; accent-color:var(--good); }

.pb-verdict { font-family:var(--pixel); font-size:11px; line-height:1.5; padding:12px; border:3px solid var(--border); }
.pb-verdict.no { background:var(--panel); color:var(--muted); }
.pb-verdict.yes { background:#133a24; color:var(--good); }
.pb-residue { margin-top:10px; padding:12px; border:3px solid var(--border); background:#3a3413; color:#ffd24a; display:none; }
.pb-residue.show { display:block; }
.pb-residue b { color:#fff; }
`;

class PhilBalance extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    if (!document.getElementById('pb-style')) {
      const s = el('style'); s.id = 'pb-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.conds = [...this.querySelectorAll('phil-cond')].map(c => c.textContent.trim());
    this.data = {
      caseText: this.getAttribute('case') || '',
      action: this.getAttribute('action') || '',
      infringed: this.getAttribute('infringed') || 'Principle A',
      honored: this.getAttribute('honored') || 'Principle B',
      residue: this.getAttribute('residue') || '',
      instruction: this.getAttribute('prompt') ||
        'Adjust the case below. The override is justified only when every factor is in place — switch one off and watch it collapse.',
    };
    this.build();
    this.render();
  }

  build() {
    this.classList.add('pb');
    this.innerHTML = '';
    this.append(
      el('p', 'pb-case', `<em>${this.data.caseText}</em>`),
      el('p', 'pb-action', `<b>Proposed action:</b> ${this.data.action}`)
    );

    // scale
    const scale = el('div', 'pb-scale');
    this._beam = el('div', 'pb-beam');
    const post = el('div', 'pb-post'), base = el('div', 'pb-base');
    this._left = el('div', 'pb-pan left');
    this._left.append(el('div', 'dish'), el('div', 'lbl', this.data.infringed));
    this._right = el('div', 'pb-pan right');
    this._right.append(el('div', 'dish'), el('div', 'lbl', this.data.honored));
    scale.append(this._beam, post, base, this._left, this._right);
    this.append(scale);

    // conditions
    const list = el('ul', 'pb-conds');
    this._items = this.conds.map(text => {
      const li = el('li');
      const box = el('input'); box.type = 'checkbox';
      box.onchange = () => { li.classList.toggle('met', box.checked); this.render(); };
      li.onclick = e => { if (e.target !== box) { box.checked = !box.checked; box.onchange(); } };
      li.append(box, el('span', null, text));
      list.append(li);
      return box;
    });
    this.append(el('p', null, this.data.instruction), list);

    this._verdict = el('div', 'pb-verdict no');
    this._residue = el('div', 'pb-residue');
    this.append(this._verdict, this._residue);
  }

  render() {
    const total = this._items.length;
    const met = this._items.filter(b => b.checked).length;
    const frac = total ? met / total : 0;

    const deg = (0.5 - frac) * 22;              // met=0 → infringed side down; all met → honored down
    this._beam.style.transform = `rotate(${deg}deg)`;
    this._left.style.transform = `translateY(${deg}px)`;
    this._right.style.transform = `translateY(${-deg}px)`;

    const justified = met === total && total > 0;
    this._verdict.className = 'pb-verdict ' + (justified ? 'yes' : 'no');
    this._verdict.innerHTML = justified
      ? `✔ Justified infringement — every condition is met, so overriding ${this.data.infringed.toLowerCase()} is defensible.`
      : `Weighing… ${met}/${total} conditions met. An override isn't justified until <em>all</em> are satisfied.`;

    this._residue.classList.toggle('show', justified);
    if (justified) this._residue.innerHTML = `<b>But there is moral residue.</b> ${this.data.residue}`;
  }
}

customElements.define('phil-balance', PhilBalance);
