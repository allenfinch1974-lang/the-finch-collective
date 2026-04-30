'use client';

import React, { useState } from 'react';
import { updateWebsiteSettings } from '@/actions/cms-actions';

export default function WebsiteEditorForm({ initialData }: { initialData: any }) {
  const [formData, setFormData] = useState(initialData || {
    hero_script_text: '',
    hero_headline: '',
    hero_subhead: '',
    hero_image_url: '',
    banner_image_url: '',
    services_intro_headline: '',
    services_intro_text: '',
    service_1_title: '',
    service_1_image_url: '',
    service_2_title: '',
    service_2_image_url: '',
    service_3_title: '',
    service_3_image_url: '',
    about_headline: '',
    about_paragraph_1: '',
    about_paragraph_2: '',
    about_image_url: ''
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });

    const result = await updateWebsiteSettings(formData);
    
    if (result.success) {
      setMessage({ text: 'Website successfully updated! Changes are live.', type: 'success' });
    } else {
      setMessage({ text: 'Error updating website: ' + result.error, type: 'error' });
    }
    
    setIsSaving(false);
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
        <h3>Hero Section (Top of Page)</h3>
        <p style={{ marginBottom: '1rem', color: 'var(--color-taupe)' }}>The first thing visitors see.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Top Banner Image URL</label>
            <input type="text" name="banner_image_url" value={formData.banner_image_url} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Hero Background Image URL</label>
            <input type="text" name="hero_image_url" value={formData.hero_image_url} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Script Text (Cursive)</label>
            <input type="text" name="hero_script_text" value={formData.hero_script_text} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Main Headline</label>
            <input type="text" name="hero_headline" value={formData.hero_headline} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Sub-headline Paragraph</label>
            <textarea name="hero_subhead" value={formData.hero_subhead} onChange={handleChange} style={{ ...inputStyle, minHeight: '80px' }} />
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3>Services Intro Section</h3>
        <p style={{ marginBottom: '1rem', color: 'var(--color-taupe)' }}>The headline above the three packages.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Services Headline</label>
            <input type="text" name="services_intro_headline" value={formData.services_intro_headline} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Services Paragraph</label>
            <textarea name="services_intro_text" value={formData.services_intro_text} onChange={handleChange} style={{ ...inputStyle, minHeight: '80px' }} />
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3>Service Packages</h3>
        <p style={{ marginBottom: '1rem', color: 'var(--color-taupe)' }}>The titles and images under each of the three packages.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Package 1 Title</label>
              <input type="text" name="service_1_title" value={formData.service_1_title} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Package 1 Image URL</label>
              <input type="text" name="service_1_image_url" value={formData.service_1_image_url} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Package 2 Title</label>
              <input type="text" name="service_2_title" value={formData.service_2_title} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Package 2 Image URL</label>
              <input type="text" name="service_2_image_url" value={formData.service_2_image_url} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Package 3 Title</label>
              <input type="text" name="service_3_title" value={formData.service_3_title} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Package 3 Image URL</label>
              <input type="text" name="service_3_image_url" value={formData.service_3_image_url} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3>Meet the Founder</h3>
        <p style={{ marginBottom: '1rem', color: 'var(--color-taupe)' }}>Your personal biography text.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>About Image URL</label>
            <input type="text" name="about_image_url" value={formData.about_image_url} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>About Headline</label>
            <input type="text" name="about_headline" value={formData.about_headline} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Paragraph 1</label>
            <textarea name="about_paragraph_1" value={formData.about_paragraph_1} onChange={handleChange} style={{ ...inputStyle, minHeight: '100px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Paragraph 2</label>
            <textarea name="about_paragraph_2" value={formData.about_paragraph_2} onChange={handleChange} style={{ ...inputStyle, minHeight: '100px' }} />
          </div>
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
