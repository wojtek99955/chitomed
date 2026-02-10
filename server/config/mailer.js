// config/mailer.js
const nodemailer = require("nodemailer");
const path = require("path");

// Poprawna nazwa zmiennej – unikamy mylącej nazwy "nodemailerHbs"
const { default: hbs } = require("nodemailer-express-handlebars");

const transporter = nodemailer.createTransport({
  host: "mail30.mydevil.net",
  port: 587,
  secure: false,
  auth: {
    user: "no-reply@chitomed.com",
    pass: process.env.NO_REPLY_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // usuń w produkcji po dodaniu ważnego certu
  },
});

// KONFIGURACJA HANDLEBARS
const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: "../views",
    defaultLayout: false,
  },
  viewPath: "./views",
  extName: ".handlebars",
};

// Podpinamy plugin – wywołujemy hbs jako funkcję!
transporter.use("compile", hbs(handlebarOptions));

// Debug (opcjonalny)
if (process.env.NODE_ENV !== "production") {
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ SMTP + Handlebars config error:", error);
    } else {
      console.log("✅ SMTP + Handlebars gotowe");
    }
  });
}

module.exports = transporter;
