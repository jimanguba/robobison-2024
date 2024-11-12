import prisma from "../../../../lib/prisma";
import { messaging } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Step 1: Get the current time in UTC
    const nowUTC = new Date(new Date().toISOString()); // Convert to UTC Date object

    // Step 2: Query the database for reminders that are due
    // Fetch reminders that are due up to the current time in UTC and have not been marked as read
    const dueReminders = await prisma.notification.findMany({
      where: {
        reminderTime: {
          lte: nowUTC, // Ensure both `now` and `reminderTime` are in UTC
        },
        isRead: false, // Only those that have not been processed
      },
    });

    // Step 3: Check if there are any due reminders to process
    if (dueReminders.length === 0) {
      console.log("No reminders to send at this time.");
      return NextResponse.json(
        { message: "No reminders to send at this time." },
        { status: 200 }
      );
    }

    // Step 4: Iterate through reminders and send notifications in parallel
    await Promise.all(
      dueReminders.map(async (reminder) => {
        // Fetch user details using userUid
        const user = await prisma.user.findUnique({
          where: {
            uid: reminder.userUid,
          },
        });

        // If user exists and has an FCM token, send the notification
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

            // Mark the reminder as "read" to prevent re-sending
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

            // Handle the "registration-token-not-registered" error
            if (
              error.errorInfo &&
              error.errorInfo.code === "messaging/registration-token-not-registered"
            ) {
              console.warn(`Removing invalid FCM token for user ${user.uid}`);
              await prisma.user.update({
                where: {
                  uid: user.uid,
                },
                data: {
                  fcmToken: null, // Clear the invalid FCM token
                },
              });
            }
          }
        } else {
          console.error(
            `Reminder cannot be sent: No FCM token found for user ${reminder.userUid}`
          );
        }
      })
    );

    // Step 5: Return a success response
    return NextResponse.json(
      { message: "Reminders processed successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing reminders:", error);
    return NextResponse.json(
      {
        error: `An error occurred while processing reminders: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
