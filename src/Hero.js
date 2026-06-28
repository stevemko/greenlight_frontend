import React from 'react';

function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '72px',
        background: '#0A0A0A',
      }}
    >
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,200,83,0.12) 0%, transparent 70%),' +
          'radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,200,83,0.06) 0%, transparent 50%),' +
          'radial-gradient(ellipse 40% 40% at 80% 80%, rgba(0,200,83,0.06) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(0,200,83,0.04) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(0,200,83,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px 24px',
        maxWidth: '900px',
        width: '100%',
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0,200,83,0.1)',
          border: '1px solid rgba(0,200,83,0.3)',
          borderRadius: '16px',
          padding: '14px 24px',
          fontSize: '13px',
          fontWeight: '500',
          color: '#aaa',
          letterSpacing: '0.5px',
          marginBottom: '40px',
          animation: 'fadeInUp 0.6s ease both',
          maxWidth: '700px',
          lineHeight: '1.7',
          textAlign: 'center',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            background: '#00C853',
            borderRadius: '50%',
            display: 'inline-block',
            boxShadow: '0 0 8px #00C853',
            flexShrink: 0,
            animation: 'pulse 2s infinite',
          }} />
          Greenlight Accessories brings you the best motorcycle LED lights and other
          motorcycle accessories in Kenya with the best prices and quality products.
          Shop with us today and experience the difference!
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          gap: '0',
          flexWrap: 'wrap',
          justifyContent: 'center',
          animation: 'fadeInUp 0.6s 0.2s ease both',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '32px',
          width: '100%',
          maxWidth: '600px',
        }}>
          {[
            { value: '50+', label: 'Products' },
            { value: '500+', label: 'Riders Served' },
            { value: '100%', label: 'Genuine Parts' },
            { value: '24/7', label: 'Support' },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: '1 1 120px',
              textAlign: 'center',
              padding: '0 16px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '36px',
                color: '#00C853',
                lineHeight: '1',
                letterSpacing: '1px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginTop: '6px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        color: '#888',
        fontSize: '11px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        animation: 'fadeInUp 0.6s 0.4s ease both',
        zIndex: 2,
      }}>
        <span>Scroll</span>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, #00C853, transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}

export default Hero;