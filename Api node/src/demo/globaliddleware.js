var express = require("express");
var app = express();

const fs = require("fs");
const path = require("path");

function recordMiddleware(req, res, next) {
  let { method, url, headers } = req;
  fs.appendFileSync(
    path.join(__dirname, "log.txt"),
    `Request: ${method} ${url} Headers: ${JSON.stringify(headers)}\n`
  );
  // 执行下一个中间件或路由处理程序
  next();
}
// 使用记录中间件
app.use(recordMiddleware);

app.get("/home", function (req, res) {
  res.send("Welcome to the Home Page");
  // 记录访问日志
  console.log("Home Page accessed");
});
app.get("/about", function (req, res) {
  res.send("About Us");
});
app.get("/contact", function (req, res) {
  res.send("Contact Us");
});
// app.get("/*", function (req, res) {
//   res.status(404).send("Page Not Found");
// });
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
