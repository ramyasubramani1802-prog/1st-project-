import React from 'react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onAddToCart,
  onRemoveFromWishlist,
}) {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={`wishlist-drawer ${isOpen ? 'open' : ''}`}
        role="complementary"
        aria-label="Wishlist Drawer"
        aria-hidden={!isOpen}
      >
        <div className="wishlist-header">
          <h2 className="wishlist-title">♡ Saved Wishlist</h2>
          <button
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close wishlist"
          >
            ✕
          </button>
        </div>

        <div className="wishlist-items-container">
          {wishlistedProducts.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🤍</div>
              <p>Your wishlist is empty!</p>
              <p className="cart-empty-sub">
                Click the heart on any product to save it here ✨
              </p>
            </div>
          ) : (
            wishlistedProducts.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="wishlist-item-img"
                  loading="lazy"
                />
                <div className="wishlist-item-info">
                  <div className="wishlist-item-name">{item.name}</div>
                  <div className="wishlist-item-price">₹{item.price}</div>
                </div>
                <button
                  className="wishlist-add-btn"
                  onClick={() => {
                    onAddToCart(item.id);
                  }}
                >
                  + Add to Cart
                </button>
                <button
                  className="wishlist-remove-btn"
                  onClick={() => onRemoveFromWishlist(item.id)}
                  title="Remove from wishlist"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
