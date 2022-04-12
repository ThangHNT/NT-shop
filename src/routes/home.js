const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeController.js');


router.get('/logout',homeController.logout);
router.get('/login',homeController.login); // view login
router.get('/visit-shop/:id',homeController.visitShop); 
router.get('/link',homeController.getLink);
router.post('/add-link',homeController.addLink);
router.get('/link-delete/:id',homeController.deleteLink);
router.get('/',homeController.home);

module.exports = router;