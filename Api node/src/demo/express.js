//express_demo.js 文件
var express = require("express");
var app = express();

app.get("/", function (req, res) {
  //req.method
  //req.url
  //req.headers
  //req.query
  //req.params
  //req.body
  res.send("Hello World");

  //res.json({ message: "Hello World" });
  //res.status(200).json({ message: "Hello World" });
  //res.status(404).send("Not Found");
  //res.status(500).send("Internal Server Error");
  //res.redirect("/login");
  //res.render("index", { title: "Hello World" });
  //res.download("file.txt");
  //res.sendFile(__dirname + "/file.txt");
  //res.setHeader("Content-Type", "text/plain");
  //res.append("Set-Cookie", "name=value; HttpOnly");
  //res.cookie("name", "value", { httpOnly: true });
  //res.clearCookie("name");
  //res.location("/login");
  //res.sendStatus(200);
  //res.type("text/plain");
  //res.links({ next: "/next" });
  //res.vary("Accept-Encoding");
  //res.charset = "utf-8";
  //res.statusMessage = "OK";
  //res.sendFile("file.txt", { root: __dirname });
  //res.attachment("file.txt");
  //res.format({
  //  "text/plain": function () {
  //    res.send("Hello World");
  //  },
  //  "application/json": function () {
  //    res.json({ message: "Hello World" });
  //  },
  //});
});

app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
