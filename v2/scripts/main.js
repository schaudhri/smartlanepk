// ── Nav scroll state ──
const navWrap = document.querySelector('.nav-wrap');
if (navWrap) {
  const navSentinel = document.createElement('div');
  navSentinel.setAttribute('aria-hidden', 'true');
  navSentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none;';
  document.body.prepend(navSentinel);
  new IntersectionObserver(([entry]) => {
    navWrap.classList.toggle('scrolled', !entry.isIntersecting);
  }).observe(navSentinel);
}

// ── Track order modal ──
const trackModal = document.getElementById('track-modal');

function openTrackModal() {
  if (!trackModal) return;
  trackModal.hidden = false;
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    trackModal.querySelector('.track-modal-input')?.focus();
  });
}

function closeTrackModal() {
  if (!trackModal) return;
  trackModal.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('.js-track-modal-open').forEach(el => {
  el.addEventListener('click', openTrackModal);
});
document.querySelectorAll('.js-track-modal-close').forEach(el => {
  el.addEventListener('click', closeTrackModal);
});
trackModal?.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeTrackModal();
});

// ── Mega menu ──
document.querySelectorAll('[data-mega]').forEach(wrap => {
  const btn = wrap.querySelector('.nav-mega-btn');
  const menu = wrap.querySelector('.mega-menu');
  if (!btn || !menu) return;

  function openMega() {
    btn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => {
      const first = menu.querySelector('a, button');
      first?.focus();
    });
  }
  function closeMega() {
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  }

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('[data-mega]').forEach(w => {
      if (w !== wrap) {
        w.querySelector('.nav-mega-btn')?.setAttribute('aria-expanded', 'false');
        w.querySelector('.mega-menu')?.setAttribute('aria-hidden', 'true');
      }
    });
    isOpen ? closeMega() : openMega();
  });

  wrap.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeMega(); btn.focus(); }
    if (e.key === 'Tab' && btn.getAttribute('aria-expanded') === 'true') {
      const focusable = menu.querySelectorAll('a, button');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); closeMega(); btn.focus();
      }
    }
  });
});

// ── Track dropdown ──
document.querySelectorAll('[data-track]').forEach(wrap => {
  const btn = wrap.querySelector('.nav-track-btn');
  const dropdown = wrap.querySelector('.track-dropdown');
  if (!btn || !dropdown) return;

  function openTrack() {
    btn.setAttribute('aria-expanded', 'true');
    dropdown.setAttribute('aria-hidden', 'false');
    wrap.classList.add('is-open');
    requestAnimationFrame(() => {
      dropdown.querySelector('input')?.focus();
    });
  }
  function closeTrack() {
    btn.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');
    wrap.classList.remove('is-open');
  }

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    isOpen ? closeTrack() : openTrack();
  });

  wrap.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeTrack();
      btn.focus();
    }
  });
});

// ── Click outside to close all dropdowns ──
document.addEventListener('click', e => {
  document.querySelectorAll('[data-mega]').forEach(wrap => {
    if (!wrap.contains(e.target)) {
      wrap.querySelector('.nav-mega-btn')?.setAttribute('aria-expanded', 'false');
      wrap.querySelector('.mega-menu')?.setAttribute('aria-hidden', 'true');
    }
  });
  document.querySelectorAll('[data-track]').forEach(wrap => {
    if (!wrap.contains(e.target)) {
      wrap.querySelector('.nav-track-btn')?.setAttribute('aria-expanded', 'false');
      wrap.querySelector('.track-dropdown')?.setAttribute('aria-hidden', 'true');
      wrap.classList.remove('is-open');
    }
  });
});

// ── Mobile menu toggle ──
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

function setMobileMenuOpen(open) {
  if (!mobileMenu || !hamburger) return;
  mobileMenu.dataset.open = open ? 'true' : 'false';
  hamburger.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('nav-open', open);
}

hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu?.dataset.open === 'true';
  setMobileMenuOpen(!isOpen);
});

document.querySelector('.mobile-menu-close')?.addEventListener('click', () => {
  setMobileMenuOpen(false);
});

document.querySelectorAll('.mobile-sub-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const sub = btn.nextElementSibling;
    const isOpen = sub?.dataset.open === 'true';
    if (sub) sub.dataset.open = isOpen ? 'false' : 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMobileMenuOpen(false));
});

// ── Scroll appear animation ──
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  document.querySelectorAll('.feature-item, .step, .merchant-cat, .stat, .faq-item').forEach(el => {
    el.classList.add('appear', 'visible');
  });
} else {
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
}

// ── Demo form ──
function formLiveRegion(form) {
  return form.closest('.demo-form-wrap')?.querySelector('[data-form-live]')
    || form.closest('.demo-inner')?.querySelector('[data-form-live]');
}

document.querySelectorAll('.js-demo-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const live = formLiveRegion(form);
    if (!form.reportValidity()) {
      if (live) live.textContent = 'Please fix the highlighted fields and try again.';
      return;
    }

    const success = form.querySelector('.js-form-success');
    form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(el => {
      el.disabled = true;
    });

    if (live) live.textContent = 'Demo request submitted. Thank you.';
    if (success) {
      success.hidden = false;
      success.focus();
    }
  });
});

// ── Newsletter form ──
document.querySelectorAll('.js-newsletter-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const success = form.querySelector('.newsletter-success');
    if (!form.reportValidity()) return;
    form.querySelectorAll('input, button').forEach(el => { el.disabled = true; });
    if (success) {
      success.hidden = false;
      success.focus();
    }
  });
});

// ── Track page: ?id= param ──
const trackResultEl = document.querySelector('.js-track-result');
const trackErrorEl = document.querySelector('.js-track-error');
const trackPlaceholderEl = document.querySelector('.track-page-placeholder');

if (trackResultEl) {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('id');
  const trackId = raw != null ? raw.trim() : '';

  const MIN_LEN = 5;

  if (trackId.length > 0 && trackId.length < MIN_LEN) {
    trackResultEl.hidden = true;
    if (trackErrorEl) {
      trackErrorEl.hidden = false;
      const msg = trackErrorEl.querySelector('.js-track-error-msg');
      if (msg) {
        msg.textContent = 'That tracking ID looks too short. Use the full ID from your order confirmation (for example SL-4821).';
      }
    }
    trackPlaceholderEl?.setAttribute('hidden', '');
  } else if (trackId.length >= MIN_LEN) {
    document.querySelectorAll('.js-track-id-display').forEach(el => {
      el.textContent = trackId;
    });
    trackResultEl.hidden = false;
    if (trackErrorEl) trackErrorEl.hidden = true;
    trackPlaceholderEl?.remove();
  }
}

// ── Console greeting ──
console.log(
  '%cSmartLane',
  'font-size:20px;font-weight:700;color:#00559F;'
);
console.log(
  '%cOne dashboard for couriers, ops & COD.\nInterested in what we\'re building? careers → https://www.smartlane.pk/pages/careers.html',
  'font-size:12px;color:#4b5563;'
);
