import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/products/featured — Retrieve featured high-value products
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(24, Math.max(1, Number(searchParams.get('limit') || 8)));

    const products = db.getFeaturedProducts(limit);

    return NextResponse.json(
      { products, total: products.length },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json({ error: 'Failed to retrieve featured products' }, { status: 500 });
  }
}
