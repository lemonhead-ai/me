import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { clerkClient } from '@clerk/nextjs/server';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia' as any,
  });
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    if (webhookSecret) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
      }
    } else {
      // For local testing without a webhook secret (not recommended for production)
      event = JSON.parse(body);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.client_reference_id;
      const blogSlug = session.metadata?.blogSlug;

      if (userId && blogSlug) {
        // Fetch current user from Clerk
        const client = await clerkClient();
        const user = await client.users.getUser(userId);

        // Get their current unlocked blogs from publicMetadata
        const currentUnlockedBlogs = (user.publicMetadata?.unlocked_blogs as string[]) || [];

        // If they haven't unlocked this one yet, add it
        if (!currentUnlockedBlogs.includes(blogSlug)) {
          await client.users.updateUserMetadata(userId, {
            publicMetadata: {
              unlocked_blogs: [...currentUnlockedBlogs, blogSlug],
            },
          });
          console.log(`Successfully unlocked blog ${blogSlug} for user ${userId}`);
        }
      }
    }

    return new NextResponse('Webhook received', { status: 200 });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
