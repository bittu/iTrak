'use strict';

angular.module('angularPassportApp')
    .controller('MainCtrl', function ($scope, $rootScope) {
        var user = $rootScope.currentUser;

        if (user.isAdmin) {
            $location.path('/adminDashboard');
        } else {
            $location.path('/dashboard');
        }
    });