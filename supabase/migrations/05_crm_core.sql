-- Migration: Phase 1 CRM Core
-- Adds pipeline tracking, tagging, and interaction logging.

-- 1. Add Pipeline Stage to Leads
ALTER TABLE public.leads 
ADD COLUMN pipeline_stage TEXT DEFAULT 'Inquiry';

-- Backfill existing leads to the new pipeline stage based on old status
UPDATE public.leads SET pipeline_stage = 'Inquiry' WHERE status = 'New';
UPDATE public.leads SET pipeline_stage = 'Consultation' WHERE status = 'Contacted';
UPDATE public.leads SET pipeline_stage = 'Active' WHERE status = 'Approved';
UPDATE public.leads SET pipeline_stage = 'Archived' WHERE status = 'Archived';

-- 2. Tags Table for Segmentation
CREATE TABLE public.tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT UNIQUE NOT NULL,
    color TEXT DEFAULT '#E5E7EB' -- Default gray badge
);

-- 3. Client Tags (Many-to-Many link between Clients and Tags)
CREATE TABLE public.client_tags (
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (client_id, tag_id)
);

-- 4. Interaction Logs (The 360 Degree Timeline)
CREATE TABLE public.interaction_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE, -- Can belong to a lead OR a client
    interaction_type TEXT NOT NULL CHECK (interaction_type IN ('Note', 'Email', 'Call', 'Meeting', 'System')),
    content TEXT NOT NULL,
    performed_by TEXT -- usually 'System' or the admin's name
);

-- Turn on Row Level Security (RLS)
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interaction_logs ENABLE ROW LEVEL SECURITY;

-- Allow authenticated admins full access
CREATE POLICY "Allow authenticated full access for tags" ON public.tags FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access for client_tags" ON public.client_tags FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access for interaction_logs" ON public.interaction_logs FOR ALL USING (auth.role() = 'authenticated');

-- Insert some default tags for Samantha
INSERT INTO public.tags (name, color) VALUES 
('VIP', '#FEF3C7'), -- Yellow
('High Needs', '#FEE2E2'), -- Red
('Equestrian', '#D1FAE5'), -- Green
('Requires Meds', '#E0E7FF'); -- Blue
