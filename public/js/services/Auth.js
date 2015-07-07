'use strict';

angular.module('iTrakApp')
    .factory('Auth', function Auth($location, $rootScope, Session, User, $cookieStore) {
        console.log("auth")
        $rootScope.currentUser = $cookieStore.get('user') || null;
        $cookieStore.remove('user');

        return {

            login: function (provider, user, callback) {
                var cb = callback || angular.noop;
                Session.save({
                    userid: user.userid,
                    password: user.password
                }, function (user) {
                    console.log(user);
                    $rootScope.currentUser = user;
                    return cb();
                }, function (err) {
                    return cb(err.data);
                });
            },

            logout: function (callback) {
                var cb = callback || angular.noop;
                Session.delete(function (res) {
                        $rootScope.currentUser = null;
                        return cb();
                    },
                    function (err) {
                        return cb(err.data);
                    });
            },

            currentUser: function () {
                Session.get(function (user) {
                    $rootScope.currentUser = user;
                });
            }
            /*,

            changePassword: function (email, oldPassword, newPassword, callback) {
                var cb = callback || angular.noop;
                User.update({
                    email: email,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }, function (user) {
                    console.log('password changed');
                    return cb();
                }, function (err) {
                    return cb(err.data);
                });
            }*/
        };
    })