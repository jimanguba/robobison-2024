import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { uid } = body;

    // Check if the required field is provided
    if (!uid || typeof uid !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid uid field" }),
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        uid: uid,
      },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 200 }
      );
    }

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        uid: uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    console.error("Error adding user:", error);
    return new Response(
      JSON.stringify({ error: `An error occurred while adding the user: ${error.message}` }),
      { status: 500 }
    );
  }
}
