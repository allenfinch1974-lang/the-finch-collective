'use client';

import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

export default function StripeSetupForm({ email, name, onComplete }: { email: string, name: string, onComplete: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      // Create SetupIntent on the server
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      const { clientSecret, error: backendError } = await response.json();

      if (backendError) {
        throw new Error(backendError);
      }

      // Confirm the SetupIntent with Stripe.js
      const { error: stripeError } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name,
            email,
          },
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Success!
      onComplete();

    } catch (err: any) {
      setError(err.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ padding: '1.5rem', border: '1px solid var(--color-taupe)', borderRadius: '8px', backgroundColor: 'var(--color-white)' }}>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-charcoal)' }}>Secure Card on File</h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-sage-light)', marginBottom: '1.5rem' }}>
          Please provide a card to keep securely on file. You will not be charged today. Invoices will be sent after services are rendered.
        </p>
        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '4px', backgroundColor: '#f8fafc' }}>
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: { color: '#9e2146' },
            },
          }} />
        </div>
      </div>
      
      {error && <div style={{ color: 'red', fontSize: '0.875rem' }}>{error}</div>}
      
      <button 
        type="submit" 
        className="btn btn-primary" 
        disabled={!stripe || processing}
        style={{ width: '100%', padding: '1rem' }}
      >
        {processing ? 'Processing...' : 'Save Card & Complete Registration'}
      </button>
    </form>
  );
}
