// src/app/api/shorten/route.ts

import { NextResponse } from 'next/server';
// We import our database functions.
import { saveUrl, getUrl } from '../../../../db/queries';

// This is a simple function to generate a random 7-character string.
const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 9);
};

export async function POST(request: Request) {
  try {
    const { longUrl } = await request.json();

    if (!longUrl || !longUrl.startsWith('http')) {
      return NextResponse.json({ message: 'Invalid URL provided.' }, { status: 400 });
    }

    const shortUrl = generateRandomString();

    // We now use the `saveUrl` function to save the URL to the database.
    await saveUrl(longUrl, shortUrl);

    return NextResponse.json({
      shortUrl: `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}/${shortUrl}`,
      message: 'URL shortened successfully!'
    });
  } catch (error) {
    console.error('Error shortening URL:', error);
    return NextResponse.json({ message: 'Failed to shorten URL.' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shortUrl = searchParams.get('shortUrl');

  // We retrieve the longUrl from the database.
  const longUrl = await getUrl(shortUrl || '');

  if (!longUrl) {
    return NextResponse.json({ message: 'URL not found.' }, { status: 404 });
  }
  
  return NextResponse.json({ longUrl });
}