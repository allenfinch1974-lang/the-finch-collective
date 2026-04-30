-- The Finch Collective Business Engine - SEO Pages Content

CREATE TABLE public.seo_content (
    slug TEXT PRIMARY KEY,
    data JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Insert initial data for Southern Pines
INSERT INTO public.seo_content (slug, data) VALUES (
    'southern-pines',
    '{
        "script_text": "Southern Pines",
        "h1": "Boutique Care for the Equestrian Lifestyle",
        "card1_h2": "Equestrian & Estate Focus",
        "card1_p1": "Southern Pines has a unique rhythm. Whether you live in the heart of town or have acreage in horse country, your property and animals demand specialized, highly reliable care.",
        "card1_p2": "We are not farmhands, but we are the ultimate home management team for your estate while you are traveling for shows, business, or vacation. We manage the dogs, the cats, and the property with military precision and five-star hospitality.",
        "card1_btn": "Book Your Dates",
        "card2_h3": "The \"Enterprise\" Standard",
        "card2_p1": "We utilize a bespoke Client Portal and GPS technology. Our clients never have to guess when we arrived or how their home was left. We provide automated transparency for true peace of mind."
    }'::jsonb
);

-- Insert initial data for Forest Creek
INSERT INTO public.seo_content (slug, data) VALUES (
    'forest-creek',
    '{
        "script_text": "Forest Creek Golf Club",
        "h1": "Premium Pet Care for Forest Creek Residents",
        "card1_h2": "Discreet, Professional Care",
        "card1_p1": "Forest Creek represents some of the most beautiful and exclusive real estate in the Sandhills. We provide a level of pet and home care that matches the prestige of your neighborhood.",
        "card1_p2": "Our \"Chauffeur\" dog walking packages offer private, GPS-tracked walks through the community''s beautiful trails, ensuring your pet receives exercise, stimulation, and the utmost safety.",
        "card1_btn": "Inquire About Services",
        "card2_h2": "The Finch Standard",
        "bullet_1": "Real-Time Reports: Instantly receive visit cards with photos to your client portal.",
        "bullet_2": "Medication Management: Expert administration of daily medications.",
        "bullet_3": "No Pack Walking: We strictly provide private walks. Your dog gets 100% of our attention.",
        "bullet_4": "Home Security: Rotating lights, retrieving mail, and maintaining the lived-in look while you''re away."
    }'::jsonb
);

-- Insert initial data for Pinehurst No 2
INSERT INTO public.seo_content (slug, data) VALUES (
    'pinehurst-no-2',
    '{
        "script_text": "Pinehurst No. 2 & The Village",
        "h1": "Concierge Pet Care for Pinehurst Estates",
        "card1_h2": "Uncompromising Care for Your Home",
        "card1_p1": "Living on or near the historic Pinehurst No. 2 course requires a level of discretion and professionalism that standard pet sitters simply cannot provide. The Finch Collective specializes in managing high-end properties while you travel for business or leisure.",
        "card1_p2": "Our \"Estate\" package includes not only comprehensive pet care, but full home management, security checks, mail retrieval, and vendor supervision.",
        "card1_btn": "Inquire About Services",
        "card2_h2": "Why The Finch Collective?",
        "bullet_1": "Fully Insured & Bonded: Maximum protection for your estate.",
        "bullet_2": "Boutique Roster: We take a limited number of clients to ensure white-glove service.",
        "bullet_3": "GPS Tracking: Know exactly when and where your dog is walking.",
        "bullet_4": "Equestrian Community Trusted: We understand the unique needs of the Sandhills lifestyle."
    }'::jsonb
);

-- Insert initial data for Service Area
INSERT INTO public.seo_content (slug, data) VALUES (
    'service-area',
    '{
        "script_text": "The Sandhills",
        "h1": "Exclusive Service Areas",
        "description": "We provide enterprise-level pet care and house management exclusively to the most discerning neighborhoods in the Sandhills region.",
        "box1_title": "Pinehurst No. 2 & The Village",
        "box1_link_text": "Explore Services",
        "box2_title": "Forest Creek Golf Club",
        "box2_link_text": "Explore Services",
        "box3_title": "Southern Pines Equestrian",
        "box3_link_text": "Explore Services"
    }'::jsonb
);

-- Insert initial data for Rover Alternative
INSERT INTO public.seo_content (slug, data) VALUES (
    'alternative-to-rover-pinehurst',
    '{
        "script_text": "Boutique vs App-Based",
        "h1": "The Professional Alternative to Rover in Pinehurst",
        "description": "When you live in a distinguished neighborhood, handing your house keys to a random contractor off an app isn''t an option. You need a dedicated, insured, and professional home management partner.",
        "row1_finch": "✓ Comprehensive Commercial Insurance",
        "row1_app": "Limited Platform Guarantees",
        "row2_finch": "✓ Dedicated Professional Caretaker",
        "row2_app": "Gig-Economy Independent Contractors",
        "row3_finch": "✓ Dedicated CRM, GPS Tracking & Portal",
        "row3_app": "Basic App Messages",
        "row4_finch": "✓ Full Estate Security & Vendor Checks",
        "row4_app": "Pets Only",
        "row5_finch": "✓ Local Pinehurst Small Business",
        "row5_app": "Corporate Support Ticket Queue",
        "bottom_h3": "Ready to upgrade your pet care experience?",
        "bottom_btn": "Schedule a Meet & Greet"
    }'::jsonb
);

-- RLS Policies
CREATE POLICY "Allow public read for seo content" ON public.seo_content FOR SELECT USING (true);
CREATE POLICY "Allow public update for seo content" ON public.seo_content FOR UPDATE USING (true);
