import { Component, OnInit, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Flutterwave } from 'flutterwave-angular-v3';
import { NewErrand } from 'src/app/pages/bookings/model/new-errand.model';
import {
  PaymentSuccessResponse,
  InlinePaymentOptions,
} from 'flutterwave-angular-v3';
import { Auth } from '@angular/fire/auth';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-errand-booking',
  templateUrl: './errand-booking.component.html',
  styleUrls: ['./errand-booking.component.css'],
})
export class ErrandBookingComponent implements OnInit {
  @Input() service!: string;
  @Input() newBooking!: NewBooking;

  newErrand: NewErrand = new NewErrand();
  selectedErrand!: string;
  errands: string[] = [];
  currentUser: any;
  customizations: any;
  publicKey = 'FLWPUBK_TEST-b54f62bb20ff93d14f9e0b14163e1bd6-X';

  customerDetails!: any;
  meta!: any;

  constructor(
    private flutterwave: Flutterwave,
    private notifier: NotifierService,
    private auth: Auth,
    private bookingService: BookingsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
    this.errands = ['Shopping', 'Pick up and delivery'];
    this.newBooking.errandType = 'Shopping';
    //this.newBooking.cost = '2500'
    this.customizations = {
      title: 'Eatse Global Resources Ltd.',
      description: `Payment for the ${this.newBooking.service} service`,
      logo: 'https://eatse.ng/assets/logo.png',
    };
    this.customerDetails = {
      email: this.currentUser.email,
      customerName: this.currentUser.displayName,
      userId: this.currentUser.uid,
    };
    this.newErrand.service = this.service;
  }

  selectErrand(errand: string) {
    this.newBooking.errandType = errand;
  }

  makePayment() {
    let paymentData = {
      public_key: this.publicKey,
      tx_ref: this.generateReference(),
      amount: Number(this.newErrand.cost),
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
    console.log('Payment callback', response);
  }
  closedPaymentModal(): void {
    let bookingData = { ...this.newBooking };
    this.bookingService.saveBooking(bookingData);
    console.log('payment is closed');
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}
