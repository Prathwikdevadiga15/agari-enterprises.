import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function verifyAdmin(req) {
  const authHeader = req.headers.get('authorization') || '';
  const adminPass = req.headers.get('x-admin-key') || '';
  return (
    adminPass === 'agari@1992' ||
    authHeader.includes('agari_admin_token_2026') ||
    process.env.NODE_ENV !== 'production'
  );
}

// GET /api/admin/gallery — Get all gallery images (including inactive)
export async function GET(req) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const images = db.getGalleryImages({ onlyActive: false });
  return NextResponse.json({ images, total: images.length });
}

// POST /api/admin/gallery — Create new gallery item
export async function POST(req) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.imageUrl) {
      return NextResponse.json({ error: 'imageUrl is required' }, { status: 400 });
    }

    const created = db.addGalleryImage(body);
    return NextResponse.json({ image: created, message: 'Image added to gallery' }, { status: 201 });
  } catch (err) {
    console.error('Error adding admin gallery image:', err);
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}
