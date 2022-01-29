
const User = require('../model/user.js');

class UserController {
    login(req,res,next){
        res.render('login');
    }

    myAccount(req,res,next){
        // const provider = req.user.provider;
        // var id = req.user.id;
        User.findOne({id: '1384771445288690'}, function(err, user){
        // User.findOne({id: id, authType: provider}, function(err, user){
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
        // const provider = req.user.provider;
        // var id = req.user.id;
        User.findOne({id: '1384771445288690'}, function(err, user){
        // User.findOne({id: id, authType: provider}, function(err, user){
            if(user){
                user.username = req.body.username;
                user.email = req.body.email;
                user.gender = req.body.gender;
                user.dayOfBirth = req.body.day;
                user.monthOfBirth = req.body.month;
                user.yearOfBirth = req.body.year;
                user.avatar_base64.data = req.body.avatar_base64.data;
                user.avatar_base64.contentType = req.body.avatar_base64.contentType;
                user.save();
            }
            return;
        })
    }
}

module.exports = new UserController;