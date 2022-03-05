const Product = require('../model/product.js');
const User = require('../model/user.js');
const Cart = require('../model/cart.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');

class ProductController {
    productDetail(req,res,next) {
        // const provider = req.user.provider;
        // var id = req.user.id;
        User.findOne({id: '1384771445288690'}, function(err, user){
        // User.findOne({id: id, authType: provider}, function(err, user){
            if(user){
                let added = false;
                let listProduct ;
                let number;
                let cartId;
                Cart.findById({_id:user.cart}, function(err, cart){
                    if(cart){
                        listProduct = cart.products;
                        number=cart.products.length;
                        cartId = cart._id;
                    }
                })
                
                Product.findById({_id: req.params.id}, function(err, product){
                    let check = listProduct.some((item,index) => {
                        return item == req.params.id;
                    })
                    added = check;
                    let products = [];
                    Product.find({}, function(err, product){
                        if(product){
                            products.push(product);
                            // res.json(product.cart);
                        }
                    })
                    // res.json(products);
                    res.render('productDetail',{
                        user: object(user),
                        avatar_base64: user.avatar_base64.data,
                        product: object(product),
                        avatar: product.avatar.data,
                        imgs_base64 : object(product.img_base64),
                        imgs : object(product.imgs),
                        added : added,
                        number : number,
                        products: multiObject(products),
                    });
                })
            }
        })
    }
}

module.exports = new ProductController;
