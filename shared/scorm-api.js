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
     cmi.core.score.raw       <- round(correct / total * 100). Reported even
                                  mid-lesson so the gradebook shows partial work.
     cmi.suspend_data         <- compact JSON of {v,c,d,b} for resume. SCORM 1.2
                                  caps this at 4096 chars; we store question IDs,
                                  not labels, and warn if we approach the limit.
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
    document.querySelectorAll('phil-mcq, phil-checkset, phil-cloze').length;

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

      // First launch: move "not attempted" to "incomplete" so the LMS shows
      // the lesson as in-progress the moment it opens.
      const status = get('cmi.core.lesson_status');
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
      const raw = Math.round((this.correct.size / total) * 100);
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
      });
      if (payload.length > 4000) {
        console.warn(`[scorm] suspend_data is ${payload.length} chars — close to SCORM 1.2's 4096 limit.`);
      }
      set('cmi.suspend_data', payload);
      this._writeScore();
      if (this.completed) set('cmi.core.lesson_status', 'passed');
      commit();
    }

    reset() {
      this.visited.clear();
      this.correct.clear();
      this.completed = false;
      this.beliefs = {};
      set('cmi.suspend_data', '');
      set('cmi.core.lesson_status', 'incomplete');
      set('cmi.core.score.raw', '');
      commit();
    }

    finish() {
      if (!initialized || this._finished) return;
      this._finished = true;
      set('cmi.core.exit', this.completed ? '' : 'suspend');
      commit();
      API.LMSFinish('');
    }
  }

  globalThis.PhilProgressStore = ScormProgressStore;
})();
