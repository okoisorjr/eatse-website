import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Flutterwave, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { BookingsService } from 'src/app/services/bookings.service';
import { DatePickerComponent } from '../../date-picker/date-picker.component';
import { ActivatedRoute, Router } from '@angular/router';
import { serverTimestamp } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

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
  selector: 'app-fumigation',
  templateUrl: './fumigation.component.html',
  styleUrls: ['./fumigation.component.css'],
})
export class FumigationComponent implements OnInit {
  @ViewChild(DatePickerComponent) resetButton!: DatePickerComponent;

  newBooking: NewBooking = new NewBooking();
  step: number = 1;
  buildingTypes: string[] = [];
  selectedBuilding: string = '';
  frequencies: string[] = [];
  times: AvailableTime[] = [];

  rooms!: Room[];
  totalCost!: string;
  paymentStatus!: string;

  publicKey = environment.flutterwavePublicKey;

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
    private auth: Auth,
    private ar: ActivatedRoute
  ) {}

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
    if (this.newBooking.service === 'post construction cleaning') {
      this.rooms = [
        { price: '15000', roomType: 'Living room', count: 0 },
        { price: '10000', roomType: 'Bedroom', count: 0 },
        { price: '10000', roomType: 'Kitchen', count: 0 },
        { price: '10000', roomType: 'Dinning area', count: 0 },
        { price: '5000', roomType: 'Study', count: 0 },
        { price: '5000', roomType: 'Store', count: 0 },
        { price: '5000', roomType: 'Outdoor / Balcony', count: 0 },
      ];
    } else if (this.newBooking.service === 'move-in-out-cleaning') {
      this.rooms = [
        { price: '5000', roomType: 'Living room / dining area', count: 0 },
        { price: '5000', roomType: 'Bedroom', count: 0 },
        { price: '5000', roomType: 'Kitchen', count: 0 },
        { price: '2500', roomType: 'Study', count: 0 },
        { price: '2000', roomType: 'Store', count: 0 },
        { price: '2500', roomType: 'Outdoor / Balcony', count: 0 },
      ];
    }
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
  }

  decreaseRoomSize(room: Room) {
    if (room.count === 0) {
      return this.notifier.notify('error', "sorry, can't go below 0");
    }
    room.count--;
    let cost = Number(this.newBooking.cost) - Number(room.price);
    this.newBooking.cost = cost;
  }

  increaseRoomSize(room: Room) {
    room.count++;
    let cost = Number(room.price) + this.newBooking.cost;
    this.newBooking.cost = cost;
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
    this.newBooking.paymentStatus = 'successful';
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
