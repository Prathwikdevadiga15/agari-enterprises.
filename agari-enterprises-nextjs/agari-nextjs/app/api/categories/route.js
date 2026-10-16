import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { CATEGORY_GROUPS } from '@/lib/catalog';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const categories = db.getCategories();
    return NextResponse.json({
      groups: CATEGORY_GROUPS,
      categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to retrieve categories' }, { status: 500 });
  }
}
