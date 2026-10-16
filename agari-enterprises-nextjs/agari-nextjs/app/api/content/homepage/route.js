import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { CONFIG, OFFERS, SERVICE_CENTERS } from '@/lib/config';

export const runtime = 'nodejs';

// GET /api/content/homepage
export async function GET() {
  try {
    const gallery = db.getGalleryImages({ onlyActive: true }).slice(0, 12);
    const featuredProducts = db.getFeaturedProducts(6);
    const categories = db.getCategories();

    return NextResponse.json(
      {
        business: {
          name: CONFIG.businessName,
          proprietor: CONFIG.proprietor,
          established: CONFIG.established,
          tagline: CONFIG.tagline,
          displayPhone: CONFIG.displayPhone,
          whatsappDisplay: CONFIG.whatsappDisplay,
          hours: CONFIG.hours,
          headquarters: CONFIG.headquarters,
          motto: 'Offer is yours. Rate is ours.',
        },
        serviceCenters: SERVICE_CENTERS,
        activeOffers: OFFERS,
        featuredProducts,
        categories,
        gallery,
        guarantees: [
          { title: '6-Month Warranty', desc: 'Comprehensive coverage on appliance repairs and factory parts' },
          { title: 'Free Doorstep Delivery', desc: 'Zero delivery charges across Surathkal, Mangaluru and Moodabidri' },
          { title: '30-Minute Callback', desc: 'Rapid technician response from our 6 regional branch hubs' },
          { title: 'Genuine Spares', desc: 'Direct sourcing of authentic OEM components' },
        ],
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Failed to get homepage content:', error);
    return NextResponse.json({ error: 'Failed to retrieve homepage content' }, { status: 500 });
  }
}
