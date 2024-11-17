
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");

    if (!ownerId) {
      return new Response(JSON.stringify({ error: "Missing ownerId parameter." }), { status: 400 });
    }

    // Fetch all cats for the specified owner
    const cats = await prisma.cat.findMany({
      where: {
        ownerUid: ownerId,
      },
    });

    return new Response(JSON.stringify(cats), { status: 200 });
  } catch (error) {
    console.error("Error fetching cats:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while fetching the cats." }),
      { status: 500 }
    );
  }
}
