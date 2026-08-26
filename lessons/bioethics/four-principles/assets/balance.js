/* =====================================================================
   <phil-balance> — "The Scales of Van Helsing" (lesson-local visualization)
   A conflict-of-duties case. The student decides which of Beauchamp &
   Childress's conditions for a JUSTIFIED INFRINGEMENT the case actually
   meets; the scale tips, and only when the override really is defensible
   does the MORAL RESIDUE (what's still owed) show.

   Ungraded exploration (not a quiz widget). The grading happens in the
   checkset two slides later — a genuinely hard judgment call is a bad
   thing to block completion on.

   Three things stop this from being "tick every box":

   1. THE CASE CHANGES. Each <phil-case> declares, in `holds`, which
      conditions are true *of that case*. The student's job is to read the
      case and set the knobs to match it, so there is no fixed winning
      pattern to memorize. "Check against the case" grades that reading.
   2. DECOYS. A <phil-cond decoy> is a plausible non-condition — "she will
      thank you later" — that never counts toward justification and gets
      named when it's checked. With decoys on the list, all-on is always
      wrong.
   3. GATES, NOT A TALLY. A <phil-cond gate> is necessary on its own: miss
      it and the override fails however many others are met. The lesson
      says balancing is judgment rather than arithmetic, so the widget
      must not hand back a formula that counts to six.

   Authoring:
     <phil-balance
        action="Restrict her access to moon-nectar, for her own good"
        infringed="Respect for autonomy"
        honored="Beneficence / nonmaleficence"
        prompt="Switch on only what THIS case gives you:">
       <phil-cond id="selfonly" gate
          gateNote="Then the harm is not hers alone, and this is not paternalism at all.">
         The harm falls on Ilinca alone.</phil-cond>
       <phil-cond id="addictive">Moon-nectar is addictive, so her refusal is not fully free.</phil-cond>
       <phil-cond decoy
          decoyNote="How she feels afterwards is not what licensed the override.">
         She will thank you once she is well.</phil-cond>

       <phil-case label="As it stands" holds="selfonly addictive"
                  note="Shown after 'Check against the case'."
                  residue="What is still owed even so.">
         The case text the student reads.
       </phil-case>
     </phil-balance>

   `holds` is a space-separated list of <phil-cond> ids. Anything not
   listed is false of that case. Decoys are never listed — they are false
   everywhere, which is the point.
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
/* Case text and scale sit side by side on a projector and stack on a phone.
   This slide is the tallest in the lesson, and a slide that scrolls in class is
   a slide that failed. */
.pb-head { display:flex; gap:16px; align-items:center; margin:0 0 8px; }
.pb-head > .pb-text { flex:1 1 320px; min-width:0; }
.pb-case { margin:0 0 4px; }
.pb-action { margin:0; color:var(--accent-3); }
.pb-action b { color:var(--ink); }

.pb-tabs { display:flex; flex-wrap:wrap; gap:6px; margin:0 0 8px; }
.pb-tab { font-family:var(--pixel); font-size:11px; line-height:1.4; padding:7px 10px; cursor:pointer;
          background:var(--panel); color:var(--muted); border:3px solid var(--border); }
