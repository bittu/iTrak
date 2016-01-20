angular.module('iTrakApp')
    .factory('UserService', function ($http, DOMAIN, API) {
        return {
            getAll: function() {
                return $http.get(DOMAIN + API.USERS);
            },
            getOne: function(id) {
                return $http.get(DOMAIN + API.USERS + '/' + id);
            },
            create: function(data) {
                return $http.post(DOMAIN + API.USERS, data);
            },
            update: function(id, data) {
                return $http.put(DOMAIN + API.USERS + '/' + id, data);
            },
            delete: function(id) {
                return $http.delete(DOMAIN + API.USERS + '/' + id);
            },
            resetPassword: function(id) {
                return $http.put(DOMAIN + API.USER_PWD_RESET + '/' + id);
            },
            getAllUsersForProject: function(projectId) {
                var projectUsersUrl = API.PROJECT_USERS.replace(':projectId', projectId);
                return $http.get(DOMAIN + projectUsersUrl);
            }
        }
    });