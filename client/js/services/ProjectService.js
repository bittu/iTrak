angular.module('iTrakApp')
    .factory('ProjectService', function ($http, DOMAIN, API) {
        return {
            getAll: function() {
                return $http.get(DOMAIN + API.PROJECTS);
            },
            getOne: function(id) {
                return $http.get(DOMAIN + API.PROJECTS + '/' + id);
            },
            create: function(data) {
                return $http.post(DOMAIN + API.PROJECTS, data);
            },
            update: function(id, data) {
                return $http.put(DOMAIN + API.PROJECTS + '/' + id, data);
            },
            delete: function(id) {
                return $http.delete(DOMAIN + API.PROJECTS + '/' + id);
            }
        }
    });