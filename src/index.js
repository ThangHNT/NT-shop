const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const handlebars = require('express-handlebars');
const route = require('./routes/main.js');
const fbauthentication = require('./authentication method/facebook.js');
const ggAthentication = require('./authentication method/google.js');

app.engine('.hbs',handlebars({extname: '.hbs'}));
app.set('view engine','.hbs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



fbauthentication(app);
ggAthentication(app);
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})