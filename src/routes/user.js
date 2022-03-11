const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');

router.get('/myAccount', userController.myAccount);
router.post('/updateProfile', userController.updateProfile);
router.post('/create/address', userController.createAddress);
router.patch('/default/address', userController.changeDefaultAddress);
router.delete('/delete/address', userController.deleteAddress); // xóa địa chỉ
router.put('/edit/address', userController.editAddress);  // chỉnh sửa địa chỉ
router.get('/json/avatar',userController.getJsonAvatar);  // tao trang json cho data image
// router.get('/json/address',userController.getJsonAddress);   // tao trang json cho data address
router.get('/seller/signup/view',userController.sellerSignup); // tạo trang đăng ký người bán
router.post('/seller/signup/successful',userController.sellerSignupSuccessful); // đăng ký ng bán thành công
router.get('/cart',userController.cart); // trang giỏ hàng
router.post('/add-to-cart',userController.addToCart);

module.exports = router;