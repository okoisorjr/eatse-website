import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Flutterwave, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { DatePickerComponent } from '../../date-picker/date-picker.component';
import { NotifierService } from 'angular-notifier';
import { BookingsService } from 'src/app/services/bookings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NewOffice } from 'src/app/pages/bookings/model/new-office.model';
import { AvailableTimes } from 'src/app/shared/available-times';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BuildingTypes } from 'src/app/shared/building-types';

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
  selector: 'app-move-in-out',
  templateUrl: './move-in-out.component.html',
  styleUrls: ['./move-in-out.component.css'],
})
export class MoveInOutComponent implements OnInit {
  @ViewChild(DatePickerComponent) resetButton!: DatePickerComponent;

  newBooking: NewBooking = new NewBooking();
  newOffice: NewOffice = new NewOffice();
  step: number = 0;
  buildingTypes: string[] = [];
  selectedBuilding: string = '';
  frequencies: string[] = [];
  times: string[] = [];
  currentUser: any;
  addresses: any[] = [];
  selectedAddress: any;

  rooms!: any[];
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
    private ar: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService,
    private modalService: NgbModal
  ) {}

  ngAfterViewInit() {
    this.resetButton.resetSelectedDates();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.newBooking.service = this.ar.snapshot.params['id'];
    this.newBooking.frequency = 'one-time';
    //this.newBooking.buildingType = BuildingTypes.HOUSE;
    this.buildingTypes = Object.values(BuildingTypes);
    this.newBooking.dates = [];
    this.newBooking.cost = 0;
    this.frequencies = ['one-time', /*'weekly'*/ 'monthly', 'custom']; //weekly removed temporarily
    this.times = Object.values(AvailableTimes);
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
    this.bookingService
      .fetchRoomsAndPrices(this.newBooking.service)
      .subscribe((value) => {
        this.rooms = value;
      });
  }

  gotoBooking() {
    this.router.navigate(['/booking']);
  }

  back() {
    window.scroll({ top: 0 });
    this.step--;
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

  selectFrequency(frequency: any) {
    this.newBooking.frequency = frequency;
    this.newBooking.dates = [];
    this.resetButton.resetSelectedDates();
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
    this.newBooking.rooms = 0;
  }

  decreaseRoomSize(room: any) {
    room.count--;
    this.newBooking.rooms--;
    this.newBooking.cost -= room.price;
    console.log(this.newBooking);
  }

  increaseRoomSize(room: any) {
    room.count++;
    this.newBooking.rooms++;
    this.newBooking.cost += room.price;
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
