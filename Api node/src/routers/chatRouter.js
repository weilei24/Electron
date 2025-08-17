const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

//获取聊天信息
router.get("/getChatHistory", chatController.getChatHistory);

module.exports = router;
