import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  searchQuery,
  onClearSearch,
}) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'clicker', label: 'Clickers' },
    { id: 'album', label: 'Mini Albums' },
    { id: 'keepsake', label: 'Keepsakes' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesFilter =
        activeFilter === 'all' || product.type === activeFilter;
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [products, activeFilter, searchQuery]);

  return (
    <section className="shop-section" id="shop">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Trending now</p>
          <h2 className="section-title">Shop All Products</h2>
          <p className="section-sub">
            Pick your favourite — or let us help you build your own! 🎨
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs" role="tablist" aria-label="Product filters">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              className={`filter-tab ${activeFilter === tab.id ? 'active' : ''}`}
              role="tab"
              aria-selected={activeFilter === tab.id}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {searchQuery && (
          <div
            style={{
              textAlign: 'center',
              marginBottom: '24px',
              fontSize: '1rem',
              color: 'var(--text-mid)',
            }}
          >
            Searching for: <strong>"{searchQuery}"</strong> (
            {filteredProducts.length} results)
            <button
              onClick={onClearSearch}
              style={{
                marginLeft: '12px',
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                fontWeight: 700,
                textDecoration: 'underline',
              }}
            >
              Clear
            </button>
          </div>
        )}

        <div className="products-grid" id="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                animationDelay={idx * 0.07}
              />
            ))
          ) : (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '48px 20px',
                color: 'var(--text-mid)',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
              <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>
                No quirky products found!
              </p>
              <p style={{ marginTop: '4px' }}>
                Try searching for clickers, albums, or reset your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
