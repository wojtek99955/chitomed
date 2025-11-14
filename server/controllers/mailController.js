const asyncHandler = require("express-async-handler");
const transporter = require("../config/mailer");
const generatePassword = require("../utils/generatePassword");

exports.sendPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email jest wymagany.");
  }

  const password = generatePassword();

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Twoje wygenerowane hasło",
    text: `Oto Twoje hasło: ${password}`,
  };

  await transporter.sendMail(mailOptions);

  res.json({
    message: "Hasło wysłane na email.",
    password,
  });
});
