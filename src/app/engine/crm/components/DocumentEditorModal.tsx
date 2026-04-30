'use client';

import React, { useState, useEffect } from 'react';
import { saveDocument } from '@/actions/document-actions';
import { useRouter } from 'next/navigation';

export default function DocumentEditorModal({
  isOpen,
  onClose,
  targetId,
  isLead,
  template,
  blocks,
  personData,
  existingDocumentId = undefined,
  initialContent = undefined,
  initialTitle = undefined,
  initialVariables = undefined,
  initialDeposit = 0
}: {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  isLead: boolean;
  template: any;
  blocks: any[];
  personData: any;
  existingDocumentId?: string;
  initialContent?: string;
  initialTitle?: string;
  initialVariables?: any;
  initialDeposit?: number;
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [depositAmount, setDepositAmount] = useState(0);
  
  const [variables, setVariables] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    client_address: '',
    service_package: '',
    access_method: ''
  });

  useEffect(() => {
    if (isOpen) {
      setContent(initialContent || template?.content_html || '');
      setTitle(initialTitle || (template?.name ? `New ${template.name}` : 'New Document'));
      setDepositAmount(initialDeposit || 0);
      
      setVariables(initialVariables || {
        client_name: `${personData?.first_name || ''} ${personData?.last_name || ''}`.trim(),
        client_email: personData?.email || '',
        client_phone: personData?.phone || '',
        client_address: personData?.address || '',
        service_package: personData?.service_package || 'Standard Services',
        access_method: personData?.home_access_method || 'To be determined'
      });
    }
  }, [isOpen, template, personData, initialContent, initialTitle, initialVariables, initialDeposit]);

  if (!isOpen) return null;

  const insertBlock = (blockHtml: string) => {
    setContent((prev) => prev + '\n' + blockHtml);
  };

  const handleSave = async (status: string) => {
    setIsSaving(true);
    
    // Auto-replace variables in the view to see what they look like, but we save the raw content and variables separately so they can be parsed at render time on the signature page.
    // Actually, saving custom_content_html is best done by saving exactly what the admin typed/edited. 
    
    const data = {
      title,
      template_id: template?.id,
      status,
      custom_content_html: content,
      variables_json: variables,
      deposit_amount: depositAmount,
      expires_at: null, // Could add a date picker for this later
      document_id: existingDocumentId
    };

    const result = await saveDocument(targetId, isLead, data);
    
    setIsSaving(false);
    if (result.success) {
      router.refresh();
      onClose();
    } else {
      alert(`Error saving document: ${result.error}`);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'var(--color-oatmeal)', zIndex: 9999,
      display: 'flex', flexDirection: 'column',
      fontFamily: 'sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'var(--color-white)', padding: '1rem 2rem', 
        borderBottom: '1px solid var(--color-taupe)', display: 'flex', 
        justifyContent: 'space-between', alignItems: 'center' 
      }}>
        <div>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            style={{ fontSize: '1.25rem', fontWeight: 'bold', border: 'none', borderBottom: '2px solid transparent', padding: '0.25rem', width: '400px', backgroundColor: 'transparent' }}
            placeholder="Document Title"
          />
          <p style={{ margin: '0.25rem 0 0 0.25rem', fontSize: '0.75rem', color: 'var(--color-sage-light)' }}>
            Base Template: {template?.name || 'Custom'}
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={onClose} className="btn btn-outline" disabled={isSaving}>Cancel</button>
          <button onClick={() => handleSave('Draft')} className="btn btn-outline" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save as Draft'}
          </button>
          <button onClick={() => handleSave('Sent')} className="btn btn-primary" disabled={isSaving}>
            {isSaving ? 'Generating...' : 'Generate Signature Link'}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Sidebar: Variables & Deposit */}
        <div style={{ width: '300px', borderRight: '1px solid var(--color-taupe)', padding: '1.5rem', overflowY: 'auto', backgroundColor: 'var(--color-white)' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--color-olive-dark)', textTransform: 'uppercase', marginBottom: '1rem' }}>Required Deposit</h3>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Amount ($)</label>
            <input 
              type="number" 
              value={depositAmount} 
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }}
            />
            <p style={{ fontSize: '0.7rem', color: 'var(--color-taupe)', marginTop: '0.25rem' }}>
              Clients will be redirected to Stripe to pay this immediately after signing.
            </p>
          </div>

          <h3 style={{ fontSize: '0.875rem', color: 'var(--color-olive-dark)', textTransform: 'uppercase', marginBottom: '1rem' }}>Variables</h3>
          {Object.keys(variables).map((key) => (
            <div key={key} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem', textTransform: 'capitalize' }}>
                {key.replace('_', ' ')}
              </label>
              <input 
                type="text" 
                value={(variables as any)[key]} 
                onChange={(e) => setVariables({...variables, [key]: e.target.value})}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }}
              />
            </div>
          ))}
        </div>

        {/* Center: WYSIWYG Editor */}
        <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
          <div style={{ 
            width: '100%', maxWidth: '850px', backgroundColor: 'var(--color-white)', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderRadius: '8px', 
            display: 'flex', flexDirection: 'column', minHeight: '100%' 
          }}>
            {/* Toolbar */}
            <div style={{ borderBottom: '1px solid var(--color-oatmeal)', padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => insertBlock('<b>Bold Text</b>')}>Bold</button>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => insertBlock('<i>Italic Text</i>')}>Italic</button>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => insertBlock('<h3>New Heading</h3>')}>Heading</button>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe)', alignSelf: 'center', marginLeft: 'auto' }}>
                Note: Standard HTML is supported in this editor.
              </span>
            </div>
            
            {/* Editable Area */}
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ 
                flex: 1, width: '100%', padding: '2rem', border: 'none', 
                resize: 'none', fontSize: '1rem', lineHeight: '1.6', 
                outline: 'none', fontFamily: 'monospace'
              }}
              placeholder="Start drafting document..."
            />
          </div>
        </div>

        {/* Right Sidebar: Modular Blocks */}
        <div style={{ width: '250px', borderLeft: '1px solid var(--color-taupe)', padding: '1.5rem', overflowY: 'auto', backgroundColor: 'var(--color-white)' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--color-olive-dark)', textTransform: 'uppercase', marginBottom: '1rem' }}>Block Library</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-sage-light)', marginBottom: '1rem' }}>
            Click a block to inject it into your document.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {blocks.map((block) => (
              <button 
                key={block.id}
                onClick={() => insertBlock(block.content_html)}
                style={{ 
                  textAlign: 'left', padding: '0.75rem', 
                  backgroundColor: 'var(--color-oatmeal-light)', border: '1px solid var(--color-taupe)', 
                  borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', transition: 'background 0.2s'
                }}
              >
                <strong>{block.name}</strong>
              </button>
            ))}
            {blocks.length === 0 && <p style={{ fontSize: '0.75rem' }}>No modular blocks found.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}
