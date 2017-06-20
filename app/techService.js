function tech(name){
    this.name = name;
    this.description = "blank";

    this.visible = true;
    this.purchased = false;
    
    this.buildingToUnlock = "";
    
    this.setCashCost = function(cost){
        this.cost = cost;
        return this;
    }
    this.setVisitorRequirement = function(visitors){
        this.visitorRequirement = visitors;
        return this;
    }
    this.setVisibilityPrereq = function(prereqName){
        this.visibilityPrereq = prereqName;
        return this;
    }
    this.setBuildingToUnlock = function(buildingName){
        this.buildingToUnlock = buildingName;
        return this;
    }
}

angular.module('gameApp').service("techService", techService);
techService.$inject = ['$rootScope'];

function techService($rootScope) {
    var self = this;

    this.techs = [];
    this.techCount = 0;

    registerTech = function(name) {
        self.techs[self.techCount] = new tech(name);
        self.techs[self.techCount].index = self.techCount;
        self.techCount++;
        return self.techs[self.techCount-1];
    }

    getTechIndex = function(name) {
        for (var i = 0; i < self.techCount; i++)
        {
            var t = self.techs[i];
            if (t.name == name)
            {
                return i;
            }
        }
        return -1;
    }

    this.purchaseTech = function(index) {
        var tech = self.techs[index];
        tech.purchased = true;
        $rootScope.$emit('building:unlock', tech.buildingToUnlock);
    }

    registerTech("Refreshment Sales").setCashCost(100).setVisitorRequirement(5).setBuildingToUnlock("Corn Dog Stand");
    registerTech("Expansion").setCashCost(10000).setVisitorRequirement(100).setBuildingToUnlock("Buy Acre");
    registerTech("Municipal Presence").setCashCost(15000).setVisitorRequirement(150).setBuildingToUnlock("Grassroots Supporter");
    registerTech("Carnival Rides").setCashCost(20000).setVisitorRequirement(500);
}