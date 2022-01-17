const homeRouter = require('../routes/home.js');
function route(app) {
    app.use('/',homeRouter);
}

module.exports = route;