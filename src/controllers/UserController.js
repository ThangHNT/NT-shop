
class UserController {
    login(req,res,next){
        res.render('login');
    }

    myAccount(req,res,next){
        res.render('myAccount');
    }
}

module.exports = new UserController;