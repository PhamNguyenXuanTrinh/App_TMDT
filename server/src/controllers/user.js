const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {generateAccessToken,generateRefreshToken,} = require("../middlewares/jwt");
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
  const { email, password } = req.body;
  // Kiểm tra xem có thiếu thông tin không
  if (!email || !password) {
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
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, ...userData } = response.toObject();
    const accessToken = generateAccessToken(response._id, role);
    const refreshToken = generateRefreshToken(response._id);
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      status: true,
      accessToken,
      data: userData,
    });
  } else throw new Error("Invalid password");
});

// get one user
const getOneUser = asyncHandler(async (req, res) => {
  // Sử dụng phương thức find() để lấy tất cả người dùng
  const { _id } = req.user;
  const user = await User.findById(_id);

  res.status(200).json({
    status: true,
    data: user,
  });
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
/// refreshAccessToken
const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie) throw new Error("no refresh token");
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched",
  });
});
/// logout
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken) throw new Error("no refresh token in cookie");
  /// xóa refreshToken ở db
  await User.findOneAndUpdate({refreshToken: cookie.refreshToken},{refreshToken: ''},{new: true})
  /// xóa cookie ra trình duyệt
  res.clearCookie('refreshToken',{
    httpOnly: true,
    secure: true
  })
  return res.status(200).json({
    success: true,
    message: 'logout is done'
  })
  
});
// delete user
const delateUser = asyncHandler(async (req, res) => {
  const {_id} = req.query
  if(!_id) throw new Error('missing input')
  const response = await User.findByIdAndDelete(_id)
  res.status(200).json({
    success: response? true: false,
    message: response? 'delete success': "no user delete"
  })
});

// update user
const updateUser = asyncHandler(async (req, res) => {
  const {_id} = req.user
  if(!_id|| Object.keys(req.body).length==0) throw new Error('missing input')
  const response = await User.findByIdAndUpdate(_id,req.body, {new: true}).select('-password -role')
  res.status(200).json({
    success: response? true: false,
    message: response? 'update success': "no user update",
    data: response
  })
});

// update user by admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const {uid} = req.params
  if(Object.keys(req.body).length==0) throw new Error('missing input')
  const response = await User.findByIdAndUpdate(uid,req.body, {new: true}).select('-password -role')
  res.status(200).json({
    success: response? true: false,
    message: response? 'update success': "no user update",
    data: response
  })
});

module.exports = {
  register,
  getAllUsers,
  login,
  getOneUser,
  refreshAccessToken,
  logout,
  delateUser,
  updateUser,
  updateUserByAdmin,
};
