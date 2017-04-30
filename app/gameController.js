var app = angular.module('gameApp', ['ui.bootstrap']);

angular.module('gameApp').
controller('GameController',
  function($scope, $interval) {

    
    $scope.ticksPerSecond = 100;
    $scope.ticksTotal = 0;

    $scope.tick = function() {
      $scope.ticksTotal = $scope.ticksTotal + 1;
    };

    $scope.resetGame = function() {

    };


    $interval(function() {
      $scope.tick();
    }, 1000 / $scope.ticksPerSecond);
    

  });