/* =====================================================================
   Lesson-local widgets for "The Masquerade of Silverport".
   All three are ungraded explorations (not quiz widgets).

   <phil-eliza prompt="…"></phil-eliza>
     A working reconstruction of Joseph Weizenbaum's 1966 DOCTOR script for
     ELIZA: his keywords, ranks, decomposition rules, and reply lists, with
     his pronoun swaps and "memory" of things said about "my …". Students type
     (or tap a starter line). "Peek behind the mask" labels each reply with
     the keyword and rule that produced it.

   <phil-room prompt="…"></phil-room>
     The Chinese Room, played. Slips of an invented script arrive; the student
     finds the matching row in the rulebook and copies the answer out, shape by
     shape. After four rounds the conversation is translated.

   <phil-where prompt="…">
     <script type="application/json">
     { "image": "./assets/whole-room.png", "alt": "…",
       "options": [ { "id": "person", "label": "…", "reply": "…",
                      "claim": "…", "searle": "…", "ask": "…" } ] }
     </script>
   </phil-where>
     "Where is the understanding?" Pick a place; see the reply that puts
     understanding there and Searle's answer to it.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const readJSON = (host, fallback) => {
  const json = host.querySelector('script[type="application/json"]');
  try { return JSON.parse(json ? json.textContent : ''); }
  catch { return fallback; }
};

const STYLE = `
.ms { display:block; margin:12px 0; padding:12px 14px; background:var(--panel-2);
      border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow); --ms-amber:#ffcf5a; }
.ms-prompt { margin:0 0 10px; }
.ms-row { display:flex; flex-wrap:wrap; align-items:center; gap:6px; }
.ms-btn { font:inherit; font-size:16px; padding:5px 11px; background:var(--bg); color:var(--ink);
          border:2px solid var(--border); cursor:pointer; }
.ms-btn[aria-pressed="true"] { background:#133a24; border-color:var(--good); color:var(--good); font-weight:bold; }
.ms-btn[aria-pressed="true"]::before { content:"✔ "; }
.ms-btn:disabled { opacity:.55; cursor:default; }
.ms-h { font-family:var(--pixel); font-size:10px; line-height:1.5; margin:0 0 6px; color:var(--accent-3); }
.ms-out { background:var(--panel); border:3px solid var(--border); padding:8px 10px; margin:8px 0 0; min-height:2.6em; }
.ms-out p { margin:0 0 4px; }
.ms-out p:last-child { margin-bottom:0; }
.ms-note { color:var(--muted); }

/* ---- eliza ---- */
.ez-log { background:#0b0d16; border:3px solid var(--border); height:clamp(220px, 34vh, 340px); overflow-y:auto;
          padding:10px 12px; font-family:'Courier New', Consolas, monospace; font-size:clamp(15px, 1.35vw, 18px); line-height:1.45; }
