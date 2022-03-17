const Product = require('../model/product.js');
const User = require('../model/user.js');
const Cart = require('../model/cart.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');

class ProductController {
    productDetail(req,res,next) {
        if(req.user){
            const provider = req.user.provider;
            var id = req.user.id;
            User.findOne({id: id, authType: provider}, function(err, user){
            // User.findOne({id: '1384771445288690'}, function(err, user){
                if(user){
                    Product.findById({_id: req.params.id}, function(err, product){
                        Cart.findById({_id:user.cart}, function(err,cart){
                            let amount = cart.products.length;
                            let added = false;
                            let seller = false;
                            if(user.shop) seller = true;
                            added = cart.products.some((item) => {
                                return item == req.params.id;
                            })
                            
                            if(cart.products.length > 0){
                                Product.find({cart: cart._id},function(err,products){
                                    res.render('productDetail',{
                                        user: object(user),
                                        avatar_base64: user.avatar_base64.data,
                                        product: object(product),
                                        avatar: product.avatar,
                                        imgs_base64 : object(product.img_base64),
                                        imgs : object(product.imgs),
                                        products: multiObject(products),
                                        amount: amount,
                                        added: added,
                                        seller: seller,
                                        productId: req.params.id,
                                    });
                                })
                            }
                            else {
                                res.render('productDetail',{
                                    user: object(user),
                                    avatar_base64: user.avatar_base64.data,
                                    product: object(product),
                                    avatar: product.avatar,
                                    imgs_base64 : object(product.img_base64),
                                    imgs : object(product.imgs),
                                    seller: seller,
                                    productId: req.params.id,
                                });
                            }
                        })
                    })
                }
            })
        }
        else {
            Product.findOne({_id:req.params.id},function(err,product){
                res.render('productDetail',{
                    product: object(product),
                    productId: req.params.id,
                    imgs : object(product.imgs),
                    avatar: product.avatar,
                })
            })
        }
    }

}

module.exports = new ProductController;
