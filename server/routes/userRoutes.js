const express = require("express");
const router = express.Router();
const mailController = require("../controllers/userController");

router.post("/send-password", mailController.sendPassword);
router.post("/resend-password", mailController.resendPassword);
router.delete("/", mailController.deleteUser);
router.get("/", mailController.getAllUsers);


module.exports = router;
