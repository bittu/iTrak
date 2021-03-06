var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

var app = express(),
    db = require('./config/mongodb').db;
    
// Start the server
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});

var io = require('socket.io')(server);

app.use(logger('dev'));
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    //CORS Headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use(express.static(path.join(__dirname, '../client')));

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
app.all('/api/*', [require('./controllers/validateRequest')]);

app.use('/', require('./routes'));

app.get('*', function (req, res) {
    res.sendFile('../client/index.html');
});

// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Initialize listeners for socket
require('./controllers/socket')(io);