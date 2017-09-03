function statModel() {
    var self = this;
    
    this.ticksPerSecond = 100;
    this.ticksPerGameHour = 500;
    this.startDate = new Date(1950, 5, 13, 8);

    this.ticksTotal = 0;

    this.lifetimeVisitors = 0;

    this.idleVisitors = 0;
    this.money = 500;
    this.happiness = 0;
    this.influence = 0;

    this.parkCapacity = 0;
    this.baseParkCapacity = 20;

    this.baseVisitorRate = 1.2; //Trickle of visitors with no dependencies
    this.rawVisitorRate = 0; //Base visitors + visitors from other sources, before accounting for overcrowding
    this.adjustedVisitorRate = 0; //What we display and what we actually add to the visitor count

    this.crowdThreshold = 70; //Percentage of max visitors at which overcrowding starts to happen

    this.influenceRate = 0;

    this.baseTerritory = 150;
    this.totalTerritory = 0;
    this.usedTerritory = 0;
}