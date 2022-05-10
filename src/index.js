const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const route = require('./routes/main.js');
const fbauthentication = require('./authentication method/facebook.js');
const ggAthentication = require('./authentication method/google.js');
const upload = require('express-fileupload');
const methodOverride = require('method-override')
// require('dotenv').config();
const port = process.env.PORT || 3000;


app.engine('.hbs',handlebars({extname: '.hbs'}));
app.set('view engine','.hbs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(upload());
app.use(methodOverride('_method'));


fbauthentication(app);
ggAthentication(app);
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})