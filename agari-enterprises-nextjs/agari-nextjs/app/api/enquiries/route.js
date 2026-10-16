import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const enquiries = db.getEnquiries();
    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ error: 'Failed to retrieve enquiries' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone) {
      return NextResponse.json({ error: 'Name and phone number are required' }, { status: 400 });
    }
    const enquiry = db.createEnquiry(body);
    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}
