const Product = require('../model/product.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');
const User = require('../model/user.js');

class HomeController {
    home(req, res, next) {
        if(req.user){
            const provider = req.user.provider;
            const id = req.user.id;
            User.findOne({id:id, authType:provider}, function(err,user){
                if(user){
                    res.render('home', {
                        user: object(user)
                    })
                }
                else {
                    res.render('home');
                }
            })
        }
        else {
            res.render('home');
        }
    }
}

module.exports = new HomeController;
