import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import {
  ClientEaser,
  UserAccount,
} from 'src/app/auth/models/user-account.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  currentUser!: UserAccount;
  currentView!: string;
  links: any[] = [];
  bookings: any[] = [];
  easers: ClientEaser[] = [];
  easer: ClientEaser = new ClientEaser();

  constructor(
    private ar: ActivatedRoute,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentView = this.ar.snapshot.params['view'];
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
    if(!this.currentUser) {
      this.router.navigate(['auth', 'sign-in']);
    }
    if (this.currentView === undefined) {
      // set the first view to the profile
      this.currentView = 'profile';
    }
  }

  ngOnInit(): void {
    // Side menu links
    this.links = [
      { link: 'profile', name: 'Profile', icon: 'person' },
      { link: 'change-password', name: 'Change password', icon: 'lock' },
      { link: 'active-bookings', name: 'Active booking', icon: 'event_note' },
      { link: 'booking-history', name: 'Booking history', icon: 'history' },
      { link: 'notifications', name: 'Notifications', icon: 'notifications' },
    ];
  }

  updateView(link: string) {
    console.log(this.currentView);
    this.currentView = link;
  }

  signOut() {
    this.authService.signOut().subscribe(
      (value: string) => {
        this.authService.clearTokens();
        console.log(value);

        this.router.navigate(['auth', 'sign-in']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
