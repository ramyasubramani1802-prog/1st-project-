import React from 'react';

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-badge-wrap">
            <span className="hero-badge floating-badge">🇮🇳 Shipping PAN India</span>
          </div>
          <p className="hero-eyebrow">Handcrafted with ♡ in India</p>
          <h1 className="hero-headline">
            Everyday Quirks<br />
            <span className="headline-accent">Brought to Life</span>
          </h1>
          <p className="hero-tagline">
            Where imagination finds form — Custom, Functional, Everyday Quirks
          </p>
          <div className="hero-cta-group">
            <button onClick={() => scrollTo('shop')} className="btn btn-primary">
              Shop Collection ✦
            </button>
            <button onClick={() => scrollTo('customizer')} className="btn btn-secondary">
              Customize Yours 🎨
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">500+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div class="stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Handcrafted</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-num">4.9★</span>
              <span className="stat-label">Avg. Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-frame">
            <img
              src="/assets/hero_banner.png"
              alt="Studio Soulkadi collection of colorful handcrafted quirky items"
              className="hero-img"
              loading="eager"
            />
            <div className="hero-float-tag tag-1">✨ Custom Name Clickers</div>
            <div className="hero-float-tag tag-2">📷 Mini Photo Albums</div>
            <div className="hero-float-tag tag-3">🎀 Keychains & More</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" onClick={() => scrollTo('categories')}>
        <span>Scroll to explore</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
}
