
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var session = require("express-session");
var passport = require('passport');
const User = require('../model/user.js');
const Cart = require('../model/cart.js');

function ggAthentication(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))

    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: '604856952366-efq4pjustjjib5chvsmcvofvcoko6qbt.apps.googleusercontent.com',
        clientSecret: process.env.clientSecretgg,
        callbackURL: "https://shop-hnt.herokuapp.com/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            return cb(null,profile);
        }
    ));

    app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'], session:false }));

    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res,next) {
        const id = req.user.id;
        let firstName = req.user.name.givenName;
        if(firstName == null) firstName = '';
        let lastName = req.user.name.familyName;
        if(lastName == null) lastName = '';
        const fullName = `${lastName} ${firstName}`;
        const avatar = req.user.photos[0].value;
        User.findOne({id: id}, function(err, user) {
            if(user == null) {
                const user = new User({id :id, email : '', username : fullName,authType: 'google', avatar: avatar});
                const cart = new Cart();
                    cart.user = user._id;
                    cart.save();
                    user.cart = cart._id;
                user.save()
                    .then(() => {
                        res.redirect(`/`);
                    })
                    .catch(next);
            }
            else res.redirect(`/`);
        })
    });
}

module.exports = ggAthentication;
