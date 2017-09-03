angular.module('gameApp').controller('actionListController', actionListController);
actionListController.$inject = ['$scope', 'actionService', 'statService'];

function actionListController($scope, actionService, statService){
    $scope.actions = actionService.actions;

    $scope.isActionVisible = function(index){
        return actionService.actions[index].unlocked;
    }

    $scope.canAffordAction = function(index){
        
    }

    $scope.onClickAction = function(index){

    }
}