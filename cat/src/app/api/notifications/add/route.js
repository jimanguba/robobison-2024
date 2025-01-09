import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userUid, title, message } = body;

    // Validate the required fields
    if (!userUid || !title || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    // Create a new notification using Prisma Client
    const notification = await prisma.notification.create({
      data: {
        userUid: userUid,
        title: title,
        message: message,
        isRead: false,
        reminderTime: new Date(), // You can set the reminder time as needed
      },
    });

    return NextResponse.json(notification, { status: 200 });
  } catch (error) {
    console.error("Error adding notification:", error);
    return NextResponse.json(
      {
        error: `An error occurred while adding the notification: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
