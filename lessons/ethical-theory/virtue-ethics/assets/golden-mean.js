/**
 * <phil-mean> — "The Golden Mean" interactive visualization
 *
 * Pick a character and a virtue domain; a spectrum runs from Deficiency
 * through the Mean (virtue) to Excess, with the character's mythic position
 * marked. Ungraded — purely for exploration.
 *
 * Usage (in index.html):
 *   <phil-mean prompt="Explore the mean:"></phil-mean>
 *
 * Data is embedded here so the component is self-contained.
 */

const VIRTUES = [
  {
    id: 'courage',
    virtue: 'Courage',
    deficiency: 'Cowardice',
    excess: 'Rashness',
  },
  {
    id: 'temperance',
    virtue: 'Temperance',
    deficiency: 'Insensibility',
    excess: 'Self-indulgence',
  },
  {
    id: 'generosity',
    virtue: 'Generosity',
    deficiency: 'Stinginess',
    excess: 'Prodigality',
  },
  {
    id: 'truthfulness',
    virtue: 'Truthfulness',
    deficiency: 'Self-deprecation',
    excess: 'Boastfulness',
  },
  {
    id: 'justice',
    virtue: 'Justice',
    deficiency: 'Passivity',
    excess: 'Vigilantism',
  },
];

// position: 0 = pure deficiency, 0.5 = mean, 1 = pure excess
const CHARACTERS = [
  {
    id: 'achilles',
    name: 'Achilles',
    positions: {
      courage:      { pos: 0.85, note: 'Legendary bravery tipped into blind rage — his wrath drove the Iliad.' },
      temperance:   { pos: 0.80, note: 'Feasts, glory, Briseis — Achilles rarely held back from anything.' },
      generosity:   { pos: 0.55, note: 'Generous with allies in victory, but only on his own terms.' },
      truthfulness: { pos: 0.65, note: 'Blunt and direct, sometimes brutally so — a shade past honest.' },
      justice:      { pos: 0.75, note: 'Desecrating Hector\'s body crossed the line from justice into vengeance.' },
    },
  },
  {
    id: 'odysseus',
    name: 'Odysseus',
    positions: {
      courage:      { pos: 0.50, note: 'Brave when needed, cautious when wise — the Cyclops cave, the Sirens.' },
      temperance:   { pos: 0.50, note: 'Patient for twenty years; endured humiliation to reclaim Ithaca.' },
      generosity:   { pos: 0.45, note: 'Shared spoils and credit, but always kept an eye on his own survival.' },
      truthfulness: { pos: 0.30, note: 'The great deceiver — "Nobody" in the cave, lies to Penelope, endless cunning.' },
      justice:      { pos: 0.55, note: 'Mostly fair, though the slaughter of the suitors was… thorough.' },
    },
  },
  {
    id: 'penelope',
    name: 'Penelope',
    positions: {
      courage:      { pos: 0.50, note: 'Held Ithaca for twenty years against the suitors — steadfast, not reckless.' },
      temperance:   { pos: 0.50, note: 'The weaving trick: patience as strategy, not passivity.' },
      generosity:   { pos: 0.50, note: 'Managed a household with care, neither hoarding nor wasting.' },
      truthfulness: { pos: 0.45, note: 'Honest at heart, but the shroud trick was a necessary deception.' },
      justice:      { pos: 0.50, note: 'Kept faith with her household and her absent husband — the model of fairness.' },
    },
  },
  {
    id: 'medea',
    name: 'Medea',
    positions: {
      courage:      { pos: 0.70, note: 'Fearless in pursuit of revenge — but courage without wisdom is dangerous.' },
      temperance:   { pos: 0.90, note: 'Consumed by passion: love became vengeance, and she burned everything.' },
      generosity:   { pos: 0.25, note: 'Gave everything for Jason, then took everything back — and more.' },
      truthfulness: { pos: 0.35, note: 'Manipulated and deceived to achieve her ends.' },
      justice:      { pos: 0.85, note: 'Punished betrayal with annihilation — justice curdled into revenge.' },
    },
  },
  {
    id: 'icarus',
    name: 'Icarus',
    positions: {
      courage:      { pos: 0.80, note: 'Flew too high despite clear warnings — recklessness, not courage.' },
      temperance:   { pos: 0.85, note: 'Could not resist the thrill of the sun — the failure of the mean, literally.' },
      generosity:   { pos: 0.50, note: 'No real data — his story is about self-control, not giving.' },
      truthfulness: { pos: 0.50, note: 'No deception — just youthful heedlessness.' },
      justice:      { pos: 0.50, note: 'His tragedy is personal, not interpersonal.' },
    },
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    positions: {
      courage:      { pos: 0.55, note: 'Defied Zeus for humanity — brave, and he knew the cost.' },
      temperance:   { pos: 0.50, note: 'Endured eternal punishment without breaking — supreme steadfastness.' },
      generosity:   { pos: 0.70, note: 'Gave fire (civilization itself) to mortals — generosity at its most radical.' },
      truthfulness: { pos: 0.40, note: 'Stole fire by trickery — the gift was honest, the method wasn\'t.' },
      justice:      { pos: 0.60, note: 'Just toward humanity, but did his justice require unjust means?' },
    },
  },
];

