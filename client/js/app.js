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

angular.module('iTrakApp', ['ngMaterial', 'ngMdIcons', 'ui.router', 'angular-loading-bar', 'ngAnimate', 'md.data.table'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        
        $httpProvider.interceptors.push('TokenInterceptor');
        
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl'
            })

        .state('adminDashboard', {
            url: '/:id/admin',
            views: {
                'sideNav@adminDashboard': {
                    templateUrl: 'partials/sideNav.html',
                    controller: 'sideNavCtrl'
                },
                '': {
                    templateUrl: 'partials/adminDashboard.html',
                    controller: 'adminDashboardCtrl'
                },
                'header@adminDashboard': {
                    templateUrl: 'partials/header.html',
                    controller: 'headerCtrl'
                }
            },
            data: {
                login: true,
                admin: true
            }
        })
            .state('adminDashboard.users', {
                url: '/users',
                templateUrl: 'partials/usersAdmin.html',
                controller: 'usersAdminCtrl',
                data: {
                    login: true,
                    admin: true
                }
            })
            .state('adminDashboard.projects', {
                url: '/projects',
                templateUrl: 'partials/projectsAdmin.html',
                controller: 'projectsAdminCtrl',
                data: {
                    login: true,
                    admin: true
                }
            })
            
        .state('dashboard', {
            url: '/:id/dashboard',
            views: {
                'sideNav@dashboard': {
                    templateUrl: 'partials/sideNav.html',
                    controller: 'sideNavCtrl'
                },
                '': {
                    templateUrl: 'partials/dashboard.html',
                    controller: 'dashboardCtrl'
                },
                'header@dashboard': {
                    templateUrl: 'partials/header.html',
                    controller: 'headerCtrl'
                }
            },
            data: {
                login: true,
                admin: false
            }
        })
            .state('dashboard.assignedIssues', {
                url: '/myIssues',
                templateUrl: 'partials/myIssues.html',
                controller: 'myIssuesCtrl',
                data: {
                    login: true,
                    admin: false
                }
            })
            .state('dashboard.openIssues', {
                url: '/openIssues',
                templateUrl: 'partials/openIssues.html',
                controller: 'openIssuesCtrl',
                data: {
                    login: true,
                    admin: false
                }
            })
    })

.run(function ($rootScope, $state, Session) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        Session.check();
        var data = toState.data;
        console.log(toState.name + ' - ' + JSON.stringify(data))
        console.log(Session);
        if (toState.name === 'login') {
            if (Session.isLogged) {
                if (Session.isAdmin) {
                    event.preventDefault();
                    $state.go('adminDashboard', {
                        id: Session.user._id
                    });
                } else {
                    event.preventDefault();
                    $state.go('dashboard', {
                        id: Session.user._id
                    });
                }
            }
        } else if (Session.isLogged) {
            if (!Session.isAuthorized(data)) {
                if (Session.isAdmin) {
                    event.preventDefault();
                    $state.go('adminDashboard', {
                        id: Session.user._id
                    });
                } else {
                    event.preventDefault();
                    $state.go('dashboard', {
                        id: Session.user._id
                    });
                }
            }
        } else if (toState.url.indexOf('login') === -1) {
            event.preventDefault();
            $state.go('login');
        }

    });
});