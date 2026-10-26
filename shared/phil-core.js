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
/* Fisher-Yates on a copy. Used to shuffle answer options at build time — see
   `shuffledOptions` below for why that matters. */
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
/* Answer options are shuffled on every load, because authored order leaks the
   answer. Writing a checkset, you naturally list the true statements first and
   the distractors after; a student who notices can pass without reading. The
   same habit parks the MCQ answer in slot B. Shuffling here fixes every existing
   lesson at once and means an author never has to think about it again.

   Order is *not* stable across reloads, and doesn't need to be: nothing is
   stored by index. A restored answer is found by its `correct` flag, so a
   reshuffle still highlights the right row. (<phil-poll> is the exception — it
   saves the picked index — so polls are never shuffled.)

   `keep-order` opts out for the rare question whose options are genuinely
   sequenced (a timeline, escalating degrees, "all of the above"). */
const shuffledOptions = (host, nodes) =>
  host.hasAttribute('keep-order') ? [...nodes] : shuffle(nodes);
/* Seconds a missed question waits before the next try, when it has no
   `review` slide to send the student to. */
const RETRY_COOLDOWN = 10;
/* Each wrong try multiplies what a question can still earn by this:
   100%, 80%, 64%, 51% … */
const RETRY_FACTOR = 0.8;
const worthAfter = misses => RETRY_FACTOR ** misses;
// A multi-part miss says how many parts are wrong, never which.
const countHint = (wrong, n, noun) =>
  `${wrong} of your ${n} ${noun}s ${wrong === 1 ? 'is' : 'are'} wrong. Find ${wrong === 1 ? 'it' : 'them'} and check again.`;
