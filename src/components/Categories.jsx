import React from 'react';

export default function Categories({ onSelectCategory }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="categories-section" id="categories">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Browse by vibe</p>
          <h2 class="section-title">Shop Our Collections</h2>
          <p className="section-sub">Every piece is made with love and a sprinkle of magic ✨</p>
        </div>

        <div className="categories-grid">
          <div
            className="category-card cat-clickers"
            role="button"
            tabIndex="0"
            onClick={() => {
              if (onSelectCategory) onSelectCategory('clicker');
              scrollTo('clickers');
            }}
          >
            <div className="cat-icon">🖱️</div>
            <h3>Custom Clickers</h3>
            <p>Honeycomb · Boxy · Standard · Interlocking</p>
            <span className="cat-cta">Shop Now →</span>
          </div>

          <div
            className="category-card cat-albums"
            role="button"
            tabIndex="0"
            onClick={() => {
              if (onSelectCategory) onSelectCategory('album');
              scrollTo('albums');
            }}
          >
            <div className="cat-icon">📷</div>
            <h3>Mini Photo Albums</h3>
            <p>Keychain-size · Daisy · Bow accents</p>
            <span className="cat-cta">Shop Now →</span>
          </div>

          <div
            className="category-card cat-keepsakes"
            role="button"
            tabIndex="0"
            onClick={() => {
              if (onSelectCategory) onSelectCategory('keepsake');
              scrollTo('keepsakes');
            }}
          >
            <div className="cat-icon">🎀</div>
            <h3>Customized Keepsakes</h3>
            <p>Name keychains · Quirky accessories</p>
            <span className="cat-cta">Shop Now →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
