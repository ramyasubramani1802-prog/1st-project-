/* ============================================================
   Studio Soulkadi — script.js
   Interactive logic: Cart, Customizer, Animations, Search
   ============================================================ */

'use strict';

/* ── Product Data ── */
const PRODUCTS = [
  {
    id: 1,
    name: 'Custom Interlocking Clicker',
    type: 'clicker',
    category: 'Custom Fidget Clicker',
    price: 299,
    originalPrice: null,
    image: 'assets/clicker_product.png',
    alt: 'Custom interlocking fidget clicker keychain with pastel letter tiles',
    badges: ['bestseller', 'custom'],
    colors: ['#FFB3C6', '#A2C2E8', '#B5EAD7', '#C7B8EA'],
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 2,
    name: 'Mini Photo Album Keychain',
    type: 'album',
    category: 'Mini Photo Album',
    price: 249,
    originalPrice: null,
    image: 'assets/mini_album_product.png',
    alt: 'Mini photo album keychain with daisy and bow accents',
    badges: ['bestseller'],
    colors: ['#FFB3C6', '#A2C2E8', '#C7B8EA'],
    rating: 5.0,
    reviews: 89,
  },
  {
    id: 3,
    name: 'Honeycomb Clicker',
    type: 'clicker',
    category: 'Custom Fidget Clicker',
    price: 349,
    originalPrice: null,
    image: 'assets/honeycomb_clicker.png',
    alt: 'Honeycomb style fidget clicker with hexagonal letter tiles',
    badges: ['new'],
    colors: ['#FFD700', '#FFB3C6', '#B5EAD7'],
    rating: 4.8,
    reviews: 42,
  },
  {
    id: 4,
    name: 'Boxy Clicker',
    type: 'clicker',
    category: 'Custom Fidget Clicker',
    price: 329,
    originalPrice: 399,
    image: 'assets/boxy_clicker.png',
    alt: 'Boxy chunky fidget clicker with rainbow letter tiles',
    badges: ['sale'],
    colors: ['#FFFFFF', '#FFB3C6', '#A2C2E8', '#B5EAD7'],
    rating: 4.7,
    reviews: 57,
  },
  {
    id: 5,
    name: 'Kawaii Accessories Bundle',
    type: 'keepsake',
    category: 'Customized Keepsake',
    price: 399,
    originalPrice: 499,
    image: 'assets/accessories_product.png',
    alt: 'Collection of kawaii accessories including boba clicker and name keychains',
    badges: ['sale', 'custom'],
    colors: ['#FFB3C6', '#B5EAD7', '#C7B8EA', '#FDFD96'],
    rating: 4.9,
    reviews: 71,
  },
];

/* ── Color Themes for Customizer ── */
const COLOR_THEMES = {
  rainbow: ['#FFB3C6', '#FDFD96', '#A2C2E8', '#B5EAD7', '#C7B8EA', '#FF9E9E', '#FFD085', '#A8E6CF', '#FFB3C6', '#D4A4E8', '#A2C2E8', '#B5EAD7'],
  pink:    ['#D13B7B', '#E86FA4', '#FFB3C6', '#FF9EC9', '#D13B7B', '#E86FA4', '#FFB3C6', '#FF9EC9', '#D13B7B', '#E86FA4', '#FFB3C6', '#FF9EC9'],
  blue:    ['#4A90D9', '#6AAEE0', '#A2C2E8', '#C5DDFF', '#4A90D9', '#6AAEE0', '#A2C2E8', '#C5DDFF', '#4A90D9', '#6AAEE0', '#A2C2E8', '#C5DDFF'],
  mint:    ['#3CBFAE', '#5FD4C4', '#B5EAD7', '#C9F5EB', '#3CBFAE', '#5FD4C4', '#B5EAD7', '#C9F5EB', '#3CBFAE', '#5FD4C4', '#B5EAD7', '#C9F5EB'],
  lavender:['#9B72CF', '#B08EE0', '#C7B8EA', '#DACED8', '#9B72CF', '#B08EE0', '#C7B8EA', '#DACED8', '#9B72CF', '#B08EE0', '#C7B8EA', '#DACED8'],
  yellow:  ['#F6C90E', '#FFD85C', '#FDFD96', '#FFFACC', '#F6C90E', '#FFD85C', '#FDFD96', '#FFFACC', '#F6C90E', '#FFD85C', '#FDFD96', '#FFFACC'],
};

