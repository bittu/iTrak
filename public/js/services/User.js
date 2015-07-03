'use strict';

angular.module('iTrakApp')
    .factory('User', function ($resource) {
        return $resource('/auth/users/:id/', {}, {
            'update': {
                method: 'PUT'
            }
        });
    });