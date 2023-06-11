import { Component, OnInit, Output, Input, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { Flutterwave, InlinePaymentOptions, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { Room } from 'src/app/pages/bookings/model/room';
import { DatePickerComponent } from '../../date-picker/date-picker.component';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingsService } from 'src/app/services/bookings.service';
import { Auth } from '@angular/fire/auth';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';
import { serverTimestamp } from '@angular/fire/firestore';

interface AvailableTime {
  id: string;
  time: string;
  period: string;
}

@Component({
  selector: 'app-deep-cleaning',
  templateUrl: './deep-cleaning.component.html',
  styleUrls: ['./deep-cleaning.component.css']
})
export class DeepCleaningComponent implements OnInit {

  @Output() updateBooking = new EventEmitter();

  @ViewChild(DatePickerComponent) resetButton!: DatePickerComponent;

  step: number = 1;
  newBooking: NewBooking = new NewBooking();
  times: AvailableTime[] = [];
  frequencies: string[] = [];
  dates: string[] = [];

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
    private ar: ActivatedRoute,
    private flutterwave: Flutterwave,
    private bookingService: BookingsService,
    private auth: Auth,
    private globalService: GlobalResourceService,
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
    });

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

  ngAfterViewInit() {
    this.resetButton.resetSelectedDates();
  }

  ngOnInit(): void {
    this.newBooking.service = this.ar.snapshot.params['id'];
    this.newBooking.frequency = 'one-time';
    this.newBooking.dates = [];
    this.frequencies = ['one-time', /*'weekly'*/ 'monthly', 'custom']; //weekly removed temporarily
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

    this.currentUser = this.auth.currentUser;
    this.newBooking.cost = 0;
    this.newBooking.discountedPrice = 0;
    this.customizations = {
      title: 'Eatse Global Resources Ltd.',
      description: `Payment for the ${this.newBooking.service} service`,
      logo: 'https://firebasestorage.googleapis.com/v0/b/eatse-4dbd3.appspot.com/o/service-images%2Fbrand-logo.jpg?alt=media&token=9ba32825-4020-4d8d-ae29-76ffc41a35a5',
    };
    this.meta = {
      service: this.newBooking.service,
      rooms: this.newBooking.rooms.length,
      serviceFrequency: this.newBooking.frequency,
      counsumer_id: '7898',
      consumer_mac: 'kjs9s8ss7dd',
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

  nextPhase() {
    window.scrollTo({top: 0});
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
    this.step++;
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

  gotoBooking() {
    this.router.navigate(['/booking']);
  }

  back() {
    this.step--;
  }

  proceedToPay() {
    this.makePayment();
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
    this.newBooking.paymentStatus = 'successful';
    this.newBooking.userId = this.auth.currentUser?.uid;
    let bookingData = { ...this.newBooking, createdAt: serverTimestamp(), lastModified: serverTimestamp() };
    this.bookingService.saveBooking(bookingData);
    console.log('Payment callback', response);
  }
  closedPaymentModal(): void {
    this.newBooking.paymentStatus = 'cancelled';
    this.newBooking.userId = this.auth.currentUser?.uid;
    let bookingData = { ...this.newBooking, createdAt: serverTimestamp(), lastModified: serverTimestamp() };
    this.bookingService.saveBooking(bookingData);
    console.log('payment is closed');
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}
