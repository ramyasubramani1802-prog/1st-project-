import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { COUPONS, FREE_SHIPPING_THRESHOLD } from '../data/products';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onShowToast,
}) {
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountPercent = appliedCoupon ? COUPONS[appliedCoupon] || 0 : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (COUPONS[code]) {
      onApplyCoupon(code);
      setCouponStatus({
        type: 'success',
        msg: `🎉 "${code}" applied! ${COUPONS[code]}% off!`,
      });
      try {
        confetti({ particleCount: 30, spread: 50 });
      } catch {}
    } else {
      setCouponStatus({
        type: 'error',
        msg: '❌ Invalid coupon. Try SOULKADI10 or INDIE15!',
      });
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      onShowToast('Your cart is empty!', 'error');
      return;
    }

    const orderDetails = cart
      .map(
        (i) =>
          `• ${i.name} ${i.variant ? `(${i.variant})` : ''} x${i.qty} — ₹${i.price * i.qty}`
      )
      .join('\n');

    const couponNote = appliedCoupon
      ? `\nCoupon Applied: ${appliedCoupon} (-₹${discountAmount})`
      : '';

    const text = encodeURIComponent(
      `Hi Studio Soulkadi! 🌸\nI'd like to place an order:\n\n${orderDetails}\n\nSubtotal: ₹${subtotal}${couponNote}\nTotal: ₹${finalTotal}\n\nPlease confirm payment and delivery details!`
    );

    window.open(`https://wa.me/919999999999?text=${text}`, '_blank');
  };

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={`cart-drawer ${isOpen ? 'open' : ''}`}
        role="complementary"
        aria-label="Shopping Cart"
        aria-hidden={!isOpen}
      >
        <div className="cart-header">
          <h2 className="cart-title">🛍️ Your Cart</h2>
          <button
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="free-shipping-bar">
          <div className="free-shipping-text">
            {remainingForFreeShipping > 0 ? (
              <span>
                Add <strong>₹{remainingForFreeShipping}</strong> more for free
                shipping! 🚚
              </span>
            ) : (
              <span>🎉 You've unlocked <strong>Free Shipping!</strong></span>
            )}
          </div>
          <div className="shipping-progress-track">
            <div
              className="shipping-progress-fill"
              style={{ width: `${shippingPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Your cart is empty!</p>
              <p className="cart-empty-sub">Add some quirky goodies ✨</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                  loading="lazy"
                />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  {item.variant && (
                    <div className="cart-item-variant">{item.variant}</div>
                  )}
                  <div className="cart-item-qty-row">
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQty(item.cartId, -1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-num">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQty(item.cartId, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-price">
                  ₹{item.price * item.qty}
                  <button
                    className="remove-item-btn"
                    onClick={() => onRemoveItem(item.cartId)}
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupon Section */}
        <div className="coupon-section">
          <div className="coupon-input-wrap">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="coupon-input"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
            />
            <button className="apply-coupon-btn" onClick={handleApplyCoupon}>
              Apply
            </button>
          </div>
          {couponStatus && (
            <p className={`coupon-msg ${couponStatus.type}`}>
              {couponStatus.msg}
            </p>
          )}
        </div>

        {/* Cart Footer */}
        <div className="cart-footer">
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          {discountAmount > 0 && (
            <div className="cart-discount" style={{ display: 'flex' }}>
              <span>Discount ({appliedCoupon}) 🎉</span>
              <span className="discount-text">-₹{discountAmount}</span>
            </div>
          )}

          <div className="cart-total">
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>

          <button
            className="checkout-btn"
            id="checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout →
          </button>
          <p className="cart-note">🔒 Direct WhatsApp Checkout · PAN India Delivery</p>
        </div>
      </aside>
    </>
  );
}
