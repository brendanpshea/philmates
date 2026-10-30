/* =====================================================================
   <phil-intake prompt="…"> — one box, or four questions?

   A guided exercise in five steps. The clinic's old form has one box,
   Sex: M or F. Five patients sit in a table against four tasks the
   clinic must get right:

     Pap test      (does the patient have a cervix?)
     Hemophilia    (how many X chromosomes?)
     Address       (Mr. or Ms.?)
     Insurance     (what sex do the insurer's records show?)

     0. Each cell is filled from the one box, with ✓ or ✗. The box gets
        13 of 20 right; Mr. Adeyemi's row is the common case, all ✓.
     1–4. For each task, pick the question a new form should ask:
        organs present, chromosomes, legal sex, or gender identity and
        name. A wrong pick gets one sentence saying which patient it fails;
        a right pick fills that column from the new question, all ✓.
     5. The new form, and the takeaway.

   The four questions are taught on the slide before this one; the graded
   item after it uses new tasks, so nothing graded depends on the widget.

   Teaching widget: ungraded, no completion hook, no persistence, the same
   contract as <phil-shortcut>.

   Headings are h2: the widget sits under the slide's h1.
   Type is sized to project: nothing below 15px.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

// box: what the patient ticked on the old form.
const PATIENTS = [
  { name: 'Mr. Adeyemi, 70', facts: 'Has a prostate. XY. His ID says M.',
    box: 'M', cervix: false, x: 1, legal: 'M', title: 'Mr.' },
  { name: 'Ruth, 62', facts: 'Had a hysterectomy that removed her cervix. XX. Her ID says F.',
    box: 'F', cervix: false, x: 2, legal: 'F', title: 'Ms.' },
  { name: 'Dana, 30', facts: 'Has complete androgen insensitivity: XY, no uterus or cervix. Her ID says F.',
    box: 'F', cervix: false, x: 1, legal: 'F', title: 'Ms.' },
  { name: 'Eli, 28', facts: 'A trans man. Has a cervix. XX. His ID still says F.',
    box: 'M', cervix: true, x: 2, legal: 'F', title: 'Mr.' },
  { name: 'Orlando, 36 (or so)', facts: 'Has a cervix. Chromosomes never tested. Her ID says F, as her lawsuits settled.',
    box: 'F', cervix: true, x: null, legal: 'F', title: 'Ms.' },
];

const FIELDS = {
  organs: 'Organs present',
  chrom: 'Chromosomes',
  legal: 'Legal sex',
  identity: 'Gender identity and name',
};

/* Each task: what the one box says (fromBox), the right answer (truth),
   the field that gives it, and why each other field fails. */
const TASKS = [
  { key: 'pap', label: 'Pap test', ask: 'Does the patient need a Pap test for cervical cancer?',
    fromBox: p => p.box === 'F' ? 'Pap test' : 'No Pap',
    truth: p => p.cervix ? 'Pap test' : 'No Pap',
    field: 'organs',
    right: 'A Pap test checks the cervix, so the form needs to know who has one. Ruth\'s case is common: about one in five US women has had a hysterectomy, though not every one removes the cervix.',
    wrong: {
      chrom: 'Chromosomes don\'t show organs. Ruth is XX and has had her cervix removed.',
      legal: 'An ID can\'t show that Ruth and Dana have no cervix.',
      identity: 'Eli goes by Mr. and still needs a Pap test.',
    } },
  { key: 'gene', label: 'Hemophilia', ask: 'Hemophilia is carried on the X chromosome. How many X chromosomes does the patient have?',
    fromBox: p => p.box === 'F' ? '2 X' : '1 X',
    truth: p => p.x === null ? 'Test first' : `${p.x} X`,
    field: 'chrom',
    right: 'Only the chromosomes answer this. Dana has one X, Eli has two, and nobody has ever tested Orlando, so the form says so.',
    wrong: {
      organs: 'Organs don\'t show chromosomes. Ruth and Dana both lack a cervix, but Ruth is XX and Dana is XY.',
      legal: 'Dana\'s ID says F, and she has one X chromosome.',
      identity: 'Dana goes by Ms., and she has one X chromosome.',
    } },
  { key: 'title', label: 'Address', ask: 'Which title has the patient asked staff to use, Mr. or Ms.?',
    fromBox: p => p.box === 'F' ? 'Ms.' : 'Mr.',
    truth: p => p.title,
    field: 'identity',
    right: 'The title a patient asks for is recorded with their name and gender identity. Here the old box happened to get it right, because each patient ticked the box they go by.',
    wrong: {
      organs: 'Organs don\'t say what title anyone uses.',
      chrom: 'Dana is XY and asked for Ms.',
      legal: 'Eli\'s ID still says F, but he asked for Mr.',
    } },
  { key: 'claim', label: 'Insurance', ask: 'What sex must the insurance claim show to match the insurer\'s records?',
    fromBox: p => p.box,
    truth: p => p.legal,
    field: 'legal',
    right: 'The insurer checks the claim against its own records, which follow the patient\'s ID. Eli ticked M, but his records still say F.',
    wrong: {
      organs: 'The insurer checks its records, not the patient\'s anatomy.',
      chrom: 'No insurer has Dana\'s chromosomes on file. It checks the sex its records show.',
      identity: 'Eli goes by Mr., but his insurer\'s records still say F, so a claim marked M may be rejected.',
    } },
];

