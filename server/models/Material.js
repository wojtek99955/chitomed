const mongoose = require("mongoose");

const materialSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
    },
    text: {
      type: String,
    },
    video: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
