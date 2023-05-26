import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccount } from 'src/app/auth/models/user-account.model';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';
import { NewBooking } from '../model/new-booking';
import { CurrentUser } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css'],
})
export class ListBookingsComponent implements OnInit {
  //currentUser!: UserAccount;
  newBooking: NewBooking = new NewBooking();
  currentPage: string = 'booking';
  selectedService!: string;
  currentUser!: CurrentUser;
  step: number = 0;
  frequency: string = 'one-time';

  constructor(private user: GlobalResourceService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.user.getCurrentUser();
  }

  gotoBooking() {
    this.router.navigate(['/eatse/book-service']);
  }

  gotoServiceBooking(service: any) {
    if (!this.currentUser) {
      this.router.navigate(['/auth/sign-in']);
    } else {
      if (service === 'housekeeping') {
        this.selectedService = service;
        this.step++;
      } else if (service === 'deep cleaning') {
        this.selectedService = service;
        this.step++;
      } else if (service === 'post construction cleaning') {
        this.selectedService = service;
        this.step++;
      } else if (service === 'errands') {
        this.selectedService = service;
        this.step++;
      } else if (service === 'laundry') {
        this.selectedService = service;
        this.step++;
      }
    }
  }

  gotoLogin() {
    this.router.navigate(['/auth/sign-in']);
  }

  setBooking(booking: any) {
    this.newBooking = booking;
    this.updateStep();
  }

  finalBooking(booking: any) {
    this.newBooking = booking;
  }

  setFrequency($event: any) {
    this.frequency = $event;
  }

  updateStep() {
    console.log(this.newBooking);
    this.step++;
  }
}
