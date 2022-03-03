const express = require('express');
const router = express.Router();
const shopController = require('../controllers/ShopController.js');

router.get('/', shopController.manageShop);
router.post('/add-product', shopController.addNewProduct);

module.exports = router;