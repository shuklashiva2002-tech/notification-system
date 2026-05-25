import { useState } from "react";

import axios from "axios";

function SenderPanel() {
  const [targetUser, setTargetUser] = useState("");

  const [message, setMessage] = useState("");

  const sendNotification = async () => {
    try {
      if (!targetUser || !message.trim()) {
        alert("Please fill in both User ID and Message");
        return;
      }

      const response = await axios.post(
        "http://localhost:5001/api/notifications/send",
        {
          userId: parseInt(targetUser),
          message,
        },
      );

      console.log("✅ Notification sent successfully:", response.data);
      alert("Notification Sent");
      setMessage("");
      setTargetUser("");
    } catch (error) {
      console.error("❌ Error sending notification:", error);
      alert(
        "Failed to send notification: " +
          (error.response?.data?.error || error.message),
      );
    }
  };

  return (
    <div className="card">
      <h2>2. Dispatch API Notification</h2>

      <hr />

      <label>Target User ID</label>

      <input
        type="number"
        value={targetUser}
        onChange={(e) => setTargetUser(e.target.value)}
      />

      <label>Message</label>

      <textarea
        rows="5"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
}

export default SenderPanel;
