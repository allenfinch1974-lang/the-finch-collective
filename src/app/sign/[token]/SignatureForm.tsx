'use client';

import React, { useState } from 'react';
import { signDocument } from '@/actions/document-actions';
import { useRouter } from 'next/navigation';

export default function SignatureForm({ documentId, ipAddress, userAgent }: { documentId: string, ipAddress: string, userAgent: string }) {
  const [signature, setSignature] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signature.trim() || !agreed) return;

    setIsSubmitting(true);
    
    // Call the server action to legally bind the signature
    const result = await signDocument(documentId, signature, ipAddress, userAgent);
    
    if (result.success) {
      // Refresh the page to show the "Signed" success state
      router.refresh();
    } else {
      alert("Failed to process signature: " + result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card" style={{ borderTop: '4px solid var(--color-olive)' }}>
      <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-olive-dark)' }}>Execute Agreement</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', marginBottom: '1.5rem' }}>
        By typing your full legal name below, you are electronically signing this document. This signature is legally binding and carries the same weight as a physical handwritten signature under the ESIGN Act.
      </p>

      <form onSubmit={handleSign}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Electronic Signature (Type Full Name)</label>
          <input 
            type="text" 
            required 
            value={signature} 
            onChange={(e) => setSignature(e.target.value)} 
            placeholder="Jane Doe"
            style={{ 
              width: '100%', 
              padding: '1rem', 
              fontSize: '1.25rem', 
              fontFamily: '"Satisfy", cursive', // Give it a signed look!
              borderRadius: '8px', 
              border: '2px solid var(--color-olive)',
              backgroundColor: 'var(--color-white)'
            }} 
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '2rem' }}>
          <input 
            type="checkbox" 
            id="agree" 
            required
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ marginTop: '0.25rem', width: '20px', height: '20px', accentColor: 'var(--color-olive)' }}
          />
          <label htmlFor="agree" style={{ fontSize: '0.875rem', lineHeight: 1.5, cursor: 'pointer' }}>
            I agree to use electronic records and signatures, and I understand that by checking this box and clicking "Sign Document", I am legally bound by the terms outlined above.
          </label>
        </div>

        <button 
          type="submit" 
          disabled={!agreed || !signature.trim() || isSubmitting} 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
        >
          {isSubmitting ? 'Processing...' : 'Sign & Submit Document'}
        </button>
      </form>
    </div>
  );
}
