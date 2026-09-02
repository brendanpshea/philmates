/**
 * <phil-mean> — a Deficiency → Mean → Excess spectrum, for any virtue-ethics lesson
 *
 * Pick a character and a domain (a virtue, or a facet of one); a spectrum runs
 * from Deficiency through the Mean to Excess, with the character's position
 * marked and a one-line note. Ungraded — purely for exploration.
 *
 * The lesson supplies its own data as an inline JSON block, so the same widget
 * serves the Greek heroes in the virtue-ethics lesson and the clinicians in the
 * care lesson:
 *
 *   <phil-mean prompt="Explore the mean:" domain-label="Virtue domain">
 *     <script type="application/json">
 *     {
 *       "domains": [
 *         { "id": "courage", "virtue": "Courage", "deficiency": "Cowardice", "excess": "Rashness" }
 *       ],
 *       "characters": [
 *         { "id": "achilles", "name": "Achilles",
 *           "positions": { "courage": { "pos": 0.85, "note": "…" } } }
 *       ]
 *     }
 *     </script>
 *   </phil-mean>
 *
 * pos: 0 = pure deficiency, 0.5 = the mean, 1 = pure excess. A character with no
 * entry for a domain sits at the mean with no note.
 *
 * Attributes: `prompt`, `domain-label` (default "Virtue domain"),
 * `character-label` (default "Character"). Do not name any attribute `reveal`.
 */

class PhilMean extends HTMLElement {
  connectedCallback() {
    const prompt = this.getAttribute('prompt') || 'Explore the mean:';
    const domainLabel = this.getAttribute('domain-label') || 'Virtue domain';
    const charLabel = this.getAttribute('character-label') || 'Character';

    const data = this._readData();
    if (!data) return;
    this._domains = data.domains || data.virtues || [];
    this._chars = data.characters || [];

    this.innerHTML = `
      <div class="mean-viz">
        <p class="mean-prompt">${prompt}</p>
        <div class="mean-controls">
          <label>
            <span class="mean-label">${charLabel}</span>
            <select class="mean-char-select"></select>
          </label>
          <label>
            <span class="mean-label">${domainLabel}</span>
            <select class="mean-virtue-select"></select>
          </label>
        </div>
        <div class="mean-spectrum">
          <div class="mean-bar">
            <span class="mean-def-label"></span>
            <span class="mean-virtue-label"></span>
            <span class="mean-exc-label"></span>
            <div class="mean-marker" role="img" aria-label="Character position"></div>
            <div class="mean-center-line" aria-hidden="true"></div>
          </div>
        </div>
        <p class="mean-note"></p>
      </div>
    `;

    const charSel = this.querySelector('.mean-char-select');
    const virtSel = this.querySelector('.mean-virtue-select');

    this._chars.forEach(c => {
      const o = document.createElement('option');
      o.value = c.id; o.textContent = c.name;
      charSel.appendChild(o);
    });
    this._domains.forEach(v => {
      const o = document.createElement('option');
      o.value = v.id; o.textContent = `${v.virtue} (${v.deficiency} ↔ ${v.excess})`;
      virtSel.appendChild(o);
    });

    const update = () => this._update();
    charSel.addEventListener('change', update);
    virtSel.addEventListener('change', update);
    this._update();
  }

  /* Parse the inline JSON block. A missing or broken block renders a legible
     message on the slide instead of an empty box. */
  _readData() {
    const block = this.querySelector('script[type="application/json"]');
    try {
      if (!block) throw new Error('no data block');
      return JSON.parse(block.textContent);
    } catch (err) {
      this.innerHTML = `<p class="mean-error">This widget has no data to show. ` +
        `Author: give &lt;phil-mean&gt; an inline &lt;script type="application/json"&gt; block ` +
        `with "domains" and "characters".</p>`;
      console.error('<phil-mean>: could not read data —', err);
      return null;
    }
  }

