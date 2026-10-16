import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const tickets = db.getRepairTickets({ status, limit });
    return NextResponse.json({ tickets });
  } catch (error) {
    console.error('Error fetching repair tickets:', error);
    return NextResponse.json({ error: 'Failed to retrieve repair tickets' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.customerName || !body.customerPhone || !body.appliance) {
      return NextResponse.json(
        { error: 'Customer name, phone number, and appliance type are required' },
        { status: 400 }
      );
    }

    const ticket = db.createRepairTicket(body);

    return NextResponse.json(
      {
        success: true,
        ticket,
        ticketNumber: ticket.ticketNumber,
        message: 'Repair request booked successfully! Our technician will call you within 30 minutes.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating repair ticket:', error);
    return NextResponse.json({ error: 'Failed to book repair' }, { status: 500 });
  }
}
