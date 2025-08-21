'use client';

import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; // <-- We import the useRouter hook
// import { users } from '@/lib/db'; // Assuming this file exists and is correctly configured
import Link from 'next/link';


const SignUpForm = () => {
    // const router = useRouter(); // <-- We initialize the router
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const [message, setMessage] = useState('');

     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
  
        setMessage('Signing up...');
      
        //  console.log('Sign Up Submitted:', { email, password });

        try{
          const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
         body: JSON.stringify({ email, password }),
      });

      const data = await response.json() as { message: string };

      if (response.ok) {
         setMessage(data.message);
        //  router.push('/signin'); // <-- Redirect to the homepage on success
      } else {
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
       console.error('Error:', error);
      setMessage('Network error. Please try again.');
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg shadow-lg max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create an Account</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label htmlFor="email-input" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password-input" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
      </form>
      {/* This paragraph will display a message to the user, such as "Signing up..." or "Invalid credentials.". */}
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
     
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account? 
        <Link href="/signin" className="text-blue-600 hover:underline">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUpForm;