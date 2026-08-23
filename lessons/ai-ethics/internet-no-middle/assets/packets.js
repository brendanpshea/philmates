/* =====================================================================
   <phil-packet-router> — send a message across a mesh you can sabotage

   Three things happen in order, and the third is the point:

     1. SEND      one message leaves as four numbered packets, each
                  finding its own route, arriving out of order.
     2. CUT       click any link to sever it. Packets route around it.
     3. STOP IT   click any node to shut it down. The message still
                  arrives — until you shut down one of the two ends,
                  which is the only thing that works.

   The student discovers "no centre means no off switch" by failing to
   switch it off, which is a different kind of knowing than being told.

   Pathfinding is real: BFS over the live graph every time, so the
   widget cannot claim a route that the damage has actually destroyed.

   Teaching widget: ungraded, no completion hook, no persistence — same
   contract as <phil-cascade-engine> and <phil-wish-tester>.

   Type is sized to project: nothing below 15px.
   ===================================================================== */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const svgEl = (tag, attrs) => {
  const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
};

const STYLE = `
.pkt { display:block; margin:14px 0; padding:14px 16px; background:var(--panel-2);
       border:3px solid var(--border); box-shadow:0 5px 0 var(--shadow);
       font-size:17px; line-height:1.45; }
.pkt-prompt { margin:0 0 10px; font-size:17px; }
.pkt-stage { background:var(--panel); border:3px solid var(--border); padding:6px; }
.pkt-stage svg { display:block; width:100%; height:auto; }

.pkt-link { stroke:#4a5578; stroke-width:3; cursor:pointer; }
.pkt-link:hover { stroke:var(--accent-3); }
.pkt-link.cut { stroke:var(--bad); stroke-dasharray:6 6; }
.pkt-hit { stroke:transparent; stroke-width:14; cursor:pointer; }

.pkt-node { fill:var(--panel-2); stroke:#6b78a8; stroke-width:3; cursor:pointer; }
.pkt-node:hover { stroke:var(--accent-3); }
.pkt-node.down { fill:#2a1622; stroke:var(--bad); }
.pkt-node.end { fill:#1d3a2a; stroke:var(--accent); cursor:default; }
.pkt-node.end.down { fill:#2a1622; stroke:var(--bad); }

.pkt-dot { fill:var(--accent); }
.pkt-dot.b { fill:var(--accent-3); }
.pkt-dot.c { fill:var(--accent-2); }
.pkt-dot.d { fill:#ffd166; }

.pkt-bar { display:flex; flex-wrap:wrap; gap:8px; margin:12px 0 0; }
.pkt-btn { font-family:var(--pixel); font-size:9px; line-height:1.5; padding:9px 11px;
           background:var(--panel); color:var(--ink); border:3px solid var(--border);
           box-shadow:0 3px 0 var(--shadow); cursor:pointer; }
.pkt-btn:hover:not(:disabled) { background:#313a5e; }
.pkt-btn:disabled { opacity:.45; cursor:default; }
.pkt-btn.go { background:var(--accent-3); color:var(--bg); }

.pkt-status { margin:10px 0 0; font-size:16px; line-height:1.5; min-height:3.1em;
              border-left:6px solid var(--accent-3); padding:2px 0 2px 10px; }
.pkt-status.fail { border-left-color:var(--bad); }
.pkt-status.win  { border-left-color:var(--accent); }
.pkt-hint { margin:8px 0 0; font-size:15px; line-height:1.5; color:var(--muted); }
`;

/* An 8-node mesh with several genuinely distinct routes from A to H. */
const NODES = {
  A: { x:  30, y: 100, end: 'send' },
  B: { x: 105, y:  38 },
  C: { x: 105, y: 100 },
  F: { x: 105, y: 162 },
  D: { x: 190, y:  38 },
  E: { x: 190, y: 100 },
  G: { x: 190, y: 162 },
  H: { x: 270, y: 100, end: 'recv' }
};
const LINKS = [
  ['A','B'],['A','C'],['A','F'],
  ['B','C'],['B','D'],
  ['C','D'],['C','E'],['C','F'],
  ['F','E'],['F','G'],
  ['D','E'],['D','H'],
  ['E','G'],['E','H'],
  ['G','H']
];
const key = (a, b) => [a, b].sort().join('-');

