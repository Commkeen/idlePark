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
    registerBuilding("Bench").setCashCost(225, 0.45)
            .addOperatingProfit('idleVisitors', 1).unlock();
    registerBuilding("Tire Swing").setCashCost(200, 0.35).setTerritoryCost(1)
            .addOperatingCost('idleVisitors', 1).addOperatingProfit('happiness', 4).addUnlockOnBuilding('Bench', 1);
    registerBuilding("Donation Box").setCashCost(300, 0.27)
            .addOperatingCost('happiness', 3).addOperatingProfit('money', 42).addUnlockOnBuilding('Tire Swing', 3);
    
    registerBuilding("Campground").setCashCost(13225, 0.25)
            .addOperatingProfit('idleVisitors', 22).addUnlockOnBuilding('Bench', 5);
    registerBuilding("Carousel").setCashCost(15035, 0.30)
            .addOperatingCost('idleVisitors', 10).addOperatingProfit('happiness', 40).addUnlockOnBuilding('Tire Swing', 10);
    registerBuilding("Corndog Stand").setCashCost(12580, 0.30)
            .addOperatingCost('happiness', 15).addOperatingProfit('money', 200).addUnlockOnBuilding('Donation Box', 5);
}