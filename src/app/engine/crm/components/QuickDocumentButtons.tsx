'use client';

import React, { useState } from 'react';
import { generateClientDocument } from '@/actions/document-actions';

export default function QuickDocumentButtons({ 
  targetId, 
  isLead, 
  templates 
}: { 
  targetId: string, 
  isLead: boolean, 
  templates: any[] 
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCreate = async (templateNameMatch: string, title: string) => {
    const template = templates.find(t => t.name.includes(templateNameMatch));
    if (!template) {
      alert(`Template matching "${templateNameMatch}" not found in database.`);
      return;
    }

    setIsGenerating(true);
    const result = await generateClientDocument(targetId, template.id, title, isLead);
    if (result.success) {
      alert(`${title} generated successfully! Check the Documents & Contracts list below.`);
    } else {
      alert(`Failed to generate document: ${result.error}`);
    }
    setIsGenerating(false);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <button 
        onClick={() => handleCreate('Proposal', 'New Service Proposal')} 
        disabled={isGenerating}
        className="btn btn-outline"
      >
        {isGenerating ? 'Generating...' : 'Create Proposal'}
      </button>
      <button 
        onClick={() => handleCreate('Contract', 'Service Contract Agreement')} 
        disabled={isGenerating}
        className="btn btn-primary"
      >
        {isGenerating ? 'Generating...' : 'Create Contract'}
      </button>
      <button 
        onClick={() => handleCreate('Waiver', 'Liability Waiver & Consent')} 
        disabled={isGenerating}
        className="btn btn-outline"
        style={{ borderColor: 'var(--color-sage)', color: 'var(--color-sage-dark)' }}
      >
        {isGenerating ? 'Generating...' : 'Create Waiver'}
      </button>
    </div>
  );
}
