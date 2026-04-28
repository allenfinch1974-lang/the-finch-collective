-- The Finch Collective Business Engine (TFC-BE) Initial Schema

-- 1. Leads Table (Captures form submissions from the public site)
CREATE TABLE public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    service_package TEXT,
    start_date DATE,
    end_date DATE,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Approved', 'Archived')),
    notes TEXT
);

-- 2. Clients Table (Approved leads become official clients)
CREATE TABLE public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id), -- For the future client portal
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive'))
);

-- 3. Pets Table (Associated with a client)
CREATE TABLE public.pets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    species TEXT, -- Dog, Cat, etc.
    breed TEXT,
    age TEXT,
    medical_notes TEXT,
    feeding_instructions TEXT
);

-- Turn on Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for leads (so the booking form works without login)
CREATE POLICY "Allow public insert for leads" ON public.leads
    FOR INSERT WITH CHECK (true);

-- Allow authenticated admins to view/edit leads
CREATE POLICY "Allow authenticated read/write for leads" ON public.leads
    FOR ALL USING (auth.role() = 'authenticated');

-- Same for clients and pets
CREATE POLICY "Allow authenticated read/write for clients" ON public.clients
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read/write for pets" ON public.pets
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert Mock Data so the Dashboard isn't empty!
INSERT INTO public.leads (first_name, last_name, email, service_package, start_date, status) VALUES
('Eleanor', 'Vance', 'eleanor.v@example.com', 'The Executive Suite (Pet Sitting)', '2026-05-10', 'New'),
('Arthur', 'Pendleton', 'arthur.p@example.com', 'The Chauffeur (Dog Walking)', '2026-05-01', 'Contacted'),
('Sarah', 'Jenkins', 's.jenkins@example.com', 'The Estate (House Sitting)', '2026-06-15', 'New');

INSERT INTO public.clients (first_name, last_name, email, phone, status) VALUES
('Victoria', 'Sterling', 'victoria.sterling@example.com', '910-555-0199', 'Active'),
('Harrison', 'Ford', 'hford@example.com', '910-555-0284', 'Active');

INSERT INTO public.pets (client_id, name, species, breed, age) VALUES
((SELECT id FROM public.clients WHERE email = 'victoria.sterling@example.com'), 'Winston', 'Dog', 'Golden Retriever', '4 years'),
((SELECT id FROM public.clients WHERE email = 'victoria.sterling@example.com'), 'Duchess', 'Cat', 'Persian', '2 years'),
((SELECT id FROM public.clients WHERE email = 'hford@example.com'), 'Indiana', 'Dog', 'Mutt', '7 years');
