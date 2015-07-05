'use strict';

angular.module('iTrakApp')
    .controller('MainCtrl', function ($scope, $rootScope) {
    	console.log("main")
        var user = $rootScope.currentUser;
        if(!user) {
        	 $location.path('/login');
        }

        if (user.isAdmin) {
            $location.path('/adminDashboard');
        } else {
            $location.path('/dashboard');
        }
    });