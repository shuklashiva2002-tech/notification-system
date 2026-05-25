import { useEffect, useState } from "react";

import socket from "../socket";

function SubscriberPanel() {
  const [currentUser, setCurrentUser] = useState("");

  const [notifications, setNotifications] = useState([]);

  const connectUser = () => {
    socket.emit("join_room", currentUser);

    alert("Connected");
  };

  useEffect(() => {
    socket.on("receive_notification", (data) => {
      console.log("📬 Notification received:", data);
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("receive_notification");
    };
  }, [socket]);

  return (
    <div className="card">
      <h2>1. Initialize Subscriber Connection</h2>

      <hr />

      <label>User ID</label>

      <input
        type="number"
        value={currentUser}
        onChange={(e) => setCurrentUser(e.target.value)}
      />

      <button onClick={connectUser}>Connect to Live Stream</button>

      <h3>Incoming Active Alerts</h3>

      <div className="notifications">
        {notifications.map((n, index) => (
          <div className="notification" key={index}>
            <h4>🔔 New Notification</h4>

            <p>{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriberPanel;
