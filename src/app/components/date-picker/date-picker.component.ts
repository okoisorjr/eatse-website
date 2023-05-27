import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent implements OnInit {
  @Input() frequency!: string;
  @Output() setDates = new EventEmitter();

  MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  showDatepicker = true;
  datepickerValue!: string;
  month!: number; // !: mean promis it will not be null, and it will definitely be assigned
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];
  selectedDays: any[] = [];

  constructor(private notifier: NotifierService) {}

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
    console.log(this.frequency);
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = new Date(
      this.year,
      this.month,
      today.getDate()
    ).toDateString();
  }

  isSelectedDay(date: any) {
    const d = new Date(this.year, this.month, date)
    return this.selectedDays.includes(d.toDateString()) ? true : false;
  }

  isToday(date: any) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString() ? true : false;
  }

  isPast(date: any) {
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth();

    return date < today && this.month >= currentMonth ? true : false;
  }

  selectDate(date: any) {
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth();
    let selectedDate = new Date(this.year, this.month, date);
    if (this.month <= currentMonth && date < today) {
      return this.notifier.notify(
        'error',
        "sorry, you can't pick a day in the past!"
      );
    }
    else if(this.selectedDays.includes(selectedDate.toDateString())){
      console.log(this.selectedDays);
      this.selectedDays.splice(this.selectedDays.indexOf(selectedDate.toDateString()), 1);
      let temp = [];
      for(let i = 0; i<this.selectedDays.length; i++){
        temp.push(this.selectedDays[i]);
      } 
      this.selectedDays = temp;
      console.log(this.selectedDays);
      return;
    }
    else if(this.frequency === 'one-time' && this.selectedDays.length > 0){
      return this.notifier.notify('error', 'This is a one time service, you can pick only one day!')
    }
    this.selectedDays.push(selectedDate.toDateString());
    this.setDates.emit(this.selectedDays);
  }

  /* getDateValue(date: any) {
    let selectedDate = new Date(this.year, this.month, date);
    this.datepickerValue = selectedDate.toDateString();
    
    this.selectedDays.push(this.datepickerValue);
    this.isSelectedDay(date);
    
    //this.showDatepicker = false;
  } */

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

  trackByIdentity = (index: number, item: any) => item;
}
