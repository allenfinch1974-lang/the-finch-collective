import React from 'react';
import { fetchDashboardMetrics } from '@/actions/crm-actions';

export default async function EngineDashboard() {
  const metrics = await fetchDashboardMetrics();

  return (
    <div style={{ padding: '3rem 4rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>Welcome back, Samantha</h1>
        <p style={{ color: 'var(--color-sage-light)', fontSize: '1.1rem' }}>Here is what's happening with The Finch Collective today.</p>
      </header>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
        <MetricCard title="New Leads" value={metrics.newLeadsCount} trend="+2 this week" />
        <MetricCard title="Active Clients" value={metrics.activeClientsCount} trend="Stable" />
        <MetricCard title="Total Revenue" value={`$${metrics.totalRevenue}`} trend="This Month" />
      </div>

      {/* Recent Activity */}
      <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-taupe)', paddingBottom: '1rem' }}>Recent Lead Activity</h2>
        
        {metrics.recentLeads.length === 0 ? (
          <p style={{ color: 'var(--color-sage-light)' }}>No recent activity.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {metrics.recentLeads.map((lead: any) => (
              <li key={lead.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--color-taupe)' }}>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>{lead.first_name} {lead.last_name}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-sage-light)' }}>Inquired about: {lead.service_package}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '999px', 
                    fontSize: '0.75rem', 
                    backgroundColor: lead.status === 'New' ? '#FEE2E2' : '#E0E7FF',
                    color: lead.status === 'New' ? '#991B1B' : '#3730A3',
                    fontWeight: 600
                  }}>
                    {lead.status}
                  </span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-sage-light)', marginTop: '0.5rem' }}>
                    {new Date(lead.created_at).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend }: { title: string, value: string | number, trend: string }) {
  return (
    <div style={{ backgroundColor: 'var(--color-white)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
      <h3 style={{ fontSize: '0.875rem', color: 'var(--color-sage-light)', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h3>
      <p style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--color-olive-dark)', marginBottom: '0.5rem' }}>{value}</p>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)' }}>{trend}</p>
    </div>
  );
}
