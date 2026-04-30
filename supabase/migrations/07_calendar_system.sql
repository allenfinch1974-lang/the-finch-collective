-- Migration: Phase 3 Universal Calendar & Scheduling
-- Adds the Five-Color Framework settings and the appointments table.

-- 1. Calendar Settings (The 5-Color Framework)
-- We enforce a single row by hardcoding the ID.
CREATE TABLE public.calendar_settings (
    id TEXT PRIMARY KEY DEFAULT 'global_settings',
    color_1_name TEXT DEFAULT 'Consultation',
    color_1_hex TEXT DEFAULT '#3B82F6', -- Blue
    color_2_name TEXT DEFAULT 'Active Service',
    color_2_hex TEXT DEFAULT '#10B981', -- Green
    color_3_name TEXT DEFAULT 'Admin Block',
    color_3_hex TEXT DEFAULT '#F59E0B', -- Yellow
    color_4_name TEXT DEFAULT 'Personal',
    color_4_hex TEXT DEFAULT '#8B5CF6', -- Purple
    color_5_name TEXT DEFAULT 'Urgent',
    color_5_hex TEXT DEFAULT '#EF4444'  -- Red
);

-- 2. Appointments Table
CREATE TABLE public.appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    color_code INTEGER NOT NULL CHECK (color_code BETWEEN 1 AND 5),
    
    -- Sync fields for future API integrations
    external_provider TEXT CHECK (external_provider IN ('google', 'microsoft', 'apple', 'none')) DEFAULT 'none',
    external_event_id TEXT
);

-- Turn on Row Level Security (RLS)
ALTER TABLE public.calendar_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow authenticated admins full access
CREATE POLICY "Allow authenticated full access for calendar_settings" ON public.calendar_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access for appointments" ON public.appointments FOR ALL USING (auth.role() = 'authenticated');

-- Insert the default global settings row
INSERT INTO public.calendar_settings (id) VALUES ('global_settings') ON CONFLICT DO NOTHING;

-- Insert Mock Data for testing the UI
INSERT INTO public.appointments (client_id, title, description, start_time, end_time, color_code) 
VALUES 
(
  (SELECT id FROM public.clients WHERE email = 'victoria.sterling@example.com'), 
  'Initial Meet & Greet with Winston', 
  'Discussing key handoff and walking schedule.',
  NOW() + INTERVAL '1 day',
  NOW() + INTERVAL '1 day' + INTERVAL '1 hour',
  1 -- Color 1
),
(
  NULL, 
  'Weekly Accounting Review', 
  'Reviewing P&L and sending invoices.',
  NOW() + INTERVAL '2 days',
  NOW() + INTERVAL '2 days' + INTERVAL '2 hours',
  3 -- Color 3 (Admin)
);
