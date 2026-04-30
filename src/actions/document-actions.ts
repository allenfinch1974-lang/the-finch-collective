'use server';

import { supabase } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

// --- Admin Document Actions ---

export async function getDocumentTemplates() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('document_templates').select('*').order('name');
  if (error) {
    console.error('Error fetching templates:', error);
    return [];
  }
  return data;
}

export async function getClientDocuments(clientId: string) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('documents')
    .select(`
      *,
      document_templates(name, type)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
  return data;
}

export async function generateClientDocument(targetId: string, templateId: string, title: string, isLead: boolean = false) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  
  // 1. Fetch Client or Lead Data
  let person: any = null;
  if (isLead) {
    const { data } = await supabase.from('leads').select('*').eq('id', targetId).single();
    person = data;
  } else {
    const { data } = await supabase.from('clients').select('*').eq('id', targetId).single();
    person = data;
  }

  if (!person) return { success: false, error: 'Client or Lead not found.' };

  // 2. Auto-Populate Variables
  const variables = {
    client_name: `${person.first_name} ${person.last_name}`,
    client_email: person.email || 'No email provided',
    client_phone: person.phone || 'No phone provided',
    client_address: person.address || 'No address provided',
    access_method: person.home_access_method || 'To be determined',
    service_package: person.service_package || 'Standard Services'
  };

  // Generate a secure 32-character hex token
  const tokenUrl = crypto.randomBytes(16).toString('hex');
  
  const payload: any = {
    template_id: templateId,
    title: title,
    variables_json: variables,
    token_url: tokenUrl,
    status: 'Sent'
  };

  if (isLead) payload.lead_id = targetId;
  else payload.client_id = targetId;

  const { data, error } = await supabase
    .from('documents')
    .insert([payload])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating document:', error);
    return { success: false, error: error.message };
  }
  
  // Log this interaction
  await supabase.from('interaction_logs').insert([{
    client_id: isLead ? null : targetId,
    lead_id: isLead ? targetId : null,
    interaction_type: 'System',
    content: `Document generated and sent: ${title}`,
    performed_by: 'Admin'
  }]);
  
  if (isLead) revalidatePath(`/engine/crm/lead/${targetId}`);
  else revalidatePath(`/engine/crm/client/${targetId}`);
  
  return { success: true, document: data };
}


export async function uploadCustomDocument(clientId: string | undefined, leadId: string | undefined, title: string, formData: FormData) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  
  const file = formData.get('file') as File;
  if (!file) return { success: false, error: 'No file provided' };
  
  // 1. Upload file to storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `custom/${fileName}`;
  
  const { error: uploadError } = await supabase.storage
    .from('documents')
    .upload(filePath, file);
    
  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    return { success: false, error: uploadError.message };
  }
  
  const { data: publicUrlData } = supabase.storage.from('documents').getPublicUrl(filePath);
  const fileUrl = publicUrlData.publicUrl;
  
  // 2. Create document record
  const token = crypto.randomBytes(16).toString('hex');
  const payload: any = { title, token_url: token, file_url: fileUrl, status: 'Sent' };
  if (clientId) payload.client_id = clientId;
  if (leadId) payload.lead_id = leadId;
  
  const { data, error } = await supabase
    .from('documents')
    .insert([payload])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating document record:', error);
    return { success: false, error: error.message };
  }
  
  // Log this interaction
  await supabase.from('interaction_logs').insert([{
    client_id: clientId || null,
    lead_id: leadId || null,
    interaction_type: 'System',
    content: `Custom document uploaded and sent: ${title}`,
    performed_by: 'Admin'
  }]);
  
  if (clientId) revalidatePath(`/engine/crm/client/${clientId}`);
  if (leadId) revalidatePath(`/engine/crm/lead/${leadId}`);
  
  return { success: true, document: data };
}


// --- Public Client-Facing Actions ---

export async function getDocumentByToken(token: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('documents')
    .select(`
      *,
      document_templates (content_html),
      clients (first_name, last_name),
      leads (first_name, last_name)
    `)
    .eq('token_url', token)
    .single();
    
  if (error) {
    console.error('Error fetching document by token:', error);
    return null;
  }
  return data;
}

export async function signDocument(documentId: string, signatureText: string, ipAddress: string, userAgent: string) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  
  // 1. Create Signature Record
  const { error: sigError } = await supabase
    .from('signatures')
    .insert([{
      document_id: documentId,
      signature_data: signatureText,
      ip_address: ipAddress,
      user_agent: userAgent
    }]);
    
  if (sigError) {
    console.error('Error saving signature:', sigError);
    return { success: false, error: sigError.message };
  }
  
  // 2. Update Document Status
  const { data: doc, error: docError } = await supabase
    .from('documents')
    .update({ status: 'Signed' })
    .eq('id', documentId)
    .select()
    .single();
    
  if (docError) {
    console.error('Error updating document status:', docError);
    return { success: false, error: docError.message };
  }
  
  // 3. Log interaction on the client timeline
  if (doc?.client_id) {
    await supabase.from('interaction_logs').insert([{
      client_id: doc.client_id,
      interaction_type: 'System',
      content: `Client SIGNED document: ${doc.title}`,
      performed_by: 'System'
    }]);
    revalidatePath(`/engine/crm/client/${doc.client_id}`);
  }
  
  return { success: true };
}
