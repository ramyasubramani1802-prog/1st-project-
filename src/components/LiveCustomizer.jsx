import React, { useState, useId } from 'react';
import confetti from 'canvas-confetti';
import {
  COLOR_THEMES,
  BASE_COLORS,
  CLICKER_STYLES,
} from '../data/products';

export default function LiveCustomizer({ onAddCustomToCart }) {
  const [customText, setCustomText] = useState('SOULKADI');
  const [clickerStyle, setClickerStyle] = useState('interlocking');
  const [colorTheme, setColorTheme] = useState('rainbow');
  const [baseColor, setBaseColor] = useState('white');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Web Audio synthetic mechanical click sound
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  const handleTextChange = (e) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);
    setCustomText(val);
    playClickSound();
  };

  const selectedStyleObj =
    CLICKER_STYLES.find((s) => s.id === clickerStyle) || CLICKER_STYLES[0];
  const selectedThemeObj = COLOR_THEMES[colorTheme] || COLOR_THEMES.rainbow;
  const selectedBaseObj = BASE_COLORS[baseColor] || BASE_COLORS.white;

  const sanitizedLetters = (customText || 'SOULKADI').split('');
  const extraLetters = Math.max(0, sanitizedLetters.length - 4);
  const calculatedPrice = selectedStyleObj.basePrice + extraLetters * 20;

  const handleAddToCart = () => {
    const text = customText.trim() || 'CUSTOM';
    const variantLabel = `${text} · ${selectedStyleObj.name} · ${selectedThemeObj.name} · ${selectedBaseObj.name} base`;

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D13B7B', '#A2C2E8', '#B5EAD7', '#FFB3C6'],
      });
    } catch {
      // Ignore if confetti not supported
    }

    onAddCustomToCart({
      cartId: `custom-${Date.now()}`,
      id: 99,
      name: `Custom ${selectedStyleObj.name} Clicker`,
      price: calculatedPrice,
      image: '/assets/clicker_product.png',
      variant: variantLabel,
      qty: 1,
    });
  };

  return (
    <section className="customizer-section" id="customizer">
      <div className="customizer-bg-blob"></div>
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">✨ Interactive Tool</p>
          <h2 className="section-title">Build Your Own Clicker</h2>
          <p className="section-sub">
            Design your perfect clicker right here — see it come to life instantly!
          </p>
        </div>

        <div className="customizer-layout">
          {/* Preview Panel */}
          <div className="customizer-preview-panel">
            <div className="preview-card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <div className="preview-label">Live Interactive Preview</div>
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.82rem',
                    color: soundEnabled ? 'var(--primary)' : '#999',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                  title="Toggle mechanical switch click sound"
                >
                  {soundEnabled ? '🔊 Sound On' : '🔇 Muted'}
                </button>
              </div>

              <div
                className="preview-clicker"
                id="preview-clicker"
                onClick={playClickSound}
                title="Click tiles to test mechanical sound!"
                style={{ cursor: 'pointer' }}
              >
                <div className="preview-tiles" id="preview-tiles">
                  {sanitizedLetters.map((char, idx) => {
                    const tileBg =
                      selectedThemeObj.palette[
                        idx % selectedThemeObj.palette.length
                      ];
                    return (
                      <div
                        key={idx}
                        className="preview-tile"
                        style={{
                          background: tileBg,
                          animationDelay: `${idx * 0.04}s`,
                        }}
                      >
                        {char}
                      </div>
                    );
                  })}
                </div>
                <div
                  className="preview-base"
                  style={{
                    background: selectedBaseObj.hex,
                    border: selectedBaseObj.border
                      ? `1px solid ${selectedBaseObj.border}`
                      : 'none',
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-mid)' }}>
                    Estimated Price:
                  </span>
                  <div
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: 'var(--primary)',
                    }}
                  >
                    ₹{calculatedPrice}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '0.78rem',
                    background: 'var(--primary-bg)',
                    color: 'var(--primary)',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontWeight: 700,
                  }}
                >
                  {sanitizedLetters.length} Letters
                </span>
              </div>
              <div className="preview-price-note">
                Base ₹{selectedStyleObj.basePrice} + ₹20/letter after 4 letters
              </div>
            </div>

            <button
              className="btn btn-primary btn-lg"
              id="add-custom-to-cart"
              onClick={handleAddToCart}
            >
              Add Custom Clicker to Cart 🛒
            </button>
          </div>

          {/* Controls */}
          <div className="customizer-controls">
            {/* Step 1: Text */}
            <div className="control-group">
              <label className="control-label" htmlFor="custom-text-input">
                <span className="step-num">01</span> Enter your name / word
              </label>
              <input
                type="text"
                id="custom-text-input"
                className="custom-text-input"
                placeholder="e.g. SOULKADI"
                value={customText}
                onChange={handleTextChange}
                maxLength={12}
                aria-describedby="char-count"
              />
              <div className="input-meta">
                <span id="char-count" className="char-count">
                  {customText.length} / 12 characters
                </span>
                <span className="input-hint">Max 12 letters · A-Z & 0-9</span>
              </div>
            </div>

            {/* Step 2: Style */}
            <div className="control-group">
              <label className="control-label">
                <span className="step-num">02</span> Choose style
              </label>
              <div
                className="style-picker"
                role="radiogroup"
                aria-label="Clicker style"
              >
                {CLICKER_STYLES.map((style) => (
                  <label
                    key={style.id}
                    className={`style-option ${clickerStyle === style.id ? 'selected' : ''}`}
                    onClick={() => {
                      setClickerStyle(style.id);
                      playClickSound();
                    }}
                  >
                    <input
                      type="radio"
                      name="clicker-style"
                      value={style.id}
                      checked={clickerStyle === style.id}
                      onChange={() => {}}
                    />
                    <span className="style-icon">{style.icon}</span>
                    <span>{style.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Color Theme */}
            <div className="control-group">
              <label className="control-label">
                <span className="step-num">03</span> Choose colour theme
              </label>
              <div
                className="color-picker"
                role="radiogroup"
                aria-label="Color theme"
              >
                {Object.entries(COLOR_THEMES).map(([key, theme]) => (
                  <label
                    key={key}
                    className={`color-swatch ${colorTheme === key ? 'selected' : ''}`}
                    title={theme.name}
                    onClick={() => {
                      setColorTheme(key);
                      playClickSound();
                    }}
                  >
                    <input
                      type="radio"
                      name="color-theme"
                      value={key}
                      checked={colorTheme === key}
                      onChange={() => {}}
                    />
                    <span
                      className="swatch-dot"
                      style={{ background: theme.gradient }}
                    />
                    <span>{theme.name.split(' ')[0]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 4: Base Color */}
            <div className="control-group">
              <label className="control-label">
                <span className="step-num">04</span> Base colour
              </label>
              <div
                className="base-picker"
                role="radiogroup"
                aria-label="Base color"
              >
                {Object.entries(BASE_COLORS).map(([key, base]) => (
                  <label
                    key={key}
                    className={`base-option ${baseColor === key ? 'selected' : ''}`}
                    onClick={() => {
                      setBaseColor(key);
                      playClickSound();
                    }}
                  >
                    <input
                      type="radio"
                      name="base-color"
                      value={key}
                      checked={baseColor === key}
                      onChange={() => {}}
                    />
                    <span
                      className="base-dot"
                      style={{
                        background: base.hex,
                        border: base.border
                          ? `2px solid ${base.border}`
                          : 'none',
                      }}
                    />
                    <span>{base.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="customizer-note">
              💬 After adding to cart, our team will reach out on WhatsApp to
              confirm your custom design and color layout!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
