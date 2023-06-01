import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Flutterwave, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { BookingsService } from 'src/app/services/bookings.service';
import { DatePickerComponent } from '../../date-picker/date-picker.component';

interface AvailableTime {
  id: string;
  time: string;
  period: string;
}

@Component({
  selector: 'app-errand',
  templateUrl: './errand.component.html',
  styleUrls: ['./errand.component.css']
})
export class ErrandComponent implements OnInit {

  @ViewChild(DatePickerComponent) resetButton!: DatePickerComponent;

  step: number = 1;
  newBooking: NewBooking = new NewBooking();
  frequencies: string[] = [];
  times: AvailableTime[] = [];
  selectedErrand!: string;
  errands: string[] = [];
  dates: string[] = [];
  currentUser: any;
  customizations: any;
  publicKey = 'FLWPUBK_TEST-b54f62bb20ff93d14f9e0b14163e1bd6-X';

  customerDetails!: any;
  meta!: any;

  constructor(
    private flutterwave: Flutterwave,
    private ar: ActivatedRoute,
    private notifier: NotifierService,
    private auth: Auth,
    private bookingService: BookingsService,
    private router: Router
  ) {
    this.auth.onAuthStateChanged((credential) => {
      if(credential){
        this.currentUser = credential;
        this.customerDetails = {
          email: this.currentUser.email,
          customerName: this.currentUser.displayName,
          userId: this.currentUser.uid,
        };
      }
    })
  }

  ngOnInit(): void {
    //this.currentUser = this.auth.currentUser;
    this.newBooking.service = this.ar.snapshot.params['id'];
    this.newBooking.frequency = 'one-time';
    this.newBooking.dates = [];
    this.errands = ['Shopping', 'Pick up and delivery'];
    this.frequencies = ['one-time', /*'weekly'*/ 'monthly', 'custom'];
    this.times = [
      { id: '1', time: '06:00', period: 'am' },
      { id: '1', time: '07:00', period: 'am' },
      { id: '1', time: '08:00', period: 'am' },
      { id: '1', time: '09:00', period: 'am' },
      { id: '1', time: '10:00', period: 'am' },
      { id: '1', time: '11:00', period: 'am' },
      { id: '1', time: '12:00', period: 'pm' },
      { id: '1', time: '01:00', period: 'pm' },
      { id: '1', time: '02:00', period: 'pm' },
      { id: '1', time: '03:00', period: 'pm' },
      { id: '1', time: '04:00', period: 'pm' },
      { id: '1', time: '05:00', period: 'pm' },
    ];
    this.newBooking.errandType = 'Shopping';
    this.newBooking.cost = 2500
    this.customizations = {
      title: 'Eatse Global Resources Ltd.',
      description: `Payment for the ${this.newBooking.service} service`,
      logo: 'https://eatse.ng/assets/logo.png',
    };
  }

  selectFrequency(frequency: any) {
    this.newBooking.frequency = frequency;
    this.newBooking.dates = [];
    this.resetButton.resetSelectedDates();
  }

  setArrivalTime(time: AvailableTime) {
    this.newBooking.arrivalTime = time.time;
    this.newBooking.period = time.period;
  }

  setDate(date: any) {
    /* this.dates = date;
    
    if (this.dates.length > 0) {
      this.newBooking.dates = this.dates;
    } */
    this.newBooking.dates = date;
  }

  validateForm() {
    if (
      this.newBooking.address === '' ||
      this.newBooking.frequency === '' ||
      this.newBooking.arrivalTime === '' ||
      this.newBooking.cost === 0
    ) {
      return this.notifier.notify(
        'error',
        'Please, make sure to fill out all the required fields'
      );
    } else if (
      this.newBooking.servicePrice < 4000 ||
      this.newBooking.cost < 4000
    ) {
      this.notifier.notify(
        'error',
        'Please, the minimum accumulated price cannot be under 4k'
      );
    } else {
      return true;
    }
  }

  gotoBooking() {
    this.router.navigate(['/booking']);
  }

  back() {
    this.step--;
  }

  nextPhase(){
    this.step++;
  }

  proceedToPay() {
    let value = this.validateForm();
    if (value) {
      this.makePayment();
    }
  }

  selectErrand(errand: string) {
    this.newBooking.errandType = errand;
  }

  makePayment() {
    let paymentData = {
      public_key: this.publicKey,
      tx_ref: this.generateReference(),
      amount: this.newBooking.cost,
      currency: 'NGN',
      payment_options: 'card,ussd',
      redirect_url: '',
      meta: this.meta,
      customer: this.customerDetails,
      customizations: this.customizations,
      callback: this.makePaymentCallback,
      onclose: this.closedPaymentModal,
      callbackContext: this,
    };

    this.flutterwave.inlinePay(paymentData);
  }
  makePaymentCallback(response: PaymentSuccessResponse): void {
    this.newBooking.userId = this.auth.currentUser?.uid;
    let bookingData = { ...this.newBooking };
    this.bookingService.saveBooking(bookingData);
    console.log('Payment callback', response);
  }
  closedPaymentModal(): void {
    this.newBooking.userId = this.auth.currentUser?.uid;
    let bookingData = { ...this.newBooking };
    this.bookingService.saveBooking(bookingData);
    console.log('payment is closed');
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}
