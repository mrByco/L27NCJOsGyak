import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProcessConfiguratorComponent } from './process-configurator/process-configurator.component';
import {ProcessService} from "./services/process-service";
import {FormsModule} from "@angular/forms";
import { ProcessSchedulerComponent } from './process-scheduler/process-scheduler.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcessConfiguratorComponent,
    ProcessSchedulerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [ProcessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
