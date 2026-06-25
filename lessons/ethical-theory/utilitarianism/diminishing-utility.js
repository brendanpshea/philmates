/* =====================================================================
   <phil-cake-utility> — lesson-local interactive visualization.
   Students divide a fixed number of cake "bites" among several people and
   watch the law of DIMINISHING MARGINAL UTILITY play out: each extra bite a
   person eats adds less happiness, so spreading the cake raises the TOTAL.

   Not graded — it's an exploration, so it doesn't register as a quiz widget.
   Attributes: bites="12" people="You,Ana,Ben,Cy" base="10" rate="0.7"
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const STYLE = `
.cu { display:block; margin:18px 0; padding:18px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); font-size:16px; line-height:1.4; }
.cu-head { display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:14px; }
.cu-head .cu-cake { font-size:26px; }
.cu-left { font-family:var(--pixel); font-size:10px; color:var(--bg); background:var(--accent-3); padding:5px 8px; }
.cu-left.empty { background:var(--muted); }
.cu-presets { margin-left:auto; display:flex; gap:8px; }
.cu-presets button { font-family:var(--pixel); font-size:9px; color:var(--ink); background:var(--panel);
      border:3px solid var(--border); box-shadow:0 3px 0 var(--shadow); padding:8px 10px; cursor:pointer; }
.cu-presets button:active { transform:translateY(3px); box-shadow:none; }

.cu-row { display:grid; grid-template-columns: 86px auto 1fr; align-items:center; gap:12px; margin:10px 0; }
.cu-name { font-weight:700; }
.cu-step { display:flex; align-items:center; gap:8px; }
.cu-step button { font-family:var(--pixel); font-size:12px; width:34px; height:34px; color:var(--bg);
      background:var(--accent-3); border:3px solid var(--border); cursor:pointer; line-height:1; }
.cu-step button:disabled { background:var(--muted); cursor:default; }
.cu-count { font-family:var(--pixel); font-size:12px; min-width:60px; text-align:center; }
.cu-bars { min-width:0; }
.cu-bar { height:18px; background:var(--panel); border:2px solid var(--border); overflow:hidden; }
.cu-bar > i { display:block; height:100%; width:0; background:repeating-linear-gradient(45deg,var(--accent) 0 7px,#38c466 7px 14px); transition:width .2s steps(6); }
.cu-meta { display:flex; justify-content:space-between; font-size:13px; color:var(--muted); margin-top:3px; }
.cu-meta b { color:var(--ink); }

.cu-total { margin-top:16px; padding-top:14px; border-top:3px dashed var(--border); }
.cu-total .cu-bar { height:24px; }
.cu-total .cu-bar > i { background:repeating-linear-gradient(45deg,var(--accent-2) 0 8px,#d452ac 8px 16px); }
.cu-total-row { display:flex; align-items:baseline; gap:12px; margin-bottom:8px; }
.cu-total-num { font-family:var(--pixel); font-size:18px; color:var(--accent-2); }
.cu-msg { margin-top:10px; font-size:15px; color:var(--accent); min-height:1.4em; }
`;

class PhilCakeUtility extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;

    if (!document.getElementById('cu-style')) {
      const s = el('style'); s.id = 'cu-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.bites = +(this.getAttribute('bites') || 12);
    this.names = (this.getAttribute('people') || 'You,Ana,Ben,Cy').split(',').map(s => s.trim());
    this.base  = +(this.getAttribute('base') || 10);
    this.rate  = +(this.getAttribute('rate') || 0.7);
    this.counts = this.names.map((_, i) => (i === 0 ? this.bites : 0)); // start: "you ate it all"

    this._indMax = this.cumulative(this.bites);   // most one person can score
    this._optTotal = this.optimumTotal();         // best achievable total
    this.build();
    this.render();
  }

  cumulative(b) { return this.base * (1 - Math.pow(this.rate, b)) / (1 - this.rate); }
  marginal(b)   { return this.base * Math.pow(this.rate, b); }   // value of the NEXT bite
  total()       { return this.counts.reduce((s, b) => s + this.cumulative(b), 0); }
  used()        { return this.counts.reduce((a, b) => a + b, 0); }
  remaining()   { return this.bites - this.used(); }

  optimumTotal() {                                // greedy: each bite to the hungriest mouth
    const c = this.names.map(() => 0);
    for (let k = 0; k < this.bites; k++) {
      let best = 0;
      for (let i = 1; i < c.length; i++) if (this.marginal(c[i]) > this.marginal(c[best])) best = i;
      c[best]++;
    }
    return c.reduce((s, b) => s + this.cumulative(b), 0);
  }

  build() {
    this.classList.add('cu');
    this.innerHTML = '';

    const head = el('div', 'cu-head');
    head.append(el('span', 'cu-cake', '🍰'),
                el('span', null, `<strong>${this.bites} bites</strong> of cake to divide`));
    this._left = el('span', 'cu-left');
    const presets = el('div', 'cu-presets');
    const all = el('button', null, 'All to You');
    const even = el('button', null, 'Spread evenly');
    all.onclick = () => { this.counts = this.names.map((_, i) => i === 0 ? this.bites : 0); this.render(); };
    even.onclick = () => { this.counts = this.spreadEven(); this.render(); };
    presets.append(all, even);
    head.append(this._left, presets);
    this.append(head);

    this.rows = this.names.map((name, i) => {
      const row = el('div', 'cu-row');
      const step = el('div', 'cu-step');
      const minus = el('button', null, '–'); minus.setAttribute('aria-label', `Take a bite from ${name}`);
      const plus  = el('button', null, '+'); plus.setAttribute('aria-label', `Give a bite to ${name}`);
      const count = el('span', 'cu-count', '0');
      minus.onclick = () => { if (this.counts[i] > 0) { this.counts[i]--; this.render(); } };
      plus.onclick  = () => { if (this.remaining() > 0) { this.counts[i]++; this.render(); } };
      step.append(minus, count, plus);

      const bars = el('div', 'cu-bars');
      const bar = el('div', 'cu-bar'); const fill = el('i'); bar.append(fill);
      const meta = el('div', 'cu-meta');
      const happy = el('span', null, ''); const marg = el('span', null, '');
      meta.append(happy, marg);
      bars.append(bar, meta);

      row.append(el('span', 'cu-name', name), step, bars);
      this.append(row);
      return { i, minus, plus, count, fill, happy, marg };
    });

    const totalWrap = el('div', 'cu-total');
    const trow = el('div', 'cu-total-row');
    this._totalNum = el('span', 'cu-total-num', '');
    trow.append(el('span', null, 'Total happiness'), this._totalNum);
    this._totalBar = el('i');
    const tbar = el('div', 'cu-bar'); tbar.append(this._totalBar);
    this._msg = el('div', 'cu-msg', '');
    totalWrap.append(trow, tbar, this._msg);
    this.append(totalWrap);
  }

  spreadEven() {
    const c = this.names.map(() => Math.floor(this.bites / this.names.length));
    let r = this.bites - c.reduce((a, b) => a + b, 0);
    for (let i = 0; r > 0; i++, r--) c[i % c.length]++;
    return c;
  }

  render() {
    const left = this.remaining();
    this._left.textContent = left > 0 ? `${left} bite${left > 1 ? 's' : ''} left to give` : 'All bites given';
    this._left.classList.toggle('empty', left === 0);

    this.rows.forEach(r => {
      const b = this.counts[r.i];
      r.count.textContent = `${b} 🍰`;
      const h = this.cumulative(b);
      r.fill.style.width = (h / this._indMax * 100) + '%';
      r.happy.innerHTML = `happiness <b>${h.toFixed(1)}</b>`;
      r.marg.textContent = left > 0 ? `next bite: +${this.marginal(b).toFixed(1)}` : '';
      r.minus.disabled = b === 0;
      r.plus.disabled = left === 0;
    });

    const t = this.total();
    this._totalNum.textContent = t.toFixed(1);
    this._totalBar.style.width = (t / this._optTotal * 100) + '%';

    const oneEats = this.counts.filter(b => b > 0).length === 1;
    if (oneEats && this.used() === this.bites) {
      this._msg.innerHTML = `One stuffed person. Notice each extra bite added less — that's <b>diminishing marginal utility</b>.`;
    } else if (t >= this._optTotal - 0.05) {
      this._msg.innerHTML = `🎉 Maximum total! This is Bentham's <b>greatest happiness for the greatest number</b> — spreading bites to hungrier mouths beats piling them on the full.`;
    } else {
      const gain = (this._optTotal - t).toFixed(1);
      this._msg.innerHTML = `Total is climbing. You could add <b>+${gain}</b> more by giving bites to whoever's hungriest.`;
    }
  }
}

customElements.define('phil-cake-utility', PhilCakeUtility);
