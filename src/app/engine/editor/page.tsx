import React from 'react';
import Link from 'next/link';
import { getAllPages } from '@/actions/page-builder-actions';
import CreatePageForm from '@/components/CreatePageForm';

export const dynamic = 'force-dynamic';

export default async function PageManager() {
  const pages = await getAllPages();

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-olive-dark)' }}>Website Manager</h1>
          <p style={{ color: 'var(--color-sage)' }}>Manage your static homepage or build new dynamic pages.</p>
        </div>
        <CreatePageForm />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* The Homepage (Bespoke) */}
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0 }}>Homepage</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-sage-light)', margin: 0 }}>/</p>
          </div>
          <div>
            <span style={{ display: 'inline-block', padding: '0.25rem 0.5rem', backgroundColor: '#D1FAE5', color: '#065F46', fontSize: '0.75rem', borderRadius: '4px', marginRight: '1rem' }}>Published</span>
            <Link href="/engine/editor/homepage" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
              Edit Homepage
            </Link>
          </div>
        </div>

        {/* SEO Landing Pages */}
        <h2 style={{ fontSize: '1.25rem', marginTop: '1rem', marginBottom: '0.5rem' }}>SEO Landing Pages</h2>
        
        {['southern-pines', 'forest-creek', 'pinehurst-no-2', 'service-area', 'alternative-to-rover-pinehurst'].map(slug => (
          <div key={slug} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0 }}>{slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-sage-light)', margin: 0 }}>/{slug}</p>
            </div>
            <div>
              <span style={{ display: 'inline-block', padding: '0.25rem 0.5rem', backgroundColor: '#D1FAE5', color: '#065F46', fontSize: '0.75rem', borderRadius: '4px', marginRight: '1rem' }}>Published</span>
              <Link href={`/engine/editor/seo/${slug}`} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                Edit Landing Page
              </Link>
            </div>
          </div>
        ))}

        {/* Dynamic Pages */}
        <h2 style={{ fontSize: '1.25rem', marginTop: '1rem', marginBottom: '0.5rem' }}>Custom Pages</h2>
        {pages?.map((page: any) => (
          <div key={page.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0 }}>{page.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-sage-light)', margin: 0 }}>/{page.slug}</p>
            </div>
            <div>
              <span style={{ display: 'inline-block', padding: '0.25rem 0.5rem', backgroundColor: page.is_published ? '#D1FAE5' : '#FEE2E2', color: page.is_published ? '#065F46' : '#991B1B', fontSize: '0.75rem', borderRadius: '4px', marginRight: '1rem' }}>
                {page.is_published ? 'Published' : 'Draft'}
              </span>
              <Link href={`/engine/editor/${page.id}`} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                Builder
              </Link>
            </div>
          </div>
        ))}

        {pages && pages.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--color-taupe)', padding: '2rem' }}>No dynamic pages created yet.</p>
        )}
      </div>
    </div>
  );
}
