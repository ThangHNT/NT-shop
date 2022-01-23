const Product = require('../model/product.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');
const User = require('../model/user.js');

class HomeController {
    home(req, res, next) {
        User.findById({_id:'61ecb7cd767e5e0390c60b8a'}, function(err,user){
            if(user){
                res.render('home', {
                    user: user
                })
            }
            else {
                res.send('ko tim thay');
            }
        })
    }
}

module.exports = new HomeController;
