const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.get('/detail/:id',productController.productDetail);
router.get('/listed', productController.listedProduct);     // view json ds san pham


module.exports = router;