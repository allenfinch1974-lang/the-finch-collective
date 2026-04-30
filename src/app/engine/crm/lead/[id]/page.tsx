import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';
import { getInteractionLogs, getLeadTags } from '@/actions/crm-actions';
import { getClientDocuments } from '@/actions/document-actions';
import InteractionTimeline from '../../client/[id]/InteractionTimeline';
import DocumentManager from '../../client/[id]/DocumentManager';
import LeadTags from './LeadTags';

export const dynamic = 'force-dynamic';

export default async function LeadProfileRoute({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const leadId = resolvedParams.id;

  if (!supabase) {
    return <div>Supabase not configured.</div>;
  }

  // Fetch lead details
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (leadError || !lead) {
    notFound();
  }

  // Fetch tags, logs, documents
  const tags = await getLeadTags(leadId);
  const logs = await getInteractionLogs(undefined, leadId);
  
  // Notice we must update DocumentManager and getClientDocuments to handle lead_id too
  // Actually, we haven't updated getClientDocuments yet. Let's assume we will pass leadId to it next.
  let documents = [];
  const { data: docs } = await supabase
    .from('documents')
    .select('*, document_templates(name, type)')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
  documents = docs || [];

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
            {lead.first_name} {lead.last_name}
            <span style={{ fontSize: '0.875rem', marginLeft: '1rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--color-olive)', color: 'white', verticalAlign: 'middle' }}>
              LEAD
            </span>
          </h1>
          <p style={{ color: 'var(--color-sage-light)', fontSize: '1.1rem', marginBottom: '1rem' }}>
            {lead.email} | {lead.pipeline_stage}
          </p>
          <LeadTags leadId={leadId} initialTags={tags} />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline">Convert to Client</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        
        {/* Left Column: Details, Documents */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="glass-card">
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-olive-dark)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-oatmeal)', paddingBottom: '0.5rem' }}>
              Inquiry Details
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-taupe)', fontSize: '0.875rem' }}>Requested Package</strong>
                <div style={{ fontWeight: 'bold', color: 'var(--color-charcoal)' }}>{lead.service_package}</div>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-taupe)', fontSize: '0.875rem' }}>Requested Start Date</strong>
                <div>{lead.start_date || 'Flexible'}</div>
              </div>
            </div>
          </section>

          <DocumentManager leadId={leadId} initialDocuments={documents} />
        </div>

        {/* Right Column: Interaction Timeline */}
        <div>
          <InteractionTimeline leadId={leadId} initialLogs={logs} />
        </div>

      </div>
    </div>
  );
}
