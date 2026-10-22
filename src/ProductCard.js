import React from 'react';
import { useNavigate } from 'react-router-dom';

export const WHATSAPP_NUMBER = '254794671494';

export function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function buildEnquiryMessage(product) {
  const price = product.is_on_sale
    ? `Ksh ${Number(product.effective_price).toLocaleString()} (was Ksh ${Number(product.price).toLocaleString()})`
    : `Ksh ${Number(product.effective_price).toLocaleString()}`;
  return (
    `Hello Greenlight Accessories! 👋\n\n` +
    `I'm interested in this product:\n\n` +
    `*Product:* ${product.name}\n` +
    `*Category:* ${product.category_name || 'Accessories'}\n` +
    `*Price:* ${price}\n` +
    `*Stock:* ${product.stock_label || product.stock_status}\n\n` +
    `🖼️ Product Image: ${product.image}\n\n` +
    `Could you please confirm availability and delivery details? Thank you!`
  );
}

export function WhatsAppBtn({ product }) {
  const handleClick = (e) => {
    e.stopPropagation();
    openWhatsApp(buildEnquiryMessage(product));
  };
  return (
    <button
      onClick={handleClick}
      title="Enquire on WhatsApp"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '6px', width: '100%', padding: '8px 0', marginTop: '8px',
        background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.35)',
        borderRadius: '100px', color: '#25D366', fontSize: '11px',
        fontWeight: '700', fontFamily: "'Outfit', sans-serif",
        letterSpacing: '0.5px', cursor: 'pointer', transition: 'all 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#25D366';
        e.currentTarget.style.color = 'white';
        e.currentTarget.style.borderColor = '#25D366';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(37,211,102,0.12)';
        e.currentTarget.style.color = '#25D366';
        e.currentTarget.style.borderColor = 'rgba(37,211,102,0.35)';
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Enquire on WhatsApp
    </button>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-image" />
      <div style={{ padding: '12px' }}>
        <div className="skeleton skeleton-line short" style={{ marginLeft: 0 }} />
        <div className="skeleton skeleton-line tall" style={{ marginLeft: 0, marginTop: 8 }} />
        <div className="skeleton skeleton-line medium" style={{ marginLeft: 0 }} />
      </div>
    </div>
  );
}

export function StockBadge({ status, label }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    padding: '3px 8px', borderRadius: '20px', fontSize: '10px',
    fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase',
    marginBottom: '8px',
  };
  if (status === 'in_stock') return (
    <div style={{ ...base, background: 'rgba(0,200,83,0.15)', border: '1px solid rgba(0,200,83,0.4)', color: '#00C853' }}>
      <span style={{ width: '6px', height: '6px', background: '#00C853', borderRadius: '50%', display: 'inline-block' }} />{label}
    </div>
  );
  if (status === 'limited') return (
    <div style={{ ...base, background: 'rgba(255,109,0,0.15)', border: '1px solid rgba(255,109,0,0.4)', color: '#FF6D00' }}>
      <span style={{ width: '6px', height: '6px', background: '#FF6D00', borderRadius: '50%', display: 'inline-block' }} />{label}
    </div>
  );
  return (
    <div style={{ ...base, background: 'rgba(211,47,47,0.15)', border: '1px solid rgba(211,47,47,0.4)', color: '#EF5350' }}>
      <span style={{ width: '6px', height: '6px', background: '#EF5350', borderRadius: '50%', display: 'inline-block' }} />{label}
    </div>
  );
}

export function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.stock_status === 'out_of_stock') return;
    window.dispatchEvent(new CustomEvent('addToCart', { detail: product }));
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const isOutOfStock = product.stock_status === 'out_of_stock';
  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div style={{ position: 'relative', height: '160px', overflow: 'hidden', background: '#222', borderRadius: '16px 16px 0 0' }}>
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" crossOrigin="anonymous" referrerPolicy="no-referrer"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: isOutOfStock ? 0.5 : 1 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top, #1A1A1A, transparent)', pointerEvents: 'none' }} />
        {product.is_on_sale && (
          <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#FF6D00', color: 'white', fontSize: '9px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '100px', zIndex: 2 }}>SALE</div>
        )}
        {isOutOfStock && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
            <span style={{ background: '#D32F2F', color: 'white', padding: '6px 14px', borderRadius: '20px', fontWeight: '800', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Out of Stock</span>
          </div>
        )}
      </div>
      <div className="product-card-body">
        <div className="product-card-category">{product.category_name || 'Accessories'}</div>
        <h3 className="product-card-name">{product.name}</h3>
        <StockBadge status={product.stock_status} label={product.stock_label} />
        <div className="product-card-footer">
          <div className="product-price">
            <span className="product-price-label">Price</span>
            <span className="product-price-value">
              <span className="product-price-currency">Ksh </span>
              {Number(product.effective_price).toLocaleString()}
            </span>
            {product.is_on_sale && (
              <span style={{ fontSize: '11px', color: '#888', textDecoration: 'line-through', display: 'block' }}>
                Ksh {Number(product.price).toLocaleString()}
              </span>
            )}
          </div>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            style={{ opacity: isOutOfStock ? 0.4 : 1, cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
          >
            {isOutOfStock ? 'Sold Out' : '+ Cart'}
          </button>
        </div>
        <WhatsAppBtn product={product} />
      </div>
    </div>
  );
}