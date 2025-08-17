// uploadRouter.js
var express = require("express");
const router = express.Router();

// 从控制器中导入 upload 中间件和 uploadAvatar 处理器
const { upload, uploadAvatar } = require("../controllers/uploadController");

// 上传头像的路由
// 首先使用 upload.single('avatar') 中间件处理文件上传
// 'avatar' 必须与前端 formData.append('avatar', file) 中的字段名一致
router.put("/updateAvatar", upload.single("avatar"), uploadAvatar);

module.exports = router;
