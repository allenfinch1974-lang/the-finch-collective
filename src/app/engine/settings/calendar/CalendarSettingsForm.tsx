'use client';

import React, { useState } from 'react';
import { updateCalendarSettings } from '@/actions/calendar-actions';
import { useRouter } from 'next/navigation';

export default function CalendarSettingsForm({ initialSettings }: { initialSettings: any }) {
  const [formData, setFormData] = useState(initialSettings || {
    color_1_name: 'Consultation', color_1_hex: '#3B82F6',
    color_2_name: 'Active Service', color_2_hex: '#10B981',
    color_3_name: 'Admin Block', color_3_hex: '#F59E0B',
    color_4_name: 'Personal', color_4_hex: '#8B5CF6',
    color_5_name: 'Urgent', color_5_hex: '#EF4444'
  });
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const result = await updateCalendarSettings(formData);
    if (result.success) {
      alert('Settings saved successfully!');
      router.refresh();
    } else {
      alert('Failed to save settings: ' + result.error);
    }
    
    setIsSaving(false);
  };

  const ColorRow = ({ num }: { num: number }) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
      <div style={{ width: '100px', fontWeight: 'bold', color: 'var(--color-charcoal)' }}>Color {num}</div>
      <div style={{ flex: 1 }}>
        <input 
          type="text" 
          value={formData[`color_${num}_name`]} 
          onChange={(e) => setFormData({...formData, [`color_${num}_name`]: e.target.value})}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }}
        />
      </div>
      <div>
        <input 
          type="color" 
          value={formData[`color_${num}_hex`]} 
          onChange={(e) => setFormData({...formData, [`color_${num}_hex`]: e.target.value})}
          style={{ width: '50px', height: '38px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSave}>
      <ColorRow num={1} />
      <ColorRow num={2} />
      <ColorRow num={3} />
      <ColorRow num={4} />
      <ColorRow num={5} />
      
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Framework Settings'}
        </button>
      </div>
    </form>
  );
}
