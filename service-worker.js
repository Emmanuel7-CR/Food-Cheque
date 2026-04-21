/* ============================================================
   FOOD CHEQUE — Service Worker
   Strategy: Cache-First for assets, Network-First for pages
   ============================================================ */

'use strict';

const CACHE_NAME    = 'foodcheque-v1.0.0';
const STATIC_CACHE  = 'foodcheque-static-v1.0.0';
const DYNAMIC_CACHE = 'foodcheque-dynamic-v1.0.0';

// ── Assets to precache immediately ────────────────────────────
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/menu.html',
  '/styles.css',
  '/script.js',
  '/menu.js',
  '/manifest.json',
  '/favicon/web-app-manifest-192x192.png',
  '/favicon/web-app-manifest-512x512.png',
  // Bootstrap (CDN — will be cached on first visit)
];

// ── Offline fallback page ─────────────────────────────────────
const OFFLINE_PAGE = '/index.html';

// ── CDN origins to cache ──────────────────────────────────────
const CDN_ORIGINS = [
  'cdn.jsdelivr.net',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];

// ── Install: precache static assets ──────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Install — Food Cheque v1.0.0');
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Precaching static assets');
        return cache.addAll(PRECACHE_ASSETS.map((url) => new Request(url, { cache: 'reload' })));
      })
      .then(() => self.skipWaiting())
      .catch((err) => console.warn('[SW] Precache failed:', err))
  );
});

// ── Activate: clean old caches ────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => !currentCaches.includes(name))
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── Fetch: routing strategy ───────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET & browser-extension requests
  if (request.method !== 'GET') return;
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return;
  if (url.href.startsWith('chrome-extension://')) return;

  // ── Strategy 1: CDN assets → Cache First ───────────────────
  if (CDN_ORIGINS.some((origin) => url.hostname.includes(origin))) {
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
    return;
  }

  // ── Strategy 2: Unsplash images → Cache First (long-lived) ──
  if (url.hostname.includes('unsplash.com') || url.hostname.includes('images.unsplash.com')) {
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
    return;
  }

  // ── Strategy 3: HTML pages → Network First with offline fallback
  if (request.destination === 'document' || request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(networkFirstWithFallback(request));
    return;
  }

  // ── Strategy 4: Local CSS / JS → Stale-While-Revalidate ─────
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // ── Strategy 5: Everything else → Network First ─────────────
  event.respondWith(networkFirst(request));
});

// ─── Cache Strategies ────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const network = await fetch(request);
    if (network.ok) cache.put(request, network.clone());
    return network;
  } catch {
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

async function networkFirst(request) {
  try {
    const network = await fetch(request);
    if (network.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, network.clone());
    }
    return network;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

async function networkFirstWithFallback(request) {
  try {
    const network = await fetch(request);
    if (network.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, network.clone());
    }
    return network;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Return offline fallback page
    const fallback = await caches.match(OFFLINE_PAGE);
    return fallback || new Response(offlineHTML(), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkFetch = fetch(request).then((network) => {
    if (network.ok) cache.put(request, network.clone());
    return network;
  }).catch(() => cached);

  return cached || networkFetch;
}

// ── Offline Fallback HTML ─────────────────────────────────────
function offlineHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Offline — Food Cheque</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, sans-serif;
      background: #FFFBF4;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      padding: 2rem;
    }
    .icon { font-size: 4rem; margin-bottom: 1.5rem; }
    h1 { font-size: 1.75rem; color: #1A0E02; margin-bottom: 0.75rem; }
    p { color: #9B7050; font-size: 0.95rem; line-height: 1.7; max-width: 340px; margin: 0 auto 2rem; }
    a {
      display: inline-block;
      background: #C85A0A;
      color: white;
      padding: 0.85rem 2rem;
      border-radius: 100px;
      font-weight: 600;
      text-decoration: none;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div>
    <div class="icon">🌐</div>
    <h1>You're Offline</h1>
    <p>It looks like you've lost your internet connection. Please check your network and try again.</p>
    <a href="/" onclick="window.location.reload();return false;">Try Again</a>
  </div>
</body>
</html>`;
}

// ── Background Sync (future-ready) ───────────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders') {
    console.log('[SW] Background sync: orders');
  }
});

// ── Push Notifications (future-ready) ────────────────────────
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const options = {
    body: data.body || 'Your Food Cheque order update!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
    actions: [
      { action: 'view', title: 'View Order' },
      { action: 'close', title: 'Dismiss' },
    ],
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'Food Cheque 🍽️', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'view') {
    event.waitUntil(clients.openWindow(event.notification.data.url || '/'));
  }
});

console.log('[SW] Food Cheque Service Worker loaded ✓');