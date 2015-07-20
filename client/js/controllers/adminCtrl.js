'use strict';

angular.module('iTrakApp')

.controller('adminDashboardCtrl',
    function ($scope, Auth, $mdUtil, $mdSidenav, $log, $location, $rootScope) {
        console.log($scope + ' - adminDashboardCtrl');

        $scope.headerText = "Admin Dashboard";

        $scope.toggleSidenav = function (navId) {
            $mdSidenav(navId)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navId + " is done");
                });
        }
        $scope.changeView = function (view) {
            $log.log(view)
            $location.path('/' + Auth.user._id + '/' + view);
        }

    })

.controller('usersAdminCtrl',
    function ($scope, Auth, $mdUtil, $mdSidenav, $log, $location) {



    });