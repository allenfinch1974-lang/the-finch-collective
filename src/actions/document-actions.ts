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

export async function saveDocument(
  targetId: string, 
  isLead: boolean, 
  data: {
    title: string;
    template_id: string;
    status: string;
    custom_content_html: string | null;
    variables_json: any;
    deposit_amount: number;
    expires_at: string | null;
    origin_proposal_id?: string;
    document_id?: string;
  }
) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  
  const payload: any = {
    title: data.title,
    template_id: data.template_id,
    status: data.status,
    custom_content_html: data.custom_content_html,
    variables_json: data.variables_json,
    deposit_amount: data.deposit_amount,
    expires_at: data.expires_at || null,
    origin_proposal_id: data.origin_proposal_id || null
  };

  if (isLead) payload.lead_id = targetId;
  else payload.client_id = targetId;

  let resultDoc;

  if (data.document_id) {
    const { data: updated, error } = await supabase
      .from('documents')
      .update(payload)
      .eq('id', data.document_id)
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    resultDoc = updated;
  } else {
    payload.token_url = crypto.randomBytes(16).toString('hex');
    const { data: inserted, error } = await supabase
      .from('documents')
      .insert([payload])
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    resultDoc = inserted;
  }
  
  if (data.status === 'Sent') {
    await supabase.from('interaction_logs').insert([{
      client_id: isLead ? null : targetId,
      lead_id: isLead ? targetId : null,
      interaction_type: 'System',
      content: `Document sent: ${data.title}`,
      performed_by: 'Admin'
    }]);
  }
  
  if (isLead) revalidatePath(`/engine/crm/lead/${targetId}`);
  else revalidatePath(`/engine/crm/client/${targetId}`);
  
  return { success: true, document: resultDoc };
}

export async function convertProposalToContract(proposalId: string) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  
  const { data: proposal } = await supabase.from('documents').select('*').eq('id', proposalId).single();
  if (!proposal) return { success: false, error: 'Proposal not found' };

  await supabase.from('documents').update({ status: 'Signed' }).eq('id', proposalId);

  const { data: contractTemplate } = await supabase.from('document_templates').select('id').eq('type', 'Contract').limit(1).single();

  const newPayload = {
    title: `Contract: ${proposal.title}`,
    template_id: contractTemplate?.id,
    status: 'Draft',
    custom_content_html: proposal.custom_content_html, 
    variables_json: proposal.variables_json,
    deposit_amount: proposal.deposit_amount,
    origin_proposal_id: proposal.id,
    token_url: crypto.randomBytes(16).toString('hex'),
    client_id: proposal.client_id,
    lead_id: proposal.lead_id
  };

  const { data: contract, error } = await supabase.from('documents').insert([newPayload]).select().single();

  if (error) return { success: false, error: error.message };
  
  if (proposal.client_id) revalidatePath(`/engine/crm/client/${proposal.client_id}`);
  else revalidatePath(`/engine/crm/lead/${proposal.lead_id}`);

  return { success: true, document: contract };
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
