/**
 * 炫酷动效：粒子背景 + 打字机 + 滚动渐入
 */

// ── 粒子背景 ──────────────────────────────────────────
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];
  const N = 60;
  const DIST = 120;

  function resize() {
    const hero = canvas.parentElement;
    w = canvas.width = hero.clientWidth;
    h = canvas.height = hero.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < N; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const dark = document.body.classList.contains('dark');
    const lineC = dark ? 'rgba(0,122,204,0.15)' : 'rgba(0,122,204,0.12)';
    const dotC  = dark ? 'rgba(0,122,204,0.5)'  : 'rgba(0,122,204,0.35)';

    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < DIST) {
          ctx.beginPath();
          ctx.strokeStyle = lineC;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = dotC;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

// ── 打字机 ────────────────────────────────────────────
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Stay hungry, stay foolish.',
    '探索 · 创作 · 记录',
    '候鸟该不该停留',
  ];

  let pi = 0, ci = 0, del = false;
  const TS = 50, DS = 30, PAUSE = 2000;

  function tick() {
    const cur = phrases[pi];
    el.textContent = cur.slice(0, del ? ci - 1 : ci + 1);
    del ? ci-- : ci++;

    if (!del && ci === cur.length) {
      return setTimeout(() => { del = true; tick(); }, PAUSE);
    }
    if (del && ci === 0) {
      del = false;
      pi = (pi + 1) % phrases.length;
      return setTimeout(tick, 300);
    }
    setTimeout(tick, del ? DS : TS);
  }
  setTimeout(tick, 500);
})();

// ── 滚动渐入 ──────────────────────────────────────────
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  new MutationObserver(() => {
    document.querySelectorAll('.reveal:not(.show)').forEach(el => obs.observe(el));
  }).observe(document.body, { childList: true, subtree: true });
})();

// ── 滚动箭头 ──────────────────────────────────────────
(function () {
  const arrow = document.getElementById('scrollArrow');
  const posts = document.getElementById('posts');
  if (!arrow || !posts) return;

  // 点击箭头平滑滚动到文章区
  arrow.addEventListener('click', () => {
    posts.scrollIntoView({ behavior: 'smooth' });
  });

  // 滚动后隐藏箭头
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      arrow.classList.add('hidden');
    } else {
      arrow.classList.remove('hidden');
    }
  });

  // 锚点定位：URL 带 #posts 直接跳到内容区
  if (window.location.hash === '#posts') {
    requestAnimationFrame(() => {
      posts.scrollIntoView();
      arrow.classList.add('hidden');
    });
  }
})();
