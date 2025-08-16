const ChatMessageModel = require("../models/chatMessageModel");

const getChatHistory = async (req, res) => {
  const { senderId, receiverId } = req.query;
  if (!senderId || !receiverId) {
    return res.apiError("senderId and receiverId are required", 400);
  }

  try {
    const messages = await ChatMessageModel.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 }); // sort by time ascending

    res.apiSuccess(messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.apiError("Internal server error", 500);
  }
};

module.exports = { getChatHistory };
