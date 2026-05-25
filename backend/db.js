const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "shivay2003",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "notificationdb",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT || 5432,
});

pool.on("error", (err) => {
  console.error("❌ Unexpected connection pool error:", err);
});

pool.on("connect", () => {
  console.log("✅ Database connected successfully");
});

module.exports = pool;
