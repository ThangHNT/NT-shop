const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');

router.get('/login',userController.login);

module.exports = router;