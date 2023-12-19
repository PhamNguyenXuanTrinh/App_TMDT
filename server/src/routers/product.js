const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const upload = require("../config/cloudinary.config")
router.post("/", [verifyAccessToken, isAdmin], ctrl.createProduct);
router.get("/", ctrl.getAllProduct);
router.get("/:pid", ctrl.getOneProduct);
router.put("/ratings", verifyAccessToken, ctrl.ratings);
router.put("/uploadImage/:pid", [verifyAccessToken, isAdmin], upload.single('images'),ctrl.uploadImgProduct);
router.delete("/:pid", [verifyAccessToken, isAdmin], ctrl.deleteProduct);
router.put("/:pid", [verifyAccessToken, isAdmin], ctrl.updateProduct);

module.exports = router;
