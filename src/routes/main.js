const homeRouter = require('./home.js');
const userRouter = require('./user.js');
const shopRouter = require('./shop.js');

function route(app) {
    // app.use('/user',(req, res, next) => {
    //     if(req.user){
    //         return next();
    //     } else res.redirect('/user/login');
    // }, userRouter);
    // app.use('/',(req, res, next) => {
    //     if(req.user){
    //         return next();
    //     } else res.redirect('/user/login');
    // }, homeRouter);
    app.use('/user',userRouter);
    app.use('/shop',shopRouter);
    app.use('/',homeRouter);
}

module.exports = route;