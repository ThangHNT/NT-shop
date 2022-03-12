const Product = require('../model/product.js');
const User = require('../model/user.js');
const Cart = require('../model/cart.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');

class HomeController {
    home(req, res, next) {
        if(req.user){
            const provider = req.user.provider;
            const id = req.user.id;
            User.findOne({id:id, authType:provider}, function(err,user){
            // User.findOne({googleId: '110832461352388283166'}, function(err, user){
            // User.findOne({facebookId: '1384771445288690'}, function(err, user){
                Product.find({}, function(err,products) {
                    Cart.findById({_id: user.cart},function(err, cart){
                        if(cart != null){
                            if(cart.products.length > 0){
                                Product.find({cart: cart._id},function(err, cartProduct){
                                    res.render('home', {
                                        user: object(user),
                                        avatar: user.avatar,
                                        avatar_base64: user.avatar_base64.data,
                                        products : multiObject(products),
                                        seller: user.shop,
                                        cartProduct: multiObject(cartProduct),
                                        amount : cart.products.length,
                                    })
                                })
                            }
                            else {
                                res.render('home', {
                                    user: object(user),
                                    avatar: user.avatar,
                                    avatar_base64: user.avatar_base64.data,
                                    products : multiObject(products),
                                    seller: user.shop,
                                })
                            }
                        }
                        else {
                            res.render('home', {
                                user: object(user),
                                avatar: user.avatar,
                                avatar_base64: user.avatar_base64.data,
                                products : multiObject(products),
                                seller: user.shop,
                            })
                        }
                    })

                })
            })
        }
        else {
            Product.find()
                    .then((products) => {
                        res.render('home', {
                            products : multiObject(products),
                        })
                    })
                    .catch(next);
        }
    }

    login(req,res,next){
        res.render('login');
    }

    logout(req,res,next){
        req.session.destroy();
        req.user = null;
        res.redirect('/');
    }

}

module.exports = new HomeController;
