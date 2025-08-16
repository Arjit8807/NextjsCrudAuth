// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {

//     const { email, password } = await request.json();

//     console.log('Received signup request:', { email, password });

//     return NextResponse.json({
//     message: 'User signed up successfully!',
//   }, { status: 201 });
// }

// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';

// This is a dummy 'database' to store our user's credentials.
// In a real application, you would use a service like Firebase or MongoDB.
const users = new Map();

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (users.has(email)) {
    // If the email already exists, return an error.
    return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
  }

  // Store the user's data in our temporary 'database'.
  users.set(email, { email, password });

  console.log('New user signed up:', { email });
  
  return NextResponse.json({
    message: 'User signed up successfully!',
  }, { status: 201 });
}