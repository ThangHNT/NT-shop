const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeController.js');


router.get('/',homeController.home);
router.get('/logout',homeController.logout);

module.exports = router;