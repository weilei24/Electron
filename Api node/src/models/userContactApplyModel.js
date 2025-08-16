const mongoose = require("mongoose");

let UserContactApplySchema = new mongoose.Schema({
  applyUserId: {
    type: String,
    required: true,
  },
  applyNickName: {
    type: String,
    required: true,
  },
  receiveUserId: {
    type: String,
    required: true,
  },
  contactId: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "default_avatar.png",
  },
  contactType: {
    type: String,
    enum: [0, 1], //好友,群组
    default: 0,
  },

  lastApplyTime: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: Number,
    enum: [0, 1, 2, 3], // 待处理, 一同意, 一拒绝, 一拉黑
    default: 0,
  },
  applyInfo: {
    type: String,
  },
});
// Create a model based on the schema
let UserContactApplyModel = mongoose.model(
  "UserContactApply",
  UserContactApplySchema
);

module.exports = UserContactApplyModel;
