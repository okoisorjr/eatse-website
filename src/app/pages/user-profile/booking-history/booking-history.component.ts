import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserAccount } from 'src/app/auth/models/user-account.model';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css'],
})
export class BookingHistoryComponent implements OnInit {
  
  currentUser!: UserAccount;
  bookings!: any[];
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private bookingService: BookingsService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    // Fetch all users bookings both active and Inactive
    this.bookingService.getAllBookings(this.currentUser.id).subscribe(
      (value) => {
        if (value) {
          this.loading = false;
          this.bookings = value;
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  gotoBooking() {
    this.router.navigate(['/booking']);
  }
}
