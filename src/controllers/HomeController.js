const Product = require('../model/product.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');

class HomeController {
    home(req, res, next) {
        res.render('home');
    }
}

module.exports = new HomeController;
