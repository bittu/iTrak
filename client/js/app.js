'use strict';
/*
angular.module('iTrakApp', ['ngRoute', 'ngMaterial', 'ngMdIcons'])
    .config(function ($routeProvider, $httpProvider) {

        $httpProvider.interceptors.push('TokenInterceptor');

        $routeProvider
            .when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl',
                access: {
                    requiredLogin: false,
                    adminRequired: false
                }
            }).when('/:id/adminDashboard', {
                templateUrl: 'partials/adminDashboard.html',
                controller: 'adminDashboardCtrl',
                access: {
                    requiredLogin: true,
                    adminRequired: true
                }
            }).when('/:id/usersAdmin', {
                templateUrl: 'partials/usersAdmin.html',
                controller: 'usersAdminCtrl',
                access: {
                    requiredLogin: true,
                    adminRequired: true
                }
            }).when('/:id/projectsAdmin', {
                templateUrl: 'partials/projectsAdmin.html',
                controller: 'projectsAdminCtrl',
                access: {
                    requiredLogin: true,
                    adminRequired: true
                }
            }).when('/:id/dashboard', {
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

    .run(function ($rootScope, $window, $location, Auth) {
        // when the page refreshes, check if the user is already logged in
        Auth.check();

        $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
            if ((nextRoute.access && nextRoute.access.requiredLogin) && !Auth.isLogged) {
                $location.path("/login");
            } else {
                console.log(nextRoute)
                // check if user object exists else fetch it. This is incase of a page refresh
                if (!Auth.user) Auth.user = JSON.parse($window.sessionStorage.user);
                if (!Auth.isAdmin) Auth.isAdmin = $window.sessionStorage.isAdmin;
                if (nextRoute.access && nextRoute.access.adminRequired && !Auth.isAdmin) {
                    Auth.isLogged = false;
                    $location.path("/login");
                } else {

                    console.log(Auth)
                    console.log($location.path())
                    console.log($location)
                    console.log($location.url());
                    if (Auth.isLogged && ($location.path() === '/login' || $location.path() === '/')) {
                        console.log(Auth)
                        if (Auth.isAdmin) {
                            $location.path('/' + Auth.user._id + '/adminDashboard');
                        } else {
                            $location.path('/' + Auth.user._id + '/dashboard');
                        }
                    } else {
                        if (Auth.isAdmin && nextRoute.access && !nextRoute.access.adminRequired && $location.path().indexOf('/adminDashboard') === -1) {
                            $location.path('/' + Auth.user._id + '/adminDashboard');
                        }
                    }
                }
            }
        });

         $rootScope.$on('$routeChangeSuccess', function (event, nextRoute, currentRoute) {
            $rootScope.showMenu = Auth.isLogged;
            // if the user is already logged in, take him to the home page
            if (Auth.isLogged && ($location.path() === '/login' || $location.path() === '/')) {
                console.log(Auth)
                if (Auth.isAdmin) {
                    $location.path('/adminDashboard');
                } else {
                    $location.path('/dashboard');
                }
            }
        });
}); */

angular.module('iTrakApp', ['ngRoute', 'ngMaterial', 'ngMdIcons', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/login');

        var authenticated = ['$q', 'Auth',
            function ($q, Auth) {
                var deferred = $q.defer();
                Auth.isLoggedIn(false)
                    .then(function (isLoggedIn) {
                        if (isLoggedIn) {
                            deferred.resolve();
                        } else {
                            deferred.reject('Not logged in');
                        }
                    });
                return deferred.promise;
        }];

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl'
            })

        .state('adminDashboard', {
            url: '/:id/adminDashboard',
            templateUrl: 'partials/adminDashboard.html',
            views: {
                'sideNav@adminDashboard': {
                    templateUrl: 'partials/sideNav.html',
                    controller: 'sideNavCtrl '
                }
            }
        })
            .state('adminDashboard.users', {
                url: '/:id/usersAdmin',
                templateUrl: 'partials/usersAdmin.html',
                controller: 'usersAdminCtrl'
            })
            .state('adminDashboard.projects', {
                url: '/:id/projectsAdmin',
                templateUrl: 'partials/projectsAdmin.html',
                controller: 'projectsAdminCtrl'
            })

        .state('dashboard', {
            url: '/:id/dashboard',
            templateUrl: 'partials/dashboard.html',
            controller: 'dashboardCtrl'
        })
    })

.run(function ($rootScope, $state, Auth) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (Auth.isLoggedIn()) {
            if (toState.access && toState.access.adminRequired && !Auth.user.isAdmin) {
                $state.go('dashboard');
            }
        } else {
            $state.go('login');
        }
    });
});