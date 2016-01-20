var jwt = require('jsonwebtoken'),
    User = require('../models/User'),
    crypto = require('crypto'),
    secret = require('../config/secret');

var db = require('../config/leveldb').db;

var TOKEN_EXPIRATION = 60,
    GUID_LENGTH = 12


var auth = {
    login: function(req, res) {
        var userId = req.body.userId || '',
            password = req.body.password || '';
        console.log(req.body);

        if (userId === '' || password === '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        var query = User.findOne({
            userId: userId
        });
        query.populate('projects');

        query.exec(function(err, user) {
            if (err) {
                console.log(err);
                return res.send(401);
            }

            if (user == undefined) {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid credentials no user"
                });
                return;
            }

            /* if(!user.comparePassword(password)) {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid credentials password wrong"
                });
                return;
            }
            */
            user.comparePassword(password, function(isMatch) {
                if (!isMatch) {
                    console.log("Attempt failed to login with " + user.username);
                    return res.send(401);
                }

                delete user.password;

                /*var token = jwt.sign({
                    user: user._id
                }, secret.secretToken, {
                    expiresInMinutes: TOKEN_EXPIRATION
                });*/

                var token = generateAndStoreToken(req, user);

                return res.json({
                    token: token,
                    user: user
                });
            });

        });
    },

    logout: function(req, res) {
        // invalidate the token
        var token = req.headers.authorization;
        console.log(' >>> ', token)
        var decoded = jwt.decode(token);

        db.get(decoded.auth, function(err, record) {
            var updated = JSON.parse(record);
            updated.valid = false;
            db.put(decoded.auth, updated, function(err) {
                console.log('updated: ', updated)
                return res.status(200).json({
                    "message": "Logged out!!"
                });
            });
        });
    }
}


function generateGUID() {
    return crypto.randomBytes(Math.ceil(GUID_LENGTH * 3 / 4))
        .toString('base64') // convert to base64 format
        .slice(0, GUID_LENGTH) // return required number of characters
        .replace(/\+/g, '0') // replace '+' with '0'
        .replace(/\//g, '0'); // replace '/' with '0'
}

function generateToken(req, GUID, user) {
    var token = jwt.sign({
        auth: GUID,
        user: user.userId,
        isAdmin: user.isAdmin
    }, secret.secretToken, {
        expiresInMinutes: TOKEN_EXPIRATION
    });
    return token;
}

function generateAndStoreToken(req, user) {
    var GUID = generateGUID();
    var token = generateToken(req, GUID, user);
    console.log(jwt.decode(token, secret.secretToken))
    var record = {
        "valid": true,
        "created": new Date().getTime()
    };
    console.log(db)

    db.put(GUID, JSON.stringify(record), function(err) {
        if (err) {
            console.log(err);
        }
        console.log("record saved ", record);
    });

    return token;
}

module.exports = auth;