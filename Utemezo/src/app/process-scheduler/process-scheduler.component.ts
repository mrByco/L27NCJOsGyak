import {Component, OnInit} from '@angular/core';
import {SchedulerArgorithm} from "../algorithms/scheduler-argorithm";
import {ProcessModel} from "../services/process-model";
import {Fcfs} from "../algorithms/fcfs";
import {ProcessService} from "../services/process-service";
import {Sjf} from "../algorithms/sjf";
import {RoundRobin} from "../algorithms/round-robin";

@Component({
    selector: 'app-process-scheduler',
    templateUrl: './process-scheduler.component.html',
    styleUrls: ['./process-scheduler.component.css']
})
export class ProcessSchedulerComponent {

    public selectedAlgorithm: string = "";

    public readonly selectableAlgorithms: { name: string, create: (processes: ProcessModel[]) => SchedulerArgorithm }[] = [
        {name: "FCFS", create: (processes => new Fcfs(processes))},
        {name: "SJF", create: (processes => new Sjf(processes))},
        {name: "Round robin 5ms", create: (processes => new RoundRobin(processes, 5))},
        {
            name: "Round robin Xms", create: (processes => {
                let timeSlice = undefined;
                while (timeSlice == undefined || isNaN(timeSlice)) {
                    let result = prompt("Round robint TimeSlice: ");
                    if (!result) continue;
                    timeSlice = parseInt(result);
                }
                return new RoundRobin(processes, timeSlice)
            })
        }
    ];

    constructor(public processService: ProcessService) {
    }

    selectAlgorithm(name: string) {
        this.selectedAlgorithm = name;
        this.process();
    }

    private process() {
        let algorithm = this.selectableAlgorithms.find(a => a.name == this.selectedAlgorithm)?.create(this.processService.processes);
        console.log(algorithm)
        if (algorithm == undefined) return;
        this.processService.algortihm = algorithm;
        console.log(this.processService.algortihm)
        this.processService.algortihm?.process();
    }
}
