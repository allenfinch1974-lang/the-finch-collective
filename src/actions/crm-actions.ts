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

// --- Leads Pipeline Actions ---
import { revalidatePath } from 'next/cache';

export async function getLeadsPipeline() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
  return data;
}

export async function updateLeadStage(leadId: string, newStage: string) {
  if (!supabase) return { success: false, error: "Supabase not configured" };
  const { error } = await supabase
    .from('leads')
    .update({ pipeline_stage: newStage })
    .eq('id', leadId);
    
  if (error) {
    console.error('Error updating lead stage:', error);
    return { success: false, error: error.message };
  }
  
  revalidatePath('/engine/crm');
  return { success: true };
}

// --- Interaction Log Actions ---

export async function getInteractionLogs(clientId?: string, leadId?: string) {
  if (!supabase) return [];
  let query = supabase.from('interaction_logs').select('*').order('created_at', { ascending: false });
  
  if (clientId) query = query.eq('client_id', clientId);
  if (leadId) query = query.eq('lead_id', leadId);
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
  return data;
}

export async function addInteractionLog(
  content: string, 
  type: string = 'Note', 
  clientId?: string, 
  leadId?: string
) {
  if (!supabase) return { success: false, error: "Supabase not configured" };
  const payload: any = { content, interaction_type: type, performed_by: 'Admin' };
  if (clientId) payload.client_id = clientId;
  if (leadId) payload.lead_id = leadId;

  const { data, error } = await supabase
    .from('interaction_logs')
    .insert([payload])
    .select()
    .single();
    
  if (error) {
    console.error('Error adding log:', error);
    return { success: false, error: error.message };
  }
  
  if (clientId) revalidatePath(`/engine/crm/client/${clientId}`);
  if (leadId) revalidatePath(`/engine/crm/lead/${leadId}`);
  
  return { success: true, log: data };
}

// --- Tag Actions ---

export async function getTags() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('tags').select('*').order('name');
  if (error) return [];
  return data;
}

export async function getClientTags(clientId: string) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('client_tags')
    .select(`
      tag_id,
      tags (
        id,
        name,
        color
      )
    `)
    .eq('client_id', clientId);
    
  if (error) return [];
  return data.map((t: any) => t.tags);
}

export async function addTagToClient(clientId: string, tagId: string) {
  if (!supabase) return { success: false, error: "Supabase not configured" };
  const { error } = await supabase
    .from('client_tags')
    .insert([{ client_id: clientId, tag_id: tagId }]);
    
  if (error) return { success: false, error: error.message };
  revalidatePath(`/engine/crm/client/${clientId}`);
  return { success: true };
}

export async function removeTagFromClient(clientId: string, tagId: string) {
  if (!supabase) return { success: false, error: "Supabase not configured" };
  const { error } = await supabase
    .from('client_tags')
    .delete()
    .match({ client_id: clientId, tag_id: tagId });
    
  if (error) return { success: false, error: error.message };
  revalidatePath(`/engine/crm/client/${clientId}`);
  return { success: true };
}
