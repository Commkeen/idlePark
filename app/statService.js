angular.module('gameApp').service("statService", statService);
statService.$inject = ['$rootScope', 'buildingService'];

function statService($rootScope, buildingService) {
    var self = this;

    this.statModel = new statModel();

    recalculateVisitors = function(){
      var statModel = self.statModel;
      
      // Set current park capacity and raw visitor rate
      statModel.rawVisitorRate = statModel.baseVisitorRate;
      statModel.parkCapacity = statModel.baseParkCapacity;

      //TODO: Adjust for overcrowding

      statModel.adjustedVisitorRate = statModel.rawVisitorRate;

      var visitorsThisTick = statModel.adjustedVisitorRate / statModel.ticksPerGameHour;
      var cap = statModel.parkCapacity - statModel.idleVisitors;
      if (visitorsThisTick > cap) {visitorsThisTick = cap;}

      statModel.idleVisitors += visitorsThisTick;
      statModel.lifetimeVisitors += visitorsThisTick;
    }

    recalculateBuildingCostAndProfit = function(){
      var statModel = self.statModel;
      buildingService.buildings.forEach(function(b) {
        var efficiency = 1;
        var cost = b.operatingCost.values().next().value;
        var costResource = b.operatingCost.keys().next().value;
        if (cost*b.count/statModel.ticksPerGameHour > statModel[costResource]) {efficiency = 0;} //TODO: Proper scaling on insufficient inputs
        else {statModel[costResource] -= cost*b.count/statModel.ticksPerGameHour;}
        
        var profit = b.operatingProfit.values().next().value;
        var profitResource = b.operatingProfit.keys().next().value;
        statModel[profitResource] += profit*b.count*efficiency/statModel.ticksPerGameHour;

      });
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
    }


    this.recalculateStats = function(){
      recalculateVisitors();
      recalculateBuildingCostAndProfit();
      recalculateTerritory();

    }
}