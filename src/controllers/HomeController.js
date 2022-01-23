const Product = require('../model/product.js');
const {multiObject} = require('../convertToObject.js');

class HomeController {
    home(req, res, next) {
        Product.find()
            .then((products) => {
                res.render('home', {
                    products :multiObject(products),
                    user: req.user,
                    avatar: req.user.avatar
                })
            })
            .catch(next);
    }
}

module.exports = new HomeController;
