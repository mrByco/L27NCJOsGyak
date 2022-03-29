import {ProcessModel} from "./process-model";
import {SchedulerArgorithm} from "../algorithms/scheduler-argorithm";

export class ProcessService {
    public processes: ProcessModel[] = [];
    public algortihm: SchedulerArgorithm | undefined;
}
