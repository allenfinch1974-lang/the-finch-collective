import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-04-22.dahlia' as any,
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export async function POST(request: Request) {
  try {
    const { documentId } = await request.json();
    if (!documentId) return NextResponse.json({ error: 'Missing documentId' }, { status: 400 });

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: document, error } = await supabase
      .from('documents')
      .select('*, clients(*), leads(*)')
      .eq('id', documentId)
      .single();

    if (error || !document) return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    
    if (document.deposit_paid) return NextResponse.json({ error: 'Deposit already paid' }, { status: 400 });
    if (!document.deposit_amount || document.deposit_amount <= 0) return NextResponse.json({ error: 'No deposit required' }, { status: 400 });

    const person = document.client_id ? document.clients : document.leads;
    const customerEmail = person?.email;

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Deposit for ${document.title}`,
              description: 'The Finch Collective - Professional Pet & Home Care',
            },
            unit_amount: Math.round(document.deposit_amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/sign/${document.token_url}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/sign/${document.token_url}?canceled=true`,
      client_reference_id: documentId,
      metadata: {
        document_id: documentId,
        client_id: document.client_id || '',
        lead_id: document.lead_id || ''
      }
    });

    // Save session ID to document
    await supabase
      .from('documents')
      .update({ stripe_checkout_session_id: session.id })
      .eq('id', documentId);

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
