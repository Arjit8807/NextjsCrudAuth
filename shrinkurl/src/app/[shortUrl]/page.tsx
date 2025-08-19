// src/app/[shortUrl]/page.tsx

import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }: { params: { shortUrl: string } }) {
  const { shortUrl } = params;
  
  // This is a crucial line. We are making a `fetch` request to our backend API.
  // We use `http://localhost:3000` because the app is running locally.
  const response = await fetch(`http://localhost:3000/api/shorten?shortUrl=${shortUrl}`);
  
  if (!response.ok) {
    // If the API returns an error (e.g., 404), we redirect to the homepage.
    redirect('/');
  }

  const data = await response.json();
  const longUrl = data.longUrl;

  if (longUrl) {
    // If the long URL is found, we redirect to it.
    redirect(longUrl);
  } else {
    // If the long URL is not found, we redirect to the homepage.
    redirect('/');
  }
}
