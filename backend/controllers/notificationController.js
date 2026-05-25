const pool = require("../db");

const sendNotification = async (req, res, io) => {
  try {
    const { userId, message } = req.body;

    console.log(
      "📤 Sending notification to User:",
      userId,
      "Message:",
      message,
    );

    if (!userId || !message) {
      return res.status(400).json({
        error: "User ID and message are required",
      });
    }

    await pool.query(
      "INSERT INTO notifications(user_id, message) VALUES($1,$2)",
      [userId, message],
    );

    console.log("✅ Notification saved to database");

    io.to(userId.toString()).emit("receive_notification", {
      message,
    });

    console.log("📡 Emitted to room:", userId);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("❌ Error in sendNotification:", error.message);
    console.error("Full error:", error);

    res.status(500).json({
      error: error.message || "Server Error",
    });
  }
};

module.exports = {
  sendNotification,
};
