import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/model/user';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css'],
})
export class BookingHistoryComponent implements OnInit {
  bookings: any[] = [];
  activeRoute: string = '';
  currentUser: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private ar: ActivatedRoute,
    private bookingService: BookingsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;

    if (this.currentUser)
      this.bookingService.getAllBookings(this.currentUser.id).subscribe(
        (value) => {
          this.bookings = value;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  gotoBooking() {
    if (this.auth.currentUser) {
      this.router.navigate(['/booking']);
    } else {
      this.router.navigate(['/auth/sign-in']);
    }
  }
}
