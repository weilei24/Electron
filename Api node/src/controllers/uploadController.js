const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { fetchToken } = require("../utils/fetchToken");
const UserInfoModel = require("../models/userInfoModel"); // 1. 引入 UserInfoModel

// 确保头像上传目录存在
const avatarDirectory = path.join(__dirname, "../avatar");
if (!fs.existsSync(avatarDirectory)) {
  fs.mkdirSync(avatarDirectory, { recursive: true });
}

// 配置 multer 存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, avatarDirectory); // 文件存储的路径
  },
  filename: function (req, file, cb) {
    const token = fetchToken(req);
    if (!token) {
      return cb(new Error("Token not found!"), false);
    }

    jwt.verify(token, "userToken", (err, decoded) => {
      if (err) {
        return cb(new Error("Token verification failed!"), false);
      }

      const userId = decoded.userId;
      req.userId = userId; // 2. 将 userId 附加到 req 对象上，以便后续控制器使用

      const fileExt = path.extname(file.originalname);
      const newFilename = `${userId}${fileExt}`;
      cb(null, newFilename);
    });
  },
});

const upload = multer({ storage: storage });

// 3. 将控制器改为 async 函数以使用 await
const uploadAvatar = async (req, res) => {
  if (!req.file) {
    return res.apiError("File upload failed.", 400);
  }

  try {
    const userId = req.userId;
    if (!userId) {
      return res.apiError("User ID not found in token.", 401);
    }

    // 4. 构建头像的公开访问 URL
    const port = process.env.PORT || 8081;
    // 注意：这里的 'avatars' 路径需要与 app.js 中配置的静态服务路径一致
    const avatarUrl = `http://localhost:${port}/avatars/${req.file.filename}`;

    // 5. 更新数据库中对应用户的 avatar 字段
    await UserInfoModel.findOneAndUpdate(
      { userId: userId },
      { $set: { avatar: avatarUrl } },
      { new: true }
    );

    // 6. 返回成功响应，并附带新的 avatarUrl
    res.apiSuccess({
      message: "Avatar uploaded and user profile updated successfully.",
      filename: req.file.filename,
      avatarUrl: avatarUrl,
    });
  } catch (error) {
    console.error("Error updating user avatar:", error);
    res.apiError("Failed to update user profile.", 500);
  }
};

module.exports = {
  upload,
  uploadAvatar,
};
