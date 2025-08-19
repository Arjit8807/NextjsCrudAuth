

// We import NextResponse to create and send a standardized response.
import { NextResponse } from 'next/server';

// We import the shared 'users' Map from our lib/db.ts file.
import { users } from '@/lib/db';

// This function handles incoming HTTP POST requests.
// It's a backend function, not part of the frontend UI.
export async function POST(request: Request) {
  // We read the email and password from the request body.
  const { email, password } = await request.json();

  // We check if the user already exists in our shared database.
  if (users.has(email)) {
    return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
  }

  // We store the new user's data in the shared Map.
  users.set(email, { email, password });
  
  return NextResponse.json({
    message: 'User signed up successfully!',
  }, { status: 201 });
}