import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import CustomClickersSection from './components/CustomClickersSection';
import LiveCustomizer from './components/LiveCustomizer';
import MiniAlbumsSection from './components/MiniAlbumsSection';
import KeepsakesSection from './components/KeepsakesSection';
import ReviewsSection from './components/ReviewsSection';
import AboutSection from './components/AboutSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import Toast from './components/Toast';

import { PRODUCTS } from './data/products';

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sk-cart') || '[]');
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sk-wishlist') || '[]');
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('sk-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sk-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3200);
  };

  // Add standard product to cart
  const handleAddToCart = (productId, variant = '') => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const cartId = `${productId}-${variant || 'default'}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          variant: variant || product.category,
          qty: 1,
        },
      ];
    });

    showToast(`✨ ${product.name} added to cart!`, 'success');
    setIsCartOpen(true);
  };

  // Add customizer item to cart
  const handleAddCustomToCart = (customItem) => {
    setCart((prev) => [...prev, customItem]);
    showToast(`🎨 ${customItem.name} added to cart!`, 'success');
    setIsCartOpen(true);
  };

  // Update item quantity
  const handleUpdateQty = (cartId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove item from cart
  const handleRemoveItem = (cartId) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
    showToast('Item removed from cart', 'error');
  };

  // Toggle wishlist
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'error');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to wishlist ♡', 'success');
        return [...prev, productId];
      }
    });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="app-container">
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSearch={(q) => setSearchQuery(q)}
        searchQuery={searchQuery}
      />

      <main>
        <Hero />
        <Marquee />
        <Categories
          onSelectCategory={(cat) => {
            const shop = document.getElementById('shop');
            if (shop) shop.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <ProductGrid
          products={PRODUCTS}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />
        <CustomClickersSection onAddToCart={handleAddToCart} />
        <LiveCustomizer onAddCustomToCart={handleAddCustomToCart} />
        <MiniAlbumsSection onAddToCart={handleAddToCart} />
        <KeepsakesSection onAddToCart={handleAddToCart} />
        <ReviewsSection />
        <AboutSection />
        <Newsletter onShowToast={showToast} />
      </main>

      <Footer />

      {/* Slide-out Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={(c) => setAppliedCoupon(c)}
        onShowToast={showToast}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={PRODUCTS}
        onAddToCart={(id) => {
          handleAddToCart(id);
          setIsWishlistOpen(false);
        }}
        onRemoveFromWishlist={handleToggleWishlist}
      />

      {/* Toast Notification */}
      <Toast toast={toast} />

      {/* Floating WhatsApp Quick Action */}
      <a
        href="https://wa.me/919999999999?text=Hi!%20I'd%20love%20to%20order%20from%20Studio%20Soulkadi%20🌸"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        <span className="wa-label">Order on WhatsApp</span>
      </a>
    </div>
  );
}
