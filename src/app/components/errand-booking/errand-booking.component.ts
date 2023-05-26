import { Component, OnInit, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Flutterwave } from 'flutterwave-angular-v3';
import { NewErrand } from 'src/app/pages/bookings/model/new-errand.model';
import { PaymentSuccessResponse, InlinePaymentOptions } from 'flutterwave-angular-v3';

@Component({
  selector: 'app-errand-booking',
  templateUrl: './errand-booking.component.html',
  styleUrls: ['./errand-booking.component.css']
})
export class ErrandBookingComponent implements OnInit {
  @Input() service!: string;

  newErrand: NewErrand = new NewErrand();
  selectedErrand!: string;
  errands: string[] = [];

  publicKey = 'FLWPUBK_TEST-b54f62bb20ff93d14f9e0b14163e1bd6-X';

  customerDetails!: any
  meta!: any;

  customizations = {
    title: 'Customization Title',
    description: 'Customization Description',
    logo: 'https://flutterwave.com/images/logo-colored.svg',
  };

  constructor(private flutterwave: Flutterwave, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.errands = ['Shopping', 'Pick up and delivery']
    this.newErrand.service = this.service;
  }

  selectErrand(errand: string){
    this.selectedErrand = errand;
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
    console.log('payment is closed');
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }



}
