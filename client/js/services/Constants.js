angular.module('iTrakApp')
    .constant('DOMAIN', window.location.protocol+'//'+window.location.host+':'+window.location.port)
    .constant('API', {
        'LOGIN': '/login',
        'LOGOUT': '/logout',
        'USERS': '/api/admin/users',
        'USER_PWD_RESET': '/api/admin/users/pwd',
        'PROJECTS': '/api/admin/projects',
        'ISSUES': '/api/project/:projectId/issues',
        'PROJECT_USERS': '/api/project/:projectId/users'
    });