const homeRouter = require('./home.js');
const userRouter = require('./user.js');

function route(app) {
    app.use('/user',userRouter);
    app.use('/',homeRouter);
    app.post('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
}

module.exports = route;