const express = require("express");
const app = express();
const mailRoutes = require("./routes/mailRoutes");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/mail", mailRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
