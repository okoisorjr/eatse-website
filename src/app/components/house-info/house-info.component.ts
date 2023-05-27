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

interface Room {
  price: string;
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
  @Output() setNewBooking = new EventEmitter();
  @Output() payFee = new EventEmitter();

  rooms!: Room[];
  totalCost!: string;
  paymentStatus!: string;
  currentUser!: CurrentUser;

  publicKey = 'FLWPUBK_TEST-b54f62bb20ff93d14f9e0b14163e1bd6-X';

  customerDetails!: any
  meta!: any;

  customizations = {
    title: 'Customization Title',
    description: 'Customization Description',
    logo: 'https://flutterwave.com/images/logo-colored.svg',
  };


  paymentData!: InlinePaymentOptions;

  constructor(
    private notifier: NotifierService,
    private flutterwave: Flutterwave,
    private bookingService: BookingsService,
    private globalService: GlobalResourceService
  ) {
    this.currentUser = this.globalService.getCurrentUser();
    this.rooms = [
      { price: '5000', roomType: 'Living rooms', count: 0 },
      { price: '5000', roomType: 'Bedrooms', count: 0 },
      { price: '6000', roomType: 'Kitchen & dining area', count: 0 },
      { price: '3500', roomType: 'Store/other rooms', count: 0 },
    ];
  }

  ngOnInit(): void {
    console.log(this.newBooking);
    this.customerDetails = {
      name: this.globalService.currentUser.firstname + this.globalService.currentUser.lastname,
      email: this.globalService.currentUser.email,
      phone_number: this.currentUser.phone,
    };
    console.log(this.customerDetails);
    this.meta = { service: this.newBooking.service, rooms: this.newBooking.rooms, serviceFrequency: this.newBooking.frequency, counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" };
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

  validateForm(){
    if(this.newBooking.address === '' || this.newBooking.frequency === '' || this.newBooking.frequency === '' || this.newBooking.arrivalTime === '' || this.newBooking.cost === '0'){
      return this.notifier.notify('error', 'Please, make sure to fill out all the required fields');
    }else{
      return true;
    }
  }

  proceedToPay(){
    let value = this.validateForm();
    if(value){
      this.makePayment();
    }
  }

  makePayment() {
    this.setNewBooking.emit(this.newBooking);
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
    this.newBooking.paymentStatus = 'cancelled';
    let bookingData = {...this.newBooking}
    this.bookingService.saveBooking(bookingData);
    console.log('payment is closed');
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}
