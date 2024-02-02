import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NewBooking } from 'src/app/pages/bookings/model/new-booking';
import { NewErrand } from 'src/app/pages/bookings/model/new-errand.model';
import { NewLaundry } from 'src/app/pages/bookings/model/new-laundry';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent implements OnInit {
  @Input() frequency!: string;
  @Input() booking!: NewBooking;
  @Input() laundry!: NewLaundry;
  @Input() errand!: NewErrand;
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
  selectedDates: number[] = [];

  constructor(private notifier: NotifierService) {}

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
    if (this.booking && this.booking.dates) {
      this.selectedDays = this.booking.dates;
    } else if (this.laundry && this.laundry.dates) {
      this.selectedDays = this.laundry.dates;
    }
  }

  resetSelectedDates() {
    if (this.booking) {
      this.booking.dates = [];
      this.booking.days = [];
    } else if (this.laundry) {
      this.laundry.dates = [];
      this.laundry.days = [];
    } else if (this.errand) {
      this.errand.dates = [];
      this.errand.days = [];
    }

    this.selectedDates = [];
    this.selectedDays = [];
    this.ngOnInit();
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
    const d = new Date(this.year, this.month, date);
    return this.selectedDates.includes(date) ? true : false;
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
    let selectedDate = new Date(this.year, this.month, date).setHours(
      0,
      0,
      0,
      0
    );
    //let selectedDate = new Date(new Date().setDate(date)).setHours(0,0,0,0);
    //let selectedDate = Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), date, 0, 0, 0, 0);
    let selectedDay = new Date(selectedDate).toLocaleString();
    //console.log(selectedDay.toLocaleString());
    if (this.month <= currentMonth && date < today) {
      return this.notifier.notify(
        'error',
        "sorry, you can't pick a day in the past!"
      );
    } else if (this.selectedDates.includes(date)) {
      this.selectedDays.splice(this.selectedDates.indexOf(date), 1);
      this.selectedDates.splice(this.selectedDates.indexOf(date), 1);
      let temp = [];
      for (let i = 0; i < this.selectedDays.length; i++) {
        temp.push(this.selectedDays[i]);
      }
      this.selectedDays = temp;
      console.log(this.selectedDays);
      console.log(this.selectedDates);
      return;
    } else if (
      (this.booking &&
        this.booking.frequency === 'one-time' &&
        this.selectedDays.length > 0) ||
      (this.laundry &&
        this.laundry.frequency === 'one-time' &&
        this.selectedDays.length > 0) ||
      (this.errand &&
        this.errand.frequency === 'one-time' &&
        this.selectedDays.length > 0)
    ) {
      return this.notifier.notify(
        'error',
        'This is a one time service, you can pick only one day!'
      );
    }
    this.selectedDays.push(selectedDay);
    this.selectedDates.push(date);
    console.log(
      'selected days:',
      this.selectedDays,
      'selected dates: ',
      this.selectedDates
    );
    this.setDates.emit({
      selectedDays: this.selectedDays,
      selectedDates: this.selectedDates,
    });
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
