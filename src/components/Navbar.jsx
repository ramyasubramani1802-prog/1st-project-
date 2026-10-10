import React, { useState, useEffect } from 'react';

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSearch,
  searchQuery,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'shop', 'clickers', 'customizer', 'albums', 'reviews', 'about'];
      const scrollY = window.scrollY + 120;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', id: 'home', label: 'Home' },
    { href: '#shop', id: 'shop', label: 'Shop All' },
    { href: '#clickers', id: 'clickers', label: 'Custom Clickers' },
    { href: '#customizer', id: 'customizer', label: 'Customizer' },
    { href: '#albums', id: 'albums', label: 'Mini Albums' },
    { href: '#reviews', id: 'reviews', label: 'Reviews' },
    { href: '#about', id: 'about', label: 'About' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  const searchSuggestions = [
    'Interlocking Clicker',
    'Mini Album',
    'Honeycomb Clicker',
    'Boxy Clicker',
    'Name Keychain',
    'Custom Gift',
  ];

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <a
          href="#home"
          className="nav-logo"
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label="Studio Soulkadi Home"
        >
          <span className="logo-icon">✦</span>
          <span className="logo-text">
            Studio <em>Soulkadi</em>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="nav-links" role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Nav Actions */}
        <div className="nav-actions">
          <button
            className="nav-search-btn"
            id="search-toggle-btn"
            aria-label="Search"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          <button
            className="nav-icon-btn wishlist-btn"
            id="wishlist-btn"
            aria-label="Wishlist"
            onClick={onOpenWishlist}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="wishlist-badge">{wishlistCount}</span>
            )}
          </button>

          <button
            className="nav-icon-btn cart-btn"
            id="open-cart-btn"
            aria-label="Open shopping cart"
            onClick={onOpenCart}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button
            className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            id="hamburger-btn"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Search Bar Dropdown */}
      <div className={`search-dropdown ${searchOpen ? 'open' : ''}`} aria-hidden={!searchOpen}>
        <div className="container">
          <input
            type="search"
            id="search-input"
            placeholder="Search for clickers, albums, keychains…"
            className="search-field"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search products"
          />
          <div className="search-suggestions">
            {searchSuggestions.map((item, idx) => (
              <span
                key={idx}
                className="search-suggestion-chip"
                role="button"
                tabIndex="0"
                onClick={() => {
                  onSearch(item);
                  const shop = document.getElementById('shop');
                  if (shop) shop.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="mobile-nav-link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
