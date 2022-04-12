const Product = require('../model/product.js');
const User = require('../model/user.js');
const Cart = require('../model/cart.js');
const Shop = require('../model/shop.js');
const Link = require('../model/link.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');

class HomeController {
    home(req, res, next) {
        if(req.user){
            const provider = req.user.provider;
            const id = req.user.id;
            User.findOne({id:id, authType:provider}, function(err,user){
            // User.findOne({id: '1384771445288690'}, function(err, user){
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

    visitShop(req, res, next){
        if(req.user){
            const provider = req.user.provider;
            const id = req.user.id;
            User.findOne({id:id, authType:provider}, function(err,user){
            // User.findOne({id: '1384771445288690'}, function(err, user){
                Product.find({shop: req.params.id}, function(err,products) {
                    Cart.findById({_id: user.cart},function(err, cart){
                        if(cart.products.length > 0){
                            Product.find({cart: cart._id},function(err, cartProduct){
                                Shop.findOne({_id: req.params.id}, function(err, shop){
                                    res.render('visit_shop', {
                                        user: object(user),
                                        avatar: user.avatar,
                                        avatar_base64: user.avatar_base64.data,
                                        products : multiObject(products),
                                        seller: user.shop,
                                        cartProduct: multiObject(cartProduct),
                                        amount : cart.products.length,
                                        shop: object(shop)
                                    })
                                })
                            })
                        }
                        else {
                            Shop.findOne({_id: req.params.id}, function(err, shop){
                                res.render('visit_shop', {
                                    user: object(user),
                                    avatar: user.avatar,
                                    avatar_base64: user.avatar_base64.data,
                                    products : multiObject(products),
                                    seller: user.shop,
                                    shop: object(shop)
                                })
                            })
                        }
                    })

                })
            })
        }
        else {
            Shop.findOne({_id: req.params.id}, function(err, shop){
                Product.find({shop:req.params.id}, function(err, product){
                    res.render('visit_shop', {
                        products : multiObject(product),
                        shop: object(shop)
                    })
                })
            })
        }
    }

    getLink(req, res, next) {
        Link.find({}, function(err, links){
            res.render('store_link', {
                link: multiObject(links)
            })
        })
    }

    addLink(req, res, next) {
        const link = new Link();
        link.href = req.body.link;
        link.note = req.body.note;
        link.save();
        res.redirect('/link');
    }

    deleteLink(req, res, next) {
        Link.findOneAndDelete({_id: req.params.id}, function(err,link){
            console.log(link)
        })
        res.send('thanh cong');
    }

}

module.exports = new HomeController;
