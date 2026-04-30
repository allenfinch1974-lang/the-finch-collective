-- Migration: Document Expansion & Lead Support
-- Adds Custom File Upload support and new document templates.

-- 1. Add file_url to documents to support custom PDF uploads
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS file_url TEXT;

-- 2. Create the Storage Bucket for custom documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for the 'documents' bucket
-- Allow public access for reading (so clients can view the signed PDFs)
CREATE POLICY "Public Access for Documents" ON storage.objects FOR SELECT USING ( bucket_id = 'documents' );
-- Allow anyone to upload (in dev)
CREATE POLICY "Public Upload for Documents" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'documents' );

-- 3. Insert New HTML Templates
INSERT INTO public.document_templates (name, type, content_html) VALUES 
('Standard Service Contract', 'Contract', '
<div style="font-family: sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #2F4F4F;">Service Contract Agreement</h2>
  <p>This contract is legally binding between <strong>The Finch Collective</strong> and <strong>{{client_name}}</strong>.</p>
  
  <h3>1. Scope of Services</h3>
  <p>The Finch Collective agrees to provide the services outlined in the accepted Proposal. This includes access via <strong>{{access_method}}</strong>.</p>
  
  <h3>2. Compensation</h3>
  <p>The Client agrees to compensate The Finch Collective according to the pricing outlined in the proposal. Invoices are due upon receipt.</p>
  
  <h3>3. Cancellation Policy</h3>
  <p>Cancellations must be made at least 24 hours in advance to avoid a penalty fee of 50% of the scheduled service cost.</p>
  
  <p style="margin-top: 30px;"><em>By signing below, I acknowledge that I have read and agree to all terms and conditions outlined in this Service Contract.</em></p>
</div>
'),
('Premium Client Proposal', 'Proposal', '
<div style="font-family: sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #2F4F4F;">Service Proposal</h2>
  <p>Prepared exclusively for: <strong>{{client_name}}</strong></p>
  
  <h3>Proposed Services</h3>
  <p>Based on our consultation, we recommend the <strong>Executive Suite</strong> package. This provides comprehensive care tailored to your pets'' specific needs.</p>
  
  <h3>Estimated Investment</h3>
  <p>The estimated cost for the proposed services is highly competitive and ensures premium, reliable care.</p>
  
  <p style="margin-top: 30px;"><em>By signing below, you are accepting this Proposal. A formal Service Contract will follow upon acceptance.</em></p>
</div>
');

-- Note: Because interaction_logs and documents already reference both client_id and lead_id via Phase 1/2 schema:
-- We just need to make sure the Lead Profile UI passes lead_id instead of client_id!
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE;

-- 4. Lead Tags (Many-to-Many link between Leads and Tags)
CREATE TABLE public.lead_tags (
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (lead_id, tag_id)
);
ALTER TABLE public.lead_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow full access for lead_tags" ON public.lead_tags FOR ALL USING (true);

