import React from 'react';
import Link from 'next/link';
import { getSeoPageData } from '@/actions/seo-actions';
import SeoPageEditorForm from '@/components/SeoPageEditorForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SeoPageEditorRoute({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getSeoPageData(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/engine/editor" style={{ color: 'var(--color-sage)', textDecoration: 'none', fontSize: '0.875rem' }}>
          &larr; Back to Website Manager
        </Link>
        <h1 style={{ fontSize: '2rem', color: 'var(--color-olive-dark)', marginTop: '1rem' }}>
          Editing Landing Page
        </h1>
        <p style={{ color: 'var(--color-sage-light)' }}>/{resolvedParams.slug}</p>
      </div>

      <SeoPageEditorForm slug={resolvedParams.slug} initialData={data} />
    </div>
  );
}
