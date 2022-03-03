const Product = require('../model/product.js');
const User = require('../model/user.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');

class ShopController {
    manageShop(req, res, next){
        // const provider = req.user.provider;
        // var id = req.user.id;
        User.findOne({id: '1384771445288690'}, function(err, user){
        // User.findOne({id: id, authType: provider}, function(err, user){
            res.render('manage_shop', { 
                userName: user.username,
                userAvatar: user.avatar,
                user_avatar_base64: user.avatar_base64.data
            });
        })
    }
}

module.exports = new ShopController;