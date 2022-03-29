import { Component, OnInit } from '@angular/core';
import {ProcessService} from "../services/process-service";
import {ProcessModel} from "../services/process-model";

@Component({
  selector: 'app-process-configurator',
  templateUrl: './process-configurator.component.html',
  styleUrls: ['./process-configurator.component.css']
})
export class ProcessConfiguratorComponent implements OnInit {

  public newProcessTime: number = 0;
  public newProcessArrival: number = 0;

  constructor(public processService: ProcessService) { }

  ngOnInit(): void {
  }

  public addProcess(){
    this.processService.processes.push(new ProcessModel(this.newProcessArrival, this.newProcessTime))
    this.newProcessTime = 0;
    this.newProcessArrival = 0;
  }
}
