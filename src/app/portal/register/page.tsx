import React from 'react';
import RegistrationWizard from '@/components/RegistrationWizard';

export const metadata = {
  title: 'Client Registration | The Finch Collective',
};

export default function RegisterPage() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: 'var(--color-charcoal)', marginBottom: '1rem', fontSize: '2.5rem' }}>Client Registration</h1>
        <p style={{ color: 'var(--color-sage-light)', fontSize: '1.125rem' }}>Please complete your profile so we can provide the best possible care for your home and pets.</p>
      </div>
      
      <RegistrationWizard />
    </div>
  );
}
