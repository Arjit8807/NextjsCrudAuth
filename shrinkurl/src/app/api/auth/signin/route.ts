// src/app/api/auth/signin/route.ts

// We import NextResponse to create and send a standardized response.
import { NextResponse } from 'next/server';

// We import the shared 'users' Map from our lib/db.ts file.
import { users } from '@/lib/db';

// This function handles incoming HTTP POST requests.
// It's a backend function, not part of the frontend UI.
export async function POST(request: Request) {
  // We read the email and password from the request body.
  const { email, password } = await request.json();

  // We check if the user exists in our shared database.
  if (!users.has(email)) {
    return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
  }

  // We get the user's data from our shared database.
  const user = users.get(email);

  // We check if the password matches the one in our database.
  if (user.password !== password) {
    return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
  }

  return NextResponse.json({
    message: 'User signed in successfully!',
  });
}