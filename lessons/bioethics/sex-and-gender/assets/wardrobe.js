/* =====================================================================
   <phil-wardrobe prompt="…"> — who was expected to wear or do this?

   A guessing game through Orlando's centuries and a little past them.
   Each card names a place, a year, and something to wear or do. The
   student guesses who was expected to do it, and the card turns over to
   show the record, with a ✓ or ✗ on the guess. Cards unlock in order;
   after the last one, a tally and the takeaway: the rules moved again and
   again, and they came from society.

   Every record is checked (sources in phil_mates_outlines.md, the
   sex-and-gender accuracy note). Nothing graded depends on this widget;
   the slides teach what the graded items need.

   Teaching widget: ungraded, no completion hook, no persistence, the same
   contract as <phil-shortcut>.

   Type is sized to project: nothing below 15px.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const CARDS = [
  { when: 'London, 1600', what: 'Playing Juliet on the public stage',
    options: ['Men and boys', 'Women'], answer: 'Men and boys',
    record: 'Young men and boys played the women\'s parts. The first known professional actress took the stage in 1660, as Desdemona.' },
  { when: 'Europe, around 1600', what: 'High heels, newly arrived from Western Asia',
    options: ['Men', 'Women'], answer: 'Men',
    record: 'Heels began in Western Asia as riding gear for horsemen. European men took them up first. Women followed in the 1630s, to make their outfits look more masculine.' },
  { when: 'London, 1770s', what: 'A towering wig, face powder, and rouge',
    options: ['Men', 'Women', 'Both'], answer: 'Both',
    record: 'Fashionable women wore them, and so did the "Macaronis," young men of fashion, who were mocked for it in cartoons.' },
  { when: 'New York, 1884', what: 'A white dress, on a two-year-old',
    options: ['Boys', 'Girls', 'Both'], answer: 'Both',
    record: 'Small boys wore dresses until they were "breeched," at about four to seven. A photo shows the future president Franklin Roosevelt in one at age two.' },
  { when: 'United States, 1918', what: 'Pink baby clothes, says one trade magazine',
    options: ['Boys', 'Girls'], answer: 'Boys',
    record: 'It wrote: "The generally accepted rule is pink for the boy and blue for the girl." Other sources already said the opposite, and in 1927 stores still disagreed.' },
  { when: 'Philadelphia, 1946', what: 'Running ENIAC, the first general-purpose electronic computer',
    options: ['Men', 'Women'], answer: 'Women',
    record: 'ENIAC was run by a team of six women. In 1967, Cosmopolitan quoted the computer scientist Grace Hopper: programming is "just like planning a dinner."' },
];

const STYLE = `
.wr { display:block; margin:10px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); }
phil-slide .wr-prompt { margin:0 0 8px; font-size:17px; line-height:1.45; max-width:none; }
.wr-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:8px; }
.wr-card { background:var(--panel); border:3px solid var(--border); padding:8px 10px; }
.wr-card.wr-locked { border-style:dashed; background:var(--panel-2); }
phil-slide .wr-card p { margin:2px 0 0; font-size:15px; line-height:1.4; max-width:none; }
phil-slide .wr-card .wr-when { color:var(--muted); font-weight:700; margin:0; }
phil-slide .wr-card .wr-what { color:var(--ink); font-weight:700; font-size:16px; }
.wr-card .wr-mark { color:var(--accent); margin-right:4px; }
.wr-card .wr-miss { color:var(--bad); margin-right:4px; }
.wr-btns { display:flex; flex-wrap:wrap; gap:6px; margin:6px 0 2px; }
.wr-btn { font-family:var(--pixel); font-size:9px; line-height:1.5; padding:7px 9px;
          background:var(--panel-2); color:var(--ink); border:3px solid var(--border);
          box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.wr-btn:hover:not(:disabled) { background:#313a5e; }
.wr-btn:disabled { cursor:default; }
.wr-take { margin-top:8px; border-left:4px solid var(--accent-2); padding:6px 10px; background:var(--panel); }
phil-slide .wr-take p { margin:2px 0; font-size:16px; line-height:1.4; max-width:none; }
`;

class PhilWardrobe extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;
    if (!document.getElementById('wr-style')) {
      const s = el('style'); s.id = 'wr-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.classList.add('wr', 'phil-dense');
    const prompt = this.getAttribute('prompt');
    this.innerHTML = '';
    if (prompt) this.append(el('p', 'wr-prompt', prompt));
    this._grid = el('div', 'wr-grid');
    this._take = el('div', 'wr-take');
    this._take.setAttribute('aria-live', 'polite');
    this.append(this._grid, this._take);
    this.reset();
  }

  reset() {
    this.guesses = [];   // one per answered card, in order
    this.render();
  }

  render() {
    const g = this._grid;
    g.innerHTML = '';
    const next = this.guesses.length;
    CARDS.forEach((c, i) => {
      const card = el('div', 'wr-card' + (i > next ? ' wr-locked' : ''));
      card.append(el('p', 'wr-when', c.when), el('p', 'wr-what', c.what));
      if (i < next) {
        const right = this.guesses[i] === c.answer;
        const mark = right
          ? '<span class="wr-mark" aria-hidden="true">✓</span>'
          : '<span class="wr-miss" aria-hidden="true">✗</span>';
        card.append(el('p', null, `${mark}You guessed ${this.guesses[i].toLowerCase()}${right ? '.' : `. It was ${c.answer.toLowerCase()}.`}`));
        card.append(el('p', null, c.record));
      } else if (i === next) {
        card.append(el('p', null, 'Who did this, or was expected to?'));
        const row = el('div', 'wr-btns');
        c.options.forEach(o => {
          const b = el('button', 'wr-btn', o);
          b.type = 'button';
          b.addEventListener('click', () => { this.guesses.push(o); this.render(); });
          row.append(b);
        });
        card.append(row);
      } else {
        card.append(el('p', null, 'Answer the card before this one first.'));
      }
      g.append(card);
    });

    const t = this._take;
    t.innerHTML = '';
    if (next === CARDS.length) {
      const right = this.guesses.filter((x, i) => x === CARDS[i].answer).length;
      t.append(el('p', null, `<strong>You matched ${right} of ${CARDS.length}.</strong> Bodies didn't change between 1600 and 1946, but the rules did, again and again.`));
      t.append(el('p', null, 'Every view in this lesson agrees that rules like these come from society. They disagree about what being a woman or a man is.'));
      const row = el('div', 'wr-btns');
      const b = el('button', 'wr-btn', 'Start over');
      b.type = 'button';
      b.addEventListener('click', () => this.reset());
      row.append(b);
      t.append(row);
      b.focus({ preventScroll: true });
    } else {
      t.append(el('p', null, `${next} of ${CARDS.length} cards turned over.`));
      if (next > 0) g.querySelectorAll('.wr-card')[next]?.querySelector('button')?.focus({ preventScroll: true });
    }
  }
}

customElements.define('phil-wardrobe', PhilWardrobe);
