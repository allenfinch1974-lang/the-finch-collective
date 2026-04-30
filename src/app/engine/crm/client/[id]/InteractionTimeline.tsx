'use client';

import React, { useState } from 'react';
import { addInteractionLog } from '@/actions/crm-actions';

export default function InteractionTimeline({ clientId, initialLogs }: { clientId: string, initialLogs: any[] }) {
  const [logs, setLogs] = useState(initialLogs);
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    setIsSubmitting(true);
    const result = await addInteractionLog(newNote, 'Note', clientId);
    
    if (result.success && result.log) {
      setLogs([result.log, ...logs]); // add to top
      setNewNote('');
    } else {
      alert('Failed to add note');
    }
    setIsSubmitting(false);
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Note': return '#FDE68A'; // Yellow
      case 'Email': return '#BFDBFE'; // Blue
      case 'Call': return '#A7F3D0'; // Green
      case 'System': return '#E5E7EB'; // Gray
      default: return '#E5E7EB';
    }
  };

  return (
    <div className="glass-card" style={{ height: '100%' }}>
      <h2 style={{ fontSize: '1.25rem', color: 'var(--color-olive-dark)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-oatmeal)', paddingBottom: '0.5rem' }}>
        Interaction Timeline
      </h2>

      {/* Note Input */}
      <form onSubmit={handleSubmitNote} style={{ marginBottom: '2rem' }}>
        <textarea 
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Log a call, write a note, or track a milestone..."
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-taupe)', minHeight: '80px', marginBottom: '0.5rem', fontFamily: 'inherit' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={isSubmitting || !newNote.trim()} className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>
            {isSubmitting ? 'Logging...' : 'Add Note'}
          </button>
        </div>
      </form>

      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
        {/* Timeline Line */}
        <div style={{ position: 'absolute', left: '15px', top: '0', bottom: '0', width: '2px', backgroundColor: 'var(--color-oatmeal-dark)', zIndex: 0 }}></div>

        {logs.map((log: any) => (
          <div key={log.id} style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: getTypeColor(log.interaction_type), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', flexShrink: 0, border: '2px solid white' }}>
              {log.interaction_type.charAt(0)}
            </div>
            <div style={{ backgroundColor: 'var(--color-white)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-oatmeal-dark)', flex: 1, boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '0.875rem' }}>{log.interaction_type} by {log.performed_by || 'System'}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe)' }}>
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                {log.content}
              </p>
            </div>
          </div>
        ))}

        {logs.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-taupe)' }}>
            No interactions logged yet.
          </div>
        )}
      </div>
    </div>
  );
}
