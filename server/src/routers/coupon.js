const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/coupon");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrl.createCoupon);
router.get("/", verifyAccessToken, ctrl.getAllCoupon);
router.put("/:_id", verifyAccessToken, ctrl.updateCoupon);
router.delete("/:_id", verifyAccessToken, ctrl.deleteCoupon);
module.exports = router;