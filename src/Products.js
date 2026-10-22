import React, { useEffect, useState, useMemo } from 'react';
import API from './api';
import { SkeletonCard } from './ProductCard';
import ProductGrid from './ProductGrid';

function Products({ searchQuery }) {
  const [masterList, setMasterList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([API.get('categories/'), API.get('products/')])
      .then(([catRes, prodRes]) => {
        const cats = Array.isArray(catRes.data) ? catRes.data : catRes.data.results || [];
        const prods = Array.isArray(prodRes.data) ? prodRes.data : prodRes.data.results || [];
        setCategories(cats);
        setMasterList(prods);
      })
      .catch(() => setError('Failed to load products. Please refresh the page.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let list = masterList;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.category_name && p.category_name.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    } else if (activeFilter !== 'All') {
      list = list.filter(p => p.category_name === activeFilter);
    }
    return list;
  }, [masterList, searchQuery, activeFilter]);

  const filterButtons = ['All', ...categories.map(c => c.name)];

  return (
    <section className="section products-section" id="products">
      <div className="products-header">
        <div>
          <div className="section-tag">Our Collection</div>
          <h2 className="section-title">
            {searchQuery
              ? <span>Results for <span className="accent">"{searchQuery}"</span></span>
              : <span>Available <span className="accent">Products</span></span>}
          </h2>
          <p className="section-subtitle">
            {searchQuery
              ? `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`
              : 'Handpicked gear for the serious rider. Quality tested, rider approved.'}
          </p>
          {!searchQuery && (
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap' }}>
              {[{ color: '#00C853', label: 'In Stock' }, { color: '#FF6D00', label: 'Limited Stock' }, { color: '#EF5350', label: 'Out of Stock' }].map(({ color, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#888' }}>
                  <span style={{ width: '8px', height: '8px', background: color, borderRadius: '50%', display: 'inline-block' }} />{label}
                </div>
              ))}
            </div>
          )}
        </div>
        {!searchQuery && (
          <div className="products-filter">
            {filterButtons.map(f => (
              <button key={f} className={'filter-btn' + (activeFilter === f ? ' active' : '')} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div style={{ background: 'rgba(211,47,47,0.1)', border: '1px solid rgba(211,47,47,0.3)', borderRadius: '12px', padding: '20px 24px', textAlign: 'center', color: '#EF5350', fontSize: '14px', marginBottom: '24px' }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="products-grid">
          {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>{searchQuery ? 'No Results Found' : 'No Products Yet'}</h3>
          <p>{searchQuery ? 'Try a different search term or browse all products.' : 'Check back soon — new gear drops weekly.'}</p>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </section>
  );
}

export default Products;