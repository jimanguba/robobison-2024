import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userUid, title, message, reminderTime } = body;

    // Validate the required fields
    if (!userUid || !title || !message || !reminderTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate reminderTime is a valid date
    const parsedReminderTime = new Date(reminderTime);
    if (isNaN(parsedReminderTime.getTime())) {
      return NextResponse.json(
        { error: "Invalid reminder time provided" },
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
        reminderTime: parsedReminderTime, // Ensure reminderTime is a Date object
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
