import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';

interface AvailableTime {
  id: string;
  time: string;
  period: string;
}

@Component({
  selector: 'app-one-time',
  templateUrl: './one-time.component.html',
  styleUrls: ['./one-time.component.css'],
})
export class OneTimeComponent implements OnInit {
  @Input() step!: number;
  @Input() frequency!: string;
  @Input() newBooking!: NewBooking;
  @Output() updateBooking = new EventEmitter();
  @Output() setFrequency = new EventEmitter();
  @Output() changeStep = new EventEmitter();

  //newBooking: NewBooking = new NewBooking();
  times: AvailableTime[] = [];
  frequencies: string[] = [];
  selectedFrequency!: string;
  dates: string[] = [];

  constructor( private notifier: NotifierService) {}

  ngOnInit(): void {
    this.newBooking.frequency = this.frequency;
    this.selectedFrequency = this.frequency;
    this.frequencies = ['one-time', 'weekly', 'monthly', 'custom'];
    this.times = [
      { id: '1', time: '06:00', period: 'am'},
      { id: '1', time: '07:00', period: 'am'},
      { id: '1', time: '08:00', period: 'am'},
      { id: '1', time: '09:00', period: 'am'},
      { id: '1', time: '10:00', period: 'am'},
      { id: '1', time: '11:00', period: 'am'},
      { id: '1', time: '12:00', period: 'pm'},
      { id: '1', time: '01:00', period: 'pm'},
      { id: '1', time: '02:00', period: 'pm'},
      { id: '1', time: '03:00', period: 'pm'},
      { id: '1', time: '04:00', period: 'pm'},
      { id: '1', time: '05:00', period: 'pm'},
      { id: '1', time: '06:00', period: 'pm'},
    ];
  }

  selectFrequency(frequency: any) {
    this.selectedFrequency = frequency;
    this.newBooking.frequency = frequency;
    this.setFrequency.emit(this.selectedFrequency);
  }

  setArrivalTime(time: AvailableTime){
    this.newBooking.arrivalTime = time.time;
    this.newBooking.period = time.period;
  }

  setDate(date: any){
    this.dates = date;
    if(this.dates.length > 0){
      this.newBooking.dates = this.dates;
    }
  }

  nextPhase(){
    if(Object.keys(this.newBooking).length === 0){
      return this.notifier.notify('error', 'Please, select all the fields!')
    }
    else{
      this.updateBooking.emit(this.newBooking);
      //this.changeStep.emit();
    }    
  }
}
