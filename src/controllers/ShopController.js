const Product = require('../model/product.js');
const User = require('../model/user.js');
const Shop = require('../model/shop.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');

class ShopController {
    manageShop(req, res, next){
        const provider = req.user.provider;
        var id = req.user.id;
        User.findOne({id: id, authType: provider}, function(err, user){
        // User.findOne({id: '1384771445288690'}, function(err, user){
            if(user.shop){
                Product.find({owner: user.shop}, function(err, product){
                    res.render('manage_shop', { 
                        userName: user.username,
                        userAvatar: user.avatar,
                        user_avatar_base64: user.avatar_base64.data,
                        product: multiObject(product),
                    });
                })
            }
            else {
                res.redirect(`/user/seller/signup/view`);
            }
        })
    }

    addNewProduct(req,res,next){
        const provider = req.user.provider;
        var id = req.user.id;
        // User.findOne({id: '1384771445288690'}, function(err, user){
        User.findOne({id: id, authType: provider}, function(err, user){
            let unit = req.body.discount.unit;
            let priceAfterDiscount = 0, price = Number(req.body.price);
            if(unit == '%'){
                priceAfterDiscount = Math.floor(price - (price*req.body.discount.amount)/100);
            }
            else {
                priceAfterDiscount = Math.floor(Number(req.body.price) - req.body.discount.amount);
            }
            const product = new Product;
            product.name = req.body.name;
            product.category = req.body.productCategory;
            product.originPrice = req.body.price == '0' ? '1' : req.body.price;
            product.priceAfterDiscount = priceAfterDiscount;
            product.description = req.body.description;
            product.totalAmount = req.body.totalAmount == '0' ? '1' : req.body.totalAmount;
            product.madeIn = req.body.madeIn;
            product.deliveryFrom = req.body.deliveryFrom;
            product.discount.amount = req.body.discount.amount;
            product.discount.unit = req.body.discount.unit;
            product.imgs = req.body.imgs;
            product.avatar = req.body.imgs[0];
            product.introduction = req.body.introduction;
            product.owner = user.shop;
            product.brand = req.body.brand;
            product.available = Number(req.body.totalAmount);
            product.sold = 0;
            product.save();
            Shop.findById({_id:user.shop},function(err, shop){
                if(shop){
                    shop.products.push(product._id);
                    shop.save();
                }
            })
        })
    }

    modifyProductView(req, res,next){
        const provider = req.user.provider;
        var id = req.user.id;
        User.findOne({id: id, authType: provider}, function(err, user){
            // User.findOne({id: '1384771445288690'}, function(err, user){
                Product.findById({_id: req.params.id},function(err, product){
                    res.render('modify_product',{
                        user: object(user),
                        product: object(product),
                        imgs: product.imgs,
                    });
                })
            })
    }

    modifyProduct(req, res, next){
        const provider = req.user.provider;
        var id = req.user.id;
        // User.findOne({id: id, authType: provider}, function(err, user){
            User.findOne({id: '1384771445288690'}, function(err, user){
                Product.findById({_id: req.params.id},function(err, product){
                    product.name = req.body.product_name;
                    product.introduction = req.body.product_introduction;
                    product.category = req.body.category;
                    product.avatar = req.body.product_avatar;
                    product.imgs = req.body.product_img_item;
                    product.description = req.body.product_description;
                    product.totalAmount = req.body.totalAmount;
                    product.originPrice = req.body.originPrice;
                    product.discount.amount = req.body.discount_amount;
                    product.discount.unit = req.body.discount_unit;
                    product.brand = req.body.brand;
                    product.madeIn = req.body.made_in;
                    product.deliveryFrom = req.body.delivery_from;
                    product.save();
                    res.redirect('/shop');
                })
            })
    }
}

module.exports = new ShopController;