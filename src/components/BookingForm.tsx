'use client';

import React, { useState } from 'react';
import { submitInquiry } from '@/actions/crm-actions';

export default function BookingForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    const result = await submitInquiry(formData);
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <h3 style={{ color: 'var(--color-olive-dark)', marginBottom: '1rem' }}>Request Received!</h3>
        <p style={{ color: 'var(--color-sage-light)' }}>Samantha will be in touch shortly to finalize your luxury service package.</p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <input type="text" name="firstName" placeholder="First Name" style={inputStyle} required />
        <input type="text" name="lastName" placeholder="Last Name" style={inputStyle} required />
      </div>
      <input type="email" name="email" placeholder="Email Address" style={inputStyle} required />
      <select name="servicePackage" style={inputStyle} required>
        <option value="">Select a Service Package...</option>
        <option value="The Chauffeur (Dog Walking)">The Chauffeur (Dog Walking)</option>
        <option value="The Executive Suite (Pet Sitting)">The Executive Suite (Pet Sitting)</option>
        <option value="The Estate (House Sitting)">The Estate (House Sitting)</option>
      </select>
      <div style={{ display: "flex", gap: "1rem" }}>
        <input type="date" name="startDate" style={inputStyle} required />
      </div>
      {status === 'error' && <p style={{ color: 'red', fontSize: '0.875rem' }}>Something went wrong. Please try again.</p>}
      <button type="submit" className="btn btn-primary mt-4" style={{ width: "100%" }} disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting...' : 'Request Availability'}
      </button>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  border: "1px solid var(--color-taupe)",
  borderRadius: "4px",
  fontFamily: "inherit",
  fontSize: "0.875rem",
  backgroundColor: "var(--color-white)",
  color: "var(--color-charcoal)"
};
