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

export async function generateClientDocument(clientId: string, templateId: string, title: string, variables: any) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  
  // Generate a secure 32-character hex token
  const tokenUrl = crypto.randomBytes(16).toString('hex');
  
  const { data, error } = await supabase
    .from('documents')
    .insert([{
      client_id: clientId,
      template_id: templateId,
      title: title,
      variables_json: variables,
      token_url: tokenUrl,
      status: 'Sent'
    }])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating document:', error);
    return { success: false, error: error.message };
  }
  
  // Log this interaction
  await supabase.from('interaction_logs').insert([{
    client_id: clientId,
    interaction_type: 'System',
    content: `Document generated and sent: ${title}`,
    performed_by: 'Admin'
  }]);
  
  revalidatePath(`/engine/crm/client/${clientId}`);
  return { success: true, document: data };
}


// --- Public Client-Facing Actions ---

export async function getDocumentByToken(token: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('documents')
    .select(`
      *,
      document_templates(content_html, type),
      clients(first_name, last_name, email)
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
