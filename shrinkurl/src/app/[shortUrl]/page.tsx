// src/app/[shortUrl]/page.tsx

import { redirect } from 'next/navigation';
import { getUrl } from '../../../db/queries';

export default async function RedirectPage({ params }: { params: { shortUrl: string } }) {
  const shortUrl = params.shortUrl;

  const longUrl = await getUrl(shortUrl);

  if (longUrl) {
    redirect(longUrl);
  } else {
    redirect('/');
  }
}