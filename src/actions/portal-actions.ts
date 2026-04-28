'use server';

import { supabase } from '@/lib/supabase/client';

export async function submitRegistration(data: any) {
  if (!supabase) {
    console.log("Mock Registration Submit:", data);
    return { success: true, clientId: 'mock-client-123' };
  }

  try {
    // 1. Insert Client Profile
    const { data: clientData, error: clientError } = await supabase.from('clients').insert([{
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      home_access_method: data.homeAccessMethod,
      home_key_location: data.homeKeyLocation,
      home_alarm_system: data.homeAlarmSystem === 'Yes',
      home_instructions: data.homeInstructions,
      status: 'Active'
    }]).select().single();

    if (clientError) throw clientError;

    // 2. Insert Pet Profile
    if (data.petName) {
      const { error: petError } = await supabase.from('pets').insert([{
        client_id: clientData.id,
        name: data.petName,
        species: data.species,
        breed: data.breed,
        age: data.age,
        weight: data.weight,
        gender: data.gender,
        is_spayed_neutered: data.isSpayedNeutered === 'Yes',
        veterinarian_name: data.veterinarianName,
        veterinarian_phone: data.veterinarianPhone,
        has_pet_insurance: data.hasPetInsurance === 'Yes',
        insurance_policy: data.insurancePolicy,
        medical_conditions: data.medicalConditions,
        personality: data.personality,
        gets_along_with_pets: data.getsAlongWithPets,
        fears_triggers: data.fearsTriggers,
        feeding_schedule: data.feedingSchedule,
        food_type_amount: data.foodTypeAmount,
        gets_treats: data.getsTreats,
        walk_schedule: data.walkSchedule,
        potty_routine: data.pottyRoutine,
        bedtime_routine: data.bedtimeRoutine,
        other_routine_details: data.otherRoutineDetails
      }]);

      if (petError) throw petError;
    }

    return { success: true, clientId: clientData.id };

  } catch (error: any) {
    console.error("Error during registration:", error);
    return { success: false, error: error.message };
  }
}
