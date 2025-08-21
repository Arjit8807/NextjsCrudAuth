import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // We find the user by their email in the database.
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user) {
      // If no user is found, we return an "Invalid credentials" error.
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // We compare the password the user entered with the hashed password in the database.
    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordCorrect) {
      // If the passwords don't match, we return an "Invalid credentials" error.
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'User signed in successfully!',
    });

  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json({
      message: 'Failed to sign in.',
    }, { status: 500 });
  }
}