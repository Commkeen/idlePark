angular.module('gameApp').service("statService", statService);
statService.$inject = ['$rootScope', 'buildingService'];

function statService($rootScope, buildingService) {
    var self = this;

    this.baseVisitorRateCap = 5;
    
    this.ticksPerSecond = 100;
    this.ticksPerGameHour = 500;
    this.startDate = new Date(1950, 5, 13, 8);

    this.ticksTotal = 0;

    this.money = 500;
    this.visitorsTotal = 0;
    this.incomePerVisitor = 0;
    this.visitorRateCap = 0;
    this.visitorRate = 0;

    this.baseTerritory = 150;
    this.totalTerritory = 0;
    this.usedTerritory = 0;
    this.influence = 0;
    this.influenceRate = 0;


    recalculateVisitors = function(){
      self.visitorRateCap = self.baseVisitorRateCap;
      self.visitorRate = 0;
      for (var i = 0; i < buildingService.buildingCount; i++)
      {
        var b = buildingService.buildings[i];
        self.visitorRateCap += b.visitorRateCap * b.count;
        self.visitorRate += b.visitorRate * b.count;
        self.incomePerVisitor += b.incomePerVisitor * b.count;
      }
      if (self.visitorRate > self.visitorRateCap) {self.visitorRate = self.visitorRateCap;}

      var visitorsThisTick = self.visitorRate / self.ticksPerGameHour;

      self.visitorsTotal += visitorsThisTick;
    }

    recalculateMoney = function(){
      self.incomePerVisitor = 0;
      for (var i = 0; i < buildingService.buildingCount; i++)
      {
        var b = buildingService.buildings[i];
        self.incomePerVisitor += b.incomePerVisitor * b.count;
      }
      var visitorsThisTick = self.visitorRate / self.ticksPerGameHour;
      self.money += visitorsThisTick*self.incomePerVisitor;
    }

    recalculateTerritory = function(){
      self.totalTerritory = self.baseTerritory;
      for (var i = 0; i < buildingService.buildingCount; i++)
      {
        var b = buildingService.buildings[i];
        self.totalTerritory += b.territoryGain * b.count;
      }
    }

    recalculateInfluence = function(){
      self.influenceRate = 0;
      for (var i = 0; i < buildingService.buildingCount; i++)
      {
        var b = buildingService.buildings[i];
        self.influenceRate += b.influenceRate * b.count;
      }
      self.influence += self.influenceRate / self.ticksPerGameHour;
    }


    this.recalculateStats = function(){
      recalculateVisitors();
      recalculateMoney();
      recalculateTerritory();
      recalculateInfluence();

    }
}