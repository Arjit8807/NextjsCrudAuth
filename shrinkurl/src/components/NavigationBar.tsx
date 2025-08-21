// src/components/NavigationBar.tsx
'use client';
import React from 'react';
import Link from 'next/link';

const NavigationBar = () => {
  return (
    <nav className="flex justify-between items-center py-[92px] px-[240px]">
      <Link href="/ " className="text-3xl font-extrabold text-gray-800">ShrinkURL</Link>
      <div className="flex items-center space-x-6">
        {/* <Link href="/dashboard" className="px-4 py-2 text-gray-600 rounded-md hover:text-blue-500 transition-colors">Dashboard</Link> */}
        <Link href="/signin" className="text-gray-600 hover:text-blue-500 transition-colors">Sign In</Link>
        <Link href="/signup" className="text-gray-600 hover:text-blue-500 transition-colors">Sign Up</Link>
      </div>
    </nav>
  );
};

export default NavigationBar;