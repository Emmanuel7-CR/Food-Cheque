/* ============================================================
   FOOD CHEQUE — Menu & Cart System
   ============================================================ */

'use strict';

// ── Menu Data ─────────────────────────────────────────────────
const MENU_ITEMS = [
  // Rice Dishes
  {
    id: 1, category: 'rice',
    name: 'Signature Jollof Rice',
    desc: 'Party-style smoky jollof with tender fried chicken, fried plantain & coleslaw.',
    price: 3500,
    img: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80',
    badge: 'Bestseller',
  },
  {
    id: 2, category: 'rice',
    name: 'Fried Rice & Chicken',
    desc: 'Golden stir-fried long-grain rice with mixed veggies, shrimp & crispy fried chicken.',
    price: 3800,
    img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80',
    badge: null,
  },
  {
    id: 3, category: 'rice',
    name: 'Ofada Rice & Ayamase',
    desc: 'Native brown rice served with rich green pepper Ayamase sauce & assorted meat.',
    price: 4000,
    img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80',
    badge: 'Local Fave',
  },
  // Soups & Swallows
  {
    id: 4, category: 'soups',
    name: 'Egusi Soup & Pounded Yam',
    desc: 'Rich melon-seed soup cooked with assorted meats, stockfish & leafy greens.',
    price: 4200,
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
    badge: 'Chef\'s Pick',
  },
  {
    id: 5, category: 'soups',
    name: 'Ofe Onugbu (Bitter Leaf Soup)',
    desc: 'Delta-style bitter leaf soup with cocoyam, ofe akwu & hearty assorted proteins.',
    price: 3900,
    img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
    badge: null,
  },
  {
    id: 6, category: 'soups',
    name: 'Ogbono Soup & Eba',
    desc: 'Silky draw soup with wild mango seeds, smoked fish, assorted meat & garri eba.',
    price: 4100,
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    badge: null,
  },
  // Grills & BBQ
  {
    id: 7, category: 'grills',
    name: 'Suya Platter',
    desc: 'Hausa-spiced grilled beef skewers with onion rings, tomatoes & groundnut spice.',
    price: 3200,
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
    badge: 'Fan Favourite',
  },
  {
    id: 8, category: 'grills',
    name: 'Peppered Goat Meat',
    desc: 'Slow-cooked tender goat meat in signature pepper sauce with boiled yam.',
    price: 4800,
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    badge: null,
  },
  {
    id: 9, category: 'grills',
    name: 'Grilled Tilapia',
    desc: 'Whole grilled tilapia marinated in herbs & spices, served with jollof or fried rice.',
    price: 5000,
    img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80',
    badge: 'Premium',
  },
  // Snacks & Sides
  {
    id: 10, category: 'snacks',
    name: 'Small Chops Platter',
    desc: 'Puff-puff, samosa, spring rolls, chicken wings & peppered gizzard. Party vibes!',
    price: 2500,
    img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
    badge: 'Shareable',
  },
  {
    id: 11, category: 'snacks',
    name: 'Catfish Pepper Soup',
    desc: 'Aromatic Delta pepper soup with fresh catfish, uziza leaves & local spices.',
    price: 5500,
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
    badge: 'Signature',
  },
  {
    id: 12, category: 'snacks',
    name: 'Moi Moi Deluxe',
    desc: 'Steamed bean pudding loaded with egg, fish, corned beef & fresh pepper.',
    price: 1500,
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    badge: null,
  },
  // Drinks
  {
    id: 13, category: 'drinks',
    name: 'Chapman Cocktail',
    desc: 'Classic Nigerian Chapman with Fanta, Sprite, grenadine, cucumber & citrus slices.',
    price: 1800,
    img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
    badge: 'Refreshing',
  },
  {
    id: 14, category: 'drinks',
    name: 'Zobo Hibiscus Drink',
    desc: 'Premium chilled zobo with ginger, cloves, pineapple & natural hibiscus flowers.',
    price: 1200,
    img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80',
    badge: null,
  },
  {
    id: 15, category: 'drinks',
    name: 'Fresh Fruit Juice',
    desc: 'Seasonal blend of watermelon, pineapple, orange & ginger — cold-pressed daily.',
    price: 1500,
    img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80',
    badge: null,
  },
];

