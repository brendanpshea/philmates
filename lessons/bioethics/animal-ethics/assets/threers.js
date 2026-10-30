/* =====================================================================
   <phil-threers prompt="…"> — the 3Rs workshop

   A guided redesign of an invented study: testing a new anti-rejection
   drug for pig-kidney transplants on 60 mice. Seven proposed changes
   arrive one at a time. For each, the student says which R it is, or
   that it isn't one. A right answer applies the change, and the tally
   (mice used, how much they suffer) updates. A wrong answer gets one
   sentence of feedback and another try.

   One change is a trap: skipping the control group "saves" mice but
   wrecks the science, so every mouse in the study would be wasted. The
   3Rs only count changes that keep the science sound.

   The protocol and its numbers are invented and labeled as such. The 3Rs
   are taught on the slide before this one; the graded item after it uses
   new examples, so nothing graded depends on the widget.

   Teaching widget: ungraded, no completion hook, no persistence, the same
   contract as <phil-shortcut>.

   Type is sized to project: nothing below 15px.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const CHOICES = [
  ['replace', 'Replace'],
  ['reduce', 'Reduce'],
  ['refine', 'Refine'],
  ['none', 'Not a 3R'],
];

// mice: change in mice used. pain: change in the suffering score (0–10).
const CHANGES = [
  { text: 'Test the drug first on kidney organoids grown from human cells, and drop the doses that fail.',
    answer: 'replace', mice: -20, pain: 0,
    right: 'Replace: organoids do part of the mice\'s job in their place.',
    wrong: 'Ask what stands in for the animals here. Organoids do part of the mice\'s job.' },
  { text: 'Ask a statistician for the smallest group size that can still detect a real effect.',
    answer: 'reduce', mice: -10, pain: 0,
    right: 'Reduce: the same answer from fewer animals.',
    wrong: 'The mice are still used, and still treated the same. What changes is how many.' },
  { text: 'Give the mice pain relief after surgery.',
    answer: 'refine', mice: 0, pain: -3,
    right: 'Refine: the same number of mice, suffering less.',
    wrong: 'No animals are replaced, and the number is the same. What changes is how much they suffer.' },
  { text: 'Skip the control group, to save ten mice.',
    answer: 'none', mice: 0, pain: 0,
    right: 'Not a 3R. Without a control group, nobody can tell whether the drug did anything, so every mouse in the study would be wasted. The 3Rs only count changes that keep the science sound.',
    wrong: 'Fewer mice, yes. But ask what the study could still show without a control group.' },
  { text: 'House the mice in groups, with nesting material, instead of alone in bare cages.',
    answer: 'refine', mice: 0, pain: -2,
    right: 'Refine: better living conditions for the animals that are used.',
    wrong: 'The same mice are used. What changes is how they live.' },
  { text: 'Share the results with other labs, so nobody has to repeat the study.',
    answer: 'reduce', mice: -5, pain: 0,
    right: 'Reduce: fewer animals used across the whole field.',
    wrong: 'This one works across labs, not inside this study. What does it cut?' },
  { text: 'Run the first genetic screen in fruit flies instead of mice.',
    answer: 'replace', mice: -5, pain: 0,
    right: 'Replace: fruit flies, which current guidance doesn\'t consider able to suffer, stand in for some of the mice. This is called partial replacement.',
    wrong: 'Something stands in for some of the mice here. Which R is that?' },
];

const START = { mice: 60, pain: 8 };

const STYLE = `
.tr { display:block; margin:10px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); }
phil-slide .tr-prompt { margin:0 0 8px; font-size:17px; line-height:1.45; max-width:none; }
.tr-main { display:grid; grid-template-columns:minmax(0, 1fr) minmax(220px, 280px); gap:14px; align-items:start; }
@media (max-width:900px) { .tr-main { grid-template-columns:1fr; } }
.tr-panel, .tr-tally { background:var(--panel); border:3px solid var(--border); padding:10px 12px; }
phil-slide .tr-panel p, phil-slide .tr-tally p { margin:4px 0 0; font-size:16px; line-height:1.4; max-width:none; }
.tr-panel .tr-change { color:var(--ink); font-weight:700; }
.tr-panel .tr-result { color:var(--ink); font-weight:700; }
.tr-panel .tr-why { color:var(--muted); }
.tr-btns { display:flex; flex-wrap:wrap; gap:6px; margin:8px 0 2px; }
.tr-btn { font-family:var(--pixel); font-size:9px; line-height:1.5; padding:8px 9px;
          background:var(--panel-2); color:var(--ink); border:3px solid var(--border);
          box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.tr-btn:hover:not(:disabled) { background:#313a5e; }
.tr-btn:disabled { cursor:default; text-decoration:line-through; }
.tr-tally h2 { margin:0 0 4px; font-size:16px; color:var(--muted); }
.tr-bar { height:14px; background:var(--panel-2); border:2px solid var(--border); margin:4px 0 2px; }
.tr-bar span { display:block; height:100%; background:var(--accent-2); }
.tr-log { list-style:none; margin:8px 0 0; padding:0; }
phil-slide .tr-log li { margin:0; padding:0; font-size:15px; line-height:1.35; color:var(--muted); max-width:none; }
phil-slide .tr-log li::before { content:none; }
.tr-take { border-left:4px solid var(--accent-2); padding:6px 10px; background:var(--panel-2); }
phil-slide .tr-note { margin:8px 0 0; font-size:15px; color:var(--muted); max-width:none; }
`;

class PhilThreeRs extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;
    if (!document.getElementById('tr-style')) {
      const s = el('style'); s.id = 'tr-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.classList.add('tr', 'phil-dense');
    const prompt = this.getAttribute('prompt');
    this.innerHTML = '';
    if (prompt) this.append(el('p', 'tr-prompt', prompt));
    const main = el('div', 'tr-main');
    this._panel = el('div', 'tr-panel');
    this._panel.setAttribute('aria-live', 'polite');
    this._tally = el('div', 'tr-tally');
    main.append(this._panel, this._tally);
    this.append(main);
    this.append(el('p', 'tr-note', 'An invented study. Real protocols are reviewed by an animal care committee before any work begins.'));
    this.reset();
  }

  reset() {
    this.i = 0;                       // which change is on the table
    this.state = { ...START };
    this.tried = new Set();
    this.last = null;
    this.log = [];
    this.render();
  }

  pick(key) {
    const c = CHANGES[this.i];
    if (key === c.answer) {
      this.state.mice += c.mice;
      this.state.pain = Math.max(0, this.state.pain + c.pain);
      this.log.push(`${CHOICES.find(x => x[0] === key)[1]}: ${c.text}`);
      this.last = { text: c.right, done: true };
    } else {
      this.tried.add(key);
      this.last = { text: 'Not quite.', why: c.wrong };
    }
    this.render();
  }

  next() {
    this.i++;
    this.tried = new Set();
    this.last = null;
    this.render();
  }

  render() {
    const p = this._panel;
    p.innerHTML = '';
    if (this.i < CHANGES.length) {
      const c = CHANGES[this.i];
      p.append(el('p', 'tr-why', `Proposed change ${this.i + 1} of ${CHANGES.length}:`));
      p.append(el('p', 'tr-change', c.text));
      if (this.last) {
        p.append(el('p', 'tr-result', this.last.text));
        if (this.last.why) p.append(el('p', 'tr-why', this.last.why));
      }
      const row = el('div', 'tr-btns');
      if (this.last?.done) {
        row.append(this.button(this.i < CHANGES.length - 1 ? 'Next change' : 'See the new study', () => this.next()));
      } else {
        p.append(el('p', null, 'Which R is it, if any?'));
        CHOICES.forEach(([key, label]) => {
          const b = this.button(label, () => this.pick(key));
          if (this.tried.has(key)) b.disabled = true;
          row.append(b);
        });
      }
      p.append(row);
    } else {
      p.append(el('p', 'tr-result', `The study now uses ${this.state.mice} mice instead of ${START.mice}, and they suffer less.`));
      p.append(el('p', 'tr-take', 'That is what the 3Rs ask: the same science, with fewer animals, suffering less. They don\'t settle whether the study should happen at all. That is the question the three views answer.'));
      const row = el('div', 'tr-btns');
      row.append(this.button('Start over', () => this.reset()));
      p.append(row);
    }
    this.drawTally();
    if (this._started) p.querySelector('button:not(:disabled)')?.focus({ preventScroll: true });
    this._started = true;
  }

  drawTally() {
    const t = this._tally;
    const { mice, pain } = this.state;
    t.innerHTML = '<h2>The study so far</h2>';
    t.append(el('p', null, `<strong>Mice used:</strong> ${mice}`));
    const b1 = el('div', 'tr-bar', `<span style="width:${(mice / START.mice) * 100}%"></span>`);
    b1.setAttribute('role', 'img'); b1.setAttribute('aria-label', `${mice} of ${START.mice} mice`);
    t.append(b1);
    t.append(el('p', null, `<strong>Suffering, 0 to 10:</strong> ${pain}`));
    const b2 = el('div', 'tr-bar', `<span style="width:${(pain / 10) * 100}%"></span>`);
    b2.setAttribute('role', 'img'); b2.setAttribute('aria-label', `suffering ${pain} out of 10`);
    t.append(b2);
    if (this.log.length) {
      const ul = el('ul', 'tr-log');
      this.log.forEach(x => ul.append(el('li', null, `✓ ${x}`)));
      t.append(ul);
    }
  }

  button(label, onClick) {
    const b = el('button', 'tr-btn', label);
    b.type = 'button';
    b.addEventListener('click', onClick);
    return b;
  }
}

customElements.define('phil-threers', PhilThreeRs);
