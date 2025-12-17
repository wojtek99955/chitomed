const axios = require("axios");
const asyncHandler = require("express-async-handler");

const subscribeToNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const response = await axios.post(
    "https://connect.mailerlite.com/api/subscribers",
    {
      email,
      status: "active",
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  res.status(200).json({
    message: "Email successfully added to MailerLite",
    data: response.data,
  });
});

module.exports = {
  subscribeToNewsletter,
};
