import {Component, OnInit} from '@angular/core';
import {ProcessStatus} from "./process-status";
import {ProcessService} from "../../services/process-service";

@Component({
    selector: 'app-usage-matrix',
    templateUrl: './usage-matrix.component.html',
    styleUrls: ['./usage-matrix.component.css']
})
export class UsageMatrixComponent {

    constructor(public processService: ProcessService) {}

    getColorForStatus(cell: ProcessStatus) {
        switch (cell){
            case ProcessStatus.NotPresent:
                return "rgba(0,0,0,0.15)";
            case ProcessStatus.Running:
                return "rgba(0,147,0,0.5)";
            case ProcessStatus.Waiting:
                return "rgba(190,42,0,0.5)";
        }
    }
}
