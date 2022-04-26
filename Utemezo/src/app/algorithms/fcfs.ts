import {SchedulerAlgorithm} from "./scheduler-algorithm";

export class Fcfs extends SchedulerAlgorithm {

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
