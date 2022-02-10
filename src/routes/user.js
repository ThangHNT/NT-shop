const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');

router.get('/login',userController.login);
router.get('/myAccount', userController.myAccount);
router.post('/updateProfile', userController.updateProfile);
router.post('/update/address', userController.updateAddress);
router.get('/json/avatar',userController.getJSON);

module.exports = router;