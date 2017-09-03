function action(name) {
    this.name = name;
    this.description = "";
    this.unlocked = false;

    this.unlock = function(){
        this.unlocked = true;
        return this;
    }
}

angular.module('gameApp').service("actionService", actionService);
actionService.$inject = ['$rootScope', 'statService'];

function actionService($rootScope, statService) {
    var self = this;

    this.actions = [];
    this.actionCount = 0;

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

    registerAction("Ask For Donations").unlock();
}