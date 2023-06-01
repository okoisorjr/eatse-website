import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBookingsComponent } from './list-bookings/list-bookings.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { ActiveBookingComponent } from './active-booking/active-booking.component';
import { ServiceBookingPageComponent } from './service-booking-page/service-booking-page.component';

const routes: Routes = [
  { path: '', component: ListBookingsComponent },
  { path: 'book-service', component: NewBookingComponent },
  { path: 'history', component: BookingHistoryComponent},
  { path: 'active', component: ActiveBookingComponent},
  { path: ':id', component: ServiceBookingPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsRoutingModule {}
