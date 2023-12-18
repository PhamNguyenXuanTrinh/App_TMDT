const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

/// tạo coupon
const createCoupon = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.discount || !req.body.expiry) {
    throw new Error("input missing ");
  }
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000, /// giờ phút giây mili giây
  });
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});
/// get coupon
const getAllCoupon = asyncHandler(async (req, res) => {
  const response = await Coupon.find();
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if(req.body.expiry) req.body.expiry= Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000
  const response = await Coupon.findByIdAndUpdate(_id, req.body, { new: true });
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});
const deleteCoupon = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const response = await Coupon.findByIdAndDelete(_id, { new: true });
  return res.status(200).json({
    status: "OK",
    message: response ? "success" : "failure",
    data: response,
  });
});
module.exports = {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
};
