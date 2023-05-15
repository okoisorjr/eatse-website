import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule
  ]
})
export class DashboardModule { }
