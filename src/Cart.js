import React, { useState } from 'react';

const WHATSAPP_NUMBER = '254794671494'; 
const API_URL = 'http://127.0.0.1:8000/api/';

function buildWhatsAppMessage(cart, total, orderNumber) {
  const lines = cart.map(
    item => `• ${item.name} x${item.quantity} — Ksh ${(Number(item.effective_price) * item.quantity).toLocaleString()}`
  );

  return (
    `Hello Greenlight Accessories! 👋\n\n` +
    `*Order Reference: ${orderNumber}*\n\n` +
    `*Items Ordered:*\n${lines.join('\n')}\n\n` +
    `*Total Order Value: Ksh ${total.toLocaleString()}*\n\n` +
    `I would like to arrange payment and delivery details for these items.`
  );
}

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function Cart({ cart, onClose, onUpdateCart }) {
  const total = cart.reduce((sum, item) => sum + Number(item.effective_price) * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [step, setStep] = useState('cart');

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) {
      onUpdateCart(cart.filter(item => item.id !== productId));
    } else {
      onUpdateCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQty } : item
      ));
    }
  };

  const removeItem = (productId) => onUpdateCart(cart.filter(item => item.id !== productId));

  const handleCheckout = async () => {
    setStep('loading');

    // Hardcoded fallback data to cleanly pass backend schema validation
    const orderData = {
      customer_name:  'WhatsApp Customer',
      customer_phone: '', 
      customer_email: '', 
      delivery_area:  'Arranged via WhatsApp',
      delivery_type:  'pickup', // Default to pickup to avoid arbitrary shipping fees
      payment_method: 'mpesa',
      delivery_fee:   0,
      notes:          'Direct checkout from web app',
      source:         'whatsapp',
      items: cart.map(item => ({
        product:  item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetch(`${API_URL}orders/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (res.ok) {
        const message = buildWhatsAppMessage(cart, total, data.order_number);
        openWhatsApp(message);
        setStep('done');
        onUpdateCart([]);
      } else {
        console.error('Order error:', data);
        setStep('cart');
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      // Offline fallback: Still opens WhatsApp even if your local server is down
      const message = buildWhatsAppMessage(cart, total, 'PENDING');
      openWhatsApp(message);
      setStep('done');
      onUpdateCart([]);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9000, backdropFilter: 'blur(4px)' }} />

      {/* Drawer Container */}
      <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '420px', height: '100vh', background: '#1A1A1A', zIndex: 9001, display: 'flex', flexDirection: 'column', boxShadow: '-20px 0 60px rgba(0,0,0,0.5)', animation: 'slideInRight 0.3s ease' }}>

        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifycontent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '2px', color: 'white', margin: 0 }}>
              {step === 'done' ? 'Order Placed!' : 'Your Cart'}
            </h2>
            <p style={{ color: '#888', fontSize: '13px', margin: '4px 0 0' }}>
              {step === 'cart' && `${totalItems} item${totalItems !== 1 ? 's' : ''}`}
              {step === 'loading' && 'Saving your order...'}
              {step === 'done' && 'WhatsApp is opening...'}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* ── STEP: Cart Item List ── */}
        {step === 'cart' && (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
                  <p style={{ fontSize: '16px' }}>Your cart is empty</p>
                  <p style={{ fontSize: '13px', marginTop: '8px', marginBottom: '24px' }}>Add some products to get started!</p>
                  <button onClick={onClose} style={{ padding: '10px 24px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', color: 'white', cursor: 'pointer', fontSize: '13px', fontFamily: "'Outfit', sans-serif" }}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '14px', padding: '16px', background: '#222', borderRadius: '12px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <img src={item.image} alt={item.name} style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: 'white', fontWeight: '600', fontSize: '14px', margin: '0 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                      <p style={{ color: '#00C853', fontSize: '12px', margin: '0 0 10px' }}>{item.category_name}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#2A2A2A', borderRadius: '20px', padding: '4px 8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', width: '24px', height: '24px', borderRadius: '50%', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                          <span style={{ color: 'white', fontSize: '14px', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', width: '24px', height: '24px', borderRadius: '50%', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                        </div>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', color: '#FFD600', letterSpacing: '1px' }}>
                          Ksh {(Number(item.effective_price) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="cart-remove-btn">✕</button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', background: '#111' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#888', fontSize: '13px' }}>Subtotal ({totalItems} items)</span>
                  <span style={{ color: 'white', fontSize: '13px' }}>Ksh {total.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '8px', marginBottom: '16px' }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '1px', color: 'white' }}>Total</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '1px', color: '#FFD600' }}>Ksh {total.toLocaleString()}</span>
                </div>
                
                {/* Changed onClick directly to trigger handleCheckout */}
                <button
                  onClick={handleCheckout}
                  style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #25D366, #128C7E)', color: 'white', border: 'none', borderRadius: '100px', fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: '800', cursor: 'pointer', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Checkout via WhatsApp
                </button>
                <button onClick={() => onUpdateCart([])} style={{ width: '100%', padding: '10px', background: 'transparent', color: '#888', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', cursor: 'pointer', fontSize: '13px', fontFamily: "'Outfit', sans-serif" }}>
                  Clear Cart
                </button>
              </div>
            )}
          </>
        )}

        {/* ── STEP: Loading ── */}
        {step === 'loading' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#888' }}>
            <div style={{ width: '48px', height: '48px', border: '3px solid rgba(0,200,83,0.2)', borderTopColor: '#00C853', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ fontSize: '15px' }}>Saving your order...</p>
          </div>
        )}

        {/* ── STEP: Done ── */}
        {step === 'done' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '64px' }}>🎉</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', color: 'white', letterSpacing: '1px', margin: 0 }}>Order Placed!</h3>
            <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.7' }}>
              Your order has been recorded and WhatsApp has opened. Complete your order by sending the message to us!
            </p>
            <button
              onClick={onClose}
              style={{ padding: '14px 32px', background: 'linear-gradient(135deg, #00C853, #69F0AE)', color: 'black', border: 'none', borderRadius: '100px', fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: '800', cursor: 'pointer', marginTop: '8px' }}
            >Done</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .cart-remove-btn {
          background: none; border: none; color: #555;
          cursor: pointer; fontSize: 16px; alignSelf: flex-start;
          padding: 4px; transition: color 0.2s;
        }
        .cart-remove-btn:hover {
          color: #EF5350 !important;
        }
      `}</style>
    </>
  );
}

export default Cart;