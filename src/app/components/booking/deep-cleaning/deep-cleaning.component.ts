import {
  Component,
  OnInit,
  Output,
  Input,
  ViewChild,
  AfterViewInit,
  EventEmitter,
} from '@angular/core';
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from 'flutterwave-angular-v3';
import { Room } from 'src/app/pages/bookings/model/room';
import { DatePickerComponent } from '../../date-picker/date-picker.component';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingsService } from 'src/app/services/bookings.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/app/services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { BuildingTypes } from 'src/app/shared/building-types';
import { AvailableTimes } from 'src/app/shared/available-times';

@Component({
  selector: 'app-deep-cleaning',
  templateUrl: './deep-cleaning.component.html',
  styleUrls: ['./deep-cleaning.component.css'],
})
export class DeepCleaningComponent implements OnInit {
  @Output() updateBooking = new EventEmitter();

  @ViewChild(DatePickerComponent) resetButton!: DatePickerComponent;

  step: number = 0;
  newBooking: NewBooking = new NewBooking();
  times: string[] = [];
  frequencies: string[] = [];
  dates: string[] = [];

  rooms!: any[];
  totalCost!: string;
  paymentStatus!: string;
  currentUser: any;
  selectedAddress: any;
  addresses: any[] = [];

  publicKey = environment.flutterwavePublicKey;
  customizations: any;
  customerDetails: any;
  meta!: any;
  paymentData!: InlinePaymentOptions;

  constructor(
    private notifier: NotifierService,
    private ar: ActivatedRoute,
    private flutterwave: Flutterwave,
    private bookingService: BookingsService,
    private router: Router,
    private modalService: NgbModal,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngAfterViewInit() {
    this.resetButton.resetSelectedDates();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.newBooking.service = this.ar.snapshot.params['id'];
    this.newBooking.frequency = 'one-time';
    //this.newBooking.buildingType = BuildingTypes.HOUSE;
    this.newBooking.dates = [];
    this.bookingService
      .fetchRoomsAndPrices(this.newBooking.service)
      .subscribe((value) => {
        console.log(`rooms and prices for ${this.newBooking.service}`, value);
      });
    this.profileService.fetchClientAddresses(this.currentUser.id).subscribe(
      (value) => {
        if (value) {
          this.addresses = value;
        }
      },
      (error: HttpErrorResponse) => {
        this.notifier.notify('error', `${error.error.message}`);
      }
    );
    this.frequencies = ['one-time', /*'weekly'*/ 'monthly', 'custom']; //weekly removed temporarily
    this.bookingService
      .fetchRoomsAndPrices(this.newBooking.service)
      .subscribe((value) => {
        this.rooms = value;
      });
    this.times = Object.values(AvailableTimes);

    this.newBooking.cost = 0;
    this.newBooking.discountedPrice = 0;
    this.customizations = {
      title: 'Eatse Global Resources Ltd.',
      description: `Payment for the ${this.newBooking.service} service`,
      logo: 'https://firebasestorage.googleapis.com/v0/b/eatse-4dbd3.appspot.com/o/service-images%2Fbrand-logo.jpg?alt=media&token=9ba32825-4020-4d8d-ae29-76ffc41a35a5',
    };
    this.meta = {
      service: this.newBooking.service,
      rooms: this.newBooking.rooms,
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

  setArrivalTime(time: string) {
    this.newBooking.arrivalTime = time;
    //this.newBooking.period = time.period;
  }

  setDate(date: any) {
    /* this.dates = date;
    
    if (this.dates.length > 0) {
      this.newBooking.dates = this.dates;
    } */
    this.newBooking.dates = date.selectedDays;
    this.newBooking.days = date.selectedDates;
    console.log(this.newBooking);
    //this.newBooking.dates = date;
  }

  selectAddress(address: any) {
    this.selectedAddress = address;
    this.newBooking.address = address._id;
    this.modalService.dismissAll();
  }

  resetAddress() {
    this.newBooking.address = '';
  }

  openSelectAddressModal(addressSelectionModal: any) {
    this.modalService.open(addressSelectionModal, {
      centered: true,
      size: 'md',
    });
  }

  next() {
    window.scrollTo({ top: 0 });
    if (this.newBooking.buildingType == 'House') {
      this.step = 1;
    } else if (this.newBooking.buildingType == 'Office') {
      this.step = 2;
    }
  }

  prev() {
    if (this.newBooking.buildingType == 'Office' && this.step == 2) {
      this.step = 0;
    } else if (this.newBooking.buildingType == 'House' && this.step == 2) {
      this.step = 1;
    }
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

  calculatePercentage() {
    let discountPrice: any;

    discountPrice =
      (this.newBooking.cost * this.newBooking.percentageDiscount) / 100;
    console.log(discountPrice);

    return discountPrice;
  }

  decreaseRoomSize(room: Room) {
    room.count--;
    this.newBooking.rooms--;
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
    this.newBooking.rooms++;
    this.newBooking.cost += room.price;
    //this.newBooking.rooms.push(room);
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
    this.newBooking.client = this.currentUser.id;
    this.rooms.forEach((room) => {
      if (room.count > 0) {
        this.newBooking.house_setting.push(room);
      }
    });
    console.log(this.newBooking);
    this.bookingService.saveBooking(this.newBooking).subscribe(
      (value) => {
        if (value) {
          console.log('booking saved: ', value);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
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
    console.log('Payment callback', response);
  }
  closedPaymentModal(): void {
    this.newBooking.paymentStatus = 'cancelled';
    console.log('payment is closed');
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}
