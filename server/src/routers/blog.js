const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrl.createBlog);
router.get("/", [verifyAccessToken, isAdmin], ctrl.getAllBlog);
router.put("/like", verifyAccessToken,  ctrl.likeBlog);
router.put("/:_id", [verifyAccessToken, isAdmin], ctrl.updateBlog);
router.delete("/:_id", [verifyAccessToken, isAdmin], ctrl.deleteBlog);
module.exports = router;