.ez-line { margin:0 0 8px; }
.ez-you { color:var(--ink); }
.ez-you::before { content:"> "; color:var(--muted); }
.ez-bot { color:#9ff0b8; text-transform:uppercase; letter-spacing:.02em; }
.ez-why { display:block; color:var(--ms-amber); font-size:.82em; text-transform:none; letter-spacing:0; margin-top:2px; }
.ez-why[hidden] { display:none; }
.ez-form { display:flex; gap:6px; margin:8px 0 0; }
.ez-form input { flex:1; min-width:0; font:inherit; font-size:17px; padding:6px 10px; background:var(--bg); color:var(--ink);
                 border:2px solid var(--border); }
.ez-starters { margin:8px 0 0; }
.ez-starters .ms-btn { font-size:15px; }

/* ---- room ---- */
.rm-main { display:grid; grid-template-columns:minmax(0, 1fr) minmax(0, 1.15fr); gap:10px; align-items:start; }
.rm-box { background:var(--panel); border:3px solid var(--border); padding:8px 10px; }
.rm-slip { display:flex; flex-wrap:wrap; gap:4px; align-items:center; min-height:44px; padding:6px 8px;
           background:#e8dcc0; color:#2b1d0e; border:2px solid var(--border); }
.rm-slip.is-out { background:#d9e8f5; }
.rm-slip .ms-note { color:#4a3b25; }
.rm-g { display:inline-block; width:30px; height:30px; }
.rm-g svg { display:block; width:100%; height:100%; }
.rm-book { display:grid; gap:4px; }
.rm-rule { display:grid; grid-template-columns:1fr auto 1fr; gap:6px; align-items:center; padding:3px 6px;
           background:#e8dcc0; color:#2b1d0e; border:2px solid var(--border); }
.rm-rule .rm-g { width:22px; height:22px; }
.rm-rule span.rm-arrow { font-weight:bold; }
.rm-seq { display:flex; flex-wrap:wrap; gap:2px; }
.rm-palette { display:grid; grid-template-columns:repeat(5, 1fr); gap:4px; margin:6px 0; }
.rm-palette .ms-btn { padding:4px; display:grid; place-items:center; }
.rm-log p { margin:0 0 6px; }
.rm-trans { color:var(--ms-amber); font-style:italic; }
@media (max-width:760px) { .rm-main { grid-template-columns:1fr; } }

/* ---- where ---- */
.wh-main { display:grid; grid-template-columns:minmax(0, 220px) minmax(0, 1fr); gap:10px; align-items:start; }
.wh-main img { width:100%; height:auto; border:3px solid var(--border); image-rendering:pixelated; }
.wh-opts { display:flex; flex-direction:column; gap:5px; }
.wh-opts .ms-btn { text-align:left; }
@media (max-width:760px) { .wh-main { grid-template-columns:1fr; } .wh-main img { max-width:200px; } }
`;

const addStyle = () => {
  if (document.getElementById('ms-style')) return;
  const s = el('style'); s.id = 'ms-style'; s.textContent = STYLE; document.head.append(s);
};

const toggleBtn = (label, onclick) => {
  const b = el('button', 'ms-btn'); b.type = 'button'; b.textContent = label;
  b.setAttribute('aria-pressed', 'false');
  b.onclick = onclick;
  return b;
};

/* ==================================================================
   ELIZA — reconstruction of the DOCTOR script (Weizenbaum, CACM 1966)
   ================================================================== */

const PRE = { dont: "don't", cant: "can't", wont: "won't", recollect: 'remember', dreamt: 'dreamed',
  dreams: 'dream', maybe: 'perhaps', how: 'what', when: 'what', certainly: 'yes', machine: 'computer',
  computers: 'computer', were: 'was', "you're": 'you are', "i'm": 'i am', same: 'alike' };

const POST = { am: 'are', your: 'my', me: 'you', myself: 'yourself', yourself: 'myself', i: 'you',
  you: 'I', my: 'your', 'are': 'am' };

const GROUPS = {
  belief: ['feel', 'think', 'believe', 'wish'],
  family: ['mother', 'mom', 'father', 'dad', 'sister', 'brother', 'wife', 'husband', 'children', 'child'],
  desire: ['want', 'need'],
  sad: ['sad', 'unhappy', 'depressed', 'sick'],
  happy: ['happy', 'elated', 'glad', 'better'],
  everyone: ['everyone', 'everybody', 'nobody', 'noone'],
  be: ['am', 'is', 'are', 'was'],
};

/* keyword: [rank, [ [pattern, [replies]] ... ]]  — a reply of '=key' jumps to that keyword. */
const SCRIPT = {
  sorry: [0, [['*', ["Please don't apologize.", 'Apologies are not necessary.', "I've told you that apologies are not required."]]]],
  apologize: [0, [['*', ['=sorry']]]],
  remember: [5, [
    ['* i remember *', ['Do you often think of (2)?', 'Does thinking of (2) bring anything else to mind?', 'What else do you recollect?', 'Why do you recall (2) just now?', 'What in the present situation reminds you of (2)?', 'What is the connection between me and (2)?']],
    ['* do i remember *', ['Did you think I would forget (2)?', 'Why do you think I should recall (2) now?', 'What about (2)?', 'You mentioned (2)?']],
    ['*', ['=what']]]],
  if: [3, [['* if *', ["Do you think it's likely that (2)?", 'Do you wish that (2)?', 'What do you know about (2)?', 'Really, if (2)?']]]],
  dreamed: [4, [['* i dreamed *', ['Really, (2)?', 'Have you ever fantasized (2) while you were awake?', 'Have you ever dreamed (2) before?']], ['*', ['=dream']]]],
  dream: [3, [['*', ['What does that dream suggest to you?', 'Do you dream often?', 'What persons appear in your dreams?', 'Do you believe that dreams have something to do with your problems?']]]],
  perhaps: [0, [['*', ["You don't seem quite certain.", 'Why the uncertain tone?', "Can't you be more positive?", "You aren't sure?", "Don't you know?"]]]],
  name: [15, [['*', ['I am not interested in names.', "I've told you before, I don't care about names. Please continue."]]]],
  hello: [0, [['*', ['How do you do. Please state your problem.']]]],
  computer: [50, [['*', ['Do computers worry you?', 'Why do you mention computers?', 'What do you think machines have to do with your problem?', "Don't you think computers can help people?", 'What about machines worries you?', 'What do you think about machines?']]]],
  am: [0, [['* am i *', ['Do you believe you are (2)?', 'Would you want to be (2)?', 'You wish I would tell you you are (2)?', 'What would it mean if you were (2)?']], ['*', ["Why do you say 'am'?", "I don't understand that."]]]],
  are: [0, [
    ['* are you *', ['Why are you interested in whether I am (2) or not?', "Would you prefer if I weren't (2)?", 'Perhaps I am (2) in your fantasies.', 'Do you sometimes think I am (2)?']],
    ['* are *', ['Did you think they might not be (2)?', 'Would you like it if they were not (2)?', 'What if they were not (2)?', 'Possibly they are (2).']]]],
  your: [0, [['* your *', ['Why are you concerned over my (2)?', 'What about your own (2)?', "Are you worried about someone else's (2)?", 'Really, my (2)?']]]],
  was: [2, [
    ['* was i *', ['What if you were (2)?', 'Do you think you were (2)?', 'Were you (2)?', 'What would it mean if you were (2)?']],
    ['* i was *', ['Were you really?', 'Why do you tell me you were (2) now?', 'Perhaps I already know you were (2).']],
    ['* was you *', ['Would you like to believe I was (2)?', 'What suggests that I was (2)?', 'What do you think?', 'Perhaps I was (2).']],
    ['*', ['=what']]]],
  i: [0, [
    ['* i @desire *', ['What would it mean to you if you got (3)?', 'Why do you want (3)?', 'Suppose you got (3) soon?', 'What if you never got (3)?', 'What would getting (3) mean to you?']],
    ['* i am * @sad *', ['I am sorry to hear that you are (3).', 'Do you think that coming here will help you not to be (3)?', "I'm sure it's not pleasant to be (3).", 'Can you explain what made you (3)?']],
    ['* i am * @happy *', ['How have I helped you to be (3)?', 'Has your treatment made you (3)?', 'What makes you (3) just now?', 'Can you explain why you are suddenly (3)?']],
    ['* i @belief i *', ['Do you really think so?', 'But you are not sure you (3).', 'Do you really doubt you (3)?']],
    ['* i am *', ['Is it because you are (2) that you came to me?', 'How long have you been (2)?', 'Do you believe it is normal to be (2)?', 'Do you enjoy being (2)?']],
    ["* i can't *", ["How do you know that you can't (2)?", 'Have you tried?', 'Perhaps you could (2) now.', 'Do you really want to be able to (2)?']],
    ["* i don't *", ["Don't you really (2)?", "Why don't you (2)?", 'Do you wish to be able to (2)?', 'Does that trouble you?']],
    ['* i feel *', ['Tell me more about such feelings.', 'Do you often feel (2)?', 'Do you enjoy feeling (2)?', 'Of what does feeling (2) remind you?']],
    ['* i * you *', ['Perhaps in your fantasies we (2) each other.', 'Do you wish to (2) me?', 'You seem to need to (2) me.', 'Do you (2) anyone else?']],
    ['*', ['You say (1)?', 'Can you elaborate on that?', 'Do you say (1) for some special reason?', "That's quite interesting."]]]],
  you: [0, [
    ['* you remind me of *', ['=alike']],
    ['* you are *', ['What makes you think I am (2)?', 'Does it please you to believe I am (2)?', 'Do you sometimes wish you were (2)?', 'Perhaps you would like to be (2).']],
    ['* you * me *', ['Why do you think I (2) you?', "You like to think I (2) you, don't you?", 'What makes you think I (2) you?', 'Really, I (2) you?', 'Do you wish to believe I (2) you?', 'Suppose I did (2) you. What would that mean?', 'Does someone else believe I (2) you?']],
    ['* you *', ['We were discussing you, not me.', 'Oh, I (2)?', "You're not really talking about me, are you?", 'What are your feelings now?']]]],
  yes: [0, [['*', ['You seem quite positive.', 'You are sure.', 'I see.', 'I understand.']]]],
  no: [0, [['*', ['Are you saying no just to be negative?', 'You are being a bit negative.', 'Why not?', "Why 'no'?"]]]],
  my: [2, [
    ['* my * @family *', ['Tell me more about your family.', 'Who else in your family (4)?', 'Your (3)?', 'What else comes to mind when you think of your (3)?']],
    ['* my *', ['Your (2)?', 'Why do you say your (2)?', 'Does that suggest anything else which belongs to you?', 'Is it important to you that your (2)?']]]],
  can: [0, [
    ['* can you *', ["You believe I can (2), don't you?", 'You want me to be able to (2).', 'Perhaps you would like to be able to (2) yourself.']],
    ['* can i *', ['Whether or not you can (2) depends on you more than on me.', 'Do you want to be able to (2)?', "Perhaps you don't want to (2)."]],
    ['*', ['=what']]]],
  what: [0, [['*', ['Why do you ask?', 'Does that question interest you?', 'What is it you really want to know?', 'Are such questions much on your mind?', 'What answer would please you most?', 'What do you think?', 'What comes to your mind when you ask that?', 'Have you asked such questions before?', 'Have you asked anyone else?']]]],
  because: [0, [['*', ['Is that the real reason?', "Don't any other reasons come to mind?", 'Does that reason seem to explain anything else?', 'What other reasons might there be?']]]],
  why: [0, [
    ["* why don't you *", ["Do you believe I don't (2)?", 'Perhaps I will (2) in good time.', 'Should you (2) yourself?', 'You want me to (2)?']],
    ["* why can't i *", ['Do you think you should be able to (2)?', 'Do you want to be able to (2)?', 'Do you believe this will help you to (2)?', "Have you any idea why you can't (2)?"]],
    ['*', ['=what']]]],
  everyone: [2, [['* @everyone *', ['Really, (2)?', 'Surely not (2).', 'Can you think of anyone in particular?', 'Who, for example?', 'You are thinking of a very special person?', 'Who, may I ask?', 'Someone special perhaps?', "You have a particular person in mind, don't you?", "Who do you think you're talking about?"]]]],
  everybody: [2, [['*', ['=everyone']]]],
  nobody: [2, [['*', ['=everyone']]]],
  always: [1, [['*', ['Can you think of a specific example?', 'When?', 'What incident are you thinking of?', 'Really, always?']]]],
  alike: [10, [['*', ['In what way?', 'What resemblance do you see?', 'What does that similarity suggest to you?', 'What other connections do you see?', 'What do you suppose that resemblance means?', 'What is the connection, do you suppose?', 'Could there really be some connection?', 'How?']]]],
  like: [10, [['* @be * like *', ['=alike']]]],
};

const NONE = ["I am not sure I understand you fully.", 'Please go on.', 'What does that suggest to you?', 'Do you feel strongly about discussing such things?'];
const MEMORY = ["Let's discuss further why your (2).", 'Earlier you said your (2).', 'But your (2).', 'Does that have anything to do with the fact that your (2)?'];

const words = (s) => s.toLowerCase().replace(/[^a-z' ]/g, ' ').split(/\s+/).filter(Boolean)
  .flatMap(w => (PRE[w] || w).split(' '));

/* Match pattern tokens against words. '*' takes 0+ words, '@g' one word from
   group g, anything else one literal word. Returns the captured parts. */
function match(pat, ws) {
  const p = pat.split(' ');
  const go = (pi, wi, caps) => {
    if (pi === p.length) return wi === ws.length ? caps : null;
    const t = p[pi];
    if (t === '*') {
      for (let k = ws.length; k >= wi; k--) {
        const r = go(pi + 1, k, [...caps, ws.slice(wi, k)]);
        if (r) return r;
      }
      return null;
    }
    if (wi >= ws.length) return null;
    if (t.startsWith('@')) return GROUPS[t.slice(1)].includes(ws[wi]) ? go(pi + 1, wi + 1, [...caps, [ws[wi]]]) : null;
    return t === ws[wi] ? go(pi + 1, wi + 1, caps) : null;
  };
  return go(0, 0, []);
}

const swap = (part) => part.map(w => POST[w] || w).join(' ');
const fill = (tpl, caps) => tpl.replace(/\((\d)\)/g, (_, n) => swap(caps[Number(n) - 1] || []));

class Eliza {
  constructor() { this.turn = {}; this.memory = []; }
  next(key, list) { const i = this.turn[key] || 0; this.turn[key] = i + 1; return list[i % list.length]; }
  respond(input) {
    const clauses = input.split(/[.,;!?]+/).map(words).filter(c => c.length);
    let best = null;
    for (const ws of clauses) {
      const keys = ws.filter(w => SCRIPT[w]);
      if (!keys.length) continue;
      const key = keys.reduce((a, b) => (SCRIPT[b][0] > SCRIPT[a][0] ? b : a));
      best = { ws, key };
      break;
    }
    if (!best) {
      if (this.memory.length) return { text: this.memory.shift(), why: 'No keyword. Reusing something you said earlier about "my …".' };
      return { text: this.next('NONE', NONE), why: 'No keyword found. A stock reply.' };
    }
    return this.apply(best.key, best.ws, 0);
  }
  apply(key, ws, depth) {
    for (const [pat, replies] of SCRIPT[key][1]) {
      const caps = match(pat, ws);
      if (!caps) continue;
      const tpl = this.next(key + '|' + pat, replies);
      if (tpl.startsWith('=') && depth < 3) {
        const r = this.apply(tpl.slice(1), ws, depth + 1);
        return { text: r.text, why: `Keyword "${key}" sends you on to "${tpl.slice(1)}". ${r.why}` };
      }
      if (key === 'my' && pat === '* my *') this.memory.push(fill(this.next('MEMORY', MEMORY), caps));
      return { text: fill(tpl, caps), why: `Keyword "${key}". Pattern "${pat}". Your words dropped into a stock reply.` };
    }
    return { text: this.next('NONE', NONE), why: `Keyword "${key}", but no pattern fit. A stock reply.` };
  }
}

const STARTERS = ['Men are all alike.', 'My mother takes care of me.', 'I am unhappy.', 'Are you a computer?', 'What is 2 plus 2?', 'Do you understand me?'];

class PhilEliza extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.bot = new Eliza();
    this.peek = false;
    this.classList.add('ms', 'phil-dense');
    this.innerHTML = '';
    this.append(el('p', 'ms-prompt', this.getAttribute('prompt') || 'Talk to ELIZA.'));

    this._log = el('div', 'ez-log');
    this._log.setAttribute('role', 'log');
    this._log.setAttribute('aria-live', 'polite');
    this._log.setAttribute('aria-label', 'Conversation with ELIZA');
    this.append(this._log);

    const form = el('form', 'ez-form');
    const input = el('input');
    input.type = 'text'; input.autocomplete = 'off'; input.maxLength = 160;
    input.setAttribute('aria-label', 'Your message to ELIZA');
    input.placeholder = 'Type to the masked guest…';
    const send = el('button', 'ms-btn', 'Send'); send.type = 'submit';
    form.append(input, send);
    form.onsubmit = (e) => { e.preventDefault(); this.say(input.value); input.value = ''; input.focus(); };
    this.append(form);

    const st = el('div', 'ms-row ez-starters');
    st.setAttribute('role', 'group'); st.setAttribute('aria-label', 'Starter lines');
    STARTERS.forEach(s => { const b = el('button', 'ms-btn', s); b.type = 'button'; b.onclick = () => this.say(s); st.append(b); });
    this.append(st);

    const tools = el('div', 'ms-row'); tools.style.marginTop = '8px';
    this._peekBtn = toggleBtn('Peek behind the mask', () => { this.peek = !this.peek; this.render(); });
    const reset = el('button', 'ms-btn', 'Start over'); reset.type = 'button';
    reset.onclick = () => { this.bot = new Eliza(); this._log.innerHTML = ''; this.greet(); };
    tools.append(this._peekBtn, reset);
    this.append(tools);
    this.greet();
  }
  greet() { this.line('bot', 'How do you do. Please tell me your problem.', 'The opening line of the DOCTOR script.'); }
  line(who, text, why) {
    const p = el('p', `ez-line ez-${who}`);
    p.textContent = text;
    if (why) { const w = el('span', 'ez-why', why); w.hidden = !this.peek; p.append(w); }
    this._log.append(p);
    this._log.scrollTop = this._log.scrollHeight;
  }
  say(text) {
    text = (text || '').trim();
    if (!text) return;
    this.line('you', text);
    const r = this.bot.respond(text);
    this.line('bot', r.text, r.why);
  }
  render() {
    this._peekBtn.setAttribute('aria-pressed', String(this.peek));
    this._log.querySelectorAll('.ez-why').forEach(w => { w.hidden = !this.peek; });
  }
}

/* ==================================================================
   The Room — an invented script, a rulebook, four slips
   ================================================================== */

/* Ten shapes, drawn on a 20×20 grid. Names are for screen readers only. */
const GLYPHS = [
  ['arch', 'M3 15 Q10 1 17 15 M10 9 V18'],
  ['ring', 'M10 3 A7 7 0 1 1 9.9 3 M10 9 V11'],
  ['zigzag', 'M2 6 L7 14 L11 6 L15 14 L18 6'],
  ['hook', 'M6 3 V13 Q6 18 11 18 Q15 18 15 13'],
  ['wave', 'M2 10 Q6 4 10 10 T18 10 M2 15 H18'],
  ['fork', 'M10 18 V9 M10 9 L4 3 M10 9 L16 3'],
  ['eye', 'M2 10 Q10 2 18 10 Q10 18 2 10 M10 8 V12'],
  ['ladder', 'M6 2 V18 M14 2 V18 M6 7 H14 M6 13 H14'],
  ['spiral', 'M10 10 m0 -2 a2 2 0 1 1 -2 2 a4 4 0 1 1 4 4 a6 6 0 1 1 -6 -6'],
  ['comb', 'M3 5 H17 M5 5 V15 M10 5 V12 M15 5 V17'],
];

const glyph = (i) => {
  const [name, d] = GLYPHS[i];
  return `<span class="rm-g" role="img" aria-label="${name}"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg></span>`;
};
const seq = (arr) => `<span class="rm-seq">${arr.map(glyph).join('')}</span>`;
const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

/* The four exchanges, in order, plus two rules that never come up. */
const RULES = [
  { in: [4, 1, 7], out: [0, 6, 2] },
  { in: [3, 8, 5, 1], out: [9, 2, 6, 0] },
  { in: [2, 2, 6, 7], out: [5, 3, 8] },
  { in: [6, 9, 4], out: [1, 7, 4, 3] },
  { in: [1, 1, 3], out: [8, 0, 5] },
  { in: [7, 5, 9, 9], out: [6, 4, 2, 1] },
];
const ORDER = [0, 1, 2, 3];
const BOOK_ORDER = [4, 2, 0, 5, 3, 1];
const TRANSLATION = [
  ['Hello? Is anyone there?', 'Yes. I am here. How can I help?'],
  ['My cat has run away. I am frightened.', 'I am sorry. When did you last see her?'],
  ['This morning, by the harbor wall.', 'Cats often hide close to home. Look in the cellars nearby.'],
  ['Thank you. You are very kind.', 'Good luck. I hope she comes home tonight.'],
];

class PhilRoom extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.round = 0;
    this.draft = [];
    this.done = [];
    this.translated = false;
    this.classList.add('ms', 'phil-dense');
    this.innerHTML = '';
    this.append(el('p', 'ms-prompt', this.getAttribute('prompt') || 'Answer the slips.'));

    const main = el('div', 'rm-main');
    const left = el('div', 'rm-box');
    left.append(el('h2', 'ms-h', 'Slip under the door'));
    this._in = el('div', 'rm-slip');
    left.append(this._in);
    const ansH = el('h2', 'ms-h', 'Your answer slip'); ansH.style.marginTop = '8px';
    left.append(ansH);
    this._draft = el('div', 'rm-slip is-out');
    this._draft.setAttribute('aria-live', 'polite');
    left.append(this._draft);
    this._pal = el('div', 'rm-palette');
    this._pal.setAttribute('role', 'group'); this._pal.setAttribute('aria-label', 'Shapes to copy');
    GLYPHS.forEach((_, i) => {
      const b = el('button', 'ms-btn', glyph(i)); b.type = 'button';
      b.setAttribute('aria-label', `Add ${GLYPHS[i][0]}`);
      b.onclick = () => { if (this.draft.length < 6) { this.draft.push(i); this.render(); } };
      this._pal.append(b);
    });
    left.append(this._pal);
    const row = el('div', 'ms-row');
    const undo = el('button', 'ms-btn', 'Undo'); undo.type = 'button'; undo.onclick = () => { this.draft.pop(); this.render(); };
    this._send = el('button', 'ms-btn', 'Push it under the door'); this._send.type = 'button'; this._send.onclick = () => this.send();
    row.append(undo, this._send);
    left.append(row);

    const right = el('div', 'rm-box');
    right.append(el('h2', 'ms-h', 'The rulebook'));
    const book = el('div', 'rm-book');
    BOOK_ORDER.forEach(i => {
      const r = RULES[i];
      book.append(el('div', 'rm-rule', `${seq(r.in)}<span class="rm-arrow" aria-label="answer with">→</span>${seq(r.out)}`));
    });
    right.append(book);
    main.append(left, right);
    this.append(main);

    this._out = el('div', 'ms-out rm-log');
    this._out.setAttribute('aria-live', 'polite');
    this.append(this._out);
    this.render();
  }
  send() {
    if (this.round >= ORDER.length) return;
    const rule = RULES[ORDER[this.round]];
    if (!same(this.draft, rule.out)) {
      this._msg = '<p>The rulebook says otherwise. Find the row that starts with the shapes on the slip, and copy the shapes after the arrow.</p>';
      this.render();
      return;
    }
    this.done.push(this.round);
    this.round++;
    this.draft = [];
    this._msg = this.round < ORDER.length
      ? '<p>The slip disappears under the door. A moment later, another one arrives.</p>'
      : null;
    this.render();
  }
  render() {
    const finished = this.round >= ORDER.length;
    this._in.innerHTML = finished ? '<span class="ms-note">No more slips.</span>' : seq(RULES[ORDER[this.round]].in);
    this._draft.innerHTML = this.draft.length ? seq(this.draft) : '<span class="ms-note">Tap shapes to copy them here.</span>';
    this._send.disabled = finished || !this.draft.length;
    this._pal.querySelectorAll('button').forEach(b => { b.disabled = finished; });

    if (!finished) {
      this._out.innerHTML = this._msg || `<p class="ms-note">Slip ${this.round + 1} of ${ORDER.length}. You don't need to know what any shape means. Just follow the book.</p>`;
      return;
    }
    let html = '<p><strong>Four slips in, four answers out.</strong> Every answer matched the book. Whoever is outside seems satisfied.</p>';
    if (!this.translated) {
      this._out.innerHTML = html + '<p><button type="button" class="ms-btn rm-translate">Translate the conversation</button></p>';
      this._out.querySelector('.rm-translate').onclick = () => { this.translated = true; this.render(); };
      return;
    }
    html = '<p><strong>What you said, without knowing it:</strong></p>';
    ORDER.forEach((ri, k) => {
      html += `<p>${seq(RULES[ri].in)} <span class="rm-trans">"${TRANSLATION[k][0]}"</span><br>${seq(RULES[ri].out)} <span class="rm-trans">"${TRANSLATION[k][1]}"</span></p>`;
    });
    this._out.innerHTML = html;
  }
}

/* ==================================================================
   Where is the understanding?
   ================================================================== */

class PhilWhere extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    addStyle();
    this.data = readJSON(this, { options: [] });
    this.pick = null;
    this.classList.add('ms', 'phil-dense');
    this.innerHTML = '';
    this.append(el('p', 'ms-prompt', this.getAttribute('prompt') || 'Where is the understanding?'));
    const main = el('div', 'wh-main');
    if (this.data.image) {
      const img = el('img'); img.src = this.data.image; img.alt = this.data.alt || '';
      main.append(img);
    }
    const right = el('div');
    const opts = el('div', 'wh-opts');
    opts.setAttribute('role', 'group'); opts.setAttribute('aria-label', 'Places the understanding might be');
    this._btns = this.data.options.map(o => {
      const b = toggleBtn(o.label, () => { this.pick = o.id; this.render(); });
      opts.append(b); return { o, b };
    });
    right.append(opts);
    this._out = el('div', 'ms-out');
    this._out.setAttribute('aria-live', 'polite');
    right.append(this._out);
    main.append(right);
    this.append(main);
    this.render();
  }
  render() {
    this._btns.forEach(({ o, b }) => b.setAttribute('aria-pressed', String(o.id === this.pick)));
    const o = this.data.options.find(x => x.id === this.pick);
    this._out.innerHTML = !o
      ? '<p class="ms-note">Pick a place. Most of them are real replies to Searle.</p>'
      : `<p><strong>${o.reply}.</strong> ${o.claim}</p><p><strong>Searle:</strong> ${o.searle}</p>${o.ask ? `<p class="ms-note">${o.ask}</p>` : ''}`;
  }
}

customElements.define('phil-eliza', PhilEliza);
customElements.define('phil-room', PhilRoom);
customElements.define('phil-where', PhilWhere);
