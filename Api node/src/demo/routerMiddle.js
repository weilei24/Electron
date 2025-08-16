var express = require("express");
var app = express();

const fs = require("fs");
const path = require("path");

function routerMiddleware(req, res, next) {
  if (req.query.code === "123") {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
  // 执行下一个中间件或路由处理程序
}

app.get("/home", routerMiddleware, function (req, res) {
  res.send("Welcome to the Home Page");
});
app.get("/about", routerMiddleware, function (req, res) {
  res.send("About Us");
});

app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
