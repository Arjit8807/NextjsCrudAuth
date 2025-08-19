

import { NextResponse } from 'next/server';

// This Map will act as our temporary database. Since it's a global variable
// in this file, its data will persist between different requests to this route.
const urlMap = new Map();

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
    
    // The POST request saves the longUrl and its corresponding shortUrl in our temporary "database."
    urlMap.set(shortUrl, longUrl);

    return NextResponse.json({
      shortUrl: `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}/${shortUrl}`,
      message: 'URL shortened successfully!'
    });
  } catch (error) {
    console.error('Error shortening URL:', error);
    return NextResponse.json({ message: 'Failed to shorten URL.' }, { status: 500 });
  }
}

// This GET function retrieves the long URL. It is called by your redirect page.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shortUrl = searchParams.get('shortUrl');

  // We check if the URL exists in our temporary database.
  if (!shortUrl || !urlMap.has(shortUrl)) {
    return NextResponse.json({ message: 'URL not found.' }, { status: 404 });
  }

  // If the URL is found, we get the long URL from the map.
  const longUrl = urlMap.get(shortUrl);
  
  return NextResponse.json({ longUrl });
}
