const Product = require('../model/product.js');
const User = require('../model/user.js');
const passport = require('passport');
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
                            avatar: user.avatar,
                            avatar_base64: user.avatar_base64.data,
                            products : multiObject(products),
                            seller: user.shop,
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

    logout(req,res,next){
        req.session.destroy();
        req.user = null;
        res.redirect('/');
    }

    productDetail(req,res,next) {
        res.render('productDetail');
    }
}

module.exports = new HomeController;
