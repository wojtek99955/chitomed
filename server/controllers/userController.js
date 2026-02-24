const asyncHandler = require("express-async-handler");
const transporter = require("../config/mailer");
const generatePassword = require("../utils/generatePassword");
const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.sendPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error("A user with this email already exists.");
  }

  const password = generatePassword();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    role: "user",
  });

  const mailOptions = {
    from: "no-reply@chitomed.com",
    to: email,
    subject: "Chitomed: Account registration confirmation",
    template: "register", // views/email/register.hbs
    context: {
      email: email,
      password: password,
      // e.g. loginUrl: "https://app.chitomed.com/sign-in"
    },
  };

  try {
    await transporter.sendMail(mailOptions);

    res.json({
      message:
        "Password has been sent by email. The user account has been created.",
      userId: user._id,
    });
  } catch (err) {
    // If the email fails, remove the created user to avoid orphan accounts
    await User.findByIdAndDelete(user._id);

    res.status(500);
    throw new Error(
      "The account was created, but the email could not be sent.",
    );
  }
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
  const { email, sort } = req.query; // Pobieramy parametry z query stringa
  const filter = {};
console.log(email, " sort")
  // 1. Wyszukiwanie po emailu (jeśli podano)
  if (email) {
    // Używamy wyrażenia regularnego (regex), aby wyszukiwanie było niewrażliwe na wielkość liter
    // i mogło wyszukiwać fragmenty tekstu.
    filter.email = { $regex: email, $options: "i" };
  }

  // 2. Obsługa sortowania
  // Domyślnie ustawiamy od najnowszych (-1). Jeśli sort === 'oldest', zmieniamy na 1.
  const sortDirection = sort === "oldest" ? 1 : -1;

  const users = await User.find(filter)
    .select("-password")
    .sort({ createdAt: sortDirection });

  if (!users || users.length === 0) {
    res.status(404);
    throw new Error("Nie znaleziono użytkowników spełniających kryteria.");
  }

  res.json({
    message: "Pobrano użytkowników.",
    count: users.length,
    users,
  });
});

exports.deleteUserByEmail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Id jest wymagany do usunięcia użytkownika.");
  }

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("Nie znaleziono użytkownika z podanym adresem id.");
  }

  await user.deleteOne();

  res.json({
    message: "Użytkownik został pomyślnie usunięty.",
    deletedEmail: email,
    deletedUserId: user._id,
  });
});
