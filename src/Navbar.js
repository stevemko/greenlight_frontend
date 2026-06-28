import React, { useState, useEffect, useRef } from 'react'; // ⚡ Added useRef here
import Cart from './Cart';
import logo from './logo.jpeg';

function Navbar({ cart, onUpdateCart, onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ⚡ This keeps track of the timer across renders without resetting it
  const searchTimeoutRef = useRef(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + Number(item.effective_price) * item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ⚡ Optimized: Wait for a 300ms pause before filtering the grid
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value); // Keeps the input typing perfectly smooth and instant

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      onSearch(value); // Executes the search filter once the user stops typing
    }, 300);
  };

  // ⚡ Optimized: Clear out any pending timers when resetting search
  const clearSearch = () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,200,83,0.2)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* ── Row 1: Logo + Nav links + Cart ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 24px',
        height: '68px',
      }}>

        {/* Left — circular logo */}
        <a href="#home" onClick={() => { setActive('home'); setMenuOpen(false); }} style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%',
            overflow: 'hidden', border: '2px solid #00C853',
            boxShadow: '0 0 12px rgba(0,200,83,0.5)',
            background: '#000', cursor: 'pointer',
          }}>
            <img src={logo} alt="Greenlight" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.1)' }} />
          </div>
        </a>

        {/* Center — nav links */}
        <ul className="nav-links" style={{ display: 'flex' }}>
          {['home', 'products', 'contact'].map(link => (
            <li key={link}>
              <a
                href={'#' + link}
                className={active === link ? 'active' : ''}
                onClick={() => { setActive(link); setMenuOpen(false); }}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
          <li>
            <a href="#products" className="nav-cta" onClick={() => { setActive('products'); setMenuOpen(false); }}>
              Shop Now
            </a>
          </li>
        </ul>

        {/* Right — cart + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setCartOpen(true)}
            style={{
              background: totalItems > 0 ? 'linear-gradient(135deg, #00C853, #69F0AE)' : 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px', padding: '8px 14px',
              color: totalItems > 0 ? 'black' : 'white',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              gap: '6px', fontSize: '14px', fontWeight: '700',
              fontFamily: 'Outfit, sans-serif', transition: 'all 0.3s ease',
            }}
          >
            <span>🛒</span>
            {totalItems > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{totalItems}</span>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '15px', letterSpacing: '1px' }}>
                  Ksh {total.toLocaleString()}
                </span>
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            style={{
              display: 'none',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', padding: '8px 10px',
              color: 'white', cursor: 'pointer', fontSize: '18px', lineHeight: 1,
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* ── Row 2: Search bar ── */}
      <div style={{
        padding: '8px 24px 12px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(255,255,255,0.06)',
          border: searchQuery ? '1px solid rgba(0,200,83,0.5)' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: '100px',
          padding: '10px 20px',
          width: '100%',
          maxWidth: '720px',
          transition: 'border 0.2s ease',
        }}>
          <span style={{ fontSize: '18px', flexShrink: 0 }}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by product name or category  e.g. Sportlight, Horn, Fog Light..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '14px',
              fontFamily: 'Outfit, sans-serif',
              flex: 1,
              minWidth: 0,
            }}
          />
          {searchQuery ? (
            <button
              onClick={clearSearch}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none', borderRadius: '50%',
                width: '28px', height: '28px',
                color: '#aaa', cursor: 'pointer', fontSize: '12px',
                flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ✕
            </button>
          ) : (
            <div style={{
              background: 'linear-gradient(135deg, #00C853, #69F0AE)',
              borderRadius: '100px', padding: '6px 18px',
              fontSize: '12px', fontWeight: '700', color: 'black',
              fontFamily: 'Outfit, sans-serif', flexShrink: 0,
            }}>
              Search
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div style={{
          background: 'rgba(10,10,10,0.98)',
          borderTop: '1px solid rgba(0,200,83,0.15)',
          padding: '16px 20px 24px',
          display: 'flex', flexDirection: 'column', gap: '4px',
        }}>
          {['home', 'products', 'contact'].map(link => (
            <a
              key={link}
              href={'#' + link}
              onClick={() => { setActive(link); setMenuOpen(false); }}
              style={{
                textDecoration: 'none',
                color: active === link ? '#00C853' : '#ccc',
                fontSize: '16px', fontWeight: '600',
                padding: '12px 16px', borderRadius: '10px',
                background: active === link ? 'rgba(0,200,83,0.1)' : 'transparent',
              }}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
          <a
            href="#products"
            onClick={() => { setActive('products'); setMenuOpen(false); }}
            style={{
              textDecoration: 'none', color: 'black',
              fontSize: '15px', fontWeight: '800',
              padding: '13px 16px', borderRadius: '100px',
              background: 'linear-gradient(135deg, #00C853, #69F0AE)',
              textAlign: 'center', marginTop: '8px',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Shop Now
          </a>
        </div>
      )}

      {cartOpen && (
        <Cart cart={cart} onClose={() => setCartOpen(false)} onUpdateCart={onUpdateCart} />
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

export default Navbar;