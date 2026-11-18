/* =====================================================================
   SCORM 1.2 adapter for PhilMates lessons.

   Loaded ONLY in packaged (SCORM) builds, via a <script> tag the build
   inserts BEFORE phil-core.js. It does two things:

     1. Finds the LMS API and runs LMSInitialize.
     2. Installs globalThis.PhilProgressStore — a drop-in replacement for
        phil-core's localStorage ProgressStore, with the same surface
        (visited / correct / completed / beliefs Sets+objects, save(), reset()).

   The live website never loads this file, so its behaviour is unchanged.

   Data model mapping:
     cmi.core.lesson_status   <- "passed" once complete (completion already
                                  requires every question correct), else
                                  "incomplete".
     cmi.core.score.raw       <- the better of this attempt's score and the best
                                  earlier attempt. An attempt's score is
                                  round(earned credit / total * 100). Each wrong
                                  try lowers what a question can still earn by
                                  0.8 (100, 80, 64 …); multi-part items also bank
                                  partial credit per check. The reported score
                                  never falls. Reported even mid-lesson so the
                                  gradebook shows partial work.
     cmi.core.session_time    <- time in the lesson this session, on exit. The
                                  LMS adds it up into total time.
     cmi.suspend_data         <- compact JSON of {v,c,d,b,p,m,k,f,s,a} for resume.
                                  f = when this attempt was finished (ms), s = best
                                  earlier attempt's score, a = attempt number.
                                  SCORM 1.2 caps this at 4096 chars; we store
                                  question IDs, not labels, and warn if we approach
                                  the limit.

   Reset and retake.
     Reset clears the slides and answers so a student can run the lesson again,
     but keeps wrong-try counts and earned credit, so it never raises a score.
     Retake opens RETAKE_WAIT_HOURS after an attempt is finished. It starts a
     new attempt with wrong tries and credit cleared, and remembers the best
     score so far, so the gradebook keeps the best attempt. The wait makes the
     second try real recall rather than a replay of the keys just seen. The
     clock is the student's own, which a determined student could change.
     Neither one moves a "passed" lesson back to "incomplete".
   ===================================================================== */
