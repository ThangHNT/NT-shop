const Product = require('../model/product.js');
const User = require('../model/user.js');
const Cart = require('../model/cart.js');
const {multiObject} = require('../convertToObject.js');
const {object} = require('../convertToObject.js');

class AdminController {
    managePage(req, res, next){
        res.render('admin')
    }
    manageProduct(req,res,next){

    }
}

module.exports = new AdminController;