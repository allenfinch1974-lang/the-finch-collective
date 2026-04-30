-- The Finch Collective Business Engine - Dynamic Page Builder

CREATE TABLE public.pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    is_published BOOLEAN DEFAULT false
);

CREATE TABLE public.page_blocks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
    block_type TEXT NOT NULL CHECK (block_type IN ('hero', 'text_split', 'services_grid')),
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- RLS Policies
CREATE POLICY "Allow public read for published pages" ON public.pages FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read for published page blocks" ON public.page_blocks FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.pages WHERE pages.id = page_blocks.page_id AND pages.is_published = true)
);

-- Temporarily allow engine updates
CREATE POLICY "Allow engine updates pages" ON public.pages FOR ALL USING (true);
CREATE POLICY "Allow engine updates blocks" ON public.page_blocks FOR ALL USING (true);
