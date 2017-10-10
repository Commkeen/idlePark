angular.module('gameApp').controller('workerListController', workerListController);
workerListController.$inject = ['$scope', 'workerService', 'statService'];

function workerListController($scope, workerService, statService){
    $scope.workerModel = statService.workerModel;

    $scope.isJobVisible = function(index){
        return $scope.workerModel.jobs[index].unlocked;
    }

    $scope.assignWorker = function(index){
        workerService.assignWorker(index);
    }

    $scope.freeWorker = function(index){
        workerService.freeWorker(index);
    }
}