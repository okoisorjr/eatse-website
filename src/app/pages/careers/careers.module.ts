import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';

import { CareersRoutingModule } from './careers-routing.module';
import { ApplicationPageComponent } from './application-page/application-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobDetailsComponent } from './job-details/job-details.component';


@NgModule({
  declarations: [
    ApplicationPageComponent,
    DashboardComponent,
    JobDetailsComponent
  ],
  imports: [
    CommonModule,
    CareersRoutingModule,
    ComponentsModule
  ]
})
export class CareersModule { }