const BASE_COLORS = {
  white: '#FFFFFF',
  black: '#222222',
  babyPink: '#FFB3C6',
  mint: '#B5EAD7',
};

const COUPONS = {
  'SOULKADI10': 10,
  'FIRST10': 10,
  'INDIE15': 15,
  'QUIRKY20': 20,
};

const FREE_SHIPPING_THRESHOLD = 500;

/* ── State ── */
let cart = JSON.parse(localStorage.getItem('sk-cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('sk-wishlist') || '[]');
let appliedCoupon = null;
let customText = 'SOULKADI';
let colorTheme = 'rainbow';
let clickerStyle = 'interlocking';
let baseColor = 'white';
let activeFilter = 'all';

/* ── DOM References ── */
const cartDrawer     = document.getElementById('cart-drawer');
const cartOverlay    = document.getElementById('cart-overlay');
const openCartBtn    = document.getElementById('open-cart-btn');
const closeCartBtn   = document.getElementById('close-cart-btn');
const cartBadge      = document.getElementById('cart-badge');
const wishlistBadge  = document.getElementById('wishlist-badge');
const cartItemsCont  = document.getElementById('cart-items-container');
const cartEmptyState = document.getElementById('cart-empty-state');
const cartSubtotal   = document.getElementById('cart-subtotal-amount');
const cartDiscountRow= document.getElementById('cart-discount-row');
const cartDiscountAmt= document.getElementById('cart-discount-amount');
const cartTotal      = document.getElementById('cart-total-amount');
const shippingRemain = document.getElementById('shipping-remaining');
const shippingProg   = document.getElementById('shipping-progress');
const shippingMsg    = document.getElementById('shipping-msg');
const couponInput    = document.getElementById('coupon-input');
const applyCouponBtn = document.getElementById('apply-coupon-btn');
const couponMsg      = document.getElementById('coupon-msg');
const productsGrid   = document.getElementById('products-grid');
const filterTabs     = document.querySelectorAll('.filter-tab');
const toastEl        = document.getElementById('toast');
const navbar         = document.getElementById('navbar');
const hamburgerBtn   = document.getElementById('hamburger-btn');
const mobileNav      = document.getElementById('mobile-nav');
const searchToggle   = document.getElementById('search-toggle-btn');
const searchDropdown = document.getElementById('search-dropdown');
const searchInput    = document.getElementById('search-input');
const searchSugg     = document.getElementById('search-suggestions');
const customTextInput= document.getElementById('custom-text-input');
const charCount      = document.getElementById('char-count');
const previewTiles   = document.getElementById('preview-tiles');
const previewBase    = document.getElementById('preview-base');
const addCustomBtn   = document.getElementById('add-custom-to-cart');
const newsletterForm = document.getElementById('newsletter-form');
const checkoutBtn    = document.getElementById('checkout-btn');

/* ============================================================
   CART LOGIC
   ============================================================ */
function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('visible');
  cartDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('visible');
  cartDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function saveCart() {
  localStorage.setItem('sk-cart', JSON.stringify(cart));
}

function getCartSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getDiscount(subtotal) {
  if (!appliedCoupon) return 0;
  const pct = COUPONS[appliedCoupon] || 0;
  return Math.round(subtotal * pct / 100);
}

function updateCartUI() {
  const subtotal = getCartSubtotal();
  const discount = getDiscount(subtotal);
  const total = Math.max(0, subtotal - discount);

  /* Badge */
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  if (totalQty > 0) {
    cartBadge.textContent = totalQty;
    cartBadge.style.display = 'flex';
  } else {
    cartBadge.style.display = 'none';
  }

  /* Free shipping bar */
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  shippingProg.style.width = pct + '%';
  if (remaining > 0) {
    shippingRemain.textContent = '₹' + remaining;
    shippingMsg.innerHTML = `Add <strong id="shipping-remaining">₹${remaining}</strong> more for free shipping! 🚚`;
  } else {
    shippingMsg.innerHTML = `🎉 You've unlocked <strong>Free Shipping!</strong>`;
  }

  /* Subtotal / discount / total */
  cartSubtotal.textContent = '₹' + subtotal;
  if (discount > 0) {
    cartDiscountRow.style.display = 'flex';
    cartDiscountAmt.textContent = '-₹' + discount;
  } else {
    cartDiscountRow.style.display = 'none';
  }
  cartTotal.textContent = '₹' + total;

  /* Items */
  renderCartItems();
}

function renderCartItems() {
  if (cart.length === 0) {
    cartEmptyState.style.display = 'block';
    return;
  }
  cartEmptyState.style.display = 'none';

  /* Remove old items */
  const existing = cartItemsCont.querySelectorAll('.cart-item');
  existing.forEach(el => el.remove());

  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.dataset.itemId = item.cartId;
    el.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" loading="lazy"/>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-variant">${item.variant || ''}</div>
        <div class="cart-item-qty-row">
          <button class="qty-btn" data-action="dec" data-id="${item.cartId}" aria-label="Decrease quantity">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.cartId}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-item-price">
        ₹${item.price * item.qty}
        <button class="remove-item-btn" data-id="${item.cartId}" aria-label="Remove item">Remove</button>
      </div>
    `;
    cartItemsCont.appendChild(el);
  });

  /* Qty and remove buttons */
  cartItemsCont.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const idx = cart.findIndex(i => i.cartId === id);
      if (idx === -1) return;
      if (action === 'inc') {
        cart[idx].qty++;
      } else {
        cart[idx].qty--;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
      }
      saveCart();
      updateCartUI();
    });
  });

  cartItemsCont.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      cart = cart.filter(i => i.cartId !== id);
      saveCart();
      updateCartUI();
      showToast('Item removed from cart', 'error');
    });
  });
}

function addToCart(productId, variant = '') {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cartId = productId + '-' + (variant || 'default');
  const existing = cart.find(i => i.cartId === cartId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      cartId,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: variant || product.category,
      qty: 1,
    });
  }
  saveCart();
  updateCartUI();
  showToast(`✨ ${product.name} added to cart!`, 'success');
  openCart();
}

/* Coupon */
applyCouponBtn.addEventListener('click', () => {
  const code = couponInput.value.trim().toUpperCase();
  if (COUPONS[code]) {
    appliedCoupon = code;
    couponMsg.textContent = `🎉 "${code}" applied! ${COUPONS[code]}% off!`;
    couponMsg.className = 'coupon-msg success';
    updateCartUI();
  } else {
    couponMsg.textContent = `❌ Invalid coupon code. Try SOULKADI10 or INDIE15!`;
    couponMsg.className = 'coupon-msg error';
  }
});
couponInput.addEventListener('keydown', e => { if (e.key === 'Enter') applyCouponBtn.click(); });

/* Checkout */
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) { showToast('Your cart is empty!', 'error'); return; }
  const waMsg = encodeURIComponent(`Hi Studio Soulkadi! 🌸\nI'd like to place an order:\n${cart.map(i => `• ${i.name} (x${i.qty}) — ₹${i.price * i.qty}`).join('\n')}\nTotal: ₹${getCartSubtotal()}${appliedCoupon ? ` (Coupon: ${appliedCoupon})` : ''}`);
  window.open(`https://wa.me/919999999999?text=${waMsg}`, '_blank');
});

