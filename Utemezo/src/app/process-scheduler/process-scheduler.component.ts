import { Component, OnInit } from '@angular/core';
import {SchedulerArgorithm} from "../algorithms/scheduler-argorithm";
import {ProcessModel} from "../services/process-model";
import {Fcfs} from "../algorithms/fcfs";
import {ProcessService} from "../services/process-service";

@Component({
  selector: 'app-process-scheduler',
  templateUrl: './process-scheduler.component.html',
  styleUrls: ['./process-scheduler.component.css']
})
export class ProcessSchedulerComponent {

  public selectedAlgorithm: string = "";

  public readonly selectableAlgorithms: {name: string, create: (processes: ProcessModel[]) => SchedulerArgorithm}[] = [
    {name: "Fcfs", create: (processes => new Fcfs(processes))},
    {name: "Sjf", create: (processes => new Fcfs(processes))},
    {name: "Round robin", create: (processes => new Fcfs(processes))}
  ];

  constructor(public processService: ProcessService) { }

  selectAlgorithm(name: string) {
    console.log(name);
    this.selectedAlgorithm = name;
  }

  Process() {
    this.processService.algortihm = this.selectableAlgorithms.find(a => a.name == this.selectedAlgorithm)?.create(this.processService.processes);
    this.processService.algortihm?.process();
  }
}
