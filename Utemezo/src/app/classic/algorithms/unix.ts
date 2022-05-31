import {SchedulerAlgorithm} from "./scheduler-algorithm";
import {ProcessModel} from "../services/process-model";

export class Unix extends SchedulerAlgorithm {

    constructor(processes: ProcessModel[]) {
        super(processes, true);
    }

    protected calculate(): void {

    }

}
