import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserAccount } from 'src/app/auth/models/user-account.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications!: any[];
  currentUser!: UserAccount;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.profileService
      // Fetch all notifications
      .fetchClientNotifications(this.currentUser.role)
      .subscribe(
        (value) => {
          this.notifications = value;
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
        }
      );
  }
}
