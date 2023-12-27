const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");

/// tạo category
const createBlogCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.create(req.body);
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});

// get tất cả các category
const getAllBlogCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.find();
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});

const updateBlogCategory = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const response = await BlogCategory.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const response = await BlogCategory.findByIdAndDelete(_id, { new: true });
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});
module.exports = {
  createBlogCategory,
  getAllBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
