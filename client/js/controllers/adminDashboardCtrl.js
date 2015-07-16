angular.module('iTrakApp')
    .controller('adminDashboardCtrl',
        function ($scope, AuthenticationFactory, $mdUtil, $mdSidenav, $log) {
            console.log($scope + ' - adminDashboardCtrl');
            $scope.user = AuthenticationFactory.user;
            $scope.menu = [{
                view: 'dashboard',
                title: 'Dashboard',
                icon: 'dashboard'
            }, {
                view: 'users',
                title: 'Users',
                icon: 'user'
            }, {
                view: 'projects',
                title: 'Projects',
                icon: 'project'
            }];

            $scope.toggleSidenav = function (navId) {
                $mdSidenav(navId)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navId + " is done");
                    });
            }
            $scope.changeView = function (view) {
                $log.log(view)
            }

        });