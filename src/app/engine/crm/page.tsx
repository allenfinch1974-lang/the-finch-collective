import React from 'react';
import { supabase } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export default async function CRMPage() {
  let leads = [];
  let clients = [];

  if (supabase) {
    const { data: leadsData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    const { data: clientsData } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    leads = leadsData || [];
    clients = clientsData || [];
  } else {
    // Mock data
    leads = [
      { id: '1', first_name: 'Eleanor', last_name: 'Vance', email: 'eleanor.v@example.com', service_package: 'The Executive Suite', status: 'New', created_at: new Date().toISOString() },
      { id: '2', first_name: 'Arthur', last_name: 'Pendleton', email: 'arthur.p@example.com', service_package: 'The Chauffeur', status: 'Contacted', created_at: new Date().toISOString() }
    ];
    clients = [
      { id: '1', first_name: 'Victoria', last_name: 'Sterling', email: 'victoria.sterling@example.com', phone: '910-555-0199', status: 'Active' }
    ];
  }

  return (
    <div style={{ padding: '3rem 4rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>CRM & Leads</h1>
          <p style={{ color: 'var(--color-sage-light)', fontSize: '1.1rem' }}>Manage your inbound inquiries and active clients.</p>
        </div>
        <button className="btn btn-primary">Add Client Manually</button>
      </header>

      {/* Leads Table */}
      <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '2rem', boxShadow: 'var(--shadow-sm)', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-olive-dark)' }}>Active Leads Pipeline</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-oatmeal)', color: 'var(--color-sage-light)' }}>
                <th style={{ padding: '1rem' }}>Name</th>
                <th style={{ padding: '1rem' }}>Email</th>
                <th style={{ padding: '1rem' }}>Service Requested</th>
                <th style={{ padding: '1rem' }}>Date</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: any) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--color-oatmeal)' }}>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{lead.first_name} {lead.last_name}</td>
                  <td style={{ padding: '1rem', color: 'var(--color-sage-light)' }}>{lead.email}</td>
                  <td style={{ padding: '1rem' }}>{lead.service_package}</td>
                  <td style={{ padding: '1rem', color: 'var(--color-sage-light)' }}>{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: lead.status === 'New' ? '#FEE2E2' : '#E0E7FF', color: lead.status === 'New' ? '#991B1B' : '#3730A3', fontSize: '0.875rem' }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button style={{ background: 'none', border: 'none', color: 'var(--color-olive)', cursor: 'pointer', fontWeight: 600 }}>Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clients Table */}
      <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-olive-dark)' }}>Official Clients</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-oatmeal)', color: 'var(--color-sage-light)' }}>
                <th style={{ padding: '1rem' }}>Client Name</th>
                <th style={{ padding: '1rem' }}>Email / Phone</th>
                <th style={{ padding: '1rem' }}>Location</th>
                <th style={{ padding: '1rem' }}>Home Access</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Profile</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client: any) => (
                <tr key={client.id} style={{ borderBottom: '1px solid var(--color-oatmeal)' }}>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{client.first_name} {client.last_name}</td>
                  <td style={{ padding: '1rem', color: 'var(--color-sage-light)' }}>
                    <div>{client.email}</div>
                    <div style={{ fontSize: '0.8rem' }}>{client.phone || 'No phone'}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{client.city ? `${client.city}, ${client.state}` : 'N/A'}</td>
                  <td style={{ padding: '1rem' }}>{client.home_access_method || 'N/A'}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: '#D1FAE5', color: '#065F46', fontSize: '0.875rem' }}>
                      {client.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button style={{ background: 'none', border: 'none', color: 'var(--color-olive)', cursor: 'pointer', fontWeight: 600 }}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
