// pages/api/reminders.js
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, description, notificationTime } = req.body;

    try {
      const newReminder = await prisma.reminder.create({
        data: {
          title,
          description,
          notificationTime,
        },
      });
      res.status(200).json(newReminder);
    } catch (error) {
      console.error("Error saving reminder:", error);
      res.status(500).json({ error: "Error saving reminder" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