/* ============================================================
   WISHLIST
   ============================================================ */
function toggleWishlist(productId) {
  const idx = wishlist.indexOf(productId);
  if (idx === -1) {
    wishlist.push(productId);
    showToast('Added to wishlist ♡', 'success');
  } else {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist', 'error');
  }
  localStorage.setItem('sk-wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
  updateWishlistButtons();
}

function updateWishlistBadge() {
  if (wishlist.length > 0) {
    wishlistBadge.textContent = wishlist.length;
    wishlistBadge.style.display = 'flex';
  } else {
    wishlistBadge.style.display = 'none';
  }
}

function updateWishlistButtons() {
  document.querySelectorAll('.product-wishlist-btn').forEach(btn => {
    const id = parseInt(btn.dataset.productId);
    if (wishlist.includes(id)) {
      btn.classList.add('wishlisted');
      btn.innerHTML = '♥';
      btn.style.color = 'var(--primary)';
    } else {
      btn.classList.remove('wishlisted');
      btn.innerHTML = '♡';
      btn.style.color = '';
    }
  });
}

/* ============================================================
   PRODUCT CARDS
   ============================================================ */
function getBadgeHtml(badges) {
  return badges.map(b => {
    const labels = { bestseller: '⭐ Best Seller', new: '✨ New', sale: '🔥 Sale', custom: '🎨 Custom' };
    return `<span class="product-badge badge-${b}">${labels[b] || b}</span>`;
  }).join('');
}

function getStarsHtml(rating, reviews) {
  return `<div class="product-stars">★★★★★ <span>${rating} (${reviews})</span></div>`;
}

function getColorDotsHtml(colors) {
  const dots = colors.slice(0, 4).map(c => `<span class="color-dot" style="background:${c}" title="${c}"></span>`).join('');
  const more = colors.length > 4 ? `<span class="color-dot more">+${colors.length - 4}</span>` : '';
  return `<div class="product-color-dots">${dots}${more}</div>`;
}

function createProductCard(product) {
  const savings = product.originalPrice ? `Save ₹${product.originalPrice - product.price}` : '';
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.type = product.type;
  card.innerHTML = `
    <div class="product-img-wrap">
      <img src="${product.image}" alt="${product.alt}" class="product-img" loading="lazy"/>
      <div class="product-badges">${getBadgeHtml(product.badges)}</div>
      <button class="product-wishlist-btn" data-product-id="${product.id}" aria-label="Toggle wishlist for ${product.name}">♡</button>
      <div class="quick-add-overlay">
        <button class="quick-add-btn" data-product-id="${product.id}">+ Quick Add to Cart</button>
      </div>
    </div>
    <div class="product-info">
      ${getStarsHtml(product.rating, product.reviews)}
      <div class="product-name">${product.name}</div>
      <div class="product-type">${product.category}</div>
      ${getColorDotsHtml(product.colors)}
      <div class="product-price-row">
        <span class="price-current">₹${product.price}</span>
        ${product.originalPrice ? `<span class="price-original">₹${product.originalPrice}</span>` : ''}
        ${savings ? `<span class="price-savings">${savings}</span>` : ''}
      </div>
    </div>
  `;

  /* Wishlist */
  card.querySelector('.product-wishlist-btn').addEventListener('click', e => {
    e.stopPropagation();
    toggleWishlist(product.id);
  });
  /* Quick Add */
  card.querySelector('.quick-add-btn').addEventListener('click', e => {
    e.stopPropagation();
    addToCart(product.id);
  });
  return card;
}

function renderProducts(filter) {
  productsGrid.innerHTML = '';
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.type === filter);
  filtered.forEach((product, i) => {
    const card = createProductCard(product);
    card.style.animationDelay = (i * 0.07) + 's';
    productsGrid.appendChild(card);
  });
  updateWishlistButtons();
}

