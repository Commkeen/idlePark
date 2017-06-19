function building(name) {
    this.name = name;
    this.description = "blank";
    this.unlocked = false;

    

    this.index = 0;
    this.count = 0;

    this.unlock = function(){
        this.unlocked = true;
        return this;
    }
    this.setCashCost = function(baseCost, costMultiplier) {
        this.baseCost = baseCost;
        this.nextCost = baseCost;
        this.costMultiplier = costMultiplier;
        return this;
    }
    this.setTerritoryCost = function(territoryCost){
        this.territoryCost = territoryCost;
        return this;
    }
    this.setInfluenceCost = function(baseCost, costMultiplier) {
        this.baseInfluenceCost = baseCost;
        this.nextInfluenceCost = baseCost;
        this.influenceCostMultiplier = costMultiplier;
        return this;
    }
    this.setAttractionValues = function(income, visitRate, visitCap) {
        this.incomePerVisitor = income;
        this.visitorRateCap = visitCap;
        this.visitorRate = visitRate;
        return this;
    }
    this.setPoliticsValues = function(territoryGain, territoryRate, influenceRate) {
        this.territoryGain = territoryGain;
        this.territoryRate = territoryRate;
        this.influenceRate = influenceRate;
        return this;
    }

    this.setCashCost(0,0);
    this.setTerritoryCost(0);
    this.setInfluenceCost(0,0);
    this.setAttractionValues(0,0,0);
    this.setPoliticsValues(0,0,0);
}

angular.module('gameApp').service("buildingService", buildingService);
buildingService.$inject = ['$rootScope'];

function buildingService($rootScope) {
    var self = this;

    this.buildings = [];
    this.buildingCount = 0;

    registerBuilding = function(name) {
        self.buildings[self.buildingCount] = new building(name);
        self.buildings[self.buildingCount].index = self.buildingCount;
        self.buildingCount++;
        return self.buildings[self.buildingCount-1];
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

    registerBuilding("Swingset").setCashCost(100, 0.05).setAttractionValues(2,1,0.2);
    registerBuilding("Bench").setCashCost(120, 0.05).setAttractionValues(0,2,0.1);
    registerBuilding("Donation Box").setCashCost(110, 0.03).setAttractionValues(4,0,0);
}