const STYLE = `
.ik { display:block; margin:10px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); }
phil-slide .ik-prompt { margin:0 0 8px; font-size:17px; line-height:1.45; max-width:none; }
.ik-table { width:100%; border-collapse:collapse; margin:0 0 10px; }
.ik-table th, .ik-table td { border:3px solid var(--border); padding:5px 8px; font-size:15px; line-height:1.3; }
.ik-table thead th { background:var(--panel); color:var(--muted); font-weight:700; text-align:center; }
.ik-table thead th.ik-on { color:var(--ink); outline:3px solid var(--accent-3); outline-offset:-3px; }
.ik-table th[scope="row"] { text-align:left; background:var(--panel); font-weight:400; color:var(--muted); }
.ik-table th[scope="row"] b { color:var(--ink); display:block; }
.ik-table td { text-align:center; background:var(--panel-2); font-weight:700; white-space:nowrap; }
.ik-table td.ik-wrong { border-color:var(--bad); }
.ik-table td.ik-fixed { background:var(--panel); }
.ik-panel { background:var(--panel); border:3px solid var(--border); padding:10px 12px; }
phil-slide .ik-panel p { margin:4px 0 0; font-size:16px; line-height:1.4; max-width:none; }
.ik-panel .ik-result { color:var(--ink); font-weight:700; }
.ik-panel .ik-why { color:var(--muted); }
.ik-btns { display:flex; flex-wrap:wrap; gap:6px; margin:8px 0 2px; }
.ik-btn { font-family:var(--pixel); font-size:9px; line-height:1.5; padding:8px 9px;
          background:var(--panel-2); color:var(--ink); border:3px solid var(--border);
          box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.ik-btn:hover:not(:disabled) { background:#313a5e; }
.ik-btn:disabled { opacity:.6; cursor:default; text-decoration:line-through; }
.ik-form { list-style:none; margin:6px 0 0; padding:0; display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:4px 14px; }
phil-slide .ik-form li { margin:0; padding:0; font-size:16px; max-width:none; }
phil-slide .ik-form li::before { content:none; }
.ik-form li span { color:var(--muted); }
.ik-take { border-left:4px solid var(--accent-2); padding:6px 10px; background:var(--panel-2); }
`;

