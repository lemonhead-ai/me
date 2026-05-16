import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';
import { getBlogBySlug } from '@/lib/mdx';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia' as any,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const stripe = getStripe();

    const formData = await req.formData();
    const slug = formData.get('slug') as string;
    const priceStr = formData.get('price') as string;

    if (!slug || !priceStr) {
      return new NextResponse('Missing slug or price', { status: 400 });
    }

    const price = parseFloat(priceStr);
    const blog = getBlogBySlug(slug);

    if (!blog) {
      return new NextResponse('Blog not found', { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Unlock: ${blog.meta.title}`,
              description: blog.meta.description,
            },
            unit_amount: Math.round(price * 100), // convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/blog/${slug}?success=true`,
      cancel_url: `${appUrl}/blog/${slug}?canceled=true`,
      client_reference_id: userId,
      metadata: {
        blogSlug: slug,
      },
    });

    if (session.url) {
      return NextResponse.redirect(session.url, 303);
    }

    return new NextResponse('Failed to create session', { status: 500 });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
