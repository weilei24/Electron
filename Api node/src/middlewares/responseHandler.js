//200 OK GET 请求成功，返回数据
//201 Created POST 请求成功，资源已创建
//400 Bad Request 客户端请求参数有误
//401 Unauthorized 未认证 / Token 无效
//403 Forbidden 无权限访问该资源
//404 Not Found 请求的资源不存在
//500 Internal Server Error 服务器内部错误

const responseHandler = (req, res, next) => {
  res.apiSuccess = (data) => {
    res.json({
      code: 200,
      message: "success",
      data: data || null,
      timestamp: Date.now(),
    });
  };
  res.apiError = (message, code = 400) => {
    res.status(code).json({
      code,
      message,
      data: null,
      timestamp: Date.now(),
    });
  };
  next();
};

module.exports = responseHandler;
