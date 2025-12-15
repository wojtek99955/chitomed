const asyncHandler = require("express-async-handler");
const Material = require("../models/Material");

const getMaterials = asyncHandler(async (req, res) => {
  const materialId = req.query.id;
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
  const { title, type, text, videoUrl } = req.body;
  if (!title || !type) {
    res.status(400);
    throw new Error("Title or type are missing");
  }
  if (type === "text" && !text) {
    res.status(400);
    throw new Error("Text is missing");
  }
  if (type === "video" && !videoUrl) {
    res.status(400);
    throw new Error("video url is missing");
  }
  const material = await Material.create({
    title,
    type,
    text: type === "text" ? text : undefined,
    videoUrl: type === "video" ? videoUrl : undefined,
  });

  res.status(201).json(material);
});

const getMaterialById = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.query.id);

  if (!material) {
    res.status(404);
    throw new Error("Not found");
  }

  res.status(200).json(material);
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
  const { title, type, text, videoUrl } = req.body;
  const material = await Material.findById(id);

  if (!material) {
    res.status(404);
    throw new Error("Not found.");
  }

  const updateData = {
    title: title !== undefined ? title : material.title,
    type: type !== undefined ? type : material.type,
  };

  const finalType = updateData.type;

  if (finalType === "text") {
    updateData.text = text !== undefined ? text : material.text;
    updateData.videoUrl = undefined;

    if (!updateData.text) {
      res.status(400);
      throw new Error('Dla typu "text" pole "text" nie może być puste.');
    }
  } else if (finalType === "video") {
    updateData.videoUrl = videoUrl !== undefined ? videoUrl : material.videoUrl;
    updateData.text = undefined;

    if (!updateData.videoUrl) {
      res.status(400);
      throw new Error('Dla typu "video" pole "videoUrl" nie może być puste.');
    }
  }

  const updatedMaterial = await Material.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedMaterial);
});

module.exports = {
  getMaterials,
  createMaterial,
  getMaterialById,
  deleteMaterial,
  updateMaterial,
};
