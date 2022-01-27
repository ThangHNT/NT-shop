const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');

router.get('/login',userController.login);
router.get('/myAccount', userController.myAccount);

module.exports = router;