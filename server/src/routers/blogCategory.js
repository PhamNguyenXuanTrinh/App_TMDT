const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/blogCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrl.createBlogCategory);
router.get("/", [verifyAccessToken, isAdmin], ctrl.getAllBlogCategory);
router.put("/:_id", [verifyAccessToken, isAdmin], ctrl.updateBlogCategory);
router.delete("/:_id", [verifyAccessToken, isAdmin], ctrl.deleteBlogCategory);
module.exports = router;