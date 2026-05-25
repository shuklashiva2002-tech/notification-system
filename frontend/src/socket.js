import { io } from "socket.io-client";

const socket = io("http://localhost:5001", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket connection error:", error);
});

socket.on("disconnect", () => {
  console.log("⚠️ Socket disconnected");
});

export default socket;
