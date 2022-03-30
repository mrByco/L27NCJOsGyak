import {SchedulerArgorithm} from "./scheduler-argorithm";

export class Fcfs extends SchedulerArgorithm {

    calculate(): void {
        this.initializeAlgorithm();

        while (this.processesDone < this.processes.length) {
            this.addArrivalProcesses();

            if (this.isFirstWorkingTaskPresentAndDone()) {
                this.removeFirstWorkingTask();
            }
            
            this.workOnFirstWorkingProcess();
            this.recordTimeSlice();
        }
    }
}
