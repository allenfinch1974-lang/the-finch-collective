import React from 'react';
import { getCalendarSettings, getAppointments } from '@/actions/calendar-actions';
import { supabase } from '@/lib/supabase/client';
import CalendarDashboard from './CalendarDashboard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CalendarPage() {
  const settings = await getCalendarSettings();
  
  // Get appointments for the current month roughly
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
  
  const appointments = await getAppointments(startOfMonth, endOfMonth);

  // We also need a list of clients so we can create manual appointments
  let clients: any[] = [];
  if (supabase) {
    const { data } = await supabase.from('clients').select('id, first_name, last_name').order('first_name');
    clients = data || [];
  }

  return (
    <div style={{ padding: '3rem 4rem', maxWidth: '1600px', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>Universal Calendar</h1>
          <p style={{ color: 'var(--color-sage-light)', fontSize: '1.1rem' }}>Manage your schedule using the Five-Color Framework.</p>
        </div>
        <div>
          <Link href="/engine/settings/calendar" className="btn btn-outline">
            ⚙️ Framework Settings
          </Link>
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', gap: '2rem', minHeight: 0 }}>
        {/* The interactive calendar component */}
        <CalendarDashboard 
          initialSettings={settings} 
          initialAppointments={appointments}
          clients={clients}
        />
      </div>
    </div>
  );
}
