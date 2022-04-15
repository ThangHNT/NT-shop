const homeRouter = require('./home.js');
const userRouter = require('./user.js');
const shopRouter = require('./shop.js');
const productRouter = require('./product.js');
const adminRouter = require('./admin.js');

function route(app) {
    // app.use('/user',(req, res, next) => {
    //     if(req.user){
    //         return next();
    //     } else res.redirect('/login');
    // }, userRouter);
    // app.use('/shop',(req, res, next) => {
    //     if(req.user){
    //         return next();
    //     } else res.redirect('/login');
    // }, shopRouter);
    app.use('/admin',(req, res, next) => {
        if(req.user){
            if(req.user.id == '1384771445288690') return next();
            else res.redirect('/');
        }
        else res.redirect('/login');
    }, adminRouter);
    // app.use('/admin',adminRouter);
    app.use('/user',userRouter);
    app.use('/shop',shopRouter);
    
    app.use('/product',productRouter);
    app.use('/',homeRouter);
}

module.exports = route;