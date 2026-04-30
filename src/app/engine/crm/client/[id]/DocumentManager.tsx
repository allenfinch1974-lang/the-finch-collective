'use client';

import React, { useState, useEffect } from 'react';
import { getDocumentTemplates, generateClientDocument } from '@/actions/document-actions';

export default function DocumentManager({ clientId, initialDocuments }: { clientId: string, initialDocuments: any[] }) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [templates, setTemplates] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [formData, setFormData] = useState({ title: '', client_name: '', access_method: '' });

  useEffect(() => {
    async function loadTemplates() {
      const data = await getDocumentTemplates();
      setTemplates(data);
    }
    loadTemplates();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    const variables = {
      client_name: formData.client_name,
      access_method: formData.access_method
    };

    const result = await generateClientDocument(clientId, selectedTemplate.id, formData.title, variables);
    if (result.success && result.document) {
      setDocuments([{ ...result.document, document_templates: { name: selectedTemplate.name, type: selectedTemplate.type } }, ...documents]);
      setSelectedTemplate(null);
      setFormData({ title: '', client_name: '', access_method: '' });
    } else {
      alert("Failed to generate document: " + result.error);
    }
    setIsGenerating(false);
  };

  const copyToClipboard = (token: string) => {
    const url = `${window.location.origin}/sign/${token}`;
    navigator.clipboard.writeText(url);
    alert('Signing link copied to clipboard!');
  };

  return (
    <div className="glass-card" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-oatmeal)', paddingBottom: '0.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--color-olive-dark)', margin: 0 }}>
          Documents & Contracts
        </h2>
        
        {!selectedTemplate && (
          <select 
            onChange={(e) => setSelectedTemplate(templates.find(t => t.id === e.target.value))}
            style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }}
            defaultValue=""
          >
            <option value="" disabled>+ Generate New...</option>
            {templates.map(t => (
              <option key={t.id} value={t.id}>{t.name} ({t.type})</option>
            ))}
          </select>
        )}
      </div>

      {selectedTemplate && (
        <form onSubmit={handleGenerate} style={{ backgroundColor: 'var(--color-oatmeal-light)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid var(--color-olive)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, color: 'var(--color-olive-dark)' }}>Generating: {selectedTemplate.name}</h3>
            <button type="button" onClick={() => setSelectedTemplate(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-taupe)' }}>&times; Cancel</button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Document Title</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} placeholder="e.g. 2026 Dog Walking Waiver" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Client Full Name</label>
              <input type="text" required value={formData.client_name} onChange={e => setFormData({...formData, client_name: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Home Access Method</label>
              <input type="text" required value={formData.access_method} onChange={e => setFormData({...formData, access_method: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} placeholder="e.g. Hidden Key, Garage Code 1234" />
            </div>
          </div>
          
          <button type="submit" disabled={isGenerating} className="btn btn-primary" style={{ width: '100%' }}>
            {isGenerating ? 'Generating...' : 'Generate & Create Secure Link'}
          </button>
        </form>
      )}

      {documents.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-oatmeal)', color: 'var(--color-sage-light)' }}>
              <th style={{ padding: '0.75rem' }}>Title</th>
              <th style={{ padding: '0.75rem' }}>Type</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem' }}>Date</th>
              <th style={{ padding: '0.75rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc: any) => (
              <tr key={doc.id} style={{ borderBottom: '1px solid var(--color-oatmeal)' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--color-charcoal)' }}>{doc.title}</td>
                <td style={{ padding: '0.75rem' }}>{doc.document_templates?.type}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '12px', 
                    fontSize: '0.75rem',
                    backgroundColor: doc.status === 'Signed' ? '#D1FAE5' : doc.status === 'Viewed' ? '#FEF3C7' : '#FEE2E2',
                    color: doc.status === 'Signed' ? '#065F46' : doc.status === 'Viewed' ? '#92400E' : '#991B1B'
                  }}>
                    {doc.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>{new Date(doc.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '0.75rem' }}>
                  <button onClick={() => copyToClipboard(doc.token_url)} style={{ background: 'none', border: '1px solid var(--color-olive)', borderRadius: '4px', padding: '0.2rem 0.5rem', color: 'var(--color-olive)', cursor: 'pointer', fontSize: '0.75rem' }}>
                    Copy Link
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ color: 'var(--color-taupe)', textAlign: 'center', padding: '2rem 0' }}>No documents or contracts have been generated yet.</p>
      )}
    </div>
  );
}
