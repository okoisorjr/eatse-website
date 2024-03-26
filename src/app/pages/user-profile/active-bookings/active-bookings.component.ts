import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(
    private bookingService: BookingsService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    // Fetch all users active bookings
    this.bookingService.getAllActiveBookings(this.currentUser.id).subscribe(
      (value) => {
        this.activeBookings = value;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  openCancelBookingConfirmationModal(
    cancelBookingConfirmationModal: any,
    booking: any
  ) {
    this.selectedBooking = booking;
    this.modalService.open(cancelBookingConfirmationModal, {
      centered: true,
      size: 'md',
    });
    console.log(this.selectedBooking);
  }

  gotoBooking() {
    this.router.navigate(['/booking']);
  }

  deactivateBooking() {}
}
