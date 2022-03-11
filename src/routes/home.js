const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeController.js');


router.get('/logout',homeController.logout);
router.get('/login',homeController.login); // view login
router.get('/',homeController.home);

module.exports = router;