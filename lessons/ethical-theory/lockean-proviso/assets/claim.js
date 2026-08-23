/* =====================================================================
   <phil-claim-tester> — how much of a world may forty people take?

   One slider (how much they claim) and four buttons (how many people
   eventually arrive). Three readings of "enough, and as good, left in
   common for others" then deliver their verdicts side by side.

   The teaching is in the divergence. With nobody else coming, all three
   readings say the settlers may take everything — the proviso has
   nothing to say when there are no others. Add forty more people and
   the strong reading breaks at exactly half the planet. Add ten
   thousand and it breaks almost immediately. The student watches a
   principle that felt obvious come apart under population.

   The numbers are illustrative, not a model: they are chosen so the
   readings separate visibly, and the widget says so on its face.

   Teaching widget: ungraded, no completion hook, no persistence — same
   contract as <phil-packet-router> and <phil-wish-tester>.

   Headings are h2: the widget sits under the slide's h1.
   Type is sized to project: nothing below 15px except pixel-font labels.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const STYLE = `
.clm { display:block; margin:14px 0; padding:14px 16px; background:var(--panel-2);
       border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow);
       font-size:17px; line-height:1.45; }
.clm-prompt { margin:0 0 10px; font-size:17px; }

.clm-controls { display:flex; flex-wrap:wrap; gap:14px; align-items:flex-end; margin:0 0 12px; }
.clm-field { flex:1 1 260px; min-width:0; }
.clm-label { display:block; font-size:15px; color:var(--muted); margin:0 0 4px; }
.clm-val { color:var(--ink); font-weight:700; }
.clm-slider { width:100%; accent-color:var(--accent-3); height:26px; }

.clm-who { display:flex; flex-wrap:wrap; gap:6px; }
.clm-btn { font-family:var(--pixel); font-size:9px; line-height:1.5; padding:8px 9px;
           background:var(--panel); color:var(--ink); border:3px solid var(--border);
           box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.clm-btn:hover { background:#313a5e; }
.clm-btn[aria-pressed="true"] { background:var(--accent-3); color:var(--bg); }

.clm-bar { display:flex; height:22px; border:3px solid var(--border); margin:0 0 6px; overflow:hidden; }
.clm-bar i { display:block; height:100%; }
.clm-bar .taken { background:var(--accent-2); }
.clm-bar .free  { background:#2f6d4a; }
.clm-stat { margin:0 0 12px; font-size:15px; color:var(--muted); }

.clm-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
@media (max-width:820px) { .clm-cards { grid-template-columns:1fr; } }
.clm-card { background:var(--panel); border:3px solid var(--border);
            border-left-width:6px; padding:10px 12px; }
.clm-card h2 { font-family:var(--pixel); font-size:11px; line-height:1.5;
               margin:0 0 8px; color:var(--muted); }
.clm-card p { margin:0; font-size:16px; line-height:1.45; }
.clm-card .verdict { display:block; font-weight:700; margin:0 0 4px; }
.clm-card.ok   { border-left-color:var(--good); }
.clm-card.ok   .verdict { color:var(--good); }
.clm-card.no   { border-left-color:var(--bad); }
.clm-card.no   .verdict { color:var(--bad); }
.clm-card.owe  { border-left-color:var(--accent-3); }
.clm-card.owe  .verdict { color:var(--accent-3); }

.clm-note { margin:10px 0 0; font-size:15px; line-height:1.5; color:var(--muted); }
`;

const SETTLERS = 40;
const WHO = [
  { tag: 'Nobody else', n: 0 },
  { tag: 'Forty more', n: 40 },
  { tag: 'Ten thousand', n: 10000 },
  { tag: 'A billion', n: 1000000000 },
];

const nice = n => n >= 1e9 ? (n / 1e9) + ' billion'
              : n >= 1e6 ? (n / 1e6) + ' million'
              : n.toLocaleString('en-GB');

class PhilClaimTester extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;
    if (!document.getElementById('clm-style')) {
      const s = el('style'); s.id = 'clm-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.classList.add('clm');
    this.claim = 25;
    this.who = 1;               // "Forty more" — the setting where the readings split
    this.build();
    this.update();
  }

  build() {
    const prompt = this.getAttribute('prompt');
    this.innerHTML = '';
    if (prompt) this.append(el('p', 'clm-prompt', prompt));

    const controls = el('div', 'clm-controls');

    const f1 = el('div', 'clm-field');
    const lab = el('label', 'clm-label');
    lab.setAttribute('for', 'clm-slider');
    lab.innerHTML = 'The first forty claim <span class="clm-val">25%</span> of the planet';
    this._lab = lab.querySelector('.clm-val');
    const sl = el('input', 'clm-slider');
    sl.type = 'range'; sl.min = '1'; sl.max = '100'; sl.value = '25';
    sl.id = 'clm-slider';
    sl.addEventListener('input', () => { this.claim = +sl.value; this.update(); });
    f1.append(lab, sl);

    const f2 = el('div', 'clm-field');
    f2.append(el('span', 'clm-label', 'How many people eventually arrive'));
    const who = el('div', 'clm-who');
    who.setAttribute('role', 'group');
    who.setAttribute('aria-label', 'How many people eventually arrive');
    this._whoBtns = WHO.map((w, i) => {
      const b = el('button', 'clm-btn', w.tag);
      b.type = 'button';
      b.addEventListener('click', () => { this.who = i; this.update(); });
      who.append(b);
      return b;
    });
    f2.append(who);

    controls.append(f1, f2);
    this.append(controls);

    this._bar = el('div', 'clm-bar');
    this._bar.setAttribute('role', 'img');
    this._barTaken = el('i', 'taken');
    this._barFree = el('i', 'free');
    this._bar.append(this._barTaken, this._barFree);
    this.append(this._bar);

    this._stat = el('p', 'clm-stat', '');
    this.append(this._stat);

    this._cards = el('div', 'clm-cards');
    this.append(this._cards);

    this.append(el('p', 'clm-note',
      'The figures are illustrative, chosen so the three readings separate visibly. The disagreement between them is real.'));
  }

  update() {
    const claim = this.claim;
    const arrivals = WHO[this.who].n;
    const free = 100 - claim;
    const perSettler = claim / SETTLERS;                 // % of planet each settler holds
    const perArrival = arrivals ? free / arrivals : Infinity;
    const plots = perSettler > 0 ? Math.floor(free / perSettler) : Infinity;

    this._lab.textContent = claim + '%';
    this._whoBtns.forEach((b, i) => b.setAttribute('aria-pressed', i === this.who ? 'true' : 'false'));
    this._barTaken.style.width = claim + '%';
    this._barFree.style.width = free + '%';
    this._bar.setAttribute('aria-label',
      `The first forty have claimed ${claim} per cent of the planet; ${free} per cent is unclaimed.`);
    this._stat.innerHTML = arrivals
      ? `Each settler holds <strong>${perSettler.toFixed(4)}%</strong> of the planet. `
        + `The unclaimed land would give a plot that size to <strong>${plots.toLocaleString('en-GB')}</strong> more people, `
        + `and <strong>${nice(arrivals)}</strong> are coming.`
      : `Each settler holds <strong>${perSettler.toFixed(4)}%</strong> of the planet, and nobody else is ever coming.`;

    /* 1. the strong reading — as much, and as good, for each later arrival */
    const strongOK = arrivals === 0 || perArrival >= perSettler;
    const strong = arrivals === 0
      ? ['ok', 'Satisfied', 'There are no others, so there is nobody for whom anything must be left. The proviso is silent here.']
      : strongOK
      ? ['ok', 'Satisfied', `Every one of the ${nice(arrivals)} arrivals could still take a plot the size of a settler's.`]
      : ['no', 'Violated', `A settler holds ${perSettler.toFixed(4)}%, but there is only ${perArrival.toFixed(6)}% left each for the ${nice(arrivals)} arriving. They cannot have as much, or as good.`];

    /* 2. Nozick's reading — worsened relative to no appropriation at all */
    const nozOK = claim < 100;
    const noz = nozOK
      ? ['ok', 'Satisfied', 'Land is still free for the taking, and the settlers have made things the arrivals can use and trade for. Nobody is worse off than on an untouched planet.']
      : ['no', 'Violated', 'Nothing at all is left. The arrivals cannot homestead, so they are plainly worse off than if the planet had never been claimed.'];

    /* 3. the left-libertarian reading — permitted, but the earth was everyone's */
    const fairShare = 100 * SETTLERS / (SETTLERS + arrivals);
    const rent = Math.max(0, claim - fairShare);
    const left = rent <= 0
      ? ['ok', 'Nothing owed', 'The settlers have taken no more than their own share of a world that belongs to everyone alive.']
      : ['owe', 'Permitted — rent owed', `Their fair share is ${fairShare.toFixed(4)}% of the planet. They hold ${claim}%, so they owe the rest of humanity rent on ${rent.toFixed(4)}% of a world.`];

    this._cards.innerHTML = '';
    [['The strong reading', strong, 'Enough <em>and as good</em> must remain for each person'],
     ['Nozick&rsquo;s reading', noz, 'No one may be left worse off than with no property at all'],
     ['The left-libertarian reading', left, 'The earth began as everyone&rsquo;s, so taking incurs a debt']]
      .forEach(([title, [cls, verdict, body], sub]) => {
        this._cards.append(el('div', 'clm-card ' + cls,
          `<h2>${title}</h2><p><span class="verdict">${verdict}</span>${body}</p>`));
      });
  }
}

customElements.define('phil-claim-tester', PhilClaimTester);
