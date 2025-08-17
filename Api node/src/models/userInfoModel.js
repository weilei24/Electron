const mongoose = require("mongoose");

let UserInfoSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    //default: '0000000000'
    //enum: ['1234567890', '0987654321'] //枚举
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "default_avatar.png",
  },
  joinType: {
    type: Number,
    enum: [0, 1], //0:公开 1:私密
    default: 0,
  },
  sex: {
    type: Number,
    enum: [0, 1], // 1:男 2:女
    default: 1,
  },
  personalSignature: {
    type: String,
    default: "",
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  lastLoginTime: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    enum: [0, 1], //0:禁用 1:启用
    default: 1,
  },
  areaName: {
    type: String,
    default: "",
  },
  areaCode: {
    type: String,
    default: "",
  },
  lastOffTime: {
    type: Date,
    default: Date.now,
  },
});
// Create a model based on the schema
let UserInfoModel = mongoose.model("UserInfo", UserInfoSchema);

module.exports = UserInfoModel;
