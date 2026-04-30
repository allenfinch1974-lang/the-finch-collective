-- Migration: Phase 2 Document & E-Signature Suite
-- Adds templates, documents, and secure signature tracking.

-- 1. Document Templates
CREATE TABLE public.document_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Proposal', 'Contract', 'Consent', 'Waiver')),
    content_html TEXT NOT NULL -- The raw HTML with {{variables}}
);

-- 2. Client Documents
CREATE TABLE public.documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    template_id UUID REFERENCES public.document_templates(id),
    title TEXT NOT NULL,
    status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Sent', 'Viewed', 'Signed', 'Voided')),
    variables_json JSONB DEFAULT '{}'::jsonb, -- Store the injected variables (price, dates)
    token_url TEXT UNIQUE NOT NULL -- The secret 32-char string for the public URL
);

-- 3. Digital Signatures (The Audit Trail)
CREATE TABLE public.signatures (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE UNIQUE,
    ip_address TEXT NOT NULL,
    user_agent TEXT NOT NULL,
    signature_data TEXT NOT NULL, -- Either typed name or base64 drawn image
    signed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on Row Level Security (RLS)
ALTER TABLE public.document_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;

-- Allow authenticated admins full access to templates and documents
CREATE POLICY "Allow authenticated full access for templates" ON public.document_templates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access for documents" ON public.documents FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access for signatures" ON public.signatures FOR ALL USING (auth.role() = 'authenticated');

-- Allow PUBLIC to view a document if they have the secret token URL
-- This is necessary for the client-facing signature page
CREATE POLICY "Allow public read by token" ON public.documents 
FOR SELECT USING (true); -- Application logic will filter by token

-- Allow PUBLIC to insert a signature
CREATE POLICY "Allow public insert signature" ON public.signatures 
FOR INSERT WITH CHECK (true);

-- Allow PUBLIC to update document status to 'Signed' or 'Viewed'
CREATE POLICY "Allow public update document status" ON public.documents 
FOR UPDATE USING (true);


-- Insert Mock Template
INSERT INTO public.document_templates (name, type, content_html) VALUES 
('Standard Liability Waiver & Consent', 'Waiver', '
<div style="font-family: sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #2F4F4F;">Veterinary Care & Liability Release</h2>
  <p>This agreement is entered into between <strong>The Finch Collective</strong> and <strong>{{client_name}}</strong>.</p>
  
  <h3>1. Medical Emergencies</h3>
  <p>In the event of a medical emergency, I authorize The Finch Collective to seek immediate veterinary care for my pet(s). I agree to reimburse The Finch Collective for all charges incurred.</p>
  
  <h3>2. Liability</h3>
  <p>The Finch Collective agrees to provide services in a reliable and trustworthy manner. I understand that The Finch Collective is not responsible for any damage or injury caused by my pet(s) to persons or property.</p>
  
  <h3>3. Key Handling</h3>
  <p>I authorize The Finch Collective to retain a copy of my house key or entry code (<strong>{{access_method}}</strong>) for the duration of the service agreement.</p>
  
  <p style="margin-top: 30px;"><em>By signing below, I acknowledge that I have read and agree to all terms and conditions outlined in this waiver.</em></p>
</div>
');
