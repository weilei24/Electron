const mongoose = require("mongoose");

let GroupInfoSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  groupOwnerId: {
    type: String,
    required: true,
  },

  createTime: {
    type: Date,
    default: Date.now,
  },
  groupNotice: {
    type: String,
    default: "",
  },
  joinType: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});
// Create a model based on the schema
let GroupInfoModel = mongoose.model("GroupInfo", GroupInfoSchema);

module.exports = GroupInfoModel;