class PhilIntake extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;
    if (!document.getElementById('ik-style')) {
      const s = el('style'); s.id = 'ik-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.classList.add('ik', 'phil-dense');
    const prompt = this.getAttribute('prompt');
    this.innerHTML = '';
    if (prompt) this.append(el('p', 'ik-prompt', prompt));
    this._table = el('table', 'ik-table');
    this._panel = el('div', 'ik-panel');
    this._panel.setAttribute('aria-live', 'polite');
    this.append(this._table, this._panel);
    this.reset();
  }

  reset() {
    this.stage = 0;          // 0 intro · 1–4 one task each · 5 done
    this.fixed = new Set();  // task keys answered from the new form
    this.tried = new Set();  // wrong fields tried on the current task
    this.last = null;        // { text, why } after a pick
    this.draw();
    this.render();
  }

  get task() { return TASKS[this.stage - 1]; }

  // One cell: from the new field if that task is fixed, else from the box.
  cell(t, p) {
    const val = this.fixed.has(t.key) ? t.truth(p) : t.fromBox(p);
    return { val, ok: val === t.truth(p) };
  }

  score() {
    let n = 0;
    TASKS.forEach(t => PATIENTS.forEach(p => { if (this.cell(t, p).ok) n++; }));
    return n;
  }

  draw() {
    const t = this._table;
    const on = this.stage >= 1 && this.stage <= 4 ? this.task.key : null;
    t.innerHTML = '';
    t.setAttribute('aria-label', 'Each patient, and what the clinic gets for each task');
    const head = el('thead');
    const hr = el('tr');
    hr.append(el('th', null, 'Patient'));
    TASKS.forEach(task => {
      const th = el('th', task.key === on ? 'ik-on' : null, task.label);
      th.scope = 'col';
      hr.append(th);
    });
    head.append(hr);
    const body = el('tbody');
    PATIENTS.forEach(p => {
      const tr = el('tr');
      const th = el('th', null, `<b>${p.name}</b>`);
      th.scope = 'row';
      th.append(p.facts + ` Ticked ${p.box}.`);
      tr.append(th);
      TASKS.forEach(task => {
        const { val, ok } = this.cell(task, p);
        const td = el('td', (ok ? '' : 'ik-wrong') + (this.fixed.has(task.key) ? ' ik-fixed' : ''));
        td.textContent = `${val} ${ok ? '✓' : '✗'}`;
        td.setAttribute('aria-label', `${task.label}: ${val}, ${ok ? 'right' : 'wrong'}`);
        tr.append(td);
      });
      body.append(tr);
    });
    t.append(head, body);
  }

  render() {
    const p = this._panel;
    p.innerHTML = '';
    if (this.stage === 0) {
      p.append(el('p', 'ik-result', `Filled in from the one box, the clinic gets ${this.score()} of 20 right.`));
      p.append(el('p', 'ik-why', 'These five patients were picked to show where the box fails. For most patients it gets everything right, as it does for Mr. Adeyemi.'));
      const row = el('div', 'ik-btns');
      row.append(this.button('Fix the form, one task at a time', () => { this.stage = 1; this.draw(); this.render(); }));
      p.append(row);
    } else if (this.stage <= 4) {
      const t = this.task;
      if (this.last) {
        p.append(el('p', 'ik-result', this.last.text));
        if (this.last.why) p.append(el('p', 'ik-why', this.last.why));
      }
      if (!this.fixed.has(t.key)) {
        p.append(el('p', null, `<strong>${t.label}.</strong> ${t.ask} Which question should the new form ask?`));
        const row = el('div', 'ik-btns');
        Object.entries(FIELDS).forEach(([key, label]) => {
          const b = this.button(label, () => this.pick(key));
          if (this.tried.has(key)) b.disabled = true;
          row.append(b);
        });
        p.append(row);
      } else {
        const row = el('div', 'ik-btns');
        const next = this.stage < 4 ? `Next task: ${TASKS[this.stage].label}` : 'See the new form';
        row.append(this.button(next, () => {
          this.stage++;
          this.tried = new Set();
          this.last = null;
          this.draw();
          this.render();
        }));
        p.append(row);
      }
    } else {
      p.append(el('p', 'ik-result', 'The new form asks four questions instead of one box:'));
      const ul = el('ul', 'ik-form');
      ul.innerHTML = Object.values(FIELDS).map(f => `<li>☐ ${f}</li>`).join('');
      p.append(ul);
      p.append(el('p', 'ik-take', 'For most patients, all four answers point the same way. The form keeps them separate for the patients whose answers don\'t.'));
      const row = el('div', 'ik-btns');
      row.append(this.button('Start over', () => this.reset()));
      p.append(row);
    }
    if (this._started) p.querySelector('button:not(:disabled)')?.focus({ preventScroll: true });
    this._started = true;
  }

  pick(key) {
    const t = this.task;
    if (key === t.field) {
      this.fixed.add(t.key);
      this.last = { text: `Right: ${FIELDS[key].toLowerCase()}. That column is now all ✓.`, why: t.right };
    } else {
      this.tried.add(key);
      this.last = { text: `${FIELDS[key]} doesn't answer this. Try another.`, why: t.wrong[key] };
    }
    this.draw();
    this.render();
  }

  button(label, onClick) {
    const b = el('button', 'ik-btn', label);
    b.type = 'button';
    b.addEventListener('click', onClick);
    return b;
  }
}

customElements.define('phil-intake', PhilIntake);
