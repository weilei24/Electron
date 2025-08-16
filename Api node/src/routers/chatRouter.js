const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Get chat history between two users
router.get("/history", chatController.getChatHistory);

module.exports = router;
