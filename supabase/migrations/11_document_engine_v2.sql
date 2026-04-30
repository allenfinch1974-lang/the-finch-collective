-- Migration: Document Engine V2 & Stripe Integration
-- Adds Custom WYSIWYG Content, Stripe Payment Tracking, and Modular Blocks

-- 1. Enhance Documents Table
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS custom_content_html TEXT;
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS deposit_amount NUMERIC DEFAULT 0;
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS deposit_paid BOOLEAN DEFAULT false;
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT;
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS origin_proposal_id UUID REFERENCES public.documents(id) ON DELETE SET NULL;

-- 2. Add New Template Types for Modular Blocks
ALTER TABLE public.document_templates DROP CONSTRAINT IF EXISTS document_templates_type_check;
ALTER TABLE public.document_templates ADD CONSTRAINT document_templates_type_check 
CHECK (type IN ('Proposal', 'Contract', 'Consent', 'Waiver', 'Block'));

-- 3. Insert Modular Blocks
INSERT INTO public.document_templates (name, type, content_html) VALUES 
('Scope: Pet Walking', 'Block', '
<div style="margin: 15px 0; padding: 10px; border-left: 3px solid #6B8E23;">
  <h4>Scope of Work: Pet Walking</h4>
  <ul>
    <li>30-minute neighborhood walk.</li>
    <li>Refresh water and provide designated treats upon return.</li>
    <li>Send GPS tracked map and report card via portal.</li>
  </ul>
</div>
'),
('Scope: House Sitting', 'Block', '
<div style="margin: 15px 0; padding: 10px; border-left: 3px solid #6B8E23;">
  <h4>Scope of Work: House Sitting</h4>
  <ul>
    <li>Overnight stay from 8:00 PM to 7:00 AM.</li>
    <li>Mail retrieval, plant watering, and alternating lights.</li>
    <li>Morning and evening feeding routine as instructed.</li>
  </ul>
</div>
'),
('Scope: Combo Care', 'Block', '
<div style="margin: 15px 0; padding: 10px; border-left: 3px solid #6B8E23;">
  <h4>Scope of Work: Comprehensive Combo Care</h4>
  <ul>
    <li>Includes all standard House Sitting services.</li>
    <li>Includes one 30-minute midday walk.</li>
    <li>Includes daily photo updates and full security checks.</li>
  </ul>
</div>
');
