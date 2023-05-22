import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccount } from 'src/app/auth/models/user-account.model';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';
import { NewBooking } from '../model/new-booking';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css'],
})
export class ListBookingsComponent implements OnInit {
  //currentUser!: UserAccount;
  newBooking: NewBooking = new NewBooking();
  currentUser!: boolean;
  step: number = 1;
  frequency: string = 'one-time';

  constructor(private user: GlobalResourceService, private router: Router) {}

  ngOnInit(): void {
    //this.currentUser = this.user.getCurrentUser();
    this.currentUser = true;
  }

  gotoBooking() {
    this.router.navigate(['/eatse/book-service']);
  }

  gotoLogin() {
    this.router.navigate(['/auth/sign-in']);
  }

  setBooking(booking: any){
    this.newBooking = booking;
    this.updateStep()
  }

  finalBooking(booking: any){
    this.newBooking = booking;
  }

  setFrequency($event: any){
    this.frequency = $event;
  }

  updateStep(){
    console.log(this.newBooking);
    this.step++;
  }
}
