import {Component, OnInit} from '@angular/core';
import {ProcessService} from "../../services/process-service";
import {SchedulingResult} from "../../algorithms/scheduler-argorithm";
import {stringify} from "@angular/compiler/src/util";

export type ProcessReportRow = {name: string, arrive: number, cpu_ms: number, start: number, complete: number, turnover: number,  wait: number, response: number };

@Component({
    selector: 'app-result-table',
    templateUrl: './result-table.component.html',
    styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent {

    constructor(public processService: ProcessService) {
    }

    public getProcessReportRows(result: SchedulingResult, pid: number[], names: string[]) {
        return names.map((name, index) => this.getProcessReportForSingleProcess(result, pid[index], name));
    }

    public getProcessReportForSingleProcess(result: SchedulingResult, pid: number, name: string): ProcessReportRow {
        let row: ProcessReportRow = {name: name, arrive: NaN, cpu_ms: 0, start: NaN, complete: NaN, wait: 0, response: 0, turnover: NaN};
        for (let i: number = 0; i < result.length; i++) {
            let resultLine = result[i];
            if (isNaN(row.arrive)) {
                if ([...resultLine.waiting, resultLine.running].includes(pid)) row.arrive = i;
                else continue;
            }
            if (isNaN(row.start) && resultLine.running == pid) row.start = i;

            if (resultLine.running == pid) {
                row.cpu_ms++;
                row.complete = i;
            }
            if (resultLine.waiting.includes(pid)) row.wait++;
            if (resultLine.waiting.includes(pid) && isNaN(row.start)) row.response++;
        }
        row.turnover = row.complete - row.arrive;
        return row;
    }

    public getAverageProcessRow(): ProcessReportRow {
        let rows = this.getProcessReportRows(this.processService.algortihm.result, this.processService.algortihm.processIds, this.processService.processes.map(p => p.name));
        return {
            name: "",
            start:  this.avg(rows.map(r => r.start)),
            arrive:  this.avg(rows.map(r => r.arrive)),
            wait:  this.avg(rows.map(r => r.wait)),
            cpu_ms:  this.avg(rows.map(r => r.cpu_ms)),
            response:  this.avg(rows.map(r => r.response)),
            turnover:  this.avg(rows.map(r => r.turnover)),
            complete:  this.avg(rows.map(r => r.complete)),

        }
    }

    public getProcessNames() { return this.processService.processes.map(p => p.name);}

    private avg(numbers: number[]): number {
        let count = numbers.length;
        let sum = numbers.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        return Math.round( sum / count * 100) / 100;
    }
}
