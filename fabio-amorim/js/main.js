/* =========================================================
   CONFIGURAÇÃO: troque aqui os contatos do Fábio
   ========================================================= */
const CONFIG = {
  // Somente números: 55 + DDD + número. Ex.: 5567999998888
  whatsapp: '5567999475445',
  instagram: 'https://instagram.com/SEU_USUARIO',
};

/* ---------- Links de WhatsApp com mensagem pronta ---------- */
document.querySelectorAll('[data-wa]').forEach((el) => {
  const msg = encodeURIComponent(el.dataset.wa || '');
  el.href = `https://wa.me/${CONFIG.whatsapp}${msg ? `?text=${msg}` : ''}`;
  el.target = '_blank';
  el.rel = 'noopener';
});

document.querySelectorAll('[data-instagram]').forEach((el) => {
  el.href = CONFIG.instagram;
  el.target = '_blank';
  el.rel = 'noopener';
});

/* ---------- Ano no rodapé ---------- */
const ano = document.getElementById('ano');
if (ano) ano.textContent = new Date().getFullYear();

/* ---------- Header ao rolar ---------- */
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Menu mobile ---------- */
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('menu');

const setMenu = (open) => {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
};

toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('is-open')) {
    setMenu(false);
    toggle.focus();
  }
});
window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && setMenu(false));

/* ---------- Animação de entrada ---------- */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el, i) => {
    // pequeno escalonamento entre itens irmãos
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
    el.style.transitionDelay = `${siblings.indexOf(el) * 60}ms`;
    io.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}
