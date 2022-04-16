import {ProcessModel} from "../services/process-model";
import {ProcessStatus} from "../schedule-result-panel/usage-matrix/process-status";

export type SchedulingResult = {running: number | null, waiting: number[]}[];

export abstract class SchedulerArgorithm {
    protected processesDone = 0;
    protected workingProcesses: { pid: number, timeLeft: number }[] = [];

    public result: SchedulingResult = []

    constructor(public processes: ProcessModel[]){
    }

    public processUsageMatrix: ProcessStatus[][] = [];
    public processIds: number[] = [];

    public process(){
        this.processes = this.processes.filter(p => p.cpu_time > 0);
        this.calculate();
        this.updateProcessUsageMatrix();
        console.log(this.processes.length);
    }
    protected abstract calculate(): void;

    public updateProcessUsageMatrix() {
        if (!this.result) return;
        this.processIds = this.result
            .reduce<number[]>((previousValue, currentValue) =>
                (currentValue.running != null && !previousValue.includes(currentValue.running))
                    ? [...previousValue, currentValue.running]
                    : previousValue, []);
        this.processIds = this.processIds.sort();


        for (let rowIndex = 0; rowIndex < this.processIds.length; rowIndex++) {
            let currentProcessId = this.processIds[rowIndex];
            this.processUsageMatrix[rowIndex] = Array.apply(null, Array(this.result.length))
                .map((element, index) => {
                    if (!this.result) return ProcessStatus.NotPresent;

                    if (this.result[index].running == currentProcessId)
                        return ProcessStatus.Running
                    if (this.result[index].waiting.includes(currentProcessId))
                        return ProcessStatus.Waiting

                    return ProcessStatus.NotPresent
                });
        }
        console.log(this.processUsageMatrix);
    }

    protected initializeAlgorithm() {
        this.processesDone = 0;
        this.workingProcesses = [];
        this.result = [];
    }

    protected recordTimeSlice() {
        this.result.push({
            running: this.workingProcesses[0]?.pid ?? null,
            waiting: this.workingProcesses.length > 1 ? this.workingProcesses.slice(1, this.workingProcesses.length).map(p => p.pid) : []
        })
    }

    protected isFirstWorkingTaskPresentAndDone() {
        return this.workingProcesses.length > 0 && this.workingProcesses[0].timeLeft == 0;
    }

    protected removeFirstWorkingTask() {
        this.workingProcesses.shift();
        this.processesDone++;
    }

    protected workOnFirstWorkingProcess() {
        if (this.workingProcesses.length > 0) {
            this.workingProcesses[0].timeLeft--;
        }
    }

    protected addArrivalProcesses() {
        let processesArriving = this.processes.filter(p => p.arrival == this.result.length);
        this.workingProcesses.push(...processesArriving.map(p => {
            return {pid: this.processes.indexOf(p), timeLeft: p.cpu_time}
        }));
    }
}
