const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");
const OrderDocument = require("../models/OrderDocument"); 

exports.createOrder = async (req, res) => {
  try {
    const { patientId, email, ...otherData } = req.body;

    const newOrder = new Order({
      patientId,
      doctorEmail: email,
      formData: otherData,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({
      message: "Błąd podczas tworzenia zamówienia",
      error: err.message,
    });
  }
};

// GET ALL - Wszystkie zamówienia (Widok administratora)
exports.getOrders = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (id) {
    const order = await Order.findById(id);

    if (!order) {
      res.status(404);
      throw new Error("Nie znaleziono zamówienia o podanym ID");
    }

    return res.status(200).json(order);
  }

  const orders = await Order.find().sort({ createdAt: -1 });

  res.status(200).json(orders);
});

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.query.id);
    if (!order)
      return res.status(404).json({ message: "Nie znaleziono zamówienia" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Błąd serwera", error: err.message });
  }
};

exports.deleteOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
console.log(orderId, " order id")
  // 1. Znajdź zamówienie
  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Nie znaleziono zamówienia do usunięcia");
  }

  // 2. Usuń kaskadowo wszystkie dokumenty przypisane do tego orderId
  // Wykonujemy to przed usunięciem samego zamówienia
  await OrderDocument.deleteMany({ orderId: orderId });

  // 3. Usuń główne zamówienie
  await order.deleteOne(); 
  // lub Order.findByIdAndDelete(orderId)

  res.status(200).json({
    success: true,
    message:
      "Zamówienie oraz powiązane dokumenty ISO zostały pomyślnie usunięte",
    deletedId: orderId,
  });
});
