angular.module('iTrakApp')
    .factory('IssueService', function ($http, DOMAIN, API) {
        return {
            create: function(projectId, data) {
                var issuesUrl = API.ISSUES.replace(':projectId', projectId);
                return $http.post(DOMAIN + API.ISSUES, data);
            },
            update: function(id, data) {
                return $http.put(DOMAIN + API.USERS + '/' + id, data);
            },
            getMyIssues: function(projectId, userId) {
                var issuesUrl = API.ISSUES.replace(':projectId', projectId);
                return $http.get(DOMAIN + issuesUrl + '/' + userId);
            },
            getAllOpenProjectIssues: function(projectId) {
                var issuesUrl = API.ISSUES.replace(':projectId', projectId);
                return $http.get(DOMAIN + issuesUrl);
            }
        }
    });