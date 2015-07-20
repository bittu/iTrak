angular.module('iTrakApp')
    .controller('loginCtrl', ['$scope', '$window', '$state', 'UserAuthFactory', 'Auth',
  function ($scope, $window, $state, UserAuthFactory, Auth) {

            console.log('loginCtrl')
            $scope.login = function () {

                var userId = $scope.user.userId,
                    password = $scope.user.password;

                if (userId !== undefined && password !== undefined) {
                    UserAuthFactory.login(userId, password).success(function (data) {

                        Auth.isLogged = true;
                        Auth.user = data.user;
                        Auth.isAdmin = data.user.isAdmin;

                        $window.sessionStorage.token = data.token;
                        $window.sessionStorage.user = JSON.stringify(data.user); // to fetch the user details on refresh
                        $window.sessionStorage.isAdmin = data.user.isAdmin; // to fetch the user details on refresh

                        $state.go('/');

                    }).error(function (status) {
                        alert('Oops something went wrong!');
                        console.log(status)
                    });
                } else {
                    alert('Invalid credentials');
                }

            };

  }
]);