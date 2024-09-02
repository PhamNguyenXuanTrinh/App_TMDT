const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/order"); // Import các hàm controller cho Order
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken"); // Middleware xác thực người dùng

// Tạo đơn hàng mới
router.post("/", verifyAccessToken, ctrl.createOrder);

// Lấy tất cả đơn hàng (chỉ admin mới có quyền truy cập)
router.get("/", [verifyAccessToken, isAdmin], ctrl.getAllOrders);

// Lấy chi tiết một đơn hàng theo ID (admin hoặc người dùng có quyền truy cập đơn hàng của chính mình)
router.get("/:orderId", verifyAccessToken, ctrl.getOrderById);

// Cập nhật trạng thái đơn hàng (chỉ admin mới có quyền cập nhật trạng thái)
router.put("/:orderId/status", [verifyAccessToken, isAdmin], ctrl.updateOrderStatus);

// Xóa đơn hàng (chỉ admin mới có quyền xóa)
router.delete("/:orderId", [verifyAccessToken, isAdmin], ctrl.deleteOrder);

module.exports = router;
