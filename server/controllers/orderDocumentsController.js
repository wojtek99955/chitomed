const asyncHandler = require("express-async-handler");
const OrderDocument = require("../models/OrderDocument");
const Order = require("../models/Order");

exports.saveOrderDocument = asyncHandler(async (req, res) => {
  let { orderId, documentType, ...restData } = req.body;

  if (documentType && documentType.includes("Order") && !orderId) {
    console.log("tutaj takkk")
    const newOrder = await Order.create({
      patientId: restData.patientId || "",
      doctorName: restData.doctorName || "Nieznany",
      status: "nowe",
    });
    console.log(newOrder, " new order")
    orderId = newOrder._id;
  }

  if (!orderId) {
    res.status(400);
    throw new Error("Brak powiązanego orderId.");
  }

  const newOrderDocument = await OrderDocument.create({
    orderId: orderId,
    documentType: documentType,
    data: restData,
  });

  res.status(201).json({
    success: true,
    orderId: orderId,
    data: newOrderDocument,
  });
});

exports.getOrderDocument = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  const formData = await OrderDocument.find({ orderId });
  if (!formData) {
    res.status(404);
    throw new Error("Nie znaleziono danych dla podanego zamówienia");
  }

  res.status(200).json(formData);
});

exports.deleteOrderDocument = asyncHandler(async (req, res) => {
  console.log(req.params.id, " console")
  const result = await OrderDocument.findByIdAndDelete(req.params.id);

  if (!result) {
    res.status(404);
    throw new Error("Nie znaleziono danych do usunięcia");
  }

  res.status(200).json({ message: "Dane zostały usunięte" });
});
