angular.module('gameApp').service("statService", statService);
statService.$inject = ['$rootScope', 'buildingService'];

function statService($rootScope, buildingService) {
    var self = this;

    this.statModel = new statModel();


    recalculateVisitors = function(){
      self.statModel.visitorRateCap = self.statModel.baseVisitorRateCap;
      self.statModel.baseVisitorRate = 0;
      for (var i = 0; i < buildingService.buildingCount; i++)
      {
        var b = buildingService.buildings[i];
        self.statModel.visitorRateCap += b.visitorRateCap * b.count;
        self.statModel.baseVisitorRate += b.visitorRate * b.count;
        self.statModel.incomePerVisitor += b.incomePerVisitor * b.count;
      }
      self.statModel.visitorRateAfterCap = self.statModel.baseVisitorRate;
      if (self.statModel.visitorRateAfterCap > self.statModel.visitorRateCap) {self.statModel.visitorRateAfterCap = self.statModel.visitorRateCap;}

      var visitorsThisTick = self.statModel.visitorRateAfterCap / self.statModel.ticksPerGameHour;

      self.statModel.visitorsTotal += visitorsThisTick;
    }

    recalculateMoney = function(){
      self.statModel.incomePerVisitor = 0;
      for (var i = 0; i < buildingService.buildingCount; i++)
      {
        var b = buildingService.buildings[i];
        self.statModel.incomePerVisitor += b.incomePerVisitor * b.count;
      }
      var visitorsThisTick = self.statModel.visitorRateAfterCap / self.statModel.ticksPerGameHour;
      self.statModel.money += visitorsThisTick*self.statModel.incomePerVisitor;
    }

    recalculateTerritory = function(){
      self.statModel.totalTerritory = self.statModel.baseTerritory;
      for (var i = 0; i < buildingService.buildingCount; i++)
      {
        var b = buildingService.buildings[i];
        self.statModel.totalTerritory += b.territoryGain * b.count;
      }
    }

    recalculateInfluence = function(){
      self.statModel.influenceRate = 0;
      for (var i = 0; i < buildingService.buildingCount; i++)
      {
        var b = buildingService.buildings[i];
        self.statModel.influenceRate += b.influenceRate * b.count;
      }
      self.statModel.influence += self.statModel.influenceRate / self.statModel.ticksPerGameHour;
    }


    this.recalculateStats = function(){
      recalculateVisitors();
      recalculateMoney();
      recalculateTerritory();
      recalculateInfluence();

    }
}