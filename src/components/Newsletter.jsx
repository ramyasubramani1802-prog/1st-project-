import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function Newsletter({ onShowToast }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast('Please enter a valid email address.', 'error');
      return;
    }

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
      });
    } catch {
      // Ignore if confetti not supported
    }

    setSubscribed(true);
    onShowToast('🎉 Subscribed! Use code SOULKADI10 for 10% off.', 'success');
    setEmail('');
  };

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-content">
            <div className="newsletter-emoji">🎉</div>
            <h2>Get 10% Off Your First Order!</h2>
            <p>
              Subscribe to our newsletter for exclusive deals, new launches, and
              behind-the-scenes studio magic.
            </p>
            {subscribed ? (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '16px 24px',
                  borderRadius: '16px',
                  display: 'inline-block',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  marginTop: '12px',
                }}
              >
                ✨ Thank you for subscribing! Use coupon{' '}
                <span
                  style={{
                    background: 'var(--primary-bg)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontFamily: 'monospace',
                  }}
                >
                  SOULKADI10
                </span>{' '}
                at checkout.
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn-primary newsletter-btn">
                  Subscribe ✦
                </button>
              </form>
            )}
            <p className="newsletter-fine">No spam, ever. Unsubscribe anytime 💖</p>
          </div>
          <div className="newsletter-deco" aria-hidden="true">
            <span>✨</span>
            <span>🌸</span>
            <span>🎀</span>
            <span>⭐</span>
            <span>💖</span>
          </div>
        </div>
      </div>
    </section>
  );
}
