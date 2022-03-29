import {ProcessModel} from "../services/process-model";
import {ProcessStatus} from "../schedule-result-panel/usage-matrix/process-status";

export type SchedulingResult = {running: number | null, waiting: number[]}[];

export abstract class SchedulerArgorithm {
    public result: SchedulingResult = []

    constructor(public processes: ProcessModel[]){
    }

    public processUsageMatrix: ProcessStatus[][] = [];
    public processIds: number[] = [];

    public process(){
        this.processes = this.processes.filter(p => p.cpu_time > 0);
        this.calculate();
        this.updateProcessUsageMatrix();
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
}
