const homeRouter = require('./home.js');
const userRouter = require('./user.js');

function route(app) {
    app.use('/user',userRouter);
    app.use('/',homeRouter);
}

module.exports = route;