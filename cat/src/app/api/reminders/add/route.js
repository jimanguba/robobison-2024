import prisma from "@/lib/prisma";

export async function POST(req) {
  const body = await req.json();
  const { userUid, title, message, reminderTime } = body;

  // Validate the required fields
  if (!userUid || !title || !message || !reminderTime) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        uid: userUid,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Create a new notification using Prisma Client
    const notification = await prisma.notification.create({
      data: {
        userUid: userUid,
        title: title,
        message: message,
        isRead: false,
        createdAt: new Date(),
        reminderTime: new Date(reminderTime), // Ensure reminderTime is converted to Date
      },
    });

    return new Response(JSON.stringify(notification), { status: 200 });
  } catch (error) {
    console.error('Error adding notification:', error);
    return new Response(
      JSON.stringify({ error: `An error occurred while adding the notification: ${error.message}` }),
      { status: 500 }
    );
  }
}
