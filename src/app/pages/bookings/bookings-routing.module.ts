import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBookingsComponent } from './list-bookings/list-bookings.component';
import { NewBookingComponent } from './new-booking/new-booking.component';

const routes: Routes = [
  { path: '', component: ListBookingsComponent },
  { path: 'book-service', component: NewBookingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsRoutingModule {}
