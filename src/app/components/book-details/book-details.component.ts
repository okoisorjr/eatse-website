import { Component, OnInit, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Flutterwave } from 'flutterwave-angular-v3';
import { UserAccount } from 'src/app/auth/models/user-account.model';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import {
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from 'flutterwave-angular-v3';
import { BookingsService } from 'src/app/services/bookings.service';

interface Room {
  price: string;
  roomType: string;
  count: number;
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  @Input() service!: string;
  @Input() newBooking!: NewBooking;

  buildingTypes: string[] = [];
  /* newBooking: NewBooking = new NewBooking(); */
  selectedBuilding: string = '';

  rooms!: Room[];
  totalCost!: string;
  paymentStatus!: string;

  publicKey = 'FLWPUBK_TEST-b54f62bb20ff93d14f9e0b14163e1bd6-X';

  customerDetails!: any;
  meta!: any;

  customizations = {
    title: 'Customization Title',
    description: 'Customization Description',
    logo: 'https://flutterwave.com/images/logo-colored.svg',
  };

  constructor(
    private flutterwave: Flutterwave,
    private notifier: NotifierService,
    private bookingService: BookingsService
  ) {}

  ngOnInit(): void {
    this.newBooking.service = this.newBooking.service;
    if(this.newBooking.service === 'office-cleaning'){
      this.newBooking.buildingType = 'Office';
    }else{
      this.newBooking.buildingType = 'House';
    }
    this.buildingTypes = ['House', 'Office'];
    this.rooms = [
      { price: '5000', roomType: 'Living rooms', count: 0 },
      { price: '5000', roomType: 'Bedrooms', count: 0 },
      { price: '6000', roomType: 'Kitchen & dining area', count: 0 },
      { price: '3500', roomType: 'Store/other rooms', count: 0 },
    ];
  }

  selectBuilding(building: string) {
    this.newBooking.buildingType = building;
  }

  decreaseRoomSize(room: Room) {
    if (room.count === 0) {
      return this.notifier.notify('error', "sorry, can't go below 0");
    }
    room.count--;
    let cost = Number(this.newBooking.cost) - Number(room.price);
    this.newBooking.cost = String(cost);
  }

  increaseRoomSize(room: Room) {
    room.count++;
    let cost = Number(room.price) + Number(this.newBooking.cost);
    this.newBooking.cost = String(cost);
  }

  validateForm() {
    if (
      this.newBooking.days!.length == 0 ||
      this.newBooking.dates.length == 0 ||
      this.newBooking.buildingType === '' ||
      this.newBooking.arrivalTime === '' ||
      this.newBooking.address === '' ||
      this.newBooking.buildingType === ''
    ) {
      return this.notifier.notify(
        'error',
        'Please, kindly fill out all the required fields'
      );
    } else {
      return true;
    }
  }

  proceedToPay() {
    let value = this.validateForm();
    if (value) {
      this.makePayment();
    }
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
    this.newBooking.paymentStatus = 'success';
    let bookingData = {...this.newBooking}
    this.bookingService.saveBooking(bookingData);
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
