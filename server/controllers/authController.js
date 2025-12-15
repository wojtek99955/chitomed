const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Incorrect email or password");
  }

  const passwordMatch = password === user.password;

  if (!passwordMatch) {
    res.status(401);
    throw new Error("Incorrect email or password");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Zalogowano pomyślnie.",
    token,
    user: { id: user._id, email: user.email, role: user.role },
  });
});

exports.logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });

  res.json({ message: "Logout successfully" });
});
