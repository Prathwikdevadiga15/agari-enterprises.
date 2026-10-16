import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'agari1992';
const COOKIE_NAME = 'agari_admin_session';

export async function POST(req) {
  try {
    const { password } = await req.json();

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true, message: 'Authentication successful' });
      response.cookies.set(COOKIE_NAME, 'authenticated_admin', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid administrator password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = cookies();
  const session = cookieStore.get(COOKIE_NAME);
  const isAuthenticated = session?.value === 'authenticated_admin';

  return NextResponse.json({ authenticated: isAuthenticated });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
