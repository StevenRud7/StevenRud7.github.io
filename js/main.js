/* ================================================================
   PORTFOLIO v5 — "ULTRAVIOLET" · main.js
   70s Scientific Poster & NASA Visualization Aesthetic
   ================================================================ */

'use strict';

// ── CUSTOM CURSOR ────────────────────────────────────────────
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function tick() {
    rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(tick);
  })();
  document.addEventListener('mouseleave', () => {
    [dot, ring].forEach(e => e && (e.style.opacity = '0'));
  });
  document.addEventListener('mouseenter', () => {
    [dot, ring].forEach(e => e && (e.style.opacity = '1'));
  });
})();

// ── STAR FIELD ───────────────────────────────────────────────
(function initStars() {
  const container = document.querySelector('.hero-stars');
  if (!container) return;
  const COUNT = 160;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < COUNT; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() < 0.85 ? Math.random() * 1.5 + 0.5 : Math.random() * 2.5 + 1.5;
    const maxOp = Math.random() * 0.5 + 0.2;
    Object.assign(s.style, {
      left:    Math.random() * 100 + '%',
      top:     Math.random() * 100 + '%',
      width:   size + 'px',
      height:  size + 'px',
      '--dur':    (Math.random() * 4 + 2) + 's',
      '--delay':  (Math.random() * 5) + 's',
      '--max-op': maxOp,
    });
    // Occasional coloured stars
    const r = Math.random();
    if (r < 0.06)      s.style.background = '#7B2FFF';
    else if (r < 0.12) s.style.background = '#0EA5E9';
    else if (r < 0.15) s.style.background = '#FF6B1A';
    frag.appendChild(s);
  }
  container.appendChild(frag);
})();

// ── TYPING CODE BLOCK ────────────────────────────────────────
(function initTypingCode() {
  const body   = document.getElementById('code-body');
  const cursor = document.getElementById('code-cursor');
  if (!body || !cursor) return;

  // The full code to type out, as an array of {html, pause} segments.
  // html is inserted directly (pre-coloured spans).
  // pause is ms to wait after inserting this segment before continuing.
  const C = {
    kw:   s => `<span class="t-kw">${s}</span>`,
    cls:  s => `<span class="t-cls">${s}</span>`,
    key:  s => `<span class="t-key">${s}</span>`,
    str:  s => `<span class="t-str">${s}</span>`,
    num:  s => `<span class="t-num">${s}</span>`,
    bool: s => `<span class="t-bool">${s}</span>`,
    cmt:  s => `<span class="t-cmt">${s}</span>`,
    p:    s => `<span class="t-punc">${s}</span>`,
    nm:   s => `<span class="t-name">${s}</span>`,
  };

  // Each entry: [html string to append, delay BEFORE this token in ms]
  const tokens = [
    // Line 1: comment
    [C.cmt('# developer.py'), 0],
    ['\n', 20],

    // Line 2: blank
    ['\n', 60],

    // Line 3: @dataclass
    [C.kw('@dataclass'), 40],
    ['\n', 30],

    // Line 4: class Developer
    [C.kw('class ') + C.cls('Developer') + C.p(':'), 30],
    ['\n', 30],

    // Field: name
    ['    ' + C.key('name') + C.p(': ') + C.nm('str') + ' = ' + C.str('"Steven Rud"'), 60],
    ['\n', 20],

    // Field: degree
    ['    ' + C.key('degree') + C.p(': ') + C.nm('str') + ' = ' + C.str('"B.S. Computer Science"'), 50],
    ['\n', 20],

    // Field: university
    ['    ' + C.key('university') + C.p(': ') + C.nm('str') + ' = ' + C.str('"Brandeis University"'), 50],
    ['\n', 20],

    // Field: status
    ['    ' + C.key('status') + C.p(': ') + C.nm('str') + ' = ' + C.str('"open to work"'), 50],
    ['\n', 20],

    // Blank line inside class
    ['\n', 40],

    // Field: languages list
    ['    ' + C.key('languages') + C.p(': ') + C.nm('list') + ' ' + C.p('= ['), 60],
    ['\n', 20],
    ['        ' + C.str('"Python"') + C.p(',') + ' ' + C.str('"Java"') + C.p(',') + ' ' + C.str('"JavaScript"') + C.p(',') + ' ' + C.str('"SQL"'), 40],
    ['\n', 20],
    ['    ' + C.p(']'), 30],
    ['\n', 20],

    // Field: frameworks
    ['    ' + C.key('frameworks') + C.p(': ') + C.nm('list') + ' ' + C.p('= ['), 60],
    ['\n', 20],
    ['        ' + C.str('"React"') + C.p(',') + ' ' + C.str('"Node.js"') + C.p(',') + ' ' + C.str('"Flask"'), 40],
    ['\n', 20],
    ['    ' + C.p(']'), 30],
    ['\n', 20],

    // Field: tools
    ['    ' + C.key('tools') + C.p(': ') + C.nm('list') + ' ' + C.p('= ['), 60],
    ['\n', 20],
    ['        ' + C.str('"Git"') + C.p(',') + ' ' + C.str('"Docker"') + C.p(',') + ' ' + C.str('"Azure"'), 40],
    ['\n', 20],
    ['    ' + C.p(']'), 30],
    ['\n', 20],

    // Blank line
    ['\n', 40],

    // Method: introduce
    ['    ' + C.kw('def ') + C.nm('introduce') + C.p('(') + C.nm('self') + C.p(') -> ') + C.nm('str') + C.p(':'), 80],
    ['\n', 20],
    ['        ' + C.kw('return ') + C.p('('), 40],
    ['\n', 20],
    ['            ' + C.str('"CS Graduate. Developer. Open to work."'), 40],
    ['\n', 20],
    ['        ' + C.p(')'), 30],
    ['\n', 20],
  ];

  let idx = 0;
  let started = false;

  function typeNext() {
    if (idx >= tokens.length) {
      // Done — cursor keeps blinking, optionally restart after long pause
      setTimeout(() => {
        body.innerHTML = '';
        idx = 0;
        // Move cursor back inside body before restarting
        body.appendChild(cursor);
        setTimeout(typeNext, 600);
      }, 6000);
      return;
    }
    const [html, delay] = tokens[idx++];
    setTimeout(() => {
      // Insert before cursor
      const temp = document.createElement('span');
      temp.innerHTML = html;
      body.insertBefore(temp, cursor);
      typeNext();
    }, delay);
  }

  // Start typing when hero scrolls into view
  const hero = document.getElementById('hero');
  if (!hero) { typeNext(); return; }

  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      io.disconnect();
      setTimeout(typeNext, 700); // slight initial delay
    }
  }, { threshold: 0.3 });
  io.observe(hero);
})();

