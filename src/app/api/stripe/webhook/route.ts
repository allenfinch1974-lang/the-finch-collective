import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-04-22.dahlia' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // For local testing without secret
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const documentId = session.metadata?.document_id;
    const clientId = session.metadata?.client_id;
    const leadId = session.metadata?.lead_id;

    if (documentId) {
      await supabase
        .from('documents')
        .update({ deposit_paid: true })
        .eq('id', documentId);

      await supabase.from('interaction_logs').insert([{
        client_id: clientId || null,
        lead_id: leadId || null,
        interaction_type: 'System',
        content: `Deposit payment received via Stripe (${session.amount_total ? session.amount_total / 100 : 0} USD).`,
        performed_by: 'System'
      }]);
    }
  }

  return NextResponse.json({ received: true });
}
