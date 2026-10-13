/* =====================================================================
   Lesson-local visualization for "Nobody Asked Nell".
   Ungraded exploration (not a quiz widget).

   <phil-shadow prompt="…">
     Nell's own choices are fixed at "no". The student switches on things
     that OTHER people did, and a profile of Nell fills in line by line.
     Each line is marked as known or as a guess and names where it came
     from. A counter shows how many lines Nell agreed to, which is always
     zero. The guessing machine needs at least one known fact about Nell
     before it can guess anything.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const STYLE = `
.sh { display:block; margin:12px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); }
.sh-prompt { margin:0 0 8px; }
.sh-nell { margin:0 0 10px; color:var(--muted); }
.sh-cols { display:grid; grid-template-columns:minmax(280px, 38%) 1fr; gap:12px; align-items:start; }
.sh-h { font-family:var(--pixel); font-size:10px; line-height:1.5; margin:0 0 6px; color:var(--accent-3); }
.sh-switches { display:grid; gap:6px; }
.sh-btn { font:inherit; font-size:16px; text-align:left; padding:6px 10px; background:var(--bg); color:var(--ink);
          border:2px solid var(--border); cursor:pointer; }
.sh-btn::before { content:"☐ "; }
.sh-btn[aria-pressed="true"] { background:#133a24; border-color:var(--good); color:var(--good); font-weight:bold; }
.sh-btn[aria-pressed="true"]::before { content:"☑ "; }
.sh-card { background:var(--panel); border:3px solid var(--border); padding:8px 10px; min-height:9em; }
.sh-card ul { list-style:none; margin:0; padding:0; }
.sh-card li { margin:0 0 2px; padding:0; }
.sh-card li::before { content:none; }
.sh-tag { font-weight:bold; }
.sh-tag.is-known { color:#ffcf5a; }
.sh-tag.is-guess { color:#4cc2ff; }
.sh-from { color:var(--muted); }
.sh-count { margin:8px 0 0; }
@media (max-width:760px) { .sh-cols { grid-template-columns:1fr; } }
`;

const addStyle = () => {
  if (document.getElementById('sh-style')) return;
  const s = el('style'); s.id = 'sh-style'; s.textContent = STYLE; document.head.append(s);
};

const SWITCHES = [
  { id: 'cora',     label: 'Cousin Cora takes a DNA test',            from: "Cora" },
  { id: 'contacts', label: 'Three friends upload their contact lists', from: "friends" },
  { id: 'photos',   label: 'A friend posts photos from a party',       from: "photos" },
  { id: 'camera',   label: 'A neighbor installs a doorbell camera',    from: "camera" },
  { id: 'alike',    label: 'People who shop like Nell share profiles', from: 'lookalikes' },
];

/* needs: every listed switch must be on. `guess` lines also need Tally to
   have something to match Nell with, which the `needs` list provides.     */
const LINES = [
  { needs: ['cora'],            text: 'Who her blood relatives are' },
  { needs: ['cora'],            text: 'Some of her inherited health risks' },
  { needs: ['contacts'],        text: 'Her name, number, and email' },
  { needs: ['contacts'],        text: 'Who her friends are' },
  { needs: ['photos'],          text: 'What her face looks like' },
  { needs: ['camera'],          text: 'When she leaves home and returns' },
  { needs: ['photos', 'camera'], text: 'Which person on camera is her' },
  { needs: ['alike', 'contacts'], guess: true, text: 'Her likely politics and religion' },
  { needs: ['alike', 'camera'],   guess: true, text: 'Her likely job and income' },
  { needs: ['alike', 'cora'],     guess: true, text: 'Illnesses she may develop' },
];

class PhilShadow extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.classList.add('sh', 'phil-dense');
    this.on = new Set();
    const prompt = this.getAttribute('prompt') || 'Switch on what other people did.';
    this.innerHTML = '';
    this.append(el('p', 'sh-prompt', prompt));
    this.append(el('p', 'sh-nell', '<strong>What Nell shared:</strong> no DNA test, no social media, no smart devices, no loyalty cards. These stay off.'));

    const cols = el('div', 'sh-cols');
    const left = el('div');
    const lh = el('h2', 'sh-h', 'What other people did'); lh.id = 'sh-lh';
    const sw = el('div', 'sh-switches');
    sw.setAttribute('role', 'group'); sw.setAttribute('aria-labelledby', lh.id);
    this._btns = SWITCHES.map(s => {
      const b = el('button', 'sh-btn'); b.type = 'button'; b.textContent = s.label;
      b.setAttribute('aria-pressed', 'false');
      b.onclick = () => { this.on.has(s.id) ? this.on.delete(s.id) : this.on.add(s.id); this.render(); };
      sw.append(b);
      return { s, b };
    });
    left.append(lh, sw);

    const right = el('div');
    right.append(el('h2', 'sh-h', "Nell's profile"));
    this._card = el('div', 'sh-card');
    this._card.setAttribute('aria-live', 'polite');
    right.append(this._card);
    cols.append(left, right);
    this.append(cols);
    this._count = el('p', 'sh-count');
    this.append(this._count);
    this.render();
  }

  render() {
    this._btns.forEach(({ s, b }) => b.setAttribute('aria-pressed', String(this.on.has(s.id))));
    const from = (ids) => ids.map(id => SWITCHES.find(s => s.id === id).from).join(' + ');
    const shown = LINES.filter(l => l.needs.every(id => this.on.has(id)));

    let html;
    if (!this.on.size) {
      html = '<p>Empty. Nell has shared nothing, and so far nobody else has either.</p>';
    } else if (!shown.length) {
      html = '<p>Still empty. The guessing machine has patterns from people like Nell, but it needs one known fact about her before it can match her to them.</p>';
    } else {
      html = '<ul>' + shown.map(l => l.guess
        ? `<li><span class="sh-tag is-guess">◌ Guess:</span> ${l.text} <span class="sh-from">(${from(l.needs)})</span></li>`
        : `<li><span class="sh-tag is-known">● Known:</span> ${l.text} <span class="sh-from">(${from(l.needs)})</span></li>`).join('') + '</ul>';
    }
    this._card.innerHTML = html;

    const known = shown.filter(l => !l.guess).length, guesses = shown.length - known;
    this._count.innerHTML = `<strong>In the profile:</strong> ${known} known, ${guesses} guessed. <strong>Lines Nell agreed to:</strong> 0.`
      + (shown.length === LINES.length ? ' That is everything, and she was never asked once.' : '');
  }
}

customElements.define('phil-shadow', PhilShadow);
