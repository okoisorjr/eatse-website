import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ActiveBookingsComponent } from './active-bookings/active-bookings.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  { path: '', component: MyProfileComponent },
  { path: 'change-password', component: UpdatePasswordComponent },
  { path: 'active-bookings', component: ActiveBookingsComponent },
  { path: 'booking-history', component: BookingHistoryComponent },
  { path: 'notifications', component: NotificationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
