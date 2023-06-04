import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from 'flutterwave-angular-v3';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { DatePickerComponent } from '../../date-picker/date-picker.component';
import { LaundryItems } from 'src/app/pages/bookings/model/laundry-items';
import { NotifierService } from 'angular-notifier';
import { BookingsService } from 'src/app/services/bookings.service';

interface AvailableTime {
  id: string;
  time: string;
  period: string;
}

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.css'],
})
export class LaundryComponent implements OnInit {
  step: number = 1;
  newBooking: NewBooking = new NewBooking();
  times: AvailableTime[] = [];
  frequencies: string[] = [];
  dates: string[] = [];
  nextButtonEnabled: boolean = true;

  laundryItems: LaundryItems[] = [];
  totalCost!: number;
  paymentStatus!: string;
  currentUser: any;
  selectedLaundryItems: LaundryItems[] = [];

  publicKey = 'FLWPUBK_TEST-b54f62bb20ff93d14f9e0b14163e1bd6-X';
  customizations: any;
  customerDetails: any;
  meta!: any;
  paymentData!: InlinePaymentOptions;

  @ViewChild(DatePickerComponent) resetButton!: DatePickerComponent;

  constructor(
    private ar: ActivatedRoute,
    private auth: Auth,
    private notifier: NotifierService,
    private bookingService: BookingsService,
    private flutterwave: Flutterwave,
    private router: Router
  ) {
    this.auth.onAuthStateChanged((credentials) => {
      if (credentials) {
        this.currentUser = credentials;
        this.customerDetails = {
          name: this.currentUser.displayName
            ? this.currentUser.displayName
            : this.currentUser.email,
          email: this.currentUser.email,
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
    this.laundryItems = [
      { items: 'Shirts/blouse/tops', count: 0, price: '300', totalPrice: 0 },
      { items: 'Shorts/skirts/bottoms', count: 0, price: '300', totalPrice: 0 },
      { items: 'Suits/coats', count: 0, price: '500', totalPrice: 0 },
      {
        items: 'Sweaters/joggers/outer-wears',
        count: 0,
        price: '400',
        totalPrice: 0,
      },
      { items: 'Dresses/gowns/kimonos', count: 0, price: '300', totalPrice: 0 },
      { items: 'Curtains/bed-sheets', count: 0, price: '500', totalPrice: 0 },
      { items: 'Others', count: 0, price: '200', totalPrice: 0 },
    ];
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
    window.scrollTo({ top: 0 });
    this.step++;
  }

  increaseItemCount(item: LaundryItems) {
    item.count++;
    this.newBooking.cost += Number(item.price);
    if (this.newBooking.items.includes(item)) {
      this.newBooking.items[this.newBooking.items.indexOf(item)] = item;
    } else {
      this.newBooking.items.push(item);
    }

    console.log(this.newBooking);
  }

  decreaseItemCount(item: LaundryItems) {
    item.count--;
    this.newBooking.cost -= Number(item.price);
    if (item.count == 0 && this.newBooking.items.includes(item)) {
      this.newBooking.items.splice(this.newBooking.items.indexOf(item), 1);
    }
    console.log(this.newBooking.items);
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
    this.newBooking.paymentStatus = 'cancelled';
    this.newBooking.userId = this.currentUser.uid;
    let bookingData = { ...this.newBooking };
    this.bookingService.saveBooking(bookingData);
    console.log('Payment callback', response);
  }
  closedPaymentModal(): void {
    this.newBooking.paymentStatus = 'cancelled';
    this.newBooking.userId = this.currentUser.uid;
    let bookingData = { ...this.newBooking };
    this.bookingService.saveBooking(bookingData);
    console.log('payment is closed');
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}
