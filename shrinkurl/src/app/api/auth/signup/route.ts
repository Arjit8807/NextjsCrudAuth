import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // We check if a user with this email already exists in the database.
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (existingUser) {
      // If the user exists, we return an error message with a 409 status code (Conflict).
      return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
    }

    // We hash the password before saving it to the database. This is a critical security step.
    const passwordHash = await bcrypt.hash(password, 10);

    // We create a new user record in the database using Prisma.
    await prisma.user.create({
      data: {
        email: email,
        password_hash: passwordHash,
      }
    });

    return NextResponse.json({
      message: 'User signed up successfully!',
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({
      message: 'Failed to sign up.',
    }, { status: 500 });
  }
}