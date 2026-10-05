/* =====================================================================
   Lesson-local visualizations for "The Villain's Ledger".
   Both are ungraded explorations (not quiz widgets).

   <phil-chain prompt="…">
     Four linked blocks. Each shows the fingerprint it recorded from the
     block before, three payments, and its own fingerprint. The student
     changes one payment, watches the next block stop matching, and then
     redoes the work block by block while the honest miners pull ahead.

   <phil-coinlab prompt="…">
     Three switches, one per thing a keeper does: who keeps the list, can a
     payment be stopped, what stands behind the price. Read-outs show the
     electricity, the price, whether Doctor Calamity and Amara get paid,
     and who has to be trusted. Presets load a bank account, Bitcoin, and a
     dollar-backed coin.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const STYLE = `
.vl { display:block; margin:12px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); }
.vl-prompt { margin:0 0 10px; }
.vl-row { display:flex; flex-wrap:wrap; align-items:center; gap:8px; }
.vl-btn { font:inherit; font-size:16px; padding:6px 12px; background:var(--bg); color:var(--ink);
          border:2px solid var(--border); cursor:pointer; }
.vl-btn[aria-pressed="true"] { background:#133a24; border-color:var(--good); color:var(--good); font-weight:bold; }
.vl-btn[aria-pressed="true"]::before { content:"✔ "; }
.vl-btn:disabled { color:var(--muted); cursor:default; }
.vl-out { background:var(--panel); border:3px solid var(--border); padding:8px 10px; margin:10px 0 0; min-height:3.2em; }
.vl-out p { margin:0 0 4px; }
.vl-out p:last-child { margin-bottom:0; }
.vl-h { font-family:var(--pixel); font-size:10px; line-height:1.5; margin:0 0 6px; color:var(--accent-3); }

/* ---- chain ---- */
.ch-blocks { display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; align-items:start; }
.ch-block { background:var(--panel); border:3px solid var(--border); padding:8px 10px; }
.ch-block.is-changed { border-color:#ffcf5a; }
.ch-block.is-broken { border-color:#ff6ad5; border-style:dashed; }
.ch-block p { margin:0 0 3px; }
.ch-code { font-family:var(--pixel); font-size:12px; letter-spacing:1px; color:var(--ink); }
.ch-pays { margin:4px 0; padding:4px 0; border-top:2px solid var(--border); border-bottom:2px solid var(--border); }
.ch-pays mark { background:#ffcf5a; color:#11131f; padding:0 3px; }
.ch-state { font-weight:bold; }
.ch-state.is-ok { color:var(--good); }
.ch-state.is-changed { color:#ffcf5a; }
.ch-state.is-broken { color:#ff6ad5; }
.ch-block .vl-btn { margin-top:6px; width:100%; }
.ch-foot { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:8px; margin:8px 0 0; }
.ch-tally { margin:0; }
@media (max-width:800px) { .ch-blocks { grid-template-columns:repeat(2, 1fr); } }
@media (max-width:480px) { .ch-blocks { grid-template-columns:1fr; } }

/* ---- coinlab ---- */
.cl-switches { display:grid; gap:6px; margin:10px 0 0; }
.cl-switch { display:grid; grid-template-columns:minmax(200px, 30%) 1fr; gap:10px; align-items:center; }
.cl-switch .vl-h { margin:0; }
.cl-read { display:grid; grid-template-columns:minmax(200px, 30%) 1fr; gap:4px 10px; margin:0; }
.cl-read dt { color:var(--muted); }
.cl-read dd { margin:0; }
.cl-read strong.is-yes { color:var(--good); }
.cl-read strong.is-no { color:#ff6ad5; }
.cl-read strong.is-mid { color:#ffcf5a; }
@media (max-width:650px) {
  .cl-switch, .cl-read { grid-template-columns:1fr; }
  .cl-read dd { margin-bottom:6px; }
}
`;

const addStyle = () => {
  if (document.getElementById('vl-style')) return;
  const s = el('style'); s.id = 'vl-style'; s.textContent = STYLE; document.head.append(s);
};

const toggleBtn = (label, onclick) => {
  const b = el('button', 'vl-btn'); b.type = 'button'; b.textContent = label;
  b.setAttribute('aria-pressed', 'false');
  b.onclick = onclick;
  return b;
};

/* ------------------------------------------------------------------ */

/* A toy fingerprint: FNV-1a folded to four hex digits. Real hashes are 64
   digits long, but four is enough to show that any change scrambles it. */
const fingerprint = (text) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return ((h >>> 0) % 0x10000).toString(16).toUpperCase().padStart(4, '0');
};

const PAYMENTS = [
  [['Ana', 'Bo', 5], ['Cy', 'Di', 2], ['Bo', 'Eve', 1]],
  [['Di', 'Ana', 3], ['Eve', 'Cy', 4], ['Ana', 'Fay', 2]],
  [['Fay', 'Bo', 6], ['Cy', 'Ana', 1], ['Di', 'Eve', 2]],
  [['Bo', 'Di', 3], ['Eve', 'Fay', 5], ['Ana', 'Cy', 2]],
];

class PhilChain extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.classList.add('vl', 'phil-dense');
    const prompt = this.getAttribute('prompt') || 'Change a payment and see what happens.';
    this.innerHTML = '';
    this.append(el('p', 'vl-prompt', prompt));
    this._blocks = el('div', 'ch-blocks');
    this.append(this._blocks);
    this._out = el('div', 'vl-out');
    this._out.setAttribute('aria-live', 'polite');
    this.append(this._out);
    const foot = el('div', 'ch-foot');
    this._tally = el('p', 'ch-tally');
    const reset = el('button', 'vl-btn', 'Start over'); reset.type = 'button';
    reset.onclick = () => this.reset();
    foot.append(this._tally, reset);
    this.append(foot);
    this.reset();
  }

  reset() {
    this.changed = -1;          // index of the block whose payment was changed
    this.redone = 0;            // blocks the cheat has redone so far
    this.last = 'start';
    this.chain = [];
    PAYMENTS.forEach((pays, i) => {
      const b = { pays: pays.map(p => [...p]), prev: i ? this.hashOf(i - 1) : '0000' };
      this.chain.push(b);
    });
    this.render();
  }

  hashOf(i) {
    const b = this.chain[i];
    return fingerprint(b.prev + '|' + b.pays.map(p => p.join('>')).join('|'));
  }

  firstBroken() {
    for (let i = 1; i < this.chain.length; i++) if (this.chain[i].prev !== this.hashOf(i - 1)) return i;
    return -1;
  }

  tamper(i) {
    this.chain[i].pays[0][2] *= 100;
    this.changed = i;
    this.last = 'tamper';
    this.render();
  }

  redo(i) {
    this.chain[i].prev = this.hashOf(i - 1);
    this.redone++;
    this.last = 'redo';
    this.lastRedo = i;
    this.render();
  }

  render() {
    const broken = this.firstBroken();
    this._blocks.innerHTML = '';
    this.chain.forEach((b, i) => {
      const isChanged = i === this.changed;
      const isBroken = broken !== -1 && i >= broken;
      const box = el('div', 'ch-block' + (isBroken ? ' is-broken' : isChanged ? ' is-changed' : ''));
      box.append(el('h2', 'vl-h', `Block ${i + 1}`));
      box.append(el('p', null, i ? `Block ${i} was: <span class="ch-code">${b.prev}</span>` : 'First block'));
      const pays = el('div', 'ch-pays');
      b.pays.forEach((p, j) => {
        const line = `${p[0]} pays ${p[1]} ${p[2]}`;
        pays.append(el('p', null, isChanged && j === 0 ? `<mark>${line}</mark>` : line));
      });
      box.append(pays);
      box.append(el('p', null, `Fingerprint: <span class="ch-code">${this.hashOf(i)}</span>`));
      const state = isBroken ? (i === broken ? ['is-broken', `✖ Does not match block ${i}`] : ['is-broken', '✖ Chain broken before here'])
        : isChanged ? ['is-changed', '✎ Payment changed']
        : ['is-ok', '✔ Links up'];
      box.append(el('p', 'ch-state ' + state[0], state[1]));

      if (this.changed === -1 && i < this.chain.length - 1) {
        const b1 = el('button', 'vl-btn', 'Change a payment'); b1.type = 'button';
        b1.setAttribute('aria-label', `Change a payment in block ${i + 1}`);
        b1.onclick = () => this.tamper(i);
        box.append(b1);
      } else if (i === broken) {
        const b2 = el('button', 'vl-btn', 'Redo the work'); b2.type = 'button';
        b2.setAttribute('aria-label', `Redo the work for block ${i + 1}`);
        b2.onclick = () => this.redo(i);
        box.append(b2);
      }
      this._blocks.append(box);
    });

    const yours = broken === -1 ? this.chain.length : broken;
    const honest = this.chain.length + this.redone;
    this._tally.innerHTML = this.changed === -1 ? 'Nothing has been changed yet.'
      : `<strong>Your copy:</strong> ${yours} good blocks. <strong>Everyone else's chain:</strong> ${honest} blocks.`;

    let html;
    if (this.last === 'start') {
      html = '<p>All four blocks link up. Each block records the fingerprint of the block before it. Now try to cheat.</p>';
    } else if (this.last === 'tamper') {
      const n = this.changed + 1;
      html = `<p>You changed block ${n}, so its fingerprint changed. Block ${n + 1} still records the old one.</p>`
        + '<p>Every other computer can see the mismatch and will reject your copy. Try to repair it.</p>';
    } else if (broken !== -1) {
      const n = this.lastRedo + 1;
      html = `<p>You redid block ${n}. That means winning the lottery again, which costs electricity.</p>`
        + `<p>It also changed block ${n}'s fingerprint, so now block ${n + 1} does not match. The honest miners added a block meanwhile.</p>`;
    } else {
      html = `<p>Your copy links up again. While you redid ${this.redone} ${this.redone === 1 ? 'block' : 'blocks'}, the honest miners added ${this.redone} more.</p>`
        + '<p>Computers follow the longest chain, so your copy is ignored. A cheat would need more computing power than all the honest miners together.</p>';
    }
    this._out.innerHTML = html;
  }
}

/* ------------------------------------------------------------------ */

const SWITCHES = [
  { id: 'list', label: 'Who keeps the list?',
    options: [['keeper', 'One keeper'], ['all', 'Everyone who joins']] },
  { id: 'stop', label: 'Can anyone stop or undo a payment?',
    options: [['yes', 'Yes'], ['no', 'No']] },
  { id: 'back', label: 'What stands behind the price?',
    options: [['gov', 'A government'], ['firm', 'A company holding dollars'], ['none', 'Nothing']] },
];

const PRESETS = [
  ['A bank account', { list: 'keeper', stop: 'yes', back: 'gov' }],
  ['Bitcoin', { list: 'all', stop: 'no', back: 'none' }],
  ['A dollar-backed coin', { list: 'all', stop: 'yes', back: 'firm' }],
];

class PhilCoinlab extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.classList.add('vl', 'phil-dense');
    const prompt = this.getAttribute('prompt') || 'Design a kind of money.';
    this.state = { ...PRESETS[0][1] };
    this.innerHTML = '';
    this.append(el('p', 'vl-prompt', prompt));

    const pre = el('div', 'vl-row');
    pre.append(el('span', null, 'Load an example:'));
    PRESETS.forEach(([label, s]) => {
      const b = el('button', 'vl-btn', label); b.type = 'button';
      b.onclick = () => { this.state = { ...s }; this.render(); };
      pre.append(b);
    });
    this.append(pre);

    const sw = el('div', 'cl-switches');
    this._btns = {};
    SWITCHES.forEach((s, i) => {
      const row = el('div', 'cl-switch');
      const h = el('h2', 'vl-h', s.label); h.id = `cl-h-${i}`;
      const opts = el('div', 'vl-row');
      opts.setAttribute('role', 'group'); opts.setAttribute('aria-labelledby', h.id);
      this._btns[s.id] = s.options.map(([val, label]) => {
        const b = toggleBtn(label, () => { this.state[s.id] = val; this.render(); });
        opts.append(b); return { val, b };
      });
      row.append(h, opts);
      sw.append(row);
    });
    this.append(sw);

    this._out = el('div', 'vl-out');
    this._out.setAttribute('aria-live', 'polite');
    this.append(this._out);
    this.render();
  }

  render() {
    const s = this.state;
    /* One keeper holding the only list can always refuse to write a payment. */
    const forced = s.list === 'keeper' && s.stop === 'no';
    const stop = forced ? 'yes' : s.stop;
    for (const id in this._btns) {
      this._btns[id].forEach(({ val, b }) => b.setAttribute('aria-pressed', String((id === 'stop' ? stop : s[id]) === val)));
    }

    const power = s.list === 'all'
      ? '<strong class="is-no">Very high.</strong> Strangers agree on the list through a costly lottery.'
      : '<strong class="is-yes">Low.</strong> One keeper just updates its own list.';
    const price = s.back === 'gov' ? '<strong class="is-yes">Fairly steady.</strong> A government works to keep it that way.'
      : s.back === 'firm' ? '<strong class="is-mid">Steady, if the company really holds the dollars.</strong>'
      : '<strong class="is-no">Swings like a bet.</strong> It is worth what the next buyer will pay.';
    const doctor = stop === 'yes'
      ? '<strong class="is-mid">Maybe.</strong> The ransom can be frozen or taken back, but only if someone catches it.'
      : '<strong class="is-no">Yes.</strong> Nobody is able to block the ransom.';
    const amara = stop === 'yes'
      ? '<strong class="is-mid">Only if whoever holds the stop button allows it.</strong>'
      : '<strong class="is-mid">The coins arrive.</strong> She still needs an exchange to turn them into money she can spend.';

    const trust = [];
    if (s.list === 'keeper') trust.push('the keeper of the list');
    if (stop === 'yes' && s.list !== 'keeper') trust.push('whoever holds the stop button');
    if (s.back === 'gov') trust.push('the government');
    if (s.back === 'firm') trust.push('the company and its reserves');
    const who = trust.length
      ? trust.join(', ').replace(/^./, c => c.toUpperCase()) + '.'
      : 'Nobody. Nobody can help you either, if you lose your key or pay a scammer.';

    this._out.innerHTML = `<dl class="cl-read">
        <dt>Electricity</dt><dd>${power}</dd>
        <dt>Price</dt><dd>${price}</dd>
        <dt>Does Doctor Calamity get paid?</dt><dd>${doctor}</dd>
        <dt>Does Amara get paid?</dt><dd>${amara}</dd>
        <dt>Who do you have to trust?</dt><dd>${who}</dd>
      </dl>`
      + (forced ? '<p>A keeper who holds the only list can always refuse to write a payment down. So the second switch stays on Yes.</p>' : '')
      + '<p><strong>Challenge:</strong> find a setting that is sure to pay Amara and sure to stop Doctor Calamity. Both answers come from the second switch, so watch what happens to them together.</p>';
  }
}

customElements.define('phil-chain', PhilChain);
customElements.define('phil-coinlab', PhilCoinlab);
