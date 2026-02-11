const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    email: String,
    password: String,
    role: String,
    refreshToken: String,
    resetPasswordToken: {
      type: String,
      select: false,
    },

    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Users", userModel);
