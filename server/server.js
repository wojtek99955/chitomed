const express = require("express");
const cors = require("cors"); // <-- 1. Importowanie modułu cors
const mongoose = require("mongoose");
const corsOptions = require("./config/corsOptions");
require("dotenv").config();
const connectDB = require("./config/dbConn");
const app = express();
const PORT = 8080;
connectDB();

app.use(cors(corsOptions));

app.use(express.json());
app.use("/user", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/material", require("./routes/materialRoutes"));

// 1. GŁÓWNY ENDPOINT
app.get("/", (req, res) => {
  res.send("Minimalny serwer Express działa!");
});

app.listen(PORT, () => {
  console.log(`\n🚀 SERWER DZIAŁA na http://localhost:${PORT}`);
  console.log(`✅ CORS Aktywny: Dostęp tylko dla http://localhost:5173`);
  console.log(`🔍 Testowy endpoint JSON: http://localhost:${PORT}/api/status`);
  console.log("--------------------------------------------------\n");
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
