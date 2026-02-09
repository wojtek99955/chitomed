const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  console.log(process.env.REFRESH_TOKEN_SECRET, " tooo");
  console.log(process.env.ACCESS_TOKEN_SECRET, " akaka");
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = password === foundUser.password;
  if (!match) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const accessToken = jwt.sign(
    {
      id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "365d" }
  );

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
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
