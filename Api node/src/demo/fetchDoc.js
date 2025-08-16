const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase")
  .catch((err) => console.log(err));

mongoose.connection.on("connected", async () => {
  console.log("Mongoose connection open to mydatabase successfully");
  // Define a schema and model for the UserInfo collection
  let UserInfoSchema = new mongoose.Schema({
    phone: {
      type: String,
      unique: true,
      required: true,
      //default: '0000000000'
      //enum: ['1234567890', '0987654321'] //枚举
    },
    password: {
      type: String,
      required: true,
    },
  });
  // Create a model based on the schema
  let UserInfoModel = mongoose.model("UserInfo", UserInfoSchema);
  // Example of creating a new document in the UserInfo collection

  try {
    const doc = await UserInfoModel.find().select({ phone: 1, _id: 0 });
    console.log("Documents fetched part doc successfully:", doc);
    // 使用 select() 方法选择要返回的字段
    // 使用 find() 方法查询所有文档
    // 使用 findOne() 查询单个文档
    // 使用 findById() 查询指定id的文档
    // findall 查询所有文档
  } catch (err) {
    console.error("Error fetching documents:", err);
  }

  // Example of fetching a document with specific conditions
  // 使用 $lt 查询密码小于10的文档
  // 使用 $gt 查询密码大于10的文档

  try {
    const doc = await UserInfoModel.findOne({
      phone: "1234567890",
      //   password: { $lt: 10 },
      // 使用 $lt 查询密码小于10的文档
      //使用 $gt 查询密码大于10的文档
      //使用 $ne 查询密码不等于10的文档
      // 使用 $in 查询密码在指定数组中的文档
      // 使用 $nin 查询密码不在指定数组中的文档
      // 使用 $gte 查询密码大于等于10的文档
      // 使用 $or 查询满足任一条件的文档
      // 使用 $and 查询满足所有条件的文档
      // 使用 $exists 查询密码字段存在的文档
      // 使用 $regex 查询密码符合正则表达式的文档
      // 使用 $options 设置正则表达式的选项
      // 使用 $expr 进行表达式查询
      // 使用 $text 进行全文搜索
      // 使用 $where 进行自定义 JavaScript 查询
      // 使用 $elemMatch 查询数组中满足条件的元素
      // 使用 $size 查询数组长度
      // 使用 $all 查询数组中包含所有指定元素的文档
      // 使用 $type 查询字段类型
      //   password: { $or: [{ $lt: 10 }, { $gt: 20 }] },
      //   password: { $and: [{ $lt: 10 }, { $gt: 20 }] },
      //   password: { $ne: 10 },
      //   password: { $in: [5, 15, 25] },
      //   password: { $nin: [10, 20] },
      //   password: { $gte: 10 },
      //   password: { $exists: true },
      //   password: { $regex: /^password\d+$/, $options: "i" }, // 正则表达式查询
      //   password: { $expr: { $gt: ["$password", 10] } }, // 表达式查询
      //   password: { $text: { $search: "password" } }, // 全文搜索
      //   password: { $where: "this.password.length > 5" }, // 自定义 JavaScript 查询
      //   password: { $elemMatch: { $gt: 10 } }, // 数组中满足条件的元素查询
      //   password: { $size: 3 }, // 数组长度查询
      //   password: { $all: [5, 15] }, // 数组中包含所有指定元素的查询
      //   password: { $type: "string" }, // 字段类型查询
      //   password: { $or: [{ $lt: 10 }, { $gt: 20 }] }, // 使用 $or 查询满足任一条件的文档
      // 使用 $or 查询满足任一条件的文档
    });

    // findOne 查询单个文档
    // find 查询多个文档
    // findById 查询指定id的文档
    console.log("Document fetched successfully:", doc);
  } catch (err) {
    console.error("Error fetching document:", err);
  }
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});
