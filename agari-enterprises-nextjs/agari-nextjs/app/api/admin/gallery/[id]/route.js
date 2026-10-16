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

// PATCH /api/admin/gallery/[id] — Update gallery item
export async function PATCH(req, { params }) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    const updates = await req.json();
    const updated = db.updateGalleryImage(id, updates);

    if (!updated) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json({ image: updated, message: 'Gallery item updated' });
  } catch (err) {
    console.error('Error updating admin gallery image:', err);
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 });
  }
}

// DELETE /api/admin/gallery/[id] — Delete gallery item
export async function DELETE(req, { params }) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    const success = db.deleteGalleryImage(id);

    if (!success) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Gallery item removed' });
  } catch (err) {
    console.error('Error deleting admin gallery image:', err);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
