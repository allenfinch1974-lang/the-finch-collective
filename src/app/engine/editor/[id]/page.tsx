import React from 'react';
import { getPageById } from '@/actions/page-builder-actions';
import PageBuilder from '@/components/PageBuilder';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function PageBuilderRoute({ params }: { params: { id: string } }) {
  const pageData = await getPageById(params.id);

  if (!pageData) {
    notFound();
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/engine/editor" style={{ color: 'var(--color-sage)', textDecoration: 'none', fontSize: '0.875rem' }}>
          &larr; Back to Page Manager
        </Link>
        <h1 style={{ fontSize: '2rem', color: 'var(--color-olive-dark)', marginTop: '1rem' }}>
          Editing: {pageData.title}
        </h1>
        <p style={{ color: 'var(--color-sage-light)' }}>/{pageData.slug}</p>
      </div>

      <PageBuilder initialPage={pageData} />
    </div>
  );
}
