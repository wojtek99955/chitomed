const express = require("express");
const router = express.Router();
const mailController = require("../controllers/userController");

router.post("/send-password", mailController.sendPassword);
router.post("/resend-password", mailController.resendPassword);
router.delete("/delete-user", mailController.deleteUser);

module.exports = router;
