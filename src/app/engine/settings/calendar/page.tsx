import React from 'react';
import { getCalendarSettings } from '@/actions/calendar-actions';
import CalendarSettingsForm from './CalendarSettingsForm';

export const dynamic = 'force-dynamic';

export default async function CalendarSettingsPage() {
  const settings = await getCalendarSettings();

  return (
    <div style={{ padding: '3rem 4rem', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>Calendar Settings</h1>
        <p style={{ color: 'var(--color-sage-light)', fontSize: '1.1rem' }}>Manage your Five-Color Framework and integration settings.</p>
      </header>

      <div className="glass-card" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-olive-dark)', marginBottom: '1rem' }}>The Five-Color Framework</h2>
        <p style={{ color: 'var(--color-taupe)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          Define the 5 core colors that will be synced across all your calendars (Google, Apple, Microsoft). 
          These categories help visually organize your entire schedule.
        </p>
        
        <CalendarSettingsForm initialSettings={settings} />
      </div>

      <div className="glass-card">
        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-olive-dark)', marginBottom: '1rem' }}>External Integrations</h2>
        <p style={{ color: 'var(--color-taupe)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          Connect your external calendar providers to enable two-way syncing. Note: You must configure OAuth in the respective developer portals first.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-oatmeal)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#4285F4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>G</div>
              <div>
                <strong>Google Calendar</strong>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-taupe)' }}>Not connected</div>
              </div>
            </div>
            <button className="btn btn-outline" disabled>Connect (Phase 4)</button>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-oatmeal)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#00A4EF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>M</div>
              <div>
                <strong>Microsoft Outlook</strong>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-taupe)' }}>Not connected</div>
              </div>
            </div>
            <button className="btn btn-outline" disabled>Connect (Phase 4)</button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-oatmeal)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#A2AAAD', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>A</div>
              <div>
                <strong>Apple Calendar (iCloud)</strong>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-taupe)' }}>Not connected</div>
              </div>
            </div>
            <button className="btn btn-outline" disabled>Connect (Phase 4)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