// Exact halves show as they are (12.5%); everything else rounds (51%, 67%).
const pctText = (c) => {
  const p = c * 100;
  return `${Number.isInteger(p * 2) ? p : Math.round(p)}%`;
};
// Checked at call time, not module load — users change this setting mid-session.
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

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
  noted()    { this._play([[494, 0, 0.14, 'sine', 0.09]]); },   // neutral: a position was recorded, not graded
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
    this.polls = data.polls || {};          // ungraded forced-choice picks { key: choiceIndex }
    this.misses = data.misses || {};        // wrong tries per question { qid: n }
    this.credit = data.credit || {};        // credit locked in when first solved { qid: 1 | .5 | .25 … }
  }
  save() {
    localStorage.setItem(this.key, JSON.stringify({
      visited: [...this.visited],
      correct: [...this.correct],
      completed: this.completed,
      beliefs: this.beliefs,
      polls: this.polls,
      misses: this.misses,
      credit: this.credit,
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
    reset.setAttribute('aria-label', 'Reset this lesson’s progress');
    reset.onclick = () => this._confirmReset();
    const right = el('div', 'phil-top__right');
    // Position and score live together up here so the bottom bar is nothing
    // but navigation.
    this._counter = el('span', 'phil-counter', '');
    right.append(this._counter, this._tally);
    // Icon-only toggles: the emoji swap is the visual state, aria-pressed is the
    // programmatic one. title alone is the weakest naming source and says nothing
    // about on/off.
    this._sfxBtn = el('button', 'phil-btn phil-btn--ghost phil-sfx', PhilSfx.on ? '🔔' : '🔕');
    this._sfxBtn.title = 'Sound effects on/off (answer feedback chimes)';
    this._sfxBtn.setAttribute('aria-label', 'Sound effects (answer feedback chimes)');
    this._sfxBtn.setAttribute('aria-pressed', String(PhilSfx.on));
    this._sfxBtn.onclick = () => {
      PhilSfx.on = !PhilSfx.on;
      this._sfxBtn.textContent = PhilSfx.on ? '🔔' : '🔕';
      this._sfxBtn.setAttribute('aria-pressed', String(PhilSfx.on));
      PhilSfx.correct();   // sample chime confirms it's on (and unlocks audio)
    };
    right.append(this._sfxBtn);
    if (this.querySelector('phil-narration')) {        // only show audio UI if the lesson has narration
      this._audioBtn = el('button', 'phil-btn phil-btn--ghost phil-audio', '🔇');
      this._audioBtn.title = 'Narration on/off (plays the current slide)';
      this._audioBtn.setAttribute('aria-label', 'Narration (plays the current slide)');
      this._audioBtn.onclick = () => this._toggleAudio();
      right.append(this._audioBtn);
      this._setAudioBtn();
    }
    right.append(reset);
    row.append(el('h1', 'phil-title', this.getAttribute('title') || 'PhilMates'), right);
    const bar = el('div', 'phil-progress');
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-label', 'Lesson progress');
    bar.setAttribute('aria-valuemin', '0');
    this._bar = bar;
    this._fill = el('div', 'phil-progress__fill');
    bar.append(this._fill);
    top.append(row, bar);

    // Slide changes swap the whole visible page. Screen readers get told about it
    // here; see show().
    this._live = el('div', 'phil-sr-only');
    this._live.setAttribute('role', 'status');

    this._stage = el('main', 'phil-stage');            // the page's one main landmark
    this.slides.forEach(s => this._stage.append(s));   // move slides into stage

    const bottom = el('footer', 'phil-bottom');
    this._prevBtn = el('button', 'phil-btn', '◀ Back');
    this._nextBtn = el('button', 'phil-btn phil-btn--primary', 'Next ▶');
    this._prevBtn.onclick = () => this.prev();
    this._nextBtn.onclick = () => this.next();
    const fs = el('button', 'phil-btn phil-btn--ghost', '⛶');
    fs.title = 'Fullscreen (F)';
    fs.setAttribute('aria-label', 'Toggle fullscreen');
    fs.onclick = () => this.toggleFullscreen();
    // Shown only while a missed question has sent the student to review a slide.
    this._reviewBtn = el('button', 'phil-btn phil-review-return', '↩ Back to the question');
    this._reviewBtn.hidden = true;
    this._reviewBtn.onclick = () => this._returnFromReview();
    bottom.append(
      this._wrap('phil-nav', [this._prevBtn]),
      this._wrap('phil-nav', [this._reviewBtn, fs, this._nextBtn])
    );

    this.append(top, this._live, this._stage, bottom);

    // a window resize changes the stage height (the ResizeObserver in show() covers content growth)
    window.addEventListener('resize', () => this._fitSlide(this.current));

    document.addEventListener('keydown', e => {
      if (isTyping() || document.querySelector('.phil-modal')) return;
      // Never shadow a browser/AT shortcut: unmodified keys only. Without this,
      // Ctrl+F / ⌘+F (Find in page) toggles fullscreen instead of searching.
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'ArrowRight') this.next();
      else if (e.key === 'ArrowLeft') this.prev();
      else if (e.key.toLowerCase() === 'f' && !e.shiftKey) this.toggleFullscreen();
    });
  }
  _wrap(cls, kids) { const w = el('div', cls); w.append(...kids); return w; }

  /* ---- reset progress (with confirmation) ---- */
  _confirmReset() {
    if (document.querySelector('.phil-modal')) return;
    const opener = document.activeElement;             // to restore on close
    const overlay = el('div', 'phil-modal');
    const box = el('div', 'phil-modal__box');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    const title = el('p', 'phil-modal__title', '↺ Reset this lesson?');
    title.id = 'phil-modal-title';
    box.setAttribute('aria-labelledby', title.id);
    box.append(
      title,
      el('p', null, 'This clears your progress — every slide and question starts over. This can’t be undone.')
    );
    if (this.store.keepsCredit) {
      box.append(el('p', null, 'Your score so far is kept. Answering the questions again won’t raise it.'));
    }
    const cancel = el('button', 'phil-btn', 'Cancel');
    const confirm = el('button', 'phil-btn phil-btn--danger', 'Yes, reset');
    const actions = el('div', 'phil-modal__actions');
    actions.append(cancel, confirm);
    box.append(actions);
    overlay.append(box);

    const close = () => {
      overlay.remove();
      document.removeEventListener('keydown', onKey, true);
      this.removeAttribute('inert');
      opener?.focus?.();                               // put focus back where it came from
    };
    const onKey = e => {
      if (e.key === 'Escape') { e.preventDefault(); return close(); }
      // Keep Tab inside the dialog. Without this you're two tabs away from
      // operating the page behind a scrim you can't see through.
      if (e.key !== 'Tab') return;
      const stops = [cancel, confirm];
      const first = stops[0], last = stops[stops.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!stops.includes(document.activeElement)) { e.preventDefault(); first.focus(); }
    };
    cancel.onclick = close;
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', onKey, true);
    confirm.onclick = () => { this.store.reset(); location.reload(); };

    this.setAttribute('inert', '');                    // belt and braces for AT + pointer
    document.body.append(overlay);
    cancel.focus();                                    // the safe default, not the destructive one
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
    if (!slide) return;
    const tall = slide.scrollHeight > slide.clientHeight + 1;
    slide.classList.toggle('is-tall', tall);
    // An overflowing slide is the scroll container, so it has to be focusable or
    // a keyboard-only user can't reach the bottom of it — arrow keys need
    // something focused to scroll. Only tall slides get the tab stop.
    if (tall) slide.setAttribute('tabindex', '0');
    else slide.removeAttribute('tabindex');
    // note: don't touch scrollTop here — this runs on every re-measure (reveals,
    // art load), and resetting would fight the auto-scroll-to-revealed-bullet.
  }

  /* ---- navigation ---- */
  show(slide) {
    this.slides.forEach(s => s.classList.toggle('is-current', s === slide));
    this.current = slide;
    if (this._reviewFrom === slide) this._reviewFrom = null;   // back at the question by any route
    this._applyReveal(slide);
    if (!slide.hasAttribute('optional')) {
      this._returnIndex = this.linear.indexOf(slide);
      this.store.visited.add(slide.id);
      this.store.save();
    }
    // Re-measure whenever the current slide's content changes size — reveals,
    // late-loading art, font swaps — since scrollHeight isn't known at show() time.
    this._ro ||= new ResizeObserver(() => this._fitSlide(this.current));
    this._ro.disconnect();
    slide.querySelectorAll('.phil-slide__body, .phil-slide__art').forEach(n => this._ro.observe(n));
    this._fitSlide(slide);
    slide.scrollTop = 0;          // the slide, not the stage, is the scroll container
    this._refresh();
    // Move focus to the slide's heading. It needs tabindex="-1" first: a plain
    // <h1> isn't focusable, so calling focus() on it is a silent no-op and focus
    // would stay wherever it was (usually the Next button).
    const heading = slide.querySelector('h1, h2');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    } else {
      slide.tabIndex = -1;
      slide.focus({ preventScroll: true });
    }
    this._announceSlide(slide, heading);
    this._playSlideAudio(slide);
    // Questions waiting on a review listen for this.
    this.dispatchEvent(new CustomEvent('phil:slide', { detail: { id: slide.id } }));
  }

  /* ---- review after a miss: visit a slide, then come back ---- */
  review(fromSlide, toId) {
    this._reviewFrom = fromSlide;
    this.goToId(toId);
  }
  _returnFromReview() {
    const s = this._reviewFrom;
    this._reviewFrom = null;
    if (s) this.show(s);
  }
  /* Focusing the heading is what a sighted keyboard user needs; this is what a
     screen-reader user needs. Both, because they're different people. */
  _announceSlide(slide, heading) {
    if (!this._live) return;
    const title = (heading?.textContent || '').trim();
    const where = slide.hasAttribute('optional')
      ? 'Aside'
      : `Slide ${this.linear.indexOf(slide) + 1} of ${this.linear.length}`;
    this._live.textContent = title ? `${where}: ${title}` : where;
  }

  next() {
    // reveal the next bullet/step before leaving the slide
    if (this._remainingSteps() > 0) {
      const step = this.current._steps[this.current._shown++];
      step.classList.add('phil-show');
      step.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
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
    // Graded items carry a permanent data-qid in the markup (the validator
    // requires it), so saved progress survives adding or removing questions.
    // The fallback uses its own namespace so it can never take a stamped id.
    if (!w.dataset.qid) w.dataset.qid = `${this.lessonId}:auto${this.widgets.length + 1}`;
    const qid = w.dataset.qid;
    // Progress saved before graded credit existed: a question already solved
    // keeps full credit, so nobody loses points to the upgrade.
    this.store.credit ||= {};
    if (this.store.correct.has(qid) && !(qid in this.store.credit)) this.store.credit[qid] = 1;
    // A question solved under the older, steeper decay (halving) is lifted to
    // what the same number of wrong tries earns now. Credit never goes down.
    if (this.store.correct.has(qid))
      this.store.credit[qid] = Math.max(this.store.credit[qid], worthAfter(this.misses(qid)));
    this.widgets.push(w);
    this._refresh();   // denominator just grew; keep the tally/bar honest
    return { qid, alreadyCorrect: this.store.correct.has(qid) };
  }

  /* ---- graded credit ----
     Each wrong try lowers what a question can still earn: 100%, 80%, 64% …
     (RETRY_FACTOR). Multi-part questions also bank partial credit on every
     check; see raiseCredit. A question keeps the best credit it ever earned,
     and wrong tries are saved, so reloading the page never resets them. */
  misses(qid) { return this.store.misses?.[qid] || 0; }
  creditOf(qid) { return this.store.credit?.[qid] ?? worthAfter(this.misses(qid)); }
  hasCredit(qid) { return qid in (this.store.credit || {}); }
  /* Multi-part questions (checkset, cloze, classify) score each check part by
     part, scaled by the tries already spent, and keep the best. A miss says
     how many parts are wrong but not which, so a second try is a real one. */
  raiseCredit(qid, c) {
    const credit = (this.store.credit ||= {});
    credit[qid] = Math.max(credit[qid] ?? 0, Math.max(0, Math.min(1, c)));
    this.store.save();
    this._refresh();
  }
  reportMiss(qid) {
    const m = (this.store.misses ||= {});
    m[qid] = (m[qid] || 0) + 1;
    this.store.save();
    this._refresh();
  }
  reportCorrect(qid) {
    this.store.correct.add(qid);
    const credit = (this.store.credit ||= {});
    credit[qid] = Math.max(credit[qid] ?? 0, worthAfter(this.misses(qid)));
    this.store.save();
    this._refresh();
  }
  /* Percent of the lesson's available credit earned, or null with no questions. */
  score() {
    if (!this.widgets.length) return null;
    const earned = this.widgets.reduce((s, w) => s + (this.store.credit?.[w.dataset.qid] || 0), 0);
    return Math.round((earned / this.widgets.length) * 100);
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
    this._bar.setAttribute('aria-valuemax', String(this.linear.length));
    this._bar.setAttribute('aria-valuenow', String(idx + 1));
    this._bar.setAttribute('aria-valuetext', `Slide ${idx + 1} of ${this.linear.length}`);
    const solved = this.widgets.filter(w => this.store.correct.has(w.dataset.qid)).length;
    const parts = [];
    if (this.widgets.length) parts.push(`★ Score ${this.score()}%`, `${solved}/${this.widgets.length} solved`);
    if (this.tasks.length) parts.push(`✔ ${this.tasksDone.size}/${this.tasks.length}`);
    this._tally.textContent = parts.join(' · ');
    this._reviewBtn.hidden = !(this._reviewFrom && this.current !== this._reviewFrom);

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
    toast.setAttribute('role', 'status');   // it self-dismisses after 3.5s; announce it
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
    if (!this._fb) {
      this._fb = el('div', 'phil-feedback');
      // Must be in the DOM before any text lands in it, or the announcement
      // doesn't fire. This is the core teaching loop — it shouldn't be silent.
      this._fb.setAttribute('role', 'status');
      this.append(this._fb);
    }
    return this._fb;
  }
  showFeedback(ok, msg, head) {
    const fb = this.feedbackBox();
    fb.className = 'phil-feedback show ' + (ok ? 'good' : 'bad');
    fb.innerHTML = `<strong>${head || (ok ? '✔ Correct' : '✘ Try again')}</strong>${msg || ''}`;
    if (!this._restoring) {
      PhilSfx[ok ? 'correct' : 'wrong']();
      // On a tall slide the feedback (and a miss's review button) can land
      // below the fold; bring it into view after the content settles.
      requestAnimationFrame(() => fb.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' }));
    }
  }
  solved() {
    this.lesson?.reportCorrect(this.qid);
    const c = this.lesson ? this.lesson.creditOf(this.qid) : 1;
    const head = c >= 1 ? '✔ Correct — full credit' : `✔ Correct — ${pctText(c)} credit`;
    const ex = this.getAttribute('explain');
    this.showFeedback(true, ex || this.dataset.explain || '', head);
  }
  /* A wrong try: record it, say what the question is now worth, and hold the
     next try until the student has reviewed (or, with no review slide, paused). */
  miss(hint) {
    this.lesson?.reportMiss(this.qid);
    const L = this.lesson;
    const next = worthAfter(L ? L.misses(this.qid) : 1);
    const banked = L?.hasCredit(this.qid) ? L.creditOf(this.qid) : 0;
    const head = !L?.hasCredit(this.qid)
      ? `✘ Not yet — this question is now worth ${pctText(next)}`
      : next > banked
        ? `✘ Not yet — ${pctText(banked)} so far; getting it all right now earns ${pctText(next)}`
        : `✘ Not yet — you keep the ${pctText(banked)} you have; fix the rest to finish`;
    this.showFeedback(false, hint || '', head);
    this._block();
  }
  _block() {
    this._blocked = true;
    this.onBlockChange?.(true);
    const line = el('p', 'phil-retry');
    this.feedbackBox().append(line);
    const rev = this.getAttribute('review');
    const target = rev && this.lesson?.slides.find(s => s.id === rev);
    if (target) {
      const title = (target.querySelector('h1')?.textContent || 'the lesson').trim();
      line.append(document.createTextNode('Review before you try again: '));
      const go = el('button', 'phil-btn phil-retry__go', `↗ ${title}`);
      go.type = 'button';
      go.onclick = () => this.lesson.review(this.closest('phil-slide'), rev);
      line.append(go);
      const onSlide = e => {
        if (e.detail.id !== rev) return;
        this.lesson.removeEventListener('phil:slide', onSlide);
        this._unblock();
      };
      this.lesson.addEventListener('phil:slide', onSlide);
    } else {
      let n = RETRY_COOLDOWN;
      const tick = () => {
        if (n <= 0) return this._unblock();
        line.textContent = `Think it over. You can try again in ${n}s.`;
        n--;
        this._timer = setTimeout(tick, 1000);
      };
      tick();
    }
  }
  _unblock() {
    clearTimeout(this._timer);
    this._blocked = false;
    this.onBlockChange?.(false);
    const line = this._fb?.querySelector('.phil-retry');
    if (line) line.textContent = 'Try again when you’re ready.';
  }
  build() {}     // overridden
  restore() { this.solved(); this.lock?.(); }
  /* Render the prompt and wire it up as the group's accessible name, so someone
     tabbing into the options hears the question, not just the choices. */
  promptNode(text, role) {
    const p = el('p', 'phil-widget__prompt', text);
    p.id = `${this.qid}-prompt`;
    this.setAttribute('role', role);
    this.setAttribute('aria-labelledby', p.id);
    return p;
  }
}

/* ---------- <phil-mcq> : single-answer multiple choice ----------
   <phil-mcq prompt="..." explain="...">
     <phil-choice correct>Right one</phil-choice>
     <phil-choice>Distractor</phil-choice>
   </phil-mcq>
------------------------------------------------------------------ */
class PhilMcq extends PhilWidget {
  build() {
    const choices = shuffledOptions(this, this.querySelectorAll('phil-choice'));
    this.innerHTML = '';
    this.append(this.promptNode(this.getAttribute('prompt') || '', 'radiogroup'));
    const list = el('div', 'phil-options');
    this._rows = choices.map(c => {
      const row = el('label', 'phil-choice');
      const input = el('input'); input.type = 'radio'; input.name = this.qid;
      row.append(input, el('span', null, c.innerHTML));
      row._correct = c.hasAttribute('correct');
      row._wrongHint = c.getAttribute('feedback') || '';
      // Blocks the click a keyboard Space/arrow also generates. Not `disabled`:
      // that greys the radio out (the chosen answer stops being visible) and
      // drops it from the tab order, so a screen-reader user reviewing the
      // question can no longer reach their own answer.
      // A wrong option can only be tried once, and nothing can be picked while
      // the question waits on a review.
      input.addEventListener('click', e => { if (this._locked || this._blocked || row._tried) e.preventDefault(); });
      input.onchange = () => {
        if (this._locked) return this._reassert();
        if (this._blocked || row._tried) { input.checked = false; return; }
        this._answer(row);
      };
      list.append(row);
      return row;
    });
    this._list = list;
    this.append(list);
  }
  _answer(row) {
    this._rows.forEach(r => { if (!r._tried) r.classList.remove('correct', 'wrong'); });
    if (row._correct) { row.classList.add('correct'); this.lock(); this.solved(); }
    else {
      row._tried = true;
      row.classList.add('wrong', 'tried');
      row.querySelector('input').setAttribute('aria-disabled', 'true');
      this.miss(row._wrongHint);
    }
  }
  // When a retry opens, clear the pick and reshuffle so position memory can't help.
  onBlockChange(blocked) {
    if (blocked) return;
    this._rows.forEach(r => { r.querySelector('input').checked = false; });
    if (!this.hasAttribute('keep-order')) shuffle(this._rows).forEach(r => this._list.append(r));
  }
  // pointer-events:none only stops the mouse — a keyboard user could still change
  // a locked-in answer. _locked closes that gap for every input modality.
  _reassert() {
    const right = this._rows.find(r => r._correct);
    if (right) right.querySelector('input').checked = true;
  }
  lock() {
    this._locked = true;
    this._rows.forEach(r => {
      r.classList.add('locked');
      r.querySelector('input').setAttribute('aria-disabled', 'true');
    });
  }
  restore() {
    const r = this._rows.find(x => x._correct);
    r.classList.add('correct'); r.querySelector('input').checked = true;
    this.lock(); this.solved();
  }
}

/* ---------- <phil-poll> : ungraded forced-choice ----------
   Records where a student stands without grading it. No choice is
   `correct`; picking any one satisfies completion (like <phil-beliefs>)
   and the ★ tally is untouched. Use this — not <phil-mcq> — whenever the
   question is "what would you do?" and the honest answer is that
   reasonable people divide.

   <phil-poll prompt="What do you do?" explain="Shown after any pick.">
     <phil-choice note="Where this position leads.">Option A</phil-choice>
     <phil-choice note="...">Option B</phil-choice>
   </phil-poll>
------------------------------------------------------------------ */
class PhilPoll extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    this.lesson = this.closest('phil-lesson');
    this.store = this.lesson?.store;
    if (this.lesson) this.lesson._pollSeq = (this.lesson._pollSeq || 0) + 1;
    this.key = this.getAttribute('id') || `poll${this.lesson?._pollSeq || 1}`;
    this.classList.add('phil-widget', 'phil-poll');
    this.build();
  }
  build() {
    const choices = [...this.querySelectorAll('phil-choice')];
    this.innerHTML = '';
    this.append(el('p', 'phil-widget__prompt', this.getAttribute('prompt') || ''));
    const list = el('div', 'phil-options');
    this._rows = choices.map((c, i) => {
      const row = el('label', 'phil-choice');
      const input = el('input'); input.type = 'radio'; input.name = `${this.key}-poll`;
      row.append(input, el('span', null, c.innerHTML));
      row._note = c.getAttribute('note') || '';
      input.onchange = () => this._pick(i);
      list.append(row);
      return row;
    });
    this.append(list);
    this._fb = el('div', 'phil-feedback');
    this.append(this._fb);
    this.taskId = this.lesson?.registerTask();

    const saved = this.store?.polls?.[this.key];
    if (saved != null && this._rows[saved]) {
      this._restoring = true;
      this._rows[saved].querySelector('input').checked = true;
      this._pick(saved);
      this._restoring = false;
    }
  }
  _pick(i) {
    this._rows.forEach(r => r.classList.remove('picked'));
    this._rows[i].classList.add('picked');
    // `||=` rather than a bare assignment: a progress store that arrives
    // without this field should lose the saved pick, not throw and take
    // the completion counter down with it.
    if (this.store) { (this.store.polls ||= {})[this.key] = i; this.store.save(); }
    this.lesson?.setTaskDone(this.taskId, true);
    const note = this._rows[i]._note;
    const ex = this.getAttribute('explain') || '';
    this._fb.className = 'phil-feedback show note';
    this._fb.innerHTML = `<strong>◆ Position recorded</strong>${note}${note && ex ? ' ' : ''}${ex}`;
    if (!this._restoring) PhilSfx.noted();
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
    const items = shuffledOptions(this, this.querySelectorAll('phil-statement'));
    this.innerHTML = '';
    this.append(this.promptNode(this.getAttribute('prompt') || 'Check every statement that is TRUE.', 'group'));
    const list = el('div', 'phil-options');
    this._rows = items.map(it => {
      const row = el('label', 'phil-choice');
      const input = el('input'); input.type = 'checkbox';
      row.append(input, el('span', null, it.innerHTML));
      row._correct = it.hasAttribute('correct');
      row._input = input;
      input.addEventListener('click', e => { if (this._locked) e.preventDefault(); });
      list.append(row);
      return row;
    });
    const btn = el('button', 'phil-btn phil-btn--primary', 'Check answers');
    btn.onclick = () => this._check();
    this.append(list, btn);
    this._btn = btn;
  }
  _check() {
    if (this._blocked) return;
    const sig = this._rows.map(r => (r._input.checked ? 1 : 0)).join('');
    const n = this._rows.length;
    const wrong = this._rows.filter(r => r._input.checked !== r._correct).length;
    this._rows.forEach(r => r.classList.remove('correct', 'wrong'));
    if (!wrong) {
      this._rows.forEach(r => { if (r._correct) r.classList.add('correct'); });
      this.lock(); this.solved(); return;
    }
    // Checking the same answers twice isn't a new try, so it costs nothing.
    if (sig === this._lastSig) {
      this.showFeedback(false, 'Change at least one answer before checking again.', '✘ Same answers as before');
      return;
    }
    this._lastSig = sig;
    // Each check is scored statement by statement: each right one counts for
    // it and each wrong one against it, so random ticking averages zero. The
    // miss says how many are wrong, not which, so the next try is a real one.
    if (this.lesson) this.lesson.raiseCredit(this.qid, ((n - wrong) - wrong) / n * worthAfter(this.lesson.misses(this.qid)));
    this.miss(countHint(wrong, n, 'answer'));
  }
  onBlockChange(blocked) { this._btn.disabled = blocked; }
  lock() {
    this._locked = true;
    this._rows.forEach(r => { r.classList.add('locked'); r._input.setAttribute('aria-disabled', 'true'); });
    this._btn.disabled = true;
  }
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
      // Without this the field announces as a bare "edit" / "combo box" with no
      // clue which gap it fills. tpl is in document order, so the index matches
      // the reading order of the sentence.
      field.setAttribute('aria-label', `Blank ${this._blanks.length + 1} of ${tpl.length}`);
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
    if (this._blocked) return;
    const sig = this._blanks.map(f => this._val(f)).join('|');
    const wrong = this._blanks.filter(f => !f._accepted.includes(this._val(f))).length;
    this._blanks.forEach(f => f.classList.remove('correct', 'wrong'));
    if (!wrong) {
      this._blanks.forEach(f => f.classList.add('correct'));
      this.lock(); this.solved(); return;
    }
    if (sig === this._lastSig) {
      this.showFeedback(false, 'Change at least one blank before checking again.', '✘ Same answers as before');
      return;
    }
    this._lastSig = sig;
    // Each check is scored blank by blank. A wrong dropdown pick costs
    // 1/(options − 1), so random picking averages zero; a wrong typed answer
    // or an empty blank costs nothing, since nobody types it by luck. The miss
    // says how many blanks are wrong, not which.
    if (this.lesson) {
      let score = 0;
      this._blanks.forEach(f => {
        const v = this._val(f);
        if (!v || v === '—') return;
        if (f._accepted.includes(v)) score += 1;
        else if (f.tagName === 'SELECT') score -= 1 / Math.max(1, f.options.length - 2);
      });
      this.lesson.raiseCredit(this.qid, score / this._blanks.length * worthAfter(this.lesson.misses(this.qid)));
    }
    this.miss(countHint(wrong, this._blanks.length, 'blank'));
  }
  onBlockChange(blocked) { this._btn.disabled = blocked; }
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

