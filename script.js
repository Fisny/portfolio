const root = document.documentElement;
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
navToggle?.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => document.body.classList.remove('nav-open'));
});

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (e) => {
  if (!glow) return;
  glow.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: 'forwards' });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = Number(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('is-visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - .5) * -5;
    const ry = ((x / rect.width) - .5) * 6;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('pointermove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * .12}px, ${y * .18}px)`;
  });
  btn.addEventListener('pointerleave', () => btn.style.transform = '');
});

const canvas = document.getElementById('noiseCanvas');
const ctx = canvas?.getContext('2d');
function resizeCanvas(){
  if (!canvas || !ctx) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function drawNoise(){
  if (!canvas || !ctx) return;
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const buffer = imageData.data;
  for (let i = 0; i < buffer.length; i += 4) {
    const value = Math.random() * 255;
    buffer[i] = value;
    buffer[i + 1] = value;
    buffer[i + 2] = value;
    buffer[i + 3] = 16;
  }
  ctx.putImageData(imageData, 0, 0);
}
resizeCanvas();
drawNoise();
window.addEventListener('resize', () => { resizeCanvas(); drawNoise(); });
setInterval(drawNoise, 900);
