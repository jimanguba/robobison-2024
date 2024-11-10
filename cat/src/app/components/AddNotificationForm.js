'use client'
import { useState } from 'react';
import { auth } from '@/lib/firebaseClient';
const AddNotificationForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Get the current user's ID
    const user = auth.currentUser;
    if (!user) {
      console.error('No user is signed in');
      return;
    }
    const userUid = user.uid;
  
    // Check the payload
    console.log({ userUid, title, message, reminderTime });
  
    try {
      const response = await fetch('/api/reminders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userUid, title, message, reminderTime }),
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
  
      console.log('Reminder added successfully:', result);
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Notification Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Notification Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Reminder Time:</label>
        <input
          type="datetime-local"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Notification</button>
    </form>
  );
};

export default AddNotificationForm;
