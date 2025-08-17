const fetchToken = (req) => {
  const authHeader = req.get("Authorization");
  let token;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // 从 "Bearer " 后面的位置开始截取字符串，即为 token 的值
    token = authHeader.substring(7);
  }
  return token;
};
const parseUserIdFromToken = (token) => {
  let userId;
  jwt.verify(token, "userToken", (err, data) => {
    if (err) {
      return null;
    }
    userId = data.userId; // 假设 token 中包含 userId
  });
  return userId;
};

module.exports = { fetchToken, parseUserIdFromToken };
