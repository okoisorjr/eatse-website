import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from 'flutterwave-angular-v3';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';
import { UserAccount } from 'src/app/auth/models/user-account.model';
import { CurrentUser } from 'src/app/auth/auth.service';
import { BookingsService } from 'src/app/services/bookings.service';
import { Auth } from '@angular/fire/auth';

interface Room {
  price: number;
  roomType: string;
  count: number;
}

@Component({
  selector: 'app-house-info',
  templateUrl: './house-info.component.html',
  styleUrls: ['./house-info.component.css'],
})
export class HouseInfoComponent implements OnInit {
  @Input() newBooking!: NewBooking;
  @Input() step!: number;
  @Output() back = new EventEmitter();

  rooms!: Room[];
  totalCost!: string;
  paymentStatus!: string;
  currentUser: any;

  publicKey = 'FLWPUBK_TEST-b54f62bb20ff93d14f9e0b14163e1bd6-X';
  customizations: any;
  customerDetails: any;
  meta!: any;
  paymentData!: InlinePaymentOptions;

  constructor(
    private notifier: NotifierService,
    private flutterwave: Flutterwave,
    private bookingService: BookingsService,
    private auth: Auth,
    private globalService: GlobalResourceService
  ) {
    this.currentUser = this.globalService.getCurrentUser();
    this.rooms = [
      { price: 500, roomType: 'Living rooms / dining area', count: 0 },
      { price: 2000, roomType: 'Bedrooms', count: 0 },
      { price: 1000, roomType: 'Kitchen', count: 0 },
      { price: 1000, roomType: 'Toilets', count: 0 },
      { price: 500, roomType: 'Study', count: 0 },
      { price: 500, roomType: 'Store', count: 0 },
      { price: 500, roomType: 'Outdoor / balcony', count: 0 },
    ];
  }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
    this.newBooking.cost = 0;
    this.newBooking.discountedPrice = 0;
    this.customizations = {
      title: 'Eatse Global Resources Ltd.',
      description: `Payment for the ${this.newBooking.service} service`,
      logo: 'https://firebasestorage.googleapis.com/v0/b/eatse-4dbd3.appspot.com/o/service-images%2Fbrand-logo.jpg?alt=media&token=9ba32825-4020-4d8d-ae29-76ffc41a35a5',
    };
    this.customerDetails = {
      name: this.currentUser.displayName
        ? this.currentUser.displayName
        : this.currentUser.email,
      email: this.currentUser.email,
      userId: this.currentUser.uid,
    };
    this.meta = {
      service: this.newBooking.service,
      rooms: this.newBooking.rooms.length,
      serviceFrequency: this.newBooking.frequency,
      counsumer_id: '7898',
      consumer_mac: 'kjs9s8ss7dd',
    };
    if (
      this.newBooking.frequency === 'monthly' &&
      this.newBooking.dates.length <= 3 &&
      this.newBooking.dates.length > 1
    ) {
      this.newBooking.percentageDiscount = 35;
    } else if (
      this.newBooking.frequency === 'monthly' &&
      this.newBooking.dates.length <= 7 &&
      this.newBooking.dates.length > 3
    ) {
      this.newBooking.percentageDiscount = 50;
    } else if (
      this.newBooking.frequency === 'monthly' &&
      this.newBooking.dates.length <= 14 &&
      this.newBooking.dates.length > 7
    ) {
      this.newBooking.percentageDiscount = 60;
    } else if (
      this.newBooking.frequency === 'monthly' &&
      this.newBooking.dates.length <= 31 &&
      this.newBooking.dates.length > 14
    ) {
      this.newBooking.percentageDiscount = 80;
    }
  }

  calculatePercentage() {
    let discountPrice: any;

    discountPrice =
      (this.newBooking.cost * this.newBooking.percentageDiscount) / 100;
    console.log(discountPrice);

    return discountPrice;
  }

  decreaseRoomSize(room: Room) {
    room.count--;
    this.newBooking.cost -= room.price;
    if (this.newBooking.percentageDiscount) {
      this.newBooking.discountedPrice =
        this.newBooking.cost - this.calculatePercentage(); // calcluate the discount from the initial service cost
      this.newBooking.servicePrice =
        this.newBooking.discountedPrice * this.newBooking.dates.length; // Calculate the total price against the frequency
    }
  }

  increaseRoomSize(room: Room) {
    room.count++;
    this.newBooking.cost += room.price;
    this.newBooking.rooms.push(room);
    if (this.newBooking.percentageDiscount) {
      this.newBooking.discountedPrice =
        this.newBooking.cost - this.calculatePercentage(); // calcluate the discount from the initial service cost
      this.newBooking.servicePrice =
        this.newBooking.discountedPrice * this.newBooking.dates.length; // Calculate the total price against the frequency
    }
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
      amount: this.newBooking.servicePrice
        ? this.newBooking.servicePrice
        : this.newBooking.cost,
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
    this.newBooking.paymentStatus = 'cancelled';
    this.newBooking.userId = this.auth.currentUser?.uid;
    let bookingData = { ...this.newBooking };
    this.bookingService.saveBooking(bookingData);
    console.log('Payment callback', response);
  }
  closedPaymentModal(): void {
    this.newBooking.paymentStatus = 'cancelled';
    this.newBooking.userId = this.auth.currentUser?.uid;
    let bookingData = { ...this.newBooking };
    this.bookingService.saveBooking(bookingData);
    console.log('payment is closed');
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }

  goBack() {
    this.back.emit();
  }
}
