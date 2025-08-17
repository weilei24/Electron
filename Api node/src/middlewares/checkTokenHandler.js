const jwt = require("jsonwebtoken");
const { fetchToken } = require("../utils/fetchToken");

let checkTokenHandler = (req, res, next) => {
  // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

  const token = fetchToken(req);

  if (!token) {
    return res.json({
      code: "2003",
      token: "require token",
      data: null,
    });
  }

  jwt.verify(token, "userToken", (err, data) => {
    if (err) {
      return res.json({
        code: "2004",
        msg: "token verify failed",
        data: null,
      });
    }
    next();
  });
};

module.exports = checkTokenHandler;
