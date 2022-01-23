const Product = require('../model/product.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject');

class HomeController {
    home(req, res, next) {
        Product.find()
            .then((products) => {
                res.render('home', {
                    products :multiObject(products),
                    user: object(req.user),
                })
            })
            .catch(next);
    }
}

module.exports = new HomeController;
