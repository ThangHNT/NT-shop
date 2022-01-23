const Product = require('../model/product.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');

class HomeController {
    home(req, res, next) {
        res.json(req.user);
        // Product.find()
        //     .then((products) => {
        //         res.render('home', {
        //             products :multiObject(products),
        //             user: req.user,
        //         })
        //     })
        //     .catch(next);
    }
}

module.exports = new HomeController;
