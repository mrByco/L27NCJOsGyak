import { ProcessModel } from "../services/process-model";
import {SchedulerAlgorithm} from "./scheduler-algorithm";

export class RoundRobin extends SchedulerAlgorithm {
    private currentTimeSliceAge: number = 0;

    constructor(tasks: ProcessModel[], private timeSliceSize: number = 5) {
        super(tasks);
    }

    calculate(): void {
        this.initializeAlgorithm();

        while (this.processesDone < this.processes.length) {
            this.addArrivalProcesses();

            if (this.isFirstWorkingTaskPresentAndDone()) {
                this.removeFirstWorkingTask();
                this.currentTimeSliceAge = 0;
            }

            this.checkTimeSliceAgeAndRotateIfNeeded();
            this.workOnFirstWorkingProcess();
            this.recordTimeSlice();
        }
    }

    protected override initializeAlgorithm() {
        this.currentTimeSliceAge = 0;
        super.initializeAlgorithm();
    }

    protected override workOnFirstWorkingProcess() {
        super.workOnFirstWorkingProcess();
        this.currentTimeSliceAge++;
    }

    private checkTimeSliceAgeAndRotateIfNeeded(){
        if (this.currentTimeSliceAge >= this.timeSliceSize) {
            this.currentTimeSliceAge = 0;
            let firstElement = this.workingProcesses.shift();
            if (firstElement) this.workingProcesses.push(firstElement);
        }
    }
}
