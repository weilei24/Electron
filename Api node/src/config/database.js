const mongoose = require("mongoose");

const connectDB = function (success, error) {
  if (typeof error !== "function") {
    error = () => {
      console.error("An error occurred during the database connection.");
    };
  }

  mongoose.connect(process.env.MONGODB_URI).catch((err) => console.log(err));

  mongoose.connection.on("connected", async () => {
    // success();
    console.log("Mongoose connection open to mydatabase successfully");
  });

  mongoose.connection.on("error", (err) => {
    // error();
    console.log("Mongoose connection error: " + err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection disconnected");
  });
};

module.exports = connectDB;