class PhilPacketRouter extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;
    if (!document.getElementById('pkt-style')) {
      const s = el('style'); s.id = 'pkt-style'; s.textContent = STYLE; document.head.append(s);
    }
    this.classList.add('pkt');
    this.cut = new Set();
    this.down = new Set();
    this.sent = 0;
    this.build();
    this.say('Four packets, one message. Press <strong>Send</strong> and watch which way they go.');
  }

  /* ---- graph ---- */
  neighbours(n) {
    return LINKS
      .filter(([a, b]) => (a === n || b === n) && !this.cut.has(key(a, b)))
      .map(([a, b]) => (a === n ? b : a))
      .filter(m => !this.down.has(m));
  }

  /* Breadth-first search, avoiding `avoid` where it can, so the four
     packets spread out instead of stacking on one shortest path. */
  route(avoid) {
    if (this.down.has('A') || this.down.has('H')) return null;
    const seen = new Set(['A']);
    const q = [['A']];
    let fallback = null;
    while (q.length) {
      const path = q.shift();
      const last = path[path.length - 1];
      if (last === 'H') {
        if (!path.some(n => avoid.has(n) && n !== 'A' && n !== 'H')) return path;
        if (!fallback) fallback = path;
        continue;
      }
      for (const nb of this.neighbours(last)) {
        if (path.includes(nb)) continue;
        if (seen.has(nb) && nb !== 'H') continue;
        seen.add(nb);
        q.push(path.concat(nb));
      }
    }
    return fallback;
  }

  routes(n) {
    const out = [], used = new Set();
    for (let i = 0; i < n; i++) {
      const p = this.route(used);
      if (!p) break;
      p.forEach(x => { if (x !== 'A' && x !== 'H') used.add(x); });
      out.push(p);
    }
    return out;
  }

  /* ---- build ---- */
  build() {
    const prompt = this.getAttribute('prompt');
    this.innerHTML = '';
    if (prompt) this.append(el('p', 'pkt-prompt', prompt));

    const stage = el('div', 'pkt-stage');
    const svg = svgEl('svg', { viewBox: '0 0 300 200', role: 'img',
      'aria-label': 'A mesh of eight connected nodes with a sender on the left and a receiver on the right' });

    this._linkEls = {};
    LINKS.forEach(([a, b]) => {
      const at = { x1: NODES[a].x, y1: NODES[a].y, x2: NODES[b].x, y2: NODES[b].y };
      const line = svgEl('line', Object.assign({ class: 'pkt-link' }, at));
      const hit  = svgEl('line', Object.assign({ class: 'pkt-hit' }, at));
      hit.addEventListener('click', () => this.toggleLink(a, b));
      svg.append(line, hit);
      this._linkEls[key(a, b)] = line;
    });

    this._trail = svgEl('g', {});
    svg.append(this._trail);

    this._nodeEls = {};
    for (const n in NODES) {
      const d = NODES[n];
      const c = svgEl('circle', { cx: d.x, cy: d.y, r: d.end ? 13 : 9,
        class: 'pkt-node' + (d.end ? ' end' : '') });
      c.addEventListener('click', () => this.toggleNode(n));
      svg.append(c);
      this._nodeEls[n] = c;
    }

    this._dots = svgEl('g', {});
    svg.append(this._dots);
    stage.append(svg);
    this.append(stage);

    const bar = el('div', 'pkt-bar');
    this._send = el('button', 'pkt-btn go', 'Send the message');
    this._send.type = 'button';
    this._send.onclick = () => this.send();
    this._reset = el('button', 'pkt-btn', 'Repair everything');
    this._reset.type = 'button';
    this._reset.onclick = () => this.reset();
    bar.append(this._send, this._reset);
    this.append(bar);

    this._status = el('p', 'pkt-status', '');
    this.append(this._status);
    this.append(el('p', 'pkt-hint',
      'Click any <strong>line</strong> to cut it. Click any <strong>circle</strong> to shut that machine down. Then send again.'));
  }

  say(html, cls) {
    this._status.className = 'pkt-status' + (cls ? ' ' + cls : '');
    this._status.innerHTML = html;
  }

  toggleLink(a, b) {
    const k = key(a, b);
    this.cut.has(k) ? this.cut.delete(k) : this.cut.add(k);
    this._linkEls[k].classList.toggle('cut', this.cut.has(k));
    this.say(this.cut.size
      ? `<strong>${this.cut.size}</strong> link${this.cut.size > 1 ? 's' : ''} cut. Send again and see whether it matters.`
      : 'All links repaired. Send again.');
  }

  toggleNode(n) {
    this.down.has(n) ? this.down.delete(n) : this.down.add(n);
    this._nodeEls[n].classList.toggle('down', this.down.has(n));
    const ends = ['A', 'H'].filter(x => this.down.has(x));
    this.say(ends.length
      ? 'You have shut down one of the two ends. Send again.'
      : `<strong>${this.down.size}</strong> machine${this.down.size > 1 ? 's' : ''} down. Send again and see whether it matters.`);
  }

  reset() {
    this.cut.clear(); this.down.clear();
    for (const k in this._linkEls) this._linkEls[k].classList.remove('cut');
    for (const n in this._nodeEls) this._nodeEls[n].classList.remove('down');
    this._trail.innerHTML = ''; this._dots.innerHTML = '';
    this.say('Everything repaired. Send again.');
  }

  /* ---- animate ---- */
  send() {
    if (this._busy) return;
    const paths = this.routes(4);
    this._trail.innerHTML = ''; this._dots.innerHTML = '';

    if (!paths.length) {
      const why = this.down.has('A')
        ? 'The sending machine is switched off, so nothing was ever sent.'
        : this.down.has('H')
        ? 'The receiving machine is switched off. The packets went out and had nowhere to arrive.'
        : 'Every possible route is broken. You had to destroy the whole mesh to manage it.';
      this.say(`<strong>Message failed.</strong> ${why}`, 'fail');
      return;
    }

    this._busy = true;
    this._send.disabled = true;
    const cls = ['', 'b', 'c', 'd'];
    const dots = paths.map((p, i) => {
      const d = svgEl('rect', { width: 9, height: 9, rx: 1, class: 'pkt-dot ' + cls[i] });
      this._dots.append(d);
      return { d, p, t: 0, speed: 0.010 + i * 0.0016, done: false };
    });
    paths.forEach((p, i) => {
      for (let j = 0; j < p.length - 1; j++) {
        this._trail.append(svgEl('line', {
          x1: NODES[p[j]].x, y1: NODES[p[j]].y,
          x2: NODES[p[j + 1]].x, y2: NODES[p[j + 1]].y,
          stroke: ['#46e07a', '#4cc2ff', '#ff6ad5', '#ffd166'][i],
          'stroke-width': 2, opacity: 0.35
        }));
      }
    });

    const step = () => {
      let live = false;
      for (const k of dots) {
        if (k.done) continue;
        k.t += k.speed;
        const segs = k.p.length - 1;
        if (k.t >= segs) { k.t = segs; k.done = true; }
        else live = true;
        const i = Math.min(Math.floor(k.t), segs - 1);
        const f = k.t - i;
        const a = NODES[k.p[i]], b = NODES[k.p[i + 1]];
        k.d.setAttribute('x', a.x + (b.x - a.x) * f - 4.5);
        k.d.setAttribute('y', a.y + (b.y - a.y) * f - 4.5);
      }
      if (live) requestAnimationFrame(step);
      else this.arrived(paths);
    };
    requestAnimationFrame(step);
  }

  arrived(paths) {
    this._busy = false;
    this._send.disabled = false;
    this.sent++;
    const distinct = new Set(paths.map(p => p.join(''))).size;
    const damaged = this.cut.size || this.down.size;

    let msg;
    if (!damaged) {
      msg = `<strong>Message arrived.</strong> Four packets, ${distinct} different route${distinct > 1 ? 's' : ''}. ` +
            'Nothing decided in advance which way any of them would go, and they arrived out of order. ' +
            'Now try cutting a line.';
    } else if (this.down.size && !this.down.has('A') && !this.down.has('H')) {
      msg = `<strong>Message still arrived.</strong> You switched off ${this.down.size} machine` +
            `${this.down.size > 1 ? 's' : ''} and the packets went around. ` +
            'There is no machine in the middle whose loss stops the message, because there is no middle.';
    } else {
      msg = '<strong>Message still arrived.</strong> The packets found another way round the cut. ' +
            'Try shutting down whole machines instead.';
    }
    this.say(msg, 'win');
  }
}

customElements.define('phil-packet-router', PhilPacketRouter);
