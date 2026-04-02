// ── Nav scroll state ──
const navWrap = document.querySelector('.nav-wrap');
window.addEventListener('scroll', () => {
  navWrap?.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// ── Mobile menu toggle ──
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu.dataset.open === 'true';
  mobileMenu.dataset.open = isOpen ? 'false' : 'true';
  hamburger.setAttribute('aria-expanded', !isOpen);
  mobileMenu.setAttribute('aria-hidden', isOpen);
});

// Close mobile menu when a link is clicked
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.dataset.open = 'false';
    hamburger?.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// ── Scroll appear animation ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.feature-item, .step, .merchant-cat, .stat, .faq-item').forEach((el, i) => {
  el.classList.add('appear');
  el.style.transitionDelay = `${i * 40}ms`;
  observer.observe(el);
});

// ── Demo form ──
document.querySelector('.js-demo-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const form = e.currentTarget;
  const success = form.querySelector('.js-form-success');
  const fields = form.querySelector('.demo-form > :not(.js-form-success)');

  form.querySelectorAll('input, select, button[type="submit"]').forEach(el => {
    el.disabled = true;
  });

  if (success) {
    success.hidden = false;
    success.focus();
  }
});
