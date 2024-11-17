// File: /app/api/cats/add/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, breed, birthday, ownerUid } = body;

    // Validate input
    if (!name || !ownerUid) {
      return new Response(JSON.stringify({ error: 'Name and ownerUid are required.' }), { status: 400 });
    }

    // Create a new cat in the database
    // Verify the user exists in the User table
    const userExists = await prisma.user.findUnique({
      where: { uid: ownerUid },
    });

    if (!userExists) {
      return new Response(JSON.stringify({ error: 'User not found.' }), { status: 404 });
    }

    // Create a new cat in the database
    const newCat = await prisma.cat.create({
      data: {
        name,
        breed,
        birthday,
        ownerUid,
      },
    });

    return new Response(JSON.stringify(newCat), { status: 201 });
  } catch (error) {
    console.error('Error adding cat:', error);
    return new Response(JSON.stringify({ error: 'An error occurred while adding the cat.' }), { status: 500 });
  }
}
