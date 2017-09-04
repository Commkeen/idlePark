function building(name) {
    this.name = name;
    this.description = "blank";
    this.unlocked = false;

    this.unlockOnBuildings = new Map();

    this.operatingProfit = new Map();
    this.operatingCost = new Map();

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
    this.addOperatingCost = function(resource, amount) {
        this.operatingCost.set(resource, amount);
        return this;
    }
    this.addOperatingProfit = function(resource, amount) {
        this.operatingProfit.set(resource, amount);
        return this;
    }
    this.addUnlockOnBuilding = function(building, amount) {
        this.unlockOnBuildings.set(building, amount);
    }

    this.setCashCost(0,0);
    this.setTerritoryCost(0);
    this.setInfluenceCost(0,0);
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

    let checkAndProcessUnlocks = function() {
        self.buildings.forEach(function(b) {
            if (b.unlocked){return;}
            if (b.unlockOnBuildings.size == 0){return;}
            var shouldUnlock = true;
            b.unlockOnBuildings.forEach(function(value, key, map){
                if (self.buildings[getBuildingIndex(key)].count < value){
                    shouldUnlock = false;
                }
            });
            if (shouldUnlock){
                unlockBuilding(b.name);
            }
        });
    }

    this.addBuilding = function(index, amount){
        var b = this.buildings[index];
        b.count += amount;
        b.nextCost += b.nextCost * b.costMultiplier;

        //Special unlock logic
        //if (b.name == "Swingset" && b.count == 1){unlockBuilding("Bench");}
        //if (b.name == "Bench" && b.count == 1){unlockBuilding("Donation Box");}

        $rootScope.$emit('building:update');
    }

    $rootScope.$on('building:update', function (event, data) {
        checkAndProcessUnlocks();
    })

    $rootScope.$on('building:unlock', function (event, data) {
        unlockBuilding(data);
    })

    registerBuilding("Swingset").setCashCost(300, 0.15)
            .addOperatingCost('idleVisitors', 1).addOperatingProfit('happiness', 4).unlock();
    registerBuilding("Donation Box").setCashCost(300, 0.17)
            .addOperatingCost('happiness', 1).addOperatingProfit('money', 20).addUnlockOnBuilding('Swingset', 3);
}