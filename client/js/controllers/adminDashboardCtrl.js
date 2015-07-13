angular.module('iTrakApp')
    .controller('adminDashboardCtrl', ['$scope', 'AuthenticationFactory',
        function ($scope, AuthenticationFactory) {
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

        }]);