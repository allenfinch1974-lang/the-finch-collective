import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';
import { getInteractionLogs, getClientTags } from '@/actions/crm-actions';
import { getClientDocuments } from '@/actions/document-actions';
import InteractionTimeline from './InteractionTimeline';
import ClientTags from './ClientTags';
import DocumentManager from './DocumentManager';
import QuickDocumentButtons from '../../components/QuickDocumentButtons';
import { getDocumentTemplates } from '@/actions/document-actions';

export const dynamic = 'force-dynamic';

export default async function ClientProfileRoute({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const clientId = resolvedParams.id;

  if (!supabase) {
    return <div>Supabase not configured.</div>;
  }

  // Fetch client details
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('*')
    .eq('id', clientId)
    .single();

  if (clientError || !client) {
    notFound();
  }

  // Fetch pets
  const { data: pets } = await supabase
    .from('pets')
    .select('*')
    .eq('client_id', clientId);

  // Fetch tags, logs, documents
  const tags = await getClientTags(clientId);
  const logs = await getInteractionLogs(clientId);
  const documents = await getClientDocuments(clientId);
  const templates = await getDocumentTemplates();

  return (
    <div style={{ padding: '3rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/engine/crm" style={{ color: 'var(--color-sage)', textDecoration: 'none', fontSize: '0.875rem' }}>
          &larr; Back to CRM
        </Link>
      </div>

      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>
            {client.first_name} {client.last_name}
          </h1>
          <p style={{ color: 'var(--color-sage-light)', fontSize: '1.1rem', marginBottom: '1rem' }}>
            {client.email} | {client.phone || 'No phone provided'}
          </p>
          <ClientTags clientId={clientId} initialTags={tags} />
        </div>
        <QuickDocumentButtons targetId={clientId} isLead={false} templates={templates} />
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        
        {/* Left Column: Details, Pets, Documents */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="glass-card">
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-olive-dark)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-oatmeal)', paddingBottom: '0.5rem' }}>
              Home Details
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-taupe)', fontSize: '0.875rem' }}>Address</strong>
                <div>{client.address || 'No address provided'}</div>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-taupe)', fontSize: '0.875rem' }}>Home Access Details</strong>
                <div>{client.home_access_method || 'No access instructions provided'}</div>
              </div>
            </div>
          </section>

          <section className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-oatmeal)', paddingBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-olive-dark)', margin: 0 }}>
                Pet Profiles
              </h2>
              <button style={{ background: 'none', border: 'none', color: 'var(--color-olive)', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Pet</button>
            </div>
            
            {pets && pets.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {pets.map(pet => (
                  <div key={pet.id} style={{ padding: '1rem', backgroundColor: 'var(--color-oatmeal-light)', borderRadius: '8px', borderLeft: '4px solid var(--color-olive)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem' }}>{pet.name}</strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-taupe)' }}>{pet.species} • {pet.breed || 'Unknown Breed'}</span>
                    </div>
                    <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div><strong>Age:</strong> {pet.age || 'Unknown'}</div>
                      <div><strong>Medical:</strong> {pet.medical_notes || 'None'}</div>
                      <div><strong>Feeding:</strong> {pet.feeding_instructions || 'None'}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--color-taupe)' }}>No pets associated with this client.</p>
            )}
          </section>

          <DocumentManager clientId={clientId} initialDocuments={documents} />
        </div>

        {/* Right Column: Interaction Timeline */}
        <div>
          <InteractionTimeline clientId={clientId} initialLogs={logs} />
        </div>

      </div>
    </div>
  );
}
