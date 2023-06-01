import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';

import { BookingsRoutingModule } from './bookings-routing.module';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { ListBookingsComponent } from './list-bookings/list-bookings.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { ActiveBookingComponent } from './active-booking/active-booking.component';
import { ServiceBookingPageComponent } from './service-booking-page/service-booking-page.component';


@NgModule({
  declarations: [
    NewBookingComponent,
    ListBookingsComponent,
    BookingHistoryComponent,
    ActiveBookingComponent,
    ServiceBookingPageComponent,
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    ComponentsModule
  ]
})
export class BookingsModule { }
