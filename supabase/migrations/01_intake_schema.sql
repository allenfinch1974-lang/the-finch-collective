-- The Finch Collective Business Engine - Intake Form Schema Expansion

-- 1. Add fields to `clients` table
ALTER TABLE public.clients
ADD COLUMN city TEXT,
ADD COLUMN state TEXT,
ADD COLUMN zip TEXT,
ADD COLUMN home_access_method TEXT,
ADD COLUMN home_key_location TEXT,
ADD COLUMN home_alarm_system BOOLEAN DEFAULT false,
ADD COLUMN home_instructions TEXT;

-- 2. Add fields to `pets` table
ALTER TABLE public.pets
ADD COLUMN weight TEXT,
ADD COLUMN gender TEXT,
ADD COLUMN is_spayed_neutered BOOLEAN,
ADD COLUMN veterinarian_name TEXT,
ADD COLUMN veterinarian_phone TEXT,
ADD COLUMN has_pet_insurance BOOLEAN DEFAULT false,
ADD COLUMN insurance_policy TEXT,
ADD COLUMN medical_conditions TEXT,
ADD COLUMN personality TEXT,
ADD COLUMN gets_along_with_pets TEXT,
ADD COLUMN fears_triggers TEXT,
ADD COLUMN feeding_schedule TEXT,
ADD COLUMN food_type_amount TEXT,
ADD COLUMN gets_treats TEXT,
ADD COLUMN walk_schedule TEXT,
ADD COLUMN potty_routine TEXT,
ADD COLUMN bedtime_routine TEXT,
ADD COLUMN other_routine_details TEXT;

-- 3. Update existing RLS policies (Ensure they are applied properly for the portal)
-- We'll allow public inserts for the portal registration flow before they are fully authenticated
CREATE POLICY "Allow public insert for clients" ON public.clients FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert for pets" ON public.pets FOR INSERT WITH CHECK (true);
