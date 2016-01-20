'use strict';

angular.module('iTrakApp')

.controller('sideNavCtrl',
    function ($scope, Session, $log, $state) {
        console.log('sideNavCtrl')
         
        $scope.changeView = function (view) {
            $log.log(view)
            if(Session.isAdmin) {
                if(view === 'dashboard') {
                    $state.go('adminDashboard', {id: Session.user._id});
                } else {
                    $state.go('adminDashboard.'+view, {id: Session.user._id});
                }
            } else {
                if(view === 'dashboard') {
                    $state.go('dashboard', {id: Session.user._id});
                } else {
                    $state.go('dashboard.'+view, {id: Session.user._id});
                }
            }
        }
    });