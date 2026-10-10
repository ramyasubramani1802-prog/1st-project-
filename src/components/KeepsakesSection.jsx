import React from 'react';

export default function KeepsakesSection({ onAddToCart }) {
  return (
    <section className="keepsakes-section" id="keepsakes">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Quirky & cute</p>
          <h2 className="section-title">Customized Keepsakes</h2>
          <p className="section-sub">
            From kawaii bookmarks to name tags — there's something for every vibe 🌈
          </p>
        </div>
        <div className="keepsakes-grid">
          <div className="keepsake-item">
            <img
              src="/assets/accessories_product.png"
              alt="Collection of quirky kawaii accessories and name keychains"
              className="keepsake-img"
              loading="lazy"
            />
            <h3>Custom Keepsakes & Accessories</h3>
            <p>Name keychains, bookmarks, boba clickers & cute gift sets</p>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => onAddToCart(5)}
            >
              Shop Keepsakes (₹399)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
