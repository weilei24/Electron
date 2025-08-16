const { Server } = require("socket.io");
const ChatMessageModel = require("../models/chatMessageModel");
const UserInfoModel = require("../models/userInfoModel");

const socketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // In a production environment, you should restrict this to your client's domain
      methods: ["GET", "POST"],
    },
  });

  const userSockets = {}; // In-memory store for userId -> socketId mapping

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // User registers their userId to the socket
    socket.on("register", (userId) => {
      if (userId) {
        userSockets[userId] = socket.id;
        console.log(`User ${userId} registered with socket ${socket.id}`);
        console.log("Current user sockets:", userSockets);
      }
    });

    // Handle private messages
    socket.on("private_message", async (data) => {
      const { senderId, receiverId, messageType, content } = data;

      if (!senderId || !receiverId || !content) {
        socket.emit("error_message", "Missing required message data");
        return;
      }
      try {
        // 1. Save the message to the database
        const senderUser = await UserInfoModel.findOne({
          userId: senderId,
        }).lean();
        const receiveUser = await UserInfoModel.findOne({
          userId: receiverId,
        }).lean();

        const newMessage = new ChatMessageModel({
          senderId,
          receiverId,
          messageType,
          content,
          senderAvatar: senderUser.avatar || "default_avatar.png",
          receiverAvatar: receiveUser.avatar || "default_avatar.png",
        });
        await newMessage.save();

        // 2. Check if the receiver is online and forward the message
        const receiverSocketId = userSockets[receiverId];
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", newMessage);
          console.log(
            `Message sent from ${senderId} to online user ${receiverId}`
          );
        } else {
          // 3. Handle offline message storage and push notification
          console.log(`User ${receiverId} is offline. Message stored.`);
          // ** Offline Push Notification Logic **
          // This is where you would trigger a push notification service
          // (e.g., Firebase Cloud Messaging, APN, etc.).
          // You would typically find the user's device token from your database
          // and send a notification payload.
        }
      } catch (error) {
        console.error("Error handling private message:", error);
        socket.emit("error_message", "Server error while sending message");
      }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      // Remove the user from the mapping on disconnect
      for (const userId in userSockets) {
        if (userSockets[userId] === socket.id) {
          delete userSockets[userId];
          console.log(`User ${userId} unregistered.`);
          break;
        }
      }
      console.log("Current user sockets:", userSockets);
    });
  });
};
module.exports = socketServer;
