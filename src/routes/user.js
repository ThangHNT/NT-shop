const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');

router.get('/login',userController.login);
router.get('/myAccount', userController.myAccount);
router.post('/updateProfile', userController.updateProfile);
router.post('/create/address', userController.updateAddress);
router.get('/json/avatar',userController.getJsonAvatar);  // tao trang json cho data image
router.get('/json/address',userController.getJsonAddress);   // tao trang json cho data address

module.exports = router;