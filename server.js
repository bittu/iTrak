'use strict';

// Module dependencies.
var express = require('express'),
    passport = require('passport'),
    path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    mongoStore = require('connect-mongo')(expressSession),
    config = require('./config/config');

var app = express();

// Connect to database
var db = require('./config/db').db;

var pass = require('./config/passport');

app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler());
app.set('views', __dirname + '/public/');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// cookieParser should be above session
app.use(cookieParser());

// bodyParser should be above methodOverride
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan());

// express/mongo session storage
app.use(expressSession({
    secret: 'MEAN',
    store: new mongoStore({
        url: config.db,
        collection: 'sessions'
    })
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());

//Bootstrap routes
require('./app/routes')(app);

// Start server
var port = config.port;
app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});