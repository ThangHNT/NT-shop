const Product = require('../model/product.js');
const User = require('../model/user.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');

class HomeController {
    home(req, res, next) {
        if(req.user){
            const provider = req.user.provider;
            const id = req.user.id;
            User.findOne({id:id, authType:provider}, function(err,user){
                Product.find()
                    .then((products) => {
                        res.render('home', {
                            user: object(user),
                            products : multiObject(products)
                        })
                    })
                    .catch(next);
            })
        }
        else {
            Product.find()
                .then((products) => {
                    res.render('home', {
                        products : multiObject(products)
                    })
                })
                .catch(next);
        }
    }
}

module.exports = new HomeController;
