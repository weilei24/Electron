//express_demo.js 文件
var express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const contactController = require("../controllers/contactControl");
const chatController = require("../controllers/chatController");

router.post("/login", userController.getUserByCredentials);
router.post("/register", userController.createUser);
router.get("/logout", userController.userLogout);
//搜索联系人
router.get("/getUserContacts", contactController.getUserContacts);
//添加联系人
router.get("/getUserInfo", contactController.getUserInfo);
//通知添加联系人
router.post("/notifyAddContact", contactController.notifyAddContact);
//获取通知
router.get("/getContactApply", contactController.getContactApply);
//同意添加联系人
router.post("/agreeAddContact", contactController.agreeAddContact);
//拒绝添加联系人
router.post("/rejectAddContact", contactController.rejectAddContact);
//获取聊天信息
router.get("/getChatHistory", chatController.getChatHistory);
module.exports = router;
