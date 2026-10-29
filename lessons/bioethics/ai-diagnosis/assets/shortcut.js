/* =====================================================================
   <phil-shortcut prompt="…"> — what is the Third Twin looking at?

   Twelve chest X-rays, each read by the radiologists and by the Third
   Twin. The student covers part of every scan (the lungs, or the small
   tag in the corner that marks a scan taken on a portable machine) and
   watches which cover changes the machine's verdicts. Covering the lungs
   changes nothing; covering the tag leaves it unable to decide. Then the
   student sends it to the Prairie clinic, which has only a portable
   machine, and it calls every scan pneumonia.

   The teaching is shortcut learning. Downtown, portable scans are taken at
   the bedside of patients too sick to walk to the X-ray room, so the tag
   goes with pneumonia, and a machine that reads only the tag scores well.
   It is a toy: the Third Twin here reads the tag and nothing else. Real
   systems lean on many clues at once. The slides carry the real studies
   (Zech et al. 2018); nothing graded depends on this widget.

   Teaching widget: ungraded, no completion hook, no persistence, the same
   contract as <phil-herd>.

   Headings are h2: the widget sits under the slide's h1.
   Type is sized to project: nothing below 15px.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

// Each scan: portable machine? pneumonia (the radiologists' read)? which lung.
// Downtown: 5 portable (4 pneumonia), 7 taken in the X-ray room (1 pneumonia).
// A machine that calls every portable scan pneumonia gets 10 of 12 right.
const SETS = {
  downtown: {
    name: 'Downtown hospital',
    scans: [
      { portable: true,  sick: true,  side: 'l' },
      { portable: false, sick: false },
      { portable: false, sick: false },
      { portable: true,  sick: true,  side: 'r' },
      { portable: false, sick: true,  side: 'l' },
      { portable: false, sick: false },
      { portable: true,  sick: false },
      { portable: false, sick: false },
      { portable: true,  sick: true,  side: 'r' },
      { portable: false, sick: false },
      { portable: true,  sick: true,  side: 'l' },
      { portable: false, sick: false },
    ],
  },
  // The Prairie clinic has only a portable machine. 3 of 12 have pneumonia.
  prairie: {
    name: 'Prairie clinic',
    scans: [
      { portable: true, sick: false },
      { portable: true, sick: false },
      { portable: true, sick: true, side: 'r' },
      { portable: true, sick: false },
      { portable: true, sick: false },
      { portable: true, sick: false },
      { portable: true, sick: true, side: 'l' },
      { portable: true, sick: false },
      { portable: true, sick: false },
      { portable: true, sick: false },
      { portable: true, sick: true, side: 'r' },
      { portable: true, sick: false },
    ],
  },
};

// The Third Twin reads the corner tag and nothing else.
const verdict = (scan, cover) => cover.tag ? 'unsure' : (scan.portable ? 'sick' : 'clear');
const WORD = { sick: 'pneumonia', clear: 'clear', unsure: "can't tell" };

const STYLE = `
.sc { display:block; margin:12px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow);
      --sc-tag:#ffcf5a; --sc-film:#0b1220; --sc-bone:#c9d3ee; --sc-lung:#2b3a5c; --sc-cloud:#eef1ff; }
.sc-prompt { margin:0 0 10px; font-size:17px; line-height:1.45; }
.sc-bar { display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin:0 0 10px; }
.sc-btn { font-family:var(--pixel); font-size:9px; line-height:1.5; padding:8px 9px;
          background:var(--panel); color:var(--ink); border:3px solid var(--border);
          box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.sc-btn:hover { background:#313a5e; }
.sc-btn[aria-pressed="true"] { background:#3b4470; outline:2px solid var(--accent-3); }
.sc-gap { flex:1 1 12px; }
.sc-grid { display:grid; grid-template-columns:repeat(6, minmax(0, 1fr)); gap:8px; margin:0 0 10px; }
@media (max-width:760px) { .sc-grid { grid-template-columns:repeat(3, minmax(0, 1fr)); } }
.sc-card { background:var(--panel); border:3px solid var(--border); padding:4px; }
.sc-card svg { display:block; width:100%; max-width:90px; height:auto; margin:0 auto; }
phil-slide .sc-card p { margin:3px 0 0; font-size:15px; line-height:1.25; max-width:none; }
.sc-card .sc-doc { color:var(--muted); }
.sc-card .sc-twin { color:var(--ink); font-weight:700; }
.sc-card.sc-wrong { border-color:var(--bad); }
.sc-out { background:var(--panel); border:3px solid var(--border); padding:8px 10px; min-height:3.2em; }
phil-slide .sc-out p { margin:0 0 4px; font-size:16px; line-height:1.4; max-width:none; }
phil-slide .sc-out p:last-child { margin-bottom:0; }
phil-slide .sc-note { margin:8px 0 0; font-size:15px; line-height:1.45; color:var(--muted); max-width:none; }
.sc-note b { color:var(--sc-tag); }
`;

/* One chest X-ray, drawn in a 100 × 100 box: ribs, two lungs, the heart's
   shadow, a white cloud in one lung for pneumonia, and a yellow tag in the
   top corner for a portable machine. Covers are hatched gray boxes. */
