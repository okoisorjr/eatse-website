import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Flutterwave, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { BookingsService } from 'src/app/services/bookings.service';
import { DatePickerComponent } from '../../date-picker/date-picker.component';
import { environment } from 'src/environments/environment';
import { NewErrand } from 'src/app/pages/bookings/model/new-errand.model';
import { AvailableTimes } from 'src/app/shared/available-times';

@Component({
  selector: 'app-errand',
  templateUrl: './errand.component.html',
  styleUrls: ['./errand.component.css'],
})
export class ErrandComponent implements OnInit {
  @ViewChild(DatePickerComponent) resetButton!: DatePickerComponent;

  step: number = 1;
  newBooking: NewBooking = new NewBooking();
  newErrand: NewErrand = new NewErrand();
  frequencies: string[] = [];
  times: string[] = [];
  selectedErrand!: string;
  errands: string[] = [];
  dates: string[] = [];
  currentUser: any;
  customizations: any;
  publicKey = environment.flutterwavePublicKey;

  customerDetails!: any;
  meta!: any;

  constructor(
    private flutterwave: Flutterwave,
    private ar: ActivatedRoute,
    private notifier: NotifierService,
    private bookingService: BookingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.currentUser = this.auth.currentUser;
    this.newErrand.service = this.ar.snapshot.params['id'];
    this.newErrand.frequency = 'one-time';
    this.newErrand.dates = [];
    this.errands = ['Shopping', 'Pick up and delivery'];
    this.frequencies = ['one-time', /*'weekly'*/ 'monthly', 'custom'];
    this.times = Object.values(AvailableTimes);
    this.newErrand.errandType = 'Shopping';
    this.newBooking.cost = 2500;
    this.customizations = {
      title: 'Eatse Global Resources Ltd.',
      description: `Payment for the ${this.newBooking.service} service`,
      logo: 'https://eatse.ng/assets/logo.png',
    };
  }

  selectFrequency(frequency: any) {
    this.newErrand.frequency = frequency;
    this.newErrand.dates = [];
    this.resetButton.resetSelectedDates();
  }

  setArrivalTime(time: string) {
    this.newErrand.arrivalTime = time;
    //this.newBooking.period = time.period;
  }

  setDate(date: any) {
    /* this.dates = date;
    
    if (this.dates.length > 0) {
      this.newBooking.dates = this.dates;
    } */
    this.newErrand.dates = date.selectedDays;
    this.newErrand.days = date.selectedDates;
    this.newErrand.cost = 2500 * this.newErrand.days.length;
    console.log(this.newErrand);
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

  nextPhase() {
    this.step++;
  }

  proceedToPay() {
    let value = this.validateForm();
    if (value) {
      this.makePayment();
    }
  }

  selectErrand(errand: string) {
    this.newErrand.errandType = errand;
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
    this.newBooking.paymentStatus = 'successful';

    console.log('Payment callback', response);
  }
  closedPaymentModal(): void {
    this.newBooking.paymentStatus = 'cancelled';

    console.log('payment is closed');
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}
