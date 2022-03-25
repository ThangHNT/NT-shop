const Product = require('../model/product.js');
const User = require('../model/user.js');
const Cart = require('../model/cart.js');
const Shop = require('../model/shop.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');

class AdminController {
    managePage(req, res, next){
        User.find({}, function(err, user){
            Product.find({}, function(err, product){
                res.render('admin', {
                    user: multiObject(user),
                    product: multiObject(product),
                });
            })
        })
    }
    deleteProduct(req,res,next){
        let productId = req.body.productId;
        Product.findOneAndDelete({_id: productId}, function(err, product){
            if(product){
                Shop.findById({_id: product.owner}, function(err, shop){
                    let productIndex = shop.products.indexOf(productId);
                    shop.products.splice(productIndex,1);
                    product.cart.forEach(function(element,index) {
                        Cart.findById({_id: element}, function(err, cart){
                            let index = cart.products.indexOf(productId);
                            cart.products.splice(index,1);
                            cart.save();
                        })
                    })
                    shop.save();
                })
            }
        })
        res.send('thanh cong');
    }

    deleteUser(req, res, next){
        let userId = req.body.userId;
        // User.findOneAndDelete({_id: userId}, function(err, user){
        User.findOne({_id: userId}, function(err, user){
            if(user){
                var promise = Promise.resolve();
                promise 
                    .then(() => {
                        // Cart.findOneAndDelete({_id: user.cart}, function(err, cart){
                        Cart.findById({_id: user.cart}, function(err, cart){
                            cart.products.forEach(function(element,index){
                                Product.findById({_id: element}, function(err, product){
                                    console.log(product);
                                    // let cartIndex = product.cart.indexOf(element);
                                    // product.cart.splice(cartIndex,1);
                                    // product.save();
                                })
                            })
                        })
                    })
                    .then(() => {
                        // Shop.findOneAndDelete({_id: user.shop},function(err, shop){
                        // Shop.findById({_id: user.shop},function(err, shop){
                        //     if(shop){
                        //         if(shop.products.length > 0){
                        //             shop.products.forEach(function(element,index){
                        //                 Product.findOneAndDelete({_id: element}, function(err, product){
        
                        //                 })
                        //             })
                        //         }
                        //     }
                        // })
                    })
                    .catch((err) => {console.log(err)});
            }
        })
        res.send('thanh cong');
    }

}

module.exports = new AdminController;