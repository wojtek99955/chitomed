const express = require("express");
const router = express.Router();
const mailController = require("../controllers/userController");

router.post("/", mailController.sendPassword);
router.delete("/:id", mailController.deleteUserByEmail);
router.get("/", mailController.getAllUsers);


module.exports = router;
