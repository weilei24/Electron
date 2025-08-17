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
