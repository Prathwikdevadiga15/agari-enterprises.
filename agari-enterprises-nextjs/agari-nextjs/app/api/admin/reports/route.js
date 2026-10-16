import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'sales';
    const format = searchParams.get('format') || 'json';

    if (format === 'csv') {
      const csv = db.generateReportCSV(type);
      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="agari-${type}-report-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    if (type === 'sales') {
      const orders = db.getOrders({ limit: 100 });
      return NextResponse.json({ type: 'sales', records: orders });
    }

    if (type === 'inventory') {
      const products = db.getProducts({ limit: 200 }).products;
      return NextResponse.json({ type: 'inventory', records: products });
    }

    if (type === 'repairs') {
      const repairs = db.getRepairTickets({ limit: 100 });
      return NextResponse.json({ type: 'repairs', records: repairs });
    }

    return NextResponse.json({ error: 'Unknown report type' }, { status: 400 });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
