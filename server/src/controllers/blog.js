const { trusted } = require("mongoose");
const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

/// tạo blog
const createBlog = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.category || !req.body.description) {
    throw new Error("input missing ");
  }
  const response = await Blog.create(req.body);
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});

// get all blog
const getAllBlog = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const response = await Blog.findByIdAndUpdate(_id, req.body, { new: true });
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});

const likeBlog = asyncHandler(async (req, res) => {
  const { bid } = req.body;
  const {_id} = req.user

  if (!bid) {
    return res.status(400).json({
      status: "error",
      message: "Missing input",
    });
  }

  try {
    const blog = await Blog.findById(bid);

    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blog not found",
      });
    }

    const alreadyDisliked = blog.dislikes.includes(_id);

    if (alreadyDisliked) {
      await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } });
      return res.status(200).json({
        status: "OK",
        message: "Dislike removed successfully",
      });
    }

    const isLiked = blog.likes.includes(_id);

    if (isLiked) {
      await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } });
      return res.status(200).json({
        status: "OK",
        message: "Like removed successfully",
      });
    }

    await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } });
    return res.status(200).json({
      status: "OK",
      message: "Blog liked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const response = await Blog.findByIdAndDelete(_id, { new: true });
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});
module.exports = {
  createBlog,
  getAllBlog,
  updateBlog,
  likeBlog,
  deleteBlog,
};