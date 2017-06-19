angular.module('gameApp').controller('buildingListController', buildingListController);
buildingListController.$inject = ['$scope', 'buildingService', 'statService'];

function buildingListController($scope, buildingService, statService){
    $scope.buildings = buildingService.buildings;

    $scope.canAffordBuilding = function(index){
        var cost = buildingService.buildings[index].nextCost;
        return cost <= statService.money;
    }

    $scope.onClickBuilding = function(index){
        var cost = buildingService.buildings[index].nextCost;
        if (cost <= statService.money)
        {
            statService.money -= cost;
            buildingService.addBuilding(index, 1);
        }
        
    }
}