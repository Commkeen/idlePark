angular.module('gameApp').controller('buildingListController', buildingListController);
buildingListController.$inject = ['$scope', 'buildingService'];

function buildingListController($scope, buildingService){
    $scope.buildings = buildingService.buildings;

    $scope.onClickBuilding = function(index){
        buildingService.addBuilding(index, 1);
    }
}