const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/user');

router.post('/register', ctrl.register);
router.get('/getAllUser', ctrl.getAllUsers);
module.exports = router;