const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");

/// tạo category
const createCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.create(req.body);
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});

// get tất cả các category
const getAllCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find();
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const response = await ProductCategory.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const response = await ProductCategory.findByIdAndDelete(_id, { new: true });
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});
module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
