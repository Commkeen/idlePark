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

    unlockBuilding = function(name) {
        var index = getBuildingIndex(name);
        if (index >= 0)
        {
            self.buildings[index].unlock();
        }
    }

    this.addBuilding = function(index, amount){
        var b = this.buildings[index];
        b.count += amount;
        b.nextCost += b.nextCost * b.costMultiplier;

        //Special unlock logic
        if (b.name == "Swingset" && b.count == 1){unlockBuilding("Bench");}
        if (b.name == "Bench" && b.count == 1){unlockBuilding("Donation Box");}

        $rootScope.$emit('building:update');
    }

    $rootScope.$on('building:unlock', function (event, data) {
        unlockBuilding(data);
    })

    registerBuilding("Swingset").setCashCost(100, 0.15).setAttractionValues(2,3,0.2).unlock();
    registerBuilding("Bench").setCashCost(120, 0.15).setAttractionValues(0,0.1,2);
    registerBuilding("Donation Box").setCashCost(110, 0.15).setAttractionValues(4,0,0);

    registerBuilding("Corn Dog Stand").setCashCost(150, 0.15).setTerritoryCost(8).setAttractionValues(25,3,0.1);

    registerBuilding("Buy Acre").setCashCost(100, 0.45).setInfluenceCost(1,0.2).setPoliticsValues(100,0,0);
    registerBuilding("Grassroots Supporter").setCashCost(100, 0.35).setInfluenceCost(10,0.15).setPoliticsValues(0,0,1);
}