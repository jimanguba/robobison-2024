import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userUid, catId, type, description, moodMagnitude } = body;

    // Check if the required field is provided
    if (!userUid || typeof userUid !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid uid field" }),
        { status: 400 }
      );
    }

    // Check if the catId is provided
    if (!catId || typeof catId !== "number") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid catId field" }),
        { status: 400 }
      );
    }

    // Check if the type is provided
    if (!type || typeof type !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid catId field" }),
        { status: 400 }
      );
    }

    // Check if the description is provided
    if (!description || typeof description !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid catId field" }),
        { status: 400 }
      );
    }

    // Check if the description is provided
    if (!moodMagnitude || typeof moodMagnitude !== "number") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid catId field" }),
        { status: 400 }
      );
    }

    // Create a new mood
    const newMood = await prisma.journalEntry.create({
      data: {
        userUid: userUid,
        catId: catId,
        type: type,
        description: description,
        moodMagnitude: moodMagnitude,
        createdAt: new Date(),
      },
    });

    return new Response(JSON.stringify(newMood), { status: 200 });
  } catch (error) {
    console.error("Error adding Mood Journal:", error);
    return new Response(
      JSON.stringify({
        error: `An error occurred while adding the mood: ${error.message}`,
      }),
      { status: 500 }
    );
  }
}
