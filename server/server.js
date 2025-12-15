const express = require("express");
const cors = require("cors"); // <-- 1. Importowanie modułu cors
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/dbConn");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = 5000;
connectDB()
// 💡 Konfiguracja CORS (Zezwalamy tylko na nasz frontend)
const corsOptions = {
  // Pamiętaj, aby ZAWSZE sprawdzić, na jakim porcie działa Twój klient (np. Vite/React)
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Ważne dla cookies i tokenów autoryzacyjnych
};

// 🔥 2. Użycie middleware CORS jako pierwszego
app.use(cors(corsOptions));

// Middleware do parsowania JSON (teraz jest po CORS)
app.use(express.json());
app.use("/user", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));


// 1. GŁÓWNY ENDPOINT
app.get("/", (req, res) => {
  res.send("Minimalny serwer Express działa!");
});

// 2. PRZYKŁADOWY ENDPOINT (zwracający JSON)
app.get("/api/status", (req, res) => {
  res.json({
    status: "OK",
    service: "Minimal Express Server",
    // Dodajemy informację o pochodzeniu żądania - dla łatwiejszego debugowania
    origin: req.headers.origin || "bez origin (bezpośrednio)",
    time: new Date().toISOString(),
  });
});

// 3. Nasłuchiwanie na porcie
app.listen(PORT, "localhost", () => {
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