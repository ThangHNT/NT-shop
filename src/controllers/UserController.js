
const User = require('../model/user.js');

class UserController {
    login(req,res,next){
        res.render('login');
    }

    myAccount(req,res,next){
        res.render('myAccount');
    }

    updateProfile(req,res,next) {
        // const provider = req.user.provider;
        // var id = req.user.id;
        User.findOne({id: '1384771445288690'}, function(err, user){
            console.log(req.body);
            if(user){
                user.username = req.body.username;
                user.email = req.body.email;
                user.gender = req.body.gender;
                user.dayOfBirth = req.body.day;
                user.monthOfBirth = req.body.month;
                user.yearOfBirth = req.body.year;
                user.save();
                if(req.file){
                    console.log('co anh moi');
                }
                else {
                    console.log('khong co anh moi');
                }
            }
            return;
        })
    }
}

module.exports = new UserController;