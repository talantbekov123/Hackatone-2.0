var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var glob = require('glob');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

// set axilary global variables
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('db', 'mongodb://localhost/news14');
/* facebook aoth handler */
passport.use(new FacebookStrategy({
        clientID: '1860725214215638',
        clientSecret: '29c0d5e69d983fce069166482a9cb080',
        callbackURL: 'http://localhost:3030/register/fb/callback',
        profileFields: ['id', 'first_name', 'last_name', 'email', 'birthday']
    },
    function(accessToken, refreshToken, profile, cb) {
        // user_data store json with provided user data
        cb(profile);
    }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/* install those libraries to all routes */
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Configure database */ 
var db = require('./database/index')('./database/models/*.js');
/* Configure routes */
var routes = glob.sync('./routes/*.js');

routes.forEach(function(route) {
    require(route)(app, db);
})

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
