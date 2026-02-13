const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt"); // ← dodaj na górze pliku jeśli jeszcze nie ma
const asyncHandler = require("express-async-handler");
const transporter = require("../config/mailer");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let isMatch = false;

  if (foundUser.password && foundUser.password.startsWith("$2")) {
    isMatch = await bcrypt.compare(password, foundUser.password);
  } else {
    isMatch = password === foundUser.password;

    if (isMatch) {
      const saltRounds = 12; 
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      foundUser.password = hashedPassword;
    }
  }

  if (!isMatch) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const accessToken = jwt.sign(
    {
      id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "365d" }, // ← 365 dni to bardzo długo – rozważ 60m / 12h / 30d
  );

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  // Zapisz refresh token
  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true, // w produkcji musi być true
    sameSite: "None", // tylko jeśli naprawdę potrzebujesz cross-site
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({ accessToken });
};

exports.handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    return res.status(403).json({ message: "Forbidden" });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.email !== decoded.email) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser._id,
            email: foundUser.email,
            role: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
};

exports.logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); // No content
  }

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (foundUser) {
    foundUser.refreshToken = "";
    await foundUser.save();
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};





exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email?.trim()) {
    res.status(400);
    throw new Error("Email is required");
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  // Zawsze ta sama odpowiedź – nie zdradzamy czy email istnieje
  if (!user) {
    return res.status(200).json({
      message:
        "If an account with this email exists, a password reset link has been sent.",
    });
  }

  // Generujemy token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = tokenHash;
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 godzina

  await user.save();

  // Przygotowujemy link
  const link = `https://chitomed.onrender.com/reset-password/${resetToken}`;

  // Dane do szablonu Handlebars
  const mailOptions = {
    from: '"Chitomed" <no-reply@chitomed.com>',
    to: user.email,
    subject: "Reset Your Password - Chitomed",
    template: "resetPassword", // nazwa pliku: reset-password.handlebars
    context: {
      link: link,
    },
  };

  // Wysyłamy email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reset password email sent to ${user.email}`);
  } catch (emailErr) {
    console.error("Failed to send reset email:", emailErr);
    // Nie rzucamy błędu użytkownikowi – nadal zwracamy success
  }

  res.status(200).json({
    message:
      "If an account with this email exists, a password reset link has been sent.",
  });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword?.trim()) {
    res.status(400);
    throw new Error("Token and new password are required");
  }

  if (newPassword.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters long");
  }

  // Oblicz hash otrzymanego tokena (taki sam algorytm jak przy zapisie)
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  // Szukamy użytkownika z ważnym tokenem resetującym
  const user = await User.findOne({
    resetPasswordToken: tokenHash,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error(
      "Invalid or expired password reset token. Please request a new one.",
    );
  }

  // Hashujemy nowe hasło
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(newPassword, salt);

  // Czyścimy pola resetu – token staje się jednorazowy
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  // Opcjonalnie: możesz tu dodać wysyłanie maila potwierdzającego zmianę hasła

  res.status(200).json({
    message: "Password has been reset successfully. You can now sign in.",
  });
});