const connection = require("../db/db");
const mongoose = require("mongoose");

// Define a schema and model for the UserInfo collection
const UserInfoModel = require("../models/UserInfoModel");

connection(async () => {
  // Example of creating a new document in the UserInfo collection
  try {
    const doc = await UserInfoModel.create({
      phone: "18879759296",
      password: "weilei_8775585",
    });
    console.log("Document created successfully:", doc);
  } catch (err) {
    console.error("Error creating document:", err);
  }
});
