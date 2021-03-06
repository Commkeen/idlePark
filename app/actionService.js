function action(name) {
    this.name = name;
    this.description = "";
    this.unlocked = false;

    this.unlockOnBuildings = new Map();

    this.cost = new Map();
    this.profit = new Map();
    
    this.cooldown = 0;
    this.currentCooldown = 0;

    this.unlock = function(){
        this.unlocked = true;
        return this;
    }

    this.addCost = function(resource, amount){
        this.cost.set(resource, amount);
        return this;
    }
    this.addProfit = function(resource, amount){
        this.profit.set(resource, amount);
        return this;
    }
    this.addUnlockOnBuilding = function(building, amount) {
        this.unlockOnBuildings.set(building, amount);
    }
}

angular.module('gameApp').service("actionService", actionService);
actionService.$inject = ['$rootScope', 'statService', 'buildingService'];

function actionService($rootScope, statService, buildingService) {
    var self = this;
    self.buildingService = buildingService;

    this.actions = [];
    this.actionCount = 0;

    this.canAffordAction = function(index) {
        var action = self.actions[index];
        var canAfford = true;
        action.cost.forEach(function(value, key, map) {
            if (statService.statModel[key] < value){
                canAfford = false;
            }
        });
        return canAfford;
    }

    this.payActionCosts = function(index) {
        var action = self.actions[index];
        action.cost.forEach(function(value, key, map) {
            statService.statModel[key] -= value;
        });
    }

    this.gainActionProfits = function(index) {
        var action = self.actions[index];
        action.profit.forEach(function(value, key, map) {
            statService.statModel[key] += value;
        });
    }

    registerAction = function(name) {
        self.actions[self.actionCount] = new action(name);
        self.actions[self.actionCount].index = self.actionCount;
        self.actionCount++;
        return self.actions[self.actionCount-1];
    }

    getActionIndex = function(name) {
        for (var i = 0; i < self.actionCount; i++)
        {
            var a = self.actions[i];
            if (a.name == name)
            {
                return i;
            }
        }
        return -1;
    }

    unlockAction = function(name) {
        var index = getActionIndex(name);
        if (index >= 0)
        {
            self.actions[index].unlock();
        }
    }

    let checkAndProcessUnlocks = function() {
        self.actions.forEach(function(a) {
            if (a.unlocked){return;}
            if (a.unlockOnBuildings.size == 0){return;}
            var shouldUnlock = true;
            a.unlockOnBuildings.forEach(function(value, key, map){
                if (self.buildingService.buildings[getBuildingIndex(key)].count < value){
                    shouldUnlock = false;
                }
            });
            if (shouldUnlock){
                unlockAction(a.name);
            }
        });
    }

    $rootScope.$on('building:update', function (event, data) {
        checkAndProcessUnlocks();
    })

    registerAction("Ask For Donations").addCost('happiness', 5).addProfit('money', 100).addUnlockOnBuilding('Tire Swing', 1);
}