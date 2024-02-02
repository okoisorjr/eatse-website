import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
import { environment } from 'src/environments/environment';
import { NewLaundry } from 'src/app/pages/bookings/model/new-laundry';
import { AvailableTimes } from 'src/app/shared/available-times';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.css'],
})
export class LaundryComponent implements OnInit {
  step: number = 1;
  newLaundry: NewLaundry = new NewLaundry();
  times: string[] = [];
  frequencies: string[] = [];
  dates: string[] = [];
  nextButtonEnabled: boolean = true;
  addresses: any[] = [];
  selectedAddress: any;

  laundryItems: LaundryItems[] = [];
  totalCost!: number;
  paymentStatus!: string;
  currentUser!: any;
  selectedLaundryItems: LaundryItems[] = [];

  publicKey = environment.flutterwavePublicKey;
  customizations: any;
  customerDetails: any;
  meta!: any;
  paymentData!: InlinePaymentOptions;

  @ViewChild(DatePickerComponent) resetButton!: DatePickerComponent;

  constructor(
    private ar: ActivatedRoute,
    
    private notifier: NotifierService,
    private bookingService: BookingsService,
    private flutterwave: Flutterwave,
    private router: Router,
    private modalService: NgbModal,
    private profileService: ProfileService,
    private authService: AuthService
  ) {
  }

  ngAfterViewInit() {
    this.resetButton.resetSelectedDates();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.newLaundry.service = this.ar.snapshot.params['id'];
    this.newLaundry.totalItems = 0;
    this.newLaundry.frequency = 'one-time';
    this.newLaundry.dates = [];
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
    this.bookingService.fetchLaundryItems().subscribe((value) => {
      this.laundryItems = value;
      console.log(this.laundryItems);
    })
    
    this.newLaundry.cost = 0;
    this.customizations = {
      title: 'Eatse Global Resources Ltd.',
      description: `Payment for the ${this.newLaundry.service} service`,
      logo: 'https://firebasestorage.googleapis.com/v0/b/eatse-4dbd3.appspot.com/o/service-images%2Fbrand-logo.jpg?alt=media&token=9ba32825-4020-4d8d-ae29-76ffc41a35a5',
    };
    this.meta = {
      service: this.newLaundry.service,
      serviceFrequency: this.newLaundry.frequency,
      counsumer_id: '7898',
      consumer_mac: 'kjs9s8ss7dd',
    };
  }

  selectFrequency(frequency: any) {
    this.newLaundry.frequency = frequency;
    this.newLaundry.dates = [];
    this.resetButton.resetSelectedDates();
  }

  selectAddress(address: any) {
    this.selectedAddress = address;
    this.newLaundry.address = address._id;
    this.modalService.dismissAll();
  }

  resetAddress() {
    this.newLaundry.address = '';
  }

  openSelectAddressModal(addressSelectionModal: any) {
    this.modalService.open(addressSelectionModal, {
      centered: true,
      size: 'md',
    });
  }

  setArrivalTime(time: string) {
    this.newLaundry.pickupTime = time;
    //this.newBooking.period = time.period;
  }

  setDate(date: any) {
    /* this.dates = date;
    
    if (this.dates.length > 0) {
      this.newBooking.dates = this.dates;
    } */
    this.newLaundry.dates = date.selectedDays;
    this.newLaundry.days = date.selectedDates;
    console.log(this.newLaundry);
  }

  nextPhase() {
    window.scrollTo({ top: 0 });
    this.step++;
  }

  increaseItemCount(item: LaundryItems) {
    item.count++;
    this.newLaundry.totalItems += 1;
    item.total_price = item.total_price + item.price;
    this.newLaundry.cost += Number(item.price);
    if (this.newLaundry.items.includes(item)) {
      this.newLaundry.items[this.newLaundry.items.indexOf(item)] = item;
    } else {
      this.newLaundry.items.push(item);
    }

    console.log(this.newLaundry);
  }

  decreaseItemCount(item: LaundryItems) {
    item.count--;
    this.newLaundry.totalItems -= 1;
    item.total_price = item.total_price - item.price;
    this.newLaundry.cost -= Number(item.price);
    if (item.count == 0 && this.newLaundry.items.includes(item)) {
      this.newLaundry.items.splice(this.newLaundry.items.indexOf(item), 1);
    }
    console.log(this.newLaundry.items);
  }

  gotoBooking() {
    this.router.navigate(['/booking']);
  }

  back() {
    this.step--;
  }

  proceedToPay() {
    console.log(this.newLaundry);
    this.bookingService.saveLaundry(this.newLaundry).subscribe((value) => {
      console.log(value);
    })
    this.makePayment();
  }

  makePayment() {
    let paymentData = {
      public_key: this.publicKey,
      tx_ref: this.generateReference(),
      amount: this.newLaundry.cost,
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
    this.newLaundry.paymentStatus = 'successful';
    this.newLaundry.client = this.currentUser.id;
    
    
    console.log('Payment callback', response);
  }
  closedPaymentModal(): void {
    this.newLaundry.paymentStatus = 'cancelled';
    this.newLaundry.client = this.currentUser.id;
    console.log('payment is closed');
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}
