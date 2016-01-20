angular.module('iTrakApp')
    .controller('dashboardCtrl',
        function($scope, Session) {
            console.log($scope + ' - dashboardCtrl');


            $scope.headerText = "User Dashboard";
            $scope.user = Session.user;
            $scope.selectedProject = $scope.user.projects && $scope.user.projects[0] && $scope.user.projects[0]._id;
            $scope.menu = [{
                view: 'dashboard',
                icon: 'dashboard',
                title: 'Dashboard'
            }, {
                view: 'assignedIssues',
                icon: 'bug_report',
                title: 'Assigned Issues'
            }, {
                view: 'openIssues',
                icon: 'bug_report',
                title: 'All Open Issues'
            }];
        }
    )

.controller('myIssuesCtrl',
    function($scope, $log, $mdDialog, IssueService, socket) {

        $scope.project = $scope.$parent.selectedProject;
        $scope.user = $scope.$parent.user._id;
        
        $scope.issues = {};
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

        IssueService.getMyIssues($scope.$parent.selectedProject, $scope.$parent.user._id).success(function(data) {
            $scope.issues = data;
            $log.log(data);
        });
        
        socket.on('new issue', function(data) {
           $log.log(data);
           $scope.issues.push(data.message);
        });

        $scope.openAddDialog = function(e) {
            $mdDialog.show({
                controller: AddIssueDialogController,
                template: angular.element(document.querySelector('#addIssueDialogHTML')).html(),
                parent: angular.element(document.body),
                targetEvent: e,
                locals: {
                    issue: {},
                    project: $scope.project,
                    user: $scope.user,
                    edit: false,
                    socket: socket
                }
            });
        }
        
        $scope.editIssue = function(e) {
            var issue = $scope.selected[0];
            
            $mdDialog.show({
                controller: AddIssueDialogController,
                template: angular.element(document.querySelector('#addIssueDialogHTML')).html(),
                parent: angular.element(document.body),
                targetEvent: e,
                locals: {
                    issue: issue,
                    project: $scope.project,
                    user: $scope.user,
                    edit: false
                }
            });
        }

    })

.controller('openIssuesCtrl',
    function($scope, $log, $mdDialog, IssueService) {
        $scope.project = $scope.$parent.selectedProject;
        $scope.user = $scope.$parent.user._id;
        
        $scope.issues = {};
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

        IssueService.getAllOpenProjectIssues($scope.$parent.selectedProject).success(function(data) {
            $scope.issues = data;
            $log.log(data);
        });

        /*$scope.openAddDialog = function(e) {
            $mdDialog.show({
                controller: AddIssueDialogController,
                template: angular.element(document.querySelector('#addIssueDialogHTML')).html(),
                parent: angular.element(document.body),
                targetEvent: e,
                locals: {
                    issue: {},
                    project: $scope.project,
                    user: $scope.user,
                    edit: false
                }
            });
        }
        
        $scope.editIssue = function(e) {
            var issue = $scope.selected[0];
            
            $mdDialog.show({
                controller: AddIssueDialogController,
                template: angular.element(document.querySelector('#addIssueDialogHTML')).html(),
                parent: angular.element(document.body),
                targetEvent: e,
                locals: {
                    issue: issue,
                    project: $scope.project,
                    user: $scope.user,
                    edit: false
                }
            });
        }*/

    });
    
function AddIssueDialogController($scope, $mdDialog, UserService, IssueService, issue, edit, project, user, socket) {
    $scope.project = project;
    $scope.user = user;
    
    $scope.issue = issue;
    
    $scope.issue.project = project;
    $scope.issue.owner = user;
    
    $scope.statuses = ['OPEN', 'ACCEPTED', 'REJECTED', 'REASSIGNED', 'CLOSED'];
    $scope.priorities = ['LOW', 'MEDIUM', 'HIGH'];

    $scope.closeDialog = function(e) {
        $mdDialog.hide();
    }

    $scope.saveIssue = function(e) {
        console.log($scope.issue);
        if (!edit) {
            IssueService.create($scope.project, {
                issue: $scope.issue
            }).success(createUpdateCallback);
        }
        else {
            IssueService.update($scope.issue._id, {
                project: $scope.issue
            }).success(createUpdateCallback);
        }

    }
    
    $scope.loadUsers = function() {
        UserService.getAllUsersForProject(project).success(function(data) {
            $scope.users = data;
        })
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
        socket.emit('new issue', $scope.issue);
    }

}