var User = require('../models/User');

var users = {

    /**
     * Admin related methods
     */

    getAll: function (req, res) {
        var query = User.find();
        query.sort('userId');
        query.exec(function (err, users) {
            if (err) {
                console.log(err);
                return res.send(400);
            }
            return res.json(200, users);
        });
    },

    getOne: function (req, res) {
        var id = req.params.id || '';
        if (id === '') {
            return res.send(400);
        }

        var query = User.findOne({
            _id: id
        });

        query.exec(function (err, user) {
            if (err) {
                console.log(err);
                return res.send(400);
            }

            return res.json(200, user.adminProfile);
        });
    },

    create: function (req, res) {
        var user = req.body.user;
        if (user === null) {
            return res.send(400);
        }

        var userEntry = new User();
        userEntry.userId = user.userId;
        userEntry.email = user.email;
        userEntry.firstName = user.firstName;
        userEntry.lastName = user.lastName;
        userEntry.dob = user.dob;
        userEntry.isAdmin = user.isAdmin;
        userEntry.password = user.userId + '@' + user.lastName;
        userEntry.projects = user.projects;

        userEntry.save(function (err) {
            if (err) {
                console.log(err);
                return res.send(400, 'Error creating new user');
            }

            return res.send(200, 'User: ' + user.userId + ' is created');
        });
    },

    update: function (req, res) {
        var user = req.body.user,
            id = req.params.id || '';
        if (user === null || id === '') {
            return res.send(400);
        }

        var userUpdate = {};

        userUpdate.email = user.email;
        userUpdate.firstName = user.firstName;
        userUpdate.lastName = user.lastName;
        userUpdate.dob = user.dob;
        userUpdate.updated = Date.now();
        userEntry.projects = user.projects;

        User.update({
            _id: id
        }, userUpdate, function (err, count, user) {
            if (err) {
                console.log(err);
                return res.send(400, 'Error udpating user: ' + user.userId);
            }

            return res.send(200, 'User: ' + user.userId + ' is updated');
        });
    },

    delete: function (req, res) {
        var id = req.params.id || '';

        if (id === '') {
            return res.send(400);
        }

        var query = User.findOne({
            _id: id
        });

        query.exec(function (err, user) {
            if (err) {
                console.log(err);
                return res.send(400);
            }
            if (user) {
                user.remove();
                return res.send(200, 'User deleted');
            }

            return res.send(400);
        });
    },

    // resetPassword for Admin to reset User's password to default.
    resetPassword: function (req, res) {
        var id = req.params.id || '';
        if (id === '') {
            return res.send(400);
        }

        var query = User.findOne({
            _id: id
        });

        query.exec(function (err, user) {
            if (err) {
                console.log(err);
                return res.send(400);
            }
            user.password = user.userId + '@' + user.lastName;
            userUpdate.updated = Date.now();

            user.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.send(400);
                }
                res.send(200, 'Password reset for User: ' + user.userId);
            });
        });
    },

    /**
     * User related methods
     */

    // changePassword for user
    changePassword: function (req, res) {
        var id = req.params.id || '',
            passwords = req.body.passwords;

        if (id === '') {
            return res.send(400);
        }

        var query = User.findOne({
            _id: id
        });

        query.exec(function (err, user) {
            if (err) {
                console.log(err);
                return res.send(400);
            }
            if (!user.comparePassword(passwords.oldPassword)) {
                return res.send(400, 'Old password did not match');
            }

            user.password = password.newPassword;
            userUpdate.updated = Date.now();

            user.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.send(400);
                }
                res.send(200, 'Password updated');
            });
        });
    },


    getProfile: function (req, res) {
        var id = req.params.id || '';
        if (id === '') {
            return res.send(400);
        }

        var query = User.findOne({
            _id: id
        });

        query.exec(function (err, user) {
            if (err) {
                console.log(err);
                return res.send(400);
            }

            return res.json(200, user.userProfile);
        });
    }
}

module.exports = users;