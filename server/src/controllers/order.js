const Order = require("../models/order");
const asyncHandler = require("express-async-handler");

// Tạo đơn hàng mới
const createOrder = asyncHandler(async (req, res) => {
  const { products, paymentIntent } = req.body;
  const orderBy = req.user._id; // Lấy thông tin người dùng từ request (sau khi xác thực)

  try {
    const newOrder = await Order.create({ products, paymentIntent, orderBy });
    res.status(201).json({
      status: "OK",
      message: "Order created successfully.",
      data: newOrder,
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      message: error.message || "Error creating order.",
    });
  }
});

// Lấy tất cả đơn hàng với thông tin người đặt hàng
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("orderBy", "name email") // Populate thông tin người đặt hàng
      .populate("products.product", "name price"); // Populate thông tin sản phẩm

    res.status(200).json({
      status: "OK",
      message: "Orders retrieved successfully.",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAIL",
      message: error.message || "Error retrieving orders.",
    });
  }
});

// Lấy một đơn hàng với thông tin người đặt hàng
const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId)
      .populate("orderBy", "name email") // Lấy thông tin người đặt hàng
      .populate("products.product", "name price"); // Lấy thông tin sản phẩm

    if (!order) {
      return res.status(404).json({
        status: "FAIL",
        message: "Order not found.",
      });
    }

    // Kiểm tra quyền truy cập
    if (req.user._id.toString() !== order.orderBy.toString() && !req.user.isAdmin) {
      return res.status(403).json({
        status: "FAIL",
        message: "Access denied.",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Order retrieved successfully.",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAIL",
      message: error.message || "Error retrieving order.",
    });
  }
});

// Cập nhật trạng thái đơn hàng
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        status: "FAIL",
        message: "Order not found.",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Order status updated successfully.",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      message: error.message || "Error updating order status.",
    });
  }
});

// Xóa đơn hàng
const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({
        status: "FAIL",
        message: "Order not found.",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Order deleted successfully.",
      data: deletedOrder,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAIL",
      message: error.message || "Error deleting order.",
    });
  }
});

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
