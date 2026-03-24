const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    // Kluczowe pola identyfikacyjne (dla porządku w ISO)
    patientId: {
      type: String,
    },
    doctorName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      //   enum: [
      //     "nowe",
      //     "projektowanie",
      //     "akceptacja",
      //     "produkcja",
      //     "wysłano",
      //     "incydent",
      //   ],
      default: "nowe",
    },
  },
  {
    timestamps: true, // Automatycznie dodaje createdAt i updatedAt (wymóg ISO)
    strict: false, // Pozwala na zapisywanie pól nieujętych w schemacie
  },
);

module.exports = mongoose.model("Order", OrderSchema);
