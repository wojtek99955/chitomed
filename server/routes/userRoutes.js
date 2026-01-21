const express = require("express");
const router = express.Router();
const mailController = require("../controllers/userController");

router.post("/send-password", mailController.sendPassword);
router.delete("/:id", mailController.deleteUser);
router.get("/", mailController.getAllUsers);


module.exports = router;
