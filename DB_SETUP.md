# Database Setup Guide

## 1. PostgreSQL Configuration

Update `/backend/db.js` with your PostgreSQL credentials:

```javascript
const pool = new Pool({
  user: "postgres", // Your PostgreSQL username
  host: "localhost",
  database: "notificationdb", // Database name
  password: "yourpassword", // Your PostgreSQL password
  port: 5432,
});
```

## 2. Create Database & Table

Run these SQL commands in PostgreSQL:

```sql
-- Create database
CREATE DATABASE notificationdb;

-- Connect to the database
\c notificationdb

-- Create notifications table
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_user_id ON notifications(user_id);
```

## 3. Test Connection

Visit in your browser or use curl:

```
http://localhost:5001/api/health
```

Should return:

```json
{
  "status": "OK",
  "database": "Connected",
  "time": {...}
}
```

If you get an error, check:

- ✅ PostgreSQL is running
- ✅ Database credentials are correct in db.js
- ✅ Database and table exist
- ✅ User has permissions