  _update() {
    const charId = this.querySelector('.mean-char-select').value;
    const virtId = this.querySelector('.mean-virtue-select').value;
    const ch = this._chars.find(c => c.id === charId);
    const vt = this._domains.find(v => v.id === virtId);
    if (!ch || !vt) return;

    const data = (ch.positions || {})[virtId];
    const pos = data ? data.pos : 0.5;
    const note = data ? data.note : '';

    this.querySelector('.mean-def-label').textContent = vt.deficiency;
    this.querySelector('.mean-virtue-label').textContent = vt.virtue;
    this.querySelector('.mean-exc-label').textContent = vt.excess;

    const marker = this.querySelector('.mean-marker');
    marker.style.left = `${pos * 100}%`;
    marker.textContent = ch.name;

    // Color hint: green near center, amber further out, magenta at the extremes.
    // The word in the note carries the same information for anyone who cannot
    // tell the colors apart.
    const dist = Math.abs(pos - 0.5) * 2; // 0–1
    if (dist < 0.2) {
      marker.style.background = 'var(--go, #46e07a)';
    } else if (dist < 0.5) {
      marker.style.background = 'var(--amber, #ffcf5a)';
    } else {
      marker.style.background = 'var(--mag, #ff6ad5)';
    }
    marker.style.color = '#11131f';

    this.querySelector('.mean-note').textContent = note;
  }
}

customElements.define('phil-mean', PhilMean);

/* ── Scoped styles (injected once) ── */
if (!document.getElementById('phil-mean-styles')) {
  const s = document.createElement('style');
  s.id = 'phil-mean-styles';
  s.textContent = `
    .mean-viz {
      max-width: 640px;
      margin: 1rem auto;
    }
    .mean-prompt {
      font-weight: 600;
      margin-bottom: .75rem;
    }
    .mean-error {
      padding: .75rem 1rem;
      border: 1px solid var(--mag, #ff6ad5);
      border-radius: 6px;
    }
    .mean-controls {
      display: flex; gap: 1rem; flex-wrap: wrap;
      margin-bottom: 1.25rem;
    }
    .mean-controls label {
      display: flex; flex-direction: column; gap: .25rem; flex: 1 1 200px;
    }
    .mean-label {
      font-size: .85rem; opacity: .7; text-transform: uppercase; letter-spacing: .04em;
    }
    .mean-controls select {
      padding: .45rem .5rem;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,.15);
      background: var(--panel, #1d2235);
      color: var(--ink, #eef1ff);
      font-size: .95rem;
    }
    .mean-spectrum {
      position: relative;
      padding: 2.5rem 0 1rem;
    }
    /* The opacity lives on the gradient itself, not on .mean-bar. On the bar it
       composited the child labels too, dragging "Cowardice"/"Courage"/"Rashness"
       down to 3.1-4.2:1 against the panel — under the 4.5:1 minimum. Same look,
       readable text. */
    .mean-bar {
      position: relative;
      height: 12px;
      border-radius: 6px;
    }
    .mean-bar::after {
      content: ""; position: absolute; inset: 0;
      border-radius: inherit;
      background: linear-gradient(90deg,
        var(--info, #4cc2ff) 0%,
        var(--go, #46e07a) 50%,
        var(--mag, #ff6ad5) 100%);
      opacity: .6;
      z-index: 0;
    }
    .mean-center-line {
      z-index: 1;
      position: absolute;
      left: 50%; top: -6px;
      width: 2px; height: 24px;
      background: var(--go, #46e07a);
      transform: translateX(-50%);
      opacity: .8;
    }
    .mean-def-label, .mean-virtue-label, .mean-exc-label {
      position: absolute; top: -1.6rem;
      font-size: .78rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: .03em;
      z-index: 1;
    }
    .mean-def-label { left: 0; color: var(--info, #4cc2ff); }
    .mean-virtue-label {
      left: 50%; transform: translateX(-50%);
      color: var(--go, #46e07a);
    }
    .mean-exc-label { right: 0; color: var(--mag, #ff6ad5); }
    .mean-marker {
      position: absolute;
      z-index: 2;
      top: -10px;
      transform: translateX(-50%);
      padding: .2rem .55rem;
      border-radius: 4px;
      font-size: .82rem; font-weight: 700;
      white-space: nowrap;
      transition: left .4s ease, background .4s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,.4);
    }
    .mean-note {
      margin-top: 1rem;
      font-size: .92rem;
      font-style: italic;
      opacity: .85;
      min-height: 2.5em;
    }
  `;
  document.head.appendChild(s);
}
