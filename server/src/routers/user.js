const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/user');
const {verifyAccessToken, isAdmin} = require ('../middlewares/verifyToken')

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/',[verifyAccessToken, isAdmin], ctrl.getAllUsers);
router.get('/getOneUser',verifyAccessToken, ctrl.getOneUser);
router.post('/refreshToken', ctrl.refreshAccessToken);
router.get('/logout', ctrl.logout);
router.delete('/', ctrl.delateUser);
router.put('/current',verifyAccessToken, ctrl.updateUser);
router.put('/address',verifyAccessToken, ctrl.updateAddress);
router.put('/:uid',[verifyAccessToken, isAdmin], ctrl.updateUserByAdmin);
module.exports = router;