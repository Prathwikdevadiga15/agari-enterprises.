import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const orders = db.getOrders({ status, limit });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to retrieve orders' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.customerName || !body.customerPhone) {
      return NextResponse.json(
        { error: 'Customer name and phone number are required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    const order = db.createOrder(body);

    return NextResponse.json(
      {
        success: true,
        order,
        message: 'Order placed successfully! An executive will confirm your delivery shortly.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
