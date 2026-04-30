'use client';

import React, { useState } from 'react';
import { updateLeadStage } from '@/actions/crm-actions';

const STAGES = ['Inquiry', 'Consultation', 'Proposal', 'Active', 'Archived'];

export default function KanbanBoard({ initialLeads }: { initialLeads: any[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [draggedLead, setDraggedLead] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    setDraggedLead(leadId);
    e.dataTransfer.setData('text/plain', leadId);
    // Add a slight delay to allow the drag image to generate before setting opacity
    setTimeout(() => {
      e.currentTarget.classList.add('dragging');
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('dragging');
    setDraggedLead(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = async (e: React.DragEvent, stage: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    if (!leadId || !draggedLead) return;

    // Optimistic UI Update
    const previousLeads = [...leads];
    setLeads(leads.map(l => l.id === leadId ? { ...l, pipeline_stage: stage } : l));

    // Server Update
    const result = await updateLeadStage(leadId, stage);
    if (!result.success) {
      alert("Failed to update stage: " + result.error);
      setLeads(previousLeads); // Revert on failure
    }
  };

  return (
    <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', alignItems: 'flex-start' }}>
      <style>{`
        .dragging { opacity: 0.5; }
        .kanban-col { min-width: 300px; max-width: 300px; flex: 1; background-color: var(--color-white); border-radius: 12px; padding: 1rem; box-shadow: var(--shadow-sm); border-top: 4px solid var(--color-olive); }
        .kanban-card { background-color: var(--color-oatmeal-light); border-radius: 8px; padding: 1rem; margin-bottom: 1rem; cursor: grab; border: 1px solid var(--color-taupe); box-shadow: var(--shadow-sm); transition: transform 0.2s; }
        .kanban-card:active { cursor: grabbing; }
        .kanban-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
      `}</style>
      
      {STAGES.map(stage => (
        <div 
          key={stage} 
          className="kanban-col"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, stage)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem', color: 'var(--color-charcoal)' }}>{stage}</h3>
            <span style={{ backgroundColor: 'var(--color-oatmeal-dark)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: 'bold' }}>
              {leads.filter(l => l.pipeline_stage === stage || (!l.pipeline_stage && stage === 'Inquiry')).length}
            </span>
          </div>
          
          <div style={{ minHeight: '150px' }}>
            {leads.filter(l => l.pipeline_stage === stage || (!l.pipeline_stage && stage === 'Inquiry')).map(lead => (
              <div 
                key={lead.id} 
                className="kanban-card"
                draggable
                onDragStart={(e) => handleDragStart(e, lead.id)}
                onDragEnd={handleDragEnd}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--color-olive-dark)' }}>{lead.first_name} {lead.last_name}</strong>
                  <span suppressHydrationWarning style={{ fontSize: '0.75rem', color: 'var(--color-taupe)' }}>{new Date(lead.created_at).toLocaleDateString()}</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-sage)', marginBottom: '0.5rem' }}>
                  {lead.service_package}
                </div>
                {lead.start_date && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal)', display: 'inline-block', backgroundColor: 'var(--color-white)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--color-oatmeal-dark)' }}>
                    Starts: {lead.start_date}
                  </div>
                )}
              </div>
            ))}
            {leads.filter(l => l.pipeline_stage === stage || (!l.pipeline_stage && stage === 'Inquiry')).length === 0 && (
              <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--color-taupe)', fontSize: '0.875rem', border: '2px dashed var(--color-oatmeal-dark)', borderRadius: '8px' }}>
                Drop leads here
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
