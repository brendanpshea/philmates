/* =====================================================================
   <phil-consent> — "The Consent-o-Meter" (lesson-local visualization)
   Repurposed from the bioethics <phil-balance> meter: instead of weighing two
   principles, it checks the elements of valid informed consent. Toggle each
   requirement ON if the case really has it; consent reads VALID only when all
   are present, and each missing one names the defect.

   Ungraded exploration (not a quiz widget).
   Authoring:
     <phil-consent case="..." action="..." prompt="...">
       <phil-req fail="No capacity — can't understand or weigh the choice.">
         The patient can understand and weigh the choice (capacity).
       </phil-req>
       ...
     </phil-consent>
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const STYLE = `
.cm { display:block; margin:14px 0; padding:14px 16px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); font-size:15px; line-height:1.4; }
.cm-case { margin:0 0 4px; }
.cm-action { margin:0 0 10px; color:var(--accent-3); }
.cm-action b { color:var(--ink); }

.cm-meter { height:20px; background:var(--panel); border:3px solid var(--border); overflow:hidden; margin:0 0 6px; }
.cm-meter > i { display:block; height:100%; width:0; background:repeating-linear-gradient(45deg,var(--bad) 0 8px,#d4515f 8px 16px); transition:width .25s steps(6), background .2s; }
.cm-meter.ok > i { background:repeating-linear-gradient(45deg,var(--accent) 0 8px,#38c466 8px 16px); }

.cm-conds { list-style:none; padding:0; margin:10px 0; display:flex; flex-direction:column; gap:6px; }
.cm-conds li { display:flex; gap:10px; align-items:flex-start; background:var(--panel); border:3px solid var(--border); padding:8px 10px; cursor:pointer; }
.cm-conds li.on { border-color:var(--good); }
.cm-conds input { width:18px; height:18px; flex:none; margin-top:2px; accent-color:var(--good); }

.cm-verdict { font-family:var(--pixel); font-size:11px; line-height:1.5; padding:12px; border:3px solid var(--border); }
.cm-verdict.no { background:#3a1620; color:var(--bad); }
.cm-verdict.yes { background:#133a24; color:var(--good); }
.cm-defects { margin:8px 0 0; padding-left:18px; font-size:14px; color:var(--bad); }
.cm-defects:empty { display:none; }
`;

class PhilConsent extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    if (!document.getElementById('cm-style')) {
      const s = el('style'); s.id = 'cm-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.reqs = [...this.querySelectorAll('phil-req')].map(r => ({
      text: r.textContent.trim(),
      fail: r.getAttribute('fail') || 'This requirement is not met.',
    }));
    this.data = {
      caseText: this.getAttribute('case') || '',
      action: this.getAttribute('action') || '',
      instruction: this.getAttribute('prompt') ||
        'Toggle each requirement ON if the case really has it. Consent is valid only when all are present.',
    };
    this.build();
    this.render();
  }

  build() {
    this.classList.add('cm');
    this.innerHTML = '';
    if (this.data.caseText) this.append(el('p', 'cm-case', `<em>${this.data.caseText}</em>`));
    if (this.data.action) this.append(el('p', 'cm-action', `<b>Action:</b> ${this.data.action}`));

    this._meter = el('div', 'cm-meter'); this._fill = el('i'); this._meter.append(this._fill);
    this.append(this._meter);
    this.append(el('p', null, this.data.instruction));

    const list = el('ul', 'cm-conds');
    this._items = this.reqs.map(r => {
      const li = el('li');
      const box = el('input'); box.type = 'checkbox';
      box.onchange = () => { li.classList.toggle('on', box.checked); this.render(); };
      li.onclick = e => { if (e.target !== box) { box.checked = !box.checked; box.onchange(); } };
      li.append(box, el('span', null, r.text));
      list.append(li);
      return box;
    });
    this.append(list);

    this._verdict = el('div', 'cm-verdict no');
    this._defects = el('ul', 'cm-defects');
    this.append(this._verdict, this._defects);
  }

  render() {
    const total = this._items.length;
    const met = this._items.filter(b => b.checked).length;
    const valid = met === total && total > 0;

    this._fill.style.width = Math.round((met / total) * 100) + '%';
    this._meter.classList.toggle('ok', valid);

    this._verdict.className = 'cm-verdict ' + (valid ? 'yes' : 'no');
    this._verdict.textContent = valid
      ? '✔ Valid informed consent — every element is present.'
      : `✘ Not valid yet — ${total - met} element(s) missing.`;

    this._defects.innerHTML = '';
    if (!valid) this._items.forEach((b, i) => {
      if (!b.checked) this._defects.append(el('li', null, this.reqs[i].fail));
    });
  }
}

customElements.define('phil-consent', PhilConsent);
