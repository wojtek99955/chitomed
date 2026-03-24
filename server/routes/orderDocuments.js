const express = require("express");
const router = express.Router();
const {
  saveOrderDocument,
  getOrderDocument,
  deleteOrderDocument,
} = require("../controllers/orderDocumentsController");

router.post("/", saveOrderDocument);
router.get("/:orderId", getOrderDocument);
module.exports = router;
