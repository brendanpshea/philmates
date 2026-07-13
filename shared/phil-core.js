/* =====================================================================
   PhilMates — slide engine + interactive widgets (vanilla Web Components)
   No build step. Load with a path relative to the lesson, e.g.
   <script type="module" src="../../../shared/phil-core.js">
   Authoring format is documented in AUTHORING.md
   ===================================================================== */

/* ---------- tiny helpers ---------- */
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const isTyping = () => /^(input|select|textarea)$/i.test(document.activeElement?.tagName || '');

/* =====================================================================
   PhilSfx — short synthesized feedback sounds (Web Audio, no files)
   Fires only on user-triggered events (answers, completion), so the
   triggering click doubles as the autoplay-unlock gesture. Default OFF;
   the 🔕/🔔 toggle persists across lessons.
   ===================================================================== */
const PhilSfx = {
  get on() { return localStorage.getItem('philmates:sfx') === 'on'; },
  set on(v) { localStorage.setItem('philmates:sfx', v ? 'on' : 'off'); },
  _tone(freq, start, dur, type = 'sine', gain = 0.12) {
    const ctx = this._ctx;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    const t = ctx.currentTime + start;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t); o.stop(t + dur + 0.05);
  },
  _play(notes) {
    if (!this.on || !(window.AudioContext || window.webkitAudioContext)) return;
    this._ctx ||= new (window.AudioContext || window.webkitAudioContext)();
    if (this._ctx.state === 'suspended') this._ctx.resume();
    notes.forEach(n => this._tone(...n));
  },
  correct()  { this._play([[660, 0, 0.15], [880, 0.09, 0.2]]); },
  wrong()    { this._play([[220, 0, 0.18, 'triangle', 0.07], [175, 0.1, 0.22, 'triangle', 0.07]]); },
  complete() { this._play([[523, 0, 0.18], [659, 0.12, 0.18], [784, 0.24, 0.18], [1047, 0.36, 0.45]]); },
};

/* =====================================================================
   ProgressStore — swappable persistence (localStorage today, SCORM later)
   A future SCORM adapter implements the same get/save/onComplete surface.
   ===================================================================== */
class ProgressStore {
  constructor(lessonId) {
    this.key = 'philmates:' + lessonId;
    const raw = localStorage.getItem(this.key);
    const data = raw ? JSON.parse(raw) : {};
    this.visited = new Set(data.visited || []);
    this.correct = new Set(data.correct || []);
    this.completed = !!data.completed;
    this.beliefs = data.beliefs || {};      // ungraded Likert ratings { key: {statements, pre, post} }
  }
  save() {
    localStorage.setItem(this.key, JSON.stringify({
      visited: [...this.visited],
      correct: [...this.correct],
      completed: this.completed,
      beliefs: this.beliefs,
    }));
  }
  reset() { localStorage.removeItem(this.key); }
}

/* =====================================================================
   <phil-lesson> — owns the shell, navigation, progress & completion
   ===================================================================== */
