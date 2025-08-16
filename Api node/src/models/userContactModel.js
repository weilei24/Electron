const mongoose = require("mongoose");

let UserContactSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  contactId: {
    type: String,
    required: true,
  },
  contactNickName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  contactType: {
    type: Number,
    enum: [0, 1], //好友,群组
    default: 0,
  },
  updateTime: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: Number,
    enum: [0, 1, 2, 3], // 非好友, 好友, 删除, 拉黑
    default: 0,
  },
});
// Create a model based on the schema
let UserContactModel = mongoose.model("UserContact", UserContactSchema);

module.exports = UserContactModel;
