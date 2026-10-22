import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Products from './Products';
import ProductDetail from './ProductDetail';
import Cart from './Cart';

function Cursor() {
  const cursorRef = React.useRef(null);
  const ringRef = React.useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      if (ringRef.current) {
        setTimeout(() => {
          ringRef.current.style.left = e.clientX + 'px';
          ringRef.current.style.top = e.clientY + 'px';
        }, 80);
      }
    };
    const over = () => { cursorRef.current?.classList.add('hover'); ringRef.current?.classList.add('hover'); };
    const out = () => { cursorRef.current?.classList.remove('hover'); ringRef.current?.classList.remove('hover'); };
    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', over);
      el.addEventListener('mouseleave', out);
    });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
    </div>
  );
}

function Intro() {
  const points = ['Same-day delivery in Nairobi', '7-day easy returns', 'Genuine products'];

  return (
    <section className="hero" id="home">
      <div className="hero-glow" />
      <div className="hero-inner">
        <div className="hero-text">
          <div className="section-tag">Greenlight LED Accessories</div>
          <h1 className="section-title hero-title">
            Quality Motorcycle <span className="accent">LED Accessories</span> in Kenya
          </h1>
          <p className="section-subtitle hero-sub">
            Shop headlights, spotlights, indicators, side mirrors and more for your
            motorcycle. Order online with same-day delivery in Nairobi.
          </p>
          <div className="hero-actions">
            <a href="#products" className="hero-btn hero-btn-primary">Shop Now</a>
            <a href="tel:+254794671494" className="hero-btn hero-btn-ghost">Call Us</a>
          </div>
          <ul className="hero-points">
            {points.map(p => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <div className="hero-visual">
          <img
            src={`${process.env.PUBLIC_URL}/site-icon.jpeg`}
            alt="Greenlight LED Accessories logo"
            width="400"
            height="400"
          />
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: '🛡️', title: 'Genuine Products', desc: 'Every item is sourced directly from verified manufacturers.' },
    { icon: '🚀', title: 'Fast Delivery', desc: 'Same-day delivery available within Nairobi.' },
    { icon: '🔧', title: 'Expert Advice', desc: 'Our riders help you pick the right gear every time.' },
    { icon: '↩️', title: 'Easy Returns', desc: '7-day hassle-free return policy on all products.' },
  ];
  return (
    <div className="features-strip">
      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-item" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const contactLinkStyle = {
  fontSize: 15,
  fontWeight: 600,
  color: 'var(--white)',
  marginTop: 4,
  display: 'block',
  textDecoration: 'underline',
};

function Contact() {
  const contacts = [
    {
      icon: '📞',
      label: 'Call Us',
      phones: [
        { text: '0794 671 494', href: 'tel:+254794671494' },
        { text: '0713 928 667', href: 'tel:+254713928667' },
      ],
    },
    { icon: '📍', label: 'Location', value: 'Nairobi, Kenya', link: 'https://maps.app.goo.gl/cFTexcWoPY4MkeJ77' },
  ];

  return (
    <section className="section" id="contact" style={{ background: 'var(--dark2)' }}>
      <div className="section-tag">Get In Touch</div>
      <h2 className="section-title">Contact <span className="accent">Us</span></h2>
      <p className="section-subtitle" style={{ marginBottom: 40 }}>
        Have a question or need help choosing the right LED accessories? We are here for you.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {contacts.map((c, i) => (
          <div key={i} style={{
            background: 'var(--dark3)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 'var(--radius)',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flex: '1 1 220px',
          }}>
            <div style={{ fontSize: 28 }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{c.label}</div>
              {c.phones ? (
                c.phones.map(p => (
                  <a key={p.href} href={p.href} style={contactLinkStyle}>{p.text}</a>
                ))
              ) : c.link ? (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={contactLinkStyle}
                >
                  {c.value}
                </a>
              ) : (
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--white)', marginTop: 4 }}>{c.value}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="nav-logo">
            <div className="nav-logo-icon">G</div>
            <div className="nav-logo-text">Green<span>light</span></div>
          </div>
          <p>Your trusted source for quality motorcycle LED accessories in Kenya. Built by riders, for riders.</p>
        </div>
        <div>
          <div className="footer-heading">Quick Links</div>
          <ul className="footer-links">
            {quickLinks.map(l => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="footer-heading">Categories</div>
          <ul className="footer-links">
            {['Headlights', 'Spotlights', 'Indicators', 'Side Mirrors'].map(l => (
              <li key={l}><a href="#products">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">2026 <span>Greenlight LED Accessories</span>. All rights reserved.</div>
        <div className="footer-socials">
          {['📘', '📷', '🐦', '▶️'].map((icon, i) => (
            <button key={i} className="social-btn" type="button" aria-label="Social media link">{icon}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Home({ searchQuery }) {
  return (
    <>
      <Intro />
      <Products searchQuery={searchQuery} />
      <Contact />
      <Features />
    </>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + Number(item.effective_price) * item.quantity, 0);

  useEffect(() => {
    const handler = (e) => {
      const product = e.detail;
      setCart(prev => {
        const exists = prev.find(item => item.id === product.id);
        if (exists) {
          return prev.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      setToast(product.name);
      setTimeout(() => setToast(null), 3000);
    };
    window.addEventListener('addToCart', handler);
    return () => window.removeEventListener('addToCart', handler);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Cursor />
        <Navbar cart={cart} onUpdateCart={setCart} onSearch={setSearchQuery} />

        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>

        <Footer />

        {totalItems > 0 && (
          <button className="floating-cart" onClick={() => setCartOpen(true)}>
            <span>🛒</span>
            <span className="floating-cart-badge">{totalItems}</span>
            <span className="floating-cart-total">Ksh {total.toLocaleString()}</span>
          </button>
        )}

        {cartOpen && (
          <Cart cart={cart} onClose={() => setCartOpen(false)} onUpdateCart={setCart} />
        )}

        {toast && (
          <div className="toast">
            <span className="toast-icon">✅</span>
            <span><strong>{toast}</strong> added to cart!</span>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;