class PhilLesson extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;

    this.lessonId = this.getAttribute('id') || 'lesson';
    // Persistence is swappable: a SCORM build sets globalThis.PhilProgressStore
    // to an adapter with the same get/save/reset surface. Defaults to localStorage.
    this.store = new (globalThis.PhilProgressStore || ProgressStore)(this.lessonId);

    this._audio = new Audio();                                  // narration player
    this._audioOn = localStorage.getItem('philmates:audio') === 'on';   // default off

    // collect slides in document order
    this.slides = [...this.querySelectorAll(':scope > phil-slide')];
    this.slides.forEach((s, i) => { if (!s.id) s.id = `s${i + 1}`; });
    this.linear = this.slides.filter(s => !s.hasAttribute('optional'));
    this.widgets = [];          // graded widgets, registered on connect
    this.tasks = [];            // ungraded-but-required activities (e.g. belief probe)
    this.tasksDone = new Set();
    this._returnIndex = 0;
    this._revealed = new Set(); // slide ids whose step-reveals are fully shown

    this._buildShell();
    this.slides.forEach(s => this._prepareSlide(s));

    // restore furthest position, else first slide
    const start = this.linear.find(s => !this.store.visited.has(s.id)) || this.linear[0];
    this.show(start);
    this._refresh();
  }

  /* ---- chrome ---- */
  _buildShell() {
    this.classList.add('phil-app');

    const top = el('header', 'phil-top');
    const row = el('div', 'phil-top__row');
    this._tally = el('span', 'phil-tally', '');
    const reset = el('button', 'phil-btn phil-btn--ghost phil-reset', '↺ Reset');
    reset.title = 'Reset this lesson’s progress';
    reset.onclick = () => this._confirmReset();
    const right = el('div', 'phil-top__right');
    right.append(this._tally);
    this._sfxBtn = el('button', 'phil-btn phil-btn--ghost phil-sfx', PhilSfx.on ? '🔔' : '🔕');
    this._sfxBtn.title = 'Sound effects on/off (answer feedback chimes)';
    this._sfxBtn.onclick = () => {
      PhilSfx.on = !PhilSfx.on;
      this._sfxBtn.textContent = PhilSfx.on ? '🔔' : '🔕';
      PhilSfx.correct();   // sample chime confirms it's on (and unlocks audio)
    };
    right.append(this._sfxBtn);
    if (this.querySelector('phil-narration')) {        // only show audio UI if the lesson has narration
      this._audioBtn = el('button', 'phil-btn phil-btn--ghost phil-audio', '🔇');
      this._audioBtn.title = 'Narration on/off (plays the current slide)';
      this._audioBtn.onclick = () => this._toggleAudio();
      right.append(this._audioBtn);
      this._setAudioBtn();
    }
    right.append(reset);
    row.append(el('h1', 'phil-title', this.getAttribute('title') || 'PhilMates'), right);
    const bar = el('div', 'phil-progress');
    this._fill = el('div', 'phil-progress__fill');
    bar.append(this._fill);
    top.append(row, bar);

    this._stage = el('div', 'phil-stage');
    this.slides.forEach(s => this._stage.append(s));   // move slides into stage

    const bottom = el('footer', 'phil-bottom');
    this._prevBtn = el('button', 'phil-btn', '◀ Back');
    this._nextBtn = el('button', 'phil-btn phil-btn--primary', 'Next ▶');
    this._counter = el('span', 'phil-counter', '');
    this._prevBtn.onclick = () => this.prev();
    this._nextBtn.onclick = () => this.next();
    const fs = el('button', 'phil-btn phil-btn--ghost', '⛶');
    fs.title = 'Fullscreen (F)';
    fs.onclick = () => this.toggleFullscreen();
    bottom.append(
      this._wrap('phil-nav', [this._prevBtn]),
      this._counter,
      this._wrap('phil-nav', [fs, this._nextBtn])
    );

    this.append(top, this._stage, bottom);

    // slide art loading late (or a window resize) changes content height
    this.addEventListener('load', e => { if (e.target.tagName === 'IMG') this._fitSlide(this.current); }, true);
    window.addEventListener('resize', () => this._fitSlide(this.current));

    document.addEventListener('keydown', e => {
      if (isTyping() || document.querySelector('.phil-modal')) return;
      if (e.key === 'ArrowRight') this.next();
      else if (e.key === 'ArrowLeft') this.prev();
      else if (e.key.toLowerCase() === 'f') this.toggleFullscreen();
    });
  }
  _wrap(cls, kids) { const w = el('div', cls); w.append(...kids); return w; }

  /* ---- reset progress (with confirmation) ---- */
  _confirmReset() {
    if (document.querySelector('.phil-modal')) return;
    const overlay = el('div', 'phil-modal');
    const box = el('div', 'phil-modal__box');
    box.append(
      el('p', 'phil-modal__title', '↺ Reset this lesson?'),
      el('p', null, 'This clears your progress — every slide and question starts over. This can’t be undone.')
    );
    const cancel = el('button', 'phil-btn', 'Cancel');
    const confirm = el('button', 'phil-btn phil-btn--danger', 'Yes, reset');
    const actions = el('div', 'phil-modal__actions');
    actions.append(cancel, confirm);
    box.append(actions);
    overlay.append(box);

    const close = () => { overlay.remove(); document.removeEventListener('keydown', onKey, true); };
    const onKey = e => { if (e.key === 'Escape') { e.preventDefault(); close(); } };
    cancel.onclick = close;
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', onKey, true);
    confirm.onclick = () => { this.store.reset(); location.reload(); };

    document.body.append(overlay);
    cancel.focus();
  }

  /* ---- split each slide into art / body regions ---- */
  _prepareSlide(slide) {
    const art = el('div', 'phil-slide__art');
    const body = el('div', 'phil-slide__body');
    [...slide.childNodes].forEach(node => {
      if (node.nodeType === 1 && node.getAttribute('slot') === 'art') art.append(node);
      else body.append(node);
    });
    if (art.childNodes.length) { slide.classList.add('has-art'); slide.append(body, art); }
    else slide.append(body);
  }

  /* ---- step reveal ---- */
  _initSteps(slide) {
    if (slide._steps) return;
    slide._steps = [...slide.querySelectorAll('[reveal] > *')];
    slide._steps.forEach(s => s.classList.add('phil-step'));
  }
  _applyReveal(slide) {
    this._initSteps(slide);
    const full = slide._steps.length === 0 || this._revealed.has(slide.id);
    slide._shown = full ? slide._steps.length : 0;
    slide._steps.forEach((s, i) => s.classList.toggle('phil-show', i < slide._shown));
  }
  _remainingSteps() { return this.current ? this.current._steps.length - this.current._shown : 0; }

  /* When a slide's content is taller than the stage, `align-content: safe center`
     misbehaves in Chrome (starts mid-scroll) — pin overflowing slides to the top. */
  _fitSlide(slide) {
    if (slide) slide.classList.toggle('is-tall', slide.scrollHeight > slide.clientHeight + 1);
  }

  /* ---- navigation ---- */
  show(slide) {
    this.slides.forEach(s => s.classList.toggle('is-current', s === slide));
    this.current = slide;
    this._applyReveal(slide);
    if (!slide.hasAttribute('optional')) {
      this._returnIndex = this.linear.indexOf(slide);
      this.store.visited.add(slide.id);
      this.store.save();
    }
    this._fitSlide(slide);
    slide.scrollTop = 0;          // the slide, not the stage, is the scroll container
    this._refresh();
    const focusable = slide.querySelector('h1, [tabindex], button, input, select');
    focusable?.focus?.({ preventScroll: true });
    this._playSlideAudio(slide);
  }
  next() {
    // reveal the next bullet/step before leaving the slide
    if (this._remainingSteps() > 0) {
      const step = this.current._steps[this.current._shown++];
      step.classList.add('phil-show');
      step.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      if (this._remainingSteps() === 0) this._revealed.add(this.current.id);
      this._refresh();
      return;
    }
    if (this.current.hasAttribute('optional')) return this.goLinear(this._returnIndex);
    this.goLinear(this.linear.indexOf(this.current) + 1);
  }
  prev() {
    if (this.current.hasAttribute('optional')) return this.goLinear(this._returnIndex);
    this.goLinear(this.linear.indexOf(this.current) - 1);
  }
  goLinear(i) { if (i >= 0 && i < this.linear.length) this.show(this.linear[i]); }
  goToId(id) { const s = this.slides.find(x => x.id === id); if (s) this.show(s); }   // used by branches

  toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else this.requestFullscreen?.();
  }

  /* ---- narration audio (optional; needs generated assets/audio/<slide.id>.mp3) ---- */
  _setAudioBtn() { this._audioBtn.textContent = this._audioOn ? '🔊' : '🔇'; }
  _toggleAudio() {
    this._audioOn = !this._audioOn;                       // the click is the gesture browsers require
    localStorage.setItem('philmates:audio', this._audioOn ? 'on' : 'off');
    this._setAudioBtn();
    this._playSlideAudio(this.current);
  }
  _playSlideAudio(slide) {
    this._audio.pause();
    if (!this._audioOn || !slide || !slide.querySelector('phil-narration')) return;
    this._audio.src = `./assets/audio/${slide.id}.mp3`;
    this._audio.play().catch(() => {});                   // ignore autoplay block / missing file
  }

  /* ---- widget coordination ---- */
  registerWidget(w) {
    if (!w.dataset.qid) w.dataset.qid = `${this.lessonId}:q${this.widgets.length + 1}`;
    this.widgets.push(w);
    this._refresh();   // denominator just grew; keep the tally/bar honest
    return { qid: w.dataset.qid, alreadyCorrect: this.store.correct.has(w.dataset.qid) };
  }
  reportCorrect(qid) {
    this.store.correct.add(qid);
    this.store.save();
    this._refresh();
  }
  // ungraded activities that still count toward completion (any answer is fine)
  registerTask() { const id = `k${this.tasks.length + 1}`; this.tasks.push(id); return id; }
  setTaskDone(id, done) { done ? this.tasksDone.add(id) : this.tasksDone.delete(id); this._refresh(); }

  /* ---- progress + completion ---- */
  _refresh() {
    this._fitSlide(this.current);   // reveals/answers can change the slide's height
    const reqSeen = this.linear.filter(s => this.store.visited.has(s.id)).length;

    // The bar tracks CURRENT position, so it moves when you navigate back.
    // "Credit" (visited slides + correct answers) is kept separately for
    // completion, so going back never loses progress.
    const idx = this.current.hasAttribute('optional')
      ? this._returnIndex : this.linear.indexOf(this.current);
    this._fill.style.width = Math.round(((idx + 1) / this.linear.length) * 100) + '%';

    const pos = this.current.hasAttribute('optional') ? '–' : idx + 1;
    this._counter.textContent = `${pos} / ${this.linear.length}`;
    let tally = `★ ${this.store.correct.size}/${this.widgets.length} correct`;
    if (this.tasks.length) tally += ` · ✔ ${this.tasksDone.size}/${this.tasks.length}`;
    this._tally.textContent = tally;

    this._prevBtn.disabled = !this.current.hasAttribute('optional') && this.linear.indexOf(this.current) === 0;
    const last = !this.current.hasAttribute('optional') && this.linear.indexOf(this.current) === this.linear.length - 1;
    this._nextBtn.disabled = last && this._remainingSteps() === 0;
    this._nextBtn.textContent = this._remainingSteps() > 0 ? 'Reveal ▶' : 'Next ▶';

    const complete = reqSeen === this.linear.length
      && this.store.correct.size === this.widgets.length
      && this.tasksDone.size === this.tasks.length;
    if (complete && !this.store.completed) this._celebrate();
  }
  _celebrate() {
    this.store.completed = true;
    this.store.save();
    PhilSfx.complete();
    this.dispatchEvent(new CustomEvent('phil:complete', { bubbles: true, detail: { lessonId: this.lessonId } }));
    const toast = el('div', 'phil-toast', '✔ LESSON COMPLETE!');
    document.body.append(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3500);
  }
}

