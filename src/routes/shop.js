const express = require('express');
const router = express.Router();
const shopController = require('../controllers/ShopController.js');

router.get('/', shopController.manageShop);
router.post('/add-product', shopController.addNewProduct);
router.get('/modify-product-page/:id',shopController.modifyProductView); // view chỉnh sửa info sản phẩm
router.put('/modify-product/:id', shopController.modifyProduct);    // chỉnh sửa thông tin sản phẩm
router.delete('/delete-product', shopController.deleteProduct); // Xóa sản phẩm
router.put('/profile/update', shopController.updateProfile)     // cập nhật profile của shop

module.exports = router;