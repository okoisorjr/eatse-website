import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ActiveBookingsComponent } from './active-bookings/active-bookings.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyProfileComponent,
    UpdatePasswordComponent,
    NotificationsComponent,
    ActiveBookingsComponent,
    BookingHistoryComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserProfileRoutingModule,
    ComponentsModule,
    NgbPopoverModule,
    DialogModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class UserProfileModule { }
