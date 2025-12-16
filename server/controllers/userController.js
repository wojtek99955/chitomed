const asyncHandler = require("express-async-handler");
const transporter = require("../config/mailer");
const generatePassword = require("../utils/generatePassword");
const User = require("../models/User"); // <-- ważne!

exports.sendPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email jest wymagany.");
  }

  // 🔍 Sprawdź czy użytkownik już istnieje
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Użytkownik z tym emailem już istnieje.");
  }

  // 🔐 Wygenerowane hasło
  const password = generatePassword();

  // 🆕 Utwórz użytkownika
  const user = await User.create({
    email,
    password,
    role: "user", // możesz zmienić na co chcesz
  });

  // ✉️ Wyślij maila
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Chitomed: Twoje hasło",
    text: `Oto Twoje hasło: ${password}`,
  };

  await transporter.sendMail(mailOptions);

  // 📤 Odpowiedź
  res.json({
    message: "Hasło wysłane na email. Użytkownik został utworzony.",
    userId: user._id,
  });
});

exports.resendPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email jest wymagany.");
  }

  // 🔍 Szukamy istniejącego użytkownika
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("Nie znaleziono użytkownika z tym emailem.");
  }

  // ✉️ Wyślij maila z istniejącym hasłem
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Chitomed: Twoje hasło",
    text: `Twoje hasło: ${user.password}`, // jeśli hasło jest zahashowane -> musisz wygenerować nowe
  };

  await transporter.sendMail(mailOptions);

  res.json({
    message: "Hasło zostało wysłane ponownie.",
    userId: user._id,
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.body; // możesz też użyć req.params.id

  if (!email) {
    res.status(400);
    throw new Error("Email jest wymagany.");
  }

  // 🔍 Szukamy użytkownika
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("Nie znaleziono użytkownika z tym emailem.");
  }

  // 🗑️ Usuwamy użytkownika
  await User.deleteOne({ email });

  res.json({
    message: "Użytkownik został usunięty.",
    userId: user._id,
  });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  // Pobieramy wszystkich użytkowników
  // Możesz wybrać, które pola chcesz zwrócić (np. bez hasła!)
  console.log("USERZXYYY")
  const users = await User.find({})
    .select("-password") // ważne: nie zwracaj hasła (nawet zahashowanego)
    .sort({ createdAt: -1 }); // opcjonalnie: najnowsi na górze
console.log(users)
  if (!users || users.length === 0) {
    res.status(404);
    throw new Error("Nie znaleziono żadnych użytkowników.");
  }

  res.json({
    message: "Pobrano wszystkich użytkowników.",
    count: users.length,
    users,
  });
});