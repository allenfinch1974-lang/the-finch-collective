'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getWebsiteSettings() {
  try {
    const { data, error } = await supabase
      .from('website_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('Error fetching website settings:', error);
      return null;
    }
    return data;
  } catch (err) {
    console.error('Server error fetching settings:', err);
    return null;
  }
}

export async function updateWebsiteSettings(formData: any) {
  try {
    const { error } = await supabase
      .from('website_settings')
      .update(formData)
      .eq('id', 1);

    if (error) {
      throw new Error(error.message);
    }

    // Instantly purge the Next.js cache for the homepage so the public sees changes immediately
    revalidatePath('/');
    
    return { success: true };
  } catch (err: any) {
    console.error('Failed to update website settings:', err);
    return { success: false, error: err.message };
  }
}
