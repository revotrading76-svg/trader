// ===== GLOSSARY FILTER =====
function filterGlossary(cat) {
  const items = document.querySelectorAll('.glos-item');
  const btns = document.querySelectorAll('.filter-btn');
  
  btns.forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  
  items.forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// ===== CHECKLIST =====
function toggleCheck(el) {
  el.classList.toggle('checked');
  const checked = document.querySelectorAll('.check-item.checked').length;
  const total = document.querySelectorAll('.check-item').length;
  if (checked === total) {
    setTimeout(() => {
      alert('✅ ¡Checklist completo! Tu trade está listo. Recuerda: disciplina ante todo.');
    }, 200);
  }
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.style.borderBottomColor = 'rgba(0,255,136,0.15)';
  } else {
    nav.style.borderBottomColor = 'rgba(26,46,26,1)';
  }
});

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--green)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ===== TICKER ANIMATION =====
const tickerData = [
  { symbol: 'BTC/USD', change: '+2.4%', bull: true },
  { symbol: 'ETH/USD', change: '-0.8%', bull: false },
  { symbol: 'EUR/USD', change: '+0.12%', bull: true },
  { symbol: 'GBP/JPY', change: '-0.3%', bull: false },
  { symbol: 'XAU/USD', change: '+0.6%', bull: true },
  { symbol: 'NAS100', change: '+1.1%', bull: true },
  { symbol: 'SP500', change: '+0.4%', bull: true },
];

let tickerIdx = 0;
const tickerEl = document.querySelector('.ticker-mini');

if (tickerEl) {
  setInterval(() => {
    tickerIdx = (tickerIdx + 1) % tickerData.length;
    const next = tickerData[(tickerIdx + 1) % tickerData.length];
    const cls = next.bull ? 'green' : 'red';
    const arrow = next.bull ? '▲' : '▼';
    const current = tickerData[tickerIdx];
    const cls2 = current.bull ? 'green' : 'red';
    const arrow2 = current.bull ? '▲' : '▼';

    tickerEl.innerHTML = `
      <span class="${cls2}">${current.symbol} ${arrow2} ${current.change}</span>
      &nbsp;·&nbsp;
      <span class="${cls}">${next.symbol} ${arrow} ${next.change}</span>
    `;
  }, 2500);
}

// ===== FADE IN ON SCROLL =====
const fadeEls = document.querySelectorAll('.intro-card, .pattern-card, .smc-card, .ob-card, .extra-item, .risk-card, .glos-item');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.07}s, transform 0.5s ease ${(i % 6) * 0.07}s`;
  fadeObserver.observe(el);
});

console.log('%cTraderPro Guide 📈', 'color:#00ff88;font-size:18px;font-weight:bold;font-family:monospace;');
console.log('%cDomina el mercado. Gestiona el riesgo. Ejecuta con disciplina.', 'color:#6a8a6a;font-family:monospace;');
