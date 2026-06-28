import React, { useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';

function ProductGrid({ products }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index || 0);
            setTimeout(() => entry.target.querySelector('.product-card')?.classList.add('visible'), (idx % 10) * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    gridRef.current.querySelectorAll('.product-card-wrapper').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [products.length]);

  return (
    <div className="products-grid" ref={gridRef}>
      {products.map((product, i) => (
        <div key={product.id} data-index={i} className="product-card-wrapper">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;