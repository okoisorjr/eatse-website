import { Component, Input, OnInit } from '@angular/core';
import { Flutterwave } from 'flutterwave-angular-v3';
import { LaundryItems } from 'src/app/pages/bookings/model/laundry-items';
import { PaymentSuccessResponse, InlinePaymentOptions } from 'flutterwave-angular-v3';
import { NotifierService } from 'angular-notifier';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.css']
})
export class LaundryComponent implements OnInit {

  @Input() service!: string;
  @Input() newBooking!: NewBooking;
 
  totalCost: number = 0;
  paymentStatus!: string;
  currentUser: any;

  publicKey = 'FLWPUBK_TEST-b54f62bb20ff93d14f9e0b14163e1bd6-X';

  customerDetails!: any
  meta!: any;
  laundryItems: LaundryItems[] = [];

  customizations = {
    title: 'Customization Title',
    description: 'Customization Description',
    logo: 'https://flutterwave.com/images/logo-colored.svg',
  };

  constructor(private flutterwave: Flutterwave, private notifier: NotifierService, private auth: Auth) { }

  ngOnInit(): void {
    this.newBooking.service = this.service;
    this.currentUser = this.auth.currentUser;
    this.customerDetails = {
      email: this.currentUser.email,
      fullname: this.currentUser.firstname + ' ' + this.currentUser.lastname,
      phone: this.currentUser.phone,
      userId: this.currentUser.uid
    }
    this.laundryItems = [
      {items: 'Shirts/blouse/tops', count: 0, price: '300', totalPrice: 0 },
      {items: 'Shorts/skirts/bottoms', count: 0, price: '300', totalPrice: 0},
      {items: 'Suits/coats', count: 0, price: '500', totalPrice: 0},
      {items: 'Sweaters/joggers/outer-wears', count: 0, price: '400', totalPrice: 0},
      {items: 'Dresses/gowns/kimonos', count: 0, price: '300', totalPrice: 0},
      {items: 'Curtains/bed-sheets', count: 0, price: '500', totalPrice: 0},
      {items: 'Others', count: 0, price: '200', totalPrice: 0},
    ];
  }

  increaseItemCount(item: LaundryItems){
    item.count++;
    this.totalCost += Number(item.price);
    item.totalPrice = Number(item.price) * item.count;
    this.newBooking.cost = String(this.totalCost);
    if(this.newBooking.items.includes(item)){
      this.newBooking.items.indexOf(item)
    }
    else{
      this.newBooking.items.push(item);
    }
    console.log(this.newBooking);
  }

  decreaseItemCount(item: LaundryItems){
    if(item.count == 0){
      return this.notifier.notify('error', 'sorry, you can\'t go below 0');
    }
    item.count--;
    this.totalCost -= Number(item.price);
    this.newBooking.cost = String(this.totalCost);
  }

  makePayment() {
    let paymentData = {
      public_key: this.publicKey,
      tx_ref: this.generateReference(),
      amount: Number(this.newBooking.cost),
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
