'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getSeoPageData(slug: string) {
  try {
    const { data, error } = await supabase
      .from('seo_content')
      .select('data')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching SEO content for ${slug}:`, error);
      return null;
    }
    return data?.data;
  } catch (err) {
    console.error('Server error fetching SEO settings:', err);
    return null;
  }
}

export async function updateSeoPageData(slug: string, formData: any) {
  try {
    const { error } = await supabase
      .from('seo_content')
      .update({ data: formData })
      .eq('slug', slug);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath(`/${slug}`);
    
    return { success: true };
  } catch (err: any) {
    console.error(`Failed to update SEO content for ${slug}:`, err);
    return { success: false, error: err.message };
  }
}
