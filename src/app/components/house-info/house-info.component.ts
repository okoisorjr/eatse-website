import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { PaystackOptions } from 'angular4-paystack';

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

  options: PaystackOptions = {
    amount: 50000,
    email: 'okoisorjr@gmail.com',
    ref: `${Math.ceil(Math.random() * 10e10)}`,
    currency: 'NGN',
    channels: ['bank'],
    bearer: '',
    key: '',
    metadata: '',
    plan: ''
  }

  rooms!: Room[];
  totalCost!: string;
  reference!: string;
  paymentStatus!: string;

  paymentInstance: any;
  token :string = '';

  constructor(private notifier: NotifierService) {}

  ngOnInit(): void {
    console.log(this.newBooking);
    this.rooms = [
      { price: '5000', roomType: 'Living rooms', count: 0 },
      { price: '5000', roomType: 'Bedrooms', count: 0 },
      { price: '6000', roomType: 'Kitchen & dining area', count: 0 },
      { price: '3500', roomType: 'Store/other rooms', count: 0 },
    ];
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

  decreaseRoomSize(room: Room) {
    if(room.count === 0){
      return this.notifier.notify('error', 'sorry, can\'t go below 0');
    }
    room.count--;
    let cost = Number(this.newBooking.cost) - Number(room.price) 
    this.newBooking.cost = String(cost);
  }

  increaseRoomSize(room: Room){
    room.count++;
    let cost = Number(room.price) + Number(this.newBooking.cost);
    this.newBooking.cost = String(cost);
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.paymentStatus = 'Payment successfull';
    console.log(this.paymentStatus, ref);
  }

  paymentCancel() {
    console.log('payment process terminated');
  }
 
  paymentFailure() {
    this.paymentStatus = 'Payment Failed';
  }
 
  paymentSuccess(res: any) {
    console.log('Payment complete', res);
    this.paymentInstance.close();
  }
 
  paymentInited(paymentInstance: any) {
    this.paymentFailure = paymentInstance;
    console.log('Payment about to begin', paymentInstance);
  }

  pay() {
    console.log(this.newBooking);
    //this.setNewBooking.emit(this.newBooking);
    //this.payFee.emit(this.totalCost);
  }
}
