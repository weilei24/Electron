const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },

  messageType: {
    type: String,
    enum: ["text", "image", "file"],
    default: "text",
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent",
  },
});

const ChatMessageModel = mongoose.model("ChatMessage", ChatMessageSchema);

module.exports = ChatMessageModel;
