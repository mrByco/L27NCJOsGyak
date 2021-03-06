import {SchedulerAlgorithm} from "./scheduler-algorithm";

export class Sjf extends SchedulerAlgorithm {

    calculate(): void {
        this.initializeAlgorithm();

        while (this.processesDone < this.processes.length) {
            console.log(this.workingProcesses.length)
            this.addArrivalProcesses()

            if (this.isFirstWorkingTaskPresentAndDone()) {
                this.removeFirstWorkingTask()
                this.sortProcessesByTimeLeft();
            }

            this.workOnFirstWorkingProcess()
            this.recordTimeSlice()
        }
    }

    private sortProcessesByTimeLeft() {
        this.workingProcesses = this.workingProcesses.sort((p1, p2) => p1.timeLeft - p2.timeLeft);
    }
}
