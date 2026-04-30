-- Migration: Legal Templates Update
-- Replaces existing document templates with comprehensive legal language and auto-populating variables.

-- 1. Clear existing templates to avoid duplicates (optional, assuming we just want the new ones)
DELETE FROM public.document_templates;

-- 2. Insert new comprehensive templates
INSERT INTO public.document_templates (name, type, content_html) VALUES 
('Standard Service Contract Agreement', 'Contract', '
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #2F4F4F; text-align: center; text-transform: uppercase;">Service Contract Agreement</h2>
  <p>This Service Contract Agreement (the "Agreement") is entered into as of the date of electronic signature below, by and between <strong>The Finch Collective</strong> ("Provider") and <strong>{{client_name}}</strong> ("Client").</p>
  
  <h3>1. Scope of Services</h3>
  <p>Provider agrees to perform the services selected and agreed upon by the Client in their respective Service Proposal. Client agrees to provide access to the premises via: <strong>{{access_method}}</strong>.</p>
  
  <h3>2. Compensation and Payment Terms</h3>
  <p>Client agrees to compensate Provider according to the pricing outlined in the accepted Service Proposal. Invoices are due upon receipt. Provider reserves the right to suspend services if payments are delinquent by more than 7 days.</p>
  
  <h3>3. Term and Termination</h3>
  <p>This Agreement shall commence upon signature and remain in effect until terminated by either party with a 14-day written notice. Cancellations for individual service appointments must be made at least 24 hours in advance to avoid a penalty fee of 50% of the scheduled service cost.</p>
  
  <h3>4. Independent Contractor</h3>
  <p>Provider operates as an independent contractor. Nothing in this Agreement shall be construed to create a partnership, joint venture, or employer-employee relationship between the parties.</p>

  <h3>5. Liability and Indemnification</h3>
  <p>Client agrees to indemnify and hold harmless the Provider, its employees, and agents from any and all claims, damages, losses, or liabilities arising out of or related to the services provided, except in cases of gross negligence or willful misconduct by the Provider.</p>
  
  <p style="margin-top: 40px; font-weight: bold; border-top: 1px solid #ccc; padding-top: 20px;">
    By signing below electronically, the Client acknowledges that they have read, understood, and agree to be bound by all terms and conditions contained in this Agreement.
  </p>
</div>
'),

('Premium Service Proposal', 'Proposal', '
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #2F4F4F; text-align: center; text-transform: uppercase;">Service Proposal</h2>
  <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <p style="margin: 0;"><strong>Prepared Exclusively For:</strong> {{client_name}}</p>
    <p style="margin: 0;"><strong>Email:</strong> {{client_email}}</p>
    <p style="margin: 0;"><strong>Phone:</strong> {{client_phone}}</p>
    <p style="margin: 0;"><strong>Service Location:</strong> {{client_address}}</p>
  </div>
  
  <h3>1. Proposed Service Package</h3>
  <p>Based on our comprehensive consultation, we recommend the <strong>{{service_package}}</strong>. This bespoke package provides premium care specifically tailored to your household''s unique requirements.</p>
  
  <h3>2. Next Steps</h3>
  <p>Upon acceptance of this proposal, we will generate the formal Service Contract and Liability Waiver to finalize onboarding.</p>
  
  <p style="margin-top: 40px; font-style: italic; border-top: 1px solid #ccc; padding-top: 20px;">
    By signing below, you are formally accepting this Proposal and authorizing The Finch Collective to proceed with onboarding.
  </p>
</div>
'),

('Liability Waiver & Consent Form', 'Waiver', '
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #2F4F4F; text-align: center; text-transform: uppercase;">Liability Waiver & Emergency Consent</h2>
  <p>I, <strong>{{client_name}}</strong>, hereby authorize The Finch Collective ("Provider") to perform services at <strong>{{client_address}}</strong>.</p>
  
  <h3>1. Assumption of Risk</h3>
  <p>I acknowledge that pet care and household services involve inherent risks, including but not limited to, property damage, pet injury, or escape. I voluntarily assume all such risks associated with the services provided.</p>
  
  <h3>2. Emergency Veterinary Consent</h3>
  <p>In the event of a medical emergency involving my pet(s), I authorize Provider to seek veterinary care at their discretion. I understand that Provider will make reasonable attempts to contact me at <strong>{{client_phone}}</strong> or <strong>{{client_email}}</strong> prior to seeking care. I agree to assume full financial responsibility for any veterinary expenses incurred.</p>
  
  <h3>3. Key and Access Release</h3>
  <p>I am providing access to my home via <strong>{{access_method}}</strong>. I release Provider from any liability related to home security, theft, or damage, provided that Provider has followed the agreed-upon access and security procedures.</p>

  <h3>4. General Release of Liability</h3>
  <p>I hereby release, waive, discharge, and covenant not to sue The Finch Collective, its owners, employees, and agents from any and all liability, claims, demands, or causes of action arising out of or related to any loss, damage, or injury sustained by me, my property, or my pets, except in cases of gross negligence.</p>
  
  <p style="margin-top: 40px; font-weight: bold; border-top: 1px solid #ccc; padding-top: 20px;">
    I HAVE CAREFULLY READ THIS AGREEMENT, FULLY UNDERSTAND ITS TERMS, AND SIGN IT FREELY AND VOLUNTARILY WITHOUT ANY INDUCEMENT.
  </p>
</div>
');
