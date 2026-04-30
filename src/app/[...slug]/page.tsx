import React from 'react';
import { getPageBySlug } from '@/actions/page-builder-actions';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/BlockRenderer';

export const dynamic = 'force-dynamic';

export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const path = resolvedParams.slug.join('/');
  const pageData = await getPageBySlug(path);

  // If page doesn't exist or isn't published, throw a 404.
  if (!pageData || !pageData.is_published) {
    notFound();
  }

  return (
    <main>
      <BlockRenderer blocks={pageData.blocks} />
    </main>
  );
}
