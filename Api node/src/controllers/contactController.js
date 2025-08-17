const UserContactModel = require("../models/userContactModel");
const UserInfoModel = require("../models/userInfoModel");
const UserContactApplyModel = require("../models/userContactApplyModel");

//查用户信息
const getUserInfo = async (req, res) => {
  const { userId } = req.query;
  console.log("Received userId:", req.query);
  if (!userId) {
    return res.apiError("userId is required", 400);
  }
  try {
    const user = await UserInfoModel.find({ userId: userId });
    if (!user) {
      return res.apiError("User not found", 404);
    }
    res.apiSuccess(user);
  } catch (error) {
    res.apiError("Internal server error", 500);
  }
};
//查询联系人信息
const getUserContacts = async (req, res) => {
  const { userId } = req.query;
  console.log("Received userId:", req.query);
  if (!userId) {
    return res.apiError("userId is required", 400);
  }
  try {
    const contacts = await UserContactModel.find({ userId: userId });
    res.apiSuccess(contacts);
  } catch (error) {
    res.apiError("Internal server error", 500);
  }
};
//通知添加联系人
const notifyAddContact = async (req, res) => {
  const { applyUserId, receiveUserId, contactId, applyInfo } = req.body;
  if (!applyUserId || !receiveUserId || !contactId) {
    return res.apiError(
      "applyUserId, receiveUserId and contactId are required",
      400
    );
  }
  try {
    //获取谁发送好友请求
    const user = await UserInfoModel.findOne({ userId: applyUserId }).lean();
    // 这里可以添加逻辑来通知用户
    console.log(user);
    const contact = await UserContactApplyModel.create({
      applyUserId: applyUserId,
      applyNickName: user.nickName,
      receiveUserId: receiveUserId,
      contactId: contactId,
      applyInfo: applyInfo,
      avatar: user.avatar || "default_avatar.png", // 默认头像
    });
    res.apiSuccess(contact);
  } catch (error) {
    res.apiError("Internal server error", 500);
  }
};
//获取添加通知
const getContactApply = async (req, res) => {
  const { userId } = req.query;
  console.log("Received userId for notifications:", req.query);
  if (!userId) {
    return res.apiError("userId is required", 400);
  }
  try {
    const notifications = await UserContactApplyModel.find({
      receiveUserId: userId,
    });
    res.apiSuccess(notifications);
  } catch (error) {
    res.apiError("Internal server error", 500);
  }
};
//同意添加
const agreeAddContact = async (req, res) => {
  const { userId, contactId } = req.body;
  if (!userId || !contactId) {
    return res.apiError("userId and contactId are required", 400);
  }
  try {
    const newUser = await UserInfoModel.findOne({ userId: contactId }).lean();
    const user = await UserInfoModel.findOne({ userId: userId }).lean();
    //双方好友建立
    await UserContactModel.create({
      userId: userId,
      contactId: contactId,
      contactNickName: newUser.nickName,
      avatar: newUser.avatar || "default_avatar.png", // 默认头像
      status: 1,
    });
    //双方好友建立
    await UserContactModel.create({
      userId: contactId,
      contactId: userId,
      contactNickName: user.nickName,
      avatar: user.avatar || "default_avatar.png", // 默认头像
      status: 1, // 设置为好友状态
    });
    //更新好友申请状态

    const filter = { contactId: contactId };
    await UserContactApplyModel.updateOne(filter, {
      status: 1,
    });

    res.apiSuccess("Contact request accepted");
  } catch (error) {
    res.apiError("Internal server error", 500);
  }
};
//拒绝添加
const rejectAddContact = async (req, res) => {
  const { userId, contactId } = req.body;
  if (!userId || !contactId) {
    return res.apiError("userId and contactId are required", 400);
  }
  try {
    await UserContactModel.create({
      userId: userId,
      contactId: contactId,
    });
    await UserContactApplyModel.deleteOne({
      applyUserId: contactId,
      receiveUserId: userId,
    });
    res.apiSuccess("Contact request accepted");
  } catch (error) {
    res.apiError("Internal server error", 500);
  }
};

module.exports = {
  getUserInfo,
  notifyAddContact,
  getContactApply,
  agreeAddContact,
  rejectAddContact,
  getUserContacts,
};
