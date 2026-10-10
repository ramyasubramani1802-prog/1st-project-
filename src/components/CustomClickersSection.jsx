import React from 'react';

export default function CustomClickersSection({ onAddToCart }) {
  const styles = [
    {
      id: 1,
      badge: 'Most Popular',
      badgeClass: '',
      title: 'Interlocking Clicker',
      desc: 'The classic! Satisfying interlocking mechanism with colorful letter tiles. Enter any name or word!',
      priceText: 'Starting from ₹299',
      image: '/assets/clicker_product.png',
      alt: 'Interlocking fidget clicker keychains with custom names in pastel colors',
    },
    {
      id: 3,
      badge: 'New',
      badgeClass: 'style-new',
      title: 'Honeycomb Clicker',
      desc: 'Hexagonal honeycomb design — ultra satisfying to click, with a unique geometric look.',
      priceText: 'Starting from ₹349',
      image: '/assets/honeycomb_clicker.png',
      alt: 'Honeycomb style fidget clicker with hexagonal letter tiles',
    },
    {
      id: 4,
      badge: 'Sale',
      badgeClass: 'style-sale',
      title: 'Boxy Clicker',
      desc: 'Chunky, bold, and oh-so-satisfying. The boxy design gives a premium tactile feel.',
      priceText: '₹329',
      oldPrice: '₹399',
      image: '/assets/boxy_clicker.png',
      alt: 'Boxy style fidget clicker with bold colorful letter tiles',
    },
  ];

  return (
    <section className="clickers-section" id="clickers">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Best seller</p>
          <h2 className="section-title">Custom Fidget Clickers</h2>
          <p className="section-sub">
            Satisfying to click, beautiful to look at — and completely yours 💖
          </p>
        </div>

        <div className="clicker-styles-grid">
          {styles.map((style) => (
            <div key={style.id} className="clicker-style-card">
              <img
                src={style.image}
                alt={style.alt}
                className="clicker-img"
                loading="lazy"
              />
              <div className="clicker-style-info">
                <span className={`style-badge ${style.badgeClass}`}>
                  {style.badge}
                </span>
                <h3>{style.title}</h3>
                <p>{style.desc}</p>
                <div className="clicker-price">
                  {style.oldPrice && (
                    <>
                      <s className="price-old">{style.oldPrice}</s>{' '}
                    </>
                  )}
                  <strong>{style.priceText}</strong>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onAddToCart(style.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
