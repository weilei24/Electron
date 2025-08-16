var express = require("express");
var app = express();

const fs = require("fs");
const path = require("path");

// 中间件函数
app.use(express.static(path.join(__dirname, "public")));

app.get("/home", routerMiddleware, function (req, res) {
  res.send("Welcome to the Home Page");
});
app.get("/about", routerMiddleware, function (req, res) {
  res.send("About Us");
});

app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
