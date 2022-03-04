const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.get('/detail/:id',productController.productDetail);


module.exports = router;