/* =====================================================================
   Base widget — handles registration, feedback, restore
   ===================================================================== */
class PhilWidget extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    this.lesson = this.closest('phil-lesson');
    const reg = this.lesson?.registerWidget(this) || { qid: 'q', alreadyCorrect: false };
    this.qid = reg.qid;
    this.classList.add('phil-widget');
    this.build();
    if (reg.alreadyCorrect) { this._restoring = true; this.restore(); this._restoring = false; }
  }
  feedbackBox() {
    if (!this._fb) { this._fb = el('div', 'phil-feedback'); this.append(this._fb); }
    return this._fb;
  }
  showFeedback(ok, msg) {
    const fb = this.feedbackBox();
    fb.className = 'phil-feedback show ' + (ok ? 'good' : 'bad');
    fb.innerHTML = `<strong>${ok ? '✔ Correct' : '✘ Try again'}</strong>${msg || ''}`;
    if (!this._restoring) PhilSfx[ok ? 'correct' : 'wrong']();
  }
  solved() {
    this.lesson?.reportCorrect(this.qid);
    const ex = this.getAttribute('explain');
    this.showFeedback(true, ex || this.dataset.explain || '');
  }
  build() {}     // overridden
  restore() { this.solved(); this.lock?.(); }
}

/* ---------- <phil-mcq> : single-answer multiple choice ----------
   <phil-mcq prompt="..." explain="...">
     <phil-choice correct>Right one</phil-choice>
     <phil-choice>Distractor</phil-choice>
   </phil-mcq>
------------------------------------------------------------------ */
class PhilMcq extends PhilWidget {
  build() {
    const choices = [...this.querySelectorAll('phil-choice')];
    this.innerHTML = '';
    this.append(el('p', 'phil-widget__prompt', this.getAttribute('prompt') || ''));
    const list = el('div', 'phil-options');
    this._rows = choices.map(c => {
      const row = el('label', 'phil-choice');
      const input = el('input'); input.type = 'radio'; input.name = this.qid;
      row.append(input, el('span', null, c.innerHTML));
      row._correct = c.hasAttribute('correct');
      row._wrongHint = c.getAttribute('feedback') || '';
      input.onchange = () => this._answer(row);
      list.append(row);
      return row;
    });
    this.append(list);
  }
  _answer(row) {
    this._rows.forEach(r => r.classList.remove('correct', 'wrong'));
    if (row._correct) { row.classList.add('correct'); this.lock(); this.solved(); }
    else { row.classList.add('wrong'); this.showFeedback(false, row._wrongHint); }
  }
  lock() { this._rows.forEach(r => r.classList.add('locked')); }
  restore() {
    const r = this._rows.find(x => x._correct);
    r.classList.add('correct'); r.querySelector('input').checked = true;
    this.lock(); this.solved();
  }
}

