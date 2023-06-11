import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Flutterwave, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { BookingsService } from 'src/app/services/bookings.service';
import { DatePickerComponent } from '../../date-picker/date-picker.component';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { Auth } from '@angular/fire/auth';
import { serverTimestamp } from '@angular/fire/firestore';

interface Room {
  price: string;
  roomType: string;
  count: number;
}

interface AvailableTime {
  id: string;
  time: string;
  period: string;
}

@Component({
  selector: 'app-post-construction',
  templateUrl: './post-construction.component.html',
  styleUrls: ['./post-construction.component.css'],
})
export class PostConstructionComponent implements OnInit {
  @ViewChild(DatePickerComponent) resetButton!: DatePickerComponent;

  newBooking: NewBooking = new NewBooking();
  step: number = 1;
  buildingTypes: string[] = [];
  selectedBuilding: string = '';
  frequencies: string[] = [];
  times: AvailableTime[] = [];
  currentUser: any;

  rooms!: Room[];
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
    private bookingService: BookingsService,
    private router: Router,
    private ar: ActivatedRoute,
    private auth: Auth
  ) {
    this.auth.onAuthStateChanged((credential) => {
      if (credential) {
        this.currentUser = credential;
        this.customerDetails = {
          email: this.currentUser.email,
          customerName: this.currentUser.displayName,
          userId: this.currentUser.uid,
        };
      }
    });
  }

  ngAfterViewInit() {
    this.resetButton.resetSelectedDates();
  }

  ngOnInit(): void {
    this.newBooking.service = this.ar.snapshot.params['id'];
    this.newBooking.frequency = 'one-time';
    if (this.newBooking.service === 'office-cleaning') {
      this.newBooking.buildingType = 'Office';
    } else {
      this.newBooking.buildingType = 'House';
    }
    this.buildingTypes = ['House', 'Office'];
    this.newBooking.dates = [];
    this.newBooking.cost = 0;
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
    this.rooms = [
      { price: '15000', roomType: 'Living room', count: 0 },
      { price: '10000', roomType: 'Bedroom', count: 0 },
      { price: '10000', roomType: 'Kitchen', count: 0 },
      { price: '10000', roomType: 'Dinning area', count: 0 },
      { price: '5000', roomType: 'Study', count: 0 },
      { price: '5000', roomType: 'Store', count: 0 },
      { price: '5000', roomType: 'Outdoor / Balcony', count: 0 },
    ];
  }

  gotoBooking() {
    this.router.navigate(['/booking']);
  }

  back() {
    window.scroll({ top: 0 });
    this.step--;
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
    window.scrollTo({ top: 0 });
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

  selectBuilding(building: string) {
    this.newBooking.buildingType = building;
    this.newBooking.rooms = [];
  }

  decreaseRoomSize(room: Room) {
    if (room.count === 0) {
      return this.notifier.notify('error', "sorry, can't go below 0");
    }
    room.count--;
    this.newBooking.cost - Number(room.price);
    console.log(this.newBooking);
  }

  increaseRoomSize(room: Room) {
    room.count++;
    this.newBooking.cost += Number(room.price);
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
