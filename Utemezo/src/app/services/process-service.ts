import {ProcessModel} from "./process-model";
import {SchedulerAlgorithm} from "../algorithms/scheduler-algorithm";
import {Fcfs} from "../algorithms/fcfs";

export class ProcessService {

    private _unix_mode = false;

    public processes: ProcessModel[] = [];
    public algorithm: SchedulerAlgorithm = new Fcfs([]);

    constructor() {
        this.fillWithRandomProcesses();
    }

    public fillWithRandomProcesses(processCount: number = 6){
        this.processes = Array.apply(null, Array(processCount))
            .map((value, index) => {
                return new ProcessModel(Math.round(Math.random() * 15), Math.round(Math.random() * 15), "P" + index)
            });
    }
}
