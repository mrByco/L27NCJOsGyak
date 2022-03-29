import {SchedulerArgorithm} from "./scheduler-argorithm";

export class Sjf extends SchedulerArgorithm {

    calculate(): void {
        let processesDone = 0;
        let waitingProcesses: { pid: number, timeLeft: number }[] = [];

        this.result = [];
        while (processesDone < this.processes.length) {
            console.log(waitingProcesses.length)
            let processesArriving = this.processes.filter(p => p.arrival == this.result.length);
            waitingProcesses.push(...processesArriving.map(p => {
                return {pid: this.processes.indexOf(p), timeLeft: p.cpu_time}
            }));

            if (waitingProcesses.length > 0 && waitingProcesses[0].timeLeft == 0) {
                waitingProcesses.shift();
                processesDone++;
                waitingProcesses = waitingProcesses.sort((p1, p2) => p1.timeLeft - p2.timeLeft);
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
