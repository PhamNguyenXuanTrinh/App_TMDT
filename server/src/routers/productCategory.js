const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/productCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrl.createCategory);
router.get("/", [verifyAccessToken, isAdmin], ctrl.getAllCategory);
router.put("/:_id", [verifyAccessToken, isAdmin], ctrl.updateCategory);
router.delete("/:_id", [verifyAccessToken, isAdmin], ctrl.deleteCategory);
module.exports = router;
