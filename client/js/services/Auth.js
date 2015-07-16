angular.module('iTrakApp')
    .factory('AuthenticationFactory', function ($window) {
        var auth = {
            isLogged: false,
            isAdmin: false,
            check: function () {
                if ($window.sessionStorage.token && $window.sessionStorage.user && $window.sessionStorage.isAdmin) {
                    this.isLogged = true;
                } else {
                    this.isLogged = false;
                    delete this.user;
                }
            }
        }

        return auth;
    })
    .factory('UserAuthFactory', ['DOMAIN', 'API', '$window', '$location', '$http', 'AuthenticationFactory',
        function (DOMAIN, API, $window, $location, $http, AuthenticationFactory) {
            return {
                login: function (userId, password) {
                    return $http.post(DOMAIN + API.LOGIN, {
                        userId: userId,
                        password: password
                    });
                },
                logout: function () {

                    if (AuthenticationFactory.isLogged) {

                        $http.post(DOMAIN + API.LOGOUT);

                        AuthenticationFactory.isLogged = false;
                        delete AuthenticationFactory.user;
                        delete AuthenticationFactory.isAdmin;

                        delete $window.sessionStorage.token;
                        delete $window.sessionStorage.user;
                        delete $window.sessionStorage.isAdmin;

                        $location.path("/login");
                    }

                }
            }
    }])
    .factory('TokenInterceptor', function ($q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers['authorization'] = $window.sessionStorage.token;
                    config.headers['X-Key'] = $window.sessionStorage.user;
                    config.headers['Content-Type'] = "application/json";
                }
                return config || $q.when(config);
            },

            response: function (response) {
                return response || $q.when(response);
            }
        };
    });