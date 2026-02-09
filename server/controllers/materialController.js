const asyncHandler = require("express-async-handler");
const Material = require("../models/Material");

const getMaterials = asyncHandler(async (req, res) => {
  const materialId = req.query.id;
  console.log(materialId);
  if (materialId) {
    const material = await Material.findById(materialId);
    if (!material) {
      res.status(404);
      throw new Error(`Material with ID: ${materialId} not found`);
    }
    res.status(200).json(material);
  } else {
    const materials = await Material.find({});
    res.status(200).json(materials);
  }
});

const createMaterial = asyncHandler(async (req, res) => {
  const { title, categoryId, content } = req.body;
  console.log(req.body, " BODY")

  const material = await Material.create({
    title,
    categoryId,
    content,
  });

  res.status(201).json(material);
});

const deleteMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);

  if (!material) {
    res.status(404);
    throw new Error("Not found");
  }

  await material.deleteOne();

  res.status(200).json({ message: "Material is deleted" });
});

const updateMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, categoryId } = req.body;
  const material = await Material.findById(id);

  if (!material) {
    res.status(404);
    throw new Error("Not found.");
  }

  const updateData = {
    title,
    content,
    categoryId,
  };

  const updatedMaterial = await Material.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedMaterial);
});

module.exports = {
  getMaterials,
  createMaterial,
  deleteMaterial,
  updateMaterial,
};
