'use strict';

angular.module('iTrakApp')
    .factory('Session', function ($resource) {
        return $resource('/auth/session/');
    });