const CATEGORIES = [
  { id: 'all',    label: 'All Items',       icon: '🍽️' },
  { id: 'rice',   label: 'Rice Dishes',     icon: '🍚' },
  { id: 'soups',  label: 'Soups & Swallows',icon: '🍲' },
  { id: 'grills', label: 'Grills & BBQ',    icon: '🔥' },
  { id: 'snacks', label: 'Snacks & Sides',  icon: '🍟' },
  { id: 'drinks', label: 'Drinks',          icon: '🥤' },
];

const DELIVERY_FEE = 1500;
const WHATSAPP_NUMBER = '2348012345678'; // Replace with actual number
const BANK_NAME    = 'First Bank of Nigeria';
const ACCOUNT_NAME = 'Food Cheque Restaurant';
const ACCOUNT_NUM  = '3012345678';

// ── State ─────────────────────────────────────────────────────
let cart = [];
let activeCategory = 'all';
let searchQuery = '';

const loadCart = () => {
  try {
    cart = JSON.parse(localStorage.getItem('fc_cart') || '[]');
  } catch {
    cart = [];
  }
};

const saveCart = () => {
  localStorage.setItem('fc_cart', JSON.stringify(cart));
};

// ── Cart Helpers ──────────────────────────────────────────────
const getCartTotal = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);
const getCartCount = () => cart.reduce((sum, item) => sum + item.qty, 0);

const addToCart = (id) => {
  const item = MENU_ITEMS.find((m) => m.id === id);
  if (!item) return;

  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name: item.name, price: item.price, img: item.img, qty: 1 });
  }

  saveCart();
  renderCartDrawer();
  updateCartFAB();
  updateCardButtons();
  window.FC.Toast.success(`${item.name} added to cart`);

  const fab = document.getElementById('cartFAB');
  if (fab) {
    fab.classList.remove('bump');
    void fab.offsetWidth;
    fab.classList.add('bump');
  }
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

