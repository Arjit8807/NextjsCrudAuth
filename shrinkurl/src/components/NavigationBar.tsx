// src/components/NavigationBar.tsx

import React from 'react';

const NavigationBar = () => {
  return (
    <nav className="flex justify-between items-center py-[92px] px-[240px]">
      <a href="/ " className="text-3xl font-extrabold text-gray-800">ShrinkURL</a>
      <div className="flex items-center space-x-6">
        <a href="/signin" className="text-gray-600 hover:text-blue-500 transition-colors">Sign In</a>
        <a href="/signup" className="text-gray-600 hover:text-blue-500 transition-colors">Sign Up</a>
      </div>
    </nav>
  );
};

export default NavigationBar;