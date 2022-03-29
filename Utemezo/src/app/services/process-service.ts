import {ProcessModel} from "./process-model";
import {SchedulerArgorithm} from "../algorithms/scheduler-argorithm";
import {Fcfs} from "../algorithms/fcfs";

export class ProcessService {

    public processes: ProcessModel[] = [];
    public algortihm: SchedulerArgorithm = new Fcfs([]);

    constructor() {
        this.fillWithRandomProcesses();
    }

    public fillWithRandomProcesses(processCount: number = 6){
        this.processes = Array.apply(null, Array(processCount))
            .map(() => {
                return new ProcessModel(Math.round(Math.random() * 15), Math.round(Math.random() * 15))
            });
    }
}
