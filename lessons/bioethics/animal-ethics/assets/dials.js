/* =====================================================================
   <phil-dials prompt="…"> — two dials, three views

   Four cases, each set on two dials: what's gained (a life, knowledge, a
   meal) and who pays (a pig, mice, flies). Pick a case and the three
   views give their verdicts side by side, each with one line of reason.
   After all four, the takeaway: Singer reads both dials, Regan reads who
   pays (as a threshold), and Cohen's rights read neither, though humane
   treatment still counts.

   Every verdict follows the philosopher's own writing (sources in
   phil_mates_outlines.md, the animal-ethics accuracy note). Where a view
   gives no verdict, the card says so instead of inventing one. Nothing
   graded depends on this widget; the slides teach what the graded items
   need.

   Teaching widget: ungraded, no completion hook, no persistence, the same
   contract as <phil-shortcut>.

   Headings are h2: the widget sits under the slide's h1.
   Type is sized to project: nothing below 15px.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const VIEWS = [
  { key: 'singer', name: 'Singer', tag: 'Weigh the interests' },
  { key: 'regan', name: 'Regan', tag: 'Rights' },
  { key: 'cohen', name: 'Cohen', tag: 'Moral community' },
];

const CASES = [
  { title: 'A pig kidney for the Wolf', gained: 'a life', pays: 'a pig',
    singer: { v: 'Weigh it', why: 'A life saved is a large benefit, and the pig\'s suffering counts equally. He allows such a use could be justified, though he opposes animal research as it is usually practiced.' },
    regan: { v: 'No', why: 'The pig is a subject-of-a-life. It may not be used as a resource, whatever the benefit.' },
    cohen: { v: 'Yes', why: 'Pigs have no rights, so the trial may go ahead, if the pigs are treated humanely.' } },
  { title: 'Pork chops from a factory farm', gained: 'a meal', pays: 'a pig',
    singer: { v: 'No', why: 'A meal is a small benefit next to a factory-farmed pig\'s suffering. This is where his verdicts on organs and meat split.' },
    regan: { v: 'No', why: 'The same reason as the kidney: the pig is used as a resource.' },
    cohen: { v: 'No right violated', why: 'Pigs have no rights on his view. He argues that anyone who eats pigs can\'t coherently object to research on them. What remains is the duty to act humanely.' } },
  { title: 'A mouse study of a new cancer drug', gained: 'knowledge', pays: 'mice',
    singer: { v: 'Weigh it', why: 'Count the mice\'s suffering equally, and ask whether the researchers would run the study on an orphaned human infant to save many lives.' },
    regan: { v: 'No', why: 'The rights view calls for ending harmful research on animals like these, whatever it would teach us.' },
    cohen: { v: 'Yes', why: 'Mice have no rights. Cohen argues we should use more animals in research, not fewer.' } },
  { title: 'A fruit-fly genetics study', gained: 'knowledge', pays: 'flies',
    singer: { v: 'Uncertain', why: 'Only beings that can suffer count, and whether flies can is uncertain. If they can, each fly has far less at stake than a pig, but a fly lab uses a great many flies.' },
    regan: { v: 'No verdict', why: 'His test says which beings surely have rights. It doesn\'t say which beings lack them.' },
    cohen: { v: 'Yes', why: 'Flies make no moral claims, so they have no rights.' } },
];

const STYLE = `
.dl { display:block; margin:10px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); }
phil-slide .dl-prompt { margin:0 0 8px; font-size:17px; line-height:1.45; max-width:none; }
.dl-cases { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:6px; margin:0 0 10px; }
.dl-case { text-align:left; background:var(--panel); color:var(--ink); border:3px solid var(--border);
           padding:7px 9px; cursor:pointer; font:inherit; font-size:15px; line-height:1.35; }
.dl-case[aria-pressed="true"] { outline:3px solid var(--accent-3); outline-offset:-3px; }
.dl-case b { display:block; font-size:16px; }
.dl-case span { color:var(--muted); }
.dl-case .dl-seen { color:var(--accent); }
.dl-views { display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:8px; }
.dl-view { background:var(--panel); border:3px solid var(--border); padding:8px 10px; }
.dl-view h2 { margin:0; font-size:16px; color:var(--ink); }
phil-slide .dl-view p { margin:3px 0 0; font-size:15px; line-height:1.4; max-width:none; }
.dl-view .dl-tag { color:var(--muted); }
.dl-view .dl-v { font-weight:700; color:var(--accent-3); font-size:16px; }
.dl-take { margin-top:8px; border-left:4px solid var(--accent-2); padding:6px 10px; background:var(--panel); }
phil-slide .dl-take p { margin:2px 0; font-size:16px; line-height:1.4; max-width:none; }
`;

class PhilDials extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;
    if (!document.getElementById('dl-style')) {
      const s = el('style'); s.id = 'dl-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.classList.add('dl', 'phil-dense');
    const prompt = this.getAttribute('prompt');
    this.innerHTML = '';
    if (prompt) this.append(el('p', 'dl-prompt', prompt));
    this._cases = el('div', 'dl-cases');
    this._views = el('div', 'dl-views');
    this._views.setAttribute('aria-live', 'polite');
    this._take = el('div', 'dl-take');
    this.append(this._cases, this._views, this._take);
    this.seen = new Set();
    this.current = null;
    this.render();
  }

  show(i) {
    this.current = i;
    this.seen.add(i);
    this.render();
    this._cases.querySelectorAll('button')[i]?.focus({ preventScroll: true });
  }

  render() {
    this._cases.innerHTML = '';
    CASES.forEach((c, i) => {
      const b = el('button', 'dl-case',
        `<b>${c.title}${this.seen.has(i) ? ' <span class="dl-seen" aria-hidden="true">✓</span>' : ''}</b>` +
        `<span>Gained: ${c.gained} · Pays: ${c.pays}</span>`);
      b.type = 'button';
      b.setAttribute('aria-pressed', String(this.current === i));
      b.addEventListener('click', () => this.show(i));
      this._cases.append(b);
    });

    this._views.innerHTML = '';
    if (this.current == null) {
      this._views.append(el('p', null, 'Pick a case to see how each view rules on it.'));
    } else {
      const c = CASES[this.current];
      VIEWS.forEach(v => {
        const card = el('div', 'dl-view');
        card.append(el('h2', null, v.name), el('p', 'dl-tag', v.tag),
          el('p', 'dl-v', c[v.key].v), el('p', null, c[v.key].why));
        this._views.append(card);
      });
    }

    this._take.innerHTML = '';
    if (this.seen.size === CASES.length) {
      this._take.append(el('p', null, '<strong>All four cases seen.</strong> Singer reads both dials, so his verdicts change from case to case. Regan reads only who pays, and as a threshold. Cohen\'s rights read neither dial, though humane treatment still counts.'));
    } else {
      this._take.append(el('p', null, `${this.seen.size} of ${CASES.length} cases seen.`));
    }
  }
}

customElements.define('phil-dials', PhilDials);
