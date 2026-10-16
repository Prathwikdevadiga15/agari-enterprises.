import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || searchParams.get('query') || '';

    if (!query.trim()) {
      return NextResponse.json({ results: [], total: 0 });
    }

    const result = db.getProducts({
      search: query,
      limit: 20,
    });

    return NextResponse.json({
      results: result.products,
      total: result.total,
      query,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
