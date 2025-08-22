import { redirect } from 'next/navigation';
import { getUrl } from '../../../db/queries';


interface PageProps {
  params: {
    shortUrl: string;
  };
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortUrl } = params;

  const longUrl = await getUrl(shortUrl);

  if (longUrl) {
    redirect(longUrl);
  } else {
    redirect('/');
  }
}
