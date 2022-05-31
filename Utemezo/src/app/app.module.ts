import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProcessConfiguratorComponent } from './classic/process-configurator/process-configurator.component';
import {ProcessService} from "./classic/services/process-service";
import {FormsModule} from "@angular/forms";
import { ProcessSchedulerComponent } from './classic/process-scheduler/process-scheduler.component';
import { ScheduleResultPanelComponent } from './classic/schedule-result-panel/schedule-result-panel.component';
import { UsageMatrixComponent } from './classic/schedule-result-panel/usage-matrix/usage-matrix.component';
import { FooterComponent } from './footer/footer.component';
import { ResultTableComponent } from './classic/schedule-result-panel/result-table/result-table.component';
import {TooltipModule} from "ngx-bootstrap/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    ProcessConfiguratorComponent,
    ProcessSchedulerComponent,
    ScheduleResultPanelComponent,
    UsageMatrixComponent,
    FooterComponent,
    ResultTableComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        TooltipModule,
    ],
  providers: [ProcessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
