'use client';

import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeSetupForm from './StripeSetupForm';
import { submitRegistration } from '@/actions/portal-actions';

// Replace with the actual Stripe Publishable Key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock');

export default function RegistrationWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateData = (newData: any) => setFormData({ ...formData, ...newData });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleFinalize = async () => {
    setIsSubmitting(true);
    const result = await submitRegistration(formData);
    if (result.success) {
      setIsSuccess(true);
    } else {
      alert("Registration failed: " + result.error);
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ color: 'var(--color-olive-dark)', marginBottom: '1rem' }}>Welcome to The Finch Collective!</h2>
        <p style={{ color: 'var(--color-sage-light)', marginBottom: '2rem' }}>Your detailed profile and payment method have been securely saved.</p>
        <button className="btn btn-primary">Go to My Portal</button>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid var(--color-olive)' }}>
      {/* Progress Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {[1, 2, 3, 4].map(num => (
          <div key={num} style={{ height: '4px', flex: 1, backgroundColor: step >= num ? 'var(--color-olive)' : 'var(--color-taupe)', borderRadius: '2px', transition: 'background 0.3s' }} />
        ))}
      </div>

      <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
        {step === 1 && "Client Information"}
        {step === 2 && "Pet Profile & Health"}
        {step === 3 && "Behavior & Routine"}
        {step === 4 && "Secure Payment Setup"}
      </h2>

      {/* STEP 1: Client Info & Home Access */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="First Name" style={inputStyle} value={formData.firstName || ''} onChange={e => updateData({ firstName: e.target.value })} />
            <input type="text" placeholder="Last Name" style={inputStyle} value={formData.lastName || ''} onChange={e => updateData({ lastName: e.target.value })} />
          </div>
          <input type="email" placeholder="Email Address" style={inputStyle} value={formData.email || ''} onChange={e => updateData({ email: e.target.value })} />
          <input type="tel" placeholder="Phone Number" style={inputStyle} value={formData.phone || ''} onChange={e => updateData({ phone: e.target.value })} />
          
          <h4 style={{ marginTop: '1rem', borderBottom: '1px solid var(--color-taupe)', paddingBottom: '0.5rem' }}>Home Access</h4>
          <select style={inputStyle} value={formData.homeAccessMethod || ''} onChange={e => updateData({ homeAccessMethod: e.target.value })}>
            <option value="">How will we access your home?</option>
            <option value="Key">Key</option>
            <option value="Lockbox">Lockbox</option>
            <option value="Garage Code">Garage Code</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" placeholder="Where will the key be located?" style={inputStyle} value={formData.homeKeyLocation || ''} onChange={e => updateData({ homeKeyLocation: e.target.value })} />
          <textarea placeholder="Home Instructions or Alarm Codes" rows={3} style={inputStyle} value={formData.homeInstructions || ''} onChange={e => updateData({ homeInstructions: e.target.value })} />
          
          <button className="btn btn-primary" onClick={nextStep}>Continue to Pet Profile</button>
        </div>
      )}

      {/* STEP 2: Pet Profile & Health */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="Pet Name" style={inputStyle} value={formData.petName || ''} onChange={e => updateData({ petName: e.target.value })} />
            <select style={inputStyle} value={formData.species || ''} onChange={e => updateData({ species: e.target.value })}>
              <option value="">Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="Breed" style={inputStyle} value={formData.breed || ''} onChange={e => updateData({ breed: e.target.value })} />
            <input type="text" placeholder="Age" style={inputStyle} value={formData.age || ''} onChange={e => updateData({ age: e.target.value })} />
            <input type="text" placeholder="Weight" style={inputStyle} value={formData.weight || ''} onChange={e => updateData({ weight: e.target.value })} />
          </div>

          <h4 style={{ marginTop: '1rem', borderBottom: '1px solid var(--color-taupe)', paddingBottom: '0.5rem' }}>Health & Safety</h4>
          <input type="text" placeholder="Veterinarian Name" style={inputStyle} value={formData.veterinarianName || ''} onChange={e => updateData({ veterinarianName: e.target.value })} />
          <input type="text" placeholder="Veterinarian Phone" style={inputStyle} value={formData.veterinarianPhone || ''} onChange={e => updateData({ veterinarianPhone: e.target.value })} />
          <textarea placeholder="List any medical conditions, allergies, or medications" rows={3} style={inputStyle} value={formData.medicalConditions || ''} onChange={e => updateData({ medicalConditions: e.target.value })} />

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={prevStep}>Back</button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={nextStep}>Continue to Behavior</button>
          </div>
        </div>
      )}

      {/* STEP 3: Behavior & Routine */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h4 style={{ borderBottom: '1px solid var(--color-taupe)', paddingBottom: '0.5rem' }}>Behavior & Temperament</h4>
          <textarea placeholder="How would you describe your pet's personality?" rows={2} style={inputStyle} value={formData.personality || ''} onChange={e => updateData({ personality: e.target.value })} />
          <textarea placeholder="Any fears, triggers, or stress behaviors?" rows={2} style={inputStyle} value={formData.fearsTriggers || ''} onChange={e => updateData({ fearsTriggers: e.target.value })} />

          <h4 style={{ marginTop: '1rem', borderBottom: '1px solid var(--color-taupe)', paddingBottom: '0.5rem' }}>Routine & Care</h4>
          <input type="text" placeholder="Feeding Schedule" style={inputStyle} value={formData.feedingSchedule || ''} onChange={e => updateData({ feedingSchedule: e.target.value })} />
          <input type="text" placeholder="Food Type & Amount" style={inputStyle} value={formData.foodTypeAmount || ''} onChange={e => updateData({ foodTypeAmount: e.target.value })} />
          <input type="text" placeholder="Walk Schedule & Potty Break Routine" style={inputStyle} value={formData.walkSchedule || ''} onChange={e => updateData({ walkSchedule: e.target.value })} />

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={prevStep}>Back</button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={nextStep}>Continue to Payment</button>
          </div>
        </div>
      )}

      {/* STEP 4: Stripe Payment Setup */}
      {step === 4 && (
        <div>
          <Elements stripe={stripePromise}>
            <StripeSetupForm 
              email={formData.email || ''} 
              name={`${formData.firstName} ${formData.lastName}`} 
              onComplete={handleFinalize} 
            />
          </Elements>
          
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button className="btn btn-outline" style={{ border: 'none', fontSize: '0.875rem' }} onClick={prevStep}>← Back to Routine</button>
          </div>
        </div>
      )}

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.875rem",
  border: "1px solid var(--color-taupe)",
  borderRadius: "6px",
  fontFamily: "inherit",
  fontSize: "0.875rem",
  backgroundColor: "var(--color-white)",
  color: "var(--color-charcoal)",
  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)"
};
