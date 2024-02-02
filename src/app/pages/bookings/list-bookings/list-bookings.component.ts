import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/model/user';
import { NewBooking } from '../model/new-booking';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingsService } from 'src/app/services/bookings.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css'],
})
export class ListBookingsComponent implements OnInit {
  newBooking: NewBooking = new NewBooking();
  currentPage: string = 'booking';
  selectedService!: string;
  currentUser!: any;
  step: number = 0;
  frequency: string = 'one-time';

  constructor(
    private router: Router,
    private authService: AuthService,
    private bookingService: BookingsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    /* if (this.currentUser)
      this.bookingService.getBookings(this.currentUser.id).subscribe(
        (value) => {
          
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    this.newBooking.frequency = 'one-time'; */
  }

  gotoBooking() {
    this.router.navigate(['/eatse/book-service']);
  }

  gotoServiceBooking(service: any) {
    if (!this.currentUser) {
      this.router.navigate(['/auth/sign-in']);
    } else {
      if (service === 'house-keeping') {
        this.selectedService = service;
        this.router.navigate(['/booking/' + service]);
        this.newBooking.service = service;
        this.step++;
      } else if (service === 'deep-cleaning') {
        this.selectedService = service;
        this.router.navigate(['/booking/' + service]);
        this.newBooking.service = service;
        this.step++;
      } else if (service === 'post-construction-cleaning') {
        this.selectedService = service;
        this.router.navigate(['/booking/' + service]);
        this.newBooking.service = service;
        this.step++;
      } else if (service === 'errands') {
        this.selectedService = service;
        this.router.navigate(['/booking/' + service]);
        this.newBooking.cost = 2500;
        this.newBooking.service = service;
        this.step++;
      } else if (service === 'laundry') {
        this.selectedService = service;
        this.router.navigate(['/booking/' + service]);
        this.newBooking.service = service;
        this.step++;
      } else if (service === 'office-cleaning') {
        this.selectedService = service;
        this.router.navigate(['/booking/' + service]);
        this.newBooking.service = service;
        this.step += 2;
        console.log(this.newBooking.service);
      } else if (service === 'fumigation') {
        this.selectedService = service;
        this.router.navigate(['/booking/' + service]);
        this.newBooking.service = service;
        this.step++;
      } else if (service === 'move-in-move-out') {
        this.selectedService = service;
        this.router.navigate(['/booking/' + service]);
        this.newBooking.service = service;
        this.step++;
      }
    }
  }

  gotoLogin() {
    this.router.navigate(['/auth/sign-in']);
  }

  setBooking(booking: any) {
    this.newBooking = booking;
    //this.updateStep();
  }

  setFrequency($event: any) {
    this.frequency = $event;
  }

  updateStep() {
    this.step++;
  }

  back(booking: any) {
    this.newBooking = booking;
    console.log(this.newBooking);
    this.step--;
  }
}
