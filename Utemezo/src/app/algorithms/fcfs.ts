import {SchedulerArgorithm} from "./scheduler-argorithm";

export class Fcfs extends SchedulerArgorithm {

    process(): void {
        let processesDone = 0;
        let waitingProcesses: {pid: number, timeLeft: number}[] = [];
        while (processesDone < this.processes.length){
            if (this.pr)
        }
    }
}
