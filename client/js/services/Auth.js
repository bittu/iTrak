angular.module('iTrakApp')
    .factory('Auth', function ($http, Session, DOMAIN, API) {
        return {
            login: function (userId, password) {
                return $http.post(DOMAIN + API.LOGIN, {
                    userId: userId,
                    password: password
                });
            },
            logout: function () {

                if (Session.isLogged) {

                    $http.post(DOMAIN + API.LOGOUT);

                    Session.destroy();
                    $location.path("/login");
                }

            }
        }
    })
    .factory('Session', function ($window) {
        return {
            isAuthorized: function (data) {
                if (data.admin && this.isAdmin) return true;
                if (!data.admin && !this.isAdmin) return true;
                return false;
            },
            check: function () {
                if ($window.sessionStorage.token) {
                    this.user = JSON.parse($window.sessionStorage.user);
                    this.isAdmin = $window.sessionStorage.isAdmin;
                    this.isLogged = true;
                }
            },
            create: function (data) {
                this.user = data.user;
                this.isLogged = true;
                this.isAdmin = data.user.isAdmin;

                $window.sessionStorage.token = data.token;
                $window.sessionStorage.user = JSON.stringify(data.user);
                $window.sessionStorage.isAdmin = data.user.isAdmin;

            },

            destroy: function () {
                this.isLogged = false;

                delete this.user;
                delete this.isAdmin;

                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                delete $window.sessionStorage.isAdmin;
            }
        }
    })
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
            },

            responseError: function (response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    });