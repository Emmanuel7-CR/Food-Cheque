/* ============================================================
   FOOD CHEQUE — Shared JavaScript
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   CRITICAL: Capture beforeinstallprompt at the very top,
   BEFORE DOMContentLoaded — the browser fires it early and
   it will be missed if we only listen inside DOMContentLoaded.
   ───────────────────────────────────────────────────────────── */
let _deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  _deferredPrompt = e;
  // Notify any already-initialised UI
  document.dispatchEvent(new CustomEvent('fc:installable'));
});

window.addEventListener('appinstalled', () => {
  _deferredPrompt = null;
  document.dispatchEvent(new CustomEvent('fc:installed'));
});

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

  const show = (message, type = 'success', duration = 3200) => {
    const c     = getContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span class="toast-icon"></span>${message}`;
    c.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('hiding');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, duration);
  };

  return {
    show,
    success: (m) => show(m, 'success'),
    info:    (m) => show(m, 'info'),
    error:   (m) => show(m, 'error'),
  };
})();

// ── Number Format ─────────────────────────────────────────────
const formatNaira = (amount) =>
  '₦' + Number(amount).toLocaleString('en-NG');

// ── Scroll Reveal ──────────────────────────────────────────────
const initReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
};

// ── Navbar Scroll Behaviour ────────────────────────────────────
const initNavbar = () => {
  const navbar = document.querySelector('.navbar-fc');
  if (!navbar) return;
  const update = () => navbar.classList.toggle('scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });

  // Mobile toggle
  const toggle    = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('click', () => {
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
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
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
};

// ── PWA Install System ─────────────────────────────────────────
const initPWA = () => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
                    || window.navigator.standalone === true;

  // Already installed — hide everything, bail out
  if (isStandalone) return;

  const isIOS     = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isSafari  = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isDesktop = window.innerWidth >= 992;

  /* ── Build iOS instruction sheet ─────────────────────────── */
  const buildIOSSheet = () => {
    if (document.getElementById('iosSheet')) return;
    const sheet = document.createElement('div');
    sheet.id        = 'iosSheet';
    sheet.className = 'ios-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.setAttribute('aria-label', 'Add to Home Screen instructions');
    sheet.innerHTML = `
      <div class="ios-sheet-overlay" id="iosSheetOverlay"></div>
      <div class="ios-sheet-card">
        <div class="ios-sheet-header">
          <div class="ios-sheet-drag"></div>
          <div class="ios-app-row">
            <div class="ios-app-icon">🍽️</div>
            <div>
              <div class="ios-app-name">Food Cheque</div>
              <div class="ios-app-url">foodcheque.ng</div>
            </div>
          </div>
          <h3 class="ios-sheet-title">Install Food Cheque</h3>
          <p class="ios-sheet-sub">Order faster, reopen instantly, and use Food Cheque like a native app. — works like a native app, no App Store needed.</p>
        </div>
        <div class="ios-steps">
          <div class="ios-step">
            <div class="ios-step-num">1</div>
            <div class="ios-step-text">
              Tap the <strong>Share</strong> button
              <span class="ios-share-icon" aria-label="Share icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              </span>
              at the bottom of your Safari browser
            </div>
          </div>
          <div class="ios-step">
            <div class="ios-step-num">2</div>
            <div class="ios-step-text">Scroll down and tap <strong>"Add to Home Screen"</strong></div>
          </div>
          <div class="ios-step">
            <div class="ios-step-num">3</div>
            <div class="ios-step-text">Tap <strong>"Add"</strong> in the top-right corner</div>
          </div>
        </div>
        <button class="ios-sheet-close" id="iosSheetClose">Got it</button>
      </div>`;
    document.body.appendChild(sheet);

    // Close handlers
    const close = () => { sheet.classList.remove('open'); document.body.style.overflow = ''; };
    document.getElementById('iosSheetOverlay')?.addEventListener('click', close);
    document.getElementById('iosSheetClose')?.addEventListener('click', close);
  };

  /* ── Build desktop install button in navbar ──────────────── */
  const buildDesktopBtn = () => {
    if (document.getElementById('navInstallBtn')) return;
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    const btn = document.createElement('button');
    btn.id        = 'navInstallBtn';
    btn.className = 'nav-install-btn';
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Install App`;
    btn.setAttribute('aria-label', 'Install Food Cheque app');
    // Insert before the last nav-cta link
    const cta = navLinks.querySelector('.nav-cta');
    if (cta) navLinks.insertBefore(btn, cta);
    else navLinks.appendChild(btn);

    btn.addEventListener('click', triggerInstall);
    return btn;
  };

  /* ── Build mobile bottom banner ──────────────────────────── */
  const banner     = document.getElementById('installBanner');
  const installBtn = document.getElementById('installBtn');
  const dismissBtn = document.getElementById('dismissInstall');

  const showBanner = () => { banner?.classList.add('visible'); };

  document.addEventListener('fc:showInstallBanner', () => {
  const isInstalled =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  if (isInstalled) return;

  showBanner();
});
  const hideBanner = () => { banner?.classList.remove('visible'); };

  /* ── Trigger native install prompt ──────────────────────── */
  const triggerInstall = async () => {
    if (!_deferredPrompt) return;
    try {
      _deferredPrompt.prompt();
      const { outcome } = await _deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        Toast.success('Food Cheque installed! 🎉');
        hideBanner();
        document.getElementById('navInstallBtn')?.remove();
      }
      _deferredPrompt = null;
    } catch (err) {
      console.warn('[PWA] Install prompt failed:', err);
    }
  };

  /* ── iOS flow ─────────────────────────────────────────────
     iOS Safari does NOT support beforeinstallprompt.
     We show the instruction sheet instead.
  ─────────────────────────────────────────────────────────── */
  if (isIOS && isSafari) {
    buildIOSSheet();

    // Update banner button text & behaviour
    if (installBtn) {
      installBtn.textContent = 'Add App';
      installBtn.addEventListener('click', () => {
        document.getElementById('iosSheet')?.classList.add('open');
        document.body.style.overflow = 'hidden';
        hideBanner();
      });
    }

    // Show banner after 3 s on iOS
    setTimeout(showBanner, 3000);

    // Add a mobile-nav button too
    const mobileNav = document.querySelector('.nav-mobile');
    if (mobileNav) {
      const iosBtn = document.createElement('button');
      iosBtn.className   = 'nav-mobile-install-btn';
      iosBtn.textContent = '📲 Add to Home Screen';
      iosBtn.addEventListener('click', () => {
        buildIOSSheet();
        document.getElementById('iosSheet')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
      mobileNav.appendChild(iosBtn);
    }
    return;
  }

  /* ── Android / Desktop: beforeinstallprompt flow ─────────── */

  const onInstallable = () => {
    if (isDesktop) {
      buildDesktopBtn();
    } else {
      // Mobile: show bottom banner after short delay
      setTimeout(showBanner, 2500);
    }
  };

  // _deferredPrompt may already be set (event fired before DOMContentLoaded)
  if (_deferredPrompt) {
    onInstallable();
  } else {
    // Wait for it
    document.addEventListener('fc:installable', onInstallable, { once: true });
  }

  // Banner buttons
  installBtn?.addEventListener('click', triggerInstall);
  dismissBtn?.addEventListener('click', () => {
    hideBanner();
    sessionStorage.setItem('fc_install_dismissed', '1');
  });

  // After install: remove all install UI
  document.addEventListener('fc:installed', () => {
    hideBanner();
    document.getElementById('navInstallBtn')?.remove();
  });
};

// ── Service Worker ─────────────────────────────────────────────
const registerSW = () => {
  if (!('serviceWorker' in navigator)) return;
  // Use relative path — works at any hosting sub-path
  const swPath = new URL('service-worker.js', window.location.href).pathname;
  navigator.serviceWorker.register(swPath, { scope: './' })
    .then(() => console.log('[FC] Service Worker registered'))
    .catch((err) => console.warn('[FC] SW registration failed:', err));
};

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initReveal();
  initSmoothScroll();
  initPWA();
  registerSW();
});

// ── Export globals ─────────────────────────────────────────────
window.FC = { Toast, formatNaira };