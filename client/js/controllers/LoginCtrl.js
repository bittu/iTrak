angular.module('iTrakApp')
    .controller('loginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function ($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {

            $scope.login = function () {

                var userId = $scope.user.userId,
                    password = $scope.user.password;

                if (userId !== undefined && password !== undefined) {
                    UserAuthFactory.login(userId, password).success(function (data) {

                        AuthenticationFactory.isLogged = true;
                        AuthenticationFactory.user = data.user;
                        AuthenticationFactory.isAdmin = data.user.isAdmin;

                        $window.sessionStorage.token = data.token;
                        $window.sessionStorage.user = JSON.stringify(data.user); // to fetch the user details on refresh
                        $window.sessionStorage.isAdmin = data.user.isAdmin; // to fetch the user details on refresh

                        $location.path("/");

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