/* ---------- <phil-checkset> : check all TRUE statements ----------
   <phil-checkset prompt="..." explain="...">
     <phil-statement correct>A true one</phil-statement>
     <phil-statement>A false one</phil-statement>
   </phil-checkset>
------------------------------------------------------------------ */
class PhilCheckset extends PhilWidget {
  build() {
    const items = [...this.querySelectorAll('phil-statement')];
    this.innerHTML = '';
    this.append(el('p', 'phil-widget__prompt', this.getAttribute('prompt') || 'Check every statement that is TRUE.'));
    const list = el('div', 'phil-options');
    this._rows = items.map(it => {
      const row = el('label', 'phil-choice');
      const input = el('input'); input.type = 'checkbox';
      row.append(input, el('span', null, it.innerHTML));
      row._correct = it.hasAttribute('correct');
      row._input = input;
      list.append(row);
      return row;
    });
    const btn = el('button', 'phil-btn phil-btn--primary', 'Check answers');
    btn.onclick = () => this._check();
    this.append(list, btn);
    this._btn = btn;
  }
  _check() {
    let ok = true;
    this._rows.forEach(r => {
      r.classList.remove('correct', 'wrong');
      const want = r._correct, got = r._input.checked;
      if (want && got) r.classList.add('correct');
      else if (want !== got) { r.classList.add('wrong'); ok = false; }
    });
    if (ok) { this.lock(); this.solved(); }
    else this.showFeedback(false, 'Some are off — red rows are wrong. Adjust and check again.');
  }
  lock() { this._rows.forEach(r => r.classList.add('locked')); this._btn.disabled = true; }
  restore() {
    this._rows.forEach(r => { if (r._correct) { r._input.checked = true; r.classList.add('correct'); } });
    this.lock(); this.solved();
  }
}

