import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

// POST /api/cart — Validate cart items and return authoritative server prices and totals
export async function POST(req) {
  try {
    const body = await req.json();
    const items = Array.isArray(body.items) ? body.items : [];

    const validated = db.validateCartItems(items);

    return NextResponse.json(validated, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error validating cart:', error);
    return NextResponse.json({ error: 'Failed to validate cart' }, { status: 500 });
  }
}

// GET /api/cart — Quick verification of cart policy & thresholds
export async function GET() {
  return NextResponse.json({
    currency: 'INR',
    freeDeliveryThreshold: 0,
    deliveryFee: 0,
    supportedLocations: ['Surathkal', 'Mangaluru', 'Moodabidre', 'Kavoor', 'Yedapadavu', 'Kinnigoli'],
    policy: 'Free doorstep delivery & installation across Dakshina Kannada for all electronics & furniture',
    paymentMethods: ['Cash on Delivery (COD)', 'UPI on Delivery', 'Direct WhatsApp Assistance'],
  });
}
