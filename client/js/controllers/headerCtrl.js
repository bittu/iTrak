'use strict';

angular.module('iTrakApp')
.controller('headerCtrl', function($scope, $mdSidenav, $log, $mdDialog, Auth) {
        $scope.toggleSidenav = function(navId) {
            $mdSidenav(navId)
                .toggle()
                .then(function() {
                    $log.debug("toggle " + navId + " is done");
                });
        }

        $scope.logout = function(e) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('Please confirm !!!')
                .content('Do you want to logout ???')
                .ok('Yes')
                .cancel('No')
                .targetEvent(e);
            $mdDialog.show(confirm).then(function() {
                Auth.logout();
            }, function() {});
        }
    });
