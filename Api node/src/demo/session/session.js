//session 保存在服务器
//作用
//1. 服务器可以在会话中存储用户数据
//2. 服务器可以跟踪用户的会话状态
//3. 可以在会话中存储用户的登录状态、购物车信息等

//session 流程
//浏览器发送用户名和密码到服务器
//服务器验证用户名和密码
//如果验证成功，服务器创建一个session，并将session ID发送给浏览器
//浏览器将session ID存储在cookie中
//浏览器在后续请求中发送cookie，服务器根据session ID查找对应的session数据
//服务器可以使用session数据来识别用户并提供个性化服务

const express = require("express");

const app = express();

//session 中间件

const session = require("express-session");

const MongoStore = require("connect-mongo");

app.use(
  session({
    name: "sessionId", // 设置cookie的名称
    secret: "mySecretKey", // 用于加密session ID的密钥
    resave: true, // 是否在每次请求时重新保存session
    saveUninitialized: false, // 是否为每一次未初始化的session创建一个新的session
    cookie: {
      maxAge: 1000 * 60 * 30, // 设置cookie的过期时间为30分钟
      httpOnly: true, // 前端无法通过JavaScript操作
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/mydatabase",
      collectionName: "sessions",
    }),
  })
);

//获取session
app.get("/get-session", (req, res) => {
  // 检查session是否存在
  if (req.session.user) {
    res.send(`Session user: ${req.session.user}`);
  } else {
    res.send("No session found");
  }
});
//设置session
app.get("/set-session", (req, res) => {
  // 设置session数据
  req.session.user = "JohnDoe";
  res.send("Session has been set!");
});

//删除session
app.get("/delete-session", (req, res) => {
  // 删除session数据
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error deleting session");
    }
    res.clearCookie("sessionId"); // 清除cookie
    res.send("Session has been deleted!");
  });
});

app.get("/session", (req, res) => {
  res.send("Welcome to the session demo!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
