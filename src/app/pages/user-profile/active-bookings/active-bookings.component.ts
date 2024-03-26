import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ClientEaser, UserAccount } from 'src/app/auth/models/user-account.model';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-active-bookings',
  templateUrl: './active-bookings.component.html',
  styleUrls: ['./active-bookings.component.css'],
})
export class ActiveBookingsComponent implements OnInit {
  currentUser!: UserAccount;
  activeBookings!: any[];
  selectedBooking!: any;
  easers: ClientEaser[] = [];
  easer: ClientEaser = new ClientEaser();
  loading: boolean = true;
  showConfirmationDialog: boolean = false;
  display: boolean = false;
  processing: boolean = false;

  constructor(
    private bookingService: BookingsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    // Fetch all users active bookings
    this.bookingService.getAllActiveBookings(this.currentUser.id).subscribe(
      (value) => {
        this.loading = false;
        this.activeBookings = value;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  showDialog(easer: any) {
    this.display = true;
  }

  openConfirmationDialog(booking: any) {
    this.selectedBooking = booking;
    this.showConfirmationDialog = true;
  }

  gotoBooking() {
    this.router.navigate(['/booking']);
  }

  deactivateBooking() {
    this.processing = true;
  }

  dismissConfirmationModal() {
    this.showConfirmationDialog = false;
  }
}
