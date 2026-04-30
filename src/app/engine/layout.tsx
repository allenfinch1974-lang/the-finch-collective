import React from 'react';
import Link from 'next/link';
import { Playfair_Display, Montserrat } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'Business Engine | The Finch Collective',
};

export default function EngineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-oatmeal)', fontFamily: montserrat.style.fontFamily }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', backgroundColor: 'var(--color-white)', borderRight: '1px solid var(--color-taupe)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--color-taupe)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: playfair.style.fontFamily, color: 'var(--color-olive-dark)', fontSize: '1.5rem', letterSpacing: '0.05em' }}>TFC ENGINE</h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-sage-light)', letterSpacing: '0.1em', marginTop: '0.5rem' }}>COMMAND CENTER</p>
        </div>
        
        <nav style={{ padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/engine" style={{ textDecoration: 'none', color: 'var(--color-charcoal)', fontWeight: 500, padding: '0.75rem 1rem', borderRadius: '8px', transition: 'background 0.2s' }}>
            Dashboard
          </Link>
          <Link href="/engine/crm" style={{ textDecoration: 'none', color: 'var(--color-charcoal)', fontWeight: 500, padding: '0.75rem 1rem', borderRadius: '8px', transition: 'background 0.2s' }}>
            CRM & Leads
          </Link>
          <Link href="/engine/calendar" style={{ textDecoration: 'none', color: 'var(--color-charcoal)', fontWeight: 500, padding: '0.75rem 1rem', borderRadius: '8px', transition: 'background 0.2s' }}>
            Universal Calendar
          </Link>
          <Link href="/engine/editor" style={{ textDecoration: 'none', color: 'var(--color-charcoal)', fontWeight: 500, padding: '0.75rem 1rem', borderRadius: '8px', transition: 'background 0.2s' }}>
            Website Editor (CMS)
          </Link>
          <Link href="/engine/funnels" style={{ textDecoration: 'none', color: 'var(--color-sage-light)', fontWeight: 500, padding: '0.75rem 1rem' }}>
            Marketing Funnels (Soon)
          </Link>
          <Link href="/engine/creative" style={{ textDecoration: 'none', color: 'var(--color-sage-light)', fontWeight: 500, padding: '0.75rem 1rem' }}>
            Creative Studio (Soon)
          </Link>
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-taupe)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-olive-dark)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>S</div>
            <div>
              <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Samantha Finch</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-sage-light)' }}>Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
