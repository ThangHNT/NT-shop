const express = require('express');
const router = express.Router();
const shopController = require('../controllers/ShopController.js');

router.get('/', shopController.manageShop);
router.post('/add-product', shopController.addNewProduct);
router.get('/modify-product-page/:id',shopController.modifyProductView); // view chỉnh sửa info sản phẩm
router.put('/modify-product/:id', shopController.modifyProduct); 

module.exports = router;