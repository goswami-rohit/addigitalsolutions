/* ============================================================
   AD Digitall Solutions — interactions
   ============================================================ */

/* ---------- Mobile nav ---------- */
(function () {
  const burger = document.querySelector('.burger');
  const links = document.querySelector('nav.links');
  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open')));
  }
})();

/* ---------- Scroll reveal ---------- */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
  // safety: if anything is still hidden after 3s (e.g. observer edge cases), reveal it
  setTimeout(() => els.forEach(e => e.classList.add('in')), 3000);
})();

/* ---------- Animated network mesh (hero canvas) ---------- */
(function () {
  const canvas = document.getElementById('net-canvas');
  if (!canvas) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  let w, h, dpr, nodes = [], raf, mouse = { x: -999, y: -999 };

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function build() {
    const count = Math.max(18, Math.floor((w * h) / 13000));
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 1.1,
        hub: Math.random() > 0.82
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    // links
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 118) {
          const op = (1 - dist / 118) * 0.45;
          ctx.strokeStyle = `rgba(34,211,238,${op})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      // link to mouse
      const mdx = a.x - mouse.x, mdy = a.y - mouse.y;
      const md = Math.hypot(mdx, mdy);
      if (md < 150) {
        ctx.strokeStyle = `rgba(139,92,246,${(1 - md / 150) * 0.6})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    // nodes
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      if (n.hub) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        g.addColorStop(0, 'rgba(59,130,246,0.95)');
        g.addColorStop(1, 'rgba(59,130,246,0)');
        ctx.fillStyle = g;
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      }
      ctx.fillStyle = n.hub ? '#7dd3fc' : 'rgba(180,210,240,0.85)';
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  window.addEventListener('resize', size);
  size();
  if (!reduce) draw();
  else { draw(); cancelAnimationFrame(raf); } // single static frame
})();

/* ---------- Animated count-up for stats ---------- */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = target + suffix; return; }
    let cur = 0; const dur = 1200; const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((en) => {
    en.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  els.forEach(e => io.observe(e));
})();

/* ---------- Contact form (no backend; mailto fallback) ---------- */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = encodeURIComponent(data.get('name') || '');
    const email = encodeURIComponent(data.get('email') || '');
    const service = encodeURIComponent(data.get('service') || '');
    const msg = encodeURIComponent(data.get('message') || '');
    const body = `Name: ${decodeURIComponent(name)}%0D%0AEmail: ${decodeURIComponent(email)}%0D%0AService: ${decodeURIComponent(service)}%0D%0A%0D%0A${decodeURIComponent(msg)}`;
    window.location.href = `mailto:umarsaif@addigitalsolutions.in?subject=Enquiry from ${name}&body=${body}`;
    const note = document.getElementById('form-note');
    if (note) { note.textContent = 'Opening your email app…'; note.style.color = 'var(--cyan)'; }
  });
})();
