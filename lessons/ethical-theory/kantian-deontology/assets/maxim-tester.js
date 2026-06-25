/* =====================================================================
   <phil-maxim-tester> — "The Universalizer" (lesson-local visualization)
   Students pick a maxim; the machine imagines EVERYONE acting on it and
   shows the result of Kant's Formula of Universal Law test:

     result="conception" → contradiction in conception (perfect duty; forbidden)
     result="will"       → contradiction in the will   (imperfect duty)
     result="passes"     → universalizable             (permissible)

   Ungraded exploration (does not register as a quiz widget).
   Authoring:
     <phil-maxim-tester>
       <phil-maxim result="conception"
         universal="Everyone lies whenever it is convenient."
         verdict="No one could believe any assertion — so the lie itself becomes impossible. The maxim destroys its own point.">
         Lie whenever a lie is convenient.
       </phil-maxim>
       ...
     </phil-maxim-tester>
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const VERDICTS = {
  conception: { tag: 'Contradiction in conception', sub: 'Perfect duty — never permitted', cls: 'mt-bad',  icon: '✘' },
  will:       { tag: 'Contradiction in the will',    sub: 'Imperfect duty — you couldn’t rationally want it', cls: 'mt-warn', icon: '◐' },
  passes:     { tag: 'Universalizable',              sub: 'Permissible — it survives the test', cls: 'mt-good', icon: '✔' },
};

const STYLE = `
.mt { display:block; margin:18px 0; padding:18px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); font-size:16px; line-height:1.4; }
.mt-head { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
.mt-head .mt-cog { font-size:24px; }
.mt-pick { display:flex; flex-direction:column; gap:8px; margin-bottom:14px; }
.mt-pick button { font-family:var(--body); font-size:16px; text-align:left; color:var(--ink);
      background:var(--panel); border:3px solid var(--border); box-shadow:0 3px 0 var(--shadow);
      padding:11px 13px; cursor:pointer; }
.mt-pick button:hover { background:#2b3252; }
.mt-pick button.sel { border-color:var(--accent-3); }
.mt-pick button:active { transform:translateY(3px); box-shadow:none; }

.mt-out { border-top:3px dashed var(--border); padding-top:14px; min-height:60px; }
.mt-out.idle { color:var(--muted); }
.mt-univ { margin:0 0 12px; }
.mt-univ b { color:var(--accent-3); }
.mt-verdict { display:flex; align-items:center; gap:12px; padding:12px; border:3px solid var(--border); }
.mt-verdict .mt-icon { font-family:var(--pixel); font-size:16px; }
.mt-verdict .mt-label { font-family:var(--pixel); font-size:11px; line-height:1.5; }
.mt-verdict .mt-sub { display:block; font-family:var(--body); font-size:13px; opacity:.85; margin-top:4px; }
.mt-good { background:#133a24; color:var(--good); }
.mt-warn { background:#3a3413; color:#ffd24a; }
.mt-bad  { background:#3a1620; color:var(--bad); }
.mt-why { margin-top:12px; font-size:15px; }
`;

class PhilMaximTester extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    if (!document.getElementById('mt-style')) {
      const s = el('style'); s.id = 'mt-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.maxims = [...this.querySelectorAll('phil-maxim')].map(m => ({
      text: m.textContent.trim(),
      result: m.getAttribute('result') || 'passes',
      universal: m.getAttribute('universal') || '',
      verdict: m.getAttribute('verdict') || '',
    }));
    this.build();
  }

  build() {
    this.classList.add('mt');
    this.innerHTML = '';

    const head = el('div', 'mt-head');
    head.append(el('span', 'mt-cog', '⚙️'),
                el('span', null, '<strong>The Universalizer.</strong> Pick a maxim. The machine imagines <em>everyone</em> acting on it.'));
    this.append(head);

    const pick = el('div', 'mt-pick');
    this._btns = this.maxims.map((m, i) => {
      const b = el('button', null, `“${m.text}”`);
      b.onclick = () => this.run(i);
      pick.append(b);
      return b;
    });
    this.append(pick);

    this._out = el('div', 'mt-out idle', 'Choose a maxim above to run the test.');
    this.append(this._out);
  }

  run(i) {
    const m = this.maxims[i];
    this._btns.forEach((b, j) => b.classList.toggle('sel', i === j));
    const v = VERDICTS[m.result] || VERDICTS.passes;

    this._out.className = 'mt-out';
    this._out.innerHTML = '';
    this._out.append(el('p', 'mt-univ', `<b>Universal law:</b> ${m.universal}`));

    const verdict = el('div', `mt-verdict ${v.cls}`);
    verdict.append(el('span', 'mt-icon', v.icon),
                   el('span', 'mt-label', `${v.tag}<span class="mt-sub">${v.sub}</span>`));
    this._out.append(verdict);

    if (m.verdict) this._out.append(el('p', 'mt-why', m.verdict));
  }
}

customElements.define('phil-maxim-tester', PhilMaximTester);
