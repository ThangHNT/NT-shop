
const User = require('../model/user.js');

class UserController {
    login(req,res,next){
        res.render('login');
    }

    myAccount(req,res,next){
        const provider = req.user.provider;
        var id = req.user.id;
        User.findOne({id: id, provider: provider}, function(err, user){
            res.render('myAccount', {
                user: user,
            });
        })
    }

    updateProfile(req,res,next) {
        const provider = req.user.provider;
        var id = req.user.id;
        User.findOne({id: id, provider: provider}, function(err, user){
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