const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    email: String,
    password: String,
    role: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userModel);
