const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");

/// tạo category
const createBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});

// get tất cả các category
const getAllBrand = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});

const updateBrand = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const response = await Brand.findByIdAndUpdate(_id, req.body, {new: true});
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});
const deleteBrand = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const response = await Brand.findByIdAndDelete(_id,{new: true});
    return res.status(200).json({
      status: "OK",
      message: response ? "success" : "failure",
      data: response,
    });
  });
module.exports = {
    createBrand,
    getAllBrand,
    updateBrand,
    deleteBrand,

};
