function job(name)
{
    this.name = name;
    this.unlocked = false;
    this.index = 0;
    this.workerCount = 0;

    this.profit = new Map();
    this.profitPerIdleVisitor = new Map();

    this.unlock = function(){
        this.unlocked = true;
        return this;
    }

    this.addProfit = function(resource, amount){
        this.profit.set(resource, amount);
        return this;
    }

    this.addProfitPerIdleVisitor = function(resource, amount){
        this.profitPerIdleVisitor.set(resource, amount);
        return this;
    }
}

function workerModel(){
    this.totalWorkers = 0;
    this.freeWorkers = 0;

    this.costPerWorker = 100;

    this.jobs = [];
    this.jobCount = 0;
}