'use client';

import React, { useState } from 'react';

const URLShortenerForm=()=>{

    const[longURL,setLongURL]=useState('');

    const handleSubmit=(e: React.FormEvent)=>{

        e.preventDefault();

        console.log('Submitted URL:',longURL);

    };

    return(
        <div className="flex flex-col items-center justify-center min-h-[45vh] mx-auto px-10 py-17">
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
          className="flex-auto items-center space-x-2 py-6 bg-black-100 rounded-lg shadow-lg max-w-5xl mx-auto mt-2"
          >
            <input
        type="url"
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
        placeholder="Paste a long URL here..."
        className="flex-grow px-[110px] py-3  border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="flex-grow px-5 py-3  bg-blue-600 text-white border border-gray-400 rounded-md hover:bg-blue-700 transition-colors"
      >
        Shorten
      </button>
          </form>
          
          </div>
    );
};

export default URLShortenerForm;