import React from 'react';

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  animationDelay = 0,
}) {
  const badgeLabels = {
    bestseller: '⭐ Best Seller',
    new: '✨ New',
    sale: '🔥 Sale',
    custom: '🎨 Custom',
  };

  const savings = product.originalPrice
    ? `Save ₹${product.originalPrice - product.price}`
    : '';

  return (
    <article
      className="product-card"
      data-type={product.type}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="product-img-wrap">
        <img
          src={product.image}
          alt={product.alt}
          className="product-img"
          loading="lazy"
        />
        <div className="product-badges">
          {product.badges.map((b) => (
            <span key={b} className={`product-badge badge-${b}`}>
              {badgeLabels[b] || b}
            </span>
          ))}
        </div>

        <button
          className={`product-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          aria-label={`Toggle wishlist for ${product.name}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          style={isWishlisted ? { color: 'var(--primary)' } : {}}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>

        <div className="quick-add-overlay">
          <button
            className="quick-add-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}
          >
            + Quick Add to Cart
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-stars">
          ★★★★★ <span>{product.rating} ({product.reviews})</span>
        </div>
        <div className="product-name">{product.name}</div>
        <div className="product-type">{product.category}</div>

        <div className="product-color-dots">
          {product.colors.slice(0, 4).map((c, idx) => (
            <span
              key={idx}
              className="color-dot"
              style={{ background: c }}
              title={c}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="color-dot more">+{product.colors.length - 4}</span>
          )}
        </div>

        <div className="product-price-row">
          <span className="price-current">₹{product.price}</span>
          {product.originalPrice && (
            <span className="price-original">₹{product.originalPrice}</span>
          )}
          {savings && <span className="price-savings">{savings}</span>}
        </div>
      </div>
    </article>
  );
}
