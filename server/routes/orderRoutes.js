const express = require("express");
const router = express.Router();
const {
  getOrders,
  deleteOrder,
} = require("../controllers/orderController");

// @route   GET /api/orders
// @desc    Pobierz listę wszystkich "teczek" (Dla Admina - widok główny)
router.get("/", getOrders);
router.delete("/:id", deleteOrder);

module.exports = router;