/* ---------- <phil-cloze> : fill the blanks ----------
   <phil-cloze explain="...">
     Bentham measured pleasure with the
     <phil-blank answer="hedonic|felicific">____</phil-blank> calculus.
     Mill added <phil-blank options="higher,lower">higher</phil-blank> pleasures.
   </phil-cloze>
   answer="a|b" = accepted typed answers; options="x,y,z" = dropdown.
------------------------------------------------------------------ */
class PhilCloze extends PhilWidget {
  build() {
    const tpl = this.querySelectorAll('phil-blank');
    this._blanks = [];
    tpl.forEach(b => {
      const accepted = (b.getAttribute('answer') || b.textContent).split('|').map(s => s.trim().toLowerCase());
      let field;
      if (b.hasAttribute('options')) {
        field = el('select', 'phil-blank');
        field.append(el('option', null, '—'));
        b.getAttribute('options').split(',').forEach(o => {
          const opt = el('option', null, o.trim()); field.append(opt);
        });
      } else {
        field = el('input', 'phil-blank'); field.type = 'text'; field.size = 12;
      }
      field._accepted = accepted;
      b.replaceWith(field);
      this._blanks.push(field);
    });
    this.classList.add('phil-cloze');
    const btn = el('button', 'phil-btn phil-btn--primary', 'Check');
    btn.style.marginTop = '14px';
    btn.onclick = () => this._check();
    this.append(document.createElement('br'), btn);
    this._btn = btn;
  }
  _val(f) { return (f.value || '').trim().toLowerCase(); }
  _check() {
    let ok = true;
    this._blanks.forEach(f => {
      const good = f._accepted.includes(this._val(f));
      f.classList.toggle('correct', good);
      f.classList.toggle('wrong', !good);
      if (!good) ok = false;
    });
    if (ok) { this.lock(); this.solved(); }
    else this.showFeedback(false, 'Red blanks aren’t right yet.');
  }
  lock() { this._blanks.forEach(f => f.disabled = true); this._btn.disabled = true; }
  restore() {
    this._blanks.forEach(f => {
      const ans = f._accepted[0];
      if (f.tagName === 'SELECT') [...f.options].forEach(o => { if (o.text.toLowerCase() === ans) f.value = o.value; });
      else f.value = ans;
      f.classList.add('correct');
    });
    this.lock(); this.solved();
  }
}

