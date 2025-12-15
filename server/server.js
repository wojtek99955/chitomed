const express = require("express");
const corsOptions = require("./config/corsOptions");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/dbConn");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Połączenie z DB
connectDB();

app.use(cors(corsOptions));
// Teraz reszta middleware
app.use(express.json());

// Route'y
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Start serwera
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Logi połączenia z MongoDB
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
