import React from 'react';
import Link from 'next/link';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-oatmeal)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-taupe)', backgroundColor: 'var(--color-white)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.4em', fontFamily: 'var(--font-montserrat)', color: 'var(--color-charcoal)', marginRight: '-0.4em', fontWeight: 500 }}>THE</span>
          <span style={{ fontSize: '2.2rem', letterSpacing: '0.15em', fontFamily: 'var(--font-lora)', color: 'var(--color-olive-dark)', margin: '0.2rem 0', marginRight: '-0.15em' }}>FINCH</span>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.5em', fontFamily: 'var(--font-montserrat)', color: 'var(--color-charcoal)', marginRight: '-0.5em', fontWeight: 500 }}>COLLECTIVE</span>
        </Link>
        <div style={{ color: 'var(--color-sage-light)', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Client Portal
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          {children}
        </div>
      </main>

      <footer style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--color-olive-dark)', color: 'var(--color-oatmeal)' }}>
        <p style={{ fontSize: '0.875rem' }}>Every detail matters to us—thank you for trusting The Finch Collective.</p>
      </footer>
    </div>
  );
}
