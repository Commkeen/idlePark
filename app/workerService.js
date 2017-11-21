angular.module('gameApp').service("workerService", workerService);
workerService.$inject = ['$rootScope', 'statService'];

function workerService($rootScope, statService) {
    var self = this;
    var workerModel = statService.workerModel;

    

    registerJob = function(name) {
        workerModel.jobs[workerModel.jobCount] = new job(name);
        workerModel.jobs[workerModel.jobCount].index = workerModel.jobCount;
        workerModel.jobCount++;
        return workerModel.jobs[workerModel.jobCount-1];
    }

    getJobIndex = function(name) {
        for (var i = 0; i < workerModel.jobCount; i++)
        {
            var j = workerModel.jobs[i];
            if (j.name == name)
            {
                return i;
            }
        }
        return -1;
    }

    self.assignWorker = function(index) {
        if (workerModel.freeWorkers > 0) {
            workerModel.freeWorkers -= 1;
            workerModel.jobs[index].workerCount += 1;
        }
    }
    
    self.freeWorker = function(index) {
        if (workerModel.jobs[index].workerCount > 0) {
            workerModel.jobs[index].workerCount -= 1;
            workerModel.freeWorkers += 1;
        }
    }

    $rootScope.$on('worker:assign', function (event, data) {
        assignWorker(data);
    })

    $rootScope.$on('worker:free', function (event, data) {
        freeWorker(data);
    })

    registerJob("Vendor").addProfitPerIdleVisitor('money', 100).unlock();
    registerJob("Entertainer").addProfitPerIdleVisitor('happiness', 1).unlock();
}