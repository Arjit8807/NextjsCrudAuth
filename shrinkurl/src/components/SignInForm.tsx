'use client';


import React, { useState } from 'react';

const SignInForm=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    // We're adding a new state variable to display messages to the user.
  const [message, setMessage] = useState('');

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();

        setMessage('Signing in...');

        try{
          const response=await fetch('/api/auth/signin' ,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email,password}),
          });
          const data = await response.json() as { message: string }

          if(response.ok){
            setMessage(data.message);
          }
          else{
            setMessage(data.message || 'Invalid credentials. Please try again.');
          }
        }

        catch(error){
          console.error('Error:',error);
          setMessage('Network error. Please try again.');
        }

        
    };

    return (
    <div className='flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg shadow-lg max-w-sm mx-auto' >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In to Your Account</h2>
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
          Sign In
        </button>
      </form>
      {/* This line conditionally renders the message paragraph only if the 'message' state is not empty. */}
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
    );

};

export default SignInForm;

