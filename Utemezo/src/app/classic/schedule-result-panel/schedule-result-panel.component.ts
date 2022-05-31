import {Component, OnInit, ViewChild} from '@angular/core';
import {ProcessService} from "../services/process-service";
import {UsageMatrixComponent} from "./usage-matrix/usage-matrix.component";

@Component({
  selector: 'app-schedule-result-panel',
  templateUrl: './schedule-result-panel.component.html',
  styleUrls: ['./schedule-result-panel.component.css']
})
export class ScheduleResultPanelComponent implements OnInit {

  @ViewChild(UsageMatrixComponent) matrixDisplay: UsageMatrixComponent | undefined;

  constructor(public processService: ProcessService) {

  }

  ngOnInit(): void {
  }

}
