function statModel() {
    var self = this;

    this.baseVisitorRateCap = 5;
    
    this.ticksPerSecond = 100;
    this.ticksPerGameHour = 500;
    this.startDate = new Date(1950, 5, 13, 8);

    this.ticksTotal = 0;

    this.money = 500;
    this.visitorsTotal = 0;
    this.incomePerVisitor = 0;
    this.visitorRateCap = 0;
    this.baseVisitorRate = 0;
    this.visitorRateAfterCap = 0;
    this.visitorRate = 0;

    this.baseTerritory = 150;
    this.totalTerritory = 0;
    this.usedTerritory = 0;
    this.influence = 0;
    this.influenceRate = 0;
}