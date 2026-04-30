'use client';

import React, { useState } from 'react';
import { generateClientDocument } from '@/actions/document-actions';
import { useRouter } from 'next/navigation';

export default function QuickDocumentButtons({ 
  targetId, 
  isLead, 
  templates,
  personData
}: { 
  targetId: string, 
  isLead: boolean, 
  templates: any[],
  personData: any
}) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Modal state
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [documentTitle, setDocumentTitle] = useState('');
  
  // Variables state
  const [variables, setVariables] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    client_address: '',
    service_package: '',
    access_method: ''
  });

  const openModal = (templateNameMatch: string, defaultTitle: string) => {
    const template = templates.find(t => t.name.includes(templateNameMatch));
    if (!template) {
      alert(`Template matching "${templateNameMatch}" not found in database.`);
      return;
    }
    
    setSelectedTemplate(template);
    setDocumentTitle(defaultTitle);
    
    // Pre-fill variables
    setVariables({
      client_name: `${personData.first_name || ''} ${personData.last_name || ''}`.trim(),
      client_email: personData.email || '',
      client_phone: personData.phone || '',
      client_address: personData.address || '',
      service_package: personData.service_package || 'Standard Services',
      access_method: personData.home_access_method || 'To be determined'
    });
    
    setModalOpen(true);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;

    setIsGenerating(true);
    const result = await generateClientDocument(targetId, selectedTemplate.id, documentTitle, isLead, variables);
    if (result.success) {
      setModalOpen(false);
      router.refresh(); // Refresh the page to show the new document in the list below
    } else {
      alert(`Failed to generate document: ${result.error}`);
    }
    setIsGenerating(false);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => openModal('Proposal', 'New Service Proposal')} 
          className="btn btn-outline"
        >
          Create Proposal
        </button>
        <button 
          onClick={() => openModal('Contract', 'Service Contract Agreement')} 
          className="btn btn-primary"
        >
          Create Contract
        </button>
        <button 
          onClick={() => openModal('Waiver', 'Liability Waiver & Consent')} 
          className="btn btn-outline"
          style={{ borderColor: 'var(--color-sage)', color: 'var(--color-sage-dark)' }}
        >
          Create Waiver
        </button>
      </div>

      {modalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'var(--color-oatmeal)',
            padding: '2rem',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-taupe)', paddingBottom: '1rem' }}>
              <h2 style={{ margin: 0, color: 'var(--color-olive-dark)' }}>Customize Document</h2>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--color-taupe)' }}>&times;</button>
            </div>

            <form onSubmit={handleGenerate}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Template Type</label>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-white)', borderRadius: '4px', border: '1px solid var(--color-taupe)' }}>
                  {selectedTemplate?.name}
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Document Title (Internal)</label>
                <input 
                  type="text" 
                  value={documentTitle} 
                  onChange={(e) => setDocumentTitle(e.target.value)} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }}
                  required
                />
              </div>

              <h3 style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: '1rem' }}>Variables to Inject</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Client Full Name</label>
                  <input 
                    type="text" 
                    value={variables.client_name} 
                    onChange={(e) => setVariables({...variables, client_name: e.target.value})} 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Client Email</label>
                  <input 
                    type="text" 
                    value={variables.client_email} 
                    onChange={(e) => setVariables({...variables, client_email: e.target.value})} 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Client Phone</label>
                  <input 
                    type="text" 
                    value={variables.client_phone} 
                    onChange={(e) => setVariables({...variables, client_phone: e.target.value})} 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Service Package</label>
                  <input 
                    type="text" 
                    value={variables.service_package} 
                    onChange={(e) => setVariables({...variables, service_package: e.target.value})} 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} 
                  />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Client Address</label>
                  <input 
                    type="text" 
                    value={variables.client_address} 
                    onChange={(e) => setVariables({...variables, client_address: e.target.value})} 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} 
                  />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Home Access Method</label>
                  <input 
                    type="text" 
                    value={variables.access_method} 
                    onChange={(e) => setVariables({...variables, access_method: e.target.value})} 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline" disabled={isGenerating}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isGenerating}>
                  {isGenerating ? 'Generating...' : 'Generate Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
