import {ProcessModel} from "../services/process-model";

export abstract class SchedulerArgorithm {
    public result: {running: number[], waiting: number[]}[] = []

    constructor(public processes: ProcessModel[]){
    }

    public abstract process(): void;
}
