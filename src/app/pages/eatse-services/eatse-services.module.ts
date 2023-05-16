import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';

import { EatseServicesRoutingModule } from './eatse-services-routing.module';
import { ServiceComponent } from './service/service.component';


@NgModule({
  declarations: [
    ServiceComponent
  ],
  imports: [
    CommonModule,
    EatseServicesRoutingModule,
    ComponentsModule
  ]
})
export class EatseServicesModule { }
