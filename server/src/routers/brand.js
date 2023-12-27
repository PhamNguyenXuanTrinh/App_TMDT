const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/brand");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrl.createBrand);
router.get("/", [verifyAccessToken, isAdmin], ctrl.getAllBrand);
router.put("/:_id", [verifyAccessToken, isAdmin], ctrl.updateBrand);
router.delete("/:_id", [verifyAccessToken, isAdmin], ctrl.deleteBrand);
module.exports = router;
