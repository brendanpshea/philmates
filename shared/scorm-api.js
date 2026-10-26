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
     cmi.core.score.raw       <- round(earned credit / total * 100). An MCQ's
                                  credit halves with each wrong try (100, 50, 25 …);
                                  a checkset or cloze is scored part by part on its
                                  first check. Credit is locked in and never rises.
                                  Reported even mid-lesson so the gradebook shows
                                  partial work.
     cmi.core.session_time    <- time in the lesson this session, on exit. The
                                  LMS adds it up into total time.
     cmi.suspend_data         <- compact JSON of {v,c,d,b,p,m,k} for resume. SCORM
                                  1.2 caps this at 4096 chars; we store question IDs,
                                  not labels, and warn if we approach the limit.

   Reset never raises a score. It clears the slides and answers so a student
   can run the lesson again, but keeps wrong-try counts and earned credit, and
   never moves a "passed" lesson back to "incomplete".
   ===================================================================== */
(function () {
  'use strict';

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
      this._t0 = Date.now();

      // First launch: move "not attempted" to "incomplete" so the LMS shows
      // the lesson as in-progress the moment it opens.
      const status = get('cmi.core.lesson_status');
      this.passedOnce = status === 'passed' || this.completed;
      if (initialized && (!status || status === 'not attempted')) {
        set('cmi.core.lesson_status', 'incomplete');
        commit();
      }

      // Report the resumed score immediately.
      this._writeScore();

      // Make sure the session is closed out exactly once when the learner leaves.
      window.addEventListener('pagehide', () => this.finish());
    }

    _writeScore() {
      const total = totalQuestions();
      if (!total) return;
      const earned = Object.values(this.credit).reduce((s, c) => s + c, 0);
      const raw = Math.round((Math.min(earned, total) / total) * 100);
      set('cmi.core.score.min', '0');
      set('cmi.core.score.max', '100');
      set('cmi.core.score.raw', raw);
    }

    save() {
      const payload = JSON.stringify({
        v: [...this.visited],
        c: [...this.correct],
        d: this.completed,
        b: this.beliefs,
        p: this.polls,
        m: this.misses,
        k: this.credit,
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
      set('cmi.suspend_data', JSON.stringify({ m: this.misses, k: this.credit }));
      if (!this.passedOnce) set('cmi.core.lesson_status', 'incomplete');
      this._writeScore();
      commit();
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
