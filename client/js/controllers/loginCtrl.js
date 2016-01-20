angular.module('iTrakApp')
    .controller('loginCtrl', ['$scope', '$window', '$state', 'Auth', 'Session',
  function ($scope, $window, $state, Auth, Session) {

            console.log('loginCtrl')
            $scope.login = function () {

                var userId = $scope.user.userId,
                    password = $scope.user.password;

                if (userId !== undefined && password !== undefined) {
                    Auth.login(userId, password).success(function (data) {

                        Session.create(data)

                        $window.sessionStorage.token = data.token;
                        $window.sessionStorage.user = JSON.stringify(data.user); // to fetch the user details on refresh
                        $window.sessionStorage.isAdmin = data.user.isAdmin; // to fetch the user details on refresh

                        $state.go($state.current, {}, {reload: true}); 

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