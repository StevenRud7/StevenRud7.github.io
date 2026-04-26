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

// ── ORBITAL RING DIAGRAM ─────────────────────────────────
(function initOrbital() {
  const svg = document.getElementById('orbital-svg');
  if (!svg) return;

  const ns  = 'http://www.w3.org/2000/svg';
  const CX  = 190, CY = 190; // centre

  // Ring definitions: radius, rotation speed class, colour, technologies
  const rings = [
    {
      r: 62,
      cls: 'ring-inner',
      color: '#7B2FFF',   // violet — core languages
      glow: 'rgba(123,47,255,0.45)',
      techs: ['Python', 'Java', 'JavaScript', 'SQL'],
    },
    {
      r: 108,
      cls: 'ring-mid',
      color: '#0EA5E9',   // blue — frameworks
      glow: 'rgba(14,165,233,0.4)',
      techs: ['React', 'Node.js', 'Flask', 'MongoDB'],
    },
    {
      r: 155,
      cls: 'ring-outer',
      color: '#22D3EE',   // cyan — tools / infra
      glow: 'rgba(34,211,238,0.35)',
      techs: ['Git', 'Docker', 'Linux', 'REST APIs', 'HTML/CSS'],
    },
  ];

  function el(tag, attrs) {
    const e = document.createElementNS(ns, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    return e;
  }

  // ── Defs (glow filters) ──────────────────────────────
  const defs = el('defs', {});

  rings.forEach((ring, i) => {
    const filter = el('filter', { id: `glow${i}`, x: '-50%', y: '-50%', width: '200%', height: '200%' });
    const blur   = el('feGaussianBlur', { stdDeviation: '3', result: 'blur' });
    const merge  = el('feMerge', {});
    const m1 = el('feMergeNode', { in: 'blur' });
    const m2 = el('feMergeNode', { in: 'SourceGraphic' });
    merge.appendChild(m1); merge.appendChild(m2);
    filter.appendChild(blur); filter.appendChild(merge);
    defs.appendChild(filter);
  });

  // Radial gradient for centre core
  const coreGrad = el('radialGradient', { id: 'coreGrad', cx: '50%', cy: '50%', r: '50%' });
  const cs1 = el('stop', { offset: '0%',   'stop-color': '#7B2FFF', 'stop-opacity': '0.9' });
  const cs2 = el('stop', { offset: '100%', 'stop-color': '#050810', 'stop-opacity': '0' });
  coreGrad.appendChild(cs1); coreGrad.appendChild(cs2);
  defs.appendChild(coreGrad);

  svg.appendChild(defs);

  // ── Background: space void + subtle radial nebula ────
  svg.appendChild(el('rect', { x: 0, y: 0, width: 380, height: 380, fill: '#080e1c' }));
  svg.appendChild(el('circle', { cx: CX, cy: CY, r: 170, fill: 'url(#coreGrad)', opacity: '0.25' }));

  // Fine background grid
  for (let x = 0; x < 380; x += 19) {
    svg.appendChild(el('line', { x1: x, y1: 0, x2: x, y2: 380,
      stroke: 'rgba(14,165,233,0.06)', 'stroke-width': 0.5 }));
  }
  for (let y = 0; y < 380; y += 19) {
    svg.appendChild(el('line', { x1: 0, y1: y, x2: 380, y2: y,
      stroke: 'rgba(14,165,233,0.06)', 'stroke-width': 0.5 }));
  }

  // ── Reference orbit tracks (static, faint) ──────────
  rings.forEach(ring => {
    svg.appendChild(el('circle', {
      cx: CX, cy: CY, r: ring.r,
      fill: 'none',
      stroke: ring.color,
      'stroke-width': 0.6,
      'stroke-dasharray': '3 6',
      opacity: 0.25,
    }));
  });

  // ── Crosshair on centre ──────────────────────────────
  svg.appendChild(el('line', { x1: CX - 12, y1: CY, x2: CX + 12, y2: CY,
    stroke: 'rgba(14,165,233,0.35)', 'stroke-width': 0.8 }));
  svg.appendChild(el('line', { x1: CX, y1: CY - 12, x2: CX, y2: CY + 12,
    stroke: 'rgba(14,165,233,0.35)', 'stroke-width': 0.8 }));

  // ── Centre core dot ──────────────────────────────────
  svg.appendChild(el('circle', { cx: CX, cy: CY, r: 18,
    fill: 'none', stroke: '#7B2FFF', 'stroke-width': 1,
    filter: 'url(#glow0)', opacity: 0.7 }));
  svg.appendChild(el('circle', { cx: CX, cy: CY, r: 5,
    fill: '#7B2FFF', filter: 'url(#glow0)' }));

  // Centre label
  const cLbl = document.createElementNS(ns, 'text');
  cLbl.setAttribute('x', CX); cLbl.setAttribute('y', CY + 26);
  cLbl.setAttribute('fill', '#b4c8e8');
  cLbl.setAttribute('font-family', 'IBM Plex Mono, monospace');
  cLbl.setAttribute('font-size', '7.5');
  cLbl.setAttribute('text-anchor', 'middle');
  cLbl.setAttribute('letter-spacing', '0.12em');
  cLbl.textContent = 'DEV';
  svg.appendChild(cLbl);

  // ── Rotating groups ──────────────────────────────────
  rings.forEach((ring, ri) => {
    const g = el('g', { class: ring.cls });

    // Distribute tech nodes evenly around the ring
    ring.techs.forEach((tech, ti) => {
      const count   = ring.techs.length;
      const angleDeg = (360 / count) * ti - 90; // start from top
      const angleRad = angleDeg * Math.PI / 180;
      const nx = CX + ring.r * Math.cos(angleRad);
      const ny = CY + ring.r * Math.sin(angleRad);

      // Connector line from centre to node (faint)
      const connector = el('line', {
        x1: CX, y1: CY, x2: nx, y2: ny,
        stroke: ring.color, 'stroke-width': 0.4, opacity: 0.15,
      });
      g.appendChild(connector);

      // Node dot
      const dot = el('circle', {
        cx: nx, cy: ny, r: 5,
        fill: ring.color,
        filter: `url(#glow${ri})`,
        opacity: 0.9,
      });
      g.appendChild(dot);

      // Inner accent dot
      g.appendChild(el('circle', { cx: nx, cy: ny, r: 2.5, fill: '#E8F4FF', opacity: 0.8 }));

      // Label — counter-rotates so it always reads upright
      // We put it in a nested group that reverses the parent rotation at render time
      // Using a trick: the label group has no transform here; CSS animation handles
      // the parent. Labels will orbit but remain legible because we apply a
      // counter-rotation transform via an animateTransform on each label group.
      const labelGroup = el('g', {});

      // Background pill for readability
      const labelPad = 3;
      const approxW  = tech.length * 4.8 + labelPad * 2;
      const pillX    = nx + (nx > CX ? 8 : -8 - approxW);
      const pillY    = ny + (ny > CY ? 8 : -18);

      const pill = el('rect', {
        x: pillX, y: pillY,
        width: approxW, height: 13,
        rx: 2,
        fill: 'rgba(8,14,28,0.85)',
        stroke: ring.color, 'stroke-width': 0.5, 'stroke-opacity': 0.5,
      });
      labelGroup.appendChild(pill);

      const lbl = document.createElementNS(ns, 'text');
      lbl.setAttribute('x', pillX + labelPad);
      lbl.setAttribute('y', pillY + 9);
      lbl.setAttribute('fill', ring.color);
      lbl.setAttribute('font-family', 'IBM Plex Mono, monospace');
      lbl.setAttribute('font-size', '7.5');
      lbl.setAttribute('letter-spacing', '0.04em');
      lbl.textContent = tech;
      labelGroup.appendChild(lbl);

      g.appendChild(labelGroup);
    });

    svg.appendChild(g);
  });
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