function xray(scan, cover) {
  const ribs = [30, 40, 50, 60, 70].map(y =>
    `<path d="M18 ${y} Q32 ${y - 7} 46 ${y}" stroke="var(--sc-bone)" stroke-width="1.6" fill="none" opacity=".55"/>` +
    `<path d="M54 ${y} Q68 ${y - 7} 82 ${y}" stroke="var(--sc-bone)" stroke-width="1.6" fill="none" opacity=".55"/>`).join('');
  const lungs =
    `<path d="M22 24 Q36 16 45 26 L45 80 Q32 86 20 78 Z" fill="var(--sc-lung)"/>` +
    `<path d="M55 26 Q64 16 78 24 L80 78 Q68 86 55 80 Z" fill="var(--sc-lung)"/>` +
    `<ellipse cx="56" cy="68" rx="9" ry="11" fill="var(--sc-bone)" opacity=".16"/>`;
  const cloud = scan.sick
    ? (scan.side === 'l'
        ? `<ellipse cx="32" cy="66" rx="10" ry="9" fill="var(--sc-cloud)" opacity=".8"/>`
        : `<ellipse cx="68" cy="64" rx="10" ry="9" fill="var(--sc-cloud)" opacity=".8"/>`)
    : '';
  const tag = scan.portable
    ? `<rect x="74" y="4" width="22" height="11" fill="var(--sc-tag)"/><rect x="77" y="7" width="16" height="2" fill="#11131f"/><rect x="77" y="11" width="10" height="2" fill="#11131f"/>`
    : '';
  const hatch = (x, y, w, h) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#5a607a"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#sc-hatch)"/>`;
  return `<svg viewBox="0 0 100 100" aria-hidden="true">
    <rect width="100" height="100" fill="var(--sc-film)"/>
    <rect x="48" y="12" width="4" height="78" fill="var(--sc-bone)" opacity=".45"/>
    ${lungs}${cloud}${ribs}${tag}
    ${cover.lungs ? hatch(16, 14, 68, 76) : ''}
    ${cover.tag ? hatch(70, 1, 29, 17) : ''}
  </svg>`;
}

