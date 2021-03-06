const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

router.get('/',adminController.managePage) // view trang quản lý của admin
router.delete('/delete/product', adminController.deleteProduct) // xoa sản phẩm
router.delete('/delete/user', adminController.deleteUser) // xóa user 

module.exports = router;
