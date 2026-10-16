import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

// POST /api/wishlist — Validate wishlist item
export async function POST(req) {
  try {
    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }

    const prod = db.getProductById(productId);
    if (!prod) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      valid: true,
      product: {
        id: prod.id,
        slug: prod.slug,
        name: prod.name,
        brand: prod.brand,
        price: prod.price,
        imageUrl: prod.imageUrl,
        avail: prod.avail,
      },
    });
  } catch (error) {
    console.error('Error validating wishlist item:', error);
    return NextResponse.json({ error: 'Failed to process wishlist item' }, { status: 500 });
  }
}
