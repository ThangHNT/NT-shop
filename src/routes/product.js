const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.get('/detail/:id',productController.productDetail);
router.post('/add-to-cart',productController.addToCart);


module.exports = router;