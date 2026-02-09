const mongoose = require("mongoose");

const materialSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
    },
    categoryId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
