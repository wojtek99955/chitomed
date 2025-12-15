const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔹 Logowanie
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email i hasło są wymagane.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Nieprawidłowy email lub hasło.");
  }

  // Sprawdzenie hasła
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(401);
    throw new Error("Nieprawidłowy email lub hasło.");
  }

  // Tworzenie tokenu JWT
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // ważność tokenu 7 dni
  );

  res.json({
    message: "Zalogowano pomyślnie.",
    token,
    user: { id: user._id, email: user.email, role: user.role },
  });
});

// 🔹 Wylogowywanie (po stronie klienta wystarczy usunąć token)
// Ale jeśli chcesz można też "unieważnić" token w backendzie
exports.logout = asyncHandler(async (req, res) => {
  // Jeśli używasz cookies do JWT
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });

  res.json({ message: "Wylogowano pomyślnie." });
});
