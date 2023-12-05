const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, mobile } = req.body;

  // Kiểm tra xem có thiếu thông tin không
  if (!firstName || !lastName || !email || !password || !mobile) {
    return res.status(200).json({
      status: false,
      error: "error: Missing input",
    });
  }

  // Biểu thức chính quy để kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(200).json({
      status: false,
      error: "error: Invalid email format",
    });
  }
  // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(200).json({
      status: false,
      error: "error: Email already exists",
    });
  }
  // Kiểm tra xem số điện thoại đã tồn tại trong cơ sở dữ liệu chưa
  const existingUserByMobile = await User.findOne({ mobile });
  if (existingUserByMobile) {
    return res.status(200).json({
      status: false,
      error: "error: Mobile already exists",
    });
  }

  // Tiến hành tạo user nếu thông tin hợp lệ
  const response = await User.create(req.body);
  res.status(200).json({
    status: response ? true : false,
    data: response,
  });
});




// login user
const login = asyncHandler(async (req, res) => {
  const { email, password,} = req.body;
  // Kiểm tra xem có thiếu thông tin không
  if (!email || !password ) {
    return res.status(200).json({
      status: false,
      error: "error: Missing input",
    });
  }
  // Biểu thức chính quy để kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(200).json({
      status: false,
      error: "error: Invalid email format",
    });
  }
  // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(200).json({
      status: false,
      error: "error: Email not found",
    });
  }
  const response = await User.findOne({email})
  if(response && await response.isCorrectPassword(password)){
    const {password, role,... userData} = response.toObject()
    return res.status(200).json({
      status: true,
      data: userData
    });
  }else throw new Error ('Invalid password')
  
});


//get all user
const getAllUsers = asyncHandler(async (req, res) => {
    // Sử dụng phương thức find() để lấy tất cả người dùng
    const allUsers = await User.find();
  
    res.status(200).json({
      status: true,
      data: allUsers,
    });
  });


module.exports = {
  register, getAllUsers, login,
};
