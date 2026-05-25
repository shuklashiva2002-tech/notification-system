const express = require("express");

const router = express.Router();

const { sendNotification } = require("../controllers/notificationController");

module.exports = (io) => {
  router.post("/send", (req, res) => {
    sendNotification(req, res, io);
  });

  return router;
};
