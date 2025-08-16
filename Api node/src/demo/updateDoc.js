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
  // Example of updating a document in the UserInfo collection
  try {
    // Update a document with a specific phone number
    // updateOne 更新单个文档
    const doc = await UserInfoModel.updateOne(
      {
        phone: "1234567890",
      },
      { password: "newpassword456" }
    );
    //updateMany 更新多个
    //findByIdAndUpdate 根据id更新
    //findOneAndUpdate 根据条件更新
    //findOneAndDelete 根据条件删除
    console.log("Document updated successfully:", doc);
  } catch (err) {
    console.error("Error updating document:", err);
  }
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});