class PhilShortcut extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;
    if (!document.getElementById('sc-style')) {
      const s = el('style'); s.id = 'sc-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.classList.add('sc', 'phil-dense');
    this.set = 'downtown';
    this.cover = { lungs: false, tag: false };
    this.build();
    this.render(null);
  }

  build() {
    const prompt = this.getAttribute('prompt');
    this.innerHTML = '';
    if (prompt) this.append(el('p', 'sc-prompt', prompt));

    const bar = el('div', 'sc-bar');
    const toggle = (label, key) => {
      const b = el('button', 'sc-btn', label);
      b.type = 'button';
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => {
        this.cover[key] = !this.cover[key];
        b.setAttribute('aria-pressed', String(this.cover[key]));
        this.render(key);
      });
      return b;
    };
    this._lungBtn = toggle('Cover the lungs', 'lungs');
    this._tagBtn = toggle('Cover the corner tag', 'tag');
    this._setBtn = el('button', 'sc-btn', 'Send it to the Prairie clinic');
    this._setBtn.type = 'button';
    this._setBtn.addEventListener('click', () => {
      this.set = this.set === 'downtown' ? 'prairie' : 'downtown';
      this._setBtn.textContent = this.set === 'downtown' ? 'Send it to the Prairie clinic' : 'Back to downtown';
      this.render('set');
    });
    bar.append(this._lungBtn, this._tagBtn, el('span', 'sc-gap'), this._setBtn);
    // The covers' hatching, defined once for every card.
    this.append(el('div', null,
      '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
      '<pattern id="sc-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
      '<rect width="3" height="6" fill="#474c63"/></pattern></defs></svg>'));

    this._grid = el('div', 'sc-grid');
    this._out = el('div', 'sc-out');
    this._out.setAttribute('aria-live', 'polite');

    this.append(bar, this._grid, this._out, el('p', 'sc-note',
      'Under each scan: what the radiologists found, then the Third Twin\'s verdict, with ✗ where it disagrees. ' +
      '<b>Yellow tag:</b> the scan was taken on a portable machine, at the patient\'s bedside. ' +
      'A toy example: this Third Twin reads one clue only. Real systems lean on many at once.'));
  }

  render(changed) {
    const { name, scans } = SETS[this.set];
    const v = scans.map(s => verdict(s, this.cover));
    this._grid.innerHTML = '';
    scans.forEach((s, i) => {
      const truth = s.sick ? 'sick' : 'clear';
      const wrong = v[i] !== 'unsure' && v[i] !== truth;
      const card = el('div', 'sc-card' + (wrong ? ' sc-wrong' : ''));
      card.setAttribute('role', 'img');
      card.setAttribute('aria-label',
        `Scan ${i + 1}: ${s.portable ? 'portable machine' : 'X-ray room'}. ` +
        `Radiologists: ${WORD[truth]}. Third Twin: ${WORD[v[i]]}${wrong ? ', wrong' : ''}.`);
      card.innerHTML = xray(s, this.cover) +
        `<p class="sc-doc">Doctors: ${WORD[truth]}</p>` +
        `<p class="sc-twin">Twin: ${WORD[v[i]]}${wrong ? ' ✗' : ''}</p>`;
      this._grid.append(card);
    });

    const right = v.filter((x, i) => x === (scans[i].sick ? 'sick' : 'clear')).length;
    const unsure = v.filter(x => x === 'unsure').length;
    const alarms = v.filter((x, i) => x === 'sick' && !scans[i].sick).length;
    const misses = v.filter((x, i) => x === 'clear' && scans[i].sick).length;
    const tally = unsure === scans.length
      ? `<p><strong>${name}:</strong> the Third Twin can't decide on any of the ${scans.length} scans.</p>`
      : `<p><strong>${name}:</strong> the Third Twin agrees with the radiologists on <strong>${right} of ${scans.length}</strong>. ` +
        `False alarms: ${alarms}. Missed pneumonia: ${misses}.</p>`;

    let say = '';
    if (changed === 'lungs' && this.cover.lungs && !this.cover.tag)
      say = 'With the lungs covered, the Third Twin gave the same verdict on every scan. Whatever it reads, it isn\'t the lungs.';
    else if (changed === 'tag' && this.cover.tag)
      say = 'With the corner tag covered, the Third Twin can\'t decide. The tag is what it reads: it calls every portable scan pneumonia.';
    else if (changed === 'set' && this.set === 'prairie' && !this.cover.tag)
      say = 'The Prairie clinic has only a portable machine, so every scan carries the tag. The Third Twin calls them all pneumonia.';
    else if (changed === null)
      say = 'Downtown, the Third Twin looks good. What is it looking at? Cover part of every scan and watch its verdicts.';
    this._out.innerHTML = tally + (say ? `<p>${say}</p>` : '');
  }
}

customElements.define('phil-shortcut', PhilShortcut);
