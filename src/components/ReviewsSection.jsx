import React from 'react';
import { REVIEWS } from '../data/products';

export default function ReviewsSection() {
  const instaImages = [
    '/assets/instagram_grid.png',
    '/assets/clicker_product.png',
    '/assets/mini_album_product.png',
    '/assets/accessories_product.png',
    '/assets/honeycomb_clicker.png',
    '/assets/boxy_clicker.png',
  ];

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">They loved it ♡</p>
          <h2 className="section-title">Happy Customers</h2>
          <p className="section-sub">Real reviews from real quirky humans 💬</p>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-stars">{'★'.repeat(review.rating)}</div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                <div
                  className="author-avatar"
                  style={{ background: review.avatarBg }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <strong>{review.name}</strong>
                  <span className="author-location">{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customer photo highlight / Instagram */}
        <div className="customer-photo-highlight">
          <h3 className="instagram-title">
            As Seen on Instagram{' '}
            <a
              href="https://instagram.com/_studio_soulkadi_"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-handle"
            >
              @_studio_soulkadi_
            </a>
          </h3>
          <div className="insta-grid">
            {instaImages.map((src, idx) => (
              <a
                key={idx}
                href="https://instagram.com/_studio_soulkadi_"
                target="_blank"
                rel="noopener noreferrer"
                className="insta-item"
              >
                <img
                  src={src}
                  alt={`Studio Soulkadi Instagram post ${idx + 1}`}
                  loading="lazy"
                />
                <div className="insta-overlay">
                  <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
          <a
            href="https://instagram.com/_studio_soulkadi_"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline insta-follow-btn"
          >
            Follow @_studio_soulkadi_ on Instagram ♡
          </a>
        </div>
      </div>
    </section>
  );
}
