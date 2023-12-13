const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/product');
const {verifyAccessToken, isAdmin} = require ('../middlewares/verifyToken')

router.post('/',[verifyAccessToken, isAdmin], ctrl.createProduct);
router.get('/', ctrl.getAllProduct);
router.get('/:pid', ctrl.getOneProduct);
router.delete('/:pid',[verifyAccessToken, isAdmin], ctrl.deleteProduct);
router.put('/:pid',[verifyAccessToken, isAdmin], ctrl.updateProduct);
module.exports = router;