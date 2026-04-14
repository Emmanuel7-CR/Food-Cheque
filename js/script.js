/* ============================================================
   FOOD CHEQUE — Shared JavaScript
   ============================================================ */

'use strict';

// ── Toast System ──────────────────────────────────────────────
const Toast = (() => {
  let container = null;

  const getContainer = () => {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  };

  const show = (message, type = 'success', duration = 3000) => {
    const c = getContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span class="toast-icon"></span>${message}`;
    c.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hiding');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, duration);
  };

  return { show, success: (m) => show(m, 'success'), info: (m) => show(m, 'info'), error: (m) => show(m, 'error') };
})();

// ── Scroll Reveal ──────────────────────────────────────────────
const initReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
};

// ── Navbar Scroll Behaviour ────────────────────────────────────
const initNavbar = () => {
  const navbar = document.querySelector('.navbar-fc');
  if (!navbar) return;

  const update = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });

  // Mobile toggle
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
};

// ── Smooth Anchor Scroll ───────────────────────────────────────
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};

// ── PWA Install Prompt ─────────────────────────────────────────
const initPWA = () => {
  let deferredPrompt = null;
  const banner = document.getElementById('installBanner');
  const installBtn = document.getElementById('installBtn');
  const dismissBtn = document.getElementById('dismissInstall');

  if (!banner) return;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    setTimeout(() => banner.classList.add('visible'), 3000);
  });

  installBtn?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') Toast.success('App installed successfully!');
    deferredPrompt = null;
    banner.classList.remove('visible');
  });

  dismissBtn?.addEventListener('click', () => {
    banner.classList.remove('visible');
  });

  // iOS hint
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (isIOS && !isStandalone) {
    setTimeout(() => banner.classList.add('visible'), 4000);
    if (installBtn) {
      installBtn.textContent = 'Add to Home';
      installBtn.addEventListener('click', () => {
        Toast.info('Tap Share → "Add to Home Screen" in Safari');
        banner.classList.remove('visible');
      });
    }
  }
};

// ── Number Format ─────────────────────────────────────────────
const formatNaira = (amount) =>
  '₦' + Number(amount).toLocaleString('en-NG');

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initReveal();
  initSmoothScroll();
  initPWA();

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  }
});

// ── Export globals ─────────────────────────────────────────────
window.FC = { Toast, formatNaira };