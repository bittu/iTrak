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

    .run(function ($rootScope, $window, $location, AuthenticationFactory) {
        // when the page refreshes, check if the user is already logged in
        AuthenticationFactory.check();

        $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
            if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
                $location.path("/login");
            } else {
                console.log(nextRoute)
                // check if user object exists else fetch it. This is incase of a page refresh
                if (!AuthenticationFactory.user) AuthenticationFactory.user = JSON.parse($window.sessionStorage.user);
                if (!AuthenticationFactory.isAdmin) AuthenticationFactory.isAdmin = $window.sessionStorage.isAdmin;
                if (nextRoute.access && nextRoute.access.adminRequired && !AuthenticationFactory.isAdmin) {
                    AuthenticationFactory.isLogged = false;
                    $location.path("/login");
                } else {

                    console.log(AuthenticationFactory)
                    console.log($location.path())
                    console.log($location)
                    console.log($location.url());
                    if (AuthenticationFactory.isLogged && ($location.path() === '/login' || $location.path() === '/')) {
                        console.log(AuthenticationFactory)
                        if (AuthenticationFactory.isAdmin) {
                            $location.path('/' + AuthenticationFactory.user._id + '/adminDashboard');
                        } else {
                            $location.path('/' + AuthenticationFactory.user._id + '/dashboard');
                        }
                    } else {
                        if (AuthenticationFactory.isAdmin && nextRoute.access && !nextRoute.access.adminRequired && $location.path().indexOf('/adminDashboard') === -1) {
                            $location.path('/' + AuthenticationFactory.user._id + '/adminDashboard');
                        }
                    }
                }
            }
        });

         $rootScope.$on('$routeChangeSuccess', function (event, nextRoute, currentRoute) {
            $rootScope.showMenu = AuthenticationFactory.isLogged;
            // if the user is already logged in, take him to the home page
            if (AuthenticationFactory.isLogged && ($location.path() === '/login' || $location.path() === '/')) {
                console.log(AuthenticationFactory)
                if (AuthenticationFactory.isAdmin) {
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

        $stateProvider
            .state('login ', {
                url: '/login ',
                templateUrl: 'partials/login.html ',
                controller: 'loginCtrl '
            })

        .state('adminDashboard ', {
            url: '/:id/adminDashboard ',
            templateUrl: 'partials/adminDashboard.html ',
            views: {
                'sideNav@adminDashboard ': {
                    templateUrl: 'partials / sideNav.html ',
                    controller: 'sideNavCtrl '
                }
            }
        })
            .state('adminDashboard.users ', {
                url: '/:id/usersAdmin ',
                templateUrl: 'partials/usersAdmin.html ',
                controller: 'usersAdminCtrl '
            })
            .state('adminDashboard.projects ', {
                url: '/:id/projectsAdmin ',
                templateUrl: 'partials/projectsAdmin.html ',
                controller: 'projectsAdminCtrl '
            })

        .state('dashboard ', {
            url: '/:id/dashboard ',
            templateUrl: 'partials/dashboard.html ',
            controller: 'dashboardCtrl '
        })
    })

.run(function ($rootScope, $state, AuthenticationFactory) {

    $rootScope.on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    });
})