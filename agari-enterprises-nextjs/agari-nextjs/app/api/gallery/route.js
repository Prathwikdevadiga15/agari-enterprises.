import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/gallery — Retrieve published gallery images
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || 'all';
    const all = searchParams.get('all') === 'true'; // For admin to view inactive too

    const images = db.getGalleryImages({
      category: category === 'all' ? undefined : category,
      onlyActive: !all,
    });

    return NextResponse.json(
      {
        images,
        total: images.length,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('Failed to get gallery images:', error);
    return NextResponse.json({ error: 'Failed to retrieve gallery images' }, { status: 500 });
  }
}

// POST /api/gallery — Admin adds a new gallery image
export async function POST(req) {
  try {
    // Check admin authorization
    const authHeader = req.headers.get('authorization') || '';
    const adminPass = req.headers.get('x-admin-key') || '';
    const isValidAuth =
      adminPass === 'agari@1992' ||
      authHeader.includes('agari_admin_token_2026') ||
      process.env.NODE_ENV !== 'production';

    if (!isValidAuth) {
      return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.imageUrl) {
      return NextResponse.json({ error: 'imageUrl is required' }, { status: 400 });
    }

    const newImage = db.addGalleryImage({
      title: body.title || 'Showroom & Installation Showcase',
      caption: body.caption || '',
      category: body.category || 'showroom',
      imageUrl: body.imageUrl,
      altText: body.altText || body.title || 'Agari Enterprises Gallery',
      sortOrder: body.sortOrder,
      isActive: body.isActive !== false,
      featured: Boolean(body.featured),
    });

    return NextResponse.json({ image: newImage, message: 'Gallery image added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Failed to add gallery image:', error);
    return NextResponse.json({ error: 'Failed to add gallery image' }, { status: 500 });
  }
}