/* ---------- <phil-branch> : jump to optional slide(s), then return ----------
   <phil-branch prompt="Want the deep dive?">
     <phil-option goto="act-rule">Yes, show me</phil-option>
     <phil-option goto="next">Skip it</phil-option>
   </phil-branch>
   Not graded. goto="next" just advances the spine.
   Target optional slides get an auto "Back to lesson" button.
------------------------------------------------------------------ */
class PhilBranch extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    this.lesson = this.closest('phil-lesson');
    const opts = [...this.querySelectorAll('phil-option')];
    this.classList.add('phil-widget', 'phil-branch');
    this.innerHTML = '';
    this.append(el('p', 'phil-widget__prompt', this.getAttribute('prompt') || ''));
    const list = el('div', 'phil-options');
    opts.forEach(o => {
      const btn = el('button', 'phil-btn', o.innerHTML);
      const goto = o.getAttribute('goto');
      btn.onclick = () => goto === 'next' ? this.lesson.next() : this.lesson.goToId(goto);
      list.append(btn);
    });
    this.append(list);
  }
}

/* ---------- <phil-compare> : reusable side-by-side comparison ----------
   <phil-compare>
     <phil-side label="Act Utilitarianism" tag="This act">
       <p>...the stance...</p>
       <p class="cake">...the cake example...</p>
     </phil-side>
     <phil-side label="Rule Utilitarianism" tag="The rule"> ... </phil-side>
   </phil-compare>
   Teaching only (not graded). Two sides get a "VS" badge between them.
------------------------------------------------------------------ */
class PhilCompare extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    this.classList.add('phil-compare');
    const sides = [...this.querySelectorAll(':scope > phil-side')];
    sides.forEach(s => {
      const head = el('div', 'phil-side__head');
      if (s.hasAttribute('tag')) head.append(el('span', 'phil-side__tag', s.getAttribute('tag')));
      head.append(el('span', 'phil-side__label', s.getAttribute('label') || ''));
      s.prepend(head);
    });
    if (sides.length === 2) this.append(el('div', 'phil-vs', 'VS'));
  }
}

