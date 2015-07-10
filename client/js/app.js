'use strict';

angular.module('iTrakApp', ['ngRoute', 'ngMaterial'])
    .config(function ($routeProvider, $httpProvider) {

        $httpProvider.interceptors.push('TokenInterceptor');

        $routeProvider
            .when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl',
                access: {
                    requiredLogin: false,
                    adminRequired: false
                }
            }).when('/adminDashboard', {
                templateUrl: 'partials/adminDashboard.html',
                controller: 'adminDashboardCtrl',
                access: {
                    requiredLogin: true,
                    adminRequired: true
                }
            }).when('/dashboard', {
                templateUrl: 'partials/dashboard.html',
                controller: 'dashboardCtrl',
                access: {
                    requiredLogin: true,
                    adminRequired: false
                }
            }).when('/issues', {
                templateUrl: 'partials/issues.html',
                controller: 'issuesCtrl',
                access: {
                    requiredLogin: true,
                    adminRequired: false
                }
            }).otherwise({
                redirectTo: '/login'
            });
    })
    .run(function ($rootScope, $window, $location, AuthenticationFactory) {
        // when the page refreshes, check if the user is already logged in
        AuthenticationFactory.check();

        $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
            if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
                $location.path("/login");
            } else {
                if (nextRoute.access.adminRequired && !AuthenticationFactory.isAdmin) {
                    AuthenticationFactory.isLogged = false;
                    $location.path("/login");
                } else {
                    // check if user object exists else fetch it. This is incase of a page refresh
                    if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
                    if (!AuthenticationFactory.isAdmin) AuthenticationFactory.isAdmin = $window.sessionStorage.isAdmin;
                }
            }
        });

        $rootScope.$on('$routeChangeSuccess', function (event, nextRoute, currentRoute) {
            $rootScope.showMenu = AuthenticationFactory.isLogged;
            // if the user is already logged in, take him to the home page
            if (AuthenticationFactory.isLogged && ($location.path() === '/login' || $location.path() === '/')) {
                if (AuthenticationFactory.isAdmin) {
                    $location.path('/adminDashboard');
                } else {
                    $location.path('/dashboard');
                }
            }
        });
    });