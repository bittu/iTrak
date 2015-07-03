'use strict';

var User = require('../models/User'),
    passport = require('passport');

/**
 * Create user
 * requires: {username, password, email, firstname, lastName, dob}
 * returns: {email, password}
 */
exports.create = function (req, res, next) {
    var newUser = new User(req.body);

    newUser.save(function (err) {
        if (err) {
            return res.json(400, err);
        }

        req.logIn(newUser, function (err) {
            if (err) return next(err);
            return res.json(newUser.user_info);
        });
    });
};