.pb-tab:hover { color:var(--ink); }
.pb-tab[aria-pressed="true"] { background:var(--accent-3); color:#0d1020; border-color:var(--ink); }

.pb-scale { position:relative; height:120px; width:320px; flex:none; margin:0; }
.pb-post { position:absolute; left:50%; bottom:40px; width:4px; height:52px; margin-left:-2px; background:var(--muted); }
.pb-base { position:absolute; left:50%; bottom:40px; width:60px; height:6px; margin-left:-30px; background:var(--muted); }
.pb-beam { position:absolute; left:50%; top:14px; width:200px; height:6px; margin-left:-100px;
           background:var(--ink); transform-origin:center; transition:transform .35s ease-out; }
.pb-pan { position:absolute; top:40px; width:150px; text-align:center; transition:transform .35s ease-out; }
.pb-pan.left { left:calc(50% - 155px); }
.pb-pan.right { left:calc(50% + 5px); }
.pb-pan .dish { height:8px; border:3px solid var(--border); }
.pb-pan.left .dish { background:var(--accent-2); }
.pb-pan.right .dish { background:var(--accent); }
.pb-pan .lbl { font-size:13px; color:var(--muted); margin-top:8px; line-height:1.2; }

.pb-conds { list-style:none; padding:0; margin:0 0 8px; display:grid; gap:6px;
            grid-template-columns:repeat(auto-fit, minmax(400px, 1fr)); }
/* Slide body text is clamp(18px, 2.1vw, 23px), which is right for a bullet and
   too loose for a dense switch list. This matches .phil-belief__text in the
   shared engine — the same projector, the same reading distance, already proven
   at this size — and stays well above the 15px floor for widget text. */
.pb-conds li { background:var(--panel); border:3px solid var(--border); padding:7px 9px; }
.pb-conds li, .pb-conds label { font-size:clamp(16px, 1.5vw, 19px); line-height:1.35; }
.pb-case, .pb-action { font-size:clamp(16px, 1.6vw, 20px); line-height:1.45; }
/* the flex row moved onto the label so the whole row stays clickable */
.pb-conds label { display:flex; gap:10px; align-items:flex-start; cursor:pointer; }
.pb-conds li.met { border-color:var(--good); }
.pb-conds input { width:18px; height:18px; flex:none; margin-top:2px; accent-color:var(--good); }
/* Marked after "Check against the case", never before — the point is that the
   student commits to a reading first. Shape and a word carry the meaning; the
   border colour is only a reinforcement. */
.pb-conds li.misread { border-color:var(--bad); }
.pb-conds .tag { font-family:var(--pixel); font-size:11px; margin-left:auto; padding-left:10px; flex:none; }
.pb-conds li.misread .tag { color:var(--bad); }
.pb-conds li.readright .tag { color:var(--good); }

.pb-check { margin:0 0 8px; }
.pb-verdict { font-family:var(--pixel); font-size:11px; line-height:1.5; padding:10px; border:3px solid var(--border); }
.pb-verdict.no { background:var(--panel); color:var(--muted); }
.pb-verdict.yes { background:#133a24; color:var(--good); }
.pb-verdict.frame { background:#3a1320; color:#ff9ab5; }
.pb-verdict .pb-note { display:block; margin-top:8px; padding-top:8px; border-top:3px solid var(--border);
                       font-family:var(--body); font-size:15px; color:var(--ink); }
.pb-residue { margin-top:8px; padding:10px; border:3px solid var(--border); background:#3a3413; color:#ffd24a; display:none; }
.pb-residue.show { display:block; }
.pb-residue b { color:#fff; }
`;

class PhilBalance extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    if (!document.getElementById('pb-style')) {
      const s = el('style'); s.id = 'pb-style'; s.textContent = STYLE; document.head.append(s);
    }

    this.conds = [...this.querySelectorAll('phil-cond')].map((c, i) => ({
      id: c.getAttribute('id') || `c${i}`,
      text: c.textContent.trim(),
      decoy: c.hasAttribute('decoy'),
      gate: c.hasAttribute('gate'),
      // `frame` marks the gate whose failure changes what kind of problem this
      // is, rather than just leaving the override unearned. Different colour,
      // because "you are in the wrong chapter" is not "not yet".
      frame: c.hasAttribute('frame'),
      gateNote: c.getAttribute('gateNote') || c.getAttribute('gatenote') || '',
      decoyNote: c.getAttribute('decoyNote') || c.getAttribute('decoynote') || '',
    }));

    this.cases = [...this.querySelectorAll('phil-case')].map((c, i) => ({
      label: c.getAttribute('label') || `Case ${i + 1}`,
      text: c.textContent.trim(),
      holds: new Set((c.getAttribute('holds') || '').split(/\s+/).filter(Boolean)),
      note: c.getAttribute('note') || '',
      residue: c.getAttribute('residue') || '',
    }));

    this.data = {
      action: this.getAttribute('action') || '',
      infringed: this.getAttribute('infringed') || 'Principle A',
      honored: this.getAttribute('honored') || 'Principle B',
      instruction: this.getAttribute('prompt') || '',
    };

    this.build();
    this.pick(0);
  }

  build() {
    this.classList.add('pb');
    this.innerHTML = '';

    // case switcher
    const tabs = el('div', 'pb-tabs');
    tabs.setAttribute('role', 'group');
    tabs.setAttribute('aria-label', 'Choose a version of the case');
    this._tabs = this.cases.map((c, i) => {
      const b = el('button', 'pb-tab', c.label);
      b.type = 'button';
      b.onclick = () => this.pick(i);
      tabs.append(b);
      return b;
    });
    this.append(tabs);

    this._case = el('p', 'pb-case');
    const text = el('div', 'pb-text');
    text.append(this._case, el('p', 'pb-action', `<b>Proposed action:</b> ${this.data.action}`));

    // scale
    const scale = el('div', 'pb-scale');
    this._beam = el('div', 'pb-beam');
    const post = el('div', 'pb-post'), base = el('div', 'pb-base');
    this._left = el('div', 'pb-pan left');
    this._left.append(el('div', 'dish'), el('div', 'lbl', this.data.infringed));
    this._right = el('div', 'pb-pan right');
    this._right.append(el('div', 'dish'), el('div', 'lbl', this.data.honored));
    scale.append(this._beam, post, base, this._left, this._right);
    const head = el('div', 'pb-head');
    head.append(text, scale);
    this.append(head);

    // conditions
    const list = el('ul', 'pb-conds');
    this._items = this.conds.map(cond => {
      const li = el('li');
      const box = el('input'); box.type = 'checkbox';
      box.onchange = () => { li.classList.toggle('met', box.checked); this.clearMarks(); this.render(); };
      // A real <label> wrapper, not a click handler on the row: the handler gave
      // the mouse click-anywhere but left the checkbox with no accessible name.
      const lab = el('label');
      const tag = el('span', 'tag', '');
      lab.append(box, el('span', null, cond.text), tag);
      li.append(lab);
      list.append(li);
      return { cond, li, box, tag };
    });
    if (this.data.instruction) this.append(el('p', null, this.data.instruction));
    this.append(list);

    const check = el('button', 'phil-btn phil-btn--primary pb-check', 'Check against the case');
    check.type = 'button';
    check.onclick = () => this.grade();
    this.append(check);

    this._verdict = el('div', 'pb-verdict no');
    // The verdict is the whole payload of the interaction, so it has to be
    // announced rather than only drawn.
    this._verdict.setAttribute('role', 'status');
    this._note = el('div', 'pb-note');
    this._residue = el('div', 'pb-residue');
    this.append(this._verdict, this._residue);
  }

  /* ---- switching cases wipes the board: a reading of case A says nothing
     about case B, and leaving the ticks up invites exactly that mistake. ---- */
  pick(i) {
    this.current = i;
    const c = this.cases[i];
    this._tabs.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    this._case.innerHTML = `<em>${c.text}</em>`;
    this._items.forEach(it => { it.box.checked = false; it.li.classList.remove('met'); });
    this.clearMarks();
    this._note.remove();
    this._residue.classList.remove('show');
    this.render();
  }

  clearMarks() {
    this._items.forEach(it => {
      it.li.classList.remove('misread', 'readright');
      it.tag.textContent = '';
    });
    this._graded = false;
  }

  /* What the student is asserting, and what the case actually supports. */
  claimed() { return this._items.filter(it => it.box.checked); }
  real() { return this.conds.filter(c => !c.decoy); }

  render() {
    const c = this.cases[this.current];
    const on = new Set(this.claimed().map(it => it.cond.id));
    const real = this.real();
    const met = real.filter(x => on.has(x.id)).length;
    const decoysOn = this._items.filter(it => it.box.checked && it.cond.decoy);
    const gatesOff = real.filter(x => x.gate && !on.has(x.id));

    /* The beam still moves with the weight of what's been claimed, but a missing
       gate pins it: an unmet necessary condition is not outvoted by the others. */
    const frac = gatesOff.length ? 0 : (real.length ? met / real.length : 0);
    const deg = (0.5 - frac) * 22;              // met=0 → infringed side down; all met → honored down
    this._beam.style.transform = `rotate(${deg}deg)`;
    this._left.style.transform = `translateY(${deg}px)`;
    this._right.style.transform = `translateY(${-deg}px)`;

    const touched = this._items.some(it => it.box.checked);

    if (!touched && !this._graded) {
      this._verdict.className = 'pb-verdict no';
      this._verdict.innerHTML = `Read the case, then switch on what it supports. `
        + `Not every switch below is one of the conditions.`;
    } else if (decoysOn.length) {
      const d = decoysOn[0].cond;
      this._verdict.className = 'pb-verdict no';
      this._verdict.innerHTML = `<b>That is not one of the conditions.</b> "${d.text}" ${d.decoyNote}`;
    } else if (gatesOff.length) {
      const g = gatesOff[0];
      this._verdict.className = 'pb-verdict ' + (g.frame ? 'frame' : 'no');
      this._verdict.innerHTML = g.frame
        ? `<b>This is not a paternalism case.</b> "${g.text}" does not hold. ${g.gateNote}`
        : `<b>Not justified.</b> "${g.text}" has to hold on its own. ${g.gateNote} `
          + `It is not the kind of condition the others can outvote.`;
    } else if (met === real.length && real.length) {
      this._verdict.className = 'pb-verdict yes';
      this._verdict.innerHTML = `✔ <b>On this reading the override is defensible.</b> `
        + `Every condition holds, so infringing ${this.data.infringed.toLowerCase()} can be justified. `
        + `Now check whether the case really says all that.`;
    } else {
      /* Naming the missing condition matters more than counting them. "5 of 6"
         is the arithmetic the lesson disowns; "the drug is not addictive, so her
         refusal is just a competent adult's choice" is the actual teaching. */
      const missing = real.filter(x => !on.has(x.id));
      this._verdict.className = 'pb-verdict no';
      this._verdict.innerHTML = `<b>Not justified.</b> Still missing: `
        + missing.map(x => `"${x.text}"`).join(' and ')
        + `. Every condition has to hold, so one gap is enough to stop it.`;
    }

    if (this._graded) this._verdict.append(this._note);

    this._residue.classList.toggle('show',
      this._graded && !decoysOn.length && !gatesOff.length && met === real.length && !!c.residue);
    if (this._residue.classList.contains('show'))
      this._residue.innerHTML = `<b>But there is moral residue.</b> ${c.residue}`;
  }

  /* Grade the *reading*, not the verdict: did they see what the case says? */
  grade() {
    const c = this.cases[this.current];
    let wrong = 0;
    this._items.forEach(it => {
      const truth = !it.cond.decoy && c.holds.has(it.cond.id);
      const said = it.box.checked;
      it.li.classList.remove('misread', 'readright');
      if (said === truth) {
        if (said) { it.li.classList.add('readright'); it.tag.textContent = '✔'; }
        else { it.tag.textContent = ''; }
      } else {
        wrong++;
        it.li.classList.add('misread');
        it.tag.textContent = said
          ? (it.cond.decoy ? '✘ not a condition' : '✘ not here')
          : '✘ missed';
      }
    });
    this._graded = true;
    this._note.innerHTML = wrong
      ? `<b>${wrong} ${wrong === 1 ? 'switch does' : 'switches do'} not match the case.</b> `
        + `The marked rows say which way. ${c.note}`
      : `<b>You read the case correctly.</b> ${c.note}`;
    this.render();
  }
}

customElements.define('phil-balance', PhilBalance);
