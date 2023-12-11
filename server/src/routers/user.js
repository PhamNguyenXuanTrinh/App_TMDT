const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/user');
const {verifyAccessToken} = require ('../middlewares/verifyToken')

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/getAllUser', ctrl.getAllUsers);
router.get('/getOneUser',verifyAccessToken, ctrl.getOneUser);
router.post('/refreshToken', ctrl.refreshAccessToken);
router.get('/logout', ctrl.logout);

module.exports = router;