/* ---------- belief probe (Likert "anticipation guide") ----------
   Ungraded. Rate agreement up front, revisit at the end to see what shifted.
     <phil-beliefs prompt="...">          (near the start)
       <phil-statement>A belief, phrased as a value claim.</phil-statement>
       ...
     </phil-beliefs>
     <phil-beliefs-review for="beliefs"></phil-beliefs-review>   (near the end)
   Ratings persist per-lesson in the ProgressStore; never affect completion.
------------------------------------------------------------------ */
const LIKERT = { 1: 'Strongly disagree', 2: 'Disagree', 3: 'Neutral', 4: 'Agree', 5: 'Strongly agree' };

function likertLegend() {
  const legend = el('div', 'phil-scale-legend');
  legend.append(el('span', null, 'Strongly disagree'), el('span', null, 'Strongly agree'));
  return legend;
}
function likertScale(selected, onPick) {
  const row = el('div', 'phil-scale');
  const cells = [];
  for (let v = 1; v <= 5; v++) {
    const b = el('button', null, String(v));
    b.type = 'button';
    b.setAttribute('aria-label', LIKERT[v]);
    if (v === selected) b.classList.add('sel');
    b.onclick = () => { cells.forEach(c => c.classList.remove('sel')); b.classList.add('sel'); onPick(v); };
    cells.push(b); row.append(b);
  }
  return row;
}

function beliefDelta(node, pre, post) {
  if (!post) { node.textContent = ''; node.className = 'phil-belief__delta none'; return; }
  if (!pre) { node.textContent = 'Recorded.'; node.className = 'phil-belief__delta none'; return; }
  const d = post - pre;
  if (d === 0) { node.textContent = 'No change — can you say why you still hold it?'; node.className = 'phil-belief__delta none'; }
  else { node.textContent = `Shifted from “${LIKERT[pre]}” to “${LIKERT[post]}” (${d > 0 ? '+' : ''}${d}).`; node.className = 'phil-belief__delta'; }
}

class PhilBeliefs extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    this.lesson = this.closest('phil-lesson');
    this.store = this.lesson?.store;
    this.key = this.getAttribute('id') || 'beliefs';
    this.statements = [...this.querySelectorAll('phil-statement')].map(s => s.innerHTML.trim());
    this.classList.add('phil-widget', 'phil-beliefs');
    if (!this.store) return;
    const rec = (this.store.beliefs[this.key] ||= {});
    rec.statements = this.statements;        // persist so the review can read them
    rec.pre ||= {};
    this.store.save();
    this.build(rec);
  }
  build(rec) {
    this.rec = rec;
    this.innerHTML = '';
    this.append(el('p', 'phil-widget__prompt',
      this.getAttribute('prompt') || 'How much do you agree? There are no wrong answers — this is just where you stand right now.'));
    this.append(likertLegend());
    this.statements.forEach((text, i) => {
      const row = el('div', 'phil-belief');
      row.append(el('p', 'phil-belief__text', text));
      row.append(likertScale(rec.pre[i], v => { rec.pre[i] = v; this.store.save(); this._sync(); }));
      this.append(row);
    });
    this._submit = el('button', 'phil-btn phil-btn--primary phil-belief__submit', 'Submit');
    this._submit.onclick = () => this._onSubmit();
    this._status = el('p', 'phil-belief__status');
    this.append(this._submit, this._status);
    this.taskId = this.lesson?.registerTask();
    if (rec.submitted) this.lesson?.setTaskDone(this.taskId, true);
    this._sync();
  }
  _count() { return this.statements.filter((_, i) => this.rec.pre[i]).length; }
  _sync() {
    const n = this.statements.length, done = this._count();
    if (this.rec.submitted) {
      this._status.textContent = '✓ Submitted — counts toward completion. (You can still change your answers.)';
      this._status.classList.add('done');
    } else {
      this._status.textContent = `${done}/${n} rated. Rate all ${n}, then Submit.`;
      this._status.classList.remove('done');
    }
  }
  _onSubmit() {
    const n = this.statements.length, done = this._count();
    if (done < n) {
      this._status.textContent = `Please rate all ${n} first (${done}/${n}).`;
      this._status.classList.remove('done');
      return;
    }
    this.rec.submitted = true;
    this.store.save();
    this.lesson?.setTaskDone(this.taskId, true);
    this._sync();
  }
}

