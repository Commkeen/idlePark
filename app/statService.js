angular.module('gameApp').service("statService", statService);
statService.$inject = ['$rootScope', 'buildingService'];

function statService($rootScope, buildingService) {
    var self = this;

    this.baseVisitorRateCap = 5;
    
    this.ticksPerSecond = 100;
    this.ticksPerGameHour = 500;
    this.ticksTotal = 0;

    this.money = 500;
    this.visitorsTotal = 0;
    this.incomePerVisitor = 0;
    this.visitorRateCap = 0;
    this.visitorRate = 0;

    this.recalculateStats = function(){
      this.incomePerVisitor = 0;
      this.visitorRateCap = this.baseVisitorRateCap;
      this.visitorRate = 0;
      for (var i = 0; i < buildingService.buildingCount; i++)
      {
        var b = buildingService.buildings[i];
        this.visitorRateCap += b.visitorRateCap * b.count;
        this.visitorRate += b.visitorRate * b.count;
        this.incomePerVisitor += b.incomePerVisitor * b.count;
      }
      if (this.visitorRate > this.visitorRateCap) {this.visitorRate = this.visitorRateCap;}

      var visitorsThisTick = this.visitorRate / this.ticksPerGameHour;
      this.visitorsTotal += visitorsThisTick;
      this.money += visitorsThisTick*this.incomePerVisitor;

    }
}