/* Filter Tabs */
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    activeFilter = tab.dataset.filter;
    renderProducts(activeFilter);
  });
});

/* Section add-to-cart buttons (clickers, albums sections) */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-product-id]');
  if (!btn || btn.classList.contains('product-wishlist-btn') || btn.classList.contains('quick-add-btn')) return;
  const id = parseInt(btn.dataset.productId);
  if (id) addToCart(id);
});

/* ============================================================
   LIVE CUSTOMIZER
   ============================================================ */
function updatePreview() {
  const text = (customText || 'SOULKADI').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);
  const colors = COLOR_THEMES[colorTheme] || COLOR_THEMES.rainbow;

  previewTiles.innerHTML = '';
  [...text].forEach((char, i) => {
    const tile = document.createElement('div');
    tile.className = 'preview-tile';
    tile.style.background = colors[i % colors.length];
    tile.style.animationDelay = (i * 0.04) + 's';
    tile.textContent = char;
    previewTiles.appendChild(tile);
  });

  previewBase.style.background = BASE_COLORS[baseColor] || '#FFFFFF';
}

/* Text input */
if (customTextInput) {
  customTextInput.value = customText;
  customTextInput.addEventListener('input', () => {
    customText = customTextInput.value;
    charCount.textContent = `${customText.length} / 12 characters`;
    updatePreview();
  });
}

/* Style radios */
document.querySelectorAll('input[name="clicker-style"]').forEach(radio => {
  radio.addEventListener('change', () => {
    clickerStyle = radio.value;
    document.querySelectorAll('.style-option').forEach(o => o.classList.remove('selected'));
    radio.closest('.style-option').classList.add('selected');
    updatePreview();
  });
});

/* Color radios */
document.querySelectorAll('input[name="color-theme"]').forEach(radio => {
  radio.addEventListener('change', () => {
    colorTheme = radio.value;
    document.querySelectorAll('.color-swatch').forEach(o => o.classList.remove('selected'));
    radio.closest('.color-swatch').classList.add('selected');
    updatePreview();
  });
});

/* Base radios */
document.querySelectorAll('input[name="base-color"]').forEach(radio => {
  radio.addEventListener('change', () => {
    baseColor = radio.value;
    document.querySelectorAll('.base-option').forEach(o => o.classList.remove('selected'));
    radio.closest('.base-option').classList.add('selected');
    updatePreview();
  });
});

