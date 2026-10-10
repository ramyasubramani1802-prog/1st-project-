import React from 'react';

export default function MiniAlbumsSection({ onAddToCart }) {
  return (
    <section className="albums-section" id="albums">
      <div className="container">
        <div className="albums-layout">
          <div className="albums-image-side">
            <img
              src="/assets/mini_album_product.png"
              alt="Cute mini photo album keychain with daisy flowers and pink bow"
              className="albums-hero-img"
              loading="lazy"
            />
            <div className="albums-float-badge">📷 Holds mini memories!</div>
          </div>
          <div className="albums-content-side">
            <p className="section-eyebrow">Fan favourite ♡</p>
            <h2 className="section-title">Mini Photo Albums</h2>
            <p className="albums-desc">
              Carry your favourite memories wherever you go! Our mini album
              keychains are the cutest way to keep your photos close. Each album
              holds 6–8 mini photos and comes with adorable daisy or bow
              accents.
            </p>
            <ul className="albums-features">
              <li>📸 Holds 6–8 mini photos</li>
              <li>🌼 Available in Daisy & Bow styles</li>
              <li>🎨 Multiple pastel colour options</li>
              <li>🔑 Durable stainless steel keychain attachment</li>
              <li>🎁 Perfect gifting item for besties & partners!</li>
            </ul>
            <div className="albums-price-cta">
              <div className="product-price-big">
                Starting from <strong>₹249</strong>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => onAddToCart(2)}
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