// ── SCROLL REVEAL ────────────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const d = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('visible'), d);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
})();

// ── SKILL BAR ANIMATION ──────────────────────────────────────
(function initSkillBars() {
  const rows = document.querySelectorAll('.skill-row');
  if (!rows.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      io.unobserve(e.target);
    });
  }, { threshold: 0.35 });
  rows.forEach(r => io.observe(r));
})();

// ── INSTRUMENT BAR ANIMATION ─────────────────────────────────
(function initInstBars() {
  const bars = document.querySelectorAll('.inst-bar');
  if (!bars.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      io.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  bars.forEach(b => io.observe(b));
})();

// ── ACTIVE NAV ───────────────────────────────────────────────
(function initActiveNav() {
  const links = document.querySelectorAll('.nav-links a');
  const sects = document.querySelectorAll('section[id]');
  if (!sects.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const l = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (l) l.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sects.forEach(s => io.observe(s));
})();

// ── SMOOTH SCROLL ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector('.nav')?.offsetHeight || 64;
    window.scrollTo({ top: target.offsetTop - navH - 8, behavior: 'smooth' });
  });
});

// ── COUNT-UP STATS ───────────────────────────────────────────
(function initCountUp() {
  const nums = document.querySelectorAll('.inst-readout[data-target]');
  if (!nums.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const dur    = 1400;
      const t0     = performance.now();
      (function step(now) {
        const p = Math.min((now - t0) / dur, 1);
        const v = 1 - Math.pow(1 - p, 3);
        el.innerHTML = Math.floor(v * target) + (suffix ? `<span>${suffix}</span>` : '');
        if (p < 1) requestAnimationFrame(step);
      })(t0);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  nums.forEach(n => io.observe(n));
})();

// ── CONTACT FORM ─────────────────────────────────────────────
(function initForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const get = n => form.querySelector(`[name="${n}"]`)?.value.trim() || '';
    const name    = get('name');
    const email   = get('email');
    const subject = get('subject');
    const message = get('message');

    if (!name || !email || !message) {
      setStatus('UPLINK FAILED — REQUIRED FIELDS MISSING', 'error'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('UPLINK FAILED — INVALID SIGNAL ADDRESS', 'error'); return;
    }

    const sub  = subject || `Portfolio contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:stevenrud77@gmail.com?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
    setStatus('SIGNAL TRANSMITTED — MAIL CLIENT OPENING', 'success');
    form.reset();
  });

  function setStatus(msg, type) {
    if (!status) return;
    status.textContent = msg;
    status.className   = 'form-status ' + type;
    setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
  }
})();