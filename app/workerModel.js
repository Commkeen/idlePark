function job(name)
{
    this.name = name;
    this.unlocked = false;
    this.index = 0;
    this.workerCount = 0;

    this.profit = new Map();

    this.unlock = function(){
        this.unlocked = true;
        return this;
    }

    this.addProfit = function(resource, amount){
        this.profit.set(resource, amount);
        return this;
    }
}

function workerModel(){
    this.totalWorkers = 10;
    this.freeWorkers = 10;

    this.jobs = [];
    this.jobCount = 0;
}