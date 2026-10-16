import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

function isAuthorized(req) {
  const authHeader = req.headers.get('authorization') || '';
  const adminPass = req.headers.get('x-admin-key') || '';
  return (
    adminPass === 'agari@1992' ||
    authHeader.includes('agari_admin_token_2026') ||
    process.env.NODE_ENV !== 'production'
  );
}

// PATCH /api/gallery/[id] — Update gallery image
export async function PATCH(req, { params }) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    const updated = db.updateGalleryImage(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 });
    }

    return NextResponse.json({ image: updated, message: 'Gallery image updated successfully' });
  } catch (error) {
    console.error('Failed to update gallery image:', error);
    return NextResponse.json({ error: 'Failed to update gallery image' }, { status: 500 });
  }
}

// DELETE /api/gallery/[id] — Remove gallery image
export async function DELETE(req, { params }) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
    }

    const { id } = params;
    const success = db.deleteGalleryImage(id);
    if (!success) {
      return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Gallery image deleted successfully' });
  } catch (error) {
    console.error('Failed to delete gallery image:', error);
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 });
  }
}
