const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const upload = require("../config/cloudinary.config")
router.post("/", [verifyAccessToken, isAdmin], ctrl.createBlog);
router.get("/", [verifyAccessToken, isAdmin], ctrl.getAllBlog);
router.put("/upImageBlog/:_id", [verifyAccessToken, isAdmin], upload.single('images'),ctrl.uploadImgBlog);
router.put("/like/:bid", verifyAccessToken,  ctrl.likeBlog);
router.put("/dislike/:bid", verifyAccessToken,  ctrl.dislikeBlog);
router.put("/:_id", [verifyAccessToken, isAdmin], ctrl.updateBlog);
router.delete("/:_id", [verifyAccessToken, isAdmin], ctrl.deleteBlog);
router.get("/:_id", verifyAccessToken,  ctrl.getOneBlog);
module.exports = router;