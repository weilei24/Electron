//cooie 是http服务器发送到用户浏览器并保存在本地的一块数据
//cookie保存在浏览器

//作用
//1. 服务器可以在cookie中存储用户数据
//2. 服务器可以跟踪用户的状态
//3. 可以在cookie中存储用户的登录状态、购物车信息等

//session和cookie的区别
//1. 存储位置不同：cookie存储在浏览器端，session存储在服务器端
//2. 安全性不同：cookie可以被用户修改，session只能由服务器修改
//3. 存储限制：cookie数据量有限不超过4k，session数据量没有限制
//4. 网络传输量:cookie设置内容过多会影响传输效率,session不会影响传输效率

const express = require("express");

const app = express();

app.get("/set-cookie", (req, res) => {
  // Set a cookie named 'myCookie' with value 'cookieValue'
  res.cookie("myCookie", "cookieValue"); //会在浏览器关闭后删除
  // res.cookie("myCookie", "cookieValue", { maxAge: 900000, httpOnly: true }); // 设置过期时间和httpOnly属性
  // res.cookie("myCookie", "cookieValue", { secure: true }); // 仅在HTTPS连接中发送
  // res.cookie("myCookie", "cookieValue", { sameSite: 'Strict' }); // 设置SameSite属性

  // Send a response to the client
  res.send("Cookie has been set!");
});

app.get("/get-cookie", (req, res) => {
  // Retrieve the cookie named 'myCookie'
  const myCookie = req.cookies.myCookie;

  // Check if the cookie exists
  if (myCookie) {
    res.send(`Cookie value: ${myCookie}`);
  } else {
    res.send("No cookie found");
  }
});

// Start the server
app.get("/delete-cookie", (req, res) => {
  // Delete the cookie named 'myCookie'
  res.clearCookie("myCookie");
  res.send("Cookie has been deleted!");
});