class PhilMean extends HTMLElement {
  connectedCallback() {
    const prompt = this.getAttribute('prompt') || 'Explore the mean:';
    this.innerHTML = `
      <div class="mean-viz">
        <p class="mean-prompt">${prompt}</p>
        <div class="mean-controls">
          <label>
            <span class="mean-label">Character</span>
            <select class="mean-char-select"></select>
          </label>
          <label>
            <span class="mean-label">Virtue domain</span>
            <select class="mean-virtue-select"></select>
          </label>
        </div>
        <div class="mean-spectrum">
          <div class="mean-bar">
            <span class="mean-def-label"></span>
            <span class="mean-virtue-label"></span>
            <span class="mean-exc-label"></span>
            <div class="mean-marker" aria-label="Character position"></div>
            <div class="mean-center-line" aria-hidden="true"></div>
          </div>
        </div>
        <p class="mean-note"></p>
      </div>
    `;

    const charSel = this.querySelector('.mean-char-select');
    const virtSel = this.querySelector('.mean-virtue-select');

    CHARACTERS.forEach(c => {
      const o = document.createElement('option');
      o.value = c.id; o.textContent = c.name;
      charSel.appendChild(o);
    });
    VIRTUES.forEach(v => {
      const o = document.createElement('option');
      o.value = v.id; o.textContent = `${v.virtue} (${v.deficiency} ↔ ${v.excess})`;
      virtSel.appendChild(o);
    });

    const update = () => this._update();
    charSel.addEventListener('change', update);
    virtSel.addEventListener('change', update);
    this._update();
  }

  _update() {
    const charId = this.querySelector('.mean-char-select').value;
    const virtId = this.querySelector('.mean-virtue-select').value;
    const ch = CHARACTERS.find(c => c.id === charId);
    const vt = VIRTUES.find(v => v.id === virtId);
    if (!ch || !vt) return;

    const data = ch.positions[virtId];
    const pos = data ? data.pos : 0.5;
    const note = data ? data.note : '';

    this.querySelector('.mean-def-label').textContent = vt.deficiency;
    this.querySelector('.mean-virtue-label').textContent = vt.virtue;
    this.querySelector('.mean-exc-label').textContent = vt.excess;

    const marker = this.querySelector('.mean-marker');
    marker.style.left = `${pos * 100}%`;
    marker.textContent = ch.name;

    // Color hint: green near center, magenta at extremes
    const dist = Math.abs(pos - 0.5) * 2; // 0–1
    if (dist < 0.2) {
      marker.style.background = 'var(--go, #46e07a)';
      marker.style.color = '#11131f';
    } else if (dist < 0.5) {
      marker.style.background = 'var(--amber, #ffcf5a)';
      marker.style.color = '#11131f';
    } else {
      marker.style.background = 'var(--mag, #ff6ad5)';
      marker.style.color = '#11131f';
    }

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
    .mean-bar {
      position: relative;
      height: 12px;
      border-radius: 6px;
      background: linear-gradient(90deg,
        var(--info, #4cc2ff) 0%,
        var(--go, #46e07a) 50%,
        var(--mag, #ff6ad5) 100%);
      opacity: .6;
    }
    .mean-center-line {
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
    }
    .mean-def-label { left: 0; color: var(--info, #4cc2ff); }
    .mean-virtue-label {
      left: 50%; transform: translateX(-50%);
      color: var(--go, #46e07a);
    }
    .mean-exc-label { right: 0; color: var(--mag, #ff6ad5); }
    .mean-marker {
      position: absolute;
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
