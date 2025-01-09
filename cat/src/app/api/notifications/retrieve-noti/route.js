import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const userUid = searchParams.get("userUid");

    // Validate the required fields
    if (!userUid) {
      return NextResponse.json(
        { error: "Missing required field: userUid" },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        uid: userUid,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the latest 10 notifications from the database
    const notifications = await prisma.notification.findMany({
      where: {
        userUid: userUid,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Return notifications
    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    return NextResponse.json(
      {
        error: `An error occurred while retrieving the notifications: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