/* Add custom to cart */
if (addCustomBtn) {
  addCustomBtn.addEventListener('click', () => {
    const text = (customText || 'SOULKADI').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12) || 'CUSTOM';
    const variantLabel = `${text} · ${clickerStyle} · ${colorTheme} · ${baseColor} base`;
    const customProduct = {
      cartId: `custom-${Date.now()}`,
      id: 99,
      name: `Custom ${clickerStyle.charAt(0).toUpperCase() + clickerStyle.slice(1)} Clicker`,
      price: 299 + Math.max(0, text.length - 4) * 20,
      image: 'assets/clicker_product.png',
      variant: variantLabel,
      qty: 1,
    };
    cart.push(customProduct);
    saveCart();
    updateCartUI();
    showToast(`🎨 Custom clicker "${text}" added to cart!`, 'success');
    openCart();
  });
}

/* ============================================================
   NAVBAR
   ============================================================ */
/* Scroll effect */
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
}, { passive: true });

/* Active nav link on scroll */
const sections = document.querySelectorAll('section[id]');
function updateActiveNavLink() {
  const scrollY = window.scrollY + 120;
  let current = 'home';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop) current = section.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

/* Hamburger */
hamburgerBtn.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburgerBtn.classList.toggle('open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', isOpen);
  mobileNav.setAttribute('aria-hidden', !isOpen);
});
mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

/* Search */
const SEARCH_SUGGESTIONS = ['Interlocking Clicker', 'Mini Album', 'Honeycomb Clicker', 'Boxy Clicker', 'Name Keychain', 'Custom Gift'];
searchToggle.addEventListener('click', () => {
  const isOpen = searchDropdown.classList.toggle('open');
  searchDropdown.setAttribute('aria-hidden', !isOpen);
  if (isOpen) {
    searchInput.focus();
    renderSearchSuggestions(SEARCH_SUGGESTIONS);
  }
});
document.addEventListener('click', e => {
  if (!searchDropdown.contains(e.target) && !searchToggle.contains(e.target)) {
    searchDropdown.classList.remove('open');
    searchDropdown.setAttribute('aria-hidden', 'true');
  }
});
searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  if (!q) { renderSearchSuggestions(SEARCH_SUGGESTIONS); return; }
  const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).map(p => p.name);
  renderSearchSuggestions(matches.length ? matches : ['No results found']);
});
function renderSearchSuggestions(items) {
  searchSugg.innerHTML = items.map(s =>
    `<span class="search-suggestion-chip" role="button" tabindex="0">${s}</span>`
  ).join('');
  searchSugg.querySelectorAll('.search-suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      searchInput.value = chip.textContent !== 'No results found' ? chip.textContent : '';
      if (chip.textContent !== 'No results found') {
        searchInput.dispatchEvent(new Event('input'));
      }
    });
  });
}

/* Cart open/close */
openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

/* Close cart on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCart();
});

/* ============================================================
   SCROLL REVEAL ANIMATION
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function observeRevealElements() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
let toastTimer = null;
function showToast(message, type = 'success') {
  if (toastTimer) clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.className = `toast show ${type}`;
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 3000);
}

/* ============================================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   NEWSLETTER
   ============================================================ */
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    if (emailInput.value && emailInput.checkValidity()) {
      showToast('🎉 Subscribed! Check your inbox for 10% off.', 'success');
      emailInput.value = '';
    } else {
      showToast('Please enter a valid email address.', 'error');
    }
  });
}

/* ============================================================
   MICRO-INTERACTION: Button ripple
   ============================================================ */
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  ripple.style.cssText = `
    position:absolute; width:1px; height:1px; background:rgba(255,255,255,0.5);
    border-radius:50%; pointer-events:none;
    left:${e.clientX - rect.left}px; top:${e.clientY - rect.top}px;
    transform:scale(0); transition:transform 0.5s ease, opacity 0.5s ease;
    opacity:1;
  `;
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  requestAnimationFrame(() => {
    ripple.style.transform = `scale(${Math.max(rect.width, rect.height) * 2.5})`;
    ripple.style.opacity = '0';
  });
  setTimeout(() => ripple.remove(), 600);
});

/* ============================================================
   INIT
   ============================================================ */
function init() {
  renderProducts('all');
  updateCartUI();
  updateWishlistBadge();
  updatePreview();
  observeRevealElements();

  /* Show wishlist/cart badge if stored */
  if (wishlist.length) updateWishlistBadge();
}

/* Run on DOM ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
