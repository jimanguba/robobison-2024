let notifications = [];

export async function POST(req) {
  try {
    const { title, message, sender, recipient, userId } = await req.json();

    if (!sender) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (sender === "noti-server") {
      if (recipient in notifications) {
        notifications[recipient].push({ title, message });
      } else {
        notifications[recipient] = [{ title, message }];
      }

      return new Response(
        JSON.stringify({
          messageServer: "Notification received by server.",
          notification: { title, message },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (sender === "client") {
      if (notifications[userId].length === 0 || !userId) {
        return new Response(JSON.stringify({ error: "No notifications" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Notification to send back as we have some
      const curr_noti = notifications[userId].shift();

      return new Response(
        JSON.stringify({
          title: curr_noti.title,
          message: curr_noti.message,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
