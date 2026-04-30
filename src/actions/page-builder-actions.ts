'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAllPages() {
  const { data, error } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
  return data;
}

export async function getPageBySlug(slug: string) {
  const { data: page, error } = await supabase.from('pages').select('*').eq('slug', slug).single();
  if (error || !page) return null;

  const { data: blocks } = await supabase.from('page_blocks').select('*').eq('page_id', page.id).order('sort_order', { ascending: true });
  
  return { ...page, blocks: blocks || [] };
}

export async function getPageById(id: string) {
  const { data: page, error } = await supabase.from('pages').select('*').eq('id', id).single();
  if (error || !page) return null;

  const { data: blocks } = await supabase.from('page_blocks').select('*').eq('page_id', page.id).order('sort_order', { ascending: true });
  
  return { ...page, blocks: blocks || [] };
}

export async function createPage(title: string, slug: string) {
  const { data, error } = await supabase.from('pages').insert([{ title, slug, is_published: false }]).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/engine/editor');
  return { success: true, page: data };
}

export async function updatePageStatus(id: string, is_published: boolean, slug: string) {
  const { error } = await supabase.from('pages').update({ is_published }).eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath(`/${slug}`);
  revalidatePath('/engine/editor');
  return { success: true };
}

export async function addBlockToPage(page_id: string, block_type: string, sort_order: number) {
  const defaultContent = block_type === 'hero' ? { headline: 'New Hero', subhead: 'Description', imageUrl: '' } :
                         block_type === 'text_split' ? { headline: 'Section Title', text: 'Paragraph here', imageUrl: '' } :
                         block_type === 'services_grid' ? { title_1: 'Service 1', title_2: 'Service 2', title_3: 'Service 3' } : {};

  const { data, error } = await supabase.from('page_blocks').insert([{ page_id, block_type, sort_order, content: defaultContent }]).select().single();
  if (error) return { success: false, error: error.message };
  return { success: true, block: data };
}

export async function updateBlockContent(block_id: string, content: any, page_slug: string) {
  const { error } = await supabase.from('page_blocks').update({ content }).eq('id', block_id);
  if (error) return { success: false, error: error.message };
  revalidatePath(`/${page_slug}`);
  return { success: true };
}

export async function deleteBlock(block_id: string, page_slug: string) {
  const { error } = await supabase.from('page_blocks').delete().eq('id', block_id);
  if (error) return { success: false, error: error.message };
  revalidatePath(`/${page_slug}`);
  return { success: true };
}
