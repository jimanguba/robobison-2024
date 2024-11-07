import React, { useState } from "react";

function ReminderForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notificationTime, setNotificationTime] = useState("09:00"); // Default time is 9 AM

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/reminders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        notificationTime,
      }),
    });

    if (response.ok) {
      alert("Reminder saved!");
    } else {
      alert("Error saving reminder");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Reminder Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Notification Time:
        <input
          type="time"
          value={notificationTime}
          onChange={(e) => setNotificationTime(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save Reminder</button>
    </form>
  );
}

export default ReminderForm;
