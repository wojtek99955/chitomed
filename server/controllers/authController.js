const User = require("../models/User");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt"); // ← dodaj na górze pliku jeśli jeszcze nie ma

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    // Możesz dodać delay ~100-300 ms aby utrudnić timing attack
    await new Promise((resolve) => setTimeout(resolve, 150));
    return res.status(401).json({ message: "Unauthorized" });
  }

  let isMatch = false;

  // Sprawdź, czy hasło wygląda na zahashowane bcrypt (zaczyna się od $2a$ $2b$ $2y$ itd.)
  if (foundUser.password && foundUser.password.startsWith("$2")) {
    // Hasło jest zahashowane → porównujemy poprawnie
    isMatch = await bcrypt.compare(password, foundUser.password);
  } else {
    // Hasło jest plain-text (stare konto) → porównujemy bezpośrednio
    isMatch = password === foundUser.password;

    // ────────────────────────────────────────────────
    // Jeśli się zgadza → od razu haszujemy i aktualizujemy !
    if (isMatch) {
      const saltRounds = 12; // 10–14 to rozsądny zakres w 2025/2026
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      foundUser.password = hashedPassword;
      // Można dodać pole np. passwordMigrated: true / Date
      // foundUser.passwordMigratedAt = new Date();
    }
    // ────────────────────────────────────────────────
  }

  if (!isMatch) {
    // Ten sam mały delay również przy błędnym haśle
    await new Promise((resolve) => setTimeout(resolve, 150));
    return res.status(401).json({ message: "Unauthorized" });
  }

  // ── Udało się zalogować ───────────────────────────────────────

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
