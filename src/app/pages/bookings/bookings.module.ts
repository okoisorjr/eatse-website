import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';

import { BookingsRoutingModule } from './bookings-routing.module';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { ListBookingsComponent } from './list-bookings/list-bookings.component';
import { ListBookingsngclearComponent } from './list-bookingsngclear/list-bookingsngclear.component';


@NgModule({
  declarations: [
    NewBookingComponent,
    ListBookingsComponent,
    ListBookingsngclearComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    ComponentsModule
  ]
})
export class BookingsModule { }
