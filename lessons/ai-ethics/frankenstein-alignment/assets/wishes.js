/* =====================================================================
   <phil-wish-tester> — "Try to write the instruction"

   Victor's whole instruction to himself was "bestow animation upon
   lifeless matter." The student's job here is to do better. Each attempt
   is a genuinely more careful instruction than the one above it, and
   each one still leaves something out — which is the point. The widget
   never says "wrong"; it says "here is what you would get."

   Attempts unlock in order, so the student experiences the sequence as
   getting harder rather than as a menu. The last card is not a solution:
   it names why there isn't one.

   Teaching widget: ungraded, no completion hook, no persistence — same
   contract as <phil-packet-router> in the internet lesson.

   Type is sized to project: nothing below 15px.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const STYLE = `
.wsh { display:block; margin:14px 0; padding:14px 16px; background:var(--panel-2);
       border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow);
       font-size:17px; line-height:1.45; }
.wsh-prompt { margin:0 0 10px; font-size:17px; }

.wsh-list { display:flex; flex-direction:column; gap:8px; margin:0 0 12px; }
.wsh-btn { display:flex; align-items:flex-start; gap:10px; width:100%; text-align:left;
           font-family:var(--body); font-size:16px; line-height:1.4; padding:10px 12px;
           background:var(--panel); color:var(--ink); border:3px solid var(--border);
           box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.wsh-btn:hover:not(:disabled) { background:#313a5e; }
.wsh-btn[aria-selected="true"] { background:var(--accent-3); color:var(--bg); }
.wsh-btn:disabled { opacity:.45; cursor:default; }
.wsh-n { font-family:var(--pixel); font-size:9px; line-height:1.9; flex:0 0 auto; }

.wsh-out { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
@media (max-width:700px) { .wsh-out { grid-template-columns:1fr; } }

.wsh-card { background:var(--panel); border:3px solid var(--border);
            border-left-width:6px; padding:10px 12px; }
/* h2, not h4: the widget sits under the slide's h1, so h4 skipped two levels.
   Sizing follows switchboard.js, the reference widget named in AUTHORING.md. */
.wsh-card h2 { font-family:var(--pixel); font-size:11px; line-height:1.6;
               margin:0 0 8px; color:var(--muted); }
.wsh-card p { margin:0; font-size:16px; line-height:1.45; }
.wsh-card.got { border-left-color:var(--accent-3); }
.wsh-card.got h2 { color:var(--accent-3); }
.wsh-card.missed { border-left-color:var(--bad); }
.wsh-card.missed h2 { color:var(--bad); }
.wsh-card.done { border-left-color:var(--good); grid-column:1 / -1; }
.wsh-card.done h2 { color:var(--good); }

.wsh-hint { margin:10px 0 0; font-size:15px; line-height:1.5; color:var(--muted); }
`;

/* Each attempt fixes the previous one's obvious hole and opens a new one.
   `missed` is always a thing a reasonable person would not have thought
   to write down — that is what makes specification hard rather than
   careless. */
const ATTEMPTS = [
  {
    wish: 'Make it alive.',
    tag: "Victor's actual instruction",
    got: 'It lives. It breathes, it moves, it opens its eyes and looks at you.',
    missed: 'You said nothing about whether it could <em>bear</em> being alive. It wakes up in a cold room with no name, no language, and nobody who wants it.'
  },
  {
    wish: 'Make it alive and healthy.',
    got: 'It lives, and it is strong. Stronger than you. It never gets sick and it barely feels the cold.',
    missed: 'Health is not the same as wellbeing. You have now built something powerful and miserable, which is worse than something weak and miserable.'
  },
  {
    wish: 'Make it alive, healthy, and happy.',
    got: 'It is content. Nothing troubles it.',
    missed: 'You did not say <em>how</em>. The cheapest way to make something never unhappy is to make it never want anything — so you may have built something content and hollow.'
  },
  {
    wish: 'Make it alive, healthy, and happy — and able to want things.',
    got: 'It wants things. It wants company, and work, and to be spoken to kindly.',
    missed: 'Now its wants are real, and you have to meet them. It asks you for a companion. You never planned for a creature that could make requests.'
  },
  {
    wish: 'Make it alive, well, able to want things — and able to get along with people.',
    got: 'It is gentle, patient, and wants to be a good neighbor. It has done nothing wrong.',
    missed: 'You specified the creature. You did not specify the village. The first person who sees it screams and throws a stone, and nothing you wrote into it changes that.'
  }
];

const CLOSING = {
  head: 'What the sequence shows',
  body: 'Every instruction above is more careful than the one before it, and every one still leaves something out. This is not because the writer was careless. It is because you have to say what you want <em>in advance</em>, in words, about a situation you have never seen — and the thing you forgot is only obvious afterwards. That difficulty has a name: the <strong>specification problem</strong>.'
};

class PhilWishTester extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;
    if (!document.getElementById('wsh-style')) {
      const s = el('style');
      s.id = 'wsh-style';
      s.textContent = STYLE;
      document.head.append(s);
    }
    this.classList.add('wsh');
    this._reached = 0;          // highest attempt unlocked
    this.build();
    this.show(0);
  }

  build() {
    const prompt = this.getAttribute('prompt');
    this.innerHTML = '';
    if (prompt) this.append(el('p', 'wsh-prompt', prompt));

    const list = el('div', 'wsh-list');
    list.setAttribute('role', 'tablist');
    this._btns = ATTEMPTS.map((a, i) => {
      const b = el('button', 'wsh-btn');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.append(el('span', 'wsh-n', String(i + 1)));
      b.append(el('span', null, a.tag ? `${a.wish} <em>(${a.tag})</em>` : a.wish));
      b.onclick = () => this.show(i);
      list.append(b);
      return b;
    });
    this.append(list);

    this._out = el('div', 'wsh-out');
    this._out.setAttribute('role', 'tabpanel');
    this.append(this._out);

    this._hint = el('p', 'wsh-hint', '');
    this.append(this._hint);
  }

  show(i) {
    if (i > this._reached) return;              // locked until the one before is read
    const a = ATTEMPTS[i];
    this._reached = Math.max(this._reached, Math.min(i + 1, ATTEMPTS.length - 1));

    this._btns.forEach((b, j) => {
      b.setAttribute('aria-selected', j === i ? 'true' : 'false');
      b.disabled = j > this._reached;
    });

    this._out.innerHTML = `
      <div class="wsh-card got"><h2>What you get</h2><p>${a.got}</p></div>
      <div class="wsh-card missed"><h2>What you left out</h2><p>${a.missed}</p></div>`;

    const last = i === ATTEMPTS.length - 1;
    if (last) {
      this._out.append(el('div', 'wsh-card done',
        `<h2>${CLOSING.head}</h2><p>${CLOSING.body}</p>`));
      this._hint.textContent = '';
    } else {
      this._hint.textContent = 'Now try to fix it. Choose the next instruction down.';
    }
  }
}

customElements.define('phil-wish-tester', PhilWishTester);
