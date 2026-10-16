import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

// GET /api/products/[id]/availability — Check live stock & availability
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const availability = db.checkProductAvailability(id);

    if (!availability) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        ...availability,
        deliveryPromise: 'Free doorstep delivery across Surathkal, Mangaluru & Moodabidri',
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
  }
}
