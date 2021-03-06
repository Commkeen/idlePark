angular.module('gameApp').service("statService", statService);
statService.$inject = ['$rootScope', 'buildingService'];

function statService($rootScope, buildingService) {
    var self = this;

    this.statModel = new statModel();
    this.workerModel = new workerModel();

    recalculateVisitors = function(){
      var statModel = self.statModel;
      
      // Set current park capacity and raw visitor rate
      statModel.rawVisitorRate = statModel.baseVisitorRate;
      statModel.parkCapacity = statModel.baseParkCapacity;

      //TODO: Adjust for overcrowding

      statModel.adjustedVisitorRate = statModel.rawVisitorRate;

      //TODO: Nighttime logic
      if (self.statModel.nighttime)
      {
        statModel.adjustedVisitorRate = 0;
      }

      var visitorsThisTick = statModel.adjustedVisitorRate / statModel.ticksPerGameHour;

      statModel.idleVisitors += visitorsThisTick;
      statModel.lifetimeVisitors += visitorsThisTick;
      statModel.idleVisitorsRate = statModel.adjustedVisitorRate;
    }

    recalculateBuildingCostAndProfit = function(){
      var statModel = self.statModel;

      statModel.moneyRate = 0;
      statModel.happinessRate = 0;
      statModel.influenceRate = 0;
      statModel.rideCapacity = 0;

      buildingService.buildings.forEach(function(b) {
        var efficiency = 1;
        var cost = b.operatingCost.values().next().value;
        var costResource = b.operatingCost.keys().next().value;
        if (cost*b.count/statModel.ticksPerGameHour > statModel[costResource]){
          efficiency = statModel[costResource] / (cost*b.count/statModel.ticksPerGameHour);
        }
        statModel[costResource] -= Math.min(cost*b.count*efficiency/statModel.ticksPerGameHour, statModel[costResource]);
        statModel[costResource + 'Rate'] -= cost*b.count*efficiency;
        statModel[costResource + 'Rate'] = Math.round(statModel[costResource + 'Rate']*100)/100;
        var profit = b.operatingProfit.values().next().value;
        var profitResource = b.operatingProfit.keys().next().value;
        statModel[profitResource] += profit*b.count*efficiency/statModel.ticksPerGameHour;
        statModel[profitResource + 'Rate'] += profit*b.count*efficiency;
        statModel[profitResource + 'Rate'] = Math.round(statModel[profitResource + 'Rate']*100)/100;

        if (costResource == 'idleVisitors')
        {
          statModel.rideCapacity += cost*b.count;
        }
      });
    }

    recalculateWorkerProfit = function(){
      var statModel = self.statModel;
      var workerModel = self.workerModel;

      workerModel.jobs.forEach(function(j) {
        var profit = j.profit.values().next().value;
        var profitResource = j.profit.keys().next().value;
        statModel[profitResource] += profit*j.workerCount/statModel.ticksPerGameHour;
        statModel[profitResource + 'Rate'] += profit*j.workerCount;
        statModel[profitResource + 'Rate'] = Math.round(statModel[profitResource + 'Rate']*100)/100;

        var profitPerIdleVisitor = j.profitPerIdleVisitor.values().next().value;
        var profitPerIdleVisitorResource = j.profitPerIdleVisitor.keys().next().value;
        statModel[profitPerIdleVisitorResource] += profitPerIdleVisitor*j.workerCount*Math.floor(statModel.idleVisitors)/statModel.ticksPerGameHour;
        statModel[profitPerIdleVisitorResource + 'Rate'] += profitPerIdleVisitor*j.workerCount*Math.floor(statModel.idleVisitors);
        statModel[profitPerIdleVisitorResource + 'Rate'] = Math.round(statModel[profitPerIdleVisitorResource + 'Rate']*100)/100;
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

    calculateTimeOfDay = function(){
      let currentDateInMs = self.statModel.startDate.valueOf();
      let hoursToAdd = self.statModel.ticksTotal / self.statModel.ticksPerGameHour;
      let msToAdd = hoursToAdd * 60 * 60 * 1000;
      let date = new Date(currentDateInMs + msToAdd);
      self.statModel.nighttime = (date.getHours() < 7 || date.getHours() > 19);
    }


    this.recalculateStats = function(){
      calculateTimeOfDay();
      recalculateVisitors();
      recalculateBuildingCostAndProfit();
      recalculateWorkerProfit();
      recalculateTerritory();

    }
}