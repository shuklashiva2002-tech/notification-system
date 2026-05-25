const express = require("express");
const http = require("http");
const cors = require("cors");
const pool = require("./db");

const app = express();

const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

require("./websocket")(io);

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({
      status: "OK",
      database: "Connected",
      time: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Health check failed:", error.message);
    res.status(500).json({
      status: "ERROR",
      database: "Not Connected",
      error: error.message,
    });
  }
});

const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/notifications", notificationRoutes(io));

server.listen(5001, () => {
  console.log("✅ Server running on port 5001");
  console.log("🔗 Check database: GET http://localhost:5001/api/health");
});
