'use client';

import React, { useState } from 'react';
import DocumentEditorModal from './DocumentEditorModal';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [documentTitle, setDocumentTitle] = useState('');

  const blocks = templates.filter(t => t.type === 'Block');

  const openModal = (templateNameMatch: string, defaultTitle: string) => {
    const template = templates.find(t => t.name.includes(templateNameMatch));
    if (!template) {
      alert(`Template matching "${templateNameMatch}" not found in database.`);
      return;
    }
    
    setSelectedTemplate(template);
    setDocumentTitle(defaultTitle);
    setModalOpen(true);
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

      <DocumentEditorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        targetId={targetId}
        isLead={isLead}
        template={selectedTemplate}
        blocks={blocks}
        personData={personData}
        initialTitle={documentTitle}
      />
    </>
  );
}
