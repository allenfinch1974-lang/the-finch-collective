-- The Finch Collective Business Engine - CMS Schema Expansion

CREATE TABLE public.website_settings (
    id SERIAL PRIMARY KEY,
    
    -- Hero Section
    hero_script_text TEXT NOT NULL DEFAULT 'for home and the ones you love',
    hero_headline TEXT NOT NULL DEFAULT 'Thoughtful Care. Trustworthy Service.',
    hero_subhead TEXT NOT NULL DEFAULT 'Experience Pinehurst’s most exclusive pet sitting, dog walking, and house management service. Tailored precision for your home, unparalleled love for your pets.',
    hero_image_url TEXT NOT NULL DEFAULT '/images/hero-image.jpg',
    banner_image_url TEXT NOT NULL DEFAULT '/images/banner.png',
    
    -- Services Intro
    services_intro_headline TEXT NOT NULL DEFAULT 'Curated Service Packages',
    services_intro_text TEXT NOT NULL DEFAULT 'We don''t just "watch" pets. We manage their lifestyle. Choose from our luxury service tiers designed for discerning households.',
    
    -- Service Names and Images
    service_1_title TEXT NOT NULL DEFAULT 'Pet Sitting & Walking',
    service_1_image_url TEXT NOT NULL DEFAULT '/images/finch_pet_sitting_dog_walking.svg',
    service_2_title TEXT NOT NULL DEFAULT 'House Management',
    service_2_image_url TEXT NOT NULL DEFAULT '/images/finch_house_sitting.svg',
    service_3_title TEXT NOT NULL DEFAULT 'Overnight Sitting',
    service_3_image_url TEXT NOT NULL DEFAULT '/images/finch_overnight.svg',

    -- About Section
    about_headline TEXT NOT NULL DEFAULT 'Meet the Founder',
    about_paragraph_1 TEXT NOT NULL DEFAULT 'At The Finch Collective, every detail matters—because the little things create the most meaningful experiences. I''m here to bring ease to your day and elevate the way you care for the ones (and places) you love most.',
    about_paragraph_2 TEXT NOT NULL DEFAULT 'Whether it''s your home or your pet, you can count on thoughtful care, trustworthy service, and a personal touch—always.',
    about_image_url TEXT NOT NULL DEFAULT '/images/founder.jpg'
);

-- Insert the default starting row (ID 1)
INSERT INTO public.website_settings (id) VALUES (1);

-- RLS Policies
-- Temporarily allow public read/write until Auth is built
CREATE POLICY "Allow public read for settings" ON public.website_settings FOR SELECT USING (true);
CREATE POLICY "Allow public update for settings" ON public.website_settings FOR UPDATE USING (true);
