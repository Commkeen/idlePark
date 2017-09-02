var app = angular.module('gameApp', ['ui.bootstrap']);

angular.module('gameApp').
controller('GameController',
  function($scope, $interval, buildingService, statService, techService) {

    $scope.stats = statService.statModel;

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
    };

    $scope.resetGame = function() {

    };


    $interval(function() {
      $scope.tick();
    }, 1000 / statService.statModel.ticksPerSecond);
    

  });