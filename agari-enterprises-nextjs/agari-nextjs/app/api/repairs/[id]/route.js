import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const ticket = db.getRepairTicketByNumber(id);

    if (!ticket) {
      return NextResponse.json({ error: 'Repair ticket not found' }, { status: 404 });
    }

    return NextResponse.json({ ticket });
  } catch (error) {
    console.error('Error fetching repair ticket:', error);
    return NextResponse.json({ error: 'Failed to retrieve repair ticket' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const updates = await req.json();

    const updated = db.updateRepairTicket(id, updates);

    if (!updated) {
      return NextResponse.json({ error: 'Repair ticket not found' }, { status: 404 });
    }

    return NextResponse.json({ ticket: updated });
  } catch (error) {
    console.error('Error updating repair ticket:', error);
    return NextResponse.json({ error: 'Failed to update repair ticket' }, { status: 500 });
  }
}
