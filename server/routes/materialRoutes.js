const express = require("express");
const router = express.Router();
const materialController = require("../controllers/materialController");

router
  .route("/")
  .get(materialController.getMaterials)
router
  .route("/:id")
  .patch(materialController.updateMaterial)
  .delete(materialController.deleteMaterial);

module.exports = router;