/* ---------- <phil-classify> : sort each item into one column ----------
   <phil-classify prompt="..." explain="..." review="slide-id">
     <phil-col key="sys">Systems reply</phil-col>
     <phil-col key="rob">Robot reply</phil-col>
     <phil-item answer="rob" why="Why this column, from the lesson.">An item</phil-item>
   </phil-classify>
   A grid: one row per item, one radio per column, plus "Not sure" unless the
   host has `no-unsure`. Rows shuffle on load; columns keep authored order.
   Every check is scored row by row: right +1, wrong −1/(columns−1), not sure
   or blank 0, so random picking averages zero. A miss counts the wrong rows
   without marking them. Every row must be right to finish. Each item's `why` is shown, on request, once solved.
------------------------------------------------------------------ */
class PhilClassify extends PhilWidget {
  build() {
    const cols = [...this.querySelectorAll('phil-col')].map(c => ({ key: c.getAttribute('key'), label: c.innerHTML }));
    const items = shuffledOptions(this, this.querySelectorAll('phil-item'));
    const unsure = !this.hasAttribute('no-unsure');
    this._cols = cols;
    this.innerHTML = '';
    this.classList.add('phil-classify');
    this.append(this.promptNode(this.getAttribute('prompt') || 'Put each item in the right column.', 'group'));

    const wrap = el('div', 'phil-cl-wrap');
    const table = el('table', 'phil-cl');
    const head = el('tr');
    head.append(el('th', 'phil-cl-item-h', '<span class="phil-sr-only">Item</span>'));
    cols.forEach(c => { const th = el('th', null, c.label); th.scope = 'col'; head.append(th); });
    if (unsure) { const th = el('th', 'phil-cl-unsure', 'Not sure'); th.scope = 'col'; head.append(th); }
    const thead = el('thead'); thead.append(head);
    const tbody = el('tbody');
    this._rows = items.map((it, i) => {
      const tr = el('tr', 'phil-cl-row');
      const id = `${this.qid}-r${i}`;
      const text = el('th', 'phil-cl-text', it.innerHTML); text.scope = 'row'; text.id = id;
      tr.append(text);
      const row = { tr, answer: it.getAttribute('answer'), why: it.getAttribute('why') || '', inputs: [] };
      const options = [...cols.map(c => ({ key: c.key, label: c.label })), ...(unsure ? [{ key: '', label: 'Not sure' }] : [])];
      options.forEach(o => {
        const td = el('td', o.key ? null : 'phil-cl-unsure');
        const lab = el('label', 'phil-cl-cell');
        const input = el('input'); input.type = 'radio'; input.name = id; input.value = o.key;
        input.setAttribute('aria-label', `${o.label.replace(/<[^>]+>/g, '')}`);
        input.setAttribute('aria-describedby', id);
        input.addEventListener('click', e => { if (this._locked) e.preventDefault(); });
        lab.append(input);
        td.append(lab); tr.append(td);
        row.inputs.push(input);
      });
      tbody.append(tr);
      const whyRow = el('tr', 'phil-cl-why'); whyRow.hidden = true;
      const whyCell = el('td', null, row.why); whyCell.colSpan = options.length + 1;
      whyRow.append(whyCell); tbody.append(whyRow);
      row.whyRow = whyRow;
      return row;
    });
    table.append(thead, tbody);
    wrap.append(table);
    const btn = el('button', 'phil-btn phil-btn--primary', 'Check answers');
    btn.onclick = () => this._check();
    this._whyBtn = el('button', 'phil-btn phil-cl-whybtn', 'Show why each answer is right');
    this._whyBtn.hidden = true;
    this._whyBtn.onclick = () => {
      const show = this._rows[0]?.whyRow.hidden;
      this._rows.forEach(r => { r.whyRow.hidden = !show; });
      this._whyBtn.textContent = show ? 'Hide the reasons' : 'Show why each answer is right';
    };
    this.append(wrap, btn, this._whyBtn);
    this._btn = btn;
  }
  _pick(row) { return row.inputs.find(i => i.checked)?.value ?? null; }
  _check() {
    if (this._blocked) return;
    const picks = this._rows.map(r => this._pick(r));
    const sig = picks.map(p => p ?? '-').join('|');
    const wrong = this._rows.filter((r, i) => picks[i] !== r.answer).length;
    // Unanswered and "Not sure" rows are marked ?, which gives nothing away.
    // Wrong answers are counted but not marked until the question is solved.
    this._rows.forEach((r, i) => {
      r.tr.classList.remove('correct', 'wrong', 'missing');
      if (!wrong) r.tr.classList.add('correct');
      else if (!picks[i]) r.tr.classList.add('missing');
    });
    if (!wrong) { this.lock(); this.solved(); return; }
    if (sig === this._lastSig) {
      this.showFeedback(false, 'Change at least one answer before checking again.', '✘ Same answers as before');
      return;
    }
    this._lastSig = sig;
    if (this.lesson) {
      const penalty = 1 / Math.max(1, this._cols.length - 1);
      const score = this._rows.reduce((s, r, i) => {
        const p = picks[i];
        return s + (!p ? 0 : p === r.answer ? 1 : -penalty);
      }, 0);
      this.lesson.raiseCredit(this.qid, score / this._rows.length * worthAfter(this.lesson.misses(this.qid)));
    }
    const open = picks.filter(p => !p).length;
    this.miss(countHint(wrong, this._rows.length, 'row') +
      (open ? ' Rows marked ? (no answer, or Not sure) are among them.' : ''));
  }
  onBlockChange(blocked) { this._btn.disabled = blocked; }
  lock() {
    this._locked = true;
    this._rows.forEach(r => r.inputs.forEach(i => i.setAttribute('aria-disabled', 'true')));
    this.classList.add('is-locked');
    this._btn.disabled = true;
    if (this._rows.some(r => r.why)) this._whyBtn.hidden = false;
  }
  restore() {
    this._rows.forEach(r => {
      const right = r.inputs.find(i => i.value === r.answer);
      if (right) right.checked = true;
      r.tr.classList.add('correct');
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

/* ---------- thinker card ----------
   Stands in for a portrait of a real thinker. The face is HTML so it stays
   crisp on a projector; the picture is an idea scene, never a face.
     <phil-thinker slot="art" name="John Searle" dates="1932–2025"
                   work="“Minds, Brains, and Programs” (1980)"
                   img="./assets/idea-searle.png" alt="…" accent="#4cc2ff">
       <p>The core claim, in about twelve words.</p>
       <blockquote>An optional short, verified quotation.</blockquote>
     </phil-thinker>
   `img`/`alt` and `accent` are optional; `alt` is required when `img` is set.
------------------------------------------------------------------ */
class PhilThinker extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    this.classList.add('phil-thinker');
    const accent = this.getAttribute('accent');
    if (accent) this.style.setProperty('--phil-thinker-accent', accent);
    const body = [...this.childNodes];
    const head = el('div', 'phil-thinker__head');
    if (this.hasAttribute('img')) {
      const img = el('img', 'phil-thinker__img');
      img.src = this.getAttribute('img');
      img.alt = this.getAttribute('alt') || '';
      head.append(img);
    }
    head.append(el('p', 'phil-thinker__name', this.getAttribute('name') || ''));
    const meta = [this.getAttribute('dates'), this.getAttribute('work')].filter(Boolean).join(' · ');
    if (meta) head.append(el('p', 'phil-thinker__meta', meta));
    const text = el('div', 'phil-thinker__text');
    text.append(...body);
    this.append(head, text);
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
function likertScale(selected, onPick, labelledBy) {
  const row = el('div', 'phil-scale');
  row.setAttribute('role', 'group');
  if (labelledBy) row.setAttribute('aria-labelledby', labelledBy);
  const cells = [];
  for (let v = 1; v <= 5; v++) {
    const b = el('button', null, String(v));
    b.type = 'button';
    b.setAttribute('aria-label', LIKERT[v]);
    // The .sel class is the only visual marker of the current rating; aria-pressed
    // is what lets a screen-reader user read their own answer back — which the
    // whole before/after belief probe depends on.
    b.setAttribute('aria-pressed', String(v === selected));
    if (v === selected) b.classList.add('sel');
    b.onclick = () => {
      cells.forEach(c => { c.classList.remove('sel'); c.setAttribute('aria-pressed', 'false'); });
      b.classList.add('sel');
      b.setAttribute('aria-pressed', 'true');
      onPick(v);
    };
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
      const label = el('p', 'phil-belief__text', text);
      label.id = `${this.key}-pre-${i}`;
      row.append(label);
      row.append(likertScale(rec.pre[i], v => { rec.pre[i] = v; this.store.save(); this._sync(); }, label.id));
      this.append(row);
    });
    this._submit = el('button', 'phil-btn phil-btn--primary phil-belief__submit', 'Submit');
    this._submit.onclick = () => this._onSubmit();
    this._status = el('p', 'phil-belief__status');
    this._status.setAttribute('role', 'status');
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
      const label = el('p', 'phil-belief__text', text);
      label.id = `${this.key}-post-${i}`;
      row.append(label);
      row.append(el('p', 'phil-belief__then', pre ? `Then: ${LIKERT[pre]}` : 'Then: (not rated)'));
      const delta = el('p', 'phil-belief__delta none', '');
      row.append(likertScale(rec.post[i], v => { rec.post[i] = v; this.store.save(); beliefDelta(delta, pre, v); this._sync(); }, label.id));
      row.append(delta);
      beliefDelta(delta, pre, rec.post[i]);
      this.append(row);
    });
    this._submit = el('button', 'phil-btn phil-btn--primary phil-belief__submit', 'Submit');
    this._submit.onclick = () => this._onSubmit();
    this._status = el('p', 'phil-belief__status');
    this._status.setAttribute('role', 'status');
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
customElements.define('phil-poll', PhilPoll);
customElements.define('phil-checkset', PhilCheckset);
customElements.define('phil-cloze', PhilCloze);
customElements.define('phil-classify', PhilClassify);
customElements.define('phil-branch', PhilBranch);
customElements.define('phil-compare', PhilCompare);
customElements.define('phil-thinker', PhilThinker);
customElements.define('phil-beliefs', PhilBeliefs);
customElements.define('phil-beliefs-review', PhilBeliefsReview);
