var app = angular.module('gameApp', ['ui.bootstrap']);

angular.module('gameApp').
controller('GameController',
  function($scope, $interval, buildingService, statService, techService) {

    

    $scope.updateValues = function() {
      $scope.baseVisitorRateCap = statService.statModel.baseVisitorRateCap;
    
      $scope.ticksPerSecond = statService.statModel.ticksPerSecond;
      $scope.ticksPerGameHour = statService.statModel.ticksPerGameHour;
      $scope.ticksTotal = statService.statModel.ticksTotal;

      $scope.money = statService.statModel.money;
      $scope.visitorsTotal = statService.statModel.visitorsTotal;
      $scope.incomePerVisitor = statService.statModel.incomePerVisitor;
      $scope.visitorRateCap = statService.statModel.visitorRateCap;
      $scope.baseVisitorRate = statService.statModel.baseVisitorRate;
      $scope.totalTerritory = statService.statModel.totalTerritory;
      $scope.usedTerritory = statService.statModel.usedTerritory;
      $scope.influence = statService.statModel.influence;
      $scope.influenceRate = statService.statModel.influenceRate;
    };
    $scope.updateValues();

    $scope.getDateTime = function() {
      let currentDateInMs = statService.statModel.startDate.valueOf();
      let hoursToAdd = statService.statModel.ticksTotal / statService.statModel.ticksPerGameHour;
      let msToAdd = hoursToAdd * 60 * 60 * 1000;
      let dateString = new Date(currentDateInMs + msToAdd).toLocaleString();
      let amPmString = dateString.slice(-3,dateString.length);
      return dateString.slice(0, dateString.length - 9) + amPmString;
    }

    $scope.tick = function() {
      statService.statModel.ticksTotal = statService.statModel.ticksTotal + 1;
      statService.recalculateStats();
      $scope.updateValues();
    };

    $scope.resetGame = function() {

    };


    $interval(function() {
      $scope.tick();
    }, 1000 / statService.statModel.ticksPerSecond);
    

  });