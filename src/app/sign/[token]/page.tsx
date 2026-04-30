import React from 'react';
import { getDocumentByToken } from '@/actions/document-actions';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import SignatureForm from './SignatureForm';

export const dynamic = 'force-dynamic';

export default async function PublicSignaturePage({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = await params;
  const token = resolvedParams.token;
  
  const document = await getDocumentByToken(token);
  
  if (!document) {
    notFound();
  }

  // Inject variables into HTML
  let htmlContent = document.document_templates.content_html;
  const variables = document.variables_json || {};
  
  for (const [key, value] of Object.entries(variables)) {
    htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  }

  // Get IP and User Agent for compliance audit trail
  const headersList = await headers();
  const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '127.0.0.1';
  const userAgent = headersList.get('user-agent') || 'Unknown';

  return (
    <div style={{ backgroundColor: 'var(--color-oatmeal)', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="script-font" style={{ fontSize: '2.5rem', color: 'var(--color-olive-dark)' }}>The Finch Collective</h1>
          <p style={{ color: 'var(--color-charcoal)', fontWeight: 'bold' }}>Secure Document Portal</p>
        </header>

        <main className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', backgroundColor: 'var(--color-white)' }}>
          <div style={{ borderBottom: '2px solid var(--color-oatmeal-dark)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--color-charcoal)' }}>{document.title}</h2>
            <p style={{ margin: 0, color: 'var(--color-taupe)' }}>
              Prepared for: <strong>{document.clients?.first_name || document.leads?.first_name} {document.clients?.last_name || document.leads?.last_name}</strong>
            </p>
          </div>

          {/* The Document Content */}
          {document.file_url ? (
            <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--color-oatmeal-light)', borderRadius: '8px', border: '1px solid var(--color-taupe)' }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Attached Document</h3>
              <p style={{ marginBottom: '1.5rem' }}>Please review the attached document before signing below.</p>
              <a href={document.file_url} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-block', textDecoration: 'none' }}>
                📄 Open Document
              </a>
            </div>
          ) : (
            <div 
              style={{ fontSize: '1rem', color: 'var(--color-charcoal)' }}
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
          )}
        </main>

        {document.status === 'Signed' ? (
          <div className="glass-card" style={{ backgroundColor: '#D1FAE5', border: '1px solid #059669', textAlign: 'center' }}>
            <h3 style={{ color: '#065F46', margin: '0 0 0.5rem 0' }}>✓ Document Signed</h3>
            <p style={{ margin: 0, color: '#065F46' }}>Thank you. This document has been legally executed and filed.</p>
          </div>
        ) : (
          <SignatureForm 
            documentId={document.id} 
            ipAddress={ipAddress} 
            userAgent={userAgent} 
          />
        )}
        
        <footer style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.75rem', color: 'var(--color-taupe)' }}>
          <p>Protected by UETA & ESIGN Act Compliance</p>
          <p>IP: {ipAddress}</p>
        </footer>
      </div>
    </div>
  );
}