class PhilBeliefsReview extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    this.lesson = this.closest('phil-lesson');
    this.store = this.lesson?.store;
    this.key = this.getAttribute('for') || 'beliefs';
    this.classList.add('phil-widget', 'phil-beliefs');
    this.build(this.store?.beliefs?.[this.key]);
  }
  build(rec) {
    this.rec = rec;
    this.innerHTML = '';
    this.append(el('p', 'phil-widget__prompt',
      this.getAttribute('prompt') || 'Here’s where you started. Has anything shifted? Staying put is fine — but can you now say why?'));
    this.taskId = this.lesson?.registerTask();
    if (!rec || !rec.statements) {
      this.append(el('p', 'muted', '(No starting answers were recorded for this lesson.)'));
      this.lesson?.setTaskDone(this.taskId, true);   // nothing to revisit — don't block completion
      return;
    }
    rec.post ||= {};
    this.append(likertLegend());
    rec.statements.forEach((text, i) => {
      const pre = rec.pre?.[i];
      const row = el('div', 'phil-belief');
      row.append(el('p', 'phil-belief__text', text));
      row.append(el('p', 'phil-belief__then', pre ? `Then: ${LIKERT[pre]}` : 'Then: (not rated)'));
      const delta = el('p', 'phil-belief__delta none', '');
      row.append(likertScale(rec.post[i], v => { rec.post[i] = v; this.store.save(); beliefDelta(delta, pre, v); this._sync(); }));
      row.append(delta);
      beliefDelta(delta, pre, rec.post[i]);
      this.append(row);
    });
    this._submit = el('button', 'phil-btn phil-btn--primary phil-belief__submit', 'Submit');
    this._submit.onclick = () => this._onSubmit();
    this._status = el('p', 'phil-belief__status');
    this.append(this._submit, this._status);
    if (rec.reviewSubmitted) this.lesson?.setTaskDone(this.taskId, true);
    this._sync();
  }
  _count() { return (this.rec.statements || []).filter((_, i) => this.rec.post[i]).length; }
  _sync() {
    const n = (this.rec.statements || []).length, done = this._count();
    if (this.rec.reviewSubmitted) {
      this._status.textContent = '✓ Submitted — counts toward completion.';
      this._status.classList.add('done');
    } else {
      this._status.textContent = `${done}/${n} revisited. Re-rate all ${n}, then Submit.`;
      this._status.classList.remove('done');
    }
  }
  _onSubmit() {
    const n = (this.rec.statements || []).length, done = this._count();
    if (done < n) {
      this._status.textContent = `Please re-rate all ${n} first (${done}/${n}).`;
      this._status.classList.remove('done');
      return;
    }
    this.rec.reviewSubmitted = true;
    this.store.save();
    this.lesson?.setTaskDone(this.taskId, true);
    this._sync();
  }
}

/* ---- inject "Back to lesson" on optional slides when shown ---- */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('phil-slide[optional]').forEach(s => {
    const back = el('button', 'phil-btn phil-back', '◀ Back to lesson');
    back.onclick = () => s.closest('phil-lesson').prev();
    (s.querySelector('.phil-slide__body') || s).append(back);   // sits below the content
  });
});

/* ---------- register ---------- */
customElements.define('phil-lesson', PhilLesson);
customElements.define('phil-mcq', PhilMcq);
customElements.define('phil-checkset', PhilCheckset);
customElements.define('phil-cloze', PhilCloze);
customElements.define('phil-branch', PhilBranch);
customElements.define('phil-compare', PhilCompare);
customElements.define('phil-beliefs', PhilBeliefs);
customElements.define('phil-beliefs-review', PhilBeliefsReview);