(function () {
  'use strict';

  /* Hours after finishing an attempt before a retake opens. */
  const RETAKE_WAIT_HOURS = 24;

  /* ---- locate the LMS API (SCORM 1.2 discovery algorithm) ---- */
  function findAPI(win) {
    let depth = 0;
    while (win.API == null && win.parent != null && win.parent !== win) {
      if (++depth > 7) break;
      win = win.parent;
    }
    return win.API || null;
  }
  function getAPI() {
    let api = findAPI(window);
    if (!api && window.opener) api = findAPI(window.opener);
    return api;
  }

  const API = getAPI();
  const bool = v => String(v) === 'true';
  let initialized = false;

  if (!API) {
    console.warn('[scorm] No LMS API found — running unconnected. Progress will not be saved to the LMS.');
  } else {
    initialized = bool(API.LMSInitialize(''));
    if (!initialized) console.warn('[scorm] LMSInitialize failed:', API.LMSGetLastError());
  }

  const get = k => (initialized ? API.LMSGetValue(k) : '');
  const set = (k, v) => { if (initialized) API.LMSSetValue(k, String(v)); };
  const commit = () => { if (initialized) API.LMSCommit(''); };

  /* total graded questions present in the lesson — the score denominator */
  const totalQuestions = () =>
    document.querySelectorAll('phil-mcq, phil-checkset, phil-cloze, phil-classify').length;

  /* =====================================================================
     The store. Same shape phil-core expects from ProgressStore.
     ===================================================================== */
  class ScormProgressStore {
    constructor(lessonId) {
      this.lessonId = lessonId;

      let data = {};
      try { data = JSON.parse(get('cmi.suspend_data') || '{}') || {}; } catch { data = {}; }

      this.visited   = new Set(data.v || []);
      this.correct   = new Set(data.c || []);
      this.completed = !!data.d;
      this.beliefs   = data.b || {};
      // Every field phil-core's ProgressStore exposes has to be here. `polls`
      // was missing, so <phil-poll> threw on every pick in packaged builds:
      // the ✔ counter never moved, polls never restored on resume, and
      // completion could never fire because tasksDone never reached its total.
      // The score still climbed, because that is computed from the graded
      // questions alone — which is why the gradebook looked right while the
      // lesson looked broken.
      this.polls     = data.p || {};
      this.misses    = data.m || {};
      this.credit    = data.k || {};
      // Progress saved before graded credit existed keeps full credit.
      for (const q of this.correct) if (!(q in this.credit)) this.credit[q] = 1;
      this.keepsCredit = true;   // phil-core tells the student Reset won't raise the score
      this.retakeWaitHours = RETAKE_WAIT_HOURS;
      this._t0 = Date.now();

      // First launch: move "not attempted" to "incomplete" so the LMS shows
      // the lesson as in-progress the moment it opens.
      const status = get('cmi.core.lesson_status');
      this.passedOnce = status === 'passed' || this.completed;

      // Retakes. A lesson finished before retakes existed has no finish time;
      // it was finished at least that long ago, so its retake is open now.
      this.best = typeof data.s === 'number' ? data.s : null;   // best earlier attempt, 0–100
      this.attempt = data.a || 1;
      // Only a missing field means "from before retakes"; null means this
      // attempt isn't finished yet.
      this.finishedAt = 'f' in data ? data.f : (this.passedOnce ? 0 : null);
      if (initialized && (!status || status === 'not attempted')) {
        set('cmi.core.lesson_status', 'incomplete');
        commit();
      }

      // Report the resumed score immediately.
      this._writeScore();

      // Make sure the session is closed out exactly once when the learner leaves.
      window.addEventListener('pagehide', () => this.finish());
    }

    /* This attempt's score, 0–100, or null with no questions. */
    attemptScore() {
      const total = totalQuestions();
      if (!total) return null;
      const earned = Object.values(this.credit).reduce((s, c) => s + c, 0);
      return Math.round((Math.min(earned, total) / total) * 100);
    }
    /* The score the gradebook holds: the best of every attempt so far. */
    bestScore() { return Math.max(this.best ?? 0, this.attemptScore() ?? 0); }

    _writeScore() {
      if (this.attemptScore() == null) return;
      set('cmi.core.score.min', '0');
      set('cmi.core.score.max', '100');
      set('cmi.core.score.raw', this.bestScore());
    }

    /* When a retake opens (ms), or null if this attempt isn't finished yet. */
    retakeOpensAt() {
      return this.finishedAt == null ? null : this.finishedAt + RETAKE_WAIT_HOURS * 3600e3;
    }
    canRetake() {
      const t = this.retakeOpensAt();
      return t != null && Date.now() >= t;
    }
    _payload() {
      return { m: this.misses, k: this.credit, f: this.finishedAt, s: this.best, a: this.attempt };
    }

    save() {
      if (this.completed && this.finishedAt == null) this.finishedAt = Date.now();
      const payload = JSON.stringify({
        v: [...this.visited],
        c: [...this.correct],
        d: this.completed,
        b: this.beliefs,
        p: this.polls,
        ...this._payload(),
      });
      if (payload.length > 4000) {
        console.warn(`[scorm] suspend_data is ${payload.length} chars — close to SCORM 1.2's 4096 limit.`);
      }
      set('cmi.suspend_data', payload);
      this._writeScore();
      if (this.completed) { this.passedOnce = true; set('cmi.core.lesson_status', 'passed'); }
      commit();
    }

    reset() {
      this.visited.clear();
      this.correct.clear();
      this.completed = false;
      this.beliefs = {};
      this.polls = {};
      // Keep misses and credit (in suspend_data and the score) so a reset
      // can't farm first-try credit, and keep a lesson that was passed passed.
      // The finish time is kept too, so the retake still opens on schedule.
      set('cmi.suspend_data', JSON.stringify(this._payload()));
      if (!this.passedOnce) set('cmi.core.lesson_status', 'incomplete');
      this._writeScore();
      commit();
    }

    /* A new attempt: everything starts over, including wrong tries and credit.
       The best score so far is remembered, so the gradebook never drops. */
    retake() {
      if (!this.canRetake()) return this.reset();
      this.best = this.bestScore();
      this.attempt += 1;
      this.misses = {};
      this.credit = {};
      this.finishedAt = null;
      this.reset();
    }

    finish() {
      if (!initialized || this._finished) return;
      this._finished = true;
      // SCORM 1.2 CMITimespan: HHHH:MM:SS (hours may be 2-4 digits).
      const secs = Math.max(0, Math.round((Date.now() - this._t0) / 1000));
      const pad = n => String(n).padStart(2, '0');
      set('cmi.core.session_time', `${pad(Math.floor(secs / 3600))}:${pad(Math.floor(secs / 60) % 60)}:${pad(secs % 60)}`);
      set('cmi.core.exit', this.completed ? '' : 'suspend');
      commit();
      API.LMSFinish('');
    }
  }

  globalThis.PhilProgressStore = ScormProgressStore;
})();
