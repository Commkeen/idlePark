angular.module('gameApp').controller('actionListController', actionListController);
actionListController.$inject = ['$scope', 'actionService', 'statService'];

function actionListController($scope, actionService, statService){
    $scope.actions = actionService.actions;

    $scope.isActionVisible = function(index){
        return actionService.actions[index].unlocked;
    }

    $scope.canAffordAction = function(index){
        return actionService.canAffordAction(index);
    }

    $scope.onClickAction = function(index){
        if (!$scope.canAffordAction(index)) {return;}
        actionService.payActionCosts(index);
        actionService.gainActionProfits(index);
    }
}