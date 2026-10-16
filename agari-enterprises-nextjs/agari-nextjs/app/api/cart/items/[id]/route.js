import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

// PATCH /api/cart/items/[id] — Update quantity with stock validation
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const { quantity } = await req.json();

    const prod = db.getProductById(id);
    if (!prod || prod.isActive === false) {
      return NextResponse.json({ error: 'Product not found or unavailable' }, { status: 404 });
    }

    const newQty = Math.max(1, Math.min(Number(quantity || 1), prod.stockQuantity || 10));

    return NextResponse.json({
      id: prod.id,
      quantity: newQty,
      unitPrice: prod.price,
      totalPrice: prod.price * newQty,
      maxAvailable: prod.stockQuantity || 10,
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// DELETE /api/cart/items/[id]
export async function DELETE(req, { params }) {
  const { id } = params;
  return NextResponse.json({ success: true, removedId: id });
}
