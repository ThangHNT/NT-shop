const homeRouter = require('./home.js');
const userRouter = require('./user.js');
const shopRouter = require('./shop.js');
const productRouter = require('./product.js');

function route(app) {
    app.use('/user',(req, res, next) => {
        if(req.user){
            return next();
        } else res.redirect('/login');
    }, userRouter);
    app.use('/shop',(req, res, next) => {
        if(req.user){
            return next();
        } else res.redirect('/login');
    }, shopRouter);
    app.use('/product',productRouter);
    app.use('/',homeRouter);
    // app.use('/user',userRouter);
    // app.use('/shop',shopRouter);
}

module.exports = route;