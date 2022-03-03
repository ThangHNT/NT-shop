
const User = require('../model/user.js');
const Address = require('../model/address.js');
const Shop = require('../model/shop.js');

class UserController {
    login(req,res,next){
        res.render('login');
    }

    myAccount(req,res,next){
        const provider = req.user.provider;
        var id = req.user.id;
        // User.findOne({id: '1384771445288690'}, function(err, user){
        User.findOne({id: id, authType: provider}, function(err, user){
            if(user){
                res.render('myAccount', {
                    user: user,
                    username: user.username,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    gender: user.gender,
                    dayOfBirth: user.dayOfBirth,
                    monthOfBirth: user.monthOfBirth,
                    yearOfBirth: user.yearOfBirth,
                    avatar_base64: user.avatar_base64.data,
                    avatar: user.avatar,
                });
            }
            else {
                res.render('myAccount');
            }
        })
    }

    updateProfile(req,res,next) {
        const provider = req.user.provider;
        var id = req.user.id;
        // User.findOne({id: '1384771445288690'}, function(err, user){
        User.findOne({id: id, authType: provider}, function(err, user){
            if(user){
                user.username = req.body.username;
                user.email = req.body.email;
                user.gender = req.body.gender;
                user.dayOfBirth = req.body.day;
                user.monthOfBirth = req.body.month;
                user.yearOfBirth = req.body.year;
                if(req.body.phoneNumber != ''){
                    user.phoneNumber = req.body.phoneNumber;
                }
                if(req.body.avatar_base64.data !== ''){
                    user.avatar_base64.data = req.body.avatar_base64.data;
                    user.avatar_base64.contentType = req.body.avatar_base64.contentType;
                }
                user.save();
            }
            return;
        })
    }

    getJsonAvatar(req, res) {
        const provider = req.user.provider;
        var id = req.user.id;
        // User.findOne({id: '1384771445288690'}, function(err, user){
        User.findOne({id: id, authType: provider}, function(err, user){
            res.json(user.avatar_base64.data.toString());
        })
    }

    getJsonAddress(req, res, next){
        const provider = req.user.provider;
        var id = req.user.id;
        // User.findOne({id: '1384771445288690'}, function(err, user){
        User.findOne({id: id, authType: provider}, function(err, user){
            Address.find({user: user._id}, function(err, addresses){
                if(addresses){
                    res.json(addresses);
                }
            })
        })
        return;
    }

    createAddress(req,res,next){
        const provider = req.user.provider;
        var id = req.user.id;
        // User.findOne({id: '1384771445288690'}, function(err, user){
        User.findOne({id: id, authType: provider}, function(err, user){
            if(user){
                const address = new Address();
                address.receiverName = req.body.receiverName;
                address.phoneNumber = req.body.phoneNumber;
                address.city = req.body.city;
                address.district = req.body.district;
                address.detail = req.body.detail;
                address.user = user._id;
                if(user.address.length == 0){
                    address.default = 'Mặc định';
                }
                address.save();
                user.address.push(address._id);
                user.save();
            }
            return;
        })
    }

    editAddress(req, res, next){
        const provider = req.user.provider;
        var id = req.user.id;
        // User.findOne({id: '1384771445288690'}, function(err, user){
        User.findOne({id: id, authType: provider}, function(err, user){
            Address.findOne({_id: user.address[req.body.index]}, function(err, address){
                if(address){
                    address.receiverName = req.body.receiverName;
                    address.phoneNumber = req.body.phoneNumber;
                    address.city = req.body.city;
                    address.district = req.body.district;
                    address.detail = req.body.detail;
                    address.user = user._id;
                    address.save();
                }
            })
            return;
        })
    }

    deleteAddress(req,res,next) {
        const provider = req.user.provider;
        var id = req.user.id;
        // User.findOne({id: '1384771445288690'}, function(err, user){
        User.findOne({id: id, authType: provider}, function(err, user){
            Address.findOneAndDelete({_id: user.address[req.body.index]}, function(err, address){
            })
            user.address.splice(req.body.index, 1);
            user.save();
            return;
        })
    }

    changeDefaultAddress(req, res, next) {
        const provider = req.user.provider;
        var id = req.user.id;
        // User.findOne({id: '1384771445288690'}, function(err, user){
        User.findOne({id: id, authType: provider}, function(err, user){
            let thisindex = req.body.index;
            Address.find({}, function(err, addresses){
                addresses.forEach((address,index)=>{
                    if(index == thisindex){
                        address.default = 'Mặc định';
                        address.save();
                    }
                    else {
                        address.default = '';
                        address.save();
                    }
                })
            })
            return;
        })
    }

    sellerSignup(req, res,next){
        res.render('seller_signup');
    }

    sellerSignupSuccessful(req,res,next){
        // const provider = req.user.provider;
        // var id = req.user.id;
        User.findOne({id: '1384771445288690'}, function(err, user){
        // User.findOne({id: id, authType: provider}, function(err, user){
            const shop = new Shop();
            shop.brand = req.body.shop_name;
            shop.address = req.body.shop_address;
            shop.phoneContact = req.body.shop_phone_number;
            shop.owner = user._id;
            if(req.files){
                const dataBase64 = req.files.shop_avatar.data.toString("base64");
                shop.avatar_base64.data = dataBase64;
                shop.avatar_base64.contentType = req.files.shop_avatar.mimetype;
            }
            shop.save();
            user.shop = shop._id;
            user.save();
            res.send('thanh cong');
            return;
        })
    }

    
}

module.exports = new UserController;