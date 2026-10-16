import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

function verifyAdmin(req) {
  const authHeader = req.headers.get('authorization') || '';
  const adminPass = req.headers.get('x-admin-key') || '';
  return (
    adminPass === 'agari@1992' ||
    authHeader.includes('agari_admin_token_2026') ||
    process.env.NODE_ENV !== 'production'
  );
}

// PATCH /api/admin/gallery/reorder
export async function PATCH(req) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { orderedIds } = await req.json();
    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: 'orderedIds array required' }, { status: 400 });
    }

    const success = db.reorderGalleryImages(orderedIds);
    return NextResponse.json({ success, message: 'Gallery reordered' });
  } catch (err) {
    console.error('Error reordering gallery:', err);
    return NextResponse.json({ error: 'Failed to reorder gallery' }, { status: 500 });
  }
}
