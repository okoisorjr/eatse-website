import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import {
  BookingData,
  BookingsService,
} from 'src/app/services/bookings.service';

@Component({
  selector: 'app-active-booking',
  templateUrl: './active-booking.component.html',
  styleUrls: ['./active-booking.component.css'],
})
export class ActiveBookingComponent implements OnInit {
  bookings: BookingData[] = [];
  activeRoute: string = '';
  currentUser: any;

  constructor(
    private bookingService: BookingsService,
    private auth: AuthService,
    private ar: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    this.ar.url.subscribe((param) => {
      if (param[0].path === 'active') {
        this.activeRoute = param[0].path;
      }
    });
  }

  gotoBooking() {
    if (this.auth.currentUser) {
      this.router.navigate(['/booking']);
    } else {
      this.router.navigate(['/auth/sign-in']);
    }
  }
}
