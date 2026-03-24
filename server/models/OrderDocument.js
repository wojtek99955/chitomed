const mongoose = require("mongoose");

const OrderDocumentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true, 
    },
    documentType: {
      type: String,
      required: true, 
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

module.exports = mongoose.model("OrderDocument", OrderDocumentSchema);
