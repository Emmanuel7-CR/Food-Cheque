/* ============================================================
   FOOD CHEQUE — Menu & Cart System  (fixed)
   ============================================================ */

'use strict';

// ── Menu Data ─────────────────────────────────────────────────
const MENU_ITEMS = [
  // Rice Dishes
  { id: 1, category: 'rice',   name: 'Signature Jollof Rice',    desc: 'Party-style smoky jollof with tender fried chicken, fried plantain & coleslaw.',                price: 3500, img: 'https://images.pexels.com/photos/17952745/pexels-photo-17952745.jpeg?auto=compress&cs=tinysrgb&w=800', badge: 'Bestseller'   },
  { id: 2, category: 'rice',   name: 'Fried Rice & Chicken',     desc: 'Golden stir-fried long-grain rice with mixed veggies, shrimp & crispy fried chicken.',          price: 3800, img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80', badge: null           },
  { id: 3, category: 'rice',   name: 'Ofada Rice & Ayamase',     desc: 'Native brown rice served with rich green pepper Ayamase sauce & assorted meat.',                 price: 4000, img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80', badge: 'Local Fave'   },
  // Soups & Swallows
  { id: 4, category: 'soups',  name: 'Egusi Soup & Pounded Yam', desc: 'Rich melon-seed soup cooked with assorted meats, stockfish & leafy greens.',                     price: 4200, img: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80', badge: "Chef's Pick"  },
  { id: 5, category: 'soups',  name: 'Ofe Onugbu (Bitter Leaf)', desc: 'Delta-style bitter leaf soup with cocoyam, ofe akwu & hearty assorted proteins.',               price: 3900, img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', badge: null           },
  { id: 6, category: 'soups',  name: 'Ogbono Soup & Eba',        desc: 'Silky draw soup with wild mango seeds, smoked fish, assorted meat & garri eba.',                  price: 4100, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', badge: null           },
  // Grills & BBQ
  { id: 7, category: 'grills', name: 'Suya Platter',             desc: 'Hausa-spiced grilled beef skewers with onion rings, tomatoes & groundnut spice.',                 price: 3200, img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', badge: 'Fan Favourite'},
  { id: 8, category: 'grills', name: 'Peppered Goat Meat',       desc: 'Slow-cooked tender goat meat in signature pepper sauce with boiled yam.',                         price: 4800, img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', badge: null           },
  { id: 9, category: 'grills', name: 'Grilled Tilapia',          desc: 'Whole grilled tilapia marinated in herbs & spices, served with jollof or fried rice.',             price: 5000, img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80', badge: 'Premium'      },
  // Snacks & Sides
  { id: 10, category: 'snacks', name: 'Small Chops Platter',     desc: 'Puff-puff, samosa, spring rolls, chicken wings & peppered gizzard. Party vibes!',                price: 2500, img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80', badge: 'Shareable'    },
  { id: 11, category: 'snacks', name: 'Catfish Pepper Soup',     desc: 'Aromatic Delta pepper soup with fresh catfish, uziza leaves & local spices.',                     price: 5500, img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', badge: 'Signature'    },
  { id: 12, category: 'snacks', name: 'Moi Moi Deluxe',          desc: 'Steamed bean pudding loaded with egg, fish, corned beef & fresh pepper.',                         price: 1500, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', badge: null           },
  // Drinks
  { id: 13, category: 'drinks', name: 'Chapman Cocktail',        desc: 'Classic Nigerian Chapman with Fanta, Sprite, grenadine, cucumber & citrus slices.',               price: 1800, img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80', badge: 'Refreshing'   },
  { id: 14, category: 'drinks', name: 'Zobo Hibiscus Drink',     desc: 'Premium chilled zobo with ginger, cloves, pineapple & natural hibiscus flowers.',                 price: 1200, img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80', badge: null           },
  { id: 15, category: 'drinks', name: 'Fresh Fruit Juice',       desc: 'Seasonal blend of watermelon, pineapple, orange & ginger — cold-pressed daily.',                  price: 1500, img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80', badge: null           },
];

const CATEGORIES = [
  { id: 'all',    label: 'All Items',        icon: '🍽️' },
  { id: 'rice',   label: 'Rice Dishes',      icon: '🍚' },
  { id: 'soups',  label: 'Soups & Swallows', icon: '🍲' },
  { id: 'grills', label: 'Grills & BBQ',     icon: '🔥' },
  { id: 'snacks', label: 'Snacks & Sides',   icon: '🍟' },
  { id: 'drinks', label: 'Drinks',           icon: '🥤' },
];

const DELIVERY_FEE    = 1500;
const WHATSAPP_NUMBER = '2348055311844';
const BANK_NAME       = 'First Bank of Nigeria';
const ACCOUNT_NAME    = 'Food Cheque Restaurant';
const ACCOUNT_NUM     = '3012345678';

// ── State ─────────────────────────────────────────────────────
let cart           = [];
let activeCategory = 'all';
let searchQuery    = '';
let uploadedFile   = null;

// ── Cart persistence ──────────────────────────────────────────
const loadCart = () => {
  try { cart = JSON.parse(localStorage.getItem('fc_cart') || '[]'); }
  catch { cart = []; }
};
const saveCart = () => localStorage.setItem('fc_cart', JSON.stringify(cart));

// ── Cart helpers ──────────────────────────────────────────────
const getCartTotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
const getCartCount = () => cart.reduce((s, i) => s + i.qty, 0);

const addToCart = (id) => {
  const item = MENU_ITEMS.find((m) => m.id === id);
  if (!item) return;
  const existing = cart.find((c) => c.id === id);
  if (existing) { existing.qty++; }
  else { cart.push({ id, name: item.name, price: item.price, img: item.img, qty: 1 }); }
  saveCart();
  renderCartDrawer();
  updateCartFAB();
  updateCardButtons();
  window.FC.Toast.success(`${item.name} added to cart`);
  const fab = document.getElementById('cartFAB');
  if (fab) { fab.classList.remove('bump'); void fab.offsetWidth; fab.classList.add('bump'); }
};

const updateQty = (id, delta) => {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((c) => c.id !== id);
  saveCart();
  renderCartDrawer();
  updateCartFAB();
  updateCardButtons();
};

const clearCart = () => {
  cart = [];
  saveCart();
  renderCartDrawer();
  updateCartFAB();
  updateCardButtons();
};

// ── Render menu ───────────────────────────────────────────────
const renderMenu = () => {
  const container = document.getElementById('menuContainer');
  if (!container) return;
  const query    = searchQuery.toLowerCase().trim();
  const filtered = MENU_ITEMS.filter((item) => {
    const matchCat    = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = !query ||
      item.name.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>Nothing found</h3>
        <p>Try a different term or browse all categories.</p>
      </div>`;
    return;
  }
  const grouped = {};
  filtered.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });
  const catMeta = {};
  CATEGORIES.slice(1).forEach((c) => { catMeta[c.id] = c; });
  let html = '';
  Object.entries(grouped).forEach(([catId, items]) => {
    const meta = catMeta[catId] || { label: catId, icon: '🍽️' };
    html += `
      <section class="menu-category-section" id="cat-${catId}">
        <h2 class="menu-category-title"><span>${meta.icon}</span>${meta.label}</h2>
        <div class="menu-grid">${items.map(cardHTML).join('')}</div>
      </section>`;
  });
  container.innerHTML = html;
  container.querySelectorAll('[data-add-id]').forEach((btn) => {
    btn.addEventListener('click', () => addToCart(Number(btn.dataset.addId)));
  });
  updateCardButtons();
};

const cardHTML = (item) => {
  const inCart = cart.some((c) => c.id === item.id);
  return `
    <article class="menu-card reveal">
      <div class="menu-card-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80'">
        ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
      </div>
      <div class="menu-card-body">
        <h3 class="menu-card-name">${item.name}</h3>
        <p class="menu-card-desc">${item.desc}</p>
        <div class="menu-card-footer">
          <span class="menu-card-price">${window.FC.formatNaira(item.price)}</span>
          <button class="add-to-cart-btn ${inCart ? 'in-cart' : ''}"
                  data-add-id="${item.id}" aria-label="Add ${item.name} to cart">
            ${inCart ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    </article>`;
};

const updateCardButtons = () => {
  document.querySelectorAll('[data-add-id]').forEach((btn) => {
    const inCart = cart.some((c) => c.id === Number(btn.dataset.addId));
    btn.classList.toggle('in-cart', inCart);
    btn.textContent = inCart ? '✓ Added' : '+ Add';
  });
};

// ── Cart drawer ───────────────────────────────────────────────
const renderCartDrawer = () => {
  const itemsEl    = document.getElementById('cartItems');
  const emptyEl    = document.getElementById('cartEmpty');
  const footerEl   = document.getElementById('cartFooter');
  const countEl    = document.getElementById('cartCountChip');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl    = document.getElementById('cartTotal');
  if (!itemsEl) return;

  const count    = getCartCount();
  const subtotal = getCartTotal();

  if (countEl) countEl.textContent = `${count} item${count !== 1 ? 's' : ''}`;

  if (cart.length === 0) {
    itemsEl.style.display  = 'none';
    emptyEl.style.display  = 'flex';
    footerEl.style.display = 'none';
    return;
  }

  emptyEl.style.display  = 'none';
  itemsEl.style.display  = 'block';
  footerEl.style.display = 'block';

  itemsEl.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div class="cart-item-img"><img src="${item.img}" alt="${item.name}" loading="lazy"></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${window.FC.formatNaira(item.price)} × ${item.qty}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-qty-id="${item.id}" data-delta="-1" aria-label="Remove one">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" data-qty-id="${item.id}" data-delta="1" aria-label="Add one">+</button>
      </div>
    </div>`).join('');

  itemsEl.querySelectorAll('[data-qty-id]').forEach((btn) =>
    btn.addEventListener('click', () =>
      updateQty(Number(btn.dataset.qtyId), Number(btn.dataset.delta))
    )
  );

  if (subtotalEl) subtotalEl.textContent = window.FC.formatNaira(subtotal);
  if (totalEl)    totalEl.textContent    = window.FC.formatNaira(subtotal + DELIVERY_FEE);

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
};

const updateCartFAB = () => {
  const badge = document.getElementById('cartBadge');
  if (badge) { const c = getCartCount(); badge.textContent = c > 0 ? c : ''; }
};

// ── Cart open / close ─────────────────────────────────────────
const openCart = () => {
  document.getElementById('cartOverlay')?.classList.add('open');
  document.getElementById('cartDrawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
};
const closeCart = () => {
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.body.style.overflow = '';
};

// ── Checkout — 2-step modal ───────────────────────────────────
const showStep = (n) => {
  const s1 = document.getElementById('checkoutStep1');
  const s2 = document.getElementById('checkoutStep2');
  const lbl = document.getElementById('modalStepLabel');
  if (s1) s1.style.display = n === 1 ? 'block' : 'none';
  if (s2) s2.style.display = n === 2 ? 'block' : 'none';
  if (lbl) lbl.textContent = n === 1 ? 'Step 1 of 2 — Review & Pay' : 'Step 2 of 2 — Your Details';
  document.querySelector('.checkout-modal')?.scrollTo({ top: 0, behavior: 'smooth' });
};

const openCheckout = () => {
  if (cart.length === 0) return;
  closeCart();

  // Short delay so cart drawer slide-out finishes first
  setTimeout(() => {
    renderOrderSummary();
    updatePaymentAmount();
    showStep(1);

    // ── KEY FIX: id="checkoutModal" now matches the HTML ──
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }, 320);
};

const closeCheckout = () => {
  document.getElementById('checkoutModal')?.classList.remove('open');
  document.body.style.overflow = '';
};

const renderOrderSummary = () => {
  const el = document.getElementById('checkoutOrderSummary');
  if (!el) return;
  const subtotal = getCartTotal();
  el.innerHTML = `
    <div style="background:white;border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden;margin-bottom:0.5rem;">
      ${cart.map((item) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:0.65rem 1rem;border-bottom:1px solid var(--border);font-size:0.85rem;">
          <span style="color:var(--text-2);">${item.name}
            <span style="color:var(--text-muted);font-size:0.8rem;"> × ${item.qty}</span>
          </span>
          <span style="font-family:var(--font-mono);color:var(--primary);font-weight:600;">${window.FC.formatNaira(item.price * item.qty)}</span>
        </div>`).join('')}
      <div style="display:flex;justify-content:space-between;padding:0.55rem 1rem;font-size:0.8rem;color:var(--text-muted);">
        <span>Delivery fee</span>
        <span style="font-family:var(--font-mono);">${window.FC.formatNaira(DELIVERY_FEE)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:0.8rem 1rem;border-top:2px solid var(--border);font-weight:700;">
        <span style="color:var(--dark);">Total</span>
        <span style="font-family:var(--font-mono);color:var(--primary);font-size:1.05rem;">${window.FC.formatNaira(subtotal + DELIVERY_FEE)}</span>
      </div>
    </div>`;
};

const updatePaymentAmount = () => {
  const total  = getCartTotal() + DELIVERY_FEE;
  const payEl  = document.getElementById('paymentAmount');
  const narEl  = document.getElementById('narrationText');
  const ordId  = 'FC' + Date.now().toString().slice(-5);
  if (payEl) payEl.textContent = window.FC.formatNaira(total);
  if (narEl) narEl.textContent = ordId;
};

// ── File upload + image preview ───────────────────────────────
const initFileUpload = () => {
  const input      = document.getElementById('paymentProof');
  const area       = document.getElementById('uploadArea');
  const defaultEl  = document.getElementById('uploadDefault');
  const previewEl  = document.getElementById('uploadPreview');
  const previewImg = document.getElementById('proofPreviewImg');
  const fileDisp   = document.getElementById('fileDisplay');
  if (!input) return;

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      window.FC.Toast.error('Please upload an image file (PNG or JPG)');
      return;
    }
    uploadedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (previewImg) previewImg.src = e.target.result;
      if (fileDisp)   fileDisp.textContent = '📎 ' + file.name;
      if (defaultEl)  defaultEl.style.display = 'none';
      if (previewEl) {
        previewEl.style.display       = 'flex';
        previewEl.style.flexDirection = 'column';
        previewEl.style.alignItems    = 'center';
        previewEl.style.gap           = '0.4rem';
      }
    };
    reader.readAsDataURL(file);
  };

  input.addEventListener('change', () => { if (input.files[0]) handleFile(input.files[0]); });

  if (area) {
    area.addEventListener('dragover',  (e) => { e.preventDefault(); area.classList.add('dragover'); });
    area.addEventListener('dragleave', ()  => area.classList.remove('dragover'));
    area.addEventListener('drop', (e) => {
      e.preventDefault();
      area.classList.remove('dragover');
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
  }
};

// ── Copy account number ───────────────────────────────────────
const initCopyBtn = () => {
  const btn = document.getElementById('copyAccBtn');
  if (!btn) return;
  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(ACCOUNT_NUM);
      btn.textContent = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy`;
        btn.classList.remove('copied');
      }, 2500);
    } catch {
      window.FC.Toast.info(`Account number: ${ACCOUNT_NUM}`);
    }
  });
};

// ── Place order via WhatsApp ──────────────────────────────────
const placeOrder = () => {
  const name    = (document.getElementById('cusName')?.value    || '').trim();
  const phone   = (document.getElementById('cusPhone')?.value   || '').trim();
  const address = (document.getElementById('cusAddress')?.value || '').trim();
  const confirm = document.getElementById('confirmPayment')?.checked;

  // Validate fields
  if (!name) {
    window.FC.Toast.error('Please enter your full name');
    document.getElementById('cusName')?.focus();
    return;
  }
  if (!phone) {
    window.FC.Toast.error('Please enter your phone number');
    document.getElementById('cusPhone')?.focus();
    return;
  }
  if (!/^\+?[\d\s\-()\+]{7,16}$/.test(phone)) {
    window.FC.Toast.error('Invalid phone number — include country code, e.g. +234…');
    document.getElementById('cusPhone')?.focus();
    return;
  }
  if (!address) {
    window.FC.Toast.error('Please enter your delivery address');
    document.getElementById('cusAddress')?.focus();
    return;
  }
  if (!confirm) {
    window.FC.Toast.error('Please confirm that you have completed the payment');
    return;
  }
  if (!uploadedFile) {
    window.FC.Toast.error('Please upload your payment receipt before confirming');
    document.getElementById('uploadArea')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('uploadArea')?.classList.add('upload-required');
    setTimeout(() => document.getElementById('uploadArea')?.classList.remove('upload-required'), 2500);
    return;
  }
  if (cart.length === 0) {
    window.FC.Toast.error('Your cart is empty');
    return;
  }

  const subtotal = getCartTotal();
  const total    = subtotal + DELIVERY_FEE;
  const now      = new Date().toLocaleString('en-NG', {
    timeZone: 'Africa/Lagos',
    weekday: 'short', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
  const orderId  = document.getElementById('narrationText')?.textContent
                   || ('FC' + Date.now().toString().slice(-5));
  const proofTxt = uploadedFile
    ? `✅ Uploaded — ${uploadedFile.name} (will send in this chat)`
    : '⚠️ Not uploaded — will send separately in this chat';

  const itemsList = cart
    .map((i) => `  • ${i.name} × ${i.qty}  →  ${window.FC.formatNaira(i.price * i.qty)}`)
    .join('\n');

  const waMessage = encodeURIComponent(
`━━━━━━━━━━━━━━━━━━━━━━━
🍽️ *NEW ORDER — Food Cheque*
Order ID: *${orderId}*
📅 ${now}
━━━━━━━━━━━━━━━━━━━━━━━

👤 *Customer Details*
Name:     ${name}
Phone:    ${phone}
Address:  ${address}

🛒 *Order Items*
${itemsList}

💰 *Bill*
Subtotal:  ${window.FC.formatNaira(subtotal)}
Delivery:  ${window.FC.formatNaira(DELIVERY_FEE)}
*TOTAL:    ${window.FC.formatNaira(total)}*

💳 *Payment*
Bank:    ${BANK_NAME}
Account: ${ACCOUNT_NUM} (${ACCOUNT_NAME})
Amount:  ${window.FC.formatNaira(total)}
Status:  ✅ Customer has confirmed payment
Receipt: ${proofTxt}

_Please confirm receipt & start preparing._ 🧡
— Food Cheque, Oghara`
  );

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`, '_blank', 'noopener,noreferrer');

  // Reset
  closeCheckout();
  clearCart();
  uploadedFile = null;
  document.getElementById('orderForm')?.reset();
  const previewEl = document.getElementById('uploadPreview');
  const defaultEl = document.getElementById('uploadDefault');
  if (previewEl) previewEl.style.display = 'none';
  if (defaultEl) defaultEl.style.display = 'block';

 window.FC.Toast.success('Order sent via WhatsApp! 🎉');

// Delay slightly so toast appears first
setTimeout(() => {
  document.dispatchEvent(new CustomEvent('fc:showInstallBanner'));
}, 1800);
};

// ── Search ────────────────────────────────────────────────────
const initSearch = () => {
  const input = document.getElementById('menuSearch');
  if (!input) return;
  input.addEventListener('input', () => {
    searchQuery = input.value;
    renderMenu();
    reObserveReveal();
  });
};

// ── Category tabs ─────────────────────────────────────────────
const initCategories = () => {
  document.querySelectorAll('.cat-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      activeCategory = tab.dataset.category;
      document.querySelectorAll('.cat-tab').forEach((t) =>
        t.classList.toggle('active', t === tab)
      );
      renderMenu();
      reObserveReveal();
    });
  });
};

// ── Re-observe reveal elements ────────────────────────────────
const reObserveReveal = () => {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
    }),
    { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
  );
  document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => obs.observe(el));
};

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderMenu();
  renderCartDrawer();
  updateCartFAB();
  reObserveReveal();
  initSearch();
  initCategories();
  initFileUpload();
  initCopyBtn();

  // Cart
  document.getElementById('cartFAB')?.addEventListener('click', openCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  document.getElementById('cartCloseBtn')?.addEventListener('click', closeCart);

  // Checkout
  document.getElementById('checkoutBtn')?.addEventListener('click', openCheckout);

  // Modal — close by clicking dark overlay (not the modal card itself)
  document.getElementById('checkoutModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'checkoutModal') closeCheckout();
  });
  document.getElementById('modalCloseBtn')?.addEventListener('click', closeCheckout);

  // 2-step navigation
  document.getElementById('stepNextBtn')?.addEventListener('click', () => showStep(2));
  document.getElementById('stepBackBtn')?.addEventListener('click', () => showStep(1));

  // Final submit
  document.getElementById('placeOrderBtn')?.addEventListener('click', placeOrder);

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeCheckout(); closeCart(); }
  });
});