
class UserController {
    login(req,res,next){
        res.render('login');
    }
}

module.exports = new UserController;