'use strict';

var path = require('path'),
    auth = require('../config/auth');

module.exports = function (app) {
    // Session routes
    var session = require('./controllers/session');
    app.get('/auth/session', auth.ensureAuthenticated, session.session);
    app.post('/auth/session', session.login);
    app.del('/auth/session', session.logout);

    // User routes
    var users = require('./controllers/users');
    app.post('/auth/users', users.create);
    //app.get('/auth/users/', users.show);
    //app.get('/auth/users/:userId', users.showOne);
    //app.put('/auth/users/:userId', users.update);

    // Project routes
    /*var projects = require('./controllers/projects');
    app.post('/auth/projects', projects.create);
    app.get('/auth/projects/', projects.show);
    app.get('/auth/projects/:projectId', projects.showOne);
    app.put('/auth/projects/:projectId', projects.update);
    */
    // Issue routes


    // Angular Routes
    app.get('/*', function (req, res) {
        if (req.user) {
            res.cookie('user', JSON.stringify(req.user.user_info));
        }

        res.render('index.html');
    });
}