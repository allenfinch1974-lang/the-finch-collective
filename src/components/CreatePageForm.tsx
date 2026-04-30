'use client';

import React, { useState } from 'react';
import { createPage } from '@/actions/page-builder-actions';

export default function CreatePageForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Ensure slug is properly formatted
    const formattedSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

    const result = await createPage(title, formattedSlug);
    if (result.success) {
      setIsOpen(false);
      setTitle('');
      setSlug('');
    } else {
      setError(result.error || 'Failed to create page');
    }
    setIsSubmitting(false);
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
        + Create New Page
      </button>
    );
  }

  return (
    <div className="glass-card" style={{ padding: '1.5rem', width: '350px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>New Page</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {error && <div style={{ color: 'red', fontSize: '0.875rem' }}>{error}</div>}
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Page Title</label>
          <input 
            required 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} 
            placeholder="e.g. About Us"
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>URL Slug</label>
          <input 
            required 
            type="text" 
            value={slug} 
            onChange={(e) => setSlug(e.target.value)} 
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} 
            placeholder="e.g. about-us"
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ padding: '0.5rem 1rem', flex: 1 }}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
          <button type="button" onClick={() => setIsOpen(false)} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
