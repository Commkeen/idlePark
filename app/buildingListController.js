angular.module('gameApp').controller('buildingListController', buildingListController);
buildingListController.$inject = ['$scope', 'buildingService', 'statService'];

function buildingListController($scope, buildingService, statService){
    $scope.buildings = buildingService.buildings;

    $scope.onClickBuilding = function(index){
        var cost = buildingService.buildings[index].nextCost;
        if (cost <= statService.money)
        {
            statService.money -= cost;
            buildingService.addBuilding(index, 1);
        }
        
    }
}