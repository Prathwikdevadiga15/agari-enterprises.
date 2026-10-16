import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

// PATCH /api/gallery/reorder — Reorder gallery images
export async function PATCH(req) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const adminPass = req.headers.get('x-admin-key') || '';
    const isValid =
      adminPass === 'agari@1992' ||
      authHeader.includes('agari_admin_token_2026') ||
      process.env.NODE_ENV !== 'production';

    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
    }

    const { orderedIds } = await req.json();
    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: 'orderedIds must be an array of IDs' }, { status: 400 });
    }

    const success = db.reorderGalleryImages(orderedIds);
    return NextResponse.json({ success, message: 'Gallery reordered successfully' });
  } catch (error) {
    console.error('Failed to reorder gallery:', error);
    return NextResponse.json({ error: 'Failed to reorder gallery' }, { status: 500 });
  }
}