// ── Render Menu ───────────────────────────────────────────────
const renderMenu = () => {
  const container = document.getElementById('menuContainer');
  if (!container) return;

  const query = searchQuery.toLowerCase().trim();
  const filtered = MENU_ITEMS.filter((item) => {
    const matchCat  = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = !query || item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>Nothing found</h3>
        <p>Try a different search term or browse all categories.</p>
      </div>`;
    return;
  }

  // Group by category
  const grouped = {};
  filtered.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  // Category meta
  const catMeta = {};
  CATEGORIES.slice(1).forEach((c) => { catMeta[c.id] = c; });

  let html = '';
  Object.entries(grouped).forEach(([catId, items]) => {
    const meta = catMeta[catId] || { label: catId, icon: '🍽️' };
    html += `
      <section class="menu-category-section" id="cat-${catId}">
        <h2 class="menu-category-title"><span>${meta.icon}</span>${meta.label}</h2>
        <div class="menu-grid">
          ${items.map(cardHTML).join('')}
        </div>
      </section>`;
  });

  container.innerHTML = html;

  // Attach add-to-cart listeners
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
        <img src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80'">
        ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
      </div>
      <div class="menu-card-body">
        <h3 class="menu-card-name">${item.name}</h3>
        <p class="menu-card-desc">${item.desc}</p>
        <div class="menu-card-footer">
          <span class="menu-card-price">${window.FC.formatNaira(item.price)}</span>
          <button class="add-to-cart-btn ${inCart ? 'in-cart' : ''}" data-add-id="${item.id}" aria-label="Add ${item.name} to cart">
            ${inCart ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    </article>`;
};

const updateCardButtons = () => {
  document.querySelectorAll('[data-add-id]').forEach((btn) => {
    const id = Number(btn.dataset.addId);
    const inCart = cart.some((c) => c.id === id);
    btn.classList.toggle('in-cart', inCart);
    btn.textContent = inCart ? '✓ Added' : '+ Add';
  });
};

// ── Render Cart Drawer ────────────────────────────────────────
const renderCartDrawer = () => {
  const itemsEl   = document.getElementById('cartItems');
  const emptyEl   = document.getElementById('cartEmpty');
  const footerEl  = document.getElementById('cartFooter');
  const countEl   = document.getElementById('cartCountChip');
  const subtotalEl= document.getElementById('cartSubtotal');
  const totalEl   = document.getElementById('cartTotal');

  if (!itemsEl) return;

  const count = getCartCount();
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
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${window.FC.formatNaira(item.price)} × ${item.qty}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-qty-id="${item.id}" data-delta="-1" aria-label="Remove one">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" data-qty-id="${item.id}" data-delta="1" aria-label="Add one">+</button>
      </div>
    </div>
  `).join('');

  // Quantity button listeners
  itemsEl.querySelectorAll('[data-qty-id]').forEach((btn) => {
    btn.addEventListener('click', () => updateQty(Number(btn.dataset.qtyId), Number(btn.dataset.delta)));
  });

  if (subtotalEl) subtotalEl.textContent = window.FC.formatNaira(subtotal);
  if (totalEl)   totalEl.textContent   = window.FC.formatNaira(subtotal + DELIVERY_FEE);

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
};

// ── Cart FAB ──────────────────────────────────────────────────
const updateCartFAB = () => {
  const badge = document.getElementById('cartBadge');
  if (badge) {
    const count = getCartCount();
    badge.textContent = count > 0 ? count : '';
  }
};

// ── Cart Drawer Toggle ────────────────────────────────────────
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

// ── Checkout Modal ────────────────────────────────────────────
let uploadedFileName = '';

const openCheckout = () => {
  if (cart.length === 0) return;
  closeCart();
  setTimeout(() => {
    document.getElementById('checkoutModal')?.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderOrderSummary();
  }, 300);
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
    <div style="background:rgba(200,90,10,0.04);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:0.75rem;">
      ${cart.map((item) => `
        <div style="display:flex;justify-content:space-between;padding:0.4rem 0;font-size:0.85rem;border-bottom:1px solid var(--border);">
          <span style="color:var(--text-2);">${item.name} × ${item.qty}</span>
          <span style="font-family:var(--font-mono);color:var(--primary);">${window.FC.formatNaira(item.price * item.qty)}</span>
        </div>`).join('')}
      <div style="display:flex;justify-content:space-between;padding:0.5rem 0 0;font-size:0.825rem;color:var(--text-muted);">
        <span>Delivery</span>
        <span style="font-family:var(--font-mono);">${window.FC.formatNaira(DELIVERY_FEE)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:0.5rem 0 0;border-top:1px solid var(--border);margin-top:0.4rem;font-weight:700;">
        <span style="color:var(--dark);">Total</span>
        <span style="font-family:var(--font-mono);color:var(--primary);font-size:1.05rem;">${window.FC.formatNaira(subtotal + DELIVERY_FEE)}</span>
      </div>
    </div>`;
};

// ── Place Order via WhatsApp ───────────────────────────────────
const placeOrder = () => {
  const name    = document.getElementById('cusName')?.value.trim();
  const phone   = document.getElementById('cusPhone')?.value.trim();
  const address = document.getElementById('cusAddress')?.value.trim();
  const confirm = document.getElementById('confirmPayment')?.checked;

  if (!name || !phone || !address) {
    window.FC.Toast.error('Please fill in all required fields');
    return;
  }

  if (!/^\+?[0-9\s\-()]{7,15}$/.test(phone)) {
    window.FC.Toast.error('Please enter a valid phone number');
    return;
  }

  if (!confirm) {
    window.FC.Toast.error('Please confirm payment before placing order');
    return;
  }

  const subtotal = getCartTotal();
  const total    = subtotal + DELIVERY_FEE;
  const now      = new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' });
  const orderId  = 'FC' + Date.now().toString().slice(-6);

  const itemsText = cart.map((item) =>
    `  • ${item.name} × ${item.qty} = ${window.FC.formatNaira(item.price * item.qty)}`
  ).join('\n');

  const msg = encodeURIComponent(
`🍽️ *NEW ORDER — Food Cheque*
Order ID: *${orderId}*
📅 ${now}

👤 *Customer Details*
Name: ${name}
Phone: ${phone}
Address: ${address}

🛒 *Order Items*
${itemsText}

💰 *Payment Summary*
Subtotal: ${window.FC.formatNaira(subtotal)}
Delivery: ${window.FC.formatNaira(DELIVERY_FEE)}
*TOTAL: ${window.FC.formatNaira(total)}*

💳 *Payment*
Bank: ${BANK_NAME}
Account: ${ACCOUNT_NUM} (${ACCOUNT_NAME})
Status: ✅ Customer confirms payment made
Proof: ${uploadedFileName || 'Not uploaded (will send separately)'}

_Thank you for ordering from Food Cheque, Oghara!_ 🧡`
  );

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');

  // Reset
  closeCheckout();
  clearCart();
  document.getElementById('orderForm')?.reset();
  uploadedFileName = '';
  const fileDisplay = document.getElementById('fileDisplay');
  if (fileDisplay) fileDisplay.textContent = '';
  window.FC.Toast.success('Order sent via WhatsApp! 🎉');
};

// ── Search & Filter ───────────────────────────────────────────
const initSearch = () => {
  const input = document.getElementById('menuSearch');
  if (!input) return;

  input.addEventListener('input', () => {
    searchQuery = input.value;
    renderMenu();
    initRevealObserver();
  });
};

const initCategories = () => {
  const tabs = document.querySelectorAll('.cat-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeCategory = tab.dataset.category;
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      renderMenu();
      initRevealObserver();
    });
  });
};

