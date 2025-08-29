//express_demo.js 文件
var express = require("express");
var cors = require("cors"); // 添加这一行
const path = require("path"); // 1. 引入 path 模块

const session = require("express-session");
const MongoStore = require("connect-mongo");
const userRouter = require("./routers/userRouters.js");
const chatRouter = require("./routers/chatRouter.js");
const uploadRouter = require("./routers/uploadRouter.js");
const loginAndRegisterRouter = require("./routers/loginAndRegisterRouter.js");
const logoutRouter = require("./routers/logoutRouter.js");

const responseHandler = require("./middlewares/responseHandler.js");
const checkTokenHandler = require("./middlewares/checkTokenHandler.js");

require("dotenv").config();

var app = express();

app.use(express.json()); // 解析 JSON 请求体
app.use(cors()); // 允许所有跨域请求

app.use(responseHandler); // 使用自定义的响应处理器

// 2. 在所有 API 路由之前配置静态资源目录
// 这样，对 /avatars 的请求会直接返回文件，不会执行下面的 token 检查,防止前端显示图片时候出错
app.use("/avatars", express.static(path.join(__dirname, "avatars")));

//设置session中间件
// app.use(
//   session({
//     name: "sessionId", // 设置cookie的名称
//     secret: "mySecretKey", // 用于加密session ID的密钥
//     resave: false, // 改为 false，避免不必要的保存
//     saveUninitialized: false, // 是否为每一次未初始化的session创建一个新的session
//     cookie: {
//       maxAge: 1000 * 60 * 30, // 设置cookie的过期时间为30分钟
//       httpOnly: true, // 前端无法通过JavaScript操作
//       secure: false, // 开发环境设为 false，生产环境设为 true
//     },
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGODB_URI,
//       collectionName: "sessions",
//       ttl: 60 * 30, // session 在数据库中的过期时间（秒）
//       autoRemove: "native", // 自动删除过期的 session
//       touchAfter: 24 * 3600, // 24小时内不更新 session 的 lastModified
//     }),
//   })
// );

//设置接口路由
app.use("/user", checkTokenHandler, userRouter);
app.use("/", loginAndRegisterRouter);
app.use("/", checkTokenHandler, logoutRouter);
app.use("/chat", checkTokenHandler, chatRouter);
app.use("/upload", checkTokenHandler, uploadRouter);

module.exports = app;
