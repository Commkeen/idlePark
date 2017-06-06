var app = angular.module('gameApp', ['ui.bootstrap']);

angular.module('gameApp').
controller('GameController',
  function($scope, $interval, buildingService, statService) {

    $scope.updateValues = function() {
      $scope.baseVisitorRateCap = statService.baseVisitorRateCap;
    
      $scope.ticksPerSecond = statService.ticksPerSecond;
      $scope.ticksPerGameHour = statService.ticksPerGameHour;
      $scope.ticksTotal = statService.ticksTotal;

      $scope.money = statService.money;
      $scope.visitorsTotal = statService.visitorsTotal;
      $scope.incomePerVisitor = statService.incomePerVisitor;
      $scope.visitorRateCap = statService.visitorRateCap;
      $scope.visitorRate = statService.visitorRate;
    };
    $scope.updateValues();

    $scope.tick = function() {
      statService.ticksTotal = statService.ticksTotal + 1;
      statService.recalculateStats();
      $scope.updateValues();
    };

    $scope.resetGame = function() {

    };


    $interval(function() {
      $scope.tick();
    }, 1000 / statService.ticksPerSecond);
    

  });