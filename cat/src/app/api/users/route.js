// src/app/api/users/route.js

import prisma from "../../../lib/prisma";

export async function GET(req) {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Error fetching users" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, reminderTime } = body;

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        reminderTime,
      },
    });
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: "Error creating user" }), {
      status: 500,
    });
  }
}
