function building(name, baseCost, costMultiplier, income, visitCap, visitRate) {
    this.name = name;
    this.description = "blank";
    this.baseCost = baseCost;
    this.nextCost = baseCost;
    this.costMultiplier = costMultiplier;
    this.incomePerVisitor = income;
    this.visitorRateCap = visitCap;
    this.visitorRate = visitRate;

    this.index = 0;
    this.count = 0;
}

angular.module('gameApp').service("buildingService", buildingService);
buildingService.$inject = ['$rootScope'];

function buildingService($rootScope) {
    var self = this;

    this.buildings = [];
    this.buildingCount = 0;

    registerBuilding = function(name, baseCost, costMultiplier, income, visitCap, visitRate) {
        self.buildings[self.buildingCount] = new building(name, baseCost, costMultiplier, income, visitCap, visitRate);
        self.buildings[self.buildingCount].index = self.buildingCount;
        self.buildingCount++;
    }

    getBuildingIndex = function(name) {
        for (var i = 0; i < self.buildingCount; i++)
        {
            var b = self.buildings[i];
            if (b.name == name)
            {
                return i;
            }
        }
        return -1;
    }

    this.addBuilding = function(index, amount){
        this.buildings[index].count += amount;
        this.buildings[index].nextCost += this.buildings[index].nextCost * this.buildings[index].costMultiplier;
        $rootScope.$emit('building:update');
    }

    registerBuilding("Swingset", 100, 0.01, 2, 0, 1);
    registerBuilding("Bench", 120, 0.02, 0, 2, 0);
    registerBuilding("Donation Box", 110, 0.03, 4, 0, 0);
}