module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ User Connected, Socket ID:", socket.id);

    socket.on("join_room", (userId) => {
      socket.join(userId.toString());

      console.log(`📍 User ${userId} joined room. Socket: ${socket.id}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ User Disconnected, Socket ID:", socket.id);
    });
  });
};
