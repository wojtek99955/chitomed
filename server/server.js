const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./errorHandler");
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
app.use("/newsletter", require("./routes/newsletterRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/upload", require("./routes/upload"));


app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () =>
    console.log(`🚀 SERWER DZIAŁA na http://localhost:${PORT}`),
  );
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
