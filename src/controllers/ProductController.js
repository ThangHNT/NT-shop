const Product = require('../model/product.js');
const User = require('../model/user.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');

class ProductController {
    productDetail(req,res,next) {
        // const provider = req.user.provider;
        // var id = req.user.id;
        User.findOne({id: '1384771445288690'}, function(err, user){
        // User.findOne({id: id, authType: provider}, function(err, user){
            if(user){
                Product.findById({_id: req.params.id}, function(err, product){
                    if(product){
                        res.render('productDetail',{
                            user: object(user),
                            avatar_base64: user.avatar_base64.data,
                            product: object(product),
                            avatar: product.avatar.data,
                            imgs_base64 : object(product.img_base64),
                            imgs : object(product.imgs),
                        });
                    }
                })
            }
            else {
                Product.findById({_id: req.params.id}, function(err, product){
                    if(product){
                        res.render('productDetail',{
                            product: object(product),
                            avatar: product.avatar.data,
                            imgs_base64 : object(product.img_base64),
                            imgs : object(product.imgs),
                        });
                    }
                })
            }
        })
    }
}

module.exports = new ProductController;
