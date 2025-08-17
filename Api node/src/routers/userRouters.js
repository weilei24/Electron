//express_demo.js 文件
var express = require("express");

const router = express.Router();
const contactController = require("../controllers/contactController");

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

module.exports = router;
