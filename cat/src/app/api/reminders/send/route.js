import prisma from "../../../../lib/prisma";
import { messaging } from "@/lib/firebaseAdmin";
export async function GET() {
  try {
    const now = new Date();

    // Step 1: Query the database for reminders that are due
    // Fetch reminders that are due up to the current time and have not been marked as read
    const dueReminders = await prisma.notification.findMany({
      where: {
        reminderTime: {
          lte: now, // All reminders that are due now or in the past
        },
        isRead: false, // Only those that have not been processed
      },
    });

    // Step 2: Check if there are any due reminders to process
    if (dueReminders.length === 0) {
      console.log("No reminders to send at this time.");
      return new Response(
        JSON.stringify({ message: "No reminders to send at this time." }),
        { status: 200 }
      );
    }

    // Step 3: Iterate through reminders and send notifications
    for (const reminder of dueReminders) {
      // Fetch user details using userUid
      const user = await prisma.user.findUnique({
        where: {
          uid: reminder.userUid,
        },
      });

      // Step 4: If user exists and has an FCM token, send the notification
      if (user && user.fcmToken) {
        const message = {
          token: user.fcmToken,
          notification: {
            title: reminder.title,
            body: reminder.message,
          },
        };

        try {
          // Send the notification using Firebase Admin SDK
          await messaging.send(message);

          // Step 5: Mark the reminder as "read" to prevent re-sending
          await prisma.notification.update({
            where: {
              id: reminder.id,
            },
            data: {
              isRead: true,
            },
          });

          console.log(`Successfully sent reminder to user ${user.uid}`);
        } catch (error) {
          console.error(`Error sending reminder to user ${user.uid}:`, error);
        }
      } else {
        console.error(
          `Reminder cannot be sent: No FCM token found for user ${reminder.userUid}`
        );
      }
    }

    // Step 6: Return a success response
    return new Response(
      JSON.stringify({ message: "Reminders processed successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing reminders:", error);
    return new Response(
      JSON.stringify({
        error: `An error occurred while processing reminders: ${error.message}`,
      }),
      { status: 500 }
    );
  }
}
