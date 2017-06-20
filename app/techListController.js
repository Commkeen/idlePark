angular.module('gameApp').controller('techListController', techListController);
techListController.$inject = ['$scope', 'techService', 'statService'];

function techListController($scope, techService, statService){
    $scope.techs = techService.techs;

    $scope.isTechVisible = function(index){
        return techService.techs[index].visible && !techService.techs[index].purchased;
    }

    $scope.isTechLocked = function(index){
        return techService.techs[index].visitorRequirement > statService.visitorsTotal;
    }

    $scope.canAffordTech = function(index){
        var cost = techService.techs[index].cost;
        return cost <= statService.money;
    }

    $scope.onClickTech = function(index){
        statService.money -= techService.techs[index].cost;
        techService.purchaseTech(index);
    }
}