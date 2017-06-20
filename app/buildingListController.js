angular.module('gameApp').controller('buildingListController', buildingListController);
buildingListController.$inject = ['$scope', 'buildingService', 'statService'];

function buildingListController($scope, buildingService, statService){
    $scope.buildings = buildingService.buildings;

    $scope.isBuildingVisible = function(index){
        return buildingService.buildings[index].unlocked;
    }

    $scope.canAffordBuilding = function(index){
        var cost = buildingService.buildings[index].nextCost;
        var territoryCost = buildingService.buildings[index].territoryCost;
        var influenceCost = buildingService.buildings[index].nextInfluenceCost;
        return cost <= statService.money && territoryCost+statService.usedTerritory <= statService.totalTerritory && influenceCost <= statService.influence;
    }

    $scope.onClickBuilding = function(index){
        var cost = buildingService.buildings[index].nextCost;
        var territoryCost = buildingService.buildings[index].territoryCost;
        var influenceCost = buildingService.buildings[index].nextInfluenceCost;
        if (cost <= statService.money && territoryCost+statService.usedTerritory <= statService.totalTerritory && influenceCost <= statService.influence)
        {
            statService.money -= cost;
            statService.usedTerritory += territoryCost;
            statService.influence -= influenceCost;
            buildingService.addBuilding(index, 1);
        }
        
    }
}