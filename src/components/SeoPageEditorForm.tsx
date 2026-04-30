'use client';

import React, { useState } from 'react';
import { updateSeoPageData } from '@/actions/seo-actions';

export default function SeoPageEditorForm({ slug, initialData }: { slug: string, initialData: any }) {
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });

    const result = await updateSeoPageData(slug, formData);
    
    if (result.success) {
      setMessage({ text: 'Page successfully updated! Changes are live.', type: 'success' });
    } else {
      setMessage({ text: 'Error updating page: ' + result.error, type: 'error' });
    }
    
    setIsSaving(false);
  };

  const formatLabel = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
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
        <h3>Page Content</h3>
        <p style={{ marginBottom: '1rem', color: 'var(--color-taupe)' }}>Edit the specific text fields for this landing page.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {Object.keys(formData).map((key) => {
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

      <div style={{ position: 'sticky', bottom: '2rem', display: 'flex', justifyContent: 'flex-end', padding: '1rem', backgroundColor: 'var(--color-white)', borderRadius: '8px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-oatmeal-dark)' }}>
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? 'Publishing...' : 'Publish to Live Website'}
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
