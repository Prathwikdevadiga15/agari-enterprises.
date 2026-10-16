import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const overview = db.getOverviewMetrics();
    return NextResponse.json(overview);
  } catch (error) {
    console.error('Error fetching admin overview:', error);
    return NextResponse.json({ error: 'Failed to retrieve metrics' }, { status: 500 });
  }
}
