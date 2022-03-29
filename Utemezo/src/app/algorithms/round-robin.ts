import { ProcessModel } from "../services/process-model";
import {SchedulerArgorithm} from "./scheduler-argorithm";

export class RoundRobin extends SchedulerArgorithm {


    constructor(tasks: ProcessModel[], private timeSliceSize: number) {
        super(tasks);
    }

    calculate(): void {
        let processesDone = 0;
        let waitingProcesses: { pid: number, timeLeft: number }[] = [];

        this.result = [];
        while (processesDone < this.processes.length) {
            console.log(waitingProcesses);
            let processesArriving = this.processes.filter(p => p.arrival == this.result.length);
            waitingProcesses.push(...processesArriving.map(p => {
                return {pid: this.processes.indexOf(p), timeLeft: p.cpu_time}
            }));

            if (waitingProcesses.length > 0 && waitingProcesses[0].timeLeft == 0) {
                waitingProcesses.shift();
                processesDone++;
            }

            if (waitingProcesses.length > 0) {
                waitingProcesses[0].timeLeft--;
            }

            this.result.push({
                running: waitingProcesses[0]?.pid ?? null,
                waiting: waitingProcesses.length > 1 ? waitingProcesses.slice(1, waitingProcesses.length).map(p => p.pid) : []
            })
        }
    }
}
