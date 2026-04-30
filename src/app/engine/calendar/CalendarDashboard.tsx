'use client';

import React, { useState } from 'react';
import { createAppointment } from '@/actions/calendar-actions';

export default function CalendarDashboard({ initialSettings, initialAppointments, clients }: { initialSettings: any, initialAppointments: any[], clients: any[] }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [activeFilters, setActiveFilters] = useState<number[]>([1, 2, 3, 4, 5]); // All colors active by default
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', client_id: '', start_time: '', end_time: '', color_code: 1, description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultSettings = initialSettings || {
    color_1_name: 'Consultation', color_1_hex: '#3B82F6',
    color_2_name: 'Active Service', color_2_hex: '#10B981',
    color_3_name: 'Admin Block', color_3_hex: '#F59E0B',
    color_4_name: 'Personal', color_4_hex: '#8B5CF6',
    color_5_name: 'Urgent', color_5_hex: '#EF4444'
  };

  const toggleFilter = (colorCode: number) => {
    if (activeFilters.includes(colorCode)) {
      setActiveFilters(activeFilters.filter(c => c !== colorCode));
    } else {
      setActiveFilters([...activeFilters, colorCode]);
    }
  };

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = {
      ...formData,
      client_id: formData.client_id || null, // Handle empty client selection
      start_time: new Date(formData.start_time).toISOString(),
      end_time: new Date(formData.end_time).toISOString(),
    };

    const result = await createAppointment(payload);
    
    if (result.success && result.appointment) {
      setAppointments([...appointments, { ...result.appointment, clients: clients.find(c => c.id === payload.client_id) }]);
      setIsModalOpen(false);
      setFormData({ title: '', client_id: '', start_time: '', end_time: '', color_code: 1, description: '' });
    } else {
      alert("Failed to create appointment: " + result.error);
    }
    
    setIsSubmitting(false);
  };

  // Very simple list view for appointments instead of a complex grid for Phase 3
  const visibleAppointments = appointments.filter(app => activeFilters.includes(app.color_code));

  return (
    <>
      {/* Sidebar Filters */}
      <div className="glass-card" style={{ width: '300px', flexShrink: 0, height: '100%' }}>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{ width: '100%', marginBottom: '2rem' }}>
          + New Appointment
        </button>

        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-charcoal)', marginBottom: '1rem' }}>Filters</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[1, 2, 3, 4, 5].map(num => {
            const isActive = activeFilters.includes(num);
            const hex = defaultSettings[`color_${num}_hex`];
            const name = defaultSettings[`color_${num}_name`];
            return (
              <label key={num} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', backgroundColor: isActive ? `${hex}15` : 'transparent', border: isActive ? `1px solid ${hex}50` : '1px solid transparent' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: hex, opacity: isActive ? 1 : 0.3 }}></div>
                <span style={{ fontSize: '0.875rem', fontWeight: isActive ? 'bold' : 'normal', color: isActive ? 'var(--color-charcoal)' : 'var(--color-taupe)' }}>{name}</span>
                <input type="checkbox" checked={isActive} onChange={() => toggleFilter(num)} style={{ display: 'none' }} />
              </label>
            );
          })}
        </div>
      </div>

      {/* Main Agenda View */}
      <div className="glass-card" style={{ flex: 1, overflowY: 'auto' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--color-olive-dark)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-oatmeal)', paddingBottom: '0.5rem' }}>
          Agenda View
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {visibleAppointments.length > 0 ? visibleAppointments.map(app => {
            const hex = defaultSettings[`color_${app.color_code}_hex`];
            const name = defaultSettings[`color_${app.color_code}_name`];
            return (
              <div key={app.id} style={{ display: 'flex', border: '1px solid var(--color-oatmeal)', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ width: '8px', backgroundColor: hex }}></div>
                <div style={{ padding: '1rem', flex: 1, backgroundColor: 'var(--color-white)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-charcoal)' }}>{app.title}</h4>
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '12px', backgroundColor: `${hex}20`, color: hex, fontWeight: 'bold' }}>{name}</span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', marginBottom: '0.5rem' }}>
                    {new Date(app.start_time).toLocaleString()} - {new Date(app.end_time).toLocaleString()}
                  </div>
                  {app.clients && (
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-olive)', fontWeight: 'bold' }}>
                      Client: {app.clients.first_name} {app.clients.last_name}
                    </div>
                  )}
                  {app.description && (
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)', marginTop: '0.5rem' }}>
                      {app.description}
                    </div>
                  )}
                </div>
              </div>
            );
          }) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-taupe)' }}>
              No appointments match the current filters.
            </div>
          )}
        </div>
      </div>

      {/* New Appointment Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-card" style={{ width: '500px', backgroundColor: 'var(--color-white)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: 'var(--color-olive-dark)' }}>New Appointment</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>&times;</button>
            </div>
            
            <form onSubmit={handleCreateAppointment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Title</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Client (Optional)</label>
                <select value={formData.client_id} onChange={e => setFormData({...formData, client_id: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }}>
                  <option value="">None (Admin/Personal)</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.first_name} {c.last_name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Start Time</label>
                  <input type="datetime-local" required value={formData.start_time} onChange={e => setFormData({...formData, start_time: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>End Time</label>
                  <input type="datetime-local" required value={formData.end_time} onChange={e => setFormData({...formData, end_time: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-taupe)' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Color Code</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map(num => (
                    <button 
                      key={num} 
                      type="button" 
                      onClick={() => setFormData({...formData, color_code: num})}
                      style={{ 
                        flex: 1, 
                        padding: '0.5rem', 
                        borderRadius: '4px', 
                        border: formData.color_code === num ? '2px solid var(--color-charcoal)' : '1px solid var(--color-taupe)',
                        backgroundColor: defaultSettings[`color_${num}_hex`],
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-taupe)', marginTop: '0.25rem' }}>
                  Selected: {defaultSettings[`color_${formData.color_code}_name`]}
                </div>
              </div>
              
              <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                {isSubmitting ? 'Saving...' : 'Create Appointment'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
