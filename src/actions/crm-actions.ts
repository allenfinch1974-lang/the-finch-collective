'use server';

import { supabase } from '@/lib/supabase/client';

export async function fetchDashboardMetrics() {
  if (!supabase) {
    // Return mock data for UI testing if Supabase isn't configured
    return {
      newLeadsCount: 3,
      activeClientsCount: 12,
      totalRevenue: 2450,
      recentLeads: [
        { id: '1', first_name: 'Eleanor', last_name: 'Vance', service_package: 'The Executive Suite', status: 'New', created_at: new Date().toISOString() },
        { id: '2', first_name: 'Arthur', last_name: 'Pendleton', service_package: 'The Chauffeur', status: 'Contacted', created_at: new Date().toISOString() }
      ]
    };
  }

  try {
    const { count: newLeadsCount } = await supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'New');
    const { count: activeClientsCount } = await supabase.from('clients').select('*', { count: 'exact', head: true }).eq('status', 'Active');
    const { data: recentLeads } = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5);

    return {
      newLeadsCount: newLeadsCount || 0,
      activeClientsCount: activeClientsCount || 0,
      totalRevenue: 0, // Placeholder for Phase 3
      recentLeads: recentLeads || []
    };
  } catch (error) {
    console.error("Supabase Error:", error);
    return { newLeadsCount: 0, activeClientsCount: 0, totalRevenue: 0, recentLeads: [] };
  }
}

export async function submitInquiry(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const servicePackage = formData.get('servicePackage') as string;
  const startDate = formData.get('startDate') as string;

  if (!supabase) {
    console.log("Mock Submit:", { firstName, lastName, email, servicePackage, startDate });
    return { success: true };
  }

  const { error } = await supabase.from('leads').insert([
    {
      first_name: firstName,
      last_name: lastName,
      email: email,
      service_package: servicePackage,
      start_date: startDate ? startDate : null
    }
  ]);

  if (error) {
    console.error("Error inserting lead:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
