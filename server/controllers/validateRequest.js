var jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    level = require('level'),
    secret = require('../config/secret');

var db = require('../config/leveldb');

module.exports = function (req, res, next) {
    var token = req.headers.authorization;

    jwt.verify(token, secret.secretToken, function (err, decoded) {
        if (err) {
            return res.send(400, err.message);
        }
        if (!decoded || !decoded.auth) {
            return res.send(403, 'Not authorized');
        }
        // check if a key exists, else import word list:
        db.get(decoded.auth, function (err, record) {
            var r;
            try {
                r = JSON.parse(record);
            } catch (e) {
                r = {
                    valid: false
                };
            }
            if (err || !r.valid) {
                res.send(401, 'Invalid User');
            } else {
                next();
            }
        });
    });
}