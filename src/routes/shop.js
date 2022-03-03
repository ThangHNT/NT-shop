const express = require('express');
const router = express.Router();
const shopController = require('../controllers/ShopController.js');

router.get('/', shopController.manageShop);

module.exports = router;