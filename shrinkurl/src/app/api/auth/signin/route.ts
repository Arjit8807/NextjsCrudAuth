import { NextResponse } from 'next/server';

export async function POST(request: Request) {


    const { email, password } = await request.json();
      console.log('Received signin request:', { email, password });
      if (email === 'test@example.com' && password === 'password123') {
      return NextResponse.json({
        message: 'User signed in successfully!',
      });
  } else {
 return NextResponse.json({
    message: 'Invalid credentials.',
    }, { status: 401 })
  }
}