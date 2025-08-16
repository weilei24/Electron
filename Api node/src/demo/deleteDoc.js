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
    const doc = await UserInfoModel.deleteOne({
      phone: "1234567890",
      password: "password123",
    });
    //deleteMany 删除多个
    //findByIdAndDelete 根据id删除
    //findOneAndDelete 根据条件删除
    console.log("Document deleted successfully:", doc);
  } catch (err) {
    console.error("Error deleting document:", err);
  }
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});
