'use client';

import React, { useState } from 'react';
import { updateSeoPageData, deleteSeoPage } from '@/actions/seo-actions';
import DynamicBlockListEditor from './DynamicBlockListEditor';

export default function SeoPageEditorForm({ slug, initialData }: { slug: string, initialData: any }) {
  const [formData, setFormData] = useState(initialData);
  const [blocks, setBlocks] = useState(initialData.dynamic_blocks || []);
  const [isPublished, setIsPublished] = useState(initialData.is_published !== false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });

    const finalData = {
      ...formData,
      dynamic_blocks: blocks,
      is_published: isPublished
    };

    const result = await updateSeoPageData(slug, finalData);
    
    if (result.success) {
      setMessage({ text: 'Page successfully updated! Changes are live.', type: 'success' });
    } else {
      setMessage({ text: 'Error updating page: ' + result.error, type: 'error' });
    }
    
    setIsSaving(false);
  };

  const handleDeletePage = async () => {
    const confirm = window.confirm("Are you sure you want to permanently delete this page? This will cause the live URL to return a 404.");
    if (!confirm) return;

    await deleteSeoPage(slug);
    window.location.href = '/engine/editor'; // redirect back
  };

  const formatLabel = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-white)', padding: '1rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
        <div>
          <strong>Status: </strong>
          <span style={{ color: isPublished ? '#065F46' : '#991B1B' }}>
            {isPublished ? 'Published (Live)' : 'Draft (Hidden)'}
          </span>
        </div>
        <button 
          type="button" 
          onClick={() => setIsPublished(!isPublished)} 
          className="btn btn-outline" 
          style={{ borderColor: isPublished ? '#991B1B' : 'var(--color-olive)', color: isPublished ? '#991B1B' : 'var(--color-olive)' }}
        >
          {isPublished ? 'Unpublish (Hide)' : 'Publish (Make Live)'}
        </button>
      </div>

      {message.text && (
        <div style={{ 
          padding: '1rem', 
          borderRadius: '4px', 
          backgroundColor: message.type === 'success' ? '#D1FAE5' : '#FEE2E2',
          color: message.type === 'success' ? '#065F46' : '#991B1B'
        }}>
          {message.text}
        </div>
      )}

      <div className="glass-card">
        <h3>Fixed Top Layout Content</h3>
        <p style={{ marginBottom: '1rem', color: 'var(--color-taupe)' }}>Edit the specific text fields for the bespoke top section of this landing page.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {Object.keys(formData).map((key) => {
             if (key === 'dynamic_blocks' || key === 'is_published') return null; // skip internal fields

             const isLongText = key.includes('p1') || key.includes('p2') || key.includes('description') || key.includes('bullet');
             return (
               <div key={key}>
                 <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-olive-dark)' }}>
                   {formatLabel(key)}
                 </label>
                 {isLongText ? (
                   <textarea 
                     name={key} 
                     value={formData[key]} 
                     onChange={handleChange} 
                     style={{ ...inputStyle, minHeight: '100px' }} 
                   />
                 ) : (
                   <input 
                     type="text" 
                     name={key} 
                     value={formData[key]} 
                     onChange={handleChange} 
                     style={inputStyle} 
                   />
                 )}
               </div>
             );
          })}
        </div>
      </div>

      <DynamicBlockListEditor blocks={blocks} onBlocksChange={setBlocks} isSeoPage={true} />

      <div style={{ position: 'sticky', bottom: '2rem', display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--color-white)', borderRadius: '8px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-oatmeal-dark)', zIndex: 10 }}>
        <button type="button" onClick={handleDeletePage} style={{ background: 'none', border: 'none', color: '#991B1B', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}>
          Danger: Delete Page Entirely
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  border: "1px solid var(--color-taupe)",
  borderRadius: "4px",
  fontFamily: "inherit",
  fontSize: "1rem",
  backgroundColor: "var(--color-white)",
  color: "var(--color-charcoal)"
};
