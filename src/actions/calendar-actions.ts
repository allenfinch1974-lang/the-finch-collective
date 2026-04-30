'use server';

import { supabase } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';

// --- Calendar Settings (Five-Color Framework) ---

export async function getCalendarSettings() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('calendar_settings')
    .select('*')
    .eq('id', 'global_settings')
    .single();
    
  if (error) {
    console.error('Error fetching calendar settings:', error);
    return null;
  }
  return data;
}

export async function updateCalendarSettings(formData: any) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  
  const { error } = await supabase
    .from('calendar_settings')
    .update(formData)
    .eq('id', 'global_settings');
    
  if (error) {
    console.error('Error updating calendar settings:', error);
    return { success: false, error: error.message };
  }
  
  revalidatePath('/engine/settings/calendar');
  revalidatePath('/engine/calendar');
  return { success: true };
}

// --- Appointments ---

export async function getAppointments(startDate: Date, endDate: Date) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      clients(first_name, last_name)
    `)
    .gte('start_time', startDate.toISOString())
    .lte('start_time', endDate.toISOString())
    .order('start_time', { ascending: true });
    
  if (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
  return data;
}

export async function createAppointment(appointmentData: any) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  
  const { data, error } = await supabase
    .from('appointments')
    .insert([appointmentData])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating appointment:', error);
    return { success: false, error: error.message };
  }
  
  revalidatePath('/engine/calendar');
  return { success: true, appointment: data };
}
