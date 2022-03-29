import {SchedulerArgorithm} from "./scheduler-argorithm";

export class Sjf extends SchedulerArgorithm {

    calculate(): void {
        this.initializeAlgorithm();

        while (this.processesDone < this.processes.length) {
            console.log(this.waitingProcesses.length)
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
        this.waitingProcesses = this.waitingProcesses.sort((p1, p2) => p1.timeLeft - p2.timeLeft);
    }
}
