const asyncHandler = require("express-async-handler");
const transporter = require("../config/mailer");
const generatePassword = require("../utils/generatePassword");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.sendPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email jest wymagany.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Użytkownik z tym emailem już istnieje.");
  }

  const password = generatePassword();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    role: "user",
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Chitomed: Twoje hasło",
    text: `Oto Twoje hasło: ${password}`,
  };

  await transporter.sendMail(mailOptions);

  res.json({
    message: "Hasło wysłane na email. Użytkownik został utworzony.",
    userId: user._id,
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("Nie znaleziono użytkownika z tym id.");
  }

  await user.deleteOne();

  res.json({
    message: "Użytkownik został usunięty.",
    userId: user._id,
  });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password").sort({ createdAt: -1 });
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