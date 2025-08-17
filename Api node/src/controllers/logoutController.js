//用户退出登录
const userLogout = async (req, res) => {
  // 基于 Token 的认证，退出登录主要是前端的职责（删除 Token）。
  res.apiSuccess();
};

module.exports = { userLogout };
