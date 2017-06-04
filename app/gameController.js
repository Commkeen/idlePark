var app = angular.module('gameApp', ['ui.bootstrap']);

angular.module('gameApp').
controller('GameController',
  function($scope, $interval, buildingService) {

    $scope.baseVisitorRateCap = 5;
    
    $scope.ticksPerSecond = 100;
    $scope.ticksPerGameHour = 500;
    $scope.ticksTotal = 0;

    $scope.money = 500;
    $scope.visitorsTotal = 0;
    $scope.incomePerVisitor = 0;
    $scope.visitorRateCap = 0;
    $scope.visitorRate = 0;

    recalculateStats = function(){
      $scope.incomePerVisitor = 0;
      $scope.visitorRateCap = 0;
      $scope.visitorRate = 0;
      for (var i = 0; i < buildingService.buildingCount; i++)
      {
        var b = buildingService.buildings[i];
        $scope.visitorRateCap += b.visitorRateCap * b.count;
        $scope.visitorRate += b.visitorRate * b.count;
        $scope.incomePerVisitor += b.incomePerVisitor * b.count;
      }
      if ($scope.visitorRate > $scope.visitorRateCap) {$scope.visitorRate = $scope.visitorRateCap;}

      var visitorsThisTick = $scope.visitorRate / $scope.ticksPerGameHour;
      $scope.visitorsTotal += visitorsThisTick;
      $scope.money += visitorsThisTick*$scope.incomePerVisitor;

    }

    $scope.tick = function() {
      $scope.ticksTotal = $scope.ticksTotal + 1;
      recalculateStats();
    };

    $scope.resetGame = function() {

    };


    $interval(function() {
      $scope.tick();
    }, 1000 / $scope.ticksPerSecond);
    

  });