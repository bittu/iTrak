'use strict';

angular.module('iTrakApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ngMaterial'
])

.config(function ($routeProvider, $locationProvider) {
    console.log("config")
    $routeProvider
        .when('/', {
            templateUrl: '/views/main.html',
            controller: 'MainCtrl'
        })
        .when('/login', {
            templateUrl: '/views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/adminDashboard', {
            templateUrl: '/views/adminDashboard.html',
            controller: 'AdminDashboardCtrl'
        })
        .when('/adminDashboard/users', {
            templateUrl: 'views/users.html',
            controller: 'AdminDashboardCtrl'
        })
        .when('/adminDashboard/projects', {
            templateUrl: 'views/projects.html',
            controller: 'AdminDashboardCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        })
    /*
        .when('/blogs/:blogId', {
            templateUrl: 'partials/blogs/view.html',
            controller: 'BlogsCtrl'
        })*/
    .otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
})
    .run(function ($rootScope, $location, Auth) {
        console.log("klsdhfsdjfh11111")
        //watching the value of the currentUser variable.
        $rootScope.$watch('currentUser', function (currentUser) {
            // if no currentUser and on a page that requires authorization then try to update it
            // will trigger 401s if user does not have a valid session
            if (!currentUser && (['/', '/login'].indexOf($location.path()) == -1)) {
                console.log(Auth)
                Auth.currentUser();
            }
        });

        // On catching 401 errors, redirect to the login page.
        $rootScope.$on('event:auth-loginRequired', function () {
            $location.path('/login');
            return false;
        });
    });