// Re-run reveal after dynamic render
const initRevealObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } }),
    { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
  );
  document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => observer.observe(el));
};

// ── File Upload ───────────────────────────────────────────────
const initFileUpload = () => {
  const input = document.getElementById('paymentProof');
  const display = document.getElementById('fileDisplay');
  if (!input || !display) return;

  input.addEventListener('change', () => {
    if (input.files[0]) {
      uploadedFileName = input.files[0].name;
      display.textContent = '📎 ' + uploadedFileName;
    }
  });

  // Drag & drop visual
  const area = input.closest('.file-upload-area');
  if (area) {
    area.addEventListener('dragover', (e) => { e.preventDefault(); area.classList.add('dragover'); });
    area.addEventListener('dragleave', () => area.classList.remove('dragover'));
    area.addEventListener('drop', () => area.classList.remove('dragover'));
  }
};

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderMenu();
  renderCartDrawer();
  updateCartFAB();
  initRevealObserver();
  initSearch();
  initCategories();
  initFileUpload();

  // Cart FAB
  document.getElementById('cartFAB')?.addEventListener('click', openCart);

  // Cart overlay/close
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  document.getElementById('cartCloseBtn')?.addEventListener('click', closeCart);

  // Checkout button
  document.getElementById('checkoutBtn')?.addEventListener('click', openCheckout);

  // Modal close
  document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeCheckout();
  });
  document.getElementById('modalCloseBtn')?.addEventListener('click', closeCheckout);

  // Place order
  document.getElementById('placeOrderBtn')?.addEventListener('click', placeOrder);

  // Keyboard close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCheckout();
      closeCart();
    }
  });
});