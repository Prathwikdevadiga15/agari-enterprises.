import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

// POST /api/cart/items — Server validation for adding item to cart
export async function POST(req) {
  try {
    const { productId, quantity = 1 } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }

    const prod = db.getProductById(productId);
    if (!prod || prod.isActive === false) {
      return NextResponse.json({ error: 'Product is no longer available' }, { status: 404 });
    }

    const safeQty = Math.max(1, Math.min(Number(quantity), prod.stockQuantity || 10));

    return NextResponse.json({
      valid: true,
      item: {
        id: prod.id,
        slug: prod.slug,
        name: prod.name,
        brand: prod.brand,
        category: prod.categoryName,
        imageUrl: prod.imageUrl,
        unitPrice: prod.price,
        quantity: safeQty,
        totalPrice: prod.price * safeQty,
        inStock: prod.stockQuantity >= safeQty,
      },
    });
  } catch (error) {
    console.error('Error validating cart item:', error);
    return NextResponse.json({ error: 'Failed to process cart item' }, { status: 500 });
  }
}
