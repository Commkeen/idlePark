function action(name) {
    this.name = name;
    this.description = "";
    this.unlocked = false;
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
}

angular.module('gameApp').service("actionService", actionService);
actionService.$inject = ['$rootScope', 'statService'];

function actionService($rootScope, statService) {
    var self = this;

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

    registerAction("Ask For Donations").addCost('happiness', 5).addProfit('money', 100).unlock();
}