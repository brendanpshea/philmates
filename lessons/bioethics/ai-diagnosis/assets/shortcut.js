/* =====================================================================
   <phil-shortcut prompt="…"> — what is the Third Twin looking at?

   A guided investigation in four steps. Twelve chest X-rays from the
   downtown hospital sit in two labeled rows: scans taken on a portable
   machine at the bedside, and scans taken in the X-ray room. A key says
   what the white patch (pneumonia) and the yellow corner tag (portable
   machine) mean. Under each scan is the Third Twin's verdict, with ✓ or ✗.

     0. Guess what it looks at: the lungs, the tag, or both.
     1. Cover the lungs: no verdict changes.
     2. Cover the tag: it can't decide on any scan. Why the tag worked
        downtown: 4 of the 5 portable scans show pneumonia, 1 of the 7
        X-ray room scans does.
     3. Send it to the Prairie clinic, where every scan is portable: it
        calls all 12 pneumonia, 9 of them false alarms.

   Each step unlocks the next, and each result is one plain sentence.

   The teaching is shortcut learning: a clue that went with the disease
   where the tool learned, but isn't the disease. It is a toy, and says
   so: this Third Twin reads the tag and nothing else. The slides carry
   the real studies (Zech et al. 2018); nothing graded depends on this
   widget.

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

// Downtown: 5 portable scans (4 with pneumonia), 7 from the X-ray room (1).
// A machine that calls every portable scan pneumonia gets 10 of 12 right.
const DOWNTOWN = [
  { label: 'Portable machine, at the bedside', scans: [
    { portable: true, sick: true, side: 'l' },
    { portable: true, sick: true, side: 'r' },
    { portable: true, sick: false },
    { portable: true, sick: true, side: 'r' },
    { portable: true, sick: true, side: 'l' },
  ] },
  { label: 'X-ray room', scans: [
    { portable: false, sick: false },
    { portable: false, sick: false },
    { portable: false, sick: true, side: 'l' },
    { portable: false, sick: false },
    { portable: false, sick: false },
    { portable: false, sick: false },
    { portable: false, sick: false },
  ] },
];
// The Prairie clinic has only a portable machine. 3 of 12 have pneumonia.
const PRAIRIE = [
  { label: 'Portable machine (the clinic has no other)', scans: [
    { portable: true, sick: false }, { portable: true, sick: false }, { portable: true, sick: true, side: 'r' },
    { portable: true, sick: false }, { portable: true, sick: false }, { portable: true, sick: false },
  ] },
  { label: '', scans: [
    { portable: true, sick: true, side: 'l' }, { portable: true, sick: false }, { portable: true, sick: false },
    { portable: true, sick: false }, { portable: true, sick: true, side: 'r' }, { portable: true, sick: false },
  ] },
];

// The Third Twin reads the corner tag and nothing else.
const verdict = (scan, cover) => cover.tag ? 'unsure' : (scan.portable ? 'sick' : 'clear');
const WORD = { sick: 'pneumonia', clear: 'clear', unsure: "can't tell" };

const STYLE = `
.sc { display:block; margin:10px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow);
      --sc-tag:#ffcf5a; --sc-film:#0b1220; --sc-bone:#c9d3ee; --sc-lung:#2b3a5c; --sc-cloud:#eef1ff; }
phil-slide .sc-prompt { margin:0 0 8px; font-size:17px; line-height:1.45; max-width:none; }
.sc-key { display:flex; flex-wrap:wrap; gap:4px 18px; margin:0 0 10px; padding:0; list-style:none; }
phil-slide .sc-key li { display:flex; align-items:center; gap:7px; margin:0; padding:0; font-size:15px; color:var(--muted); max-width:none; }
phil-slide .sc-key li::before { content:none; }
.sc-key b { color:var(--ink); font-weight:700; }
.sc-swatch { width:18px; height:14px; flex:none; border:2px solid var(--border); }
.sc-main { display:grid; grid-template-columns:minmax(0, 1fr) minmax(250px, 330px); gap:14px; align-items:start; }
@media (max-width:900px) { .sc-main { grid-template-columns:1fr; } }
.sc-group { margin:0 0 8px; }
phil-slide .sc-glabel { margin:0 0 4px; font-size:15px; color:var(--muted); font-weight:700; max-width:none; }
.sc-row { display:grid; grid-template-columns:repeat(7, minmax(0, 1fr)); gap:6px; }
.sc-card { background:var(--panel); border:3px solid var(--border); padding:3px; }
.sc-card svg { display:block; width:100%; height:auto; }
phil-slide .sc-card p { margin:2px 0 0; font-size:15px; line-height:1.2; text-align:center; max-width:none; font-weight:700; }
.sc-card.sc-wrong { border-color:var(--bad); }
.sc-panel { background:var(--panel); border:3px solid var(--border); padding:10px 12px; }
.sc-log { list-style:none; margin:0 0 8px; padding:0 0 6px; border-bottom:2px solid var(--panel-2); }
phil-slide .sc-log li { margin:0; padding:0; font-size:15px; line-height:1.4; color:var(--muted); max-width:none; }
phil-slide .sc-log li::before { content:none; }
.sc-log .sc-tick { color:var(--accent); margin-right:6px; }
.sc-btns { display:flex; flex-wrap:wrap; gap:6px; margin:8px 0 2px; }
.sc-btn { font-family:var(--pixel); font-size:9px; line-height:1.5; padding:8px 9px;
          background:var(--panel-2); color:var(--ink); border:3px solid var(--border);
          box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.sc-btn:hover:not(:disabled) { background:#313a5e; }
.sc-btn:disabled { opacity:.6; cursor:default; }
.sc-btn[aria-pressed="true"] { outline:2px solid var(--accent-3); opacity:1; }
phil-slide .sc-panel p { margin:4px 0 0; font-size:16px; line-height:1.4; max-width:none; }
.sc-panel .sc-result { color:var(--ink); font-weight:700; }
.sc-panel .sc-why { color:var(--muted); font-weight:400; }
.sc-take { border-left:4px solid var(--accent-2); padding:6px 10px; background:var(--panel-2); }
phil-slide .sc-note { margin:8px 0 0; font-size:15px; line-height:1.45; color:var(--muted); max-width:none; }
`;

/* One chest X-ray in a 100 × 100 box: ribs, two lungs, a white patch in one
   lung for pneumonia, and a yellow tag in the top corner for a portable
   machine. Covers are hatched gray boxes. */
