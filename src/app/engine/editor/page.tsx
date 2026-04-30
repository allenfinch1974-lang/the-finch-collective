import React from 'react';
import { getWebsiteSettings } from '@/actions/cms-actions';
import WebsiteEditorForm from '@/components/WebsiteEditorForm';

export const dynamic = 'force-dynamic';

export default async function WebsiteEditorPage() {
  const initialData = await getWebsiteSettings();

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--color-olive-dark)' }}>Website Editor</h1>
        <p style={{ color: 'var(--color-sage)' }}>Update the text on the public-facing Finch Collective website.</p>
      </div>

      {!initialData ? (
        <div style={{ padding: '2rem', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '8px' }}>
          <strong>Error connecting to CMS Database.</strong> Please ensure you have run the <br />
          <code>02_cms_schema.sql</code> migration in your Supabase SQL Editor.
        </div>
      ) : (
        <WebsiteEditorForm initialData={initialData} />
      )}
    </div>
  );
}
