const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({
    name,
  });

  res.status(201).json(category);
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  return res.status(200).json(categories);
});

module.exports = {
  getCategories,
  createCategory,
};
