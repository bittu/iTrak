var jwt = require('jsonwebtoken'),
    User = require('../models/user');

var TOKEN_EXPIRATION = 1;

var auth = {
    login: function(req, res) {
        var userId = req.body.userId || '',
            password = req.body.password || '';

        if(userId === '' || password === '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }
        
        User.findOne({userId: userId}, function (err, user) {
            if (err) {
                console.log(err);
                return res.send(401);
            }

            if (user == undefined) {
                return res.send(401);
            }

            user.comparePassword(password, function(isMatch) {
                if (!isMatch) {
                    console.log("Attempt failed to login with " + user.username);
                    return res.send(401);
                }

                var token = jwt.sign({user: user._id}, secret.secretToken, { expiresInMinutes: TOKEN_EXPIRATION });

                return res.json({token:token,
                                user: user.profile
                                });
            });

        });
    }
}

module.exports = auth;