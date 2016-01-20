'use strict';

angular.module('iTrakApp')

.controller('adminDashboardCtrl',
    function($scope, Session, $mdUtil, $mdSidenav, $log, $location, $rootScope) {
        console.log($scope + ' - adminDashboardCtrl');

        $scope.headerText = "Admin Dashboard";
        $scope.user = Session.user;
        $scope.menu = [{
            view: 'dashboard',
            icon: 'dashboard',
            title: 'Dashboard'
        }, {
            view: 'users',
            icon: 'people',
            title: 'Users'
        }, {
            view: 'projects',
            icon: 'folder',
            title: 'Projects'
        }];

    })

.controller('usersAdminCtrl',
        function($scope, $log, UserService, $mdDialog) {

            $scope.users = {};
            $scope.selected = [];

            $scope.filter = {
                options: {
                    debounce: 500
                }
            };

            $scope.query = {
                filter: '',
                limit: '5',
                order: 'nameToLower',
                page: 1
            };

            $scope.removeFilter = function() {
                $scope.filter.show = false;
                $scope.query.filter = '';

                if ($scope.filter.form.$dirty) {
                    $scope.filter.form.$setPristine();
                }
            };


            UserService.getAll().success(function(data) {
                $scope.users = data;
                $log.log(data);
            });

            $scope.openAddDialog = function(e) {
                $mdDialog.show({
                    controller: AddUserDialogController,
                    template: angular.element(document.querySelector('#addUserDialogHTML')).html(),
                    parent: angular.element(document.body),
                    targetEvent: e,
                    locals: {
                        user: {},
                        edit: false
                    }
                });
            }
            
            $scope.editUser = function(e) {
                
                var user = $scope.selected[0];
                user.dob = new Date(user.dob);
                $mdDialog.show({
                    controller: AddUserDialogController,
                    template: angular.element(document.querySelector('#addUserDialogHTML')).html(),
                    parent: angular.element(document.body),
                    targetEvent: e,
                    locals: {
                        user: user,
                        edit: true
                    }
                });
            }

        })
    .controller('projectsAdminCtrl',
        function($scope, $log, ProjectService, $mdDialog) {

            $scope.projects = [];

            $scope.selected = [];

            $scope.filter = {
                options: {
                    debounce: 500
                }
            };

            $scope.query = {
                filter: '',
                limit: '5',
                order: 'nameToLower',
                page: 1
            };

            $scope.removeFilter = function() {
                $scope.filter.show = false;
                $scope.query.filter = '';

                if ($scope.filter.form.$dirty) {
                    $scope.filter.form.$setPristine();
                }
            };

            ProjectService.getAll().success(function(data) {
                $scope.projects = data;
                $log.log(data);
            });

            $scope.openAddDialog = function(e) {
                
                $mdDialog.show({
                    controller: AddProjectDialogController,
                    template: angular.element(document.querySelector('#addProjectDialogHTML')).html(),
                    parent: angular.element(document.body),
                    targetEvent: e,
                    locals: {
                        project: {},
                        edit: false
                    }
                });
            }
            
            $scope.editProject = function(e) {
                var project = $scope.selected[0];
                
                $mdDialog.show({
                    controller: AddProjectDialogController,
                    template: angular.element(document.querySelector('#addProjectDialogHTML')).html(),
                    parent: angular.element(document.body),
                    targetEvent: e,
                    locals: {
                        project: project,
                        edit: true
                    }
                });
            }
            
            $scope.deleteProject = function(e) {
                var project = $scope.selected[0];
                
                var confirm = $mdDialog.confirm()
                    .parent(angular.element(document.body))
                    .title('Please confirm !!!')
                    .content('Do you want to delete Project ' + project.projectName + '???')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(e);
                $mdDialog.show(confirm).then(function() {
                    ProjectService.delete(project._id).success(createUpdateCallback)
                }, function() {});
            }
            
            function createUpdateCallback(data) {
            console.log(arguments)
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .clickOutsideToClose(true)
                    .title('Message')
                    .content(data)
                    .ariaLabel('Response Message')
                    .ok('Ok')
                );
            }

        });
    
function AddUserDialogController($scope, $mdDialog, UserService, ProjectService, user, edit) {
    $scope.user = user;
    
    $scope.closeDialog = function(e) {
        $mdDialog.hide();
    }

    $scope.saveUser = function(e) {
        console.log($scope.user)
        if(!edit) {
            UserService.create({user: $scope.user}).success(createUpdateCallback);
        } else {
            UserService.update(user._id, {user: $scope.user}).success(createUpdateCallback);
        }
    }

    $scope.loadProjects = function(e) {
        ProjectService.getAll().success(function(data) {
            $scope.projects = data;
        });
    }
    
    function createUpdateCallback(data) {
    console.log(arguments)
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Message')
            .content(data)
            .ariaLabel('Response Message')
            .ok('Ok')
        );
    }
    
    
}

function AddProjectDialogController($scope, $mdDialog, ProjectService, project, edit) {
    $scope.project = project;

    $scope.closeDialog = function(e) {
        $mdDialog.hide();
    }

    $scope.saveProject = function(e) {
        console.log($scope.project);
        if (!edit) {
            ProjectService.create({
                project: $scope.project
            }).success(createUpdateCallback);
        }
        else {
            ProjectService.update($scope.project._id, {
                project: $scope.project
            }).success(createUpdateCallback);
        }

    }
    
    function createUpdateCallback(data) {
    console.log(arguments)
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Message')
            .content(data)
            .ariaLabel('Response Message')
            .ok('Ok')
        );
    }

}

