import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from './api';
import { WhatsAppBtn, StockBadge, SkeletonCard } from './ProductCard';
import ProductGrid from './ProductGrid';

const backBtnStyle = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff', padding: '8px 16px', borderRadius: '100px', fontSize: '13px',
  cursor: 'pointer',
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    window.scrollTo(0, 0);
    API.get('products/')
      .then((res) => {
        const all = Array.isArray(res.data) ? res.data : res.data.results || [];
        const found = all.find(p => String(p.id) === String(id));
        if (!found) {
          setError('Product not found.');
          return;
        }
        setProduct(found);
        const sameCategory = all.filter(
          p => p.id !== found.id && p.category_name === found.category_name
        );
        setRelated(sameCategory.slice(0, 8));
      })
      .catch(() => setError('Could not load this product. Please try again.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stock_status === 'out_of_stock') return;
    window.dispatchEvent(new CustomEvent('addToCart', { detail: product }));
  };

  if (loading) {
    return (
      <section className="section" style={{ paddingTop: '160px' }}>
        <div className="products-grid">
          <SkeletonCard />
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="section" style={{ paddingTop: '160px', textAlign: 'center' }}>
        <h2 className="section-title">{error || 'Product not found'}</h2>
        <button onClick={() => navigate('/')} style={{ marginTop: 20, ...backBtnStyle }}>← Back to shop</button>
      </section>
    );
  }

  const isOutOfStock = product.stock_status === 'out_of_stock';

  return (
    <section className="section" style={{ paddingTop: '160px' }}>
      <button onClick={() => navigate(-1)} style={backBtnStyle}>← Back</button>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginTop: '24px' }}>
        <div style={{ flex: '1 1 360px', maxWidth: '480px' }}>
          <img src={product.image} alt={product.name}
            style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: '1 1 320px' }}>
          <div className="product-card-category">{product.category_name || 'Accessories'}</div>
          <h1 className="section-title" style={{ fontSize: '28px', margin: '8px 0' }}>{product.name}</h1>
          <StockBadge status={product.stock_status} label={product.stock_label} />
          {product.description && (
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: 1.6, margin: '12px 0 20px' }}>
              {product.description}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
            <span className="product-price-value" style={{ fontSize: '28px' }}>
              Ksh {Number(product.effective_price).toLocaleString()}
            </span>
            {product.is_on_sale && (
              <span style={{ fontSize: '15px', color: '#888', textDecoration: 'line-through' }}>
                Ksh {Number(product.price).toLocaleString()}
              </span>
            )}
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={isOutOfStock}
            style={{ width: '100%', padding: '14px', fontSize: '14px', opacity: isOutOfStock ? 0.4 : 1, cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}>
            {isOutOfStock ? 'Sold Out' : '+ Add to Cart'}
          </button>
          <WhatsAppBtn product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: '64px' }}>
          <div className="section-tag">You May Also Like</div>
          <h2 className="section-title" style={{ marginBottom: '24px' }}>Related <span className="accent">Products</span></h2>
          <ProductGrid products={related} />
        </div>
      )}
    </section>
  );
}

export default ProductDetail;