function xray(scan, cover) {
  const ribs = [30, 40, 50, 60, 70].map(y =>
    `<path d="M18 ${y} Q32 ${y - 7} 46 ${y}" stroke="var(--sc-bone)" stroke-width="1.6" fill="none" opacity=".5"/>` +
    `<path d="M54 ${y} Q68 ${y - 7} 82 ${y}" stroke="var(--sc-bone)" stroke-width="1.6" fill="none" opacity=".5"/>`).join('');
  const lungs =
    `<path d="M22 24 Q36 16 45 26 L45 80 Q32 86 20 78 Z" fill="var(--sc-lung)"/>` +
    `<path d="M55 26 Q64 16 78 24 L80 78 Q68 86 55 80 Z" fill="var(--sc-lung)"/>`;
  const cloud = scan.sick
    ? `<ellipse cx="${scan.side === 'l' ? 32 : 68}" cy="65" rx="11" ry="10" fill="var(--sc-cloud)" opacity=".85"/>`
    : '';
  const tag = scan.portable ? `<rect x="73" y="3" width="24" height="13" fill="var(--sc-tag)"/>` : '';
  const hatch = (x, y, w, h) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#5a607a"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#sc-hatch)"/>`;
  return `<svg viewBox="0 0 100 100" aria-hidden="true">
    <rect width="100" height="100" fill="var(--sc-film)"/>
    <rect x="48" y="12" width="4" height="78" fill="var(--sc-bone)" opacity=".4"/>
    ${lungs}${cloud}${ribs}${tag}
    ${cover.lungs ? hatch(16, 14, 68, 76) : ''}
    ${cover.tag ? hatch(70, 0, 30, 19) : ''}
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
    this.build();
    this.reset();
  }

  build() {
    const prompt = this.getAttribute('prompt');
    this.innerHTML = '';
    if (prompt) this.append(el('p', 'sc-prompt', prompt));
    // The covers' hatching, defined once for every card.
    this.append(el('div', null,
      '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
      '<pattern id="sc-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
      '<rect width="3" height="6" fill="#474c63"/></pattern></defs></svg>'));

    const key = el('ul', 'sc-key');
    key.setAttribute('aria-label', 'Key');
    key.innerHTML =
      '<li><span class="sc-swatch" style="background:var(--sc-cloud)"></span><b>White patch:</b> pneumonia, as the doctors see it</li>' +
      '<li><span class="sc-swatch" style="background:var(--sc-tag)"></span><b>Yellow tag:</b> taken on a portable machine</li>' +
      '<li><b>Under each scan:</b> the Third Twin\'s verdict, ✓ right or ✗ wrong</li>';
    this.append(key);

    const main = el('div', 'sc-main');
    this._scans = el('div');
    this._panel = el('div', 'sc-panel');
    this._panel.setAttribute('aria-live', 'polite');
    main.append(this._scans, this._panel);
    this.append(main);

    this.append(el('p', 'sc-note',
      'A toy example: this Third Twin reads one clue only. Real systems lean on many clues at once.'));
  }

  /* ---- the four steps ----
     The panel shows a short log of finished steps, the latest result in
     full, and the next button, so it never grows past a few lines. */
  reset() {
    this.where = DOWNTOWN;
    this.cover = { lungs: false, tag: false };
    this.guess = null;
    this.log = [];
    this.last = null;      // { text, why } of the latest test
    this.stage = 0;        // 0 guess · 1 test 1 · 2 test 2 · 3 test 3 · 4 done
    this.draw();
    this.render();
  }

  // Run the test for the current stage, then move on.
  advance() {
    if (this.stage === 1) {
      this.cover = { lungs: true, tag: false };
      this.last = { text: 'No verdict changed. Whatever it reads, it isn\'t the lungs.' };
    } else if (this.stage === 2) {
      this.log.push('Test 1, lungs covered: no verdict changed.');
      this.cover = { lungs: false, tag: true };
      const yours = this.guess === 'The yellow tag' ? ' Your guess was right.' : '';
      this.last = {
        text: `Now it can't decide on any scan. It was reading the tag.${yours}`,
        why: 'Why that worked downtown: patients too sick to walk to the X-ray room get a portable scan at the bedside. ' +
             '4 of the 5 portable scans show pneumonia, but only 1 of the 7 from the X-ray room.',
      };
    } else if (this.stage === 3) {
      this.log.push('Test 2, tag covered: it couldn\'t decide.');
      this.where = PRAIRIE;
      this.cover = { lungs: false, tag: false };
      this.last = { text: 'The Prairie clinic has only a portable machine, so every scan has the tag. ' +
        'The Third Twin calls all 12 pneumonia. The doctors found it in 3: that\'s 9 false alarms.' };
    }
    this.stage++;
    this.draw();
    this.render();
  }

  render() {
    const p = this._panel;
    p.innerHTML = '';
    if (this.log.length) {
      const ul = el('ul', 'sc-log');
      this.log.forEach(t => {
        const li = el('li', null, '<span class="sc-tick" aria-hidden="true">✓</span>');
        li.append(t);
        ul.append(li);
      });
      p.append(ul);
    }
    if (this.stage === 0) {
      p.append(el('p', 'sc-result', 'Downtown, the Third Twin agrees with the radiologists on 10 of 12 scans.'));
      p.append(el('p', null, 'What do you think it is looking at?'));
      const row = el('div', 'sc-btns');
      ['The lungs', 'The yellow tag', 'Both'].forEach(label => row.append(this.button(label, () => {
        this.guess = label;
        this.log.push(`Your guess: ${label.toLowerCase()}.`);
        this.stage = 1;
        this.render();
      })));
      p.append(row);
    } else {
      if (this.last) {
        p.append(el('p', 'sc-result', this.last.text));
        if (this.last.why) p.append(el('p', 'sc-why', this.last.why));
      }
      const next = ['', 'Test 1: Cover the lungs', 'Test 2: Cover the yellow tag', 'Test 3: Send it to the Prairie clinic'][this.stage];
      if (next) {
        const row = el('div', 'sc-btns');
        row.append(this.button(next, () => this.advance()));
        p.append(row);
      } else {
        p.append(el('p', 'sc-take', 'That\'s a <strong>shortcut</strong>: a clue that went with the disease where the tool learned, but isn\'t the disease.'));
        const row = el('div', 'sc-btns');
        row.append(this.button('Start over', () => this.reset()));
        p.append(row);
      }
    }
    if (this._started) p.querySelector('button')?.focus({ preventScroll: true });
    this._started = true;
  }

  button(label, onClick) {
    const b = el('button', 'sc-btn', label);
    b.type = 'button';
    b.addEventListener('click', onClick);
    return b;
  }

  draw() {
    this._scans.innerHTML = '';
    let n = 0;
    this.where.forEach(group => {
      const g = el('div', 'sc-group');
      if (group.label) g.append(el('p', 'sc-glabel', group.label));
      const row = el('div', 'sc-row');
      group.scans.forEach(s => {
        n++;
        const v = verdict(s, this.cover);
        const truth = s.sick ? 'sick' : 'clear';
        const mark = v === 'unsure' ? '' : (v === truth ? '✓' : '✗');
        const card = el('div', 'sc-card' + (mark === '✗' ? ' sc-wrong' : ''));
        card.setAttribute('role', 'img');
        card.setAttribute('aria-label',
          `Scan ${n}: ${s.portable ? 'portable machine' : 'X-ray room'}, ` +
          `${s.sick ? 'pneumonia' : 'clear'} by the doctors' reading. Third Twin: ${WORD[v]}` +
          (mark === '✓' ? ', right.' : mark === '✗' ? ', wrong.' : '.'));
        card.innerHTML = xray(s, this.cover) + `<p>${WORD[v]}${mark ? ' ' + mark : ''}</p>`;
        row.append(card);
      });
      g.append(row);
      this._scans.append(g);
    });
  }
}

customElements.define('phil-shortcut', PhilShortcut);
