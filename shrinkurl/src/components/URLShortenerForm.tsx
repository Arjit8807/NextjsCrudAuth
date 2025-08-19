// src/components/URLShortenerForm.tsx

// We need 'use client' because we're using hooks like useState.
'use client';

import React, { useState } from 'react';

const URLShortenerForm = () => {
  // We'll add a new state to store the shortened URL that we get back from the API.
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  // The handleSubmit function is now an async function so it can wait for the API response.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShortUrl(''); // Clear the previous short URL
    
    try {
      // This is the line that connects your frontend to the backend.
      // We make a POST request to our API route.
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // We send the 'longUrl' state in the body of the request.
        body: JSON.stringify({ longUrl }),
      });

      // If the response is not successful, we throw an error.
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // We parse the JSON response from the server.
      const data = await response.json();
      console.log('Shortened URL received:', data);

      // We update the shortUrl state with the new data.
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setShortUrl('Error: Could not shorten URL.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] mx-auto px-10">
      <div className="mb-0 text-center max-w-5xl ">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-2">
          One Link, Infinite Possibilities
        </h1>
        <p className="text-gray-600 text-lg">
          Create short, memorable links in seconds. Sign up to manage your links, track clicks and see your analytics.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex  items-stretch space-x-0 py-6 rounded-lg shadow-lg max-w-5xl mx-auto mt-2"
      >
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Paste a long URL here..."
          className="flex-grow bg-transparent w-fit px-[110px] py-3   border-gray-400 rounded-md   focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-blue-600 text-black rounded-r-md rounded-l-none hover:bg-blue-700 transition-colors"
        >
          Shorten
        </button>
      </form>
      
      {/* This new section will only be visible if a short URL exists in the state. */}
      {shortUrl && (
        <div className="mt-8 text-center bg-gray-100 p-6 rounded-lg shadow max-w-lg mx-auto">
          <p className="text-gray-800 text-lg font-semibold mb-2">Your short URL is:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl font-bold hover:underline">